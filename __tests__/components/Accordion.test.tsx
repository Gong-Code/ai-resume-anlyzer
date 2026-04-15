import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "~/components/Accordion";

const renderAccordion = (props: { defaultOpen?: string; allowMultiple?: boolean } = {}) =>
  render(
    <Accordion {...props}>
      <AccordionItem id="one">
        <AccordionHeader itemId="one">Header One</AccordionHeader>
        <AccordionContent itemId="one">Content One</AccordionContent>
      </AccordionItem>
      <AccordionItem id="two">
        <AccordionHeader itemId="two">Header Two</AccordionHeader>
        <AccordionContent itemId="two">Content Two</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );

describe("Accordion", () => {
  it("renders all headers", () => {
    renderAccordion();
    expect(screen.getByText("Header One")).toBeInTheDocument();
    expect(screen.getByText("Header Two")).toBeInTheDocument();
  });

  it("content is hidden by default", () => {
    renderAccordion();
    const content = screen.getByText("Content One").closest("div[class*='max-h']") as HTMLElement;
    expect(content.className).toContain("max-h-0");
  });

  it("opens content when header is clicked", async () => {
    renderAccordion();
    await userEvent.click(screen.getByText("Header One"));
    const content = screen.getByText("Content One").closest("div[class*='max-h']") as HTMLElement;
    expect(content.className).toContain("max-h-fit");
  });

  it("closes content when header is clicked again", async () => {
    renderAccordion();
    await userEvent.click(screen.getByText("Header One"));
    await userEvent.click(screen.getByText("Header One"));
    const content = screen.getByText("Content One").closest("div[class*='max-h']") as HTMLElement;
    expect(content.className).toContain("max-h-0");
  });

  it("opens with defaultOpen item", () => {
    renderAccordion({ defaultOpen: "two" });
    const content = screen.getByText("Content Two").closest("div[class*='max-h']") as HTMLElement;
    expect(content.className).toContain("max-h-fit");
  });

  it("in single mode, opening one closes the other", async () => {
    renderAccordion();
    await userEvent.click(screen.getByText("Header One"));
    await userEvent.click(screen.getByText("Header Two"));

    const contentOne = screen.getByText("Content One").closest("div[class*='max-h']") as HTMLElement;
    const contentTwo = screen.getByText("Content Two").closest("div[class*='max-h']") as HTMLElement;
    expect(contentOne.className).toContain("max-h-0");
    expect(contentTwo.className).toContain("max-h-fit");
  });

  it("in allowMultiple mode, multiple items can be open", async () => {
    renderAccordion({ allowMultiple: true });
    await userEvent.click(screen.getByText("Header One"));
    await userEvent.click(screen.getByText("Header Two"));

    const contentOne = screen.getByText("Content One").closest("div[class*='max-h']") as HTMLElement;
    const contentTwo = screen.getByText("Content Two").closest("div[class*='max-h']") as HTMLElement;
    expect(contentOne.className).toContain("max-h-fit");
    expect(contentTwo.className).toContain("max-h-fit");
  });
});
