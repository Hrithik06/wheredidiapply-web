import { useState } from "react";

const B = {
  gold:    "#FFC947",
  coral:   "#FF6B6B",
  mint:    "#06D6A0",
  lavender:"#A78BFA",
  dark:    "#1E2D5F",
  midnight:"#0A0F1E",
};

// ─── MARK VARIATIONS ──────────────────────────────────────────────────────────
// All are NH monograms — differ in background shape, letterform weight,
// crossbar treatment, and gradient direction

// V1 — Rounded square, white letters, coral→gold crossbar, path underline
const NH1 = ({ size = 40 }) => {
  const s = size / 40;
  const id = `nh1-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={B.dark} />
          <stop offset="100%" stopColor="#2A3F8A" />
        </linearGradient>
        <linearGradient id={`${id}-bar`} x1="0" y1="0" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={B.coral} />
          <stop offset="100%" stopColor={B.gold} />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill={`url(#${id}-bg)`} />
      {/* N */}
      <path d="M6 29 L6 11 L16 27 L16 11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* H uprights */}
      <line x1="22" y1="11" x2="22" y2="29" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="34" y1="11" x2="34" y2="29" stroke="white" strokeWidth="3" strokeLinecap="round" />
      {/* H crossbar — gradient accent */}
      <line x1="22" y1="20" x2="34" y2="20" stroke={`url(#${id}-bar)`} strokeWidth="3" strokeLinecap="round" />
      {/* Underline path */}
      <path d="M6 33 Q20 30.5 34 33" stroke={`url(#${id}-bar)`} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
};

// V2 — Pill/stadium shape, tighter letterforms, gold crossbar, no underline
const NH2 = ({ size = 40 }) => {
  const id = `nh2-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={B.coral} />
          <stop offset="100%" stopColor="#FF8E53" />
        </linearGradient>
      </defs>
      {/* Pill bg */}
      <rect width="40" height="40" rx="20" fill={`url(#${id}-bg)`} />
      {/* N — slightly condensed */}
      <path d="M7 28 L7 12 L15.5 26 L15.5 12" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* H */}
      <line x1="21" y1="12" x2="21" y2="28" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
      <line x1="33" y1="12" x2="33" y2="28" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
      {/* H crossbar — white, clean */}
      <line x1="21" y1="20" x2="33" y2="20" stroke="white" strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
};

// V3 — Square sharp corners (no radius), bold geometry, gold bg
const NH3 = ({ size = 40 }) => {
  const id = `nh3-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={B.gold} />
          <stop offset="100%" stopColor="#FF9F1C" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="8" fill={`url(#${id}-bg)`} />
      {/* N — heavier weight */}
      <path d="M6 29 L6 11 L16 27 L16 11" stroke={B.dark} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* H */}
      <line x1="22" y1="11" x2="22" y2="29" stroke={B.dark} strokeWidth="3.2" strokeLinecap="round" />
      <line x1="34" y1="11" x2="34" y2="29" stroke={B.dark} strokeWidth="3.2" strokeLinecap="round" />
      <line x1="22" y1="20" x2="34" y2="20" stroke={B.dark} strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
};

// V4 — Outlined / ghost mark, no fill bg — works on any bg
const NH4 = ({ size = 40, onDark = false }) => {
  const id = `nh4-${size}-${onDark}`;
  const stroke = onDark ? "white" : B.dark;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id={`${id}-bar`} x1="0" y1="0" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={B.coral} />
          <stop offset="100%" stopColor={B.gold} />
        </linearGradient>
      </defs>
      {/* Border */}
      <rect x="1.5" y="1.5" width="37" height="37" rx="9" stroke={stroke} strokeWidth="1.5" fill="none" opacity="0.25" />
      {/* N */}
      <path d="M8 28 L8 12 L17 26 L17 12" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* H */}
      <line x1="23" y1="12" x2="23" y2="28" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" />
      <line x1="33" y1="12" x2="33" y2="28" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" />
      <line x1="23" y1="20" x2="33" y2="20" stroke={`url(#${id}-bar)`} strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
};

