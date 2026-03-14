import { useState, useEffect, useRef } from "react";
import Logo from "@/components/ui/Logo";

// ─── Brand accents — identical in both themes, warmth is always preserved ────
const BRAND = {
  gold: "#FFC947",
  coral: "#FF6B6B",
  mint: "#06D6A0",
  lavender: "#A78BFA",
  dark: "#1E2D5F",
};

// ─── Theme tokens ─────────────────────────────────────────────────────────────
const THEMES = {
  sunrise: {
    name: "sunrise",
    pageBg: "#FFFBF2",
    navScrollBg: "rgba(255,251,242,0.92)",
    navBorder: "#FFE4B5",
    cardBg: "#FFFFFF",
    cardBorder: "#FFE4B5",
    heading: "#1E2D5F",
    body: "#64748B",
    muted: "#94A3B8",
    eyebrow: { bg: "#FFF8E1", border: "#FFE082", text: "#1E2D5F" },
    faqBg: "#FFFFFF",
    faqHover: "#FFFBF2",
    faqBorder: "#FFE4B5",
    faqAnswer: "#64748B",
    footerBorder: "#FFE4B5",
    stepBg: "#FFFFFF",
    stepBorder: "#FFE4B5",
    testimonialQ: "#475569",
    highlightBg: "#FFF8E1",
    badgeBg: "#FFFFFF",
    toggleBg: "#1E2D5F",
    toggleText: "#FFC947",
    toggleIcon: "🌙",
    toggleLabel: "Midnight",
  },
  midnight: {
    name: "midnight",
    pageBg: "#0A0F1E",
    navScrollBg: "rgba(10,15,30,0.92)",
    navBorder: "#1E2D5F",
    cardBg: "#111827",
    cardBorder: "#1E2D5F",
    heading: "#F1F5F9",
    body: "#94A3B8",
    muted: "#64748B",
    eyebrow: {
      bg: "rgba(255,201,71,0.1)",
      border: "rgba(255,201,71,0.25)",
      text: "#FFC947",
    },
    faqBg: "#111827",
    faqHover: "#141D2E",
    faqBorder: "#1E2D5F",
    faqAnswer: "#94A3B8",
    footerBorder: "#1E2D5F",
    stepBg: "#111827",
    stepBorder: "#1E2D5F",
    testimonialQ: "#94A3B8",
    highlightBg: "rgba(255,201,71,0.1)",
    badgeBg: "#111827",
    toggleBg: "#E8850A", // was #FFC947
    toggleText: "#1E2D5F",
    toggleIcon: "☀️",
    toggleLabel: "Sunrise",
  },
};

const FEATURES = [
  {
    emoji: "📬",
    title: "Auto-parse your inbox",
    desc: "Connect Gmail once. NeatHunt reads your application emails and logs everything automatically. No manual entry ever.",
    color: BRAND.gold,
    lightBg: "#FFFBEB",
    darkBg: "rgba(255,201,71,0.08)",
  },
  {
    emoji: "🗺️",
    title: "Visual pipeline",
    desc: "See every application move from Applied → Screening → Interview → Offer in one beautiful board.",
    color: BRAND.coral,
    lightBg: "#FFF2F2",
    darkBg: "rgba(255,107,107,0.08)",
  },
  {
    emoji: "📊",
    title: "Smart insights",
    desc: "Which platform gets you more replies? What day of the week gets better responses? NeatHunt tells you.",
    color: BRAND.mint,
    lightBg: "#F0FDF9",
    darkBg: "rgba(6,214,160,0.08)",
  },
  {
    emoji: "🌙",
    title: "Sunrise & Midnight modes",
    desc: "Designed for 6am hustle and 2am grind alike. Switch themes that actually feel good, not just inverted colors.",
    color: BRAND.lavender,
    lightBg: "#F5F3FF",
    darkBg: "rgba(167,139,250,0.08)",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya S.",
    role: "Frontend Dev → Atlassian",
    avatar: "👩‍💻",
    text: "I was applying to 10+ companies a week and losing track. NeatHunt made me feel in control for the first time.",
    highlight: "got my offer in week 3",
  },
  {
    name: "Arjun M.",
    role: "React Dev → Razorpay",
    avatar: "👨‍💻",
    text: "The 'Vibe' column with little encouragement notes sounds silly but honestly kept me going during the rough weeks.",
    highlight: "5 interviews in 2 weeks",
  },
  {
    name: "Sneha R.",
    role: "SDE → Postman",
    avatar: "🧑‍💻",
    text: "Seeing my response rate go from 8% to 24% after optimizing which platforms I used was a game changer.",
    highlight: "response rate 3× improved",
  },
];

