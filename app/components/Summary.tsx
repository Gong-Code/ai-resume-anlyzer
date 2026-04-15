import React, { useEffect, useRef, useState } from "react";
import ScoreGauge from "./ScoreGauge";

const scoreColor = (score: number) =>
  score > 69
    ? { bar: "bg-emerald-500", text: "text-emerald-600" }
    : score > 39
      ? { bar: "bg-amber-400", text: "text-amber-600" }
      : { bar: "bg-red-500", text: "text-red-600" };

const useAnimatedScore = (target: number, duration = 800) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
};

const Category = ({ title, score }: { title: string; score: number }) => {
  const { value, ref } = useAnimatedScore(score);
  const colors = scoreColor(score);

  return (
    <div ref={ref}>
      {/* Mobile */}
      <div className="flex flex-col gap-2 px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <span className={`text-sm font-semibold tabular-nums ${colors.text}`}>
            {value}/100
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className={`h-full rounded-full ${colors.bar} transition-none`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-4 px-5 py-3">
        <p className="text-sm font-medium text-gray-700 w-28 shrink-0">
          {title}
        </p>
        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
          <div
            className={`h-full rounded-full ${colors.bar} transition-none`}
            style={{ width: `${value}%` }}
          />
        </div>
        <span className={`text-sm font-semibold tabular-nums w-12 text-right ${colors.text}`}>
          {value}/100
        </span>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-col items-center p-4 gap-4 max-sm:text-center sm:flex-row sm:gap-8">
        <ScoreGauge score={feedback.overallScore} />
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold sm:text-2xl">Your Resume Score</h2>
          <p className="text-xs text-gray-500 sm:text-sm">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      <div className="md:py-2">
        <Category title={"Tone & Style"} score={feedback.toneAndStyle.score} />
        <Category title={"Content"} score={feedback.content.score} />
        <Category title={"Structure"} score={feedback.structure.score} />
        <Category title={"Skills"} score={feedback.skills.score} />
        <Category title={"ATS"} score={feedback.ATS.score} />
      </div>
    </div>
  );
};

export default Summary;
