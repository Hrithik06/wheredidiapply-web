import { useState, useEffect } from "react";
import Logo from "@/components/ui/Logo";
// ─── Theme Tokens ─────────────────────────────────────────────────────────────
// Sunrise = warm morning energy
// Midnight = cozy late-night grind (NOT cold dark mode — same warmth, dimmed)
const THEMES = {
  sunrise: {
    // backgrounds
    pageBg: "bg-amber-50",
    cardBg: "bg-white",
    sidebarBg: "bg-slate-900",
    inputBg: "bg-amber-50",
    tableHeadBg: "bg-amber-50",
    rowHoverBg: "hover:bg-amber-50",
    pillInactive: "bg-stone-100 text-stone-400",
    // text
    heading: "text-slate-900",
    subtext: "text-stone-400",
    sidebarText: "text-slate-400",
    sidebarActive: "text-amber-400",
    // borders
    border: "border-amber-100",
    // hero card
    heroCard: "bg-slate-900",
    heroText: "text-white",
    heroSub: "text-amber-400",
    // misc
    toggleBg: "bg-slate-800",
    toggleIcon: "🌙",
    toggleLabel: "Midnight",
    name: "sunrise",
  },
  midnight: {
    pageBg: "bg-slate-950",
    cardBg: "bg-slate-900",
    sidebarBg: "bg-slate-950",
    inputBg: "bg-slate-800",
    tableHeadBg: "bg-slate-950",
    rowHoverBg: "hover:bg-slate-800",
    pillInactive: "bg-slate-800 text-slate-500",
    heading: "text-amber-50",
    subtext: "text-slate-500",
    sidebarText: "text-slate-500",
    sidebarActive: "text-amber-400",
    border: "border-slate-800",
    heroCard: "bg-indigo-950",
    heroText: "text-white",
    heroSub: "text-amber-400",
    // toggleBg: "bg-amber-400",
    toggleBg: "bg-orange-600",
    toggleIcon: "☀️",
    toggleLabel: "Sunrise",
    name: "midnight",
  },
};

// Brand accent colors — same in both themes (warmth is preserved)
const BRAND = {
  gold: "#FFC947",
  coral: "#FF6B6B",
  mint: "#06D6A0",
  lavender: "#A78BFA",
};

const JOBS = [
  {
    id: 1,
    company: "Stripe",
    role: "Frontend Engineer",
    status: "Interview",
    date: "Jul 1",
    platform: "LinkedIn",
    salary: "₹28L",
    logo: "💳",
  },
  {
    id: 2,
    company: "Razorpay",
    role: "React Developer",
    status: "Applied",
    date: "Jul 3",
    platform: "Naukri",
    salary: "₹22L",
    logo: "💸",
  },
  {
    id: 3,
    company: "Atlassian",
    role: "UI Engineer",
    status: "Offer",
    date: "Jun 28",
    platform: "LinkedIn",
    salary: "₹35L",
    logo: "🔷",
  },
  {
    id: 4,
    company: "Flipkart",
    role: "SDE-2 Frontend",
    status: "Rejected",
    date: "Jun 20",
    platform: "Hirist",
    salary: "₹30L",
    logo: "🛒",
  },
  {
    id: 5,
    company: "Postman",
    role: "Frontend Dev",
    status: "Applied",
    date: "Jul 5",
    platform: "LinkedIn",
    salary: "₹26L",
    logo: "📮",
  },
  {
    id: 6,
    company: "Swiggy",
    role: "Senior UI Engineer",
    status: "Screening",
    date: "Jul 4",
    platform: "Naukri",
    salary: "₹32L",
    logo: "🍜",
  },
  {
    id: 7,
    company: "Notion",
    role: "Product Engineer",
    status: "Interview",
    date: "Jul 2",
    platform: "LinkedIn",
    salary: "₹40L",
    logo: "📝",
  },
  {
    id: 8,
    company: "Meesho",
    role: "React Native Dev",
    status: "Applied",
    date: "Jul 6",
    platform: "Hirist",
    salary: "₹20L",
    logo: "🛍️",
  },
];

