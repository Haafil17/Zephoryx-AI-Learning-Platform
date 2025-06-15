
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-2xl font-normal bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent">
              Clavis AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => scrollToSection('techniques')}
              className="text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-300 font-normal"
            >
              Techniques
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('examples')}
              className="text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-300 font-normal"
            >
              Examples
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('resources')}
              className="text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-300 font-normal"
            >
              Resources
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-800 text-indigo-900 dark:text-indigo-100 rounded-full text-sm font-normal mb-6 border dark:border-indigo-500">
              Master the Art of AI Communication
            </span>
            <h1 className="text-5xl md:text-7xl font-normal mb-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-slate-100 dark:via-indigo-100 dark:to-slate-100 bg-clip-text text-transparent leading-tight">
              Prompt Engineering
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 max-w-4xl mx-auto leading-relaxed font-normal">
              Learn the essential techniques to communicate effectively with AI systems. 
              Transform your ideas into powerful prompts that deliver exceptional results.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={() => scrollToSection('techniques')}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 text-white px-8 py-4 text-lg font-normal shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Start Learning
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => scrollToSection('examples')}
              size="lg"
              variant="outline"
              className="border-2 border-indigo-600 dark:border-indigo-400 text-indigo-800 dark:text-indigo-100 hover:bg-indigo-50 dark:hover:bg-indigo-900/60 px-8 py-4 text-lg font-normal bg-white dark:bg-slate-800 backdrop-blur-sm hover:border-indigo-700 dark:hover:border-indigo-300"
            >
              View Examples
            </Button>
          </div>

          {/* Floating Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Zero-Shot", desc: "Direct instructions", icon: "🎯" },
              { title: "Few-Shot", desc: "Learn from examples", icon: "📚" },
              { title: "Chain-of-Thought", desc: "Step-by-step reasoning", icon: "🧠" }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-slate-300 dark:border-slate-600"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-normal text-slate-900 dark:text-slate-100 mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-purple-300 dark:bg-purple-900/40 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-8 -left-32 w-96 h-96 bg-yellow-300 dark:bg-yellow-900/40 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 dark:bg-indigo-900/40 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};
