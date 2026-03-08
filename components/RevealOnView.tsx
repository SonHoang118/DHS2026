"use client";

import { useEffect, useRef, useState } from "react";

const revealedKeys = new Set<string>();

type RevealOnViewProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  onceKey?: string;
};

export default function RevealOnView({
  children,
  className,
  threshold = 0.2,
  rootMargin = "0px",
  once = true,
  onceKey,
}: RevealOnViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(() => (onceKey ? revealedKeys.has(onceKey) : false));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (once && onceKey && revealedKeys.has(onceKey)) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once && onceKey) {
            revealedKeys.add(onceKey);
          }
          if (once) {
            observer.unobserve(node);
          }
          return;
        }

        if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, onceKey, rootMargin, threshold]);

  return (
    <div
      ref={ref}
      data-reveal-visible={visible ? "true" : "false"}
      className={`${className ?? ""} ${mounted ? "transition-all duration-800 ease-out" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(42px)",
      }}
    >
      {children}
    </div>
  );
}