const STATUS_CFG = {
  Applied: {
    color: "#B45309",
    bg: "#FEF3C7",
    darkBg: "#292011",
    darkColor: "#FCD34D",
    emoji: "📬",
    msg: "Sent with love ✨",
  },
  Screening: {
    color: "#7C3AED",
    bg: "#EDE9FE",
    darkBg: "#1E1330",
    darkColor: "#C4B5FD",
    emoji: "🔍",
    msg: "They're curious!",
  },
  Interview: {
    color: "#D97706",
    bg: "#FFFBEB",
    darkBg: "#1F1500",
    darkColor: "#FDE68A",
    emoji: "🎤",
    msg: "Shine bright ⭐",
  },
  Offer: {
    color: "#059669",
    bg: "#D1FAE5",
    darkBg: "#052E1A",
    darkColor: "#6EE7B7",
    emoji: "🎉",
    msg: "Celebrate!! 🥳",
  },
  Rejected: {
    color: "#6B7280",
    bg: "#F3F4F6",
    darkBg: "#1C1C1C",
    darkColor: "#9CA3AF",
    emoji: "🌱",
    msg: "Next one's yours",
  },
};

const AFFIRMATIONS = [
  "Every application is a step forward 🚀",
  "Your dream role is out there 🌟",
  "Persistence pays off. Keep going! 💪",
  "You're closer than you think ✨",
  "Each rejection is redirection 🌈",
];

const NAV = [
  { icon: "🏠", label: "Dashboard" },
  { icon: "📋", label: "Applications" },
  { icon: "🗓️", label: "Interviews" },
  { icon: "📈", label: "Analytics" },
  { icon: "⚙️", label: "Settings" },
];

