/* =========================================================================
   GLOBE  ·  clean rotating 3D earth for the hero
   ---------------------------------------------------------------------------
   Real continents (d3-geo orthographic) on a canvas. Flat, solid, no shading.
   Auto-spins slowly; you can DRAG it to spin it yourself.

   It also plots the 7 itinerary stops as numbered pins, joined by a dashed
   great-circle route line in trip order (starting from `start`). Pins on the
   far side of the globe are hidden as it turns. Hovering a pin shows the
   country name; clicking a pin opens that stop's page.

   Tweak the look in the CONFIG block below.
   ========================================================================= */

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { geoOrthographic, geoPath, geoDistance } from 'd3-geo';
import { merge } from 'topojson-client';
import type {
  GeometryCollection,
  Topology,
  Polygon as TopoPolygon,
  MultiPolygon as TopoMultiPolygon,
} from 'topojson-specification';
import type { MultiPolygon } from 'geojson';

// ---- CONFIG ----------------------------------------------------------------
const CONFIG = {
  ocean: '#e7dcc6', // sphere / sea fill (warm sand, matches the page)
  land: '#c4623c', // continents (terracotta — the site accent)
  ink: '#322b22', // route line + pin fill
  paper: '#f7f1e6', // pin number + outlines
  accent: '#c4623c', // hovered pin fill
  spin: 0.1, // auto-spin degrees per frame (lower = slower)
  drag: 0.3, // drag sensitivity (degrees per pixel)
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
};

const WORLD_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export interface GlobeStop {
  stopNumber: number;
  country: string;
  coords: [number, number];
}

