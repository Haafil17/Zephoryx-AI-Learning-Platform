import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, Target, Lightbulb, ChevronRight, Star, Video, Play, X } from "lucide-react";
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
      description: "Complete introduction to artificial intelligence concepts",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop&crop=center",
      duration: "18:45",
      category: "fundamentals",
      embedId: "kWmX3pd1f10"
    },
    {
      id: "neural-networks",
      title: "Neural Networks Deep Dive",
      description: "Understanding how neural networks process and learn from data",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=225&fit=crop&crop=center",
      duration: "25:12", 
      category: "fundamentals",
      embedId: "aircAruvnKk"
    },
    {
      id: "ai-ethics",
      title: "AI Ethics in Practice",
      description: "Real-world examples of ethical AI development and deployment",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop&crop=center",
      duration: "14:30",
      category: "ethics",
      embedId: "AaAX-E6Vvd0"
    },
    {
      id: "computer-vision",
      title: "Computer Vision Applications",
      description: "How machines see and interpret visual data",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop&crop=center",
      duration: "20:15",
      category: "applications",
      embedId: "yQQ7DX6bI5Y"
    }
  ];

  const handleVideoPlay = (video: typeof aiVideos[0]) => {
    setPlayingVideoId(video.id);
    toast.success(`Playing: ${video.title}`, {
      description: "Loading AI tutorial"
    });
  };

  const closeVideo = () => {
    setPlayingVideoId(null);
  };

  const currentVideo = aiVideos.find(v => v.id === playingVideoId);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
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
                  src={`https://www.youtube.com/embed/${currentVideo.embedId}?autoplay=1&rel=0&modestbranding=1&start=0&title=Clavis AI`}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={`Clavis AI - ${currentVideo.title}`}
                />
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Artificial Intelligence
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Explore the fundamentals, applications, and future of artificial intelligence across industries and use cases
          </p>
        </div>

        {/* Enhanced Video Gallery Section */}
        <div className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 border border-blue-100 dark:border-blue-800/50">
          <h3 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-slate-100">
            🎯 AI Learning Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiVideos.map((video) => (
              <Card key={video.id} className="group hover:shadow-2xl transition-all duration-500 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:scale-105 hover:-translate-y-2">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      onClick={() => handleVideoPlay(video)}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl transform scale-0 group-hover:scale-100 transition-all duration-300"
                    >
                      <Play className="w-5 h-5" />
                    </Button>
                  </div>
                  <Badge className="absolute top-3 right-3 bg-black/80 text-white font-semibold">
                    {video.duration}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {video.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {video.description}
                  </CardDescription>
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
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-slate-700 hover:bg-blue-50 border-blue-200"
              } px-6 py-3 rounded-full border transition-all duration-200 hover:scale-105`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* AI Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredConcepts.map((concept, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:scale-105 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-2xl group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 transition-colors group-hover:scale-110 duration-300">
                    <Brain className="w-7 h-7 text-blue-600 dark:text-blue-400" />
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
                      <Badge key={appIndex} variant="outline" className="text-xs hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                        {app}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    className="flex-1 justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30 font-medium"
                    onClick={() => handleLearnMore(concept)}
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-blue-50 dark:hover:bg-blue-900/30"
                    onClick={() => handleVideoPlay(aiVideos[index % aiVideos.length])}
                  >
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Impact Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-2xl">
          <div className="text-center mb-10">
            <h3 className="text-4xl font-bold mb-4">AI Transforming Industries</h3>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Artificial Intelligence is revolutionizing how we work, learn, and solve complex problems across every sector
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <Target className="w-10 h-10" />
              </div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-lg opacity-90">Accuracy Improvement</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <Users className="w-10 h-10" />
              </div>
              <div className="text-4xl font-bold mb-2">2.3B</div>
              <div className="text-lg opacity-90">People Impacted</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <Lightbulb className="w-10 h-10" />
              </div>
              <div className="text-4xl font-bold mb-2">40%</div>
              <div className="text-lg opacity-90">Productivity Boost</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <Star className="w-10 h-10" />
              </div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-lg opacity-90">Use Cases</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
