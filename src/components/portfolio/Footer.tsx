import { Shield } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <span className="font-medium text-sm text-foreground">
              Ulisses Alves - Offensive Security Tech Leader
            </span>
          </a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Ulisses Alves. All rights reserved.
          </p>

          {/* Quick Links */}
          <div className="flex items-center gap-4 text-sm">
            <a
              href="https://www.linkedin.com/in/ulissesalvesdias/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.leveluptech.com.br/main"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              LevelUp Tech
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
