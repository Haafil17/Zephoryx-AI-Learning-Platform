
import { Separator } from "@/components/ui/separator";
import { Brain, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";

export const Footer = () => {
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If element doesn't exist, try to trigger the tab instead
      const tabTrigger = document.querySelector(`[value="${sectionId}"]`) as HTMLElement;
      if (tabTrigger) {
        tabTrigger.click();
      }
    }
  };

  const handleSocialClick = (platform: string) => {
    const urls = {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      mail: 'mailto:hello@aionyx.com'
    };
    
    if (platform === 'mail') {
      window.location.href = urls[platform as keyof typeof urls];
      toast.success("Opening email client...");
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank', 'noopener,noreferrer');
      toast.success(`Opening ${platform}...`);
    }
  };

  const handlePolicyClick = (policy: string) => {
    toast.info(`${policy} page would open here in a real application.`);
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
              <span className="text-xl font-bold">AIONYX</span>
            </div>
            <p className="text-slate-400 text-sm">
              Master the art of prompt engineering and unlock the full potential of AI systems.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => handleSocialClick('github')}
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors"
                aria-label="Visit our GitHub"
              >
                <Github className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('twitter')}
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors"
                aria-label="Visit our Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('linkedin')}
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors"
                aria-label="Visit our LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('mail')}
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors"
                aria-label="Send us an email"
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
                  className="hover:text-white transition-colors text-left w-full"
                >
                  Techniques
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('examples')} 
                  className="hover:text-white transition-colors text-left w-full"
                >
                  Examples
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('bestpractices')} 
                  className="hover:text-white transition-colors text-left w-full"
                >
                  Best Practices
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('resources')} 
                  className="hover:text-white transition-colors text-left w-full"
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
                  onClick={() => scrollToSection('ai')} 
                  className="hover:text-white transition-colors text-left w-full"
                >
                  AI Topics
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('genai')} 
                  className="hover:text-white transition-colors text-left w-full"
                >
                  Generative AI
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('quantum')} 
                  className="hover:text-white transition-colors text-left w-full"
                >
                  Quantum Computing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('coding')} 
                  className="hover:text-white transition-colors text-left w-full"
                >
                  Coding & Development
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
                  className="hover:text-white transition-colors text-left w-full"
                >
                  Documentation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSocialClick('github')} 
                  className="hover:text-white transition-colors text-left w-full"
                >
                  Community
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSocialClick('mail')} 
                  className="hover:text-white transition-colors text-left w-full"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('bestpractices')} 
                  className="hover:text-white transition-colors text-left w-full"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-slate-700 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; 2024 AIONYX. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button 
              className="hover:text-white transition-colors"
              onClick={() => handlePolicyClick('Privacy Policy')}
            >
              Privacy Policy
            </button>
            <button 
              className="hover:text-white transition-colors"
              onClick={() => handlePolicyClick('Terms of Service')}
            >
              Terms of Service
            </button>
            <button 
              className="hover:text-white transition-colors"
              onClick={() => handlePolicyClick('Cookie Policy')}
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
