
import { Separator } from "@/components/ui/separator";
import { Brain, Github, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSocialClick = (platform: string) => {
    const urls = {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      mail: 'mailto:hello@promptcraft.com'
    };
    
    if (platform === 'mail') {
      window.location.href = urls[platform as keyof typeof urls];
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Brain className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">PromptCraft</span>
            </div>
            <p className="text-slate-400 text-sm">
              Master the art of prompt engineering and unlock the full potential of AI systems.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => handleSocialClick('github')}
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors"
              >
                <Github className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('twitter')}
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('linkedin')}
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('mail')}
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => scrollToSection('techniques')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Techniques
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('examples')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Examples
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('best-practices')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Best Practices
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('resources')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Resources
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => scrollToSection('techniques')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Beginner Guides
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('techniques')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Advanced Techniques
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('examples')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Industry Applications
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('resources')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Tools & Platforms
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => scrollToSection('resources')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Documentation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSocialClick('github')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Community
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSocialClick('mail')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('best-practices')} 
                  className="hover:text-white transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-slate-700 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; 2024 PromptCraft. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button className="hover:text-white transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
