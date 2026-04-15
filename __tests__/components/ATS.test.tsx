import { render, screen } from "@testing-library/react";
import ATS from "~/components/ATS";

const goodSuggestions = [
  { type: "good" as const, tip: "Uses strong action verbs" },
  { type: "good" as const, tip: "Proper keyword density" },
];

const improveSuggestions = [
  { type: "improve" as const, tip: "Add more keywords" },
  { type: "improve" as const, tip: "Fix formatting issues" },
];

const mixedSuggestions = [
  { type: "good" as const, tip: "Clean formatting" },
  { type: "improve" as const, tip: "Missing skills section" },
];

describe("ATS", () => {
  it("renders the score", () => {
    render(<ATS score={80} suggestions={goodSuggestions} />);
    expect(screen.getByText("80")).toBeInTheDocument();
    expect(screen.getByText("/100")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<ATS score={80} suggestions={goodSuggestions} />);
    expect(screen.getByText("ATS Compatibility")).toBeInTheDocument();
  });

  it("renders all suggestion tips", () => {
    render(<ATS score={80} suggestions={mixedSuggestions} />);
    expect(screen.getByText("Clean formatting")).toBeInTheDocument();
    expect(screen.getByText("Missing skills section")).toBeInTheDocument();
  });

  it("shows 'ATS Friendly' label styling for scores above 69", () => {
    const { container } = render(
      <ATS score={75} suggestions={goodSuggestions} />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("from-emerald-50");
  });

  it("shows 'Needs Tweaks' styling for scores between 50 and 69", () => {
    const { container } = render(
      <ATS score={55} suggestions={improveSuggestions} />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("from-amber-50");
  });

  it("shows 'Needs Work' styling for scores below 50", () => {
    const { container } = render(
      <ATS score={30} suggestions={improveSuggestions} />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("from-red-50");
  });

  it("shows encouragement when no improvements needed", () => {
    render(<ATS score={90} suggestions={goodSuggestions} />);
    expect(
      screen.getByText(
        "Your resume is well-optimized for ATS — keep it up!",
      ),
    ).toBeInTheDocument();
  });

  it("shows fix message when improvements exist", () => {
    render(<ATS score={50} suggestions={mixedSuggestions} />);
    expect(
      screen.getByText(
        "You're doing 1 thing right. Fix the remaining 1 suggestion to boost your score.",
      ),
    ).toBeInTheDocument();
  });
});
