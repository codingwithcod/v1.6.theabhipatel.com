"use client";

import React from "react";

interface DevOpsAnimatedBackgroundProps {
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export const DevOpsAnimatedBackground: React.FC<
  DevOpsAnimatedBackgroundProps
> = ({ className = "", intensity = "medium" }) => {
  // Animation duration based on intensity
  const animationSpeed = {
    low: 1.5,
    medium: 1,
    high: 0.7,
  }[intensity];

  return (
    <>
      <style jsx>{`
        @keyframes floatRotate1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(20px, -30px) rotate(15deg);
          }
        }
        @keyframes floatRotate2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-25px, 20px) rotate(-12deg);
          }
        }
        @keyframes floatRotate3 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(15px, 25px) rotate(10deg);
          }
        }
        @keyframes floatRotate4 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-20px, -15px) rotate(-8deg);
          }
        }
        @keyframes floatRotate5 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(18px, 22px) rotate(14deg);
          }
        }
        @keyframes floatRotate6 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-22px, -18px) rotate(-11deg);
          }
        }
        @keyframes fadeInOut1 {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.2;
          }
        }
        @keyframes fadeInOut2 {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes fadeInOut3 {
          0%,
          100% {
            opacity: 0.45;
          }
          50% {
            opacity: 0.15;
          }
        }
        @keyframes fadeInOut4 {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes pulseNode {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.3);
          }
        }
        @keyframes dashFlow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -30;
          }
        }
        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        @keyframes rotateK8s {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }

        .animate-float-rotate-1 {
          animation: floatRotate1 ${8 / animationSpeed}s ease-in-out infinite;
        }
        .animate-float-rotate-2 {
          animation: floatRotate2 ${10 / animationSpeed}s ease-in-out infinite;
        }
        .animate-float-rotate-3 {
          animation: floatRotate3 ${9 / animationSpeed}s ease-in-out infinite;
        }
        .animate-float-rotate-4 {
          animation: floatRotate4 ${11 / animationSpeed}s ease-in-out infinite;
        }
        .animate-float-rotate-5 {
          animation: floatRotate5 ${7.5 / animationSpeed}s ease-in-out infinite;
        }
        .animate-float-rotate-6 {
          animation: floatRotate6 ${9.5 / animationSpeed}s ease-in-out infinite;
        }
        .animate-fade-1 {
          animation: fadeInOut1 ${6 / animationSpeed}s ease-in-out infinite;
        }
        .animate-fade-2 {
          animation: fadeInOut2 ${7 / animationSpeed}s ease-in-out infinite;
        }
        .animate-fade-3 {
          animation: fadeInOut3 ${5.5 / animationSpeed}s ease-in-out infinite;
        }
        .animate-fade-4 {
          animation: fadeInOut4 ${6.5 / animationSpeed}s ease-in-out infinite;
        }
        .animate-pulse-node {
          animation: pulseNode ${3 / animationSpeed}s ease-in-out infinite;
        }
        .animate-dash-flow {
          animation: dashFlow ${2 / animationSpeed}s linear infinite;
        }
        .animate-pulse-glow {
          animation: pulseGlow ${4 / animationSpeed}s ease-in-out infinite;
        }
        .animate-rotate-k8s {
          animation: rotateK8s ${20 / animationSpeed}s linear infinite;
          transform-origin: center;
        }
        .animate-blink {
          animation: blink ${1.2 / animationSpeed}s step-end infinite;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-float-rotate-1,
          .animate-float-rotate-2,
          .animate-float-rotate-3,
          .animate-float-rotate-4,
          .animate-float-rotate-5,
          .animate-float-rotate-6,
          .animate-fade-1,
          .animate-fade-2,
          .animate-fade-3,
          .animate-fade-4,
          .animate-pulse-node,
          .animate-dash-flow,
          .animate-pulse-glow,
          .animate-rotate-k8s,
          .animate-blink {
            animation: none !important;
          }
        }

        /* Mobile responsiveness - reduce element density */
        /* Extra small devices (320px and up) */
        @media (max-width: 320px) {
          /* Minimal elements for very small screens */
          .code-brackets text:nth-child(n + 3),
          .code-keywords text:nth-child(n + 2),
          .docker-icon,
          .k8s-icon,
          .terminal-window,
          .pipeline-arrows {
            display: none;
          }
          /* Reduce font sizes significantly */
          .code-brackets text {
            font-size: 28px;
          }
          .code-keywords text {
            font-size: 16px;
          }
          /* Further reduce opacity */
          .git-network {
            opacity: 0.1;
          }
          /* Slow down animations significantly for performance */
          .animate-float-rotate-1,
          .animate-float-rotate-2,
          .animate-float-rotate-3,
          .animate-float-rotate-4,
          .animate-float-rotate-5,
          .animate-float-rotate-6 {
            animation-duration: ${16 / animationSpeed}s;
          }
          .animate-fade-1,
          .animate-fade-2,
          .animate-fade-3,
          .animate-fade-4 {
            animation-duration: ${12 / animationSpeed}s;
          }
          .animate-pulse-node,
          .animate-pulse-glow {
            animation-duration: ${6 / animationSpeed}s;
          }
        }

        /* Small devices (321px to 768px) */
        @media (min-width: 321px) and (max-width: 768px) {
          /* Hide some code brackets on mobile */
          .code-brackets text:nth-child(3),
          .code-brackets text:nth-child(4),
          .code-brackets text:nth-child(5),
          .code-brackets text:nth-child(6) {
            display: none;
          }
          /* Hide some keywords on mobile */
          .code-keywords text:nth-child(3),
          .code-keywords text:nth-child(4) {
            display: none;
          }
          /* Hide terminal on small screens */
          .terminal-window {
            display: none;
          }
          /* Reduce font sizes on mobile */
          .code-brackets text {
            font-size: 32px;
          }
          .code-keywords text {
            font-size: 20px;
          }
          /* Reduce opacity for better readability */
          .git-network {
            opacity: 0.15;
          }
          .pipeline-arrows {
            opacity: 0.12;
          }
          .docker-icon,
          .k8s-icon {
            opacity: 0.2;
          }
          /* Slow down animations on mobile for better performance */
          .animate-float-rotate-1,
          .animate-float-rotate-2,
          .animate-float-rotate-3,
          .animate-float-rotate-4,
          .animate-float-rotate-5,
          .animate-float-rotate-6 {
            animation-duration: ${14 / animationSpeed}s;
          }
          .animate-fade-1,
          .animate-fade-2,
          .animate-fade-3,
          .animate-fade-4 {
            animation-duration: ${10 / animationSpeed}s;
          }
          .animate-pulse-node,
          .animate-pulse-glow {
            animation-duration: ${5 / animationSpeed}s;
          }
          .animate-dash-flow {
            animation-duration: ${3 / animationSpeed}s;
          }
          .animate-rotate-k8s {
            animation-duration: ${30 / animationSpeed}s;
          }
        }

        /* Medium devices/tablets (769px to 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
          /* Reduce opacity on tablets for less distraction */
          .git-network {
            opacity: 0.2;
          }
          .pipeline-arrows {
            opacity: 0.15;
          }
          .docker-icon,
          .k8s-icon {
            opacity: 0.25;
          }
          .terminal-window {
            opacity: 0.25;
          }
          /* Slightly slower animations for tablets */
          .animate-float-rotate-1,
          .animate-float-rotate-2,
          .animate-float-rotate-3,
          .animate-float-rotate-4,
          .animate-float-rotate-5,
          .animate-float-rotate-6 {
            animation-duration: ${10 / animationSpeed}s;
          }
          .animate-fade-1,
          .animate-fade-2,
          .animate-fade-3,
          .animate-fade-4 {
            animation-duration: ${8 / animationSpeed}s;
          }
        }
      `}</style>
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
        aria-hidden="true"
      >
        {/* Layer 1: Background elements (lowest z-index) */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 1 }}
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradient definitions using theme colors */}
            <linearGradient
              id="blueGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{
                  stopColor: "hsl(var(--brand-blue-500))",
                  stopOpacity: 0.3,
                }}
              />
              <stop
                offset="100%"
                style={{
                  stopColor: "hsl(var(--brand-indigo-500))",
                  stopOpacity: 0.3,
                }}
              />
            </linearGradient>
            <linearGradient
              id="indigoGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{
                  stopColor: "hsl(var(--brand-indigo-400))",
                  stopOpacity: 0.2,
                }}
              />
              <stop
                offset="100%"
                style={{
                  stopColor: "hsl(var(--brand-blue-400))",
                  stopOpacity: 0.2,
                }}
              />
            </linearGradient>
          </defs>

          {/* Git branch network with animated commit nodes */}
          <g className="git-network" opacity="0.25">
            {/* Branch paths */}
            <path
              d="M 100 600 Q 300 550 500 600 T 900 600"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
            <path
              d="M 500 600 Q 600 700 800 750"
              stroke="hsl(var(--brand-indigo-400))"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />

            {/* Commit nodes */}
            <circle
              cx="100"
              cy="600"
              r="6"
              fill="hsl(var(--brand-blue-500))"
              className="animate-pulse-node"
            />
            <circle
              cx="500"
              cy="600"
              r="6"
              fill="hsl(var(--brand-blue-500))"
              className="animate-pulse-node"
            />
            <circle
              cx="900"
              cy="600"
              r="6"
              fill="hsl(var(--brand-indigo-500))"
              className="animate-pulse-node"
            />
            <circle
              cx="800"
              cy="750"
              r="6"
              fill="hsl(var(--brand-indigo-500))"
              className="animate-pulse-node"
            />
          </g>

          {/* CI/CD Pipeline arrows */}
          <g className="pipeline-arrows" opacity="0.2">
            <path
              d="M 1200 300 L 1400 300"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="3"
              strokeDasharray="10,5"
              className="animate-dash-flow"
            />
            <polygon
              points="1400,300 1390,295 1390,305"
              fill="hsl(var(--brand-blue-400))"
            />
            <path
              d="M 1400 300 L 1600 300"
              stroke="hsl(var(--brand-indigo-400))"
              strokeWidth="3"
              strokeDasharray="10,5"
              className="animate-dash-flow"
            />
            <polygon
              points="1600,300 1590,295 1590,305"
              fill="hsl(var(--brand-indigo-400))"
            />
          </g>
        </svg>

        {/* Layer 2: Mid-ground elements - Code snippets */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 2 }}
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Floating code brackets */}
          <g className="code-brackets">
            {/* Curly braces */}
            <text
              x="200"
              y="300"
              fontSize="48"
              fill="hsl(var(--brand-blue-400))"
              opacity="0.4"
              className="animate-float-rotate-1"
            >
              {"{"}
            </text>
            <text
              x="1600"
              y="700"
              fontSize="48"
              fill="hsl(var(--brand-indigo-400))"
              opacity="0.4"
              className="animate-float-rotate-2"
            >
              {"}"}
            </text>

            {/* Angle brackets */}
            <text
              x="400"
              y="800"
              fontSize="42"
              fill="hsl(var(--brand-blue-300))"
              opacity="0.35"
              className="animate-float-rotate-3"
            >
              {"<"}
            </text>
            <text
              x="1400"
              y="200"
              fontSize="42"
              fill="hsl(var(--brand-indigo-300))"
              opacity="0.35"
              className="animate-float-rotate-4"
            >
              {">"}
            </text>

            {/* Square brackets */}
            <text
              x="800"
              y="150"
              fontSize="40"
              fill="hsl(var(--brand-blue-500))"
              opacity="0.3"
              className="animate-float-rotate-5"
            >
              {"["}
            </text>
            <text
              x="1200"
              y="900"
              fontSize="40"
              fill="hsl(var(--brand-indigo-500))"
              opacity="0.3"
              className="animate-float-rotate-6"
            >
              {"]"}
            </text>
          </g>

          {/* Code keywords with fade effects */}
          <g className="code-keywords">
            <text
              x="300"
              y="500"
              fontSize="28"
              fill="hsl(var(--brand-blue-400))"
              opacity="0.5"
              fontFamily="var(--font-mono)"
              className="animate-fade-1"
            >
              const
            </text>
            <text
              x="1500"
              y="400"
              fontSize="28"
              fill="hsl(var(--brand-indigo-400))"
              opacity="0.5"
              fontFamily="var(--font-mono)"
              className="animate-fade-2"
            >
              function
            </text>
            <text
              x="600"
              y="650"
              fontSize="26"
              fill="hsl(var(--brand-blue-300))"
              opacity="0.45"
              fontFamily="var(--font-mono)"
              className="animate-fade-3"
            >
              async
            </text>
            <text
              x="1100"
              y="350"
              fontSize="26"
              fill="hsl(var(--brand-indigo-300))"
              opacity="0.45"
              fontFamily="var(--font-mono)"
              className="animate-fade-4"
            >
              await
            </text>
          </g>
        </svg>

        {/* Layer 3: Foreground elements (highest z-index) - DevOps icons */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 3 }}
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Docker container icon with pulse */}
          <g
            className="docker-icon"
            opacity="0.3"
            transform="translate(1700, 850)"
          >
            <rect
              x="0"
              y="0"
              width="60"
              height="50"
              fill="none"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="2"
              className="animate-pulse-glow"
            />
            <rect
              x="5"
              y="5"
              width="15"
              height="12"
              fill="hsl(var(--brand-blue-400))"
            />
            <rect
              x="22"
              y="5"
              width="15"
              height="12"
              fill="hsl(var(--brand-blue-400))"
            />
            <rect
              x="39"
              y="5"
              width="15"
              height="12"
              fill="hsl(var(--brand-blue-400))"
            />
            <rect
              x="5"
              y="20"
              width="15"
              height="12"
              fill="hsl(var(--brand-blue-400))"
            />
            <rect
              x="22"
              y="20"
              width="15"
              height="12"
              fill="hsl(var(--brand-blue-400))"
            />
            <rect
              x="39"
              y="20"
              width="15"
              height="12"
              fill="hsl(var(--brand-blue-400))"
            />
          </g>

          {/* Kubernetes hexagon with rotation */}
          <g
            className="k8s-icon"
            opacity="0.25"
            transform="translate(150, 100)"
          >
            <polygon
              points="30,0 60,15 60,45 30,60 0,45 0,15"
              fill="none"
              stroke="hsl(var(--brand-indigo-400))"
              strokeWidth="2"
              className="animate-rotate-k8s"
            />
            <circle cx="30" cy="30" r="8" fill="hsl(var(--brand-indigo-400))" />
          </g>

          {/* Terminal window with blinking cursor */}
          <g
            className="terminal-window"
            opacity="0.3"
            transform="translate(100, 850)"
          >
            <rect
              x="0"
              y="0"
              width="200"
              height="120"
              rx="4"
              fill="hsl(var(--background))"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="2"
            />
            {/* Terminal header */}
            <rect
              x="0"
              y="0"
              width="200"
              height="20"
              rx="4"
              fill="hsl(var(--brand-blue-500))"
              opacity="0.3"
            />
            {/* Terminal dots */}
            <circle cx="10" cy="10" r="3" fill="hsl(var(--brand-blue-300))" />
            <circle cx="22" cy="10" r="3" fill="hsl(var(--brand-indigo-300))" />
            <circle cx="34" cy="10" r="3" fill="hsl(var(--brand-blue-300))" />
            {/* Terminal text */}
            <text
              x="10"
              y="45"
              fontSize="12"
              fill="hsl(var(--brand-blue-300))"
              fontFamily="var(--font-mono)"
            >
              $ npm run build
            </text>
            <text
              x="10"
              y="65"
              fontSize="12"
              fill="hsl(var(--brand-indigo-300))"
              fontFamily="var(--font-mono)"
            >
              Building...
            </text>
            {/* Blinking cursor */}
            <rect
              x="10"
              y="75"
              width="8"
              height="14"
              fill="hsl(var(--brand-blue-400))"
              className="animate-blink"
            />
          </g>
        </svg>
      </div>
    </>
  );
};
