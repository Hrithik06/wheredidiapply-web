import { useTheme } from "@/context/ThemeContext";
import { FEATURES } from "../data/features";

const FeaturesSection = () => {
  const { isMidnight } = useTheme();
  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-10">
      <div className="text-center mb-12">
        <h2
          className="text-4xl font-black tracking-tight mb-3"
          style={{ color: "var(--heading)" }}
        >
          Everything your job search needs 🛠️
        </h2>
        <p
          className="text-base font-semibold max-w-md mx-auto"
          style={{ color: "var(--muted)" }}
        >
          Designed for developers and UI folks who apply everywhere and track
          nothing.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {FEATURES.map((f, i) => (
          <div
            key={i}
            className="feat-card rounded-2xl p-7 border transition-all duration-300 cursor-default"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
              style={{ background: isMidnight ? f.darkBg : f.lightBg }}
            >
              {f.emoji}
            </div>
            <h3
              className="font-black text-base mb-2"
              style={{ color: "var(--heading)" }}
            >
              {f.title}
            </h3>
            <p
              className="text-sm font-semibold leading-relaxed"
              style={{ color: "var(--body)" }}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
