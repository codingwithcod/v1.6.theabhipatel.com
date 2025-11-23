/**
 * Property-Based Tests for CodePatternBackground
 * **Feature: home-page-enhancement, Property 2: Theme variable color consistency**
 * **Validates: Requirements 3.4, 5.1**
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { render } from "@testing-library/react";
import { CodePatternBackground } from "./CodePatternBackground";
import { PBT_CONFIG, generators } from "@/lib/test-utils/pbt-helpers";

describe("CodePatternBackground - Property-Based Tests", () => {
  /**
   * Property 2: Theme variable color consistency
   * For any rendered component (background, heading, or section), all color values in the rendered output
   * should reference CSS custom properties (var(--*)) rather than hardcoded color values (hex, rgb, hsl literals)
   */
  it("Property 2: should use only CSS custom properties for all color values", () => {
    const propsArbitrary = fc.record({
      className: generators.className(),
      pattern: generators.pattern() as fc.Arbitrary<
        "grid" | "matrix" | "circuit"
      >,
    });

    fc.assert(
      fc.property(propsArbitrary, (props) => {
        const { container } = render(
          <CodePatternBackground
            className={props.className}
            pattern={props.pattern}
          />
        );

        // Extract all SVG elements and text elements that might have color attributes
        const svgElements = container.querySelectorAll("svg *");

        svgElements.forEach((element) => {
          // Check fill attribute
          const fill = element.getAttribute("fill");
          if (
            fill &&
            fill !== "none" &&
            fill !== "transparent" &&
            !fill.startsWith("url(")
          ) {
            // Should match pattern: hsl(var(--*))
            expect(fill).toMatch(/^hsl\(var\(--[a-z0-9-]+\)\)$/);
          }

          // Check stroke attribute
          const stroke = element.getAttribute("stroke");
          if (
            stroke &&
            stroke !== "none" &&
            stroke !== "transparent" &&
            !stroke.startsWith("url(")
          ) {
            // Should match pattern: hsl(var(--*))
            expect(stroke).toMatch(/^hsl\(var\(--[a-z0-9-]+\)\)$/);
          }

          // Check inline style for color-related properties
          const style = element.getAttribute("style");
          if (style) {
            // Check for hardcoded color values (hex, rgb, hsl literals)
            // Should NOT contain these patterns
            expect(style).not.toMatch(/#[0-9a-fA-F]{3,6}/); // hex colors
            expect(style).not.toMatch(/rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/); // rgb colors
            expect(style).not.toMatch(/hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)/); // hsl literals

            // If it contains color properties, they should use var()
            if (
              style.includes("color:") ||
              style.includes("background") ||
              style.includes("fill:") ||
              style.includes("stroke:")
            ) {
              // Should contain var(--*)
              expect(style).toMatch(/var\(--[a-z0-9-]+\)/);
            }
          }
        });

        // Check the style tag for any hardcoded colors in CSS
        const styleTag = container.querySelector("style");
        if (styleTag) {
          const cssContent = styleTag.textContent || "";

          // CSS should use hsl(var(--*)) pattern for colors
          // Extract all color-related properties
          const colorMatches = cssContent.match(
            /(fill|stroke|color|background|border-color):\s*([^;]+);/g
          );

          if (colorMatches) {
            colorMatches.forEach((match) => {
              // Skip if it's a gradient or none/transparent
              if (
                match.includes("gradient") ||
                match.includes("none") ||
                match.includes("transparent")
              ) {
                return;
              }

              // Should use hsl(var(--*)) pattern
              if (match.includes("hsl")) {
                expect(match).toMatch(/hsl\(var\(--[a-z0-9-]+\)\)/);
              }
            });
          }
        }
      }),
      PBT_CONFIG
    );
  });
});
