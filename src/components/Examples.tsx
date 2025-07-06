import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Code, PenTool, BarChart, BookOpen, Microscope, Check, ExternalLink, Video, Play, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Examples = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const examples = [
    {
      icon: Code,
      title: "Advanced Code Generation",
      category: "Software Development", 
      prompt: `As an expert Python developer, create a robust function that:

• Processes a list of numbers and returns the sum of even numbers only
• Includes comprehensive error handling for invalid inputs
• Features detailed docstring with examples and type hints
• Follows PEP 8 style guidelines
• Includes unit tests to verify functionality

Please provide the complete implementation with clear explanations.`,
      color: "bg-blue-500",
      tags: ["Python", "Error Handling", "Testing", "Best Practices"]
    },
    {
      icon: PenTool,
      title: "Persuasive Product Copy",
      category: "Marketing Content",
      prompt: `Create compelling product copy for an eco-friendly water bottle that:

• Emphasizes sustainability and environmental impact
• Appeals to health-conscious millennials and Gen-Z
• Uses persuasive yet authentic language
• Highlights unique features and benefits
• Includes a strong call-to-action
• Maintains a friendly, trustworthy tone

Target audience: Active lifestyle enthusiasts aged 25-40.`,
      color: "bg-green-500",
      tags: ["Copywriting", "Sustainability", "Target Audience", "CTA"]
    },
    {
      icon: BarChart,
      title: "Data Analysis & Insights",
      category: "Business Analytics",
      prompt: `As a senior data analyst, examine the provided sales data and deliver:

1. Key performance trends and seasonal patterns
2. Root cause analysis for any anomalies or outliers
3. Actionable recommendations for improvement
4. Risk assessment and mitigation strategies
5. Strategic next steps for data-driven decisions

Format: Executive summary with supporting visualizations and detailed appendix.`,
      color: "bg-purple-500",
      tags: ["Data Science", "Analytics", "Business Intelligence", "Reporting"]
    },
    {
      icon: BookOpen,
      title: "Educational Content Creation",
      category: "Learning & Development",
      prompt: `Develop a comprehensive beginner's guide to machine learning that:

• Uses clear analogies and real-world examples
• Avoids technical jargon while maintaining accuracy
• Includes practical applications and use cases
• Addresses common misconceptions and myths
• Provides structured learning path with resources
• Engages complete beginners with interactive elements

Target: Non-technical professionals interested in AI.`,
      color: "bg-yellow-500",
      tags: ["Education", "Machine Learning", "Beginner Guide", "Accessibility"]
    },
    {
      icon: Microscope,
      title: "Research Paper Analysis",
      category: "Academic Research",
      prompt: `Conduct a thorough analysis of the research paper abstract and provide:

1. Primary research question and underlying hypothesis
2. Methodology assessment including strengths and limitations
3. Statistical significance and practical implications
4. Potential real-world applications and impact
5. Recommendations for future research directions
6. Critical evaluation of claims and evidence

Apply rigorous academic standards and critical thinking throughout.`,
      color: "bg-red-500",
      tags: ["Research", "Academic Analysis", "Critical Thinking", "Peer Review"]
    }
  ];

  const exampleVideos = [
    {
      id: "advanced-prompting",
      title: "Advanced Prompting Techniques",
      description: "Master professional prompt engineering with real examples",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop&crop=center",
      duration: "8:42",
      category: "techniques",
      embedId: "F_hJ2Ey4BNc"
    },
    {
      id: "business-prompts", 
      title: "Business Prompt Templates",
      description: "Professional prompts for business applications and workflows",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop&crop=center",
      duration: "12:15",
      category: "business",
      embedId: "yR4hNBNS6yc"
    },
    {
      id: "creative-prompts",
      title: "Creative Writing with AI",
      description: "Unlock creativity through effective prompting strategies",
      thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=225&fit=crop&crop=center",
      duration: "15:30",
      category: "creative",
      embedId: "aircAruvnKk"
    },
    {
      id: "technical-prompts",
      title: "Technical Documentation",
      description: "Generate comprehensive technical docs with AI",
      thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=225&fit=crop&crop=center",
      duration: "10:28",
      category: "technical",
      embedId: "kWmX3pd1f10"
    }
  ];

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success("Prompt copied successfully!", {
        description: "The prompt template has been copied to your clipboard and is ready to use.",
        duration: 3000,
      });
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedIndex(index);
        toast.success("Prompt copied successfully!", {
          description: "The prompt template has been copied to your clipboard.",
          duration: 3000,
        });
        setTimeout(() => setCopiedIndex(null), 2000);
      } catch (fallbackErr) {
        toast.error("Copy failed", {
          description: "Unable to copy the prompt. Please try selecting and copying manually.",
        });
      }
      document.body.removeChild(textArea);
    }
  };

  const openInNewTab = (category: string) => {
    const urls: Record<string, string> = {
      "Software Development": "https://github.com/explore",
      "Marketing Content": "https://www.copywritingcourse.com/",
      "Business Analytics": "https://www.tableau.com/learn",
      "Learning & Development": "https://www.coursera.org/",
      "Academic Research": "https://scholar.google.com/"
    };
    
    const url = urls[category] || "https://openai.com/blog/chatgpt-prompting";
    window.open(url, '_blank', 'noopener,noreferrer');
    toast.success(`Opening ${category} resources...`, {
      description: "Redirecting to helpful tools and guides.",
    });
  };

  const handleVideoPlay = (video: typeof exampleVideos[0]) => {
    setPlayingVideoId(video.id);
    toast.success(`Playing: ${video.title}`, {
      description: "Loading video tutorial"
    });
  };

  const closeVideo = () => {
    setPlayingVideoId(null);
  };

  const currentVideo = exampleVideos.find(v => v.id === playingVideoId);

  return (
    <section id="examples" className="py-20 px-4 bg-white/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Video Modal */}
        {playingVideoId && currentVideo && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    {currentVideo.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {currentVideo.description}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={closeVideo} className="hover:bg-slate-200 dark:hover:bg-slate-700">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo.embedId}?autoplay=1&rel=0&modestbranding=1`}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={currentVideo.title}
                />
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Professional Prompt Templates
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the art of prompt engineering with these expertly crafted templates designed for real-world applications across various industries and use cases.
          </p>
        </div>

        {/* Enhanced Video Tutorial Section */}
        <div className="mb-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 border border-purple-100 dark:border-purple-800/50">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              🎥 Video Learning Hub
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Watch expert tutorials and learn prompt engineering through practical examples
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exampleVideos.map((video) => (
              <Card key={video.id} className="group hover:shadow-2xl transition-all duration-500 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:scale-105 hover:-translate-y-2">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      onClick={() => handleVideoPlay(video)}
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-2xl transform scale-0 group-hover:scale-100 transition-all duration-300"
                    >
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                  <Badge className="absolute top-3 right-3 bg-black/80 text-white font-semibold px-2 py-1">
                    {video.duration}
                  </Badge>
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 font-medium">
                      HD Quality
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h4 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {video.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {video.category}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVideoPlay(video)}
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/30"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Examples Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {examples.map((example, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:scale-[1.02] hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-2xl ${example.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 group-hover:scale-110`}>
                    <example.icon className={`w-7 h-7 ${example.color.replace('bg-', 'text-')}`} />
                  </div>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium px-3 py-1">
                    {example.category}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">
                  {example.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2 mt-3">
                  {example.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs font-medium hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-5 relative group/prompt border-2 border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
                  <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {example.prompt}
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 opacity-0 group-hover/prompt:opacity-100 transition-all duration-300 bg-white/95 dark:bg-slate-800/95 hover:bg-white dark:hover:bg-slate-800 shadow-lg hover:shadow-xl"
                    onClick={() => copyToClipboard(example.prompt, index)}
                  >
                    {copiedIndex === index ? (
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <Check className="w-4 h-4" />
                        <span className="text-xs font-semibold">Copied!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Copy className="w-4 h-4" />
                        <span className="text-xs font-medium">Copy</span>
                      </div>
                    )}
                  </Button>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600 font-medium"
                    onClick={() => copyToClipboard(example.prompt, index)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Template
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-slate-100 dark:hover:bg-slate-700 font-medium"
                    onClick={() => openInNewTab(example.category)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Resources
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-purple-50 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    onClick={() => handleVideoPlay(exampleVideos[index % exampleVideos.length])}
                  >
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Pro Tips Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-10 border border-indigo-100 dark:border-indigo-800/50">
          <h3 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-slate-100">
            🚀 Pro Prompting Strategies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="font-bold text-lg mb-3 text-slate-800 dark:text-slate-100">Be Ultra-Specific</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Include detailed context, desired format, constraints, and specific requirements for optimal results.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="font-bold text-lg mb-3 text-slate-800 dark:text-slate-100">Define the Expert Role</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Set clear expertise levels, professional backgrounds, and specialized knowledge areas for better AI responses.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="font-bold text-lg mb-3 text-slate-800 dark:text-slate-100">Iterate & Refine</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Continuously improve your prompts based on results, feedback, and changing requirements.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
