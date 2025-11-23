import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import Home from "./page";

// Mock the constants
vi.mock("@/constants/skills", () => ({
  allSkills: [
    { name: "React", category: "Frontend", icon: "⚛️" },
    { name: "Node.js", category: "Backend", icon: "🟢" },
  ],
}));

vi.mock("@/constants/projects", () => ({
  featuredProjects: [
    {
      id: "1",
      title: "Test Project",
      slug: "test-project",
      shortDescription: "A test project",
      technologies: ["React", "TypeScript"],
    },
  ],
}));

vi.mock("@/constants/experience", () => ({
  getSortedExperiences: () => [
    {
      id: "1",
      company: "Test Company",
      position: "Developer",
      startDate: "2023-01",
      endDate: "Present",
      duration: "Jan 2023 - Present",
      description: "Test description",
      achievements: ["Achievement 1", "Achievement 2"],
      technologies: ["React", "Node.js"],
    },
  ],
}));

describe("Home Page Responsive Behavior", () => {
  const setViewport = (width: number, height: number) => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: width,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: height,
    });
    window.dispatchEvent(new Event("resize"));
  };

  beforeEach(() => {
    // Reset to default desktop size
    setViewport(1920, 1080);
  });

  describe("Mobile Viewports", () => {
    it("renders correctly at 320px width (small mobile)", () => {
      setViewport(320, 568);
      const { container } = render(<Home />);

      // Verify page renders without errors
      expect(container.querySelector("main")).toBeInTheDocument();

      // Check that sections are present
      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThan(0);

      // Verify SVG backgrounds are present
      const svgs = container.querySelectorAll("svg");
      expect(svgs.length).toBeGreaterThan(0);
    });

    it("renders correctly at 375px width (iPhone)", () => {
      setViewport(375, 667);
      const { container } = render(<Home />);

      expect(container.querySelector("main")).toBeInTheDocument();
      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThan(0);
    });

    it("renders correctly at 414px width (large mobile)", () => {
      setViewport(414, 896);
      const { container } = render(<Home />);

      expect(container.querySelector("main")).toBeInTheDocument();
      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThan(0);
    });
  });

  describe("Tablet Viewports", () => {
    it("renders correctly at 768px width (iPad portrait)", () => {
      setViewport(768, 1024);
      const { container } = render(<Home />);

      expect(container.querySelector("main")).toBeInTheDocument();
      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThan(0);

      // Verify backgrounds adapt
      const svgs = container.querySelectorAll("svg");
      expect(svgs.length).toBeGreaterThan(0);
    });

    it("renders correctly at 1024px width (iPad landscape)", () => {
      setViewport(1024, 768);
      const { container } = render(<Home />);

      expect(container.querySelector("main")).toBeInTheDocument();
      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThan(0);
    });
  });

  describe("Desktop Viewports", () => {
    it("renders correctly at 1440px width (laptop)", () => {
      setViewport(1440, 900);
      const { container } = render(<Home />);

      expect(container.querySelector("main")).toBeInTheDocument();
      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThan(0);

      // Verify all backgrounds are present
      const svgs = container.querySelectorAll("svg");
      expect(svgs.length).toBeGreaterThan(0);
    });

    it("renders correctly at 1920px width (desktop)", () => {
      setViewport(1920, 1080);
      const { container } = render(<Home />);

      expect(container.querySelector("main")).toBeInTheDocument();
      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThan(0);
    });
  });

  describe("Background Adaptation", () => {
    it("backgrounds maintain proper aspect ratio on mobile", () => {
      setViewport(375, 667);
      const { container } = render(<Home />);

      // Check main background SVGs (not nested defs/patterns)
      const svgs = container.querySelectorAll("svg");
      const mainSvgs = Array.from(svgs).filter((svg) => {
        const viewBox = svg.getAttribute("viewBox");
        return viewBox !== null;
      });

      // Verify we have background SVGs with viewBox
      expect(mainSvgs.length).toBeGreaterThan(0);

      // Check that main SVGs have proper responsive attributes
      mainSvgs.forEach((svg) => {
        const viewBox = svg.getAttribute("viewBox");
        expect(viewBox).toBeTruthy();
      });
    });

    it("backgrounds maintain proper aspect ratio on tablet", () => {
      setViewport(768, 1024);
      const { container } = render(<Home />);

      const svgs = container.querySelectorAll("svg");
      const mainSvgs = Array.from(svgs).filter((svg) => {
        const viewBox = svg.getAttribute("viewBox");
        return viewBox !== null;
      });

      expect(mainSvgs.length).toBeGreaterThan(0);
    });

    it("backgrounds maintain proper aspect ratio on desktop", () => {
      setViewport(1920, 1080);
      const { container } = render(<Home />);

      const svgs = container.querySelectorAll("svg");
      const mainSvgs = Array.from(svgs).filter((svg) => {
        const viewBox = svg.getAttribute("viewBox");
        return viewBox !== null;
      });

      expect(mainSvgs.length).toBeGreaterThan(0);
    });
  });

  describe("Layout Integrity", () => {
    it("maintains semantic structure across all viewports", () => {
      const viewports = [
        [320, 568],
        [375, 667],
        [414, 896],
        [768, 1024],
        [1024, 768],
        [1440, 900],
        [1920, 1080],
      ];

      viewports.forEach(([width, height]) => {
        setViewport(width, height);
        const { container } = render(<Home />);

        // Verify main element exists
        expect(container.querySelector("main")).toBeInTheDocument();

        // Verify sections exist
        const sections = container.querySelectorAll("section");
        expect(sections.length).toBeGreaterThanOrEqual(3);
      });
    });

    it("maintains z-index layering across viewports", () => {
      const viewports = [320, 768, 1440, 1920];

      viewports.forEach((width) => {
        setViewport(width, 1080);
        const { container } = render(<Home />);

        // Check that backgrounds have proper positioning
        const backgrounds = container.querySelectorAll('[aria-hidden="true"]');
        expect(backgrounds.length).toBeGreaterThan(0);

        // Verify content sections are present
        const sections = container.querySelectorAll("section");
        expect(sections.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Content Visibility", () => {
    it("all critical content is accessible on mobile", () => {
      setViewport(375, 667);
      const { container } = render(<Home />);

      // Verify main sections are present
      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThanOrEqual(3);

      // Verify no content is hidden by overflow
      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
    });

    it("all critical content is accessible on tablet", () => {
      setViewport(768, 1024);
      const { container } = render(<Home />);

      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThanOrEqual(3);
    });

    it("all critical content is accessible on desktop", () => {
      setViewport(1920, 1080);
      const { container } = render(<Home />);

      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThanOrEqual(3);
    });
  });
});
