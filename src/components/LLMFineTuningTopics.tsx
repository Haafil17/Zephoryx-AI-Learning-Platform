import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, ChevronRight, BookOpen, Cpu, Layers, Zap, Target, Database, GitMerge, FlaskConical, Scale, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const LLMFineTuningTopics = () => {
  const concepts = [
    {
      title: "What is Fine-Tuning?",
      description: "Fine-tuning adapts a pre-trained language model to a specific task or domain by training it on a smaller, task-specific dataset. Unlike prompting, fine-tuning modifies the model's weights, allowing it to learn new patterns, styles, and domain knowledge. This is essential when prompt engineering alone can't achieve the desired output quality, format consistency, or latency requirements.",
      icon: Settings,
      keyPoints: ["Transfer learning from billion-parameter base models", "Requires 100–100K+ high-quality examples", "Reduces inference cost by eliminating long prompts"],
      realWorld: "OpenAI fine-tuning API lets companies create custom GPT models. Bloomberg trained BloombergGPT on financial data.",
      learnMoreUrl: "https://platform.openai.com/docs/guides/fine-tuning"
    },
    {
      title: "LoRA & QLoRA",
      description: "Low-Rank Adaptation (LoRA) freezes the original model weights and injects small trainable matrices into transformer layers. This dramatically reduces memory and compute requirements — training only 0.1-1% of parameters while achieving near-full fine-tuning quality. QLoRA combines LoRA with 4-bit quantization, enabling fine-tuning of 65B+ parameter models on a single GPU. These techniques democratized LLM customization.",
      icon: Layers,
      keyPoints: ["LoRA trains <1% of total parameters", "QLoRA uses 4-bit NormalFloat quantization", "Adapters can be swapped without reloading the base model"],
      realWorld: "Hugging Face PEFT library is the standard implementation. Most open-source model fine-tunes on Hugging Face use LoRA.",
      learnMoreUrl: "https://huggingface.co/docs/peft/main/en/conceptual_guides/lora"
    },
    {
      title: "RLHF & DPO",
      description: "Reinforcement Learning from Human Feedback (RLHF) trains a reward model from human preference data, then uses PPO to optimize the LLM against it. This is how ChatGPT was aligned. Direct Preference Optimization (DPO) simplifies this by directly optimizing the policy from preference pairs without training a separate reward model, making alignment more stable and accessible.",
      icon: Target,
      keyPoints: ["RLHF: SFT → Reward Model → PPO optimization", "DPO eliminates the reward model training step", "ORPO combines SFT and alignment in one step"],
      realWorld: "InstructGPT/ChatGPT used RLHF. Zephyr-7B used DPO. Meta's Llama 2 Chat used RLHF with rejection sampling.",
      learnMoreUrl: "https://arxiv.org/abs/2305.18290"
    },
    {
      title: "Training Data Preparation",
      description: "Fine-tuning quality is entirely dependent on data quality. Instruction-following datasets need clear input-output pairs in consistent formats (Alpaca, ShareGPT, ChatML). Data cleaning involves removing duplicates, filtering low-quality examples, and ensuring diversity. Synthetic data generation using stronger models (GPT-4 generating training data for smaller models) has become a key technique.",
      icon: Database,
      keyPoints: ["Alpaca format: instruction, input, output fields", "Data quality > data quantity — 1K great examples beats 100K poor ones", "Decontamination prevents benchmark leakage"],
      realWorld: "Stanford Alpaca used GPT-3.5 to generate 52K instruction examples. Orca used GPT-4 reasoning traces for training.",
      learnMoreUrl: "https://huggingface.co/docs/trl/main/en/sft_trainer"
    },
    {
      title: "Training Infrastructure",
      description: "Fine-tuning requires understanding GPU memory management, batch sizes, learning rates, and distributed training. Key tools: Hugging Face Transformers + TRL for training, Weights & Biases for experiment tracking, DeepSpeed/FSDP for multi-GPU training, and vLLM/TGI for serving. Cloud options include Lambda Labs, RunPod, and major cloud providers with A100/H100 GPUs.",
      icon: Cpu,
      keyPoints: ["A100 80GB can fine-tune 7B models with LoRA", "Gradient accumulation enables larger effective batch sizes", "Mixed precision (bf16) halves memory with minimal quality loss"],
      realWorld: "Axolotl framework simplifies fine-tuning configuration. Together.ai offers serverless fine-tuning APIs.",
      learnMoreUrl: "https://github.com/OpenAccess-AI-Collective/axolotl"
    },
    {
      title: "Evaluation & Deployment",
      description: "Evaluating fine-tuned models requires both automated benchmarks (MMLU, HumanEval, MT-Bench) and human evaluation. Key metrics include perplexity, task-specific accuracy, and preference ratings. For deployment, models are typically quantized (GGUF, AWQ, GPTQ) for inference efficiency and served via vLLM, TGI, or Ollama. A/B testing against base models validates improvement.",
      icon: Zap,
      keyPoints: ["MT-Bench uses GPT-4 as an automated judge", "GGUF quantization enables local inference on consumer hardware", "Merge techniques (TIES, DARE) combine multiple fine-tunes"],
      realWorld: "Open LLM Leaderboard ranks fine-tuned models. TheBloke on Hugging Face provides quantized versions of popular models.",
      learnMoreUrl: "https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard"
    },
    {
      title: "Model Merging Techniques",
      description: "Model merging combines multiple fine-tuned models into a single model without additional training. TIES (Trim, Elect Sign, Merge) resolves parameter conflicts between models. DARE (Drop And REscale) randomly drops delta parameters before merging. SLERP (Spherical Linear Interpolation) smoothly blends two models. Task arithmetic adds and subtracts task vectors to compose capabilities. MergeKit is the standard tool for model merging, supporting all major merge methods.",
      icon: GitMerge,
      keyPoints: ["TIES: resolves sign conflicts between fine-tuned deltas", "DARE: drop 90%+ of delta params with minimal quality loss", "MergeKit: CLI tool for all merge methods, used widely on HF"],
      realWorld: "Many top Open LLM Leaderboard models are merges (e.g., Goliath-120B). Nous Research's Hermes models use careful merge strategies. Community merges often beat individual fine-tunes.",
      learnMoreUrl: "https://github.com/arcee-ai/mergekit"
    },
    {
      title: "Synthetic Data Generation",
      description: "Synthetic data is artificially generated training data, often produced by stronger models to train weaker ones. Self-Instruct (Wang et al., 2022) uses the model itself to generate instruction-following data. Evol-Instruct (WizardLM) iteratively increases instruction complexity. Distillation generates reasoning traces from GPT-4/Claude to train open-source models. Key concerns: model collapse from training on AI-generated data, benchmark contamination, and the legal/licensing implications of using model outputs as training data.",
      icon: FlaskConical,
      keyPoints: ["Self-Instruct: bootstrap from 175 seed tasks to 52K examples", "Evol-Instruct: in-depth and in-breadth evolution of instructions", "Model collapse risk when training on too much synthetic data"],
      realWorld: "Microsoft's Orca used GPT-4 reasoning traces. Phi models trained on 'textbook-quality' synthetic data. Alpaca used 52K examples from text-davinci-003.",
      learnMoreUrl: "https://arxiv.org/abs/2212.10560"
    },
    {
      title: "Constitutional AI & RLAIF",
      description: "Constitutional AI (Anthropic, 2022) replaces human feedback with AI feedback guided by a set of principles ('constitution'). The model critiques and revises its own outputs according to these principles, then trains on the improved responses. RLAIF (Reinforcement Learning from AI Feedback) generalizes this — using an AI model as the reward signal instead of human annotators. This scales alignment beyond what human annotation budgets allow while maintaining controllable behavior through explicit principles.",
      icon: Scale,
      keyPoints: ["Constitution: set of principles the AI must follow", "Self-critique: model identifies its own harmful outputs", "Scales alignment without proportional human labor"],
      realWorld: "Anthropic uses Constitutional AI for Claude. Google's RLAIF showed AI feedback can match human feedback quality. Open-source implementations in TRL library.",
      learnMoreUrl: "https://arxiv.org/abs/2212.08073"
    },
    {
      title: "Continued Pre-Training & Domain Adaptation",
      description: "Continued pre-training extends a foundation model's knowledge by training on domain-specific corpora before instruction fine-tuning. This is how domain-specific LLMs are created — training Llama on medical literature (Med-PaLM), legal documents (SaulLM), code (CodeLlama), or financial data (FinGPT). The recipe: base model → continued pre-training on domain text → SFT on domain instructions → alignment. Key: careful learning rate scheduling to avoid catastrophic forgetting of general capabilities.",
      icon: Sparkles,
      keyPoints: ["Learning rate 10-100x lower than original pre-training", "Replay buffer: mix domain data with general data to prevent forgetting", "Domain vocabulary extension improves tokenization efficiency"],
      realWorld: "CodeLlama: continued pre-training of Llama 2 on 500B code tokens. BioMistral trained on PubMed for biomedical NLP. SaulLM-7B trained on 30B tokens of legal text.",
      learnMoreUrl: "https://arxiv.org/abs/2308.12950"
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200 border-0 px-4 py-1.5">
            <Settings className="w-4 h-4 mr-1" /> Model Customization
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            LLM Fine-Tuning
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Customize language models for your specific use case — from LoRA adapters to RLHF alignment and production deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {concepts.map((concept, i) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/90 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-md">
                      <concept.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-display">{concept.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">{concept.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Points:</h4>
                    <ul className="space-y-1.5">
                      {concept.keyPoints.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-sm"><span className="font-semibold text-foreground">Real-World:</span> <span className="text-muted-foreground">{concept.realWorld}</span></p>
                  </div>
                  <Button variant="ghost" className="w-full justify-between text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/30" onClick={() => window.open(concept.learnMoreUrl, '_blank', 'noopener,noreferrer')}>
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Read Research / Docs</span>
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
