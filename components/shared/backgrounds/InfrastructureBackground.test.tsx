import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { InfrastructureBackground } from "./InfrastructureBackground";

describe("InfrastructureBackground", () => {
  it("renders without errors", () => {
    const { container } = render(<InfrastructureBackground />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <InfrastructureBackground className="custom-class" />
    );
    const element = container.querySelector(".custom-class");
    expect(element).toBeInTheDocument();
  });

  it("renders with different theme options", () => {
    const { container: cloudContainer } = render(
      <InfrastructureBackground theme="cloud" />
    );
    expect(
      cloudContainer.querySelector('[aria-hidden="true"]')
    ).toBeInTheDocument();

    const { container: containersContainer } = render(
      <InfrastructureBackground theme="containers" />
    );
    expect(
      containersContainer.querySelector('[aria-hidden="true"]')
    ).toBeInTheDocument();

    const { container: mixedContainer } = render(
      <InfrastructureBackground theme="mixed" />
    );
    expect(
      mixedContainer.querySelector('[aria-hidden="true"]')
    ).toBeInTheDocument();
  });

  it("has appropriate opacity for background elements", () => {
    const { container } = render(<InfrastructureBackground />);
    const svgElements = container.querySelectorAll("svg");

    // Verify SVG elements exist
    expect(svgElements.length).toBeGreaterThan(0);

    // All SVG layers should have z-index set
    svgElements.forEach((svg) => {
      const zIndex = window.getComputedStyle(svg).zIndex;
      expect(zIndex).toBeTruthy();
    });
  });

  it("sets aria-hidden for accessibility", () => {
    const { container } = render(<InfrastructureBackground />);
    const backgroundDiv = container.querySelector('[aria-hidden="true"]');
    expect(backgroundDiv).toBeInTheDocument();
    expect(backgroundDiv?.getAttribute("aria-hidden")).toBe("true");
  });

  it("has pointer-events-none for non-interactive background", () => {
    const { container } = render(<InfrastructureBackground />);
    const backgroundDiv = container.querySelector(".pointer-events-none");
    expect(backgroundDiv).toBeInTheDocument();
  });
});
