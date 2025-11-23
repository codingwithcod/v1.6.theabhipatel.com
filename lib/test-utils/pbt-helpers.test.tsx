/**
 * Tests for Property-Based Testing Infrastructure
 *
 * Verifies that the PBT utilities and configuration are working correctly
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  PBT_CONFIG,
  generators,
  hasNumberedPrefix,
  isThemeVariable,
  assertProperty,
} from "./pbt-helpers";

describe("PBT Infrastructure", () => {
  it("should have correct default configuration", () => {
    expect(PBT_CONFIG.numRuns).toBe(100);
  });

  it("should generate valid className strings", () => {
    fc.assert(
      fc.property(generators.className(), (className) => {
        expect(typeof className).toBe("string");
        return true;
      }),
      PBT_CONFIG
    );
  });

  it("should generate valid text strings", () => {
    fc.assert(
      fc.property(generators.text(), (text) => {
        expect(typeof text).toBe("string");
        return true;
      }),
      PBT_CONFIG
    );
  });

  it("should generate heading text without numbered prefixes", () => {
    fc.assert(
      fc.property(generators.headingText(), (heading) => {
        expect(typeof heading).toBe("string");
        expect(hasNumberedPrefix(heading)).toBe(false);
        return true;
      }),
      PBT_CONFIG
    );
  });

  it("should generate valid alignment values", () => {
    fc.assert(
      fc.property(generators.alignment(), (alignment) => {
        expect(["left", "center", "right"]).toContain(alignment);
        return true;
      }),
      PBT_CONFIG
    );
  });

  it("should generate valid intensity values", () => {
    fc.assert(
      fc.property(generators.intensity(), (intensity) => {
        expect(["low", "medium", "high"]).toContain(intensity);
        return true;
      }),
      PBT_CONFIG
    );
  });

  it("should correctly identify theme variables", () => {
    expect(isThemeVariable("var(--brand-blue-500)")).toBe(true);
    expect(isThemeVariable("var(--primary)")).toBe(true);
    expect(isThemeVariable("#3b82f6")).toBe(false);
    expect(isThemeVariable("rgb(59, 130, 246)")).toBe(false);
    expect(isThemeVariable("blue")).toBe(false);
  });

  it("should correctly identify numbered prefixes", () => {
    expect(hasNumberedPrefix("1. Skills")).toBe(true);
    expect(hasNumberedPrefix("2. Projects")).toBe(true);
    expect(hasNumberedPrefix("Skills")).toBe(false);
    expect(hasNumberedPrefix("Featured Projects")).toBe(false);
  });

  it("should run assertProperty with default config", () => {
    assertProperty(fc.integer({ min: 0, max: 100 }), (n) => {
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThanOrEqual(100);
    });
  });

  it("should generate theme colors that are valid CSS variables", () => {
    fc.assert(
      fc.property(generators.themeColor(), (color) => {
        expect(isThemeVariable(color)).toBe(true);
        return true;
      }),
      PBT_CONFIG
    );
  });

  it("should generate hardcoded colors that are not theme variables", () => {
    fc.assert(
      fc.property(generators.hardcodedColor(), (color) => {
        expect(isThemeVariable(color)).toBe(false);
        return true;
      }),
      PBT_CONFIG
    );
  });
});
