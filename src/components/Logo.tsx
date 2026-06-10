interface LogoProps {
  variant?: "light" | "dark";
  width?: number;
  height?: number;
  idPrefix?: string;
}

export default function Logo({
  variant = "light",
  width = 200,
  height = 45,
  idPrefix = "logo",
}: LogoProps) {
  const trustColor = variant === "dark" ? "#f9fafb" : "#111827";
  const gradNfc = `${idPrefix}-nfcG1`;

  return (
    <svg width={width} height={height} viewBox="0 0 300 68" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradNfc} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb"/>
          <stop offset="100%" stopColor="#1d4ed8"/>
        </linearGradient>
      </defs>
      <rect x="2" y="12" width="50" height="44" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.2"/>
      <rect x="11" y="21" width="12" height="9" rx="2" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.8"/>
      <path d="M32 27 Q38 27 38 34 Q38 41 32 41" fill="none" stroke={`url(#${gradNfc})`} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M34 23 Q44 23 44 34 Q44 45 34 45" fill="none" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
      <path d="M36 19 Q50 19 50 34 Q50 49 36 49" fill="none" stroke="#2563eb" strokeWidth="1" strokeLinecap="round" opacity="0.22"/>
      <circle cx="28" cy="34" r="2.5" fill="#1d4ed8"/>
      <text x="66" y="40" fontFamily="'DM Sans','Helvetica Neue',Arial,sans-serif" fontSize="29" fontWeight="800" letterSpacing="-0.5">
        <tspan fill={trustColor}>Trust</tspan><tspan fill="#2563eb">Tapz</tspan>
      </text>
      <text x="67" y="56" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="10" fill="#6b7280" letterSpacing="2">ÉÉN TIK. MEER KLANTEN.</text>
    </svg>
  );
}
