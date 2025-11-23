/**
 * Property-Based Testing Utilities
 *
 * This module provides utilities for property-based testing of React components
 * using fast-check. It includes generators for common prop types and helpers
 * for rendering components with random props.
 */

import * as fc from "fast-check";
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";

/**
 * Default configuration for property-based tests
 * Ensures all PBT tests run at least 100 iterations
 */
export const PBT_CONFIG = {
  numRuns: 100,
} as const;

/**
 * Generators for common prop types
 */
export const generators = {
  /**
   * Generates random className strings
   * Includes common Tailwind patterns and edge cases
   */
  className: () =>
    fc.oneof(
      fc.constant(""),
      fc.constant("text-blue-500"),
      fc.constant("flex items-center justify-center"),
      fc.constant("bg-gradient-to-r from-blue-500 to-indigo-500"),
      fc.string({ minLength: 0, maxLength: 100 })
    ),

  /**
   * Generates random text content
   * Includes empty strings, normal text, and special characters
   */
  text: () =>
    fc.oneof(
      fc.constant(""),
      fc.string({ minLength: 1, maxLength: 50 }),
      fc.lorem({ maxCount: 5 }),
      fc.constant("Test Title"),
      fc.constant("Hello World!")
    ),

  /**
   * Generates random heading text without numbered prefixes
   * Used for testing section headings
   */
  headingText: () =>
    fc.oneof(
      fc.constant("Skills & Technologies"),
      fc.constant("Featured Projects"),
      fc.constant("Work Experience"),
      fc
        .string({ minLength: 1, maxLength: 50 })
        .filter((s) => !/^\d+\./.test(s)),
      fc.lorem({ maxCount: 3 })
    ),

  /**
   * Generates random subtitle text
   */
  subtitle: () =>
    fc.oneof(
      fc.constant(undefined),
      fc.constant(""),
      fc.string({ minLength: 1, maxLength: 100 }),
      fc.lorem({ maxCount: 10 })
    ),

  /**
   * Generates random alignment values
   */
  alignment: () => fc.constantFrom("left", "center", "right"),

  /**
   * Generates random boolean values
   */
  boolean: () => fc.boolean(),

  /**
   * Generates random intensity values
   */
  intensity: () => fc.constantFrom("low", "medium", "high"),

  /**
   * Generates random pattern types
   */
  pattern: () => fc.constantFrom("grid", "matrix", "circuit"),

  /**
   * Generates random theme types
   */
  theme: () => fc.constantFrom("cloud", "containers", "mixed"),

  /**
   * Generates random CSS color values that should be theme variables
   * Used for testing theme consistency
   */
  themeColor: () =>
    fc.oneof(
      fc.constant("var(--brand-blue-500)"),
      fc.constant("var(--brand-indigo-500)"),
      fc.constant("var(--primary)"),
      fc.constant("var(--background)"),
      fc.constant("var(--foreground)")
    ),

  /**
   * Generates invalid color values (hardcoded colors)
   * Used for negative testing of theme consistency
   */
  hardcodedColor: () =>
    fc.oneof(
      fc.constant("#3b82f6"),
      fc.constant("rgb(59, 130, 246)"),
      fc.constant("hsl(217, 91%, 60%)"),
      fc.constant("blue")
    ),
};

/**
 * Custom render function for property-based testing
 * Wraps @testing-library/react render with additional utilities
 */
export function renderWithPBT(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, options);
}

/**
 * Helper to extract all color values from rendered component
 * Used for testing theme variable consistency
 */
export function extractColorValues(container: HTMLElement): string[] {
  const colors: string[] = [];
  const elements = container.querySelectorAll("*");

  elements.forEach((element) => {
    const computedStyle = window.getComputedStyle(element);

    // Check common color properties
    const colorProps = [
      "color",
      "backgroundColor",
      "borderColor",
      "fill",
      "stroke",
    ];

    colorProps.forEach((prop) => {
      const value = computedStyle.getPropertyValue(prop);
      if (value && value !== "none" && value !== "transparent") {
        colors.push(value);
      }
    });

    // Check inline styles
    const inlineStyle = element.getAttribute("style");
    if (inlineStyle) {
      colors.push(inlineStyle);
    }
  });

  return colors;
}

/**
 * Helper to check if a value references a CSS custom property
 */
export function isThemeVariable(value: string): boolean {
  return /var\(--[a-z0-9-]+\)/.test(value);
}

/**
 * Helper to check if element has animation-related classes or styles
 */
export function hasAnimations(element: HTMLElement): boolean {
  const className = element.className;
  const style = element.getAttribute("style") || "";
  const computedStyle = window.getComputedStyle(element);

  // Check for animation-related class names
  const animationClasses = ["animate-", "transition-", "motion-", "duration-"];
  const hasAnimationClass = animationClasses.some((cls) =>
    className.includes(cls)
  );

  // Check for animation CSS properties
  const hasAnimationStyle =
    computedStyle.animation !== "none" ||
    computedStyle.animationName !== "none" ||
    style.includes("animation");

  return hasAnimationClass || hasAnimationStyle;
}

/**
 * Helper to check if text contains numbered prefix pattern
 */
export function hasNumberedPrefix(text: string): boolean {
  return /^\d+\./.test(text.trim());
}

/**
 * Generator for component props with common patterns
 */
export function componentPropsGenerator<
  T extends Record<string, unknown>,
>(propGenerators: { [K in keyof T]: fc.Arbitrary<T[K]> }): fc.Arbitrary<T> {
  return fc.record(propGenerators) as fc.Arbitrary<T>;
}

/**
 * Helper to run property tests with default configuration
 */
export function assertProperty<T>(
  arbitrary: fc.Arbitrary<T>,
  predicate: (value: T) => void | boolean,
  config: fc.Parameters<[T]> = PBT_CONFIG
) {
  return fc.assert(fc.property(arbitrary, predicate), config);
}
