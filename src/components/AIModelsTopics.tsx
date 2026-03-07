import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, BookOpen, Cpu, Eye, MessageSquare, Code, Image, Music } from "lucide-react";
import { motion } from "framer-motion";

export const AIModelsTopics = () => {
  const models = [
    {
      name: "GPT-4o / GPT-4.5",
      provider: "OpenAI",
      description: "OpenAI's flagship multimodal model. GPT-4o handles text, images, audio, and video natively. GPT-4.5 (Feb 2025) is the largest dense model focused on improved world knowledge and reduced hallucinations. Best for: general reasoning, coding, creative writing, and multimodal tasks.",
      type: "Multimodal",
      icon: MessageSquare,
      url: "https://platform.openai.com/docs/models",
      strengths: ["Broad knowledge", "Strong coding", "Multimodal native", "Tool use"],
    },
    {
      name: "Claude 3.5 Sonnet / Claude 4",
      provider: "Anthropic",
      description: "Anthropic's models excel at long-context tasks (200K tokens), complex reasoning, and following nuanced instructions. Claude 3.5 Sonnet offers the best balance of speed and quality. Known for: careful reasoning, reduced hallucinations, and Constitutional AI safety. Supports tool use and MCP natively.",
      type: "Text & Vision",
      icon: MessageSquare,
      url: "https://docs.anthropic.com/en/docs/about-claude/models",
      strengths: ["200K context window", "Careful reasoning", "Safety-focused", "MCP support"],
    },
    {
      name: "Gemini 2.5 Pro / Flash",
      provider: "Google DeepMind",
      description: "Google's multimodal models with native 1M+ token context windows. Gemini 2.5 Flash is optimized for speed and cost. Gemini 2.5 Pro excels at complex reasoning and coding. Both handle text, images, video, and audio. Integrated with Google Search for grounding.",
      type: "Multimodal",
      icon: Cpu,
      url: "https://ai.google.dev/gemini-api/docs",
      strengths: ["1M+ context", "Native multimodal", "Fast (Flash)", "Google Search grounding"],
    },
    {
      name: "Llama 3.3 / 4",
      provider: "Meta",
      description: "Meta's open-weight models available for commercial use. Llama 3.3 70B matches GPT-4o quality on many benchmarks. Llama 4 (2025) introduces Mixture-of-Experts architecture. Can be self-hosted for data privacy. Available via Hugging Face, Together AI, Groq, and others.",
      type: "Open Weight",
      icon: Code,
      url: "https://llama.meta.com/",
      strengths: ["Open weights", "Self-hostable", "Privacy-friendly", "Strong performance"],
    },
    {
      name: "DALL-E 3 / Stable Diffusion 3",
      provider: "OpenAI / Stability AI",
      description: "Leading text-to-image models. DALL-E 3 (via ChatGPT/API) excels at following complex prompts and rendering text accurately. Stable Diffusion 3 is open-source, can be run locally, and supports fine-tuning. Flux by Black Forest Labs is a strong alternative.",
      type: "Image Generation",
      icon: Image,
      url: "https://openai.com/dall-e-3",
      strengths: ["Text rendering", "Prompt adherence", "Open-source options", "Fine-tunable"],
    },
    {
      name: "Suno / Udio",
      provider: "Suno AI / Udio",
      description: "AI music generation models that create full songs from text descriptions. Specify genre, mood, instruments, lyrics, and structure. Suno v4 produces radio-quality audio with vocals. Udio focuses on production quality and musical coherence. Both support instrumental and vocal generation.",
      type: "Audio Generation",
      icon: Music,
      url: "https://suno.com/",
      strengths: ["Full song generation", "Multiple genres", "Vocal synthesis", "High audio quality"],
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border-0 px-4 py-1.5">
            <Cpu className="w-4 h-4 mr-1" /> Updated March 2026
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Models Landscape
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A real, up-to-date guide to the most important AI models — what they do, who makes them, and when to use each one.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/90 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md">
                        <model.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-display">{model.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{model.provider}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">{model.type}</Badge>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {model.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {model.strengths.map((s, j) => (
                      <Badge key={j} className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-0 text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
                    onClick={() => window.open(model.url, '_blank', 'noopener,noreferrer')}
                  >
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Official Docs</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
