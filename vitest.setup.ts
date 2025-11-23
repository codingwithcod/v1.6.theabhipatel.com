import "@testing-library/jest-dom";

// Extend globalThis type to include PBT_DEFAULT_RUNS
declare global {
  var PBT_DEFAULT_RUNS: number;
}

// Mock IntersectionObserver for Framer Motion tests
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver;

// Mock matchMedia for responsive and reduced motion tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
});

// Global configuration for property-based testing
// This ensures all PBT tests run with at least 100 iterations
// Individual tests can override this by passing their own config
globalThis.PBT_DEFAULT_RUNS = 100;