const STATS = [
  { value: "2,400+", label: "Job seekers using NeatHunt" },
  { value: "38%", label: "Avg response rate vs 12% baseline" },
  { value: "4.2 wk", label: "Average time to first offer" },
  { value: "0", label: "Manual data entry required" },
];

const FAQ = [
  {
    q: "Is it really free?",
    a: "Yes. NeatHunt is free while we're in beta. We'll introduce a Pro plan later for power features, but the core tracker will always be free.",
  },
  {
    q: "Does it access all my emails?",
    a: "No. NeatHunt only reads emails from job platforms (LinkedIn, Naukri, Hirist, etc.) using Gmail filters. It never reads personal emails.",
  },
  {
    q: "What if I don't use Gmail?",
    a: "Gmail is required for auto-parsing. You can still use NeatHunt manually — just log applications yourself.",
  },
  {
    q: "How is this different from a spreadsheet?",
    a: "A spreadsheet doesn't parse emails, doesn't show a pipeline, doesn't tell you your response rate, and doesn't cheer you on when you get an interview. 😄",
  },
];

// ─── Animated counter ─────────────────────────────────────────────────────────
const useCountUp = (target, duration = 1400, start = false) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (!num) return;
    let t0 = null;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setVal(Math.floor(p * num));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return val.toLocaleString() + target.replace(/[0-9.,]/g, "").trim();
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const StatItem = ({ value, label, inView }) => {
  const displayed = useCountUp(value, 1400, inView);
  return (
    <div className="text-center px-6">
      <div
        className="text-4xl font-black tracking-tight"
        style={{ color: BRAND.gold }}
      >
        {inView ? displayed : "0"}
      </div>
      <div className="text-sm font-semibold text-slate-400 mt-1 max-w-32 mx-auto leading-snug">
        {label}
      </div>
    </div>
  );
};

const FaqItem = ({ q, a, t }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: t.faqBorder }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center px-6 py-5 text-left cursor-pointer border-0 transition-colors duration-200"
        style={{ background: t.faqBg, fontFamily: "inherit" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = t.faqHover)}
        onMouseLeave={(e) => (e.currentTarget.style.background = t.faqBg)}
      >
        <span className="font-bold text-sm" style={{ color: t.heading }}>
          {q}
        </span>
        <span
          className="text-xl flex-shrink-0 ml-4 transition-transform duration-300"
          style={{
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            color: BRAND.coral,
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5" style={{ background: t.faqBg }}>
          <p
            className="text-sm font-medium leading-relaxed"
            style={{ color: t.faqAnswer }}
          >
            {a}
          </p>
        </div>
      )}
    </div>
  );
};

