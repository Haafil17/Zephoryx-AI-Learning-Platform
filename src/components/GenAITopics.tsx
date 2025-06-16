
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Image, FileText, Mic, ChevronRight, Zap } from "lucide-react";
import { useState } from "react";

export const GenAITopics = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const genAIConcepts = [
    {
      title: "Large Language Models (LLMs)",
      description: "Understanding transformer architecture and how models like GPT generate human-like text",
      category: "models",
      icon: FileText,
      capabilities: ["Text Generation", "Code Writing", "Translation", "Summarization"]
    },
    {
      title: "Text-to-Image Generation",
      description: "Creating stunning visuals from textual descriptions using diffusion models",
      category: "creative",
      icon: Image,
      capabilities: ["Art Creation", "Product Design", "Marketing Assets", "Concept Art"]
    },
    {
      title: "Voice & Audio AI",
      description: "Generating realistic speech, music, and sound effects from text or audio inputs",
      category: "creative",
      icon: Mic,
      capabilities: ["Voice Cloning", "Music Generation", "Podcast Creation", "Audio Enhancement"]
    },
    {
      title: "Prompt Engineering Mastery",
      description: "Advanced techniques for crafting effective prompts to get optimal AI outputs",
      category: "techniques",
      icon: Sparkles,
      capabilities: ["Chain-of-Thought", "Few-Shot Learning", "Role-Based Prompting", "Template Design"]
    },
    {
      title: "AI Content Workflows",
      description: "Building efficient pipelines for content creation across multiple AI models",
      category: "workflow",
      icon: Zap,
      capabilities: ["Automation", "Quality Control", "Multi-Modal", "Batch Processing"]
    },
    {
      title: "Fine-tuning & Customization",
      description: "Adapting pre-trained models for specific domains and use cases",
      category: "advanced",
      icon: Sparkles,
      capabilities: ["Domain Adaptation", "Style Transfer", "Custom Training", "Model Optimization"]
    }
  ];

  const categories = [
    { id: "all", name: "All Topics", count: genAIConcepts.length },
    { id: "models", name: "AI Models", count: genAIConcepts.filter(c => c.category === "models").length },
    { id: "creative", name: "Creative AI", count: genAIConcepts.filter(c => c.category === "creative").length },
    { id: "techniques", name: "Techniques", count: genAIConcepts.filter(c => c.category === "techniques").length },
    { id: "workflow", name: "Workflows", count: genAIConcepts.filter(c => c.category === "workflow").length },
    { id: "advanced", name: "Advanced", count: genAIConcepts.filter(c => c.category === "advanced").length }
  ];

  const filteredConcepts = selectedCategory === "all" 
    ? genAIConcepts 
    : genAIConcepts.filter(concept => concept.category === selectedCategory);

  const tools = [
    { name: "ChatGPT", type: "Text", description: "Conversational AI for various tasks" },
    { name: "DALL-E", type: "Image", description: "Text-to-image generation" },
    { name: "Midjourney", type: "Image", description: "Artistic AI image creation" },
    { name: "Claude", type: "Text", description: "Advanced reasoning and analysis" },
    { name: "Stable Diffusion", type: "Image", description: "Open-source image generation" },
    { name: "ElevenLabs", type: "Audio", description: "Voice cloning and generation" }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Generative AI
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Master the art of creating content with AI - from text and images to audio and video generation
          </p>
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
                  ? "bg-purple-600 text-white"
                  : "bg-white text-slate-700 hover:bg-purple-50"
              } px-4 py-2 rounded-full border transition-all duration-200`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* GenAI Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredConcepts.map((concept, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full group-hover:bg-purple-200 dark:group-hover:bg-purple-800/70 transition-colors">
                    <concept.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {concept.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {concept.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Key Capabilities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {concept.capabilities.map((capability, capIndex) => (
                      <Badge key={capIndex} variant="outline" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/30"
                >
                  Explore Topic
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Tools Section */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-100">Popular GenAI Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
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

        {/* GenAI Impact Stats */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">The GenAI Revolution</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Generative AI is transforming creative industries and democratizing content creation for everyone
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">1B+</div>
              <div className="text-sm opacity-90">Images Generated Daily</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">90%</div>
              <div className="text-sm opacity-90">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">AI Models Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Creative Assistant</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
