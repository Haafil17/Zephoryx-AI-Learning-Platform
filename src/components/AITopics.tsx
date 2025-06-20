import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, Target, Lightbulb, ChevronRight, Star, Video, Play } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const AITopics = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const aiConcepts = [
    {
      title: "Machine Learning Fundamentals",
      description: "Understanding supervised, unsupervised, and reinforcement learning approaches",
      category: "fundamentals",
      difficulty: "Beginner",
      applications: ["Prediction", "Classification", "Clustering"],
      learnMoreUrl: "https://www.coursera.org/learn/machine-learning"
    },
    {
      title: "Neural Networks & Deep Learning",
      description: "Architecture and training of artificial neural networks for complex tasks",
      category: "fundamentals",
      difficulty: "Intermediate",
      applications: ["Image Recognition", "Natural Language", "Speech"],
      learnMoreUrl: "https://www.deeplearningbook.org/"
    },
    {
      title: "AI Ethics & Bias",
      description: "Responsible AI development and addressing algorithmic bias in systems",
      category: "ethics",
      difficulty: "Advanced",
      applications: ["Fair Hiring", "Medical Diagnosis", "Criminal Justice"],
      learnMoreUrl: "https://www.partnershiponai.org/"
    },
    {
      title: "Computer Vision",
      description: "Teaching machines to interpret and understand visual information",
      category: "applications",
      difficulty: "Intermediate",
      applications: ["Object Detection", "Facial Recognition", "Medical Imaging"],
      learnMoreUrl: "https://opencv.org/"
    },
    {
      title: "Natural Language Processing",
      description: "Enabling computers to understand, interpret, and generate human language",
      category: "applications",
      difficulty: "Intermediate",
      applications: ["Sentiment Analysis", "Translation", "Chatbots"],
      learnMoreUrl: "https://huggingface.co/course/chapter1/1"
    },
    {
      title: "AI in Healthcare",
      description: "Transforming medical diagnosis, treatment planning, and drug discovery",
      category: "industry",
      difficulty: "Advanced",
      applications: ["Drug Discovery", "Diagnostic Imaging", "Personalized Medicine"],
      learnMoreUrl: "https://www.nature.com/subjects/machine-learning"
    }
  ];

  const categories = [
    { id: "all", name: "All Concepts", count: aiConcepts.length },
    { id: "fundamentals", name: "Fundamentals", count: aiConcepts.filter(c => c.category === "fundamentals").length },
    { id: "applications", name: "Applications", count: aiConcepts.filter(c => c.category === "applications").length },
    { id: "ethics", name: "Ethics", count: aiConcepts.filter(c => c.category === "ethics").length },
    { id: "industry", name: "Industry", count: aiConcepts.filter(c => c.category === "industry").length }
  ];

  const filteredConcepts = selectedCategory === "all" 
    ? aiConcepts 
    : aiConcepts.filter(concept => concept.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleLearnMore = (concept: typeof aiConcepts[0]) => {
    window.open(concept.learnMoreUrl, '_blank', 'noopener,noreferrer');
    toast.success(`Opening ${concept.title} resources...`);
  };

  const aiVideos = [
    {
      id: "ai-basics",
      title: "AI Fundamentals Explained",
      description: "Understanding the basics of artificial intelligence",
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=225&fit=crop",
      duration: "15:30",
      category: "fundamentals"
    },
    {
      id: "neural-networks",
      title: "Neural Networks Deep Dive",
      description: "How neural networks process information",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
      duration: "22:45",
      category: "fundamentals"
    },
    {
      id: "ai-ethics",
      title: "AI Ethics in Practice",
      description: "Real-world examples of AI ethical considerations",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=225&fit=crop",
      duration: "18:20",
      category: "ethics"
    }
  ];

  const handleVideoPlay = (videoId: string) => {
    setPlayingVideoId(videoId);
    toast.success("Playing video...", {
      description: "Video content loading"
    });
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Artificial Intelligence
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Explore the fundamentals, applications, and future of artificial intelligence across industries and use cases
          </p>
        </div>

        {/* Video Gallery Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-100">
            AI Learning Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiVideos.map((video) => (
              <Card key={video.id} className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      onClick={() => handleVideoPlay(video.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4"
                    >
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                    {video.duration}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>
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
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 hover:bg-blue-50"
              } px-4 py-2 rounded-full border transition-all duration-200`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* AI Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredConcepts.map((concept, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 transition-colors">
                    <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Badge className={getDifficultyColor(concept.difficulty)}>
                    {concept.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {concept.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {concept.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Applications:</h4>
                  <div className="flex flex-wrap gap-2">
                    {concept.applications.map((app, appIndex) => (
                      <Badge key={appIndex} variant="outline" className="text-xs">
                        {app}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    className="flex-1 justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30"
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

        {/* AI Impact Stats */}
        <div className="mt-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">AI Transforming Industries</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Artificial Intelligence is revolutionizing how we work, learn, and solve complex problems across every sector
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">85%</div>
              <div className="text-sm opacity-90">Accuracy Improvement</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">2.3B</div>
              <div className="text-sm opacity-90">People Impacted</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">40%</div>
              <div className="text-sm opacity-90">Productivity Boost</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-sm opacity-90">Use Cases</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
