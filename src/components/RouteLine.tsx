/* =========================================================================
   ROUTE LINE  ·  self-drawing line with numbered, clickable nodes
   ---------------------------------------------------------------------------
   Nodes are evenly spaced with a gentle vertical sine wave. Hover (or focus)
   a node to reveal a little card with that stop's info; click to open its
   page. The path draws in and the nodes pop in staggered (see styles.css).
   ========================================================================= */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RouteStop {
  stopNumber: number;
  country: string;
}

export function RouteLine({ stops }: { stops: RouteStop[] }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState<number | null>(null);

  const W = 1000;
  const H = 150;
  const pad = 60;
  const n = stops.length;

  const nodes = stops.map((stop, i) => ({
    stop,
    i,
    x: pad + (i * (W - pad * 2)) / (n - 1),
    y: H / 2 + Math.sin(i * 0.9) * 26,
  }));

  const d = nodes.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const go = (i: number) => navigate(`/stop/${stops[i].stopNumber}`);
  const clear = (i: number) => setHover((h) => (h === i ? null : h));

  return (
    <div className="routemap">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet">
        <path
          className="route-path"
          d={d}
          fill="none"
          stroke="var(--terracotta)"
          strokeWidth="2.5"
          strokeDasharray="6 9"
          strokeLinecap="round"
        />
        {nodes.map((p) => (
          <g
            key={p.i}
            className="route-node"
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            aria-label={`Stop ${p.stop.stopNumber}: ${p.stop.country}`}
            onClick={() => go(p.i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                go(p.i);
              }
            }}
            onMouseEnter={() => setHover(p.i)}
            onMouseLeave={() => clear(p.i)}
            onFocus={() => setHover(p.i)}
            onBlur={() => clear(p.i)}
          >
            <circle cx={p.x} cy={p.y} r="15" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <text
              x={p.x}
              y={p.y + 4.5}
              textAnchor="middle"
              fontFamily="var(--sans)"
              fontSize="13"
              fill="var(--ink)"
            >
              {p.i + 1}
            </text>
          </g>
        ))}
      </svg>

      {/* Hover/focus preview cards — one per node, positioned below it.
          Purely informational (pointer-events: none); the node handles
          clicks and keyboard activation. */}
      {nodes.map((p) => {
        const xPct = (p.x / W) * 100;
        const yPct = (p.y / H) * 100;
        // anchor edge cards inward so they don't overflow the column
        const tx = xPct < 20 ? '0%' : xPct > 80 ? '-100%' : '-50%';
        return (
          <div
            key={p.i}
            className="route-card-anchor"
            style={{ left: `${xPct}%`, top: `${yPct}%`, transform: `translate(${tx}, 16px)` }}
          >
            <div
              className={'route-card' + (hover === p.i ? ' is-visible' : '')}
              aria-hidden={hover !== p.i}
            >
              <span className="route-card__num">Stop {p.stop.stopNumber}</span>
              <span className="route-card__country">{p.stop.country}</span>
              <span className="route-card__go">Open page →</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
