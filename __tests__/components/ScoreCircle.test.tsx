import { render, screen } from "@testing-library/react";
import ScoreCircle from "~/components/ScoreCircle";

describe("ScoreCircle", () => {
  it("renders the score text", () => {
    render(<ScoreCircle score={85} />);
    expect(screen.getByText("85/100")).toBeInTheDocument();
  });

  it("renders with default score when provided 0", () => {
    render(<ScoreCircle score={0} />);
    expect(screen.getByText("0/100")).toBeInTheDocument();
  });

  it("renders SVG circles", () => {
    const { container } = render(<ScoreCircle score={50} />);
    const circles = container.querySelectorAll("circle");
    expect(circles).toHaveLength(2);
  });
});
