import { Building2, Calendar, ChevronRight } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  current?: boolean;
}

const experiences: Experience[] = [
  {
    title: "Offensive Security Tech Leader",
    company: "LWSA Group",
    period: "Mar 2023 - Dec 2025",
    location: "Remote",
    highlights: [
      "Led offensive security initiatives across 23 companies in the group",
      "Developed LLM-integrated pentesting methodologies for enhanced efficiency",
      "Drove security maturity and best practices across the organization",
      "Mentored and developed offensive security talent",
    ],
  },
  {
    title: "Offensive Security Tech Leader & Advisor",
    company: "Elytron Security",
    period: "Feb 2021 - Feb 2023",
    location: "Brasília, Brazil (Remote)",
    highlights: [
      "Led 100+ penetration testing engagements for diverse clients",
      "Identified $119M in potential savings through proactive vulnerability discovery",
      "Built and managed high-performance offensive security team",
      "Established standardized methodologies and quality frameworks",
    ],
  },
  {
    title: "Offensive Security Tech Leader",
    company: "LWSA Group",
    period: "Jul 2020 - Jan 2021",
    location: "Remote",
    highlights: [
      "Built offensive security team and processes from scratch",
      "Saved R$35M+ in potential breach costs through vulnerability remediation",
      "Established red team program and security assessment cadence",
      "Integrated security into software development lifecycle",
    ],
  },
  {
    title: "Systems Administrator & Cybersecurity Instructor",
    company: "Brazilian Air Force",
    period: "Mar 2009 - Jun 2020",
    location: "Brasília, Brazil",
    highlights: [
      "11 years of military cybersecurity experience",
      "Trained 1,000+ personnel in cybersecurity fundamentals",
      "Managed critical military IT infrastructure",
      "Developed and delivered Cyber Operations training programs",
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Career Journey
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of growth from military systems administration to leading offensive security at scale.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <div
                key={`${exp.company}-${exp.period}`}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 mt-6 md:mt-8 z-10" />

                {/* Content */}
                <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                          <Building2 className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
