import { render, screen } from "@testing-library/react";
import Details from "~/components/Details";

const mockFeedback: Feedback = {
  overallScore: 72,
  ATS: { score: 80, tips: [] },
  toneAndStyle: {
    score: 70,
    tips: [
      { type: "good", tip: "Professional tone", explanation: "Well written" },
      { type: "improve", tip: "Too formal", explanation: "Relax a bit" },
    ],
  },
  content: {
    score: 65,
    tips: [{ type: "good", tip: "Good detail", explanation: "Thorough" }],
  },
  structure: {
    score: 75,
    tips: [
      {
        type: "improve",
        tip: "Add sections",
        explanation: "Missing education",
      },
    ],
  },
  skills: {
    score: 60,
    tips: [
      { type: "good", tip: "Relevant skills", explanation: "Well matched" },
    ],
  },
};

describe("Details", () => {
  it("renders all section titles", () => {
    render(<Details feedback={mockFeedback} />);
    expect(screen.getByText("Tone & Style")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Structure")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
  });

  it("renders score badges for each section", () => {
    render(<Details feedback={mockFeedback} />);
    expect(screen.getByText("70/100")).toBeInTheDocument();
    expect(screen.getByText("65/100")).toBeInTheDocument();
    expect(screen.getByText("75/100")).toBeInTheDocument();
    expect(screen.getByText("60/100")).toBeInTheDocument();
  });

  it("renders tip text", () => {
    render(<Details feedback={mockFeedback} />);
    expect(screen.getByText("Professional tone")).toBeInTheDocument();
    expect(screen.getByText("Too formal")).toBeInTheDocument();
  });

  it("renders tip explanations", () => {
    render(<Details feedback={mockFeedback} />);
    expect(screen.getByText("Well written")).toBeInTheDocument();
    expect(screen.getByText("Relax a bit")).toBeInTheDocument();
  });
});
