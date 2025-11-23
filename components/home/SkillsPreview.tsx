"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Skill } from "@/constants/skills";
import { CodePatternBackground } from "@/components/shared/backgrounds/CodePatternBackground";
import { EnhancedSectionHeading } from "@/components/shared/EnhancedSectionHeading";

interface SkillsPreviewProps {
  skills: Skill[];
  maxDisplay?: number;
}

export default function SkillsPreview({
  skills,
  maxDisplay = 12,
}: SkillsPreviewProps) {
  const displayedSkills = skills.slice(0, maxDisplay);

  return (
    <section className="relative py-16">
      {/* CodePatternBackground positioned absolutely behind content */}
      <CodePatternBackground className="opacity-40" pattern="matrix" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Replace old heading with EnhancedSectionHeading */}
        <div className="mb-12">
          <EnhancedSectionHeading
            title="Skills & Technologies"
            subtitle="Technologies I work with to build amazing applications"
            align="center"
            gradientText={true}
            decorative={true}
          />
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
          {displayedSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              <span className="text-4xl mb-2">{skill.icon}</span>
              <span className="text-sm font-medium text-center">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/skills"
            className="inline-block text-primary hover:text-primary/80 font-semibold transition-colors duration-300 hover:underline"
          >
            View All Skills →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
