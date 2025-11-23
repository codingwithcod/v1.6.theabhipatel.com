"use client";

import React from "react";

interface InfrastructureBackgroundProps {
  className?: string;
  theme?: "cloud" | "containers" | "mixed";
}

export const InfrastructureBackground: React.FC<
  InfrastructureBackgroundProps
> = ({ className = "" }) => {
  return (
    <>
      <style jsx>{`
        @keyframes cloudFloat1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(15px, -10px);
          }
        }
        @keyframes cloudFloat2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-12px, 8px);
          }
        }
        @keyframes podPulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        @keyframes serverBlink {
          0%,
          90% {
            opacity: 0.4;
          }
          95%,
          100% {
            opacity: 0.7;
          }
        }
        @keyframes dataFlow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -30;
          }
        }
        @keyframes loadBalancerPulse {
          0%,
          100% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes monitorPulse {
          0%,
          100% {
            opacity: 0.25;
          }
          50% {
            opacity: 0.45;
          }
        }
        @keyframes particleFlow {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateX(200px) translateY(-20px);
            opacity: 0;
          }
        }

        .animate-cloud-float-1 {
          animation: cloudFloat1 12s ease-in-out infinite;
        }
        .animate-cloud-float-2 {
          animation: cloudFloat2 15s ease-in-out infinite;
        }
        .animate-pod-pulse {
          animation: podPulse 4s ease-in-out infinite;
        }
        .animate-server-blink {
          animation: serverBlink 3s ease-in-out infinite;
        }
        .animate-data-flow {
          animation: dataFlow 2.5s linear infinite;
        }
        .animate-load-balancer-pulse {
          animation: loadBalancerPulse 5s ease-in-out infinite;
        }
        .animate-monitor-pulse {
          animation: monitorPulse 6s ease-in-out infinite;
        }
        .animate-particle-flow {
          animation: particleFlow 4s ease-in-out infinite;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-cloud-float-1,
          .animate-cloud-float-2,
          .animate-pod-pulse,
          .animate-server-blink,
          .animate-data-flow,
          .animate-load-balancer-pulse,
          .animate-monitor-pulse,
          .animate-particle-flow {
            animation: none !important;
          }
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .cloud-icon:nth-child(n + 2),
          .k8s-pod:nth-child(n + 3),
          .server-rack:nth-child(n + 2),
          .monitor-dashboard {
            display: none;
          }
          .network-connections {
            opacity: 0.1;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .cloud-icon:nth-child(n + 3),
          .k8s-pod:nth-child(n + 4) {
            display: none;
          }
          .network-connections {
            opacity: 0.15;
          }
        }
      `}</style>
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
        aria-hidden="true"
      >
        {/* Layer 1: Background network connections (lowest z-index) */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 1 }}
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Network connection lines with data flow */}
          <g className="network-connections" opacity="0.2">
            {/* Horizontal connections */}
            <path
              d="M 200 300 L 600 300"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="2"
              strokeDasharray="10,5"
              className="animate-data-flow"
            />
            <path
              d="M 800 500 L 1200 500"
              stroke="hsl(var(--brand-indigo-400))"
              strokeWidth="2"
              strokeDasharray="10,5"
              className="animate-data-flow"
              style={{ animationDelay: "0.5s" }}
            />
            <path
              d="M 1400 700 L 1700 700"
              stroke="hsl(var(--brand-blue-300))"
              strokeWidth="2"
              strokeDasharray="10,5"
              className="animate-data-flow"
              style={{ animationDelay: "1s" }}
            />

            {/* Diagonal connections */}
            <path
              d="M 400 400 L 700 600"
              stroke="hsl(var(--brand-indigo-300))"
              strokeWidth="1.5"
              strokeDasharray="8,4"
              className="animate-data-flow"
              style={{ animationDelay: "0.3s" }}
            />
            <path
              d="M 1000 350 L 1300 550"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="1.5"
              strokeDasharray="8,4"
              className="animate-data-flow"
              style={{ animationDelay: "0.8s" }}
            />

            {/* Connection nodes */}
            <circle cx="200" cy="300" r="4" fill="hsl(var(--brand-blue-500))" />
            <circle cx="600" cy="300" r="4" fill="hsl(var(--brand-blue-500))" />
            <circle
              cx="800"
              cy="500"
              r="4"
              fill="hsl(var(--brand-indigo-500))"
            />
            <circle
              cx="1200"
              cy="500"
              r="4"
              fill="hsl(var(--brand-indigo-500))"
            />
          </g>

          {/* Flowing particles along network lines */}
          <g opacity="0.4">
            <circle
              cx="200"
              cy="300"
              r="3"
              fill="hsl(var(--brand-blue-400))"
              className="animate-particle-flow"
            />
            <circle
              cx="800"
              cy="500"
              r="3"
              fill="hsl(var(--brand-indigo-400))"
              className="animate-particle-flow"
              style={{ animationDelay: "1s" }}
            />
            <circle
              cx="1400"
              cy="700"
              r="3"
              fill="hsl(var(--brand-blue-300))"
              className="animate-particle-flow"
              style={{ animationDelay: "2s" }}
            />
          </g>
        </svg>

        {/* Layer 2: Infrastructure elements (mid z-index) */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 2 }}
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cloud infrastructure icons (AWS/Azure/GCP style) */}
          <g
            className="cloud-icon"
            opacity="0.3"
            transform="translate(300, 200)"
          >
            <ellipse
              cx="0"
              cy="0"
              rx="50"
              ry="30"
              fill="hsl(var(--brand-blue-400))"
              className="animate-cloud-float-1"
            />
            <ellipse
              cx="-25"
              cy="-5"
              rx="35"
              ry="25"
              fill="hsl(var(--brand-blue-400))"
              className="animate-cloud-float-1"
            />
            <ellipse
              cx="25"
              cy="-5"
              rx="35"
              ry="25"
              fill="hsl(var(--brand-blue-400))"
              className="animate-cloud-float-1"
            />
          </g>

          <g
            className="cloud-icon"
            opacity="0.25"
            transform="translate(1200, 250)"
          >
            <ellipse
              cx="0"
              cy="0"
              rx="45"
              ry="28"
              fill="hsl(var(--brand-indigo-400))"
              className="animate-cloud-float-2"
            />
            <ellipse
              cx="-22"
              cy="-4"
              rx="32"
              ry="23"
              fill="hsl(var(--brand-indigo-400))"
              className="animate-cloud-float-2"
            />
            <ellipse
              cx="22"
              cy="-4"
              rx="32"
              ry="23"
              fill="hsl(var(--brand-indigo-400))"
              className="animate-cloud-float-2"
            />
          </g>

          <g
            className="cloud-icon"
            opacity="0.28"
            transform="translate(1600, 150)"
          >
            <ellipse
              cx="0"
              cy="0"
              rx="40"
              ry="25"
              fill="hsl(var(--brand-blue-300))"
              className="animate-cloud-float-1"
              style={{ animationDelay: "2s" }}
            />
            <ellipse
              cx="-20"
              cy="-3"
              rx="28"
              ry="20"
              fill="hsl(var(--brand-blue-300))"
              className="animate-cloud-float-1"
              style={{ animationDelay: "2s" }}
            />
            <ellipse
              cx="20"
              cy="-3"
              rx="28"
              ry="20"
              fill="hsl(var(--brand-blue-300))"
              className="animate-cloud-float-1"
              style={{ animationDelay: "2s" }}
            />
          </g>

          {/* Kubernetes pod representations */}
          <g className="k8s-pod" opacity="0.3" transform="translate(500, 450)">
            <rect
              x="-20"
              y="-20"
              width="40"
              height="40"
              rx="4"
              fill="none"
              stroke="hsl(var(--brand-indigo-400))"
              strokeWidth="2"
              className="animate-pod-pulse"
            />
            <circle cx="0" cy="0" r="8" fill="hsl(var(--brand-indigo-400))" />
            <circle cx="-8" cy="-8" r="3" fill="hsl(var(--brand-indigo-300))" />
            <circle cx="8" cy="-8" r="3" fill="hsl(var(--brand-indigo-300))" />
            <circle cx="-8" cy="8" r="3" fill="hsl(var(--brand-indigo-300))" />
            <circle cx="8" cy="8" r="3" fill="hsl(var(--brand-indigo-300))" />
          </g>

          <g className="k8s-pod" opacity="0.28" transform="translate(900, 600)">
            <rect
              x="-20"
              y="-20"
              width="40"
              height="40"
              rx="4"
              fill="none"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="2"
              className="animate-pod-pulse"
              style={{ animationDelay: "0.8s" }}
            />
            <circle cx="0" cy="0" r="8" fill="hsl(var(--brand-blue-400))" />
            <circle cx="-8" cy="-8" r="3" fill="hsl(var(--brand-blue-300))" />
            <circle cx="8" cy="-8" r="3" fill="hsl(var(--brand-blue-300))" />
            <circle cx="-8" cy="8" r="3" fill="hsl(var(--brand-blue-300))" />
            <circle cx="8" cy="8" r="3" fill="hsl(var(--brand-blue-300))" />
          </g>

          <g
            className="k8s-pod"
            opacity="0.26"
            transform="translate(1400, 500)"
          >
            <rect
              x="-20"
              y="-20"
              width="40"
              height="40"
              rx="4"
              fill="none"
              stroke="hsl(var(--brand-indigo-300))"
              strokeWidth="2"
              className="animate-pod-pulse"
              style={{ animationDelay: "1.5s" }}
            />
            <circle cx="0" cy="0" r="8" fill="hsl(var(--brand-indigo-300))" />
            <circle cx="-8" cy="-8" r="3" fill="hsl(var(--brand-indigo-400))" />
            <circle cx="8" cy="-8" r="3" fill="hsl(var(--brand-indigo-400))" />
            <circle cx="-8" cy="8" r="3" fill="hsl(var(--brand-indigo-400))" />
            <circle cx="8" cy="8" r="3" fill="hsl(var(--brand-indigo-400))" />
          </g>

          <g className="k8s-pod" opacity="0.24" transform="translate(700, 750)">
            <rect
              x="-20"
              y="-20"
              width="40"
              height="40"
              rx="4"
              fill="none"
              stroke="hsl(var(--brand-blue-300))"
              strokeWidth="2"
              className="animate-pod-pulse"
              style={{ animationDelay: "2.2s" }}
            />
            <circle cx="0" cy="0" r="8" fill="hsl(var(--brand-blue-300))" />
            <circle cx="-8" cy="-8" r="3" fill="hsl(var(--brand-blue-400))" />
            <circle cx="8" cy="-8" r="3" fill="hsl(var(--brand-blue-400))" />
            <circle cx="-8" cy="8" r="3" fill="hsl(var(--brand-blue-400))" />
            <circle cx="8" cy="8" r="3" fill="hsl(var(--brand-blue-400))" />
          </g>

          {/* Server rack visualizations */}
          <g
            className="server-rack"
            opacity="0.3"
            transform="translate(200, 700)"
          >
            <rect
              x="0"
              y="0"
              width="80"
              height="100"
              rx="4"
              fill="none"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="2"
            />
            {/* Server units */}
            <rect
              x="5"
              y="5"
              width="70"
              height="18"
              fill="hsl(var(--brand-blue-400))"
              opacity="0.3"
            />
            <circle
              cx="65"
              cy="14"
              r="3"
              fill="hsl(var(--brand-blue-300))"
              className="animate-server-blink"
            />
            <rect
              x="5"
              y="28"
              width="70"
              height="18"
              fill="hsl(var(--brand-blue-400))"
              opacity="0.3"
            />
            <circle
              cx="65"
              cy="37"
              r="3"
              fill="hsl(var(--brand-blue-300))"
              className="animate-server-blink"
              style={{ animationDelay: "0.5s" }}
            />
            <rect
              x="5"
              y="51"
              width="70"
              height="18"
              fill="hsl(var(--brand-blue-400))"
              opacity="0.3"
            />
            <circle
              cx="65"
              cy="60"
              r="3"
              fill="hsl(var(--brand-blue-300))"
              className="animate-server-blink"
              style={{ animationDelay: "1s" }}
            />
            <rect
              x="5"
              y="74"
              width="70"
              height="18"
              fill="hsl(var(--brand-blue-400))"
              opacity="0.3"
            />
            <circle
              cx="65"
              cy="83"
              r="3"
              fill="hsl(var(--brand-blue-300))"
              className="animate-server-blink"
              style={{ animationDelay: "1.5s" }}
            />
          </g>

          <g
            className="server-rack"
            opacity="0.28"
            transform="translate(1650, 800)"
          >
            <rect
              x="0"
              y="0"
              width="80"
              height="100"
              rx="4"
              fill="none"
              stroke="hsl(var(--brand-indigo-400))"
              strokeWidth="2"
            />
            {/* Server units */}
            <rect
              x="5"
              y="5"
              width="70"
              height="18"
              fill="hsl(var(--brand-indigo-400))"
              opacity="0.3"
            />
            <circle
              cx="65"
              cy="14"
              r="3"
              fill="hsl(var(--brand-indigo-300))"
              className="animate-server-blink"
              style={{ animationDelay: "0.3s" }}
            />
            <rect
              x="5"
              y="28"
              width="70"
              height="18"
              fill="hsl(var(--brand-indigo-400))"
              opacity="0.3"
            />
            <circle
              cx="65"
              cy="37"
              r="3"
              fill="hsl(var(--brand-indigo-300))"
              className="animate-server-blink"
              style={{ animationDelay: "0.8s" }}
            />
            <rect
              x="5"
              y="51"
              width="70"
              height="18"
              fill="hsl(var(--brand-indigo-400))"
              opacity="0.3"
            />
            <circle
              cx="65"
              cy="60"
              r="3"
              fill="hsl(var(--brand-indigo-300))"
              className="animate-server-blink"
              style={{ animationDelay: "1.3s" }}
            />
            <rect
              x="5"
              y="74"
              width="70"
              height="18"
              fill="hsl(var(--brand-indigo-400))"
              opacity="0.3"
            />
            <circle
              cx="65"
              cy="83"
              r="3"
              fill="hsl(var(--brand-indigo-300))"
              className="animate-server-blink"
              style={{ animationDelay: "1.8s" }}
            />
          </g>

          {/* Load balancer symbols */}
          <g
            className="load-balancer"
            opacity="0.3"
            transform="translate(960, 400)"
          >
            <circle
              cx="0"
              cy="0"
              r="30"
              fill="none"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="2"
              className="animate-load-balancer-pulse"
            />
            {/* Central node */}
            <circle cx="0" cy="0" r="8" fill="hsl(var(--brand-blue-400))" />
            {/* Connected nodes */}
            <line
              x1="0"
              y1="0"
              x2="-20"
              y2="-20"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="1.5"
            />
            <circle cx="-20" cy="-20" r="5" fill="hsl(var(--brand-blue-300))" />
            <line
              x1="0"
              y1="0"
              x2="20"
              y2="-20"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="1.5"
            />
            <circle cx="20" cy="-20" r="5" fill="hsl(var(--brand-blue-300))" />
            <line
              x1="0"
              y1="0"
              x2="-20"
              y2="20"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="1.5"
            />
            <circle cx="-20" cy="20" r="5" fill="hsl(var(--brand-blue-300))" />
            <line
              x1="0"
              y1="0"
              x2="20"
              y2="20"
              stroke="hsl(var(--brand-blue-400))"
              strokeWidth="1.5"
            />
            <circle cx="20" cy="20" r="5" fill="hsl(var(--brand-blue-300))" />
          </g>
        </svg>

        {/* Layer 3: Monitoring dashboard elements (highest z-index) */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 3 }}
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Monitoring dashboard elements */}
          <g
            className="monitor-dashboard"
            opacity="0.25"
            transform="translate(1300, 150)"
          >
            <rect
              x="0"
              y="0"
              width="150"
              height="100"
              rx="4"
              fill="hsl(var(--background))"
              stroke="hsl(var(--brand-indigo-400))"
              strokeWidth="2"
              opacity="0.3"
            />
            {/* Dashboard header */}
            <rect
              x="0"
              y="0"
              width="150"
              height="20"
              rx="4"
              fill="hsl(var(--brand-indigo-500))"
              opacity="0.2"
            />
            <text
              x="10"
              y="14"
              fontSize="10"
              fill="hsl(var(--brand-indigo-300))"
              fontFamily="var(--font-mono)"
            >
              Metrics
            </text>
            {/* Metric bars */}
            <rect
              x="10"
              y="30"
              width="80"
              height="8"
              fill="hsl(var(--brand-indigo-400))"
              opacity="0.4"
              className="animate-monitor-pulse"
            />
            <rect
              x="10"
              y="45"
              width="110"
              height="8"
              fill="hsl(var(--brand-blue-400))"
              opacity="0.4"
              className="animate-monitor-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <rect
              x="10"
              y="60"
              width="60"
              height="8"
              fill="hsl(var(--brand-indigo-300))"
              opacity="0.4"
              className="animate-monitor-pulse"
              style={{ animationDelay: "1s" }}
            />
            <rect
              x="10"
              y="75"
              width="95"
              height="8"
              fill="hsl(var(--brand-blue-300))"
              opacity="0.4"
              className="animate-monitor-pulse"
              style={{ animationDelay: "1.5s" }}
            />
          </g>
        </svg>
      </div>
    </>
  );
};
