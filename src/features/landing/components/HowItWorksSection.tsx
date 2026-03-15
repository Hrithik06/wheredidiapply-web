import { BRAND } from "@/constants/brand";
import { useTheme } from "@/context/ThemeContext";

const HowItWorksSection = () => {
  const { isMidnight } = useTheme();
  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h2
          className="text-4xl font-black tracking-tight"
          style={{ color: "var(--heading)" }}
        >
          Up and running in 3 steps 🏃
        </h2>
      </div>
      <div className="relative">
        <div
          className="absolute left-8 top-10 bottom-10 w-0.5 hidden md:block"
          style={{
            background: `linear-gradient(to bottom,${BRAND.gold},${BRAND.coral},${BRAND.mint})`,
          }}
        />
        <div className="space-y-6">
          {[
            {
              step: "01",
              emoji: "🔗",
              title: "Connect Gmail",
              desc: "One click OAuth. NeatHunt only reads emails from job platforms — nothing personal, ever.",
              color: BRAND.gold,
            },
            {
              step: "02",
              emoji: "⚡",
              title: "Watch it auto-fill",
              desc: "Every application email gets parsed and logged automatically. Platform, company, status, date — all done.",
              color: BRAND.coral,
            },
            {
              step: "03",
              emoji: "🎯",
              title: "Take back control",
              desc: "Open your dashboard, see your pipeline, spot patterns, and get hired. Simple.",
              color: BRAND.mint,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-6 rounded-2xl p-6 border md:ml-16"
              style={{
                background: "var(--step-bg)",
                borderColor: "var(--step-border)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{
                  background: item.color + (isMidnight ? "18" : "22"),
                }}
              >
                {item.emoji}
              </div>
              <div>
                <div
                  className="text-xs font-black mb-0.5"
                  style={{ color: item.color }}
                >
                  STEP {item.step}
                </div>
                <div
                  className="font-black text-base mb-1.5"
                  style={{ color: "var(--heading)" }}
                >
                  {item.title}
                </div>
                <p
                  className="text-sm font-semibold leading-relaxed"
                  style={{ color: "var(--body)" }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
