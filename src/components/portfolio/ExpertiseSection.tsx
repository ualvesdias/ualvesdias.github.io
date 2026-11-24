import { 
  Shield, 
  Target, 
  Code, 
  Brain, 
  Users, 
  FileSearch,
  Network,
  Lock,
  Workflow,
  GraduationCap
} from "lucide-react";

const skills = [
  { name: "Red Team Operations", icon: Target, category: "offensive" },
  { name: "Purple Team Exercises", icon: Shield, category: "offensive" },
  { name: "Penetration Testing", icon: FileSearch, category: "offensive" },
  { name: "Vulnerability Assessment", icon: Code, category: "offensive" },
  { name: "Threat Modeling", icon: Brain, category: "strategy" },
  { name: "Risk Assessment", icon: Lock, category: "strategy" },
  { name: "Cybersecurity Strategy", icon: Workflow, category: "strategy" },
  { name: "Technical Leadership", icon: Users, category: "leadership" },
  { name: "Team Mentoring", icon: GraduationCap, category: "leadership" },
  { name: "Network Security", icon: Network, category: "technical" },
];

const technologies = [
  "Python", "Burp Suite", "Metasploit", "Nmap", "Wireshark", 
  "OWASP ZAP", "Cobalt Strike", "LLM Integration", "Docker", 
  "Linux/Unix", "AWS Security", "Azure Security"
];

export const ExpertiseSection = () => {
  return (
    <section id="expertise" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Areas of Expertise
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & <span className="text-gradient">Capabilities</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive skill set built over 17 years of hands-on experience in offensive security and technical leadership.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="group p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-center"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="inline-flex p-3 rounded-lg bg-secondary/50 text-primary mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-foreground">{skill.name}</p>
              </div>
            );
          })}
        </div>

        {/* Technologies */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-6">Technologies & Tools</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm font-mono text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
