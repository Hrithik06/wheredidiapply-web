import { BRAND } from "@/constants/brand";
import { TESTIMONIALS } from "../data/testimonials";
const TestimonialsSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h2
          className="text-4xl font-black tracking-tight mb-3"
          style={{ color: "var(--heading)" }}
        >
          Real people, real offers 🥳
        </h2>
        <p
          className="text-base font-semibold"
          style={{ color: "var(--muted)" }}
        >
          From frustrated to hired — here's what they said.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((tm, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 border flex flex-col justify-between"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div>
              <div className="text-3xl mb-4">{tm.avatar}</div>
              <p
                className="text-sm font-semibold leading-relaxed mb-4"
                style={{ color: "var(--testimonial-q)" }}
              >
                "{tm.text}"
              </p>
            </div>
            <div>
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-black mb-3"
                style={{
                  background: "var(--highlight-bg)",
                  color: BRAND.coral,
                }}
              >
                🌟 {tm.highlight}
              </div>
              <div
                className="font-black text-sm"
                style={{ color: "var(--heading)" }}
              >
                {tm.name}
              </div>
              <div
                className="text-xs font-bold"
                style={{ color: "var(--muted)" }}
              >
                {tm.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
