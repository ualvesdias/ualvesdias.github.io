import { Rocket, ArrowRight, Sparkles, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LevelUpSection = () => {
  return (
    <section id="levelup" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-32 h-32 border border-primary/10 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-10 w-24 h-24 border border-accent/10 rotate-45 animate-pulse-glow animation-delay-200" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Rocket className="w-4 h-4" />
              My Company
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">LevelUp</span> Tech
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Helping tech and cyber professionals become irreplaceable through specialized training and career development.
            </p>
          </div>

          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-card/50 border border-border text-center group hover:border-primary/30 transition-all">
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Specialized Training</h3>
              <p className="text-sm text-muted-foreground">
                Expert-led courses in offensive security and career development
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card/50 border border-border text-center group hover:border-primary/30 transition-all">
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Career Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Strategic advice to accelerate your tech career growth
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card/50 border border-border text-center group hover:border-primary/30 transition-all">
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Become Irreplaceable</h3>
              <p className="text-sm text-muted-foreground">
                Build skills that make you stand out in the competitive tech market
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button size="lg" className="glow group" asChild>
              <a 
                href="https://www.leveluptech.com.br/main" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Visit LevelUp Tech
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
