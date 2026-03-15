import { useEffect, useState } from "react";

// ── AnimCount — no theme dependency ──────────────────────────────
const AnimCount = ({ target }: { target: number }) => {
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
export default AnimCount;
