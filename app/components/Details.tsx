import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "~/components/Accordion";
import { cn } from "~/utils/cn";
import { CheckIcon, WarningIcon, InfoIcon } from "~/components/icons";

import ScoreBadge from "~/components/ScoreBadge";

const sections = [
  { key: "toneAndStyle", title: "Tone & Style" },
  { key: "content", title: "Content" },
  { key: "structure", title: "Structure" },
  { key: "skills", title: "Skills" },
] as const;

const tipStyles = {
  good: {
    icon: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  improve: {
    icon: "text-yellow-500",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  tip: { icon: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
};

const tipIcons = {
  good: CheckIcon,
  improve: WarningIcon,
  tip: InfoIcon,
};

const TipList = ({
  tips,
}: {
  tips: { type: string; tip: string; explanation?: string }[];
}) => (
  <div className="space-y-2 sm:space-y-3">
    {tips.map((tip, i) => {
      const style =
        tipStyles[tip.type as keyof typeof tipStyles] ?? tipStyles.tip;
      const Icon = tipIcons[tip.type as keyof typeof tipIcons] ?? InfoIcon;
      return (
        <div
          key={i}
          className={cn(
            "rounded-lg border p-2 sm:p-3",
            style.bg,
            style.border,
          )}
        >
          <div className="flex items-start gap-2">
            <Icon className={cn("size-4 sm:size-5", style.icon)} />
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-800 sm:text-sm">
                {tip.tip}
              </p>
              {"explanation" in tip && tip.explanation && (
                <p className="mt-0.5 text-xs text-gray-600 sm:mt-1 sm:text-sm">
                  {tip.explanation}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <Accordion allowMultiple>
      {sections.map(({ key, title }) => {
        const section = feedback[key];
        return (
          <AccordionItem key={key} id={key}>
            <AccordionHeader itemId={key}>
              <div className="flex items-center justify-between gap-2 w-full">
                <span className="text-sm font-semibold text-gray-800 sm:text-base">
                  {title}
                </span>
                <ScoreBadge score={section.score} />
              </div>
            </AccordionHeader>
            <AccordionContent itemId={key}>
              <TipList tips={section.tips} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Details;
