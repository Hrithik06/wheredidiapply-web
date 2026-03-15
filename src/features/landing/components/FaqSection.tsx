import FaqItem from "./FaqItem";
import { FAQ } from "../data/faq";
const FaqSection = () => {
  return (
    <section id="faq" className="max-w-2xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h2
          className="text-4xl font-black tracking-tight"
          style={{ color: "var(--heading)" }}
        >
          Questions? Got answers. 💬
        </h2>
      </div>
      <div className="space-y-3">
        {FAQ.map((f, i) => (
          <FaqItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