export function Globe({ stops, start }: { stops: GlobeStop[]; start?: [number, number] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keep the latest props / navigate in refs so the canvas setup effect can
  // stay stable (deps []) without going stale. Refs are written in an effect
  // (never during render).
  const navigate = useNavigate();
  const stopsRef = useRef(stops);
  const startRef = useRef(start);
  const navRef = useRef(navigate);
  useEffect(() => {
    stopsRef.current = stops;
    startRef.current = start;
    navRef.current = navigate;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let land: MultiPolygon | null = null;
    let disposed = false;
    let lambda = 0;
    let phi = -8; // rotation: longitude, latitude
    let dragging = false;
    let moved = false; // did this press move enough to count as a drag?
    let hovering = false; // cursor over the canvas (pauses auto-spin)
    let hoverN: number | null = null; // stopNumber currently hovered, if any
    let lastX = 0;
    let lastY = 0;
    let downX = 0;
    let downY = 0;

    // Screen positions of front-facing pins for this frame (CSS px). Rebuilt
    // every draw and used for hover / click hit-testing.
    let pinHits: { x: number; y: number; n: number }[] = [];

    function fit() {
      const sz = Math.min(wrapRef.current ? wrapRef.current.clientWidth : 420, 460);
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = sz * dpr;
      canvas!.height = sz * dpr;
      canvas!.style.width = sz + 'px';
      canvas!.style.height = sz + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      return sz;
    }

    let size = fit();
    const projection = geoOrthographic().clipAngle(90).precision(0.4);
    const path = geoPath(projection, ctx);

    function place() {
      size = fit();
      projection.scale(size / 2 - 2).translate([size / 2, size / 2]);
    }
    place();

    // Is a [lng, lat] point on the visible (front) hemisphere right now?
    function isFront(coord: [number, number]) {
      const center: [number, number] = [-lambda, -phi];
      return geoDistance(coord, center) < Math.PI / 2;
    }

    function roundRect(x: number, y: number, w: number, h: number, r: number) {
      ctx!.beginPath();
      ctx!.moveTo(x + r, y);
      ctx!.arcTo(x + w, y, x + w, y + h, r);
      ctx!.arcTo(x + w, y + h, x, y + h, r);
      ctx!.arcTo(x, y + h, x, y, r);
      ctx!.arcTo(x, y, x + w, y, r);
      ctx!.closePath();
    }

    function drawPin(x: number, y: number, n: number, hovered: boolean) {
      const r = hovered ? 11 : 8.5;
      if (hovered) {
        ctx!.beginPath();
        ctx!.arc(x, y, r + 3, 0, 2 * Math.PI);
        ctx!.fillStyle = 'rgba(247,241,230,0.92)';
        ctx!.fill();
      }
      ctx!.beginPath();
      ctx!.arc(x, y, r, 0, 2 * Math.PI);
      ctx!.fillStyle = hovered ? CONFIG.accent : CONFIG.ink;
      ctx!.fill();
      ctx!.lineWidth = 1.5;
      ctx!.strokeStyle = CONFIG.paper;
      ctx!.stroke();
      ctx!.fillStyle = CONFIG.paper;
      ctx!.font = `600 ${hovered ? 12 : 11}px ${CONFIG.font}`;
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      ctx!.fillText(String(n), x, y + 0.5);
    }

    function drawLabel(x: number, y: number, text: string) {
      ctx!.font = `600 12.5px ${CONFIG.font}`;
      const w = ctx!.measureText(text).width;
      const padX = 9;
      const h = 24;
      const bw = w + padX * 2;
      let bx = x - bw / 2;
      const by = y - 16 - h; // sit above the pin
      bx = Math.max(2, Math.min(bx, size - bw - 2)); // keep within canvas
      roundRect(bx, by, bw, h, 5);
      ctx!.fillStyle = CONFIG.paper;
      ctx!.fill();
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = '#d8cdb9';
      ctx!.stroke();
      ctx!.fillStyle = CONFIG.ink;
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      ctx!.fillText(text, bx + bw / 2, by + h / 2 + 0.5);
    }

    function draw() {
      if (disposed) return;
      projection.rotate([lambda, phi]);
      ctx!.clearRect(0, 0, size, size);

      // solid ocean sphere — no gradient, no rim
      ctx!.beginPath();
      path({ type: 'Sphere' });
      ctx!.fillStyle = CONFIG.ocean;
      ctx!.fill();

      // solid land — no outlines
      if (land) {
        ctx!.beginPath();
        path(land);
        ctx!.fillStyle = CONFIG.land;
        ctx!.fill();
      }

      const theStops = stopsRef.current;
      const theStart = startRef.current;

      // dashed route line through start + every stop, in order. geoPath clips
      // it to the visible hemisphere automatically.
      const lineCoords = [
        ...(theStart ? [theStart] : []),
        ...theStops.map((s) => s.coords),
      ];
      if (lineCoords.length > 1) {
        ctx!.beginPath();
        path({ type: 'LineString', coordinates: lineCoords });
        ctx!.strokeStyle = CONFIG.ink;
        ctx!.lineWidth = 1.5;
        ctx!.setLineDash([4, 5]);
        ctx!.stroke();
        ctx!.setLineDash([]);
      }

      // start marker (small hollow dot, not interactive)
      if (theStart && isFront(theStart)) {
        const p = projection(theStart);
        if (p) {
          ctx!.beginPath();
          ctx!.arc(p[0], p[1], 4.5, 0, 2 * Math.PI);
          ctx!.fillStyle = CONFIG.paper;
          ctx!.fill();
          ctx!.lineWidth = 1.5;
          ctx!.strokeStyle = CONFIG.ink;
          ctx!.stroke();
        }
      }

      // numbered pins (front-facing only), recording hit targets
      pinHits = [];
      let hoverLabel: { x: number; y: number; text: string } | null = null;
      for (const s of theStops) {
        if (!isFront(s.coords)) continue;
        const p = projection(s.coords);
        if (!p) continue;
        const hovered = hoverN === s.stopNumber;
        drawPin(p[0], p[1], s.stopNumber, hovered);
        pinHits.push({ x: p[0], y: p[1], n: s.stopNumber });
        if (hovered) hoverLabel = { x: p[0], y: p[1], text: s.country };
      }
      if (hoverLabel) drawLabel(hoverLabel.x, hoverLabel.y, hoverLabel.text);

      // auto-spin unless the user is dragging or hovering the globe
      if (!dragging && !hovering) lambda += CONFIG.spin;
      raf = requestAnimationFrame(draw);
    }

    // ---- pointer helpers ---------------------------------------------------
    function clientPoint(e: MouseEvent | TouchEvent) {
      return 'touches' in e ? e.touches[0] : e;
    }
    // nearest front-facing pin within a small radius of a client point
    function hitTest(clientX: number, clientY: number): number | null {
      const rect = canvas!.getBoundingClientRect();
      const mx = clientX - rect.left;
      const my = clientY - rect.top;
      for (const p of pinHits) {
        const dx = p.x - mx;
        const dy = p.y - my;
        if (dx * dx + dy * dy <= 15 * 15) return p.n;
      }
      return null;
    }

    // ---- drag to spin + hover + click -------------------------------------
    function onDown(e: MouseEvent | TouchEvent) {
      dragging = true;
      moved = false;
      const p = clientPoint(e);
      lastX = p.clientX;
      lastY = p.clientY;
      downX = p.clientX;
      downY = p.clientY;
    }
    function onMove(e: MouseEvent | TouchEvent) {
      const p = clientPoint(e);
      if (dragging) {
        if (Math.hypot(p.clientX - downX, p.clientY - downY) > 4) moved = true;
        lambda += (p.clientX - lastX) * CONFIG.drag;
        phi = Math.max(-90, Math.min(90, phi - (p.clientY - lastY) * CONFIG.drag));
        lastX = p.clientX;
        lastY = p.clientY;
        canvas!.style.cursor = 'grabbing';
        if (e.cancelable) e.preventDefault();
        return;
      }
      // hover hit-test (mouse only; touch has no hover)
      hoverN = hitTest(p.clientX, p.clientY);
      canvas!.style.cursor = hoverN !== null ? 'pointer' : 'grab';
    }
    function onUp(e: MouseEvent | TouchEvent) {
      if (dragging && !moved) {
        // a click / tap, not a drag → navigate if it landed on a pin
        const hit = hitTest(downX, downY);
        if (hit !== null) navRef.current(`/stop/${hit}`);
      }
      dragging = false;
      canvas!.style.cursor = hovering ? 'grab' : 'default';
      void e;
    }
    function onEnter() {
      hovering = true;
    }
    function onLeave() {
      hovering = false;
      hoverN = null;
      canvas!.style.cursor = 'grab';
    }

    canvas.style.cursor = 'grab';
    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('mouseenter', onEnter);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);

    // fetch country shapes, then start
    fetch(WORLD_URL)
      .then((res) => res.json())
      .then((world: Topology) => {
        if (disposed) return;
        // merge all countries into one shape so there are NO internal borders.
        // NOTE: merge() needs the geometries *array* at runtime (the @types
        // signature also allows a GeometryCollection, but that throws).
        const countries = world.objects.countries as GeometryCollection;
        land = merge(world, countries.geometries as Array<TopoPolygon | TopoMultiPolygon>);
        draw();
      })
      .catch(() => {
        draw();
      });

    const onResize = () => place();
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('mouseenter', onEnter);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <div className="hero__globe" ref={wrapRef}>
      <canvas ref={canvasRef} className="globe-canvas" />
    </div>
  );
}
