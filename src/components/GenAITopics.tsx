import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Image, FileText, Mic, ChevronRight, BookOpen, Video as VideoIcon, Wand2, Layers, Cpu, Paintbrush, Clapperboard } from "lucide-react";
import { motion } from "framer-motion";

export const GenAITopics = () => {
  const concepts = [
    {
      title: "What is Generative AI?",
      description: "Generative AI refers to AI systems that create new content — text, images, audio, video, code, and 3D models — rather than just analyzing or classifying existing data. It's powered by foundation models (large neural networks pre-trained on massive datasets) that learn the statistical patterns of their training data and can generate novel outputs. The field exploded in 2022-2023 with ChatGPT, DALL-E, Stable Diffusion, and Midjourney, fundamentally changing how content is created.",
      icon: Sparkles,
      keyPoints: [
        "Foundation models learn patterns from billions of examples, then generate new content",
        "Key architectures: Transformers (text), Diffusion Models (images), GANs (images/video)",
        "The market is projected to reach $1.3 trillion by 2032 (Bloomberg Intelligence)"
      ],
      learnMoreUrl: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier"
    },
    {
      title: "Transformer Architecture",
      description: "The Transformer (Vaswani et al., 2017 — 'Attention Is All You Need') is the foundation of modern generative AI. It uses self-attention mechanisms to process entire sequences in parallel, unlike RNNs which process sequentially. Key components: Multi-Head Attention (learns different relationship types), Positional Encoding (captures word order), Feed-Forward Networks, and Layer Normalization. GPT uses decoder-only transformers (autoregressive, next-token prediction). BERT uses encoder-only. T5 uses encoder-decoder.",
      icon: Cpu,
      keyPoints: [
        "Self-attention allows each token to attend to every other token in the sequence",
        "GPT = decoder-only (generation), BERT = encoder-only (understanding), T5 = encoder-decoder",
        "Scaling laws (Kaplan et al., 2020): larger models + more data = predictably better performance"
      ],
      learnMoreUrl: "https://arxiv.org/abs/1706.03762"
    },
    {
      title: "Large Language Models (LLMs)",
      description: "LLMs are transformer-based models trained on trillions of tokens of text data. The training process has two phases: (1) Pre-training — unsupervised next-token prediction on massive corpora (web text, books, code). This creates a base model with broad knowledge. (2) Post-training — supervised fine-tuning (SFT) on high-quality instruction-response pairs, then Reinforcement Learning from Human Feedback (RLHF) or Direct Preference Optimization (DPO) to align the model with human preferences. This produces a chat model.",
      icon: FileText,
      keyPoints: [
        "Pre-training cost: GPT-4 estimated at $100M+, Llama 3.1 405B at ~$30M",
        "RLHF/DPO alignment: humans rank model outputs to teach helpfulness and safety",
        "Emergent abilities appear at scale: in-context learning, chain-of-thought reasoning"
      ],
      learnMoreUrl: "https://arxiv.org/abs/2303.18223"
    },
    {
      title: "Diffusion Models for Image Generation",
      description: "Diffusion models (Ho et al., 2020) generate images by learning to reverse a noise-adding process. Training: gradually add Gaussian noise to images until they become pure noise. Generation: start with random noise and iteratively denoise it into a coherent image, guided by a text prompt (via CLIP or T5 text encoders). Stable Diffusion uses a Latent Diffusion architecture — operating in a compressed latent space rather than pixel space, making it much faster. DALL-E 3 uses a similar approach with better prompt adherence.",
      icon: Image,
      keyPoints: [
        "Forward process: image → noise (training). Reverse process: noise → image (generation)",
        "Latent diffusion operates in compressed space (64x64 latent vs 512x512 pixels)",
        "Classifier-Free Guidance (CFG) controls how closely the image follows the prompt"
      ],
      learnMoreUrl: "https://arxiv.org/abs/2006.11239"
    },
    {
      title: "Text-to-Image: DALL-E, Midjourney, Flux",
      description: "The three leading text-to-image systems each have distinct strengths. DALL-E 3 (OpenAI) excels at accurate text rendering in images and following complex prompts — it rewrites prompts internally using GPT-4 for better results. Midjourney v6 produces the most aesthetically pleasing, artistic outputs — popular with designers and artists. Flux by Black Forest Labs (from ex-Stability AI founders) offers the best open-source quality. Stable Diffusion 3 supports fine-tuning and local deployment for privacy.",
      icon: Paintbrush,
      keyPoints: [
        "DALL-E 3: best text-in-image rendering, integrated with ChatGPT for iterative editing",
        "Midjourney v6: highest aesthetic quality, strong at artistic styles and photorealism",
        "Flux/SD3: open-source, can run locally, supports LoRA fine-tuning for custom styles"
      ],
      learnMoreUrl: "https://openai.com/dall-e-3"
    },
    {
      title: "AI Video Generation",
      description: "Video generation AI creates clips from text prompts or images. OpenAI's Sora generates photorealistic videos up to 60 seconds using a diffusion transformer architecture that understands 3D space and physics. Runway Gen-3 Alpha offers professional video editing and generation tools used in Hollywood productions. Google's Veo 2 generates 4K videos with cinematic quality. Kling by Kuaishou and Pika Labs are strong competitors. The technology uses temporal attention to maintain consistency across frames.",
      icon: Clapperboard,
      keyPoints: [
        "Sora uses spacetime patches — treating video as sequences of 3D patches, not frame-by-frame",
        "Runway Gen-3 Alpha: used in actual film production, supports motion brush and camera control",
        "Key challenge: temporal consistency — maintaining coherent objects and physics across frames"
      ],
      learnMoreUrl: "https://openai.com/sora"
    },
    {
      title: "Voice & Audio AI",
      description: "AI audio generation has reached human-level quality. ElevenLabs leads in voice cloning — it can replicate any voice from a few seconds of audio and generates speech with natural emotions, pacing, and inflections. OpenAI's text-to-speech API offers 6 natural voices. For music, Suno v4 generates full songs with vocals from text descriptions — specify genre, mood, tempo, and lyrics. Udio focuses on production quality. Google's MusicLM and Meta's MusicGen are research-oriented alternatives.",
      icon: Mic,
      keyPoints: [
        "ElevenLabs: voice cloning from 30 seconds of audio, 29 languages, emotional control",
        "Suno v4: generates radio-quality songs with vocals, multiple genres, from text prompts",
        "OpenAI Whisper: best open-source speech-to-text, supports 99 languages"
      ],
      learnMoreUrl: "https://elevenlabs.io/"
    },
    {
      title: "Fine-Tuning & Customization",
      description: "Fine-tuning adapts a pre-trained model to a specific domain or task. Full fine-tuning updates all model weights — expensive and requires lots of data. LoRA (Low-Rank Adaptation) freezes the base model and trains small adapter layers — 100x cheaper, can be done on a single GPU. QLoRA combines LoRA with 4-bit quantization for even lower memory usage. For images, DreamBooth fine-tunes diffusion models on 5-20 images to learn a specific subject (person, product, style). Textual Inversion learns new 'concepts' as embeddings.",
      icon: Wand2,
      keyPoints: [
        "LoRA: train 0.1% of parameters, achieve 90%+ of full fine-tuning quality",
        "QLoRA: fine-tune a 70B model on a single 48GB GPU using 4-bit quantization",
        "DreamBooth: teach a diffusion model a new subject from just 5-20 images"
      ],
      learnMoreUrl: "https://huggingface.co/docs/peft/main/en/index"
    },
    {
      title: "Multimodal AI",
      description: "Multimodal models process and generate multiple data types (text, images, audio, video) in a unified architecture. GPT-4o is natively multimodal — it processes text, images, and audio in a single model, not separate pipelines. Gemini 2.5 Pro handles text, images, video, and audio with a 1M+ token context window. Meta's ImageBind links 6 modalities (text, image, audio, depth, thermal, IMU) in a shared embedding space. The trend is toward unified models that handle all modalities natively.",
      icon: Layers,
      keyPoints: [
        "GPT-4o: native multimodal — text, vision, audio in one model with low latency",
        "Gemini 2.5: processes video natively (not frame-by-frame), 1M+ token context",
        "Vision-Language Models (VLMs): connect image encoders to LLMs for visual understanding"
      ],
      learnMoreUrl: "https://ai.google.dev/gemini-api/docs"
    },
    {
      title: "Synthetic Data Generation",
      description: "Synthetic data is AI-generated data used to train other AI models, augment small datasets, or protect privacy. LLMs generate synthetic text for training classifiers, chatbots, and evaluation datasets. Diffusion models generate synthetic images for computer vision training — especially useful for rare edge cases. NVIDIA's Omniverse generates synthetic 3D environments for robotics and autonomous driving. Gretel.ai specializes in generating privacy-safe synthetic tabular data that preserves statistical properties.",
      icon: Sparkles,
      keyPoints: [
        "Alpaca, Orca, Phi datasets: high-quality synthetic data used to train smaller models",
        "Synthetic data can introduce or amplify biases — validation against real data is critical",
        "NVIDIA Omniverse: generates photorealistic synthetic training data for robotics"
      ],
      learnMoreUrl: "https://gretel.ai/"
    },
  ];

  const resources = [
    { name: "Attention Is All You Need", desc: "The original Transformer paper (Vaswani et al., 2017)", url: "https://arxiv.org/abs/1706.03762" },
    { name: "Hugging Face Course", desc: "Free, comprehensive NLP and generative AI course", url: "https://huggingface.co/learn" },
    { name: "Andrej Karpathy - Let's Build GPT", desc: "Build a GPT from scratch in code — best LLM tutorial", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY" },
    { name: "Stable Diffusion from Scratch", desc: "Understanding diffusion models step by step", url: "https://jalammar.github.io/illustrated-stable-diffusion/" },
    { name: "Google Generative AI Learning Path", desc: "Free courses on GenAI fundamentals and applications", url: "https://www.cloudskillsboost.google/paths/118" },
    { name: "DeepLearning.AI Short Courses", desc: "Free short courses by Andrew Ng on GenAI topics", url: "https://www.deeplearning.ai/short-courses/" },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200 border-0 px-4 py-1.5">
            <Sparkles className="w-4 h-4 mr-1" /> The AI Revolution
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Generative AI Deep Dive
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From transformer architecture to diffusion models, voice cloning to video generation — understand the technology behind the AI revolution with real research and documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {concepts.map((concept, i) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/90 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
                      <concept.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-display">{concept.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {concept.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Points:</h4>
                    <ul className="space-y-1.5">
                      {concept.keyPoints.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/30"
                    onClick={() => window.open(concept.learnMoreUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Read Research / Docs</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* GenAI Timeline */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white mb-12">
          <h3 className="text-2xl font-bold mb-6">Generative AI Timeline: Key Milestones</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { year: "2017", event: "Transformer Architecture", detail: "Vaswani et al. publish 'Attention Is All You Need'" },
              { year: "2020", event: "GPT-3 Launch", detail: "175B parameter model demonstrates few-shot learning" },
              { year: "2022", event: "ChatGPT & Stable Diffusion", detail: "Generative AI goes mainstream with consumer products" },
              { year: "2023", event: "GPT-4 & Multimodal", detail: "Models become natively multimodal (text + vision + audio)" },
              { year: "2024", event: "Video Generation", detail: "Sora, Runway Gen-3, and Kling generate realistic video" },
              { year: "2024", event: "Open-Source Catches Up", detail: "Llama 3.1 405B matches GPT-4 on many benchmarks" },
              { year: "2025", event: "Reasoning Models", detail: "o1, o3, DeepSeek R1 bring chain-of-thought to production" },
              { year: "2025", event: "Agentic AI", detail: "AI systems that plan, use tools, and complete tasks autonomously" },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4">
                <Badge className="mb-2 bg-purple-600 text-white border-0">{item.year}</Badge>
                <h4 className="font-bold text-lg mb-1">{item.event}</h4>
                <p className="text-sm text-white/70">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">Essential Generative AI Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((r) => (
              <button
                key={r.name}
                onClick={() => window.open(r.url, '_blank', 'noopener,noreferrer')}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/20 transition-colors"
              >
                <h4 className="font-bold text-lg mb-1">{r.name}</h4>
                <p className="text-sm text-white/80">{r.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
