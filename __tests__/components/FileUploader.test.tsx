import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FileUploader from "~/components/FileUploader";

describe("FileUploader", () => {
  it("renders the upload prompt", () => {
    render(<FileUploader />);
    expect(screen.getByText("Click to upload")).toBeInTheDocument();
  });

  it("shows the max file size", () => {
    render(<FileUploader />);
    expect(screen.getByText("PDF (max 20.00 MB)")).toBeInTheDocument();
  });

  it("renders an input with pdf accept type", () => {
    const { container } = render(<FileUploader />);
    const input = container.querySelector("input");
    expect(input).toBeInTheDocument();
    expect(input?.getAttribute("accept")).toContain("application/pdf");
  });

  it("shows file info after selecting a file", async () => {
    const onFileSelect = jest.fn();
    const { container } = render(<FileUploader onFileSelect={onFileSelect} />);

    const input = container.querySelector("input") as HTMLInputElement;
    const file = new File(["test content"], "resume.pdf", {
      type: "application/pdf",
    });

    await userEvent.upload(input, file);

    expect(screen.getByText("resume.pdf")).toBeInTheDocument();
    expect(onFileSelect).toHaveBeenCalledWith(file);
  });

  it("removes file when remove button is clicked", async () => {
    const onFileSelect = jest.fn();
    const { container } = render(<FileUploader onFileSelect={onFileSelect} />);

    const input = container.querySelector("input") as HTMLInputElement;
    const file = new File(["test content"], "resume.pdf", {
      type: "application/pdf",
    });

    await userEvent.upload(input, file);
    expect(screen.getByText("resume.pdf")).toBeInTheDocument();

    const removeButton = screen.getByAltText("remove").closest("button") as HTMLButtonElement;
    await userEvent.click(removeButton);

    expect(screen.getByText("Click to upload")).toBeInTheDocument();
    expect(onFileSelect).toHaveBeenLastCalledWith(null);
  });
});
