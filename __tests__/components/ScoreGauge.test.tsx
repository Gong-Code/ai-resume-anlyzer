import { render, screen } from "@testing-library/react";
import ScoreGauge from "~/components/ScoreGauge";

beforeAll(() => {
  (SVGElement.prototype as any).getTotalLength =
    (SVGElement.prototype as any).getTotalLength || (() => 100);
});

describe("ScoreGauge", () => {
  it("renders the score text", () => {
    render(<ScoreGauge score={75} />);
    expect(screen.getByText("75/100")).toBeInTheDocument();
  });

  it("renders SVG paths for the gauge arcs", () => {
    const { container } = render(<ScoreGauge score={50} />);
    const paths = container.querySelectorAll("path");
    expect(paths).toHaveLength(2);
  });

  it("renders the gradient definition", () => {
    const { container } = render(<ScoreGauge score={60} />);
    const gradient = container.querySelector("linearGradient");
    expect(gradient).toBeInTheDocument();
    expect(gradient?.id).toBe("gaugeGradient");
  });

  it("renders with score 0", () => {
    render(<ScoreGauge score={0} />);
    expect(screen.getByText("0/100")).toBeInTheDocument();
  });

  it("renders with score 100", () => {
    render(<ScoreGauge score={100} />);
    expect(screen.getByText("100/100")).toBeInTheDocument();
  });
});
