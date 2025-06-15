
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Brain, Zap } from "lucide-react";

export const Hero = () => {
  const scrollToTechniques = () => {
    document.getElementById('techniques')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToExamples = () => {
    document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Header with animated icons */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
            <Brain className="w-8 h-8 text-indigo-600 animate-pulse" />
          </div>
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
            <Sparkles className="w-8 h-8 text-purple-600 animate-bounce" />
          </div>
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
            <Zap className="w-8 h-8 text-yellow-600 animate-pulse" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-fade-in">
          Prompt Engineering
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-4xl mx-auto leading-relaxed">
          Master the art and science of communicating with AI systems. Learn proven techniques, 
          best practices, and advanced strategies to get the most out of your AI interactions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            onClick={scrollToTechniques}
            size="lg" 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Learning
            <ArrowDown className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            onClick={scrollToExamples}
            variant="outline" 
            size="lg"
            className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300"
          >
            View Examples
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">50+</div>
            <div className="text-slate-600">Techniques</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">100+</div>
            <div className="text-slate-600">Examples</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">25+</div>
            <div className="text-slate-600">Use Cases</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">10+</div>
            <div className="text-slate-600">Tools</div>
          </div>
        </div>
      </div>
    </section>
  );
};
