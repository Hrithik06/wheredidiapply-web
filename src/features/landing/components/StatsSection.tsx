import StatItem from "@/components/ui/StatItem";
import { BRAND } from "@/constants/brand";
import { useTheme } from "@/context/ThemeContext";

import { useEffect, useRef, useState } from "react";
import { STATS } from "../data/stats";

const StatsSection = () => {
  const { isMidnight } = useTheme();
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLElement>(null);

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

  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return; // skip on first mount
    }
    // only runs on actual isMidnight changes after mount
    setStatsInView(false);
    setTimeout(() => setStatsInView(true), 120);
  }, [isMidnight]);

  return (
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
  );
};

export default StatsSection;
