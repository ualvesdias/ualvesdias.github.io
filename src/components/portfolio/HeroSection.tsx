import { ArrowDown, Mail, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float animation-delay-300" />
      </div>

      {/* Geometric Decorations */}
      <div className="absolute top-20 right-10 md:right-20 w-20 h-20 border border-primary/20 rotate-45 animate-pulse-glow" />
      <div className="absolute bottom-32 left-10 md:left-20 w-16 h-16 border border-accent/20 rotate-12 animate-pulse-glow animation-delay-200" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Terminal-style greeting */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <code className="text-sm font-mono text-muted-foreground">
              <span className="text-primary">$</span> whoami
            </code>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up animation-delay-100">
            <span className="text-foreground">Ulisses </span>
            <span className="text-gradient">Alves</span>
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground mb-6 animate-fade-in-up animation-delay-200">
            Offensive Security Tech Leader
          </p>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-300">
            17 years transforming complex security challenges into strategic victories.
            <span className="block mt-2 text-primary font-medium">
              Observe, Question, Experiment, Fail, Learn, Hack, Communicate, Repeat
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up animation-delay-400">
            <Button size="lg" className="glow group" asChild>
              <a href="#contact">
                <Mail className="w-4 h-4 mr-2" />
                Get in Touch
              </a>
            </Button>
            <Button variant="outline" size="lg" className="cyber-border group" asChild>
              <a href="https://www.linkedin.com/in/ulissesalvesdias/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </Button>
            <Button variant="ghost" size="lg" className="group" asChild>
              <a href="https://www.leveluptech.com.br/main" target="_blank" rel="noopener noreferrer">
                LevelUp Tech
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <a
              href="#metrics"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="text-sm font-medium">Explore my work</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
