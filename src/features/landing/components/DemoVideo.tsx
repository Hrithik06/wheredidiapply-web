import { BRAND } from "@/constants/brand";
import { useTheme } from "@/context/ThemeContext";
const DemoVideo = () => {
  const { isMidnight } = useTheme();
  return (
    <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-10">
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl border-4"
        style={{
          background: BRAND.dark,
          borderColor: isMidnight ? "#1E2D5F" : "#ffffff",
        }}
      >
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="flex-1 mx-4 bg-white/10 rounded-full px-4 py-1 text-xs text-white/40 font-mono text-center">
            app.NeatHunt.in/dashboard
          </div>
        </div>
        <div className="relative bg-linear-to-br from-slate-900 to-slate-800 aspect-video flex items-center justify-center group cursor-pointer">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(${BRAND.gold}33 1px,transparent 1px),linear-gradient(90deg,${BRAND.gold}33 1px,transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-64 h-64 rounded-full opacity-10"
              style={{
                background: `radial-gradient(circle,${BRAND.gold},transparent)`,
              }}
            />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg,${BRAND.coral},#FF8E53)`,
                boxShadow: `0 0 40px rgba(255,107,107,0.5)`,
              }}
            >
              <div
                className="w-0 h-0 ml-1.5"
                style={{
                  borderTop: "12px solid transparent",
                  borderBottom: "12px solid transparent",
                  borderLeft: "20px solid white",
                }}
              />
            </div>
            <div className="text-center">
              <div className="text-white font-black text-lg">
                Watch 2-min demo
              </div>
              <div className="text-slate-400 text-sm font-semibold mt-1">
                See NeatHunt in action — no signup needed
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-8 px-6 py-4 border-t border-white/10">
          {[
            "Auto-parse emails ✉️",
            "Visual pipeline 🗺️",
            "Smart insights 📊",
          ].map((c) => (
            <span
              key={c}
              className="text-xs font-bold"
              style={{ color: BRAND.gold }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;
