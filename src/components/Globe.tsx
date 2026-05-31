/* =========================================================================
   GLOBE  ·  clean rotating 3D earth for the hero
   ---------------------------------------------------------------------------
   Real continents (d3-geo orthographic) on a canvas. Flat, solid, no lines,
   no shading. Auto-spins slowly, and you can DRAG it with the mouse / finger.

   Tweak the look in the CONFIG block below.
   ========================================================================= */

import { useEffect, useRef } from 'react';
import { geoOrthographic, geoPath } from 'd3-geo';
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
  spin: 0.1, // auto-spin degrees per frame (lower = slower)
  drag: 0.3, // drag sensitivity (degrees per pixel)
};

const WORLD_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export function Globe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    let lastX = 0;
    let lastY = 0;

    function fit() {
      const size = Math.min(wrapRef.current ? wrapRef.current.clientWidth : 420, 460);
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = size * dpr;
      canvas!.height = size * dpr;
      canvas!.style.width = size + 'px';
      canvas!.style.height = size + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      return size;
    }

    let size = fit();
    const projection = geoOrthographic().clipAngle(90).precision(0.4);
    const path = geoPath(projection, ctx);

    function place() {
      size = fit();
      projection.scale(size / 2 - 2).translate([size / 2, size / 2]);
    }
    place();

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

      if (!dragging) lambda += CONFIG.spin;
      raf = requestAnimationFrame(draw);
    }

    // ---- drag to spin ------------------------------------------------------
    function clientPoint(e: MouseEvent | TouchEvent) {
      return 'touches' in e ? e.touches[0] : e;
    }
    function onDown(e: MouseEvent | TouchEvent) {
      dragging = true;
      const p = clientPoint(e);
      lastX = p.clientX;
      lastY = p.clientY;
      canvas!.style.cursor = 'grabbing';
    }
    function onMove(e: MouseEvent | TouchEvent) {
      if (!dragging) return;
      const p = clientPoint(e);
      lambda += (p.clientX - lastX) * CONFIG.drag;
      phi = Math.max(-90, Math.min(90, phi - (p.clientY - lastY) * CONFIG.drag));
      lastX = p.clientX;
      lastY = p.clientY;
      if (e.cancelable) e.preventDefault();
    }
    function onUp() {
      dragging = false;
      canvas!.style.cursor = 'grab';
    }

    canvas.style.cursor = 'grab';
    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
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
