"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface EnhancedSectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  decorative?: boolean;
  gradientText?: boolean;
  icon?: ReactNode;
  className?: string;
}

export function EnhancedSectionHeading({
  title,
  subtitle,
  align = "center",
  decorative = false,
  gradientText = false,
  icon,
  className,
}: EnhancedSectionHeadingProps) {
  // Remove numbered prefixes from title (e.g., "1. Title" -> "Title")
  const cleanTitle = title.replace(/^\d+\.\s*/, "");

  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const titleClasses = cn(
    "text-3xl md:text-4xl lg:text-5xl font-bold font-orbitron tracking-tight",
    gradientText
      ? "bg-gradient-to-r from-[hsl(var(--brand-blue-500))] to-[hsl(var(--brand-indigo-500))] bg-clip-text text-transparent"
      : "text-foreground"
  );

  // Animation variants with reduced motion support
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={cn(
        "flex flex-col space-y-4",
        alignmentClasses[align],
        className
      )}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {decorative && align === "center" && (
        <motion.div
          className="flex items-center justify-center gap-4 w-full"
          variants={itemVariants}
        >
          {/* Left decorative line */}
          <motion.svg
            width="80"
            height="2"
            viewBox="0 0 80 2"
            className="hidden md:block"
            aria-hidden="true"
            variants={lineVariants}
          >
            <motion.line
              x1="0"
              y1="1"
              x2="80"
              y2="1"
              stroke="url(#gradient-left)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="gradient-left"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="hsl(var(--brand-blue-500))"
                  stopOpacity="0"
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--brand-blue-500))"
                  stopOpacity="1"
                />
              </linearGradient>
            </defs>
          </motion.svg>

          <div className="flex items-center gap-3">
            {icon && (
              <motion.div className="flex-shrink-0" variants={itemVariants}>
                {icon}
              </motion.div>
            )}
            <motion.h2 className={titleClasses} variants={itemVariants}>
              {cleanTitle}
            </motion.h2>
          </div>

          {/* Right decorative line */}
          <motion.svg
            width="80"
            height="2"
            viewBox="0 0 80 2"
            className="hidden md:block"
            aria-hidden="true"
            variants={lineVariants}
          >
            <motion.line
              x1="0"
              y1="1"
              x2="80"
              y2="1"
              stroke="url(#gradient-right)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="gradient-right"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="hsl(var(--brand-indigo-500))"
                  stopOpacity="1"
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--brand-indigo-500))"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.div>
      )}

      {!decorative && (
        <motion.div className="flex items-center gap-3" variants={itemVariants}>
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <h2 className={titleClasses}>{cleanTitle}</h2>
        </motion.div>
      )}

      {subtitle && (
        <motion.p
          className="text-base md:text-lg text-muted-foreground max-w-2xl"
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
