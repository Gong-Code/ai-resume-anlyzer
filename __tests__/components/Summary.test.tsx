import { render, screen } from "@testing-library/react";
import Summary from "~/components/Summary";

// Mock IntersectionObserver for useAnimatedScore
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

beforeEach(() => {
  (global as any).IntersectionObserver = jest.fn((callback: any) => {
    // Immediately trigger with isIntersecting: true
    callback([{ isIntersecting: true }]);
    return { observe: mockObserve, disconnect: mockDisconnect, unobserve: jest.fn() };
  });
});

// Mock getTotalLength for ScoreGauge (jsdom doesn't implement it)
beforeAll(() => {
  (SVGElement.prototype as any).getTotalLength =
    (SVGElement.prototype as any).getTotalLength || (() => 100);
});

const mockFeedback: Feedback = {
  overallScore: 72,
  ATS: { score: 80, tips: [] },
  toneAndStyle: { score: 70, tips: [] },
  content: { score: 65, tips: [] },
  structure: { score: 75, tips: [] },
  skills: { score: 60, tips: [] },
};

describe("Summary", () => {
  it("renders the heading", () => {
    render(<Summary feedback={mockFeedback} />);
    expect(screen.getByText("Your Resume Score")).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<Summary feedback={mockFeedback} />);
    expect(
      screen.getByText(
        "This score is calculated based on the variables listed below.",
      ),
    ).toBeInTheDocument();
  });

  it("renders all category titles", () => {
    render(<Summary feedback={mockFeedback} />);
    expect(screen.getAllByText("Tone & Style")).toHaveLength(2); // mobile + desktop
    expect(screen.getAllByText("Content")).toHaveLength(2);
    expect(screen.getAllByText("Structure")).toHaveLength(2);
    expect(screen.getAllByText("Skills")).toHaveLength(2);
    expect(screen.getAllByText("ATS")).toHaveLength(2);
  });

  it("renders the overall score via ScoreGauge", () => {
    render(<Summary feedback={mockFeedback} />);
    expect(screen.getByText("72/100")).toBeInTheDocument();
  });
});
