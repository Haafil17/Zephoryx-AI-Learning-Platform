import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Zap, Brain, Target, ChevronRight, Star, Video, Play, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const CodingTopics = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const codingConcepts = [
    {
      title: "AI-Powered Code Generation",
      description: "Using AI tools like GitHub Copilot and ChatGPT to write code faster and more efficiently",
      category: "ai-tools",
      level: "Beginner",
      languages: ["Python", "JavaScript", "Java", "C++"],
      learnMoreUrl: "https://github.com/features/copilot"
    },
    {
      title: "Prompt Engineering for Code",
      description: "Crafting effective prompts to generate high-quality, maintainable code",
      category: "prompting",
      level: "Intermediate",
      languages: ["Any Language", "Pseudocode", "Documentation"],
      learnMoreUrl: "https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot"
    },
    {
      title: "Code Review with AI",
      description: "Leveraging AI for automated code review, bug detection, and optimization suggestions",
      category: "quality",
      level: "Intermediate",
      languages: ["Multi-language", "Static Analysis", "Best Practices"],
      learnMoreUrl: "https://www.deepcode.ai/"
    },
    {
      title: "Algorithm Design & Optimization",
      description: "Using AI to design efficient algorithms and optimize existing code performance",
      category: "algorithms",
      level: "Advanced",
      languages: ["Python", "C++", "Rust", "Go"],
      learnMoreUrl: "https://leetcode.com/explore/learn/"
    },
    {
      title: "Documentation Generation",
      description: "Automatically generating comprehensive documentation from code and comments",
      category: "documentation",
      level: "Beginner",
      languages: ["Markdown", "API Docs", "README", "Comments"],
      learnMoreUrl: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes"
    },
    {
      title: "Testing & Debugging",
      description: "AI-assisted test case generation, debugging strategies, and error resolution",
      category: "testing",
      level: "Intermediate",
      languages: ["Unit Tests", "Integration", "E2E Testing"],
      learnMoreUrl: "https://jestjs.io/docs/getting-started"
    }
  ];

  const codingVideos = [
    {
      id: "ai-coding-basics",
      title: "AI-Powered Coding Fundamentals",
      description: "Getting started with GitHub Copilot and AI coding tools",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
      duration: "20:30",
      category: "ai-tools",
      videoUrl: "https://www.youtube.com/embed/Fi3AJZZregI"
    },
    {
      id: "prompt-engineering-code",
      title: "Code Prompt Engineering",
      description: "Writing effective prompts for code generation",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=225&fit=crop",
      duration: "15:45",
      category: "prompting",
      videoUrl: "https://www.youtube.com/embed/GPqSoiOP3w8"
    },
    {
      id: "ai-code-review",
      title: "AI-Assisted Code Review",
      description: "Using AI for code quality and bug detection",
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=225&fit=crop",
      duration: "18:20",
      category: "quality",
      videoUrl: "https://www.youtube.com/embed/1T6hAznFtP4"
    },
    {
      id: "algorithm-optimization",
      title: "AI Algorithm Optimization",
      description: "Leveraging AI for performance improvements",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
      duration: "25:15",
      category: "algorithms",
      videoUrl: "https://www.youtube.com/embed/Ven2P4IxJ_0"
    }
  ];

  const categories = [
    { id: "all", name: "All Topics", count: codingConcepts.length },
    { id: "ai-tools", name: "AI Tools", count: codingConcepts.filter(c => c.category === "ai-tools").length },
    { id: "prompting", name: "Prompting", count: codingConcepts.filter(c => c.category === "prompting").length },
    { id: "quality", name: "Code Quality", count: codingConcepts.filter(c => c.category === "quality").length },
    { id: "algorithms", name: "Algorithms", count: codingConcepts.filter(c => c.category === "algorithms").length },
    { id: "testing", name: "Testing", count: codingConcepts.filter(c => c.category === "testing").length }
  ];

  const filteredConcepts = selectedCategory === "all" 
    ? codingConcepts 
    : codingConcepts.filter(concept => concept.category === selectedCategory);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const codingTools = [
    { name: "GitHub Copilot", type: "IDE Extension", description: "AI pair programmer for real-time code suggestions" },
    { name: "ChatGPT", type: "Conversational AI", description: "Code generation, debugging, and explanation" },
    { name: "Claude", type: "Code Assistant", description: "Advanced reasoning for complex coding problems" },
    { name: "Replit Ghostwriter", type: "Cloud IDE", description: "AI coding assistant in the browser" },
    { name: "Tabnine", type: "Autocomplete", description: "AI-powered code completion for multiple languages" },
    { name: "Amazon CodeWhisperer", type: "AWS Tool", description: "ML-powered coding companion for AWS" }
  ];

  const bestPractices = [
    "Start with clear, specific prompts describing the desired functionality",
    "Include context about the programming language, framework, and constraints",
    "Ask for code comments and documentation alongside the implementation",
    "Request multiple approaches and compare their trade-offs",
    "Always review and test AI-generated code before production use",
    "Use AI for learning by asking for explanations of complex concepts"
  ];

  const handleLearnMore = (concept: typeof codingConcepts[0]) => {
    window.open(concept.learnMoreUrl, '_blank', 'noopener,noreferrer');
    toast.success(`Opening ${concept.title} resources...`);
  };

  const handleVideoPlay = (videoId: string) => {
    setPlayingVideoId(videoId);
    toast.success("Playing coding tutorial...", {
      description: "Loading development content"
    });
  };

  const closeVideo = () => {
    setPlayingVideoId(null);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto">
        {/* Video Modal */}
        {playingVideoId && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">
                  {codingVideos.find(v => v.id === playingVideoId)?.title}
                </h3>
                <Button variant="ghost" size="sm" onClick={closeVideo}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={codingVideos.find(v => v.id === playingVideoId)?.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title={codingVideos.find(v => v.id === playingVideoId)?.title}
                />
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            AI-Powered Coding
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Revolutionize your development workflow with AI tools and techniques for faster, smarter coding
          </p>
        </div>

        {/* Coding Video Tutorials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-100">
            AI Coding Video Tutorials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {codingVideos.map((video) => (
              <Card key={video.id} className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      onClick={() => handleVideoPlay(video.id)}
                      className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3"
                    >
                      <Play className="w-5 h-5" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white text-xs">
                    {video.duration}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2">{video.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{video.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-slate-700 hover:bg-green-50"
              } px-4 py-2 rounded-full border transition-all duration-200`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Coding Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredConcepts.map((concept, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-800/70 transition-colors">
                    <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <Badge className={getLevelColor(concept.level)}>
                    {concept.level}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {concept.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {concept.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {concept.languages.map((lang, langIndex) => (
                      <Badge key={langIndex} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    className="flex-1 justify-between text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/30"
                    onClick={() => handleLearnMore(concept)}
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVideoPlay(`${concept.title.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Coding Tools */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-100">Popular AI Coding Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {codingTools.map((tool, index) => (
              <div key={index} className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100">{tool.name}</h4>
                  <Badge variant="outline" className="text-xs">{tool.type}</Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-100">AI Coding Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bestPractices.map((practice, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-slate-700 dark:text-slate-300">{practice}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coding Impact Stats */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">AI Coding Impact</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              AI is transforming software development, making coding more accessible and productive for developers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">55%</div>
              <div className="text-sm opacity-90">Faster Development</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">73%</div>
              <div className="text-sm opacity-90">Developers Using AI</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">46%</div>
              <div className="text-sm opacity-90">Code Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">88%</div>
              <div className="text-sm opacity-90">Developer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
