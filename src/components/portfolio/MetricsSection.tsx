import { useEffect, useState, useRef } from "react";
import { DollarSign, Bug, Users, Clock, Building2 } from "lucide-react";

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}

const MetricCard = ({ icon, value, label, delay = 0 }: MetricCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`relative group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
          {icon}
        </div>
        <div className="font-mono text-3xl md:text-4xl font-bold text-foreground mb-2">
          {value}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
};

export const MetricsSection = () => {
  const metrics = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      value: "R$35M+",
      label: "Saved in vulnerability remediation",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      value: "$119M",
      label: "Client savings through proactive security",
    },
    {
      icon: <Bug className="w-6 h-6" />,
      value: "1,300+",
      label: "Vulnerabilities identified",
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "1,000+",
      label: "Students trained in cybersecurity",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: "11+",
      label: "Years leading offensive security",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      value: "100+",
      label: "Security assessments delivered",
    },
  ];

  return (
    <section id="metrics" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Impact by the <span className="text-gradient">Numbers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Measurable results from 17 years of protecting organizations and training the next generation of security professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              icon={metric.icon}
              value={metric.value}
              label={metric.label}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
