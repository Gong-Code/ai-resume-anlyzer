import { cn } from "~/utils/cn";

interface IconProps {
  className?: string;
}

export const CheckIcon = ({ className }: IconProps) => (
  <svg
    className={cn("h-5 w-5 shrink-0", className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export const WarningIcon = ({ className }: IconProps) => (
  <svg
    className={cn("h-5 w-5 shrink-0", className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01M12 3l9.66 16.5H2.34L12 3z"
    />
  </svg>
);

export const InfoIcon = ({ className }: IconProps) => (
  <svg
    className={cn("h-5 w-5 shrink-0", className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
    />
  </svg>
);
