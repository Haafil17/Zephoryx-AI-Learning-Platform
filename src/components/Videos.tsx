import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Play, 
  Clock, 
  Search, 
  Filter,
  X,
  Code,
  Brain,
  Sparkles,
  Target,
  BookOpen,
  Zap,
  Users,
  Atom
} from "lucide-react";
import { toast } from "sonner";

export const Videos = () => {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const allVideos = [
    // Prompt Engineering Fundamentals
    {
      id: "prompt-engineering-101",
      title: "Prompt Engineering 101: Complete Beginner's Guide",
      description: "Master the fundamentals of prompt engineering with practical examples and hands-on exercises",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop&crop=center",
      duration: "18:45",
      category: "fundamentals",
      embedId: "F_hJ2Ey2BNc",
      level: "Beginner",
      views: "125K"
    },
    {
      id: "advanced-prompt-techniques",
      title: "Advanced Prompt Engineering Techniques",
      description: "Learn sophisticated prompting strategies including chain-of-thought, few-shot learning, and role-based prompting",
      thumbnail: "https://images.unsplash.com/photo-1686191128892-7066f1b4f5db?w=400&h=225&fit=crop&crop=center",
      duration: "24:12",
      category: "advanced",
      embedId: "wbGKfAPlZVA",
      level: "Advanced",
      views: "89K"
    },
    {
      id: "prompt-optimization",
      title: "Prompt Optimization Strategies",
      description: "Discover how to fine-tune your prompts for maximum effectiveness and consistent results",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=225&fit=crop&crop=center",
      duration: "16:30",
      category: "optimization",
      embedId: "dOxUroR57xs",
      level: "Intermediate",
      views: "67K"
    },

    // AI Tools & Applications
    {
      id: "chatgpt-mastery",
      title: "ChatGPT Mastery: From Basics to Pro",
      description: "Complete guide to mastering ChatGPT for productivity, creativity, and problem-solving",
      thumbnail: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=400&h=225&fit=crop&crop=center",
      duration: "32:15",
      category: "tools",
      embedId: "JTxsNm9IdYU",
      level: "Beginner",
      views: "234K"
    },
    {
      id: "claude-vs-gpt",
      title: "Claude vs GPT: Which AI is Better?",
      description: "Comprehensive comparison of Claude and GPT models with real-world testing scenarios",
      thumbnail: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=400&h=225&fit=crop&crop=center",
      duration: "19:22",
      category: "tools",
      embedId: "bOxUroR57xs",
      level: "Intermediate",
      views: "156K"
    },
    {
      id: "midjourney-prompting",
      title: "Midjourney Prompting: Create Stunning AI Art",
      description: "Master the art of creating beautiful images with Midjourney using advanced prompting techniques",
      thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=225&fit=crop&crop=center",
      duration: "26:48",
      category: "creative",
      embedId: "aOxUroR57xs",
      level: "Intermediate",
      views: "198K"
    },

    // Coding with AI
    {
      id: "github-copilot-guide",
      title: "GitHub Copilot: AI Coding Assistant Complete Guide",
      description: "Maximize productivity with GitHub Copilot for code generation, debugging, and optimization",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop&crop=center",
      duration: "22:30",
      category: "coding",
      embedId: "cOxUroR57xs",
      level: "Intermediate",
      views: "87K"
    },
    {
      id: "cursor-ide-tutorial",
      title: "Cursor IDE: The Future of AI-Powered Development",
      description: "Explore Cursor IDE's powerful AI features for faster and smarter coding workflows",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-4542c06a5843?w=400&h=225&fit=crop&crop=center",
      duration: "28:15",
      category: "coding",
      embedId: "eOxUroR57xs",
      level: "Advanced",
      views: "76K"
    },
    {
      id: "ai-code-review",
      title: "AI-Powered Code Review and Testing",
      description: "Learn how to use AI for automated code review, bug detection, and test generation",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=225&fit=crop&crop=center",
      duration: "20:45",
      category: "coding",
      embedId: "fOxUroR57xs",
      level: "Intermediate",
      views: "54K"
    },

    // Business & Productivity
    {
      id: "ai-business-automation",
      title: "AI Business Automation: Save 10+ Hours Per Week",
      description: "Automate repetitive business tasks using AI tools and workflows",
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=225&fit=crop&crop=center",
      duration: "35:20",
      category: "business",
      embedId: "gOxUroR57xs",
      level: "Beginner",
      views: "142K"
    },
    {
      id: "ai-content-creation",
      title: "AI Content Creation: Blog Posts, Social Media & More",
      description: "Create high-quality content at scale using AI writing tools and templates",
      thumbnail: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=225&fit=crop&crop=center",
      duration: "29:38",
      category: "content",
      embedId: "hOxUroR57xs",
      level: "Beginner",
      views: "168K"
    },
    {
      id: "ai-data-analysis",
      title: "AI for Data Analysis: From Excel to Advanced Analytics",
      description: "Transform your data analysis workflow with AI-powered tools and techniques",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop&crop=center",
      duration: "31:12",
      category: "analytics",
      embedId: "iOxUroR57xs",
      level: "Intermediate",
      views: "93K"
    },

    // Creative & Design
    {
      id: "ai-design-workflow",
      title: "AI Design Workflow: From Concept to Creation",
      description: "Streamline your design process with AI tools for ideation, prototyping, and refinement",
      thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=225&fit=crop&crop=center",
      duration: "25:44",
      category: "creative",
      embedId: "jOxUroR57xs",
      level: "Intermediate",
      views: "79K"
    },
    {
      id: "stable-diffusion-mastery",
      title: "Stable Diffusion Mastery: Local AI Image Generation",
      description: "Master Stable Diffusion for creating professional-quality images on your own hardware",
      thumbnail: "https://images.unsplash.com/photo-1686191128892-7066f1b4f5db?w=400&h=225&fit=crop&crop=center",
      duration: "38:55",
      category: "creative",
      embedId: "kOxUroR57xs",
      level: "Advanced",
      views: "211K"
    },

    // Research & Education
    {
      id: "ai-research-methods",
      title: "AI-Powered Research: Finding & Analyzing Information",
      description: "Revolutionize your research process with AI tools for information gathering and synthesis",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop&crop=center",
      duration: "23:17",
      category: "research",
      embedId: "lOxUroR57xs",
      level: "Beginner",
      views: "61K"
    },
    {
      id: "ai-learning-strategies",
      title: "Learn Anything Faster with AI: Study Techniques",
      description: "Accelerate your learning using AI for personalized study plans and knowledge retention",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop&crop=center",
      duration: "27:33",
      category: "education",
      embedId: "mOxUroR57xs",
      level: "Beginner",
      views: "104K"
    },

    // Future & Trends
    {
      id: "ai-future-trends",
      title: "The Future of AI: Trends to Watch in 2024",
      description: "Explore upcoming AI developments and their potential impact on various industries",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop&crop=center",
      duration: "21:08",
      category: "trends",
      embedId: "nOxUroR57xs",
      level: "Beginner",
      views: "89K"
    }
  ];

  const categories = [
    { id: "all", label: "All Videos", icon: Play },
    { id: "fundamentals", label: "Fundamentals", icon: BookOpen },
    { id: "advanced", label: "Advanced", icon: Brain },
    { id: "tools", label: "AI Tools", icon: Zap },
    { id: "coding", label: "Coding", icon: Code },
    { id: "business", label: "Business", icon: Target },
    { id: "creative", label: "Creative", icon: Sparkles },
    { id: "content", label: "Content", icon: Users },
    { id: "analytics", label: "Analytics", icon: Brain },
    { id: "research", label: "Research", icon: Search },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "trends", label: "Trends", icon: Atom }
  ];

  const filteredVideos = allVideos.filter(video => {
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVideoPlay = (video: typeof allVideos[0]) => {
    setPlayingVideoId(video.id);
    toast.success(`Now playing: ${video.title}`);
  };

  const closeVideo = () => {
    setPlayingVideoId(null);
  };

  const playingVideo = allVideos.find(video => video.id === playingVideoId);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Intermediate": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Advanced": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-background/50 to-accent/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Video Library
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive video tutorials covering everything from AI fundamentals to advanced techniques
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-xs"
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    onClick={() => handleVideoPlay(video)}
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </Button>
                </div>
                <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {video.duration}
                </div>
                <div className="absolute top-2 left-2">
                  <Badge className={getLevelColor(video.level)}>
                    {video.level}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{video.views} views</span>
                  <Badge variant="outline" className="text-xs">
                    {categories.find(cat => cat.id === video.category)?.label}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No videos found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Video Modal */}
        {playingVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <div>
                  <h3 className="text-lg font-semibold">{playingVideo.title}</h3>
                  <p className="text-sm text-muted-foreground">{playingVideo.description}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={closeVideo}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${playingVideo.embedId}?autoplay=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={playingVideo.title}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};