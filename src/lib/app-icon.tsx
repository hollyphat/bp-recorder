export function AppIconSvg({ size, rounded = 0.22 }: { size: number; rounded?: number }) {
  const radius = size * rounded;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 21s-7.5-4.6-10-9.3C.5 8.1 2.3 4.5 6 4.5c2.1 0 3.6 1.2 4.5 2.4.3.4.9.4 1.2 0C12.6 5.7 14.1 4.5 16.2 4.5c3.7 0 5.5 3.6 4 7.2C19.5 16.4 12 21 12 21z"
          fill="#ffffff"
        />
        <path
          d="M4 12h3l1.5-3L11 15l1.5-5 1.5 2H20"
          stroke="#b91c1c"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
