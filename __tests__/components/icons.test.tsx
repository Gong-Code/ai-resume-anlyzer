import { render } from "@testing-library/react";
import { CheckIcon, WarningIcon, InfoIcon } from "~/components/icons";

describe("Icons", () => {
  it("renders CheckIcon as an SVG", () => {
    const { container } = render(<CheckIcon />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders WarningIcon as an SVG", () => {
    const { container } = render(<WarningIcon />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders InfoIcon as an SVG", () => {
    const { container } = render(<InfoIcon />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies custom className to CheckIcon", () => {
    const { container } = render(<CheckIcon className="text-red-500" />);
    const svg = container.querySelector("svg");
    expect(svg?.className.baseVal).toContain("text-red-500");
  });

  it("applies custom className to WarningIcon", () => {
    const { container } = render(<WarningIcon className="text-yellow-500" />);
    const svg = container.querySelector("svg");
    expect(svg?.className.baseVal).toContain("text-yellow-500");
  });

  it("applies custom className to InfoIcon", () => {
    const { container } = render(<InfoIcon className="text-blue-500" />);
    const svg = container.querySelector("svg");
    expect(svg?.className.baseVal).toContain("text-blue-500");
  });
});
