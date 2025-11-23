"use client";

import React from "react";

interface GitWorkflowBackgroundProps {
  className?: string;
  animated?: boolean;
}

export const GitWorkflowBackground: React.FC<GitWorkflowBackgroundProps> = ({
  className = "",
  animated = true,
}) => {
  return (
    <>
      <style jsx>{`
        @keyframes pulseCommit {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.4);
          }
        }
        @keyframes flowRight {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -40;
          }
        }
        @keyframes mergePath {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes prPulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        @keyframes checkGlow {
          0%,
          100% {
            opacity: 0.5;
            filter: drop-shadow(0 0 2px hsl(var(--brand-blue-400)));
          }
          50% {
            opacity: 0.8;
            filter: drop-shadow(0 0 6px hsl(var(--brand-blue-400)));
          }
        }

        .animate-pulse-commit {
          animation: pulseCommit 3s ease-in-out infinite;
        }
        .animate-flow-right {
          animation: flowRight 3s linear infinite;
        }
        .animate-merge-path {
          animation: mergePath 4s ease-in-out infinite;
        }
        .animate-pr-pulse {
          animation: prPulse 4s ease-in-out infinite;
        }
        .animate-check-glow {
          animation: checkGlow 3s ease-in-out infinite;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-commit,
          .animate-flow-right,
          .animate-merge-path,
          .animate-pr-pulse,
          .animate-check-glow {
            animation: none !important;
          }
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .git-branch-complex,
          .pr-icon-group:nth-child(n + 2),
          .deployment-arrow-group:nth-child(n + 3) {
            display: none;
          }
          .git-branch-main {
            opacity: 0.15;
          }
          .commit-node {
            r: 4;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .git-branch-complex:nth-child(n + 2) {
            display: none;
          }
          .git-branch-main {
            opacity: 0.2;
          }
        }
      `}</style>
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
        aria-hidden="true"
      >
        {/* Layer 1: Background Git branches (lowest z-index) */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 1 }}
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main branch path */}
          <g className="git-branch-main" opacity="0.25">
            <path
              d="M 100 540 L 1800 540"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="3"
              fill="none"
            />
            {/* Commit nodes on main branch */}
            <circle
              cx="200"
              cy="540"
              r="8"
              fill="hsl(var(--brand-blue-500))"
              className={
                animated ? "animate-pulse-commit commit-node" : "commit-node"
              }
              style={{ animationDelay: "0s" }}
            />
            <circle
              cx="500"
              cy="540"
              r="8"
              fill="hsl(var(--brand-blue-500))"
              className={
                animated ? "animate-pulse-commit commit-node" : "commit-node"
              }
              style={{ animationDelay: "0.5s" }}
            />
            <circle
              cx="900"
              cy="540"
              r="8"
              fill="hsl(var(--brand-blue-500))"
              className={
                animated ? "animate-pulse-commit commit-node" : "commit-node"
              }
              style={{ animationDelay: "1s" }}
            />
            <circle
              cx="1300"
              cy="540"
              r="8"
              fill="hsl(var(--brand-blue-500))"
              className={
                animated ? "animate-pulse-commit commit-node" : "commit-node"
              }
              style={{ animationDelay: "1.5s" }}
            />
            <circle
              cx="1700"
              cy="540"
              r="8"
              fill="hsl(var(--brand-blue-500))"
              className={
                animated ? "animate-pulse-commit commit-node" : "commit-node"
              }
              style={{ animationDelay: "2s" }}
            />
          </g>

          {/* Feature branch 1 */}
          <g className="git-branch-complex" opacity="0.2">
            {/* Branch off from main */}
            <path
              d="M 500 540 Q 550 480 600 420"
              stroke="hsl(var(--brand-indigo-400))"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
            <path
              d="M 600 420 L 1000 420"
              stroke="hsl(var(--brand-indigo-400))"
              strokeWidth="2"
              fill="none"
            />
            {/* Merge back to main */}
            <path
              d="M 1000 420 Q 1100 480 1300 540"
              stroke="hsl(var(--brand-indigo-400))"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              className={animated ? "animate-merge-path" : ""}
            />
            {/* Commit nodes on feature branch */}
            <circle
              cx="700"
              cy="420"
              r="6"
              fill="hsl(var(--brand-indigo-500))"
              className={animated ? "animate-pulse-commit" : ""}
              style={{ animationDelay: "0.8s" }}
            />
            <circle
              cx="900"
              cy="420"
              r="6"
              fill="hsl(var(--brand-indigo-500))"
              className={animated ? "animate-pulse-commit" : ""}
              style={{ animationDelay: "1.3s" }}
            />
          </g>

          {/* Feature branch 2 */}
          <g className="git-branch-complex" opacity="0.18">
            {/* Branch off from main */}
            <path
              d="M 900 540 Q 950 600 1000 660"
              stroke="hsl(var(--brand-blue-300))"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
            <path
              d="M 1000 660 L 1400 660"
              stroke="hsl(var(--brand-blue-300))"
              strokeWidth="2"
              fill="none"
            />
            {/* Merge back to main */}
            <path
              d="M 1400 660 Q 1500 600 1700 540"
              stroke="hsl(var(--brand-blue-300))"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              className={animated ? "animate-merge-path" : ""}
              style={{ animationDelay: "1s" }}
            />
            {/* Commit nodes on feature branch */}
            <circle
              cx="1100"
              cy="660"
              r="6"
              fill="hsl(var(--brand-blue-400))"
              className={animated ? "animate-pulse-commit" : ""}
              style={{ animationDelay: "1.2s" }}
            />
            <circle
              cx="1300"
              cy="660"
              r="6"
              fill="hsl(var(--brand-blue-400))"
              className={animated ? "animate-pulse-commit" : ""}
              style={{ animationDelay: "1.8s" }}
            />
          </g>
        </svg>

        {/* Layer 2: Deployment arrows and PR icons (mid z-index) */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 2 }}
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Deployment arrows flowing left to right */}
          <g className="deployment-arrow-group" opacity="0.2">
            <path
              d="M 300 300 L 600 300"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="3"
              strokeDasharray="15,10"
              className={animated ? "animate-flow-right" : ""}
            />
            <polygon
              points="600,300 590,295 590,305"
              fill="hsl(var(--brand-blue-400))"
            />
          </g>

          <g className="deployment-arrow-group" opacity="0.18">
            <path
              d="M 800 300 L 1100 300"
              stroke="hsl(var(--brand-indigo-400))"
              strokeWidth="3"
              strokeDasharray="15,10"
              className={animated ? "animate-flow-right" : ""}
              style={{ animationDelay: "0.5s" }}
            />
            <polygon
              points="1100,300 1090,295 1090,305"
              fill="hsl(var(--brand-indigo-400))"
            />
          </g>

          <g className="deployment-arrow-group" opacity="0.16">
            <path
              d="M 1300 300 L 1600 300"
              stroke="hsl(var(--brand-blue-300))"
              strokeWidth="3"
              strokeDasharray="15,10"
              className={animated ? "animate-flow-right" : ""}
              style={{ animationDelay: "1s" }}
            />
            <polygon
              points="1600,300 1590,295 1590,305"
              fill="hsl(var(--brand-blue-300))"
            />
          </g>

          {/* PR (Pull Request) icons */}
          <g
            className="pr-icon-group"
            opacity="0.25"
            transform="translate(750, 350)"
          >
            <circle
              cx="0"
              cy="0"
              r="20"
              fill="none"
              stroke="hsl(var(--brand-indigo-400))"
              strokeWidth="2"
              className={animated ? "animate-pr-pulse" : ""}
            />
            {/* PR icon - merge symbol */}
            <path
              d="M -8 -8 L -8 8 M -8 8 Q 0 8 0 0 M 0 0 L 0 -8"
              stroke="hsl(var(--brand-indigo-400))"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="-8" cy="-8" r="2" fill="hsl(var(--brand-indigo-400))" />
            <circle cx="0" cy="-8" r="2" fill="hsl(var(--brand-indigo-400))" />
          </g>

          <g
            className="pr-icon-group"
            opacity="0.22"
            transform="translate(1250, 600)"
          >
            <circle
              cx="0"
              cy="0"
              r="20"
              fill="none"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="2"
              className={animated ? "animate-pr-pulse" : ""}
              style={{ animationDelay: "1s" }}
            />
            {/* PR icon - merge symbol */}
            <path
              d="M -8 -8 L -8 8 M -8 8 Q 0 8 0 0 M 0 0 L 0 -8"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="-8" cy="-8" r="2" fill="hsl(var(--brand-blue-400))" />
            <circle cx="0" cy="-8" r="2" fill="hsl(var(--brand-blue-400))" />
          </g>
        </svg>

        {/* Layer 3: Build status indicators (highest z-index) */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 3 }}
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Build status checkmarks */}
          <g opacity="0.3" transform="translate(400, 250)">
            <circle
              cx="0"
              cy="0"
              r="18"
              fill="hsl(var(--brand-blue-500))"
              opacity="0.2"
            />
            <path
              d="M -6 0 L -2 6 L 8 -6"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={animated ? "animate-check-glow" : ""}
            />
          </g>

          <g opacity="0.28" transform="translate(950, 250)">
            <circle
              cx="0"
              cy="0"
              r="18"
              fill="hsl(var(--brand-indigo-500))"
              opacity="0.2"
            />
            <path
              d="M -6 0 L -2 6 L 8 -6"
              stroke="hsl(var(--brand-indigo-400))"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={animated ? "animate-check-glow" : ""}
              style={{ animationDelay: "0.7s" }}
            />
          </g>

          <g opacity="0.26" transform="translate(1450, 250)">
            <circle
              cx="0"
              cy="0"
              r="18"
              fill="hsl(var(--brand-blue-400))"
              opacity="0.2"
            />
            <path
              d="M -6 0 L -2 6 L 8 -6"
              stroke="hsl(var(--brand-blue-300))"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={animated ? "animate-check-glow" : ""}
              style={{ animationDelay: "1.4s" }}
            />
          </g>
        </svg>
      </div>
    </>
  );
};
