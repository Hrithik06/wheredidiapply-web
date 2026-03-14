const Logo = ({ size = 40 }) => {
  const id = `nh-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient
          id={`${id}-bg`}
          x1="0"
          y1="0"
          x2="40"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1E2D5F" />
          <stop offset="100%" stopColor="#2A3F8A" />
        </linearGradient>
        <linearGradient
          id={`${id}-bar`}
          x1="0"
          y1="0"
          x2="40"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FFC947" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill={`url(#${id}-bg)`} />
      <path
        d="M6 29 L6 11 L16 27 L16 11"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="22"
        y1="11"
        x2="22"
        y2="29"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="34"
        y1="11"
        x2="34"
        y2="29"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="20"
        x2="34"
        y2="20"
        stroke={`url(#${id}-bar)`}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M6 33 Q20 30.5 34 33"
        stroke={`url(#${id}-bar)`}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
export default Logo;
