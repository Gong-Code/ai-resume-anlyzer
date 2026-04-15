import { render, screen } from "@testing-library/react";
import ScoreBadge from "~/components/ScoreBadge";

describe("ScoreBadge", () => {
  it("renders the score text", () => {
    render(<ScoreBadge score={85} />);
    expect(screen.getByText("85/100")).toBeInTheDocument();
  });

  it("shows check icon for scores above 69", () => {
    const { container } = render(<ScoreBadge score={70} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("does not show check icon for scores 69 or below", () => {
    const { container } = render(<ScoreBadge score={69} />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeInTheDocument();
  });

  it("applies green styling for scores above 69", () => {
    const { container } = render(<ScoreBadge score={75} />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-green-100");
    expect(badge.className).toContain("text-green-600");
  });

  it("applies yellow styling for scores between 40 and 69", () => {
    const { container } = render(<ScoreBadge score={50} />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-yellow-100");
    expect(badge.className).toContain("text-yellow-600");
  });

  it("applies red styling for scores 39 or below", () => {
    const { container } = render(<ScoreBadge score={30} />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-red-100");
    expect(badge.className).toContain("text-red-600");
  });
});
