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
      description: "Masterclass on professional prompt engineering",
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=225&fit=crop",
      duration: "32:15",
      category: "techniques",
      videoUrl: "https://www.youtube.com/embed/V2efhrCxTiw"
    },
    {
      id: "business-prompts",
      title: "Business Prompt Templates",
      description: "Real-world examples for business applications",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
      duration: "24:30",
      category: "business",
      videoUrl: "https://www.youtube.com/embed/jC4v5AS4RIM"
    },
    {
      id: "creative-prompts",
      title: "Creative Writing with AI",
      description: "Unleashing creativity through effective prompting",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=225&fit=crop",
      duration: "28:45",
      category: "creative",
      videoUrl: "https://www.youtube.com/embed/wShG8lT2tz0"
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
    // Create URLs based on category for better user experience
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

  const handleVideoPlay = (videoId: string) => {
    setPlayingVideoId(videoId);
    toast.success("Playing tutorial...", {
      description: "Loading example content"
    });
  };

  const closeVideo = () => {
    setPlayingVideoId(null);
  };

  return (
    <section id="examples" className="py-20 px-4 bg-white/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        {/* Video Modal */}
        {playingVideoId && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">
                  {exampleVideos.find(v => v.id === playingVideoId)?.title}
                </h3>
                <Button variant="ghost" size="sm" onClick={closeVideo}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={exampleVideos.find(v => v.id === playingVideoId)?.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title={exampleVideos.find(v => v.id === playingVideoId)?.title}
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

        {/* Video Tutorial Section */}
        <div className="mb-16 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-100">
            Prompt Engineering Video Tutorials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exampleVideos.map((video) => (
              <Card key={video.id} className="group hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      onClick={() => handleVideoPlay(video.id)}
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4"
                    >
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                    {video.duration}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{video.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{video.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {examples.map((example, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:scale-[1.02]">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${example.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
                    <example.icon className={`w-6 h-6 ${example.color.replace('bg-', 'text-')}`} />
                  </div>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                    {example.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {example.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2 mt-3">
                  {example.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 relative group/prompt border border-slate-200 dark:border-slate-600">
                  <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {example.prompt}
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover/prompt:opacity-100 transition-opacity bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800"
                    onClick={() => copyToClipboard(example.prompt, index)}
                  >
                    {copiedIndex === index ? (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <Check className="w-4 h-4" />
                        <span className="text-xs font-medium">Copied!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Copy className="w-4 h-4" />
                        <span className="text-xs">Copy</span>
                      </div>
                    )}
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-700"
                    onClick={() => copyToClipboard(example.prompt, index)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Template
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-slate-100 dark:hover:bg-slate-700"
                    onClick={() => openInNewTab(example.category)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVideoPlay(`${example.title.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Tips Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-slate-100">
            Pro Tips for Better Prompts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">Be Specific</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">Include clear context, desired format, and specific requirements.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">Set the Role</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">Define the AI's expertise level and professional background.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">Iterate</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">Refine your prompts based on results and feedback.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
