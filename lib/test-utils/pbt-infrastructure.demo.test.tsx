/**
 * Demo Test for Property-Based Testing Infrastructure
 *
 * This test demonstrates that the PBT infrastructure is working correctly
 * by testing the existing SectionHeading component with random props.
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  PBT_CONFIG,
  generators,
  renderWithPBT,
  hasNumberedPrefix,
} from "./pbt-helpers";
import { SectionHeading } from "@/components/shared/SectionHeading";

describe("PBT Infrastructure Demo - SectionHeading", () => {
  it("should render with any valid title and className", () => {
    fc.assert(
      fc.property(
        generators.text(),
        generators.className(),
        (title, className) => {
          // Skip empty titles as they're not valid for headings
          if (!title || title.trim().length === 0) return true;

          const { container } = renderWithPBT(
            <SectionHeading title={title} className={className} />
          );

          // Verify component renders
          expect(container.querySelector("h2")).toBeInTheDocument();

          // Verify title is rendered
          const heading = container.querySelector("h2");
          expect(heading?.textContent).toBe(title);

          return true;
        }
      ),
      PBT_CONFIG
    );
  });

  it("should render with any valid alignment", () => {
    fc.assert(
      fc.property(
        generators.text().filter((s) => s.trim().length > 0),
        generators.alignment(),
        (title, align) => {
          const { container } = renderWithPBT(
            <SectionHeading title={title} align={align} />
          );

          const wrapper = container.firstChild as HTMLElement;
          const alignmentClasses = {
            left: "text-left",
            center: "text-center",
            right: "text-right",
          };

          // Verify alignment class is applied
          expect(wrapper.className).toContain(alignmentClasses[align]);

          return true;
        }
      ),
      PBT_CONFIG
    );
  });

  it("should render subtitle when provided", () => {
    fc.assert(
      fc.property(
        generators.text().filter((s) => s.trim().length > 0),
        generators.subtitle(),
        (title, subtitle) => {
          const { container } = renderWithPBT(
            <SectionHeading title={title} subtitle={subtitle} />
          );

          const paragraphs = container.querySelectorAll("p");

          if (subtitle && subtitle.trim().length > 0) {
            // Should have subtitle paragraph
            expect(paragraphs.length).toBeGreaterThan(0);
            expect(paragraphs[0].textContent).toBe(subtitle);
          } else {
            // Should not have subtitle paragraph
            expect(paragraphs.length).toBe(0);
          }

          return true;
        }
      ),
      PBT_CONFIG
    );
  });

  it("should apply gradient classes when gradient prop is true", () => {
    fc.assert(
      fc.property(
        generators.text().filter((s) => s.trim().length > 0),
        generators.boolean(),
        (title, gradient) => {
          const { container } = renderWithPBT(
            <SectionHeading title={title} gradient={gradient} />
          );

          const heading = container.querySelector("h2");
          expect(heading).toBeInTheDocument();

          if (gradient) {
            // Should have gradient classes
            expect(heading?.className).toContain("bg-gradient-to-r");
            expect(heading?.className).toContain("bg-clip-text");
          } else {
            // Should have foreground color class
            expect(heading?.className).toContain("text-foreground");
          }

          return true;
        }
      ),
      PBT_CONFIG
    );
  });

  it("should never render numbered prefixes in title (demo property)", () => {
    fc.assert(
      fc.property(generators.headingText(), (title) => {
        // Skip empty titles
        if (!title || title.trim().length === 0) return true;

        const { container } = renderWithPBT(<SectionHeading title={title} />);

        const heading = container.querySelector("h2");
        const renderedText = heading?.textContent || "";

        // Property: Rendered text should never have numbered prefix
        expect(hasNumberedPrefix(renderedText)).toBe(false);

        return true;
      }),
      PBT_CONFIG
    );
  });
});
