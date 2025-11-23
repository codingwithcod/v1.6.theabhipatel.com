"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { DevOpsAnimatedBackground } from "@/components/shared/backgrounds/DevOpsAnimatedBackground";

interface HeroSectionProps {
  name: string;
  title: string;
  tagline: string;
  ctaText: string;
  ctaLink: string;
}

// Floating code snippets data
const codeSnippets = [
  { text: "const", x: "10%", y: "20%", delay: 0 },
  { text: "function", x: "85%", y: "15%", delay: 0.2 },
  { text: "=>", x: "15%", y: "70%", delay: 0.4 },
  { text: "async", x: "80%", y: "75%", delay: 0.6 },
  { text: "await", x: "5%", y: "45%", delay: 0.8 },
  { text: "{...}", x: "90%", y: "45%", delay: 1.0 },
];

export default function HeroSection({
  name,
  title,
  tagline,
  ctaText,
  ctaLink,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect for floating elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* DevOps Animated Background */}
      <DevOpsAnimatedBackground
        className="absolute inset-0 z-0"
        intensity="medium"
      />

      {/* Floating Code Elements */}
      {codeSnippets.map((snippet, index) => (
        <motion.div
          key={snippet.text}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{
            duration: 1,
            delay: snippet.delay,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            left: snippet.x,
            top: snippet.y,
            y: index % 2 === 0 ? y1 : y2,
            color: `hsl(var(--brand-${index % 2 === 0 ? "blue" : "indigo"}-400))`,
            fontSize: "clamp(1.5rem, 3vw, 3rem)",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 1,
          }}
          className="motion-reduce:opacity-0"
        >
          {snippet.text}
        </motion.div>
      ))}

      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Name with enhanced multi-line gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight"
            style={{
              background: `linear-gradient(135deg, 
                hsl(var(--brand-blue-400)), 
                hsl(var(--brand-indigo-500)), 
                hsl(var(--brand-blue-600)))`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {name}
          </motion.h1>

          {/* Job Title with improved typography */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-8 text-foreground/90"
          >
            {title}
          </motion.h2>

          {/* Tagline with improved spacing */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {tagline}
          </motion.p>

          {/* CTA Button with glow effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          >
            <Link
              href={ctaLink}
              className="inline-block px-10 py-5 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 ease-out hover:scale-105"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(var(--brand-blue-500)), 
                  hsl(var(--brand-indigo-600)))`,
                color: "hsl(var(--foreground))",
                boxShadow: "0 10px 40px -10px hsl(var(--brand-blue-500) / 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 20px 60px -10px hsl(var(--brand-blue-500) / 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 10px 40px -10px hsl(var(--brand-blue-500) / 0.3)";
              }}
            >
              {ctaText}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
