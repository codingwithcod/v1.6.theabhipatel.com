# Property-Based Testing Infrastructure

This directory contains utilities and helpers for property-based testing (PBT) using fast-check.

## Overview

Property-based testing is a testing methodology where you define properties (invariants) that should hold true for all valid inputs, and the testing framework generates hundreds of random test cases to verify these properties.

## Configuration

### Default Settings

- **Minimum iterations**: 100 runs per property test (configured in `PBT_CONFIG`)
- **Test timeout**: 30 seconds (configured in `vitest.config.ts`)
- **Framework**: fast-check v3.23.1+

### Global Setup

The PBT infrastructure is automatically configured through:
- `vitest.config.ts` - Test timeout and environment settings
- `vitest.setup.ts` - Global mocks and PBT configuration
- `pbt-helpers.tsx` - Utility functions and generators

## Usage

### Basic Property Test

```typescript
import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { PBT_CONFIG, assertProperty } from "@/lib/test-utils";

describe("My Component", () => {
  it("should satisfy property X", () => {
    assertProperty(
      fc.string(),
      (value) => {
        // Your property assertion here
        expect(value).toBeDefined();
      }
    );
  });
});
```

### Using Generators

The library provides pre-built generators for common prop types:

```typescript
import { generators } from "@/lib/test-utils";

// Generate random className strings
fc.assert(
  fc.property(generators.className(), (className) => {
    // Test with random className
  }),
  { numRuns: 100 }
);

// Generate heading text without numbered prefixes
fc.assert(
  fc.property(generators.headingText(), (heading) => {
    // Test with random heading
  }),
  { numRuns: 100 }
);
```

### Available Generators

- `generators.className()` - Random Tailwind className strings
- `generators.text()` - Random text content
- `generators.headingText()` - Heading text without numbered prefixes
- `generators.subtitle()` - Optional subtitle text
- `generators.alignment()` - "left" | "center" | "right"
- `generators.boolean()` - Random boolean values
- `generators.intensity()` - "low" | "medium" | "high"
- `generators.pattern()` - "grid" | "matrix" | "circuit"
- `generators.theme()` - "cloud" | "containers" | "mixed"
- `generators.themeColor()` - Valid CSS custom property references
- `generators.hardcodedColor()` - Hardcoded color values (for negative testing)

### Component Testing

```typescript
import { renderWithPBT, generators } from "@/lib/test-utils";
import { MyComponent } from "./MyComponent";

it("should render with any valid props", () => {
  fc.assert(
    fc.property(
      generators.text(),
      generators.className(),
      (title, className) => {
        const { container } = renderWithPBT(
          <MyComponent title={title} className={className} />
        );
        expect(container).toBeInTheDocument();
      }
    ),
    { numRuns: 100 }
  );
});
```

### Helper Functions

#### `isThemeVariable(value: string): boolean`
Checks if a value references a CSS custom property.

```typescript
isThemeVariable("var(--brand-blue-500)"); // true
isThemeVariable("#3b82f6"); // false
```

#### `hasNumberedPrefix(text: string): boolean`
Checks if text starts with a numbered prefix (e.g., "1. ", "2. ").

```typescript
hasNumberedPrefix("1. Skills"); // true
hasNumberedPrefix("Skills"); // false
```

#### `hasAnimations(element: HTMLElement): boolean`
Checks if an element has animation-related classes or styles.

```typescript
const element = document.querySelector(".animated");
hasAnimations(element); // true if animations present
```

#### `extractColorValues(container: HTMLElement): string[]`
Extracts all color values from rendered component.

```typescript
const { container } = render(<MyComponent />);
const colors = extractColorValues(container);
// Returns array of color values found in the component
```

## Property Test Naming Convention

All property-based test files should follow this naming convention:
- `*.pbt.test.ts` - For TypeScript files
- `*.pbt.test.tsx` - For React component tests

## Property Test Documentation

Each property test must include a comment header referencing the design document:

```typescript
/**
 * Feature: home-page-enhancement, Property 1: Section headings are prefix-free
 * Validates: Requirements 2.1
 *
 * Property: For any section heading component rendered with any title text,
 * the rendered output should never contain numbered prefixes matching the
 * pattern /^\d+\./
 */
```

## Best Practices

1. **Run at least 100 iterations** - Use `PBT_CONFIG` or specify `{ numRuns: 100 }`
2. **Test properties, not examples** - Focus on invariants that should hold for all inputs
3. **Use appropriate generators** - Choose generators that match your input domain
4. **Document your properties** - Include clear comments explaining what property is being tested
5. **Reference requirements** - Link each property to specific acceptance criteria
6. **Handle edge cases** - Ensure generators include edge cases (empty strings, nulls, etc.)

## Common Property Patterns

### 1. Invariants
Properties that remain constant despite transformations:
```typescript
// Example: Adding an item increases length by 1
fc.assert(
  fc.property(fc.array(fc.anything()), fc.anything(), (arr, item) => {
    const originalLength = arr.length;
    const newArr = [...arr, item];
    expect(newArr.length).toBe(originalLength + 1);
  })
);
```

### 2. Round-trip Properties
Combining an operation with its inverse returns to original:
```typescript
// Example: parse(format(x)) === x
fc.assert(
  fc.property(generators.text(), (text) => {
    const formatted = format(text);
    const parsed = parse(formatted);
    expect(parsed).toBe(text);
  })
);
```

### 3. Idempotence
Doing an operation twice equals doing it once:
```typescript
// Example: f(x) === f(f(x))
fc.assert(
  fc.property(fc.anything(), (x) => {
    expect(f(x)).toEqual(f(f(x)));
  })
);
```

### 4. Metamorphic Properties
Relationships between inputs and outputs:
```typescript
// Example: filtered array is never longer than original
fc.assert(
  fc.property(fc.array(fc.integer()), (arr) => {
    const filtered = arr.filter(x => x > 0);
    expect(filtered.length).toBeLessThanOrEqual(arr.length);
  })
);
```

## Troubleshooting

### Tests timing out
- Reduce complexity of property assertions
- Check for infinite loops in generators
- Increase timeout in vitest.config.ts

### Too many test cases failing
- Review your property definition - it might be too strict
- Check if generators are producing valid inputs
- Verify the implementation matches the specification

### Flaky tests
- Ensure tests are deterministic
- Avoid relying on timing or external state
- Use fast-check's replay feature to reproduce failures

## Resources

- [fast-check documentation](https://fast-check.dev/)
- [Property-Based Testing Guide](https://fsharpforfunandprofit.com/posts/property-based-testing/)
- [Vitest documentation](https://vitest.dev/)
