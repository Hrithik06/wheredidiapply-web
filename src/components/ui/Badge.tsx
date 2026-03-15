import { STATUS_CFG } from "@/features/dashboard/data/statusConfig";

// ── Badge — only needs isMidnight (display mode, not theme tokens) ─
const Badge = ({
  status,
  isMidnight,
}: {
  status: string;
  isMidnight: boolean;
}) => {
  const s = STATUS_CFG[status as keyof typeof STATUS_CFG];
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
      style={{
        color: isMidnight ? s.darkColor : s.color,
        background: isMidnight ? s.darkBg : s.bg,
      }}
    >
      {s.emoji} {status}
    </span>
  );
};
export default Badge;
