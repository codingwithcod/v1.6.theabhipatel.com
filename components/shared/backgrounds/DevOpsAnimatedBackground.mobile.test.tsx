import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { DevOpsAnimatedBackground } from "./DevOpsAnimatedBackground";

describe("DevOpsAnimatedBackground - Mobile Responsiveness", () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterEach(() => {
    // Restore original window width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  const setViewportWidth = (width: number) => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event("resize"));
  };

  it("should render without errors on 320px viewport", () => {
    setViewportWidth(320);
    const { container } = render(<DevOpsAnimatedBackground />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("should render without errors on 768px viewport", () => {
    setViewportWidth(768);
    const { container } = render(<DevOpsAnimatedBackground />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("should render without errors on 1024px viewport", () => {
    setViewportWidth(1024);
    const { container } = render(<DevOpsAnimatedBackground />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("should render all SVG layers", () => {
    const { container } = render(<DevOpsAnimatedBackground />);
    const svgs = container.querySelectorAll("svg");
    // Should have 3 SVG layers
    expect(svgs.length).toBe(3);
  });

  it("should have proper z-index layering", () => {
    const { container } = render(<DevOpsAnimatedBackground />);
    const svgs = container.querySelectorAll("svg");

    // Check that each layer has appropriate z-index
    expect(svgs[0]).toHaveStyle({ zIndex: "1" });
    expect(svgs[1]).toHaveStyle({ zIndex: "2" });
    expect(svgs[2]).toHaveStyle({ zIndex: "3" });
  });

  it("should render code brackets elements", () => {
    const { container } = render(<DevOpsAnimatedBackground />);
    const codeBrackets = container.querySelector(".code-brackets");
    expect(codeBrackets).toBeInTheDocument();
  });

  it("should render code keywords elements", () => {
    const { container } = render(<DevOpsAnimatedBackground />);
    const codeKeywords = container.querySelector(".code-keywords");
    expect(codeKeywords).toBeInTheDocument();
  });

  it("should render git network elements", () => {
    const { container } = render(<DevOpsAnimatedBackground />);
    const gitNetwork = container.querySelector(".git-network");
    expect(gitNetwork).toBeInTheDocument();
  });

  it("should render pipeline arrows", () => {
    const { container } = render(<DevOpsAnimatedBackground />);
    const pipelineArrows = container.querySelector(".pipeline-arrows");
    expect(pipelineArrows).toBeInTheDocument();
  });

  it("should render docker icon", () => {
    const { container } = render(<DevOpsAnimatedBackground />);
    const dockerIcon = container.querySelector(".docker-icon");
    expect(dockerIcon).toBeInTheDocument();
  });

  it("should render kubernetes icon", () => {
    const { container } = render(<DevOpsAnimatedBackground />);
    const k8sIcon = container.querySelector(".k8s-icon");
    expect(k8sIcon).toBeInTheDocument();
  });

  it("should render terminal window", () => {
    const { container } = render(<DevOpsAnimatedBackground />);
    const terminalWindow = container.querySelector(".terminal-window");
    expect(terminalWindow).toBeInTheDocument();
  });

  it("should apply animation classes", () => {
    const { container } = render(<DevOpsAnimatedBackground />);
    const animatedElements = container.querySelectorAll('[class*="animate-"]');
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it("should respect intensity prop - low", () => {
    const { container } = render(<DevOpsAnimatedBackground intensity="low" />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("should respect intensity prop - medium", () => {
    const { container } = render(
      <DevOpsAnimatedBackground intensity="medium" />
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("should respect intensity prop - high", () => {
    const { container } = render(<DevOpsAnimatedBackground intensity="high" />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <DevOpsAnimatedBackground className="custom-class" />
    );
    const wrapper = container.querySelector(".custom-class");
    expect(wrapper).toBeInTheDocument();
  });

  it("should have aria-hidden attribute for accessibility", () => {
    const { container } = render(<DevOpsAnimatedBackground />);
    const wrapper = container.querySelector('[aria-hidden="true"]');
    expect(wrapper).toBeInTheDocument();
  });

  it("should have pointer-events-none for non-interactive background", () => {
    const { container } = render(<DevOpsAnimatedBackground />);
    const wrapper = container.querySelector(".pointer-events-none");
    expect(wrapper).toBeInTheDocument();
  });
});
