import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ResumeCard from "~/components/ResumeCard";

const mockResume: Resume = {
  id: "abc-123",
  companyName: "Acme Corp",
  jobTitle: "Frontend Developer",
  imagePath: "/images/resume.png",
  resumePath: "/resumes/resume.pdf",
  feedback: {
    overallScore: 72,
    ATS: { score: 80, tips: [] },
    toneAndStyle: { score: 70, tips: [] },
    content: { score: 65, tips: [] },
    structure: { score: 75, tips: [] },
    skills: { score: 70, tips: [] },
  },
};

const renderCard = (resume: Resume = mockResume) =>
  render(
    <MemoryRouter>
      <ResumeCard resume={resume} />
    </MemoryRouter>
  );

describe("ResumeCard", () => {
  it("renders the company name", () => {
    renderCard();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
  });

  it("renders the job title", () => {
    renderCard();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
  });

  it("renders the overall score", () => {
    renderCard();
    expect(screen.getByText("72/100")).toBeInTheDocument();
  });

  it("links to the resume detail page", () => {
    renderCard();
    const link = screen.getByText("Acme Corp").closest("a");
    expect(link).toHaveAttribute("href", "/resume/abc-123");
  });

  it("renders with different resume data", () => {
    const otherResume: Resume = {
      ...mockResume,
      id: "xyz-789",
      companyName: "TechStart",
      jobTitle: "Full Stack Engineer",
      feedback: { ...mockResume.feedback, overallScore: 95 },
    };
    renderCard(otherResume);
    expect(screen.getByText("TechStart")).toBeInTheDocument();
    expect(screen.getByText("Full Stack Engineer")).toBeInTheDocument();
    expect(screen.getByText("95/100")).toBeInTheDocument();
  });
});
