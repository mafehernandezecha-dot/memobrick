// A single 2x2 LEGO-style brick in Memobrick lime, seen from above.
export function Logo() {
  return (
    <svg className="logo" width="30" height="30" viewBox="0 0 30 30" aria-hidden>
      <rect x="1" y="1" width="28" height="28" rx="8" fill="#C6E03A" />
      <rect x="1" y="1" width="28" height="28" rx="8" fill="url(#lg)" />
      {[
        [10, 10],
        [20, 10],
        [10, 20],
        [20, 20],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy + 0.9} r="3.6" fill="#9DB52A" />
          <circle cx={cx} cy={cy} r="3.6" fill="#D4EA5A" />
          <circle cx={cx - 1} cy={cy - 1} r="1.1" fill="#F2FAC4" />
        </g>
      ))}
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".25" />
          <stop offset="1" stopColor="#000" stopOpacity=".06" />
        </linearGradient>
      </defs>
    </svg>
  );
}
