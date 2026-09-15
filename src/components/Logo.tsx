// Inline atom / electron-orbit mark, redrawn from the Electrons visiting
// card logo (three tilted orbit rings + electrons around a nucleus) as a
// crisp vector — no raster asset needed, and it doubles as the favicon/OG
// mark (see AtomMarkPaths below).
export function AtomMark({ size = 24 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="rotate(0 50 50)">
        <ellipse cx="50" cy="50" rx="36" ry="15" stroke="#2563eb" strokeWidth="4" />
      </g>
      <g transform="rotate(60 50 50)">
        <ellipse cx="50" cy="50" rx="36" ry="15" stroke="#e0245e" strokeWidth="4" />
      </g>
      <g transform="rotate(120 50 50)">
        <ellipse cx="50" cy="50" rx="36" ry="15" stroke="#0c3f8e" strokeWidth="4" />
      </g>
      <circle cx="50" cy="50" r="7" fill="#0a1628" />
      <circle cx="85.5" cy="50" r="4.5" fill="#2563eb" />
      <circle cx="31.8" cy="63" r="4.5" fill="#e0245e" />
      <circle cx="31.8" cy="37" r="4.5" fill="#0c3f8e" />
    </svg>
  );
}

export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-xl bg-surface-2 border border-border-strong"
      style={{ width: size, height: size }}
    >
      <AtomMark size={Math.round(size * 0.72)} />
    </span>
  );
}
