import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ExperiencePreview from "./ExperiencePreview";
import { Experience } from "@/constants/experience";
import React from "react";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    p: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <p {...props}>{children}</p>
    ),
    h2: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <h2 {...props}>{children}</h2>
    ),
    svg: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <svg {...props}>{children}</svg>
    ),
    line: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <line {...props}>{children}</line>
    ),
  },
}));

const mockExperiences: Experience[] = [
  {
    id: "exp-1",
    company: "Test Company",
    role: "Senior Developer",
    duration: "Jan 2023 - Present",
    startDate: new Date("2023-01-01"),
    current: true,
    achievements: ["Achievement 1", "Achievement 2", "Achievement 3"],
  },
  {
    id: "exp-2",
    company: "Previous Company",
    role: "Developer",
    duration: "Jan 2021 - Dec 2022",
    startDate: new Date("2021-01-01"),
    endDate: new Date("2022-12-31"),
    current: false,
    achievements: ["Achievement A", "Achievement B"],
  },
];

describe("ExperiencePreview", () => {
  it("renders the section heading with correct title", () => {
    render(<ExperiencePreview experiences={mockExperiences} />);
    expect(screen.getByText("Work Experience")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<ExperiencePreview experiences={mockExperiences} />);
    expect(
      screen.getByText("My professional journey and achievements")
    ).toBeInTheDocument();
  });

  it("renders experience cards with company and role", () => {
    render(<ExperiencePreview experiences={mockExperiences} />);
    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText("Senior Developer")).toBeInTheDocument();
  });

  it("displays current badge for current experience", () => {
    render(<ExperiencePreview experiences={mockExperiences} />);
    expect(screen.getByText("Current")).toBeInTheDocument();
  });

  it("renders View Full Experience link", () => {
    render(<ExperiencePreview experiences={mockExperiences} />);
    const link = screen.getByRole("link", { name: /view full experience/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/experience");
  });

  it("limits displayed experiences to maxDisplay prop", () => {
    const manyExperiences = [
      ...mockExperiences,
      {
        id: "exp-3",
        company: "Third Company",
        role: "Junior Developer",
        duration: "Jan 2020 - Dec 2020",
        startDate: new Date("2020-01-01"),
        endDate: new Date("2020-12-31"),
        current: false,
        achievements: ["Achievement X"],
      },
      {
        id: "exp-4",
        company: "Fourth Company",
        role: "Intern",
        duration: "Jan 2019 - Dec 2019",
        startDate: new Date("2019-01-01"),
        endDate: new Date("2019-12-31"),
        current: false,
        achievements: ["Achievement Y"],
      },
    ];

    render(<ExperiencePreview experiences={manyExperiences} maxDisplay={2} />);

    // Should show first 2
    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText("Previous Company")).toBeInTheDocument();

    // Should not show 3rd and 4th
    expect(screen.queryByText("Third Company")).not.toBeInTheDocument();
    expect(screen.queryByText("Fourth Company")).not.toBeInTheDocument();
  });

  it("renders timeline with proper structure", () => {
    const { container } = render(
      <ExperiencePreview experiences={mockExperiences} />
    );

    // Check for timeline line (border element)
    const timelineLines = container.querySelectorAll(".bg-border");
    expect(timelineLines.length).toBeGreaterThan(0);
  });

  it("shows first 2 achievements per experience", () => {
    render(<ExperiencePreview experiences={mockExperiences} />);

    // First experience has 3 achievements, should show first 2
    expect(screen.getByText("Achievement 1")).toBeInTheDocument();
    expect(screen.getByText("Achievement 2")).toBeInTheDocument();
    expect(screen.queryByText("Achievement 3")).not.toBeInTheDocument();

    // Should show "+1 more achievements" text
    expect(screen.getByText("+1 more achievements")).toBeInTheDocument();
  });
});
