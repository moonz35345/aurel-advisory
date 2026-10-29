"use client";
import { useI18n } from "@/components/locale-provider";

import { useEffect, useRef, useState } from "react";
const statistics = [
  { value: 120, suffix: "+", label: "Ambitions brought into focus" },
  { value: 18, suffix: "", label: "European markets explored" },
  { value: 94, suffix: "%", label: "Example project alignment" },
  { value: 15, suffix: "+", label: "Years of imagined expertise" },
];
export function Statistics() {
  const { t } = useI18n();

  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setProgress(1);
          return;
        }
        let start: number;
        const animate = (time: number) => {
          start ??= time;
          const p = Math.min((time - start) / 1300, 1);
          setProgress(1 - Math.pow(1 - p, 3));
          if (p < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid" ref={ref}>
          {statistics.map((stat) => (
            <div key={stat.label}>
              <span className="stat-number" aria-hidden="true">
                {Math.round(stat.value * progress)}
                <span>{stat.suffix}</span>
              </span>
              <span className="sr-only">
                {stat.value}
                {stat.suffix}
              </span>
              <p>{t(stat.label)}</p>
            </div>
          ))}
        </div>
        <p className="stats-disclaimer">
          {t(
            "ILLUSTRATIVE FIGURES — FICTIONAL DATA FOR THIS PORTFOLIO DEMONSTRATION",
          )}
        </p>
      </div>
    </section>
  );
}
