/* =========================================================================
   ICONS  ·  inline SVGs (compass for the nav brand, map-pin for stop cards)
   ========================================================================= */

interface IconProps {
  className?: string;
}

/* A small map-pin icon. */
export function Pin({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* A slowly-rotating compass for the nav brand. */
export function Compass({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9.5" />
      <polygon points="12,6 14,12 12,18 10,12" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.1" fill="var(--paper)" stroke="none" />
    </svg>
  );
}
