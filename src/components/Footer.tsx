
import { Separator } from "@/components/ui/separator";
import { Brain, Github, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
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
              <div className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors">
                <Github className="w-5 h-5" />
              </div>
              <div className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors">
                <Mail className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#techniques" className="hover:text-white transition-colors">Techniques</a></li>
              <li><a href="#examples" className="hover:text-white transition-colors">Examples</a></li>
              <li><a href="#best-practices" className="hover:text-white transition-colors">Best Practices</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">Resources</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Beginner Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Advanced Techniques</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Industry Applications</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tools & Platforms</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <Separator className="bg-slate-700 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; 2024 PromptCraft. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
