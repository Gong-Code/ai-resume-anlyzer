import { cn } from "~/utils/cn";
import { CheckIcon } from "~/components/icons";

const ScoreBadge = ({ score }: { score: number }) => {
  const isGreen = score > 69;
  const badge = isGreen
    ? { bg: "bg-green-100", text: "text-green-600" }
    : score > 39
      ? { bg: "bg-yellow-100", text: "text-yellow-600" }
      : { bg: "bg-red-100", text: "text-red-600" };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap shrink-0",
        "sm:px-3 sm:py-1 sm:text-sm sm:gap-1.5",
        badge.bg,
        badge.text,
      )}
    >
      {isGreen && (
        <span className="inline-flex items-center justify-center rounded-full bg-green-500 size-3.5 sm:size-4">
          <CheckIcon className="size-2.5 sm:size-3 text-white" />
        </span>
      )}
      <span>{score}/100</span>
    </div>
  );
};

export default ScoreBadge;
