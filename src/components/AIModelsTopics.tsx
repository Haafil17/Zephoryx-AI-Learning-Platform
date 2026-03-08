import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, BookOpen, Cpu, MessageSquare, Code, Image, Music, Eye, Brain, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

export const AIModelsTopics = () => {
  const models = [
    {
      name: "GPT-4o / GPT-4.5",
      provider: "OpenAI",
      description: "OpenAI's flagship multimodal model. GPT-4o handles text, images, audio, and video natively in a single model — not separate pipelines. It has 128K context window and supports structured outputs (guaranteed valid JSON). GPT-4.5 (Feb 2025) is OpenAI's largest dense model, focused on reducing hallucinations and improving emotional intelligence. GPT-4o-mini is the cost-optimized variant at ~$0.15/1M input tokens — 60x cheaper than GPT-4. Best for: general reasoning, coding, creative writing, and multimodal tasks.",
      type: "Multimodal",
      icon: MessageSquare,
      url: "https://platform.openai.com/docs/models",
      strengths: ["128K context", "Native multimodal", "Structured outputs", "Tool/function calling", "Vision + audio"],
      pricing: "$2.50 / 1M input tokens (GPT-4o)"
    },
    {
      name: "o1 / o3 Reasoning Models",
      provider: "OpenAI",
      description: "OpenAI's reasoning models use internal chain-of-thought to 'think' before responding. o1 (Sep 2024) spends more compute at inference time, producing dramatically better results on math, coding, and science benchmarks. o3 and o3-mini (2025) extend this with configurable 'thinking effort' (low/medium/high). These models excel at: complex math, competitive programming, scientific reasoning, and multi-step planning. They use significantly more tokens (thinking tokens are hidden but billed).",
      type: "Reasoning",
      icon: Brain,
      url: "https://platform.openai.com/docs/guides/reasoning",
      strengths: ["PhD-level science reasoning", "IOI gold-medal coding", "Configurable thinking effort", "Best for complex logic"],
      pricing: "$15 / 1M input tokens (o1)"
    },
    {
      name: "Claude 3.5 Sonnet / Claude 4",
      provider: "Anthropic",
      description: "Anthropic's models excel at long-context tasks (200K tokens), nuanced instruction following, and careful reasoning. Claude 3.5 Sonnet is widely considered the best balance of speed, quality, and cost — often preferred by developers over GPT-4o for coding and analysis. Anthropic's Constitutional AI approach trains the model to be helpful, harmless, and honest. Claude supports tool use, vision, and is the native client for Model Context Protocol (MCP). Claude 4 (expected 2025) aims for major reasoning improvements.",
      type: "Text & Vision",
      icon: MessageSquare,
      url: "https://docs.anthropic.com/en/docs/about-claude/models",
      strengths: ["200K context window", "Best instruction following", "Constitutional AI safety", "Native MCP support", "Strong at coding"],
      pricing: "$3 / 1M input tokens (Sonnet)"
    },
    {
      name: "Gemini 2.5 Pro / Flash",
      provider: "Google DeepMind",
      description: "Google's multimodal models with the industry's largest context windows — 1M tokens standard, 2M in preview. Gemini 2.5 Pro excels at complex reasoning, coding, and multimodal understanding. It processes video natively (not frame-by-frame extraction). Gemini 2.5 Flash is optimized for speed and cost — ideal for high-volume applications. Both integrate with Google Search for grounding (reducing hallucinations by citing live web data). Available via Google AI Studio, Vertex AI, and the Gemini API.",
      type: "Multimodal",
      icon: Cpu,
      url: "https://ai.google.dev/gemini-api/docs",
      strengths: ["1M-2M token context", "Native video processing", "Google Search grounding", "Fast (Flash variant)", "Free tier available"],
      pricing: "Free tier available; $1.25 / 1M input (Flash)"
    },
    {
      name: "DeepSeek R1 / V3",
      provider: "DeepSeek",
      description: "DeepSeek, a Chinese AI lab, released models that shocked the industry in early 2025. DeepSeek-V3 is a 671B Mixture-of-Experts model (37B active parameters per token) that matches GPT-4o quality at a fraction of the training cost (~$5.5M). DeepSeek-R1 is their reasoning model that rivals o1 — and it's fully open-source with MIT license. R1 was trained using pure reinforcement learning without supervised fine-tuning, a novel approach. Both models can be self-hosted.",
      type: "Open Source",
      icon: Code,
      url: "https://github.com/deepseek-ai/DeepSeek-R1",
      strengths: ["Open-source (MIT license)", "Matches GPT-4o at 1/20th training cost", "MoE architecture", "Strong reasoning", "Self-hostable"],
      pricing: "Free (self-hosted) or API pricing"
    },
    {
      name: "Llama 3.3 / Llama 4",
      provider: "Meta",
      description: "Meta's open-weight models available for commercial use under a permissive license. Llama 3.3 70B matches GPT-4o quality on many benchmarks while being small enough to run on a single high-end GPU. Llama 4 (2025) introduces Mixture-of-Experts with a Scout model (17B active / 109B total, 10M token context) and Maverick model (17B active / 400B total). Available via Hugging Face, Together AI, Groq, Fireworks, and many cloud providers. The most popular open model family.",
      type: "Open Weight",
      icon: Code,
      url: "https://llama.meta.com/",
      strengths: ["Open weights, commercial use OK", "70B runs on single GPU", "Llama 4: 10M token context", "Massive ecosystem", "Fine-tunable"],
      pricing: "Free (self-hosted); API from $0.05/1M tokens"
    },
    {
      name: "Mistral Large / Mixtral",
      provider: "Mistral AI",
      description: "Mistral AI, a French AI lab, produces efficient open-weight models. Mixtral 8x7B uses Mixture-of-Experts — 8 expert networks with 2 active per token, giving 46.7B total parameters but only 12.9B active, matching Llama 2 70B quality at much lower cost. Mistral Large 2 is their flagship commercial model competing with GPT-4o. Mistral also released Codestral for code generation and Pixtral for vision. Known for strong multilingual performance, especially in European languages.",
      type: "MoE / Open",
      icon: Globe,
      url: "https://docs.mistral.ai/",
      strengths: ["MoE efficiency", "Strong multilingual", "Open weights available", "Code-specialized variants", "EU-based (data sovereignty)"],
      pricing: "$2 / 1M input tokens (Large 2)"
    },
    {
      name: "DALL-E 3 / Stable Diffusion 3 / Flux",
      provider: "OpenAI / Stability AI / BFL",
      description: "The three leading text-to-image paradigms. DALL-E 3 (via ChatGPT/API) excels at accurate text rendering in images and following complex prompts — it uses GPT-4 to internally rewrite prompts. Stable Diffusion 3 uses a novel MMDiT (Multimodal Diffusion Transformer) architecture and can be run locally with full control. Flux by Black Forest Labs (founded by ex-Stability AI researchers) offers the best open-source quality. All support ControlNet for guided generation and img2img for editing.",
      type: "Image Generation",
      icon: Image,
      url: "https://openai.com/dall-e-3",
      strengths: ["DALL-E 3: best text rendering", "SD3: open-source, local deployment", "Flux: best open quality", "LoRA fine-tuning", "ControlNet support"],
      pricing: "DALL-E 3: $0.04/image; SD3: free (self-hosted)"
    },
    {
      name: "Whisper / ElevenLabs / Suno",
      provider: "OpenAI / ElevenLabs / Suno AI",
      description: "Audio AI spans speech-to-text, text-to-speech, and music generation. OpenAI Whisper is the gold standard for speech recognition — open-source, supports 99 languages, handles accents and background noise. ElevenLabs leads text-to-speech with hyper-realistic voice cloning from 30 seconds of audio, supporting 29 languages with emotional control. Suno v4 generates full songs with vocals — specify genre, mood, lyrics, and structure to get radio-quality output in seconds.",
      type: "Audio AI",
      icon: Music,
      url: "https://openai.com/research/whisper",
      strengths: ["Whisper: 99 languages, open-source", "ElevenLabs: 30-second voice cloning", "Suno v4: full song generation", "Real-time TTS streaming"],
      pricing: "Whisper: free (local); ElevenLabs: from $5/mo"
    },
    {
      name: "Sora / Runway Gen-3 / Veo 2",
      provider: "OpenAI / Runway / Google",
      description: "Video generation AI creates clips from text or images. OpenAI's Sora generates photorealistic videos using a diffusion transformer that understands 3D consistency and physics. Runway Gen-3 Alpha is used in professional film production — supports motion brush, camera control, and style references. Google's Veo 2 generates 4K videos with cinematic quality and strong prompt adherence. Key challenges remain: temporal consistency, physics accuracy, and long-form generation beyond 30 seconds.",
      type: "Video Generation",
      icon: Eye,
      url: "https://openai.com/sora",
      strengths: ["Sora: best physics understanding", "Runway: professional film tools", "Veo 2: 4K cinematic quality", "Image-to-video supported"],
      pricing: "Runway: from $12/mo; Sora: ChatGPT Plus"
    },
  ];

  const benchmarkComparison = [
    { benchmark: "MMLU (Knowledge)", gpt4o: "88.7%", claude: "88.3%", gemini: "90.0%", llama: "86.0%", deepseek: "88.5%" },
    { benchmark: "HumanEval (Coding)", gpt4o: "90.2%", claude: "92.0%", gemini: "84.0%", llama: "81.7%", deepseek: "91.6%" },
    { benchmark: "MATH (Math)", gpt4o: "76.6%", claude: "71.1%", gemini: "83.6%", llama: "68.0%", deepseek: "79.8%" },
    { benchmark: "Context Window", gpt4o: "128K", claude: "200K", gemini: "1M+", llama: "128K", deepseek: "128K" },
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
            A comprehensive, real guide to every major AI model — capabilities, pricing, benchmarks, and when to use each one. Based on official documentation and published benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
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
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-sm"><span className="font-semibold text-foreground">Pricing:</span> <span className="text-muted-foreground">{model.pricing}</span></p>
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

        {/* Benchmark Comparison Table */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white mb-12">
          <h3 className="text-2xl font-bold mb-6">Model Benchmark Comparison (2025)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300">Benchmark</th>
                  <th className="text-center py-3 px-4">GPT-4o</th>
                  <th className="text-center py-3 px-4">Claude 3.5</th>
                  <th className="text-center py-3 px-4">Gemini 2.5</th>
                  <th className="text-center py-3 px-4">Llama 3.3</th>
                  <th className="text-center py-3 px-4">DeepSeek V3</th>
                </tr>
              </thead>
              <tbody>
                {benchmarkComparison.map((row, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-300">{row.benchmark}</td>
                    <td className="text-center py-3 px-4">{row.gpt4o}</td>
                    <td className="text-center py-3 px-4">{row.claude}</td>
                    <td className="text-center py-3 px-4">{row.gemini}</td>
                    <td className="text-center py-3 px-4">{row.llama}</td>
                    <td className="text-center py-3 px-4">{row.deepseek}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-4">* Benchmarks from official publications and independent evaluations. Results may vary with prompt engineering and task-specific tuning.</p>
        </div>

        {/* How to Choose */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">How to Choose the Right Model</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { use: "General chatbot / assistant", pick: "GPT-4o-mini or Claude 3.5 Haiku", why: "Best cost/quality ratio for everyday tasks" },
              { use: "Complex coding tasks", pick: "Claude 3.5 Sonnet or DeepSeek R1", why: "Top coding benchmarks, strong at debugging" },
              { use: "Long document analysis", pick: "Gemini 2.5 Pro (1M context)", why: "Process entire codebases or book-length documents" },
              { use: "Math / science reasoning", pick: "o3 or DeepSeek R1", why: "Chain-of-thought reasoning for complex problems" },
              { use: "Data privacy / self-hosting", pick: "Llama 3.3 70B or Mistral", why: "Open weights, deploy on your own infrastructure" },
              { use: "Image generation", pick: "DALL-E 3 (quality) or Flux (open)", why: "Best text rendering vs best open-source quality" },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4">
                <h4 className="font-bold mb-1">{item.use}</h4>
                <p className="text-sm font-semibold text-blue-200 mb-1">→ {item.pick}</p>
                <p className="text-xs text-white/70">{item.why}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
