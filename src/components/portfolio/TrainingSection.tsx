import { GraduationCap, Users, Award, ExternalLink } from "lucide-react";

const courses = [
  {
    title: "EHPY - Ethical Hacking Python",
    description: "Comprehensive course teaching Python for ethical hacking and penetration testing automation",
    students: "200+",
    type: "Online Course",
  },
  {
    title: "Introduction to Cryptography",
    description: "In-depth cryptography fundamentals course developed in partnership with DESEC",
    students: "800+",
    type: "Online Course",
    partner: "DESEC",
  },
  {
    title: "Cyber Operations: Insider Threat",
    description: "Interactive tabletop game designed to teach insider threat detection and response",
    students: "Military Personnel",
    type: "Training Game",
    special: true,
  },
];

const certifications = [
  { name: "CompTIA Pentest+", expiry: "Valid until 2027" },
  { name: "CompTIA CySA+", expiry: "Valid until 2026" },
  { name: "Cambridge CAE (C1)", expiry: "English Proficiency" },
  { name: "IELTS (C1)", expiry: "English Proficiency" },
];

export const TrainingSection = () => {
  return (
    <section id="training" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Education & Training
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Training <span className="text-gradient">Programs</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sharing knowledge and building the next generation of cybersecurity professionals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Courses */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Courses Created
            </h3>
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.title}
                  className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </h4>
                    <span className="px-2 py-1 rounded-full bg-secondary text-xs text-muted-foreground whitespace-nowrap">
                      {course.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-primary">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">{course.students}</span>
                      <span className="text-muted-foreground">students</span>
                    </div>
                    {course.partner && (
                      <span className="text-muted-foreground">
                        with <span className="text-foreground font-medium">{course.partner}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Education */}
          <div className="space-y-8">
            {/* Education */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Education
              </h3>
              <div className="p-5 rounded-xl bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-1">Bachelor of Mathematics</h4>
                <p className="text-muted-foreground text-sm">Universidade Federal Fluminense</p>
                <p className="text-muted-foreground text-sm">Rio de Janeiro, Brazil</p>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Certifications
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                  >
                    <h4 className="font-medium text-foreground text-sm mb-1">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground">{cert.expiry}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
