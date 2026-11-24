import { Brain, MessageSquare, Target, Lightbulb } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

export const AboutSection = () => {
  const highlights = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Mathematician's Mind",
      description: "Applying mathematical precision to security analysis and threat modeling",
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Offensive Expert",
      description: "Red team operations, penetration testing, and vulnerability research",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Communication First",
      description: "Translating complex security findings into actionable business insights",
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Strategic Leader",
      description: "Building and mentoring high-performance security teams",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div>
            {/* Profile Photo */}
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={profilePhoto} 
                alt="Ulisses Alves" 
                className="w-20 h-20 rounded-full object-cover border-2 border-primary/30 shadow-lg"
              />
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  About Me
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              From <span className="text-gradient">Military Systems</span> to Tech Leadership
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                My journey began in the Brazilian Air Force, where I spent 11 years mastering systems administration and cybersecurity fundamentals. This experience forged my understanding that security isn't just about technology—it's about people, processes, and strategic thinking.
              </p>
              <p>
                With a <span className="text-foreground font-medium">Bachelor's degree in Mathematics</span> from Universidade Federal Fluminense, I bring a unique analytical perspective to offensive security. I see patterns where others see chaos, and I translate complex vulnerabilities into clear, actionable strategies.
              </p>
              <p>
                In my most recent experience at <span className="text-foreground font-medium">LWSA Group</span>, I led offensive security initiatives driving security maturity across 23+ companies while integrating cutting-edge technologies like LLMs into security workflows.
              </p>
            </div>

            {/* Quote */}
            <blockquote className="mt-8 pl-6 border-l-2 border-primary/50">
              <p className="text-lg italic text-foreground">
                "My most important skill is communication—finding vulnerabilities is only valuable when you can effectively convey their impact and remediation strategies."
              </p>
            </blockquote>
          </div>

          {/* Highlight Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
