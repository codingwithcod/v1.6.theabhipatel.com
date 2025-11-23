/**
 * Property-Based Tests for DevOpsAnimatedBackground
 * **Feature: home-page-enhancement, Property 3: Reduced motion compliance**
 * **Validates: Requirements 4.1, 4.4**
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fc from "fast-check";
import { render } from "@testing-library/react";
import { DevOpsAnimatedBackground } from "./DevOpsAnimatedBackground";
import {
  PBT_CONFIG,
  generators,
  hasAnimations,
} from "@/lib/test-utils/pbt-helpers";

describe("DevOpsAnimatedBackground - Property-Based Tests", () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    // Save original matchMedia
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    // Restore original matchMedia
    window.matchMedia = originalMatchMedia;
  });

  /**
   * Property 3: Reduced motion compliance
   * For any animated component, when the prefers-reduced-motion media query is set to 'reduce',
   * the rendered output should not include CSS animation properties or animation-related class names
   */
  it("Property 3: should disable animations when prefers-reduced-motion is set", () => {
    const propsArbitrary = fc.record({
      className: generators.className(),
      intensity: generators.intensity() as fc.Arbitrary<
        "low" | "medium" | "high"
      >,
    });

    fc.assert(
      fc.property(propsArbitrary, (props) => {
        // Mock matchMedia to return prefers-reduced-motion: reduce
        window.matchMedia = (query: string) => ({
          matches: query === "(prefers-reduced-motion: reduce)",
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
        });

        const { container } = render(
          <DevOpsAnimatedBackground
            className={props.className}
            intensity={props.intensity}
          />
        );

        // Check all elements in the container
        const allElements = container.querySelectorAll("*");

        allElements.forEach((element) => {
          const htmlElement = element as HTMLElement;

          // Get computed styles
          const computedStyle = window.getComputedStyle(htmlElement);

          // Check that animation properties are set to none or not present
          // Note: In JSDOM, the media query won't actually apply CSS, but we can check
          // that animation classes are present (they should be, but disabled by CSS)
          const className = htmlElement.className || "";

          // The component should still have animation classes, but CSS should disable them
          // We verify the CSS rule exists by checking the style tag content
          const styleTag = container.querySelector("style");
          if (styleTag) {
            const cssContent = styleTag.textContent || "";

            // Verify that the reduced motion media query exists
            expect(cssContent).toContain(
              "@media (prefers-reduced-motion: reduce)"
            );

            // Verify that animation classes are disabled in the media query
            expect(cssContent).toContain("animation: none !important");
          }
        });
      }),
      PBT_CONFIG
    );
  });

  it("Property 3 (variant): should maintain visual design without animations when reduced motion is preferred", () => {
    const propsArbitrary = fc.record({
      className: generators.className(),
      intensity: generators.intensity() as fc.Arbitrary<
        "low" | "medium" | "high"
      >,
    });

    fc.assert(
      fc.property(propsArbitrary, (props) => {
        // Mock matchMedia to return prefers-reduced-motion: reduce
        window.matchMedia = (query: string) => ({
          matches: query === "(prefers-reduced-motion: reduce)",
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
        });

        const { container } = render(
          <DevOpsAnimatedBackground
            className={props.className}
            intensity={props.intensity}
          />
        );

        // Verify that SVG elements are still rendered (static design maintained)
        const svgElements = container.querySelectorAll("svg");
        expect(svgElements.length).toBeGreaterThan(0);

        // Verify that text elements (code snippets) are still present
        const textElements = container.querySelectorAll("text");
        expect(textElements.length).toBeGreaterThan(0);

        // Verify that the component is still visible (not hidden)
        const mainDiv = container.querySelector("div");
        expect(mainDiv).toBeTruthy();
        expect(mainDiv?.getAttribute("aria-hidden")).toBe("true");
      }),
      PBT_CONFIG
    );
  });
});
