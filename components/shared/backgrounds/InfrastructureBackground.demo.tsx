/**
 * Demo file to showcase InfrastructureBackground component
 * This file demonstrates the component's usage and visual appearance
 */

import { InfrastructureBackground } from "./InfrastructureBackground";

export default function InfrastructureBackgroundDemo() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        {/* Background */}
        <InfrastructureBackground className="opacity-100" theme="mixed" />

        {/* Sample content to test readability */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Infrastructure Background Demo
          </h1>

          {/* Sample timeline-like content */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue-500 via-brand-indigo-500 to-brand-blue-500 opacity-30" />

              <div className="space-y-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="relative pl-20">
                    <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-gradient-to-br from-brand-blue-500 to-brand-indigo-500 ring-4 ring-background" />

                    <div className="bg-card border border-border rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-2">
                        Sample Experience {item}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        This is sample content to test readability against the
                        infrastructure background.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-blue-500 flex-shrink-0" />
                          <span>
                            Achievement with sufficient contrast for readability
                          </span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-blue-500 flex-shrink-0" />
                          <span>
                            Background elements should not interfere with text
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
