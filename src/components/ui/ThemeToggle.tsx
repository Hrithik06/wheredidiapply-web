type Props = {
  onToggle: () => void;
  icon: string;
  label: string;
};

// No `t` prop — styling comes from CSS vars (--toggle-bg, --toggle-text)
// Only icon + label stay in JS since they're content, not styles
export default function ThemeToggle({ onToggle, icon, label }: Props) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black border-0 cursor-pointer transition-all duration-300"
      style={{
        background: "var(--toggle-bg)",
        color: "var(--toggle-text)",
        fontFamily: "inherit",
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
