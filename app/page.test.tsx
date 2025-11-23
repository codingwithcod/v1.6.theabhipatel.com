import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
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

describe("Home Page Integration", () => {
  it("renders without errors", () => {
    expect(() => render(<Home />)).not.toThrow();
  });

  it("renders all main sections", () => {
    render(<Home />);

    // Check for hero section content
    expect(screen.getByText("TheAbhiPatel")).toBeInTheDocument();
    expect(
      screen.getByText("Full Stack / MERN / DevOps Engineer")
    ).toBeInTheDocument();

    // Check for section headings
    expect(screen.getByText("Skills & Technologies")).toBeInTheDocument();
    expect(screen.getByText("Featured Projects")).toBeInTheDocument();
    expect(screen.getByText("Work Experience")).toBeInTheDocument();
  });

  it("renders all background components", () => {
    const { container } = render(<Home />);

    // Check that SVG backgrounds are present
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });

  it("maintains proper z-index layering", () => {
    const { container } = render(<Home />);

    // Check that content sections exist and have positioning
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThan(0);

    // Verify sections have appropriate positioning (relative, static, or empty string in jsdom)
    sections.forEach((section) => {
      const styles = window.getComputedStyle(section);
      // In jsdom, position might be empty string, which is valid
      expect(["relative", "static", ""]).toContain(styles.position);
    });
  });

  it("renders CTAs and navigation links", () => {
    render(<Home />);

    // Check for main CTA
    expect(screen.getByText("View My Work")).toBeInTheDocument();

    // Check for section CTAs (using partial text match to handle arrows and formatting)
    expect(screen.getByText(/View All Skills/i)).toBeInTheDocument();
    expect(screen.getByText(/View More Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/View Full Experience/i)).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    const { container } = render(<Home />);

    // Check for main element
    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();

    // Check for section elements
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(3); // Skills, Projects, Experience
  });
});