const ThemeToggle = ({ t, onToggle }) => (
  <button
    onClick={onToggle}
    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black border-0 cursor-pointer transition-all duration-300"
    style={{
      background: t.toggleBg,
      color: t.toggleText,
      fontFamily: "inherit",
    }}
  >
    <span>{t.toggleIcon}</span>
    <span>{t.toggleLabel}</span>
  </button>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Landing() {
  const [themeName, setThemeName] = useState("sunrise");
  const [statsInView, setStatsInView] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const statsRef = useRef(null);

  const t = THEMES[themeName];
  const isMidnight = themeName === "midnight";

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsInView(true);
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const toggle = () => {
    setThemeName((n) => (n === "sunrise" ? "midnight" : "sunrise"));
    setStatsInView(false);
    setTimeout(() => setStatsInView(true), 120);
  };

  const shadow = isMidnight
    ? "0 2px 12px rgba(0,0,0,0.35)"
    : "0 2px 12px rgba(0,0,0,0.05)";

  return (
    <div
      className="min-h-screen overflow-x-hidden transition-colors duration-500"
      style={{
        background: t.pageBg,
        fontFamily: "'Nunito','DM Sans',sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatA  { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-12px) rotate(2deg)} }
        @keyframes floatB  { 0%,100%{transform:translateY(0) rotate(3deg)}  50%{transform:translateY(-8px) rotate(-1deg)} }
        @keyframes floatC  { 0%,100%{transform:translateY(-4px)} 50%{transform:translateY(8px)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes blob    { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
        @keyframes spinSlow{ from{transform:rotate(0)} to{transform:rotate(360deg)} }
        .hero-title {
          background: linear-gradient(135deg,#1E2D5F 0%,#FF6B6B 50%,#FFC947 100%);
          background-size: 200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation: shimmer 4s linear infinite;
        }
        .blob      { animation: blob 8s ease-in-out infinite; }
        .float-a   { animation: floatA 6s ease-in-out infinite; }
        .float-b   { animation: floatB 7s ease-in-out infinite; }
        .float-c   { animation: floatC 5s ease-in-out infinite; }
        .fade-0    { animation: fadeUp .7s ease both; }
        .fade-1    { animation: fadeUp .7s ease .15s both; }
        .fade-2    { animation: fadeUp .7s ease .30s both; }
        .fade-3    { animation: fadeUp .7s ease .45s both; }
        .spin-slow { animation: spinSlow 20s linear infinite; }
        .feat-card:hover  { transform:translateY(-4px); }
        .cta-main:hover   { transform:translateY(-2px); box-shadow:0 10px 30px rgba(255,107,107,0.4) !important; }
        .cta-ghost:hover  { opacity:.75; }
      `}</style>

      {/* ── Navbar ───────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrollY > 40 ? t.navScrollBg : "transparent",
          backdropFilter: scrollY > 40 ? "blur(12px)" : "none",
          borderBottom:
            scrollY > 40 ? `1px solid ${t.navBorder}` : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            {/* <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-md"
              style={{
                background: `linear-gradient(135deg,${BRAND.gold},${BRAND.coral})`,
              }}
            >
              🎯
            </div> */}
            <Logo size={36} />
            <div>
              {/* <span
                className="font-black text-base tracking-tight"
                style={{ color: t.heading }}
              >
                NeatHunt
              </span> */}
              <span
                className="font-black text-base tracking-tight"
                style={{ color: t.heading }}
              >
                Neat
              </span>
              <span
                className="font-black text-base tracking-tight"
                style={{ color: BRAND.coral }}
              >
                Hunt
              </span>
              <span
                className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full text-white"
                style={{ background: BRAND.coral }}
              >
                BETA
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-7">
            {["Features", "How it works", "FAQ"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm font-bold no-underline transition-colors duration-200"
                style={{ color: t.muted }}
              >
                {l}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle t={t} onToggle={toggle} />
            <button
              className="cta-ghost text-sm font-bold px-4 py-2 rounded-xl border-0 bg-transparent cursor-pointer transition-opacity duration-200"
              style={{ color: t.heading, fontFamily: "inherit" }}
            >
              Sign in
            </button>
            <button
              className="cta-main text-sm font-black px-5 py-2.5 rounded-xl text-white border-0 cursor-pointer transition-all duration-200"
              style={{
                background: `linear-gradient(135deg,${BRAND.coral},#FF8E53)`,
                boxShadow: "0 4px 14px rgba(255,107,107,0.3)",
                fontFamily: "inherit",
              }}
            >
              Get started free →
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-10 text-center overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20 blob pointer-events-none"
          style={{
            background: `radial-gradient(circle,${BRAND.gold},${BRAND.coral})`,
          }}
        />
        <div
          className="absolute -top-10 -right-16 w-56 h-56 rounded-full opacity-15 blob pointer-events-none"
          style={{
            background: `radial-gradient(circle,${BRAND.lavender},${BRAND.mint})`,
            animationDelay: "3s",
          }}
        />

        <div
          className="fade-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black mb-6 border"
          style={{
            background: t.eyebrow.bg,
            borderColor: t.eyebrow.border,
            color: t.eyebrow.text,
          }}
        >
          ✨ Built for the job seeker grind
        </div>

        <h1 className="fade-1 text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6 max-w-4xl mx-auto">
          <span className="hero-title">Your job search,</span>
          <br />
          <span style={{ color: t.heading }}>finally under control.</span>
        </h1>

        <p
          className="fade-2 text-lg font-semibold max-w-xl mx-auto mb-8 leading-relaxed"
          style={{ color: t.body }}
        >
          Spreadsheets weren't built for job hunting. NeatHunt gives you a
          visual pipeline that tracks every application automatically — so
          nothing slips through the cracks. Because the hardest part isn't
          finding jobs. It's staying in the game.
        </p>
        {/* <p
          className="fade-2 text-lg font-semibold max-w-xl mx-auto mb-8 leading-relaxed"
          style={{ color: t.body }}
        >
          NeatHunt auto-tracks every application from your inbox, shows your
          pipeline visually, and keeps you motivated when the search gets hard.
        </p> */}

        <div className="fade-3 flex flex-col sm:flex-row justify-center items-center gap-3 mb-4">
          <button
            className="cta-main font-black text-base px-8 py-4 rounded-2xl text-white border-0 cursor-pointer transition-all duration-200"
            style={{
              background: `linear-gradient(135deg,${BRAND.coral},#FF8E53)`,
              boxShadow: "0 6px 20px rgba(255,107,107,0.35)",
              fontFamily: "inherit",
            }}
          >
            Start tracking for free 🚀
          </button>
          <button
            className="cta-ghost font-bold text-sm px-6 py-4 rounded-2xl border-2 cursor-pointer bg-transparent transition-opacity duration-200"
            style={{
              borderColor: isMidnight ? "rgba(255,201,71,0.3)" : "#FFE082",
              color: t.heading,
              fontFamily: "inherit",
            }}
          >
            See how it works ↓
          </button>
        </div>
        <p className="text-xs font-semibold" style={{ color: t.muted }}>
          Free forever · No credit card · Gmail required for auto-sync
        </p>

        {/* Floating badges */}
        <div className="relative h-16 mt-4 pointer-events-none select-none hidden md:block">
          {[
            { emoji: "🎉", label: "Got the offer!", x: "10%", cls: "float-a" },
            {
              emoji: "🎤",
              label: "Interview tomorrow",
              x: "25%",
              cls: "float-b",
            },
            {
              emoji: "📬",
              label: "12 apps this week",
              x: "65%",
              cls: "float-c",
            },
            {
              emoji: "📈",
              label: "38% response rate",
              x: "80%",
              cls: "float-a",
            },
          ].map((b) => (
            <div
              key={b.label}
              className={`absolute ${b.cls} flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-md`}
              style={{
                left: b.x,
                background: t.badgeBg,
                border: `1.5px solid ${BRAND.gold}30`,
                color: t.heading,
              }}
            >
              {b.emoji} {b.label}
            </div>
          ))}
        </div>
      </section>

      {/* ── Demo Video ───────────────────────────────────────────────── */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-10">
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl border-4"
          style={{
            background: BRAND.dark,
            borderColor: isMidnight ? "#1E2D5F" : "#ffffff",
          }}
        >
          {/* Chrome bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="flex-1 mx-4 bg-white/10 rounded-full px-4 py-1 text-xs text-white/40 font-mono text-center">
              app.NeatHunt.in/dashboard
            </div>
          </div>
          {/* Video area */}
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 aspect-video flex items-center justify-center group cursor-pointer">
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
            {/* TODO: swap the above for:
                <video src="/demo.mp4" poster="/thumb.jpg" controls className="w-full h-full object-cover" />
                or: <iframe src="https://youtube.com/embed/YOUR_ID" className="w-full h-full" frameBorder="0" allow="autoplay" />
            */}
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

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="max-w-5xl mx-auto px-6 py-10">
        <div
          className="rounded-3xl py-10 px-6"
          style={{ background: BRAND.dark }}
        >
          <div className="flex flex-wrap justify-center gap-8 divide-x divide-white/10">
            {STATS.map((s, i) => (
              <StatItem
                key={i}
                value={s.value}
                label={s.label}
                inView={statsInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-black tracking-tight mb-3"
            style={{ color: t.heading }}
          >
            Everything your job search needs 🛠️
          </h2>
          <p
            className="text-base font-semibold max-w-md mx-auto"
            style={{ color: t.muted }}
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
                background: t.cardBg,
                borderColor: t.cardBorder,
                boxShadow: shadow,
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
                style={{ color: t.heading }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm font-semibold leading-relaxed"
                style={{ color: t.body }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h2
            className="text-4xl font-black tracking-tight"
            style={{ color: t.heading }}
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
                  background: t.stepBg,
                  borderColor: t.stepBorder,
                  boxShadow: shadow,
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
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
                    style={{ color: t.heading }}
                  >
                    {item.title}
                  </div>
                  <p
                    className="text-sm font-semibold leading-relaxed"
                    style={{ color: t.body }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h2
            className="text-4xl font-black tracking-tight mb-3"
            style={{ color: t.heading }}
          >
            Real people, real offers 🥳
          </h2>
          <p className="text-base font-semibold" style={{ color: t.muted }}>
            From frustrated to hired — here's what they said.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((tm, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 border flex flex-col justify-between"
              style={{
                background: t.cardBg,
                borderColor: t.cardBorder,
                boxShadow: shadow,
              }}
            >
              <div>
                <div className="text-3xl mb-4">{tm.avatar}</div>
                <p
                  className="text-sm font-semibold leading-relaxed mb-4"
                  style={{ color: t.testimonialQ }}
                >
                  "{tm.text}"
                </p>
              </div>
              <div>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-black mb-3"
                  style={{ background: t.highlightBg, color: BRAND.coral }}
                >
                  🌟 {tm.highlight}
                </div>
                <div
                  className="font-black text-sm"
                  style={{ color: t.heading }}
                >
                  {tm.name}
                </div>
                <div className="text-xs font-bold" style={{ color: t.muted }}>
                  {tm.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section id="faq" className="max-w-2xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h2
            className="text-4xl font-black tracking-tight"
            style={{ color: t.heading }}
          >
            Questions? Got answers. 💬
          </h2>
        </div>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} t={t} />
          ))}
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-10 pb-20">
        <div
          className="relative rounded-3xl overflow-hidden text-center px-8 py-16"
          style={{ background: BRAND.dark }}
        >
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 spin-slow"
            style={{
              background: `conic-gradient(${BRAND.gold},${BRAND.coral},${BRAND.mint},${BRAND.lavender},${BRAND.gold})`,
            }}
          />
          <div
            className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle,${BRAND.lavender},transparent)`,
            }}
          />
          <div className="relative z-10">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-4xl font-black text-white mb-3 tracking-tight">
              Your next offer starts here.
            </h2>
            <p
              className="text-base font-semibold mb-8 max-w-md mx-auto"
              style={{ color: "#94A3B8" }}
            >
              Stop losing track. Stop the spreadsheet chaos.
              <br />
              Start your job search with clarity and confidence.
            </p>
            <button
              className="cta-main font-black text-base px-10 py-4 rounded-2xl text-white border-0 cursor-pointer transition-all duration-200 inline-block"
              style={{
                background: `linear-gradient(135deg,${BRAND.coral},#FF8E53)`,
                boxShadow: "0 6px 24px rgba(255,107,107,0.45)",
                fontFamily: "inherit",
              }}
            >
              Create your free account →
            </button>
            <p
              className="text-xs font-semibold mt-4"
              style={{ color: "#475569" }}
            >
              Free forever during beta · Setup in 2 minutes
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer
        className="border-t py-8 px-6 transition-colors duration-500"
        style={{ borderColor: t.footerBorder }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            {/* <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{
                background: `linear-gradient(135deg,${BRAND.gold},${BRAND.coral})`,
              }}
            >
              🎯
            </div> */}
            <Logo size={28} />
            {/* <span className="font-black text-sm" style={{ color: t.heading }}>
              NeatHunt
            </span> */}

            <div>
              <span className="font-black text-sm" style={{ color: t.heading }}>
                Neat
              </span>
              <span
                className="font-black text-sm"
                style={{ color: BRAND.coral }}
              >
                Hunt
              </span>
            </div>
          </div>
          <p className="text-xs font-semibold" style={{ color: t.muted }}>
            Built with ❤️ for job seekers everywhere. You've got this. 🌟
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs font-bold no-underline"
                style={{ color: t.muted }}
              >
                {l}
              </a>
            ))}
            <ThemeToggle t={t} onToggle={toggle} />
          </div>
        </div>
      </footer>
    </div>
  );
}
