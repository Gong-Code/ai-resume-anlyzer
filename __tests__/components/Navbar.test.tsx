import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navbar from "~/components/Navbar";

describe("Navbar", () => {
  const renderNavbar = () =>
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

  it("renders the brand name", () => {
    renderNavbar();
    expect(screen.getByText("RESUMATE")).toBeInTheDocument();
  });

  it("renders an upload resume button", () => {
    renderNavbar();
    expect(screen.getByText("Upload Resume")).toBeInTheDocument();
  });

  it("links brand name to home page", () => {
    renderNavbar();
    const homeLink = screen.getByText("RESUMATE").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("links upload button to /upload", () => {
    renderNavbar();
    const uploadLink = screen.getByText("Upload Resume");
    expect(uploadLink.closest("a")).toHaveAttribute("href", "/upload");
  });
});