// V5 — Gradient bg (coral→gold diagonal), white letters, no underline, tightest
const NH5 = ({ size = 40 }) => {
  const id = `nh5-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={B.gold} />
          <stop offset="40%" stopColor={B.coral} />
          <stop offset="100%" stopColor="#FF5252" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill={`url(#${id}-bg)`} />
      {/* Subtle inner glow ring */}
      <rect x="2" y="2" width="36" height="36" rx="8.5" stroke="white" strokeWidth="0.6" fill="none" opacity="0.15" />
      {/* N */}
      <path d="M6.5 28.5 L6.5 11.5 L16 26.5 L16 11.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* H */}
      <line x1="22" y1="11.5" x2="22" y2="28.5" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="33.5" y1="11.5" x2="33.5" y2="28.5" stroke="white" strokeWidth="3" strokeLinecap="round" />
      {/* Crossbar with slight opacity difference */}
      <line x1="22" y1="20" x2="33.5" y2="20" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
};

// ─── Wordmark ─────────────────────────────────────────────────────────────────
const Wordmark = ({ Mark, markSize, textSize, subSize, theme, tagline }) => {
  const headColor  = theme === "dark" ? "#F1F5F9" : B.dark;
  const mutedColor = theme === "dark" ? "#64748B"  : "#94A3B8";
  return (
    <div style={{ display:"flex", alignItems: tagline ? "flex-start" : "center", gap:10 }}>
      <Mark size={markSize} />
      <div>
        <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:textSize, letterSpacing:"-0.03em", lineHeight:1.05 }}>
          <span style={{ color:headColor }}>Neat</span><span style={{ color:B.coral }}>Hunt</span>
        </div>
        {tagline ? (
          <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:subSize, color:mutedColor, marginTop:4, lineHeight:1.5 }}>
            Your job search,{" "}<span style={{ color:B.gold, fontWeight:800 }}>finally under control.</span>
          </div>
        ) : (
          <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:subSize, color:B.gold, letterSpacing:"0.07em", textTransform:"uppercase", lineHeight:1, marginTop:2 }}>
            job tracker
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const VARIANTS = [
  { id:1, label:"Dark + Underline", sub:"Recommended",       component: NH1 },
  { id:2, label:"Pill + Coral",     sub:"Friendly / warm",   component: NH2 },
  { id:3, label:"Bold + Gold",      sub:"High energy",       component: NH3 },
  { id:4, label:"Ghost / Outline",  sub:"Versatile overlay", component: NH4 },
  { id:5, label:"Gradient Burst",   sub:"Most vibrant",      component: NH5 },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function NHMonoKit() {
  const [active, setActive] = useState(1);
  const current = VARIANTS.find(v => v.id === active);
  const Mark = current.component;

  return (
    <div style={{ fontFamily:"'Nunito',sans-serif", background:"#FFFBF2", minHeight:"100vh", padding:"36px 20px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        .vc { transition:all 0.18s; cursor:pointer; }
        .vc:hover { transform:translateY(-3px); }
      `}</style>

      <div style={{ maxWidth:860, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:11, fontWeight:800, color:B.coral, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>NH Monogram</div>
          <h1 style={{ fontSize:34, fontWeight:900, color:B.dark, letterSpacing:"-0.04em", margin:"0 0 6px" }}>
            Neat<span style={{ color:B.coral }}>Hunt</span>
          </h1>
          <p style={{ color:"#94A3B8", fontSize:12, fontWeight:600, margin:0 }}>
            5 mark variations · same letterforms, different treatments
          </p>
        </div>

        {/* Variant picker */}
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginBottom:32 }}>
          {VARIANTS.map(v => {
            const M = v.component;
            const on = active === v.id;
            return (
              <div key={v.id} className="vc" onClick={() => setActive(v.id)}
                   style={{
                     background: on ? "#FFF0E0" : "#fff",
                     border: `2px solid ${on ? B.coral : "#FFE4B5"}`,
                     borderRadius:16, padding:"16px 16px 12px",
                     display:"flex", flexDirection:"column", alignItems:"center", gap:10,
                     minWidth: 140,
                     boxShadow: on ? "0 6px 20px rgba(255,107,107,0.18)" : "0 2px 8px rgba(0,0,0,0.04)",
                   }}>
                <M size={48} />
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:12, fontWeight:800, color:B.dark }}>{v.label}</div>
                  <div style={{ fontSize:10, color: on ? B.coral : "#94A3B8", fontWeight:700, marginTop:2 }}>{v.sub}</div>
                </div>
                {on && <div style={{ fontSize:9, color:B.coral, fontWeight:800, letterSpacing:"0.05em", textTransform:"uppercase" }}>Selected ✓</div>}
              </div>
            );
          })}
        </div>

        {/* ── Full tagline lockup ── */}
        <div style={{ marginBottom:10 }}>
          <div style={{ fontSize:10, fontWeight:800, color:"#94A3B8", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10 }}>Full lockup with tagline</div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <div style={{ flex:1, minWidth:280, background:"#fff", border:"1.5px solid #FFE4B5", borderRadius:16, padding:"28px 24px" }}>
              <Wordmark Mark={Mark} markSize={52} textSize={28} subSize={13} theme="light" tagline />
            </div>
            <div style={{ flex:1, minWidth:280, background:B.midnight, border:"1.5px solid #1E2D5F", borderRadius:16, padding:"28px 24px" }}>
              <Wordmark Mark={Mark} markSize={52} textSize={28} subSize={13} theme="dark" tagline />
            </div>
          </div>
        </div>

        {/* ── Navbar simulation ── */}
        <div style={{ marginBottom:10 }}>
          <div style={{ fontSize:10, fontWeight:800, color:"#94A3B8", letterSpacing:"0.08em", textTransform:"uppercase", margin:"20px 0 10px" }}>
            Navbar — how it actually looks in your app
          </div>
          {/* Sunrise navbar */}
          <div style={{ background:"#FFFBF2", border:"1.5px solid #FFE4B5", borderRadius:14, padding:"14px 20px", marginBottom:8, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <Wordmark Mark={Mark} markSize={32} textSize={17} subSize={9} theme="light" />
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              {["Features","How it works","FAQ"].map(l => (
                <span key={l} style={{ fontSize:12, fontWeight:700, color:"#94A3B8" }}>{l}</span>
              ))}
              <div style={{ background:B.dark, color:"#fff", fontSize:11, fontWeight:800, padding:"7px 14px", borderRadius:10 }}>Get started free →</div>
            </div>
          </div>
          {/* Midnight navbar */}
          <div style={{ background:"#111827", border:"1.5px solid #1E2D5F", borderRadius:14, padding:"14px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <Wordmark Mark={Mark} markSize={32} textSize={17} subSize={9} theme="dark" />
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              {["Features","How it works","FAQ"].map(l => (
                <span key={l} style={{ fontSize:12, fontWeight:700, color:"#475569" }}>{l}</span>
              ))}
              <div style={{ background:`linear-gradient(135deg,${B.coral},#FF8E53)`, color:"#fff", fontSize:11, fontWeight:800, padding:"7px 14px", borderRadius:10 }}>Get started free →</div>
            </div>
          </div>
        </div>

        {/* ── Dashboard sidebar simulation ── */}
        <div style={{ marginBottom:10 }}>
          <div style={{ fontSize:10, fontWeight:800, color:"#94A3B8", letterSpacing:"0.08em", textTransform:"uppercase", margin:"20px 0 10px" }}>
            Dashboard sidebar
          </div>
          <div style={{ display:"flex", gap:10 }}>
            {/* Sunrise sidebar */}
            <div style={{ width:200, background:"#1E2D5F", borderRadius:14, padding:"18px 16px 18px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <Mark size={32} />
                <div>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:15, letterSpacing:"-0.02em", color:"#fff" }}>
                    Neat<span style={{ color:B.coral }}>Hunt</span>
                  </div>
                  <div style={{ fontSize:9, fontWeight:800, color:B.gold, letterSpacing:"0.06em", textTransform:"uppercase" }}>YOU'VE GOT THIS ✨</div>
                </div>
              </div>
              {["🏠 Dashboard","📋 Applications","🗓️ Interviews","📈 Analytics"].map((item, i) => (
                <div key={item} style={{ padding:"9px 10px", borderRadius:8, marginTop:4, background: i === 0 ? "rgba(255,201,71,0.15)" : "transparent", borderLeft: i === 0 ? `3px solid ${B.gold}` : "3px solid transparent" }}>
                  <span style={{ fontSize:12, fontWeight: i === 0 ? 800 : 600, color: i === 0 ? B.gold : "#8B9EC7" }}>{item}</span>
                </div>
              ))}
            </div>
            {/* Midnight sidebar */}
            <div style={{ width:200, background:"#0A0F1E", border:"1.5px solid #1E2D5F", borderRadius:14, padding:"18px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <Mark size={32} />
                <div>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:15, letterSpacing:"-0.02em", color:"#F1F5F9" }}>
                    Neat<span style={{ color:B.coral }}>Hunt</span>
                  </div>
                  <div style={{ fontSize:9, fontWeight:800, color:B.gold, letterSpacing:"0.06em", textTransform:"uppercase" }}>YOU'VE GOT THIS ✨</div>
                </div>
              </div>
              {["🏠 Dashboard","📋 Applications","🗓️ Interviews","📈 Analytics"].map((item, i) => (
                <div key={item} style={{ padding:"9px 10px", borderRadius:8, marginTop:4, background: i === 0 ? "rgba(255,201,71,0.12)" : "transparent", borderLeft: i === 0 ? `3px solid ${B.gold}` : "3px solid transparent" }}>
                  <span style={{ fontSize:12, fontWeight: i === 0 ? 800 : 600, color: i === 0 ? B.gold : "#475569" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sunrise all sizes ── */}
        <div style={{ marginBottom:10 }}>
          <div style={{ fontSize:10, fontWeight:800, color:"#94A3B8", letterSpacing:"0.08em", textTransform:"uppercase", margin:"20px 0 10px" }}>☀️ Sunrise — wordmark sizes</div>
          {[
            { bg:"#FFFBF2", border:"#FFE4B5", label:"Page bg"    },
            { bg:"#ffffff", border:"#FFE4B5", label:"Card / navbar" },
          ].map(ctx => (
            <div key={ctx.label} style={{ background:ctx.bg, border:`1.5px solid ${ctx.border}`, borderRadius:14, padding:"15px 20px", marginBottom:8, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:24, flexWrap:"wrap" }}>
                <Wordmark Mark={Mark} markSize={24} textSize={12} subSize={7}  theme="light" />
                <Wordmark Mark={Mark} markSize={32} textSize={16} subSize={9}  theme="light" />
                <Wordmark Mark={Mark} markSize={40} textSize={22} subSize={11} theme="light" />
              </div>
              <div style={{ fontSize:9, color:"#94A3B8", fontWeight:700 }}>{ctx.label}</div>
            </div>
          ))}
        </div>

        {/* ── Midnight all sizes ── */}
        <div style={{ marginBottom:10 }}>
          <div style={{ fontSize:10, fontWeight:800, color:"#94A3B8", letterSpacing:"0.08em", textTransform:"uppercase", margin:"20px 0 10px" }}>🌙 Midnight — wordmark sizes</div>
          {[
            { bg:"#0A0F1E", border:"#1E2D5F", label:"Page bg"  },
            { bg:"#111827", border:"#1E2D5F", label:"Navbar"   },
            { bg:"#1E2D5F", border:"#2D3F7A", label:"Sidebar"  },
          ].map(ctx => (
            <div key={ctx.label} style={{ background:ctx.bg, border:`1.5px solid ${ctx.border}`, borderRadius:14, padding:"15px 20px", marginBottom:8, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:24, flexWrap:"wrap" }}>
                <Wordmark Mark={Mark} markSize={24} textSize={12} subSize={7}  theme="dark" />
                <Wordmark Mark={Mark} markSize={32} textSize={16} subSize={9}  theme="dark" />
                <Wordmark Mark={Mark} markSize={40} textSize={22} subSize={11} theme="dark" />
              </div>
              <div style={{ fontSize:9, color:"#475569", fontWeight:700 }}>{ctx.label}</div>
            </div>
          ))}
        </div>

        {/* ── Icon sizes ── */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:10, fontWeight:800, color:"#94A3B8", letterSpacing:"0.08em", textTransform:"uppercase", margin:"20px 0 10px" }}>
            Icon only — all sizes
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {[
              { bg:"#fff",     border:"#FFE4B5", dark:false, label:"Light" },
              { bg:B.midnight, border:"#1E2D5F", dark:true,  label:"Dark"  },
            ].map(ctx => (
              <div key={ctx.label} style={{ flex:1, minWidth:260, background:ctx.bg, border:`1.5px solid ${ctx.border}`, borderRadius:14, padding:"18px 20px" }}>
                <div style={{ fontSize:9, color: ctx.dark ? "#475569" : "#94A3B8", fontWeight:700, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.07em" }}>{ctx.label}</div>
                <div style={{ display:"flex", alignItems:"flex-end", gap:16, flexWrap:"wrap" }}>
                  {[12, 16, 20, 24, 32, 40, 48, 64].map(sz => (
                    <div key={sz} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                      <Mark size={sz} />
                      <span style={{ fontSize:8, color: ctx.dark ? "#475569" : "#94A3B8", fontWeight:700 }}>{sz}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── All 5 compare ── */}
        <div>
          <div style={{ fontSize:10, fontWeight:800, color:"#94A3B8", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10 }}>All 5 — quick compare</div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {[
              { bg:"#FFFBF2", border:"#FFE4B5", dark:false, label:"☀️ Sunrise"  },
              { bg:B.midnight,border:"#1E2D5F", dark:true,  label:"🌙 Midnight" },
            ].map(ctx => (
              <div key={ctx.label} style={{ flex:1, minWidth:300, background:ctx.bg, border:`1.5px solid ${ctx.border}`, borderRadius:14, padding:"16px 18px" }}>
                <div style={{ fontSize:9, fontWeight:800, color: ctx.dark ? "#475569" : "#94A3B8", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>{ctx.label}</div>
                <div style={{ display:"flex", gap:18, alignItems:"center", flexWrap:"wrap" }}>
                  {VARIANTS.map(v => {
                    const M = v.component;
                    return (
                      <div key={v.id} onClick={() => setActive(v.id)}
                           style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, cursor:"pointer",
                                    opacity: active === v.id ? 1 : 0.35, transition:"opacity 0.2s" }}>
                        <M size={38} />
                        <span style={{ fontSize:8, fontWeight:800, color: ctx.dark ? "#475569" : "#94A3B8", textAlign:"center", maxWidth:56, lineHeight:1.3 }}>
                          {v.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
