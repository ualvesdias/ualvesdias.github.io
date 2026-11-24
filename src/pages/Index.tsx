import { useEffect } from "react";
import { Navigation } from "@/components/portfolio/Navigation";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { MetricsSection } from "@/components/portfolio/MetricsSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ExpertiseSection } from "@/components/portfolio/ExpertiseSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { TrainingSection } from "@/components/portfolio/TrainingSection";
import { LevelUpSection } from "@/components/portfolio/LevelUpSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { Footer } from "@/components/portfolio/Footer";

const Index = () => {
  // Set dark mode by default
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <MetricsSection />
        <AboutSection />
        <ExpertiseSection />
        <ExperienceSection />
        <TrainingSection />
        <LevelUpSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
