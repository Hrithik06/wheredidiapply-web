import { BRAND } from "@/constants/brand";
import { useState } from "react";

// ── FaqItem — no theme prop, reads CSS vars directly ─────────────
const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "var(--faq-border)" }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center px-6 py-5 text-left cursor-pointer border-0 transition-colors duration-200"
        style={{ background: "var(--faq-bg)", fontFamily: "inherit" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "var(--faq-hover)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "var(--faq-bg)")
        }
      >
        <span className="font-bold text-sm" style={{ color: "var(--heading)" }}>
          {q}
        </span>
        <span
          className="text-xl shrink-0 ml-4 transition-transform duration-300"
          style={{
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            color: BRAND.coral,
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5" style={{ background: "var(--faq-bg)" }}>
          <p
            className="text-sm font-medium leading-relaxed"
            style={{ color: "var(--faq-answer)" }}
          >
            {a}
          </p>
        </div>
      )}
    </div>
  );
};
export default FaqItem;
