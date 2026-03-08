import { Separator } from "@/components/ui/separator";
import { Brain, Github, Twitter, Linkedin, Mail, Heart, Award } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import zephoryxLogo from "@/assets/zephoryx-logo.png";
import zephoryxLogo from "@/assets/zephoryx-logo.png";

export const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.dispatchEvent(new CustomEvent('changeTab', { detail: sectionId }));
      setTimeout(() => {
        const tabsSection = document.querySelector('[role="tablist"]');
        if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleSocialClick = (platform: string) => {
    const urls: Record<string, string> = {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      mail: 'mailto:hello@zephoryxailab.com'
    };
    if (platform === 'mail') {
      window.location.href = urls[platform];
      toast.success("Opening email client...");
    } else {
      window.open(urls[platform], '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="bg-foreground text-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src={zephoryxLogo} alt="ZEPHORYX" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold font-display">ZEPHORYX AI LAB</span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed max-w-sm">
              The most comprehensive AI learning platform. Master prompt engineering, explore generative AI, and build the future with cutting-edge tools and techniques.
            </p>
            <div className="flex space-x-3">
              {['github', 'twitter', 'linkedin', 'mail'].map(p => (
                <button
                  key={p}
                  onClick={() => handleSocialClick(p)}
                  className="p-2.5 bg-background/10 rounded-lg hover:bg-background/20 transition-colors"
                  aria-label={p}
                >
                  {p === 'github' && <Github className="w-4 h-4" />}
                  {p === 'twitter' && <Twitter className="w-4 h-4" />}
                  {p === 'linkedin' && <Linkedin className="w-4 h-4" />}
                  {p === 'mail' && <Mail className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/40">Learn</h3>
            <ul className="space-y-2.5 text-sm text-background/60">
              {[
                { label: 'Techniques', id: 'techniques' },
                { label: 'Examples', id: 'examples' },
                { label: 'Best Practices', id: 'bestpractices' },
                { label: 'AI Tools', id: 'aitools' },
                { label: 'Videos', id: 'videos' },
              ].map(link => (
                <li key={link.id}>
                  <button onClick={() => scrollToSection(link.id)} className="hover:text-background transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/40">Explore</h3>
            <ul className="space-y-2.5 text-sm text-background/60">
              {[
                { label: 'AI Topics', id: 'ai' },
                { label: 'Generative AI', id: 'genai' },
                { label: 'Quantum Computing', id: 'quantum' },
                { label: 'Coding & Dev', id: 'coding' },
                { label: 'Resources', id: 'resources' },
              ].map(link => (
                <li key={link.id}>
                  <button onClick={() => scrollToSection(link.id)} className="hover:text-background transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/40">Company</h3>
            <ul className="space-y-2.5 text-sm text-background/60">
              <li><button onClick={() => handleSocialClick('mail')} className="hover:text-background transition-colors">Contact Us</button></li>
              <li><button onClick={() => handleSocialClick('github')} className="hover:text-background transition-colors">Community</button></li>
              <li><button onClick={() => toast.info('Privacy Policy page coming soon')} className="hover:text-background transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => toast.info('Terms of Service page coming soon')} className="hover:text-background transition-colors">Terms of Service</button></li>
              <li><button onClick={() => toast.info('Cookie Policy page coming soon')} className="hover:text-background transition-colors">Cookie Policy</button></li>
            </ul>
          </div>
        </div>

        <Separator className="bg-background/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-background/40">
          <p className="flex items-center gap-1">
            &copy; {new Date().getFullYear()} ZEPHORYX AI LAB. Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for the AI community.
          </p>
          <p className="mt-2 md:mt-0">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
