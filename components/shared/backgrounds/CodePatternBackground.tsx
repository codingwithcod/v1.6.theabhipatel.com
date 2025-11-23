"use client";

import React from "react";

interface CodePatternBackgroundProps {
  className?: string;
  pattern?: "grid" | "matrix" | "circuit";
}

export const CodePatternBackground: React.FC<CodePatternBackgroundProps> = ({
  className = "",
}) => {
  return (
    <>
      <style jsx>{`
        @keyframes matrixFall1 {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        @keyframes matrixFall2 {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.25;
          }
          90% {
            opacity: 0.25;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        @keyframes matrixFall3 {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        @keyframes subtlePulse {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.02);
          }
        }
        @keyframes symbolPulse {
          0%,
          100% {
            opacity: 0.12;
          }
          50% {
            opacity: 0.2;
          }
        }

        .animate-matrix-fall-1 {
          animation: matrixFall1 8s linear infinite;
        }
        .animate-matrix-fall-2 {
          animation: matrixFall2 10s linear infinite 2s;
        }
        .animate-matrix-fall-3 {
          animation: matrixFall3 12s linear infinite 4s;
        }
        .animate-subtle-pulse {
          animation: subtlePulse 6s ease-in-out infinite;
        }
        .animate-symbol-pulse {
          animation: symbolPulse 5s ease-in-out infinite;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-matrix-fall-1,
          .animate-matrix-fall-2,
          .animate-matrix-fall-3,
          .animate-subtle-pulse,
          .animate-symbol-pulse {
            animation: none !important;
          }
        }
      `}</style>
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
        aria-hidden="true"
      >
        {/* Layer 1: Background grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 1 }}
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Geometric grid representing code structure */}
          <defs>
            <pattern
              id="codeGrid"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="hsl(var(--brand-blue-500))"
                strokeWidth="0.5"
                opacity="0.1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#codeGrid)" />

          {/* Function declaration patterns with subtle pulse */}
          <g className="animate-subtle-pulse">
            <text
              x="200"
              y="200"
              fontSize="16"
              fill="hsl(var(--brand-blue-400))"
              fontFamily="var(--font-mono)"
            >
              function() {"{"} {"}"}
            </text>
            <text
              x="800"
              y="400"
              fontSize="16"
              fill="hsl(var(--brand-indigo-400))"
              fontFamily="var(--font-mono)"
            >
              const x = () =&gt; {"{}"}
            </text>
            <text
              x="1400"
              y="600"
              fontSize="16"
              fill="hsl(var(--brand-blue-300))"
              fontFamily="var(--font-mono)"
            >
              class Component {"{"} {"}"}
            </text>
            <text
              x="400"
              y="800"
              fontSize="16"
              fill="hsl(var(--brand-indigo-300))"
              fontFamily="var(--font-mono)"
            >
              interface Props {"{"} {"}"}
            </text>
          </g>

          {/* Variable assignment symbols with pulse */}
          <g className="animate-symbol-pulse">
            <text
              x="600"
              y="300"
              fontSize="20"
              fill="hsl(var(--brand-blue-400))"
              fontFamily="var(--font-mono)"
            >
              =
            </text>
            <text
              x="1200"
              y="500"
              fontSize="20"
              fill="hsl(var(--brand-indigo-400))"
              fontFamily="var(--font-mono)"
            >
              :
            </text>
            <text
              x="300"
              y="700"
              fontSize="20"
              fill="hsl(var(--brand-blue-300))"
              fontFamily="var(--font-mono)"
            >
              =&gt;
            </text>
            <text
              x="1600"
              y="900"
              fontSize="20"
              fill="hsl(var(--brand-indigo-300))"
              fontFamily="var(--font-mono)"
            >
              ===
            </text>
          </g>
        </svg>

        {/* Layer 2: Binary code rain effect (Matrix-style) */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 2 }}
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Binary code columns */}
          <g className="animate-matrix-fall-1">
            <text
              x="100"
              y="0"
              fontSize="14"
              fill="hsl(var(--brand-blue-400))"
              fontFamily="var(--font-mono)"
              opacity="0.3"
            >
              {Array.from({ length: 20 }, (_, i) => (
                <tspan key={i} x="100" dy="20">
                  {Math.random() > 0.5 ? "1" : "0"}
                </tspan>
              ))}
            </text>
          </g>

          <g className="animate-matrix-fall-2">
            <text
              x="500"
              y="0"
              fontSize="14"
              fill="hsl(var(--brand-indigo-400))"
              fontFamily="var(--font-mono)"
              opacity="0.25"
            >
              {Array.from({ length: 20 }, (_, i) => (
                <tspan key={i} x="500" dy="20">
                  {Math.random() > 0.5 ? "1" : "0"}
                </tspan>
              ))}
            </text>
          </g>

          <g className="animate-matrix-fall-3">
            <text
              x="900"
              y="0"
              fontSize="14"
              fill="hsl(var(--brand-blue-300))"
              fontFamily="var(--font-mono)"
              opacity="0.2"
            >
              {Array.from({ length: 20 }, (_, i) => (
                <tspan key={i} x="900" dy="20">
                  {Math.random() > 0.5 ? "1" : "0"}
                </tspan>
              ))}
            </text>
          </g>

          <g className="animate-matrix-fall-1">
            <text
              x="1300"
              y="0"
              fontSize="14"
              fill="hsl(var(--brand-indigo-300))"
              fontFamily="var(--font-mono)"
              opacity="0.3"
            >
              {Array.from({ length: 20 }, (_, i) => (
                <tspan key={i} x="1300" dy="20">
                  {Math.random() > 0.5 ? "1" : "0"}
                </tspan>
              ))}
            </text>
          </g>

          <g className="animate-matrix-fall-2">
            <text
              x="1700"
              y="0"
              fontSize="14"
              fill="hsl(var(--brand-blue-400))"
              fontFamily="var(--font-mono)"
              opacity="0.25"
            >
              {Array.from({ length: 20 }, (_, i) => (
                <tspan key={i} x="1700" dy="20">
                  {Math.random() > 0.5 ? "1" : "0"}
                </tspan>
              ))}
            </text>
          </g>
        </svg>
      </div>
    </>
  );
};
