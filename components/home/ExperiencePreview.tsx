"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Experience } from "@/constants/experience";
import { InfrastructureBackground } from "@/components/shared/backgrounds/InfrastructureBackground";
import { EnhancedSectionHeading } from "@/components/shared/EnhancedSectionHeading";

interface ExperiencePreviewProps {
  experiences: Experience[];
  maxDisplay?: number;
}

export default function ExperiencePreview({
  experiences,
  maxDisplay = 3,
}: ExperiencePreviewProps) {
  const displayedExperiences = experiences.slice(0, maxDisplay);

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Infrastructure Background */}
      <InfrastructureBackground className="opacity-40" theme="mixed" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12">
          <EnhancedSectionHeading
            title="Work Experience"
            subtitle="My professional journey and achievements"
            align="center"
            gradientText={true}
          />
        </div>

        {/* Mini Timeline */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

            {displayedExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-20 pb-8 last:pb-0"
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-6 w-5 h-5 rounded-full border-4 ${
                    experience.current
                      ? "bg-primary border-primary"
                      : "bg-card border-border"
                  }`}
                />

                {/* Content Card */}
                <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{experience.role}</h3>
                      <p className="text-primary font-semibold">
                        {experience.company}
                      </p>
                    </div>
                    {experience.current && (
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {experience.duration}
                  </p>

                  {/* Show first 2 achievements */}
                  <ul className="space-y-1">
                    {experience.achievements
                      .slice(0, 2)
                      .map((achievement, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start"
                        >
                          <span className="text-primary mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                  </ul>

                  {experience.achievements.length > 2 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      +{experience.achievements.length - 2} more achievements
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/experience"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
          >
            View Full Experience
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