// ─── Confetti ─────────────────────────────────────────────────────────────────
const Confetti = () => {
  const pieces = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: [BRAND.gold, BRAND.coral, BRAND.mint, BRAND.lavender][i % 4],
    delay: Math.random() * 0.8,
    size: 5 + Math.random() * 5,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <style>{`
        @keyframes confettiFall {
          0%   { transform:translateY(-10px) rotate(0deg); opacity:1; }
          100% { transform:translateY(110px) rotate(360deg); opacity:0; }
        }
      `}</style>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            animation: `confettiFall 2s ease-in ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

// ─── Animated Counter ─────────────────────────────────────────────────────────
const AnimCount = ({ target }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 20));
    const t = setInterval(() => {
      n = Math.min(n + step, target);
      setVal(n);
      if (n >= target) clearInterval(t);
    }, 40);
    return () => clearInterval(t);
  }, [target]);
  return <>{val}</>;
};

// ─── Badge ────────────────────────────────────────────────────────────────────
const Badge = ({ status, midnight }) => {
  const s = STATUS_CFG[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
      style={{
        color: midnight ? s.darkColor : s.color,
        background: midnight ? s.darkBg : s.bg,
      }}
    >
      {s.emoji} {status}
    </span>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ emoji, label, value, t, isHero }) => (
  <div
    className={`relative flex-1 min-w-32 rounded-2xl p-5 overflow-hidden ${isHero ? t.heroCard : t.cardBg} border ${isHero ? "border-transparent shadow-xl" : t.border}`}
  >
    {isHero && (
      <>
        <div
          className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10"
          style={{ background: BRAND.gold }}
        />
        <div
          className="absolute -bottom-6 -left-4 w-16 h-16 rounded-full opacity-10"
          style={{ background: BRAND.coral }}
        />
      </>
    )}
    <div className="text-2xl mb-2">{emoji}</div>
    <div
      className={`text-3xl font-black leading-none ${isHero ? t.heroText : t.heading}`}
    >
      <AnimCount
        target={typeof value === "number" ? value : parseInt(value) || 0}
      />
      {typeof value === "string" && value.includes("%") ? "%" : ""}
    </div>
    <div className={`text-xs font-bold mt-2 ${isHero ? t.heroSub : t.subtext}`}>
      {label}
    </div>
  </div>
);

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
const ThemeToggle = ({ t, onToggle }) => (
  <button
    onClick={onToggle}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${t.toggleBg} ${t.name === "midnight" ? "text-slate-900" : "text-amber-200"}`}
  >
    <span>{t.toggleIcon}</span>
    <span>{t.toggleLabel}</span>
  </button>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DashboardV2() {
  const [themeName, setThemeName] = useState("sunrise");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [affIdx, setAffIdx] = useState(0);
  const [activeNav, setActiveNav] = useState(0);

  const t = THEMES[themeName];
  const isMidnight = themeName === "midnight";

  useEffect(() => {
    const timer = setInterval(
      () => setAffIdx((i) => (i + 1) % AFFIRMATIONS.length),
      4000,
    );
    return () => clearInterval(timer);
  }, []);

  const counts = JOBS.reduce(
    (a, j) => ({ ...a, [j.status]: (a[j.status] || 0) + 1 }),
    {},
  );
  const responseRate = Math.round(
    (JOBS.filter((j) => j.status !== "Applied").length / JOBS.length) * 100,
  );

  const filtered = JOBS.filter(
    (j) =>
      (filter === "All" || j.status === filter) &&
      (j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.role.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div
      className={`flex min-h-screen ${t.pageBg} transition-colors duration-500`}
      style={{ fontFamily: "'Nunito', 'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes fadeUp   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ticker   { 0%{opacity:0;transform:translateY(8px)} 15%,85%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-8px)} }
        @keyframes glow     { 0%,100%{box-shadow:0 0 8px 2px rgba(255,201,71,0.2)} 50%{box-shadow:0 0 18px 4px rgba(255,201,71,0.4)} }
        .fade-up            { animation: fadeUp 0.5s ease both; }
        .fade-up-1          { animation: fadeUp 0.5s ease 0.1s both; }
        .fade-up-2          { animation: fadeUp 0.5s ease 0.2s both; }
        .fade-up-3          { animation: fadeUp 0.5s ease 0.3s both; }
        .ticker-text        { animation: ticker 4s ease-in-out forwards; }
        .offer-glow         { animation: glow 2.5s ease-in-out infinite; }
        .cta-btn:hover      { transform: translateY(-2px); }
        .nav-item:hover     { background: rgba(255,201,71,0.1); }
        .app-row:hover td   { background: rgba(255,201,71,0.04); }
      `}</style>

      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <aside
        className={`w-56 ${t.sidebarBg} flex flex-col py-6 shrink-0 sticky top-0 h-screen transition-colors duration-500`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-5 pb-7">
          {/* <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-lg"
            style={{
              background: `linear-gradient(135deg,${BRAND.gold},${BRAND.coral})`,
            }}
          >
            🎯
          </div>
          <div>
            <div className="text-white font-black text-sm tracking-tight">
              NeatHunt
            </div>
            <div className="text-xs font-bold" style={{ color: BRAND.gold }}>
              YOU'VE GOT THIS ✨
            </div>
          </div> */}
          <Logo size={40} />
          <div>
            <div className="font-black text-sm tracking-tight">
              <span className="text-white">Neat</span>
              <span style={{ color: BRAND.coral }}>Hunt</span>
            </div>
            <div className="text-xs font-bold" style={{ color: BRAND.gold }}>
              YOU'VE GOT THIS ✨
            </div>
          </div>
        </div>

        {/* Affirmation ticker */}
        <div
          className="mx-3 mb-5 rounded-xl px-3 py-3 border-l-4 min-h-12 overflow-hidden"
          style={{
            background: "rgba(255,201,71,0.08)",
            borderColor: BRAND.gold,
          }}
        >
          <p
            key={affIdx}
            className="ticker-text text-xs font-bold leading-relaxed"
            style={{ color: BRAND.gold }}
          >
            {AFFIRMATIONS[affIdx]}
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1">
          {NAV.map((item, i) => (
            <button
              key={item.label}
              className="nav-item w-full flex items-center gap-3 px-5 py-3 transition-all duration-150 cursor-pointer border-0 bg-transparent border-l-4 text-left"
              style={{
                borderColor: activeNav === i ? BRAND.gold : "transparent",
              }}
              onClick={() => setActiveNav(i)}
            >
              <span className="text-base">{item.icon}</span>
              <span
                className={`text-sm ${activeNav === i ? t.sidebarActive + " font-black" : t.sidebarText + " font-medium"}`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Bottom growth card */}
        <div
          className="mx-3 rounded-xl p-4 border"
          style={{
            background: isMidnight
              ? "rgba(6,214,160,0.07)"
              : "rgba(6,214,160,0.1)",
            borderColor: "rgba(6,214,160,0.2)",
          }}
        >
          <div className="text-xl mb-1">🌱</div>
          <div
            className="text-xs font-bold leading-relaxed"
            style={{ color: BRAND.mint }}
          >
            {counts.Offer || 0} offer{(counts.Offer || 0) !== 1 ? "s" : ""} so
            far!
            <br />
            <span className="font-medium opacity-75">Keep planting seeds.</span>
          </div>
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────────────────────────────── */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-7 fade-up">
          <div>
            <h1 className={`text-2xl font-black tracking-tight ${t.heading}`}>
              {isMidnight ? "Burning the midnight oil 🌙" : "Good morning! 👋"}
            </h1>
            <p className={`text-sm font-semibold mt-1 ${t.subtext}`}>
              {isMidnight
                ? "Late nights build great careers. Here's your progress."
                : "Your job search is going great — here's your progress."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle
              t={t}
              onToggle={() =>
                setThemeName((n) => (n === "sunrise" ? "midnight" : "sunrise"))
              }
            />
            <button
              className="cta-btn flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black text-white border-0 cursor-pointer transition-all duration-200"
              style={{
                background: `linear-gradient(135deg,${BRAND.coral},#FF8E53)`,
                boxShadow: `0 4px 14px rgba(255,107,107,0.3)`,
              }}
            >
              + Log Application
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="flex gap-3 mb-6 flex-wrap fade-up-1">
          <StatCard
            emoji="📨"
            label="Total Applied"
            value={JOBS.length}
            t={t}
            isHero
          />
          <StatCard
            emoji="🎤"
            label="Interviews"
            value={counts.Interview || 0}
            t={t}
          />
          <StatCard emoji="🎉" label="Offers" value={counts.Offer || 0} t={t} />
          <StatCard
            emoji="📊"
            label="Response Rate"
            value={`${responseRate}%`}
            t={t}
          />
        </div>

        {/* Pipeline + Trophy row */}
        <div className="flex gap-5 mb-6 flex-wrap fade-up-2">
          {/* Pipeline */}
          <div
            className={`flex-1 min-w-72 ${t.cardBg} rounded-2xl p-6 border ${t.border} transition-colors duration-500`}
          >
            <div className={`font-black text-sm mb-4 ${t.heading}`}>
              🗺️ Your Journey
            </div>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(STATUS_CFG).map(([s, cfg]) => (
                <button
                  key={s}
                  onClick={() => setFilter(filter === s ? "All" : s)}
                  className="flex-1 min-w-16 rounded-2xl py-4 px-3 text-center relative overflow-hidden cursor-pointer border-2 transition-all duration-200 bg-transparent"
                  style={{
                    background: isMidnight ? cfg.darkBg : cfg.bg,
                    borderColor:
                      filter === s
                        ? isMidnight
                          ? cfg.darkColor
                          : cfg.color
                        : "transparent",
                  }}
                >
                  {s === "Offer" && (counts.Offer || 0) > 0 && <Confetti />}
                  <div className="text-xl mb-1">{cfg.emoji}</div>
                  <div
                    className="text-xl font-black"
                    style={{ color: isMidnight ? cfg.darkColor : cfg.color }}
                  >
                    {counts[s] || 0}
                  </div>
                  <div
                    className="text-xs font-bold mt-0.5"
                    style={{ color: isMidnight ? cfg.darkColor : cfg.color }}
                  >
                    {s}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trophy card */}
          <div
            className="w-48 shrink-0 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden offer-glow"
            style={{ background: `linear-gradient(135deg,#1E2D5F,#2D3F7A)` }}
          >
            <div
              className="absolute -top-5 -right-5 w-20 h-20 rounded-full opacity-10"
              style={{ background: BRAND.gold }}
            />
            <div>
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-white font-black text-sm leading-snug">
                {responseRate}% response rate!
              </div>
              <div
                className="text-xs font-bold mt-2"
                style={{ color: BRAND.gold }}
              >
                Industry avg is ~12%.
                <br />
                You're ahead. 🔥
              </div>
            </div>
            <div
              className="mt-4 rounded-xl px-3 py-2"
              style={{ background: "rgba(255,201,71,0.15)" }}
            >
              <div className="text-xs font-black" style={{ color: BRAND.gold }}>
                🎤 {counts.Interview || 0} interview
                {(counts.Interview || 0) !== 1 ? "s" : ""} lined up!
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div
          className={`${t.cardBg} rounded-2xl border ${t.border} overflow-hidden fade-up-3 transition-colors duration-500`}
        >
          {/* Toolbar */}
          <div
            className={`flex justify-between items-center flex-wrap gap-3 px-6 py-4 border-b ${t.border}`}
          >
            <div className={`font-black text-sm ${t.heading}`}>
              📋 All Applications
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Search…"
                className={`${t.inputBg} ${t.heading} border ${t.border} rounded-xl px-3 py-2 text-xs font-semibold outline-none w-40 transition-colors duration-500`}
                style={{ fontFamily: "inherit" }}
              />
              {["All", ...Object.keys(STATUS_CFG)].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className="rounded-full px-3 py-1.5 text-xs font-bold cursor-pointer border-0 transition-all duration-200"
                  style={{
                    fontFamily: "inherit",
                    background:
                      filter === s
                        ? s === "All"
                          ? BRAND.gold
                          : isMidnight
                            ? STATUS_CFG[s]?.darkBg
                            : STATUS_CFG[s]?.bg
                        : isMidnight
                          ? "rgba(255,255,255,0.05)"
                          : "#F5F0E8",
                    color:
                      filter === s
                        ? s === "All"
                          ? "#1E2D5F"
                          : isMidnight
                            ? STATUS_CFG[s]?.darkColor
                            : STATUS_CFG[s]?.color
                        : isMidnight
                          ? "#64748B"
                          : "#A8A29E",
                  }}
                >
                  {s === "All" ? "✨ All" : `${STATUS_CFG[s].emoji} ${s}`}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr className={t.tableHeadBg}>
                {[
                  "Company",
                  "Role",
                  "Platform",
                  "Salary",
                  "Date",
                  "Status",
                  "Vibe",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-5 py-3 text-left text-xs font-black uppercase tracking-widest ${t.subtext}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((job) => (
                <tr
                  key={job.id}
                  className={`app-row border-t ${t.border} cursor-pointer transition-colors duration-150`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${isMidnight ? "bg-slate-800" : "bg-amber-50"}`}
                      >
                        {job.logo}
                      </span>
                      <span className={`font-black text-sm ${t.heading}`}>
                        {job.company}
                      </span>
                    </div>
                  </td>
                  <td
                    className={`px-5 py-4 text-xs font-semibold ${t.subtext}`}
                  >
                    {job.role}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        background:
                          job.platform === "LinkedIn"
                            ? isMidnight
                              ? "#0A1929"
                              : "#E8F0FE"
                            : job.platform === "Naukri"
                              ? isMidnight
                                ? "#1F0A0A"
                                : "#FEE8E8"
                              : isMidnight
                                ? "#091F0F"
                                : "#F0FEF8",
                        color:
                          job.platform === "LinkedIn"
                            ? isMidnight
                              ? "#60A5FA"
                              : "#1565C0"
                            : job.platform === "Naukri"
                              ? isMidnight
                                ? "#F87171"
                                : "#C62828"
                              : isMidnight
                                ? "#34D399"
                                : "#1B5E20",
                      }}
                    >
                      {job.platform}
                    </span>
                  </td>
                  <td className={`px-5 py-4 text-sm font-black ${t.heading}`}>
                    {job.salary}
                  </td>
                  <td
                    className={`px-5 py-4 text-xs font-semibold ${t.subtext}`}
                  >
                    {job.date}
                  </td>
                  <td className="px-5 py-4">
                    <Badge status={job.status} midnight={isMidnight} />
                  </td>
                  <td
                    className="px-5 py-4 text-xs font-bold"
                    style={{
                      color: isMidnight
                        ? STATUS_CFG[job.status].darkColor
                        : STATUS_CFG[job.status].color,
                    }}
                  >
                    {STATUS_CFG[job.status].msg}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-14 text-center">
                    <div className="text-3xl mb-2">🔍</div>
                    <div className={`text-sm font-semibold ${t.subtext}`}>
                      No results — try a different search!
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
