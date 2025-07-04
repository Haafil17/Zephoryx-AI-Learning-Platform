
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, Video, Users, Wrench, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Resources = () => {
  const [email, setEmail] = useState("");

  const resources = [
    {
      category: "Learning",
      icon: BookOpen,
      items: [
        {
          title: "OpenAI Prompt Engineering Guide",
          description: "Official best practices and techniques",
          url: "https://platform.openai.com/docs/guides/prompt-engineering",
          type: "Documentation",
          rating: 5
        },
        {
          title: "Anthropic's Claude Prompt Guide",
          description: "Constitutional AI and advanced prompting",
          url: "https://docs.anthropic.com/claude/docs/prompt-engineering",
          type: "Guide",
          rating: 5
        },
        {
          title: "Prompt Engineering for Developers",
          description: "Technical deep-dive course",
          url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
          type: "Course",
          rating: 4
        }
      ]
    },
    {
      category: "Tools",
      icon: Wrench,
      items: [
        {
          title: "PromptBase",
          description: "Marketplace for high-quality prompts",
          url: "https://promptbase.com/",
          type: "Platform",
          rating: 4
        },
        {
          title: "Prompt Perfect",
          description: "Prompt optimization and testing",
          url: "https://promptperfect.jina.ai/",
          type: "Tool",
          rating: 4
        },
        {
          title: "LangChain Hub",
          description: "Prompt templates and chains",
          url: "https://smith.langchain.com/hub",
          type: "Library",
          rating: 5
        }
      ]
    },
    {
      category: "Community",
      icon: Users,
      items: [
        {
          title: "r/PromptEngineering",
          description: "Reddit community for prompt engineers",
          url: "https://www.reddit.com/r/PromptEngineering/",
          type: "Forum",
          rating: 4
        },
        {
          title: "Prompt Engineers Discord",
          description: "Active community discussions",
          url: "https://discord.gg/prompt-engineering",
          type: "Discord",
          rating: 4
        },
        {
          title: "AI Prompt Engineering LinkedIn",
          description: "Professional networking group",
          url: "https://www.linkedin.com/groups/12345678/",
          type: "LinkedIn",
          rating: 3
        }
      ]
    },
    {
      category: "Videos",
      icon: Video,
      items: [
        {
          title: "DeepLearning.AI Prompt Course",
          description: "Comprehensive video series",
          url: "https://www.deeplearning.ai/short-courses/",
          type: "Course",
          rating: 5
        },
        {
          title: "Two Minute Papers",
          description: "Latest AI research and techniques",
          url: "https://www.youtube.com/@TwoMinutePapers",
          type: "YouTube",
          rating: 4
        },
        {
          title: "AI Explained",
          description: "Practical AI tutorials",
          url: "https://www.youtube.com/@ai-explained-",
          type: "YouTube",
          rating: 4
        }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "Documentation": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "Guide": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      "Course": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      "Platform": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      "Tool": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      "Library": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      "Forum": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      "Discord": "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
      "LinkedIn": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
      "YouTube": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    };
    return colors[type] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleResourceClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    // Simulate newsletter signup
    toast.success("Successfully subscribed!", {
      description: "Thank you for subscribing to our newsletter!",
    });
    setEmail("");
  };

  return (
    <section id="resources" className="py-20 px-4 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Learning Resources
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Curated collection of the best resources to advance your prompt engineering skills
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resources.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg dark:shadow-slate-900/20">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                    <category.icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {category.category}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-5 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-lg">{item.title}</h4>
                      <div className="flex items-center gap-2">
                        {renderStars(item.rating)}
                        <Badge className={getTypeColor(item.type) + " text-sm px-3 py-1"}>
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 text-base">{item.description}</p>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="text-base px-6 py-3 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-600"
                      onClick={() => handleResourceClick(item.url)}
                    >
                      Visit Resource
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="mb-6 opacity-90 text-lg">Get the latest prompt engineering techniques and resources delivered to your inbox</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
            />
            <Button type="submit" size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
