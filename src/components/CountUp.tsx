import { useEffect, useMemo, useRef, useState } from 'react';

type CountUpProps = {
  value: string | number;
  durationMs?: number;
  startOnView?: boolean;
};

function parseNumericValue(input: string | number) {
  const raw = String(input);
  const match = raw.match(/-?\d+(?:\.\d+)?/);
  if (!match) {
    return { raw, target: null as number | null, prefix: '', suffix: raw, decimals: 0 };
  }

  const numericText = match[0];
  const target = Number(numericText);
  const decimals = (numericText.split('.')[1]?.length ?? 0);

  const startIndex = match.index ?? 0;
  const endIndex = startIndex + numericText.length;

  const prefix = raw.slice(0, startIndex);
  const suffix = raw.slice(endIndex);

  return { raw, target, prefix, suffix, decimals };
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

const CountUp = ({ value, durationMs = 1200, startOnView = true }: CountUpProps) => {
  const { raw, target, prefix, suffix, decimals } = useMemo(() => parseNumericValue(value), [value]);

  const [display, setDisplay] = useState(() => {
    if (target === null) return raw;
    const zero = decimals > 0 ? (0).toFixed(decimals) : '0';
    return `${prefix}${zero}${suffix}`;
  });

  const spanRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (target === null) {
      setDisplay(raw);
      return;
    }

    hasAnimatedRef.current = false;
    const element = spanRef.current;
    let rafId = 0;
    let startTime = 0;

    const start = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      const tick = (now: number) => {
        if (!startTime) startTime = now;
        const t = Math.min(1, (now - startTime) / durationMs);
        const eased = easeOutCubic(t);
        const current = target * eased;

        const formatted = decimals > 0 ? current.toFixed(decimals) : String(Math.floor(current));
        setDisplay(`${prefix}${formatted}${suffix}`);

        if (t < 1) rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    if (!startOnView || !element || typeof IntersectionObserver === 'undefined') {
      start();
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    io.observe(element);

    return () => {
      io.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [raw, target, prefix, suffix, decimals, durationMs, startOnView]);

  return <span ref={spanRef}>{display}</span>;
};

export default CountUp;
