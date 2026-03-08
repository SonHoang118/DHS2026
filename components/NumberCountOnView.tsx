"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const completedCountKeys = new Set<string>();

type ParsedValue = {
  target: number;
  decimals: number;
  suffix: string;
};

type NumberCountOnViewProps = {
  value: string;
  durationMs?: number;
  threshold?: number;
  rootMargin?: string;
  onceKey?: string;
};

function parseValue(value: string): ParsedValue | null {
  const plusOrPercent = value.match(/^(\d+(?:\.\d+)?)(\+|%)$/);
  if (plusOrPercent) {
    const target = Number.parseFloat(plusOrPercent[1]);
    const decimals = (plusOrPercent[1].split(".")[1] || "").length;
    return { target, decimals, suffix: plusOrPercent[2] };
  }

  const fraction = value.match(/^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (fraction) {
    const target = Number.parseFloat(fraction[1]);
    const decimals = (fraction[1].split(".")[1] || "").length;
    return { target, decimals, suffix: `/${fraction[2]}` };
  }

  const plain = value.match(/^(\d+(?:\.\d+)?)$/);
  if (plain) {
    const target = Number.parseFloat(plain[1]);
    const decimals = (plain[1].split(".")[1] || "").length;
    return { target, decimals, suffix: "" };
  }

  return null;
}

function formatProgressValue(current: number, decimals: number): string {
  if (decimals === 0) {
    return Math.round(current).toString();
  }

  const factor = 10 ** decimals;
  const rounded = Math.round(current * factor) / factor;
  return rounded.toFixed(decimals);
}

function easeInOutCubic(t: number): number {
  if (t < 0.5) {
    return 4 * t * t * t;
  }
  return 1 - ((-2 * t + 2) ** 3) / 2;
}

export default function NumberCountOnView({
  value,
  durationMs,
  threshold = 0.4,
  rootMargin = "0px 0px -10% 0px",
  onceKey,
}: NumberCountOnViewProps) {
  const parsed = useMemo(() => parseValue(value), [value]);
  const resolvedDurationMs = useMemo(() => {
    if (durationMs) {
      return durationMs;
    }
    if (!parsed) {
      return 1400;
    }
    return Math.min(2200, Math.max(1100, 900 + parsed.target * 6));
  }, [durationMs, parsed]);
  const hostRef = useRef<HTMLSpanElement | null>(null);
  const lastTextRef = useRef("");
  const [canStart, setCanStart] = useState(() => (onceKey ? completedCountKeys.has(onceKey) : false));
  const [display, setDisplay] = useState(() => {
    if (!parsed) {
      return value;
    }
    if (onceKey && completedCountKeys.has(onceKey)) {
      return value;
    }
    const zero = parsed.decimals > 0 ? (0).toFixed(parsed.decimals) : "0";
    return `${zero}${parsed.suffix}`;
  });

  useEffect(() => {
    if (!parsed) {
      return;
    }

    if (onceKey && completedCountKeys.has(onceKey)) {
      setCanStart(true);
      setDisplay(value);
      lastTextRef.current = value;
      return;
    }

    const node = hostRef.current;
    if (!node) {
      return;
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanStart(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [onceKey, parsed, rootMargin, threshold, value]);

  useEffect(() => {
    if (!parsed) {
      setDisplay(value);
      lastTextRef.current = value;
      return;
    }

    if (!canStart) {
      return;
    }

    if (onceKey && completedCountKeys.has(onceKey)) {
      setDisplay(value);
      lastTextRef.current = value;
      return;
    }

    let frame = 0;
    const startedAt = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startedAt;
      const progress = Math.min(1, elapsed / Math.max(100, resolvedDurationMs));
      const eased = easeInOutCubic(progress);
      const current = parsed.target * eased;
      const formatted = progress >= 1
        ? parsed.target.toFixed(parsed.decimals)
        : formatProgressValue(current, parsed.decimals);
      const text = `${formatted}${parsed.suffix}`;

      if (text !== lastTextRef.current) {
        lastTextRef.current = text;
        setDisplay(text);
      }

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
        return;
      }

      if (onceKey) {
        completedCountKeys.add(onceKey);
      }
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [canStart, onceKey, parsed, resolvedDurationMs, value]);

  return <span ref={hostRef}>{display}</span>;
}
