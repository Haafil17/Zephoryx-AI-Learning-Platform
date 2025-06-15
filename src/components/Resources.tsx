
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, Video, Users, Wrench, Star } from "lucide-react";

export const Resources = () => {
  const resources = [
    {
      category: "Learning",
      icon: BookOpen,
      items: [
        {
          title: "OpenAI Prompt Engineering Guide",
          description: "Official best practices and techniques",
          url: "#",
          type: "Documentation",
          rating: 5
        },
        {
          title: "Anthropic's Claude Prompt Guide",
          description: "Constitutional AI and advanced prompting",
          url: "#",
          type: "Guide",
          rating: 5
        },
        {
          title: "Prompt Engineering for Developers",
          description: "Technical deep-dive course",
          url: "#",
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
          url: "#",
          type: "Platform",
          rating: 4
        },
        {
          title: "Prompt Perfect",
          description: "Prompt optimization and testing",
          url: "#",
          type: "Tool",
          rating: 4
        },
        {
          title: "LangChain Hub",
          description: "Prompt templates and chains",
          url: "#",
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
          url: "#",
          type: "Forum",
          rating: 4
        },
        {
          title: "Prompt Engineers Discord",
          description: "Active community discussions",
          url: "#",
          type: "Discord",
          rating: 4
        },
        {
          title: "AI Prompt Engineering LinkedIn",
          description: "Professional networking group",
          url: "#",
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
          url: "#",
          type: "Course",
          rating: 5
        },
        {
          title: "Two Minute Papers",
          description: "Latest AI research and techniques",
          url: "#",
          type: "YouTube",
          rating: 4
        },
        {
          title: "AI Explained",
          description: "Practical AI tutorials",
          url: "#",
          type: "YouTube",
          rating: 4
        }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "Documentation": "bg-blue-100 text-blue-800",
      "Guide": "bg-green-100 text-green-800",
      "Course": "bg-purple-100 text-purple-800",
      "Platform": "bg-orange-100 text-orange-800",
      "Tool": "bg-red-100 text-red-800",
      "Library": "bg-indigo-100 text-indigo-800",
      "Forum": "bg-yellow-100 text-yellow-800",
      "Discord": "bg-pink-100 text-pink-800",
      "LinkedIn": "bg-cyan-100 text-cyan-800",
      "YouTube": "bg-red-100 text-red-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 px-4 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Learning Resources
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Curated collection of the best resources to advance your prompt engineering skills
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resources.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <category.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-800">
                    {category.category}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">{item.title}</h4>
                      <div className="flex items-center gap-2">
                        {renderStars(item.rating)}
                        <Badge className={getTypeColor(item.type)}>
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                    <Button variant="outline" size="sm" className="text-xs">
                      Visit Resource
                      <ExternalLink className="ml-1 w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="mb-6 opacity-90">Get the latest prompt engineering techniques and resources delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
