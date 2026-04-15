interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
  const tier =
    score > 69
      ? {
          from: "from-emerald-50",
          to: "to-emerald-100/60",
          accent: "text-emerald-700",
          border: "border-emerald-200",
          label: "ATS Friendly",
        }
      : score > 49
        ? {
            from: "from-amber-50",
            to: "to-amber-100/60",
            accent: "text-amber-700",
            border: "border-amber-200",
            label: "Needs Tweaks",
          }
        : {
            from: "from-red-50",
            to: "to-red-100/60",
            accent: "text-red-700",
            border: "border-red-200",
            label: "Needs Work",
          };

  const goodCount = suggestions.filter((s) => s.type === "good").length;
  const improveCount = suggestions.filter((s) => s.type === "improve").length;

  return (
    <div
      className={`rounded-2xl bg-linear-to-b ${tier.from} ${tier.to} border ${tier.border} p-6 shadow-sm`}
    >
      <div className="flex items-center gap-4 mb-4">
        <img src="/icons/ats-good.svg" alt="ATS" className="w-10 h-10" />
        <div>
          <h3 className="text-lg font-bold text-gray-900">ATS Compatibility</h3>
          <p className={`text-2xl font-extrabold ${tier.accent}`}>
            {score}
            <span className="text-base font-medium text-gray-400">/100</span>
          </p>
        </div>
      </div>

      <div className="mb-5">
        <p className="text-sm text-gray-500 leading-relaxed">
          Applicant Tracking Systems scan your resume before a human ever sees
          it. A higher score means more interviews. Here's how yours stacks up:
        </p>
      </div>

      <ul className="flex flex-col gap-3 mb-5">
        {suggestions.map((s, i) => (
          <li key={i} className="flex items-start gap-3">
            <img
              src={
                s.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
              }
              alt={s.type}
              className="w-5 h-5 mt-0.5 shrink-0"
            />
            <span className="text-sm text-gray-700 leading-snug">{s.tip}</span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-400 italic">
        {improveCount === 0
          ? "Your resume is well-optimized for ATS — keep it up!"
          : `You're doing ${goodCount} thing${goodCount !== 1 ? "s" : ""} right. Fix the remaining ${improveCount} suggestion${improveCount !== 1 ? "s" : ""} to boost your score.`}
      </p>
    </div>
  );
};

export default ATS;
