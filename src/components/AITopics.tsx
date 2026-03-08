import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, ChevronRight, BookOpen, Layers, Eye, Cpu, FileText, GitBranch, Network, Shield, Lightbulb, Target } from "lucide-react";
import { motion } from "framer-motion";

export const AITopics = () => {
  const concepts = [
    {
      title: "What is Artificial Intelligence?",
      description: "Artificial Intelligence is the science of building systems that can perform tasks normally requiring human intelligence: understanding language, recognizing patterns, making decisions, and learning from experience. Modern AI is dominated by machine learning — systems that improve from data rather than explicit programming. The field was founded at the Dartmouth Conference (1956) by McCarthy, Minsky, and others. Today's AI renaissance is driven by three factors: massive datasets, powerful GPUs, and breakthrough algorithms (especially transformers).",
      icon: Brain,
      keyPoints: [
        "Narrow AI (today): excels at specific tasks — chess, image recognition, language",
        "General AI (AGI): human-level reasoning across all domains — not yet achieved",
        "Modern AI = mostly machine learning, especially deep learning with neural networks"
      ],
      learnMoreUrl: "https://stanford.edu/~shervine/teaching/cs-229/"
    },
    {
      title: "Machine Learning Fundamentals",
      description: "Machine learning (ML) is a subset of AI where systems learn patterns from data. Three main paradigms: (1) Supervised Learning — learn from labeled examples (input → output). Used for classification (spam/not spam) and regression (predict house price). (2) Unsupervised Learning — find patterns in unlabeled data. Used for clustering and dimensionality reduction. (3) Reinforcement Learning — learn by trial-and-error with rewards. Used for game playing and robotics. Key algorithms: linear regression, decision trees, random forests, SVMs, k-means.",
      icon: Target,
      keyPoints: [
        "Supervised: labeled data → predict outputs (classification, regression)",
        "Unsupervised: unlabeled data → discover structure (clustering, PCA)",
        "Reinforcement: agent learns through reward signals (games, robotics, RLHF)"
      ],
      learnMoreUrl: "https://www.coursera.org/learn/machine-learning"
    },
    {
      title: "Neural Networks & Deep Learning",
      description: "Neural networks are inspired by the brain — layers of interconnected 'neurons' that transform inputs into outputs. Deep learning uses networks with many layers (hence 'deep'). Each layer learns progressively more abstract features: edges → textures → objects → scenes. Key architectures: CNNs (Convolutional Neural Networks) for images, RNNs/LSTMs for sequences, Transformers for everything (text, images, audio). Training uses backpropagation and gradient descent to minimize a loss function.",
      icon: Network,
      keyPoints: [
        "Backpropagation: compute gradients layer by layer to update weights",
        "CNNs: convolutional filters detect spatial features in images",
        "Transformers: self-attention mechanism replaced RNNs for sequence tasks"
      ],
      learnMoreUrl: "https://www.deeplearningbook.org/"
    },
    {
      title: "Computer Vision",
      description: "Computer vision enables machines to interpret visual data. Modern CV is powered by deep learning — especially CNNs and Vision Transformers (ViT). Key tasks: Image Classification (what's in this image?), Object Detection (where are the objects? — YOLO, Faster R-CNN), Semantic Segmentation (label every pixel), Instance Segmentation (separate individual objects). Recent advances: CLIP (OpenAI) connects images and text in a shared embedding space, enabling zero-shot classification and text-to-image search.",
      icon: Eye,
      keyPoints: [
        "YOLO (You Only Look Once): real-time object detection — detects objects in one pass",
        "Vision Transformers (ViT): apply transformer architecture to image patches",
        "CLIP: learns visual concepts from natural language — zero-shot image classification"
      ],
      learnMoreUrl: "https://opencv.org/"
    },
    {
      title: "Natural Language Processing (NLP)",
      description: "NLP enables computers to understand and generate human language. Pre-transformer NLP used word embeddings (Word2Vec, GloVe) and RNNs. The transformer revolution (2017-present) changed everything: BERT (2018) introduced bidirectional understanding for tasks like question answering and classification. GPT (2018-2024) showed that autoregressive language modeling scales to human-level text generation. Modern NLP tasks: sentiment analysis, named entity recognition, machine translation, text summarization, question answering, and dialogue.",
      icon: FileText,
      keyPoints: [
        "BERT: bidirectional encoder for understanding — pre-train then fine-tune on tasks",
        "GPT: autoregressive decoder for generation — next-token prediction at massive scale",
        "Tokenization: BPE (Byte Pair Encoding) splits text into subword tokens for the model"
      ],
      learnMoreUrl: "https://huggingface.co/learn/nlp-course/chapter1/1"
    },
    {
      title: "Reinforcement Learning",
      description: "Reinforcement Learning (RL) trains agents to make decisions by maximizing cumulative rewards through trial and error. The agent observes a state, takes an action, receives a reward, and updates its policy. Key algorithms: Q-Learning (value-based), Policy Gradient (directly optimize the policy), PPO (Proximal Policy Optimization — used in RLHF for LLMs). Famous successes: AlphaGo (beat world champion at Go), AlphaFold (predicted protein structures), and RLHF (aligning ChatGPT with human preferences).",
      icon: GitBranch,
      keyPoints: [
        "PPO (Proximal Policy Optimization): the algorithm behind RLHF in ChatGPT",
        "AlphaGo/AlphaZero: superhuman performance in Go, Chess, and Shogi via self-play",
        "AlphaFold: solved protein structure prediction — Nobel Prize-worthy impact"
      ],
      learnMoreUrl: "https://spinningup.openai.com/en/latest/"
    },
    {
      title: "AI Ethics, Bias & Fairness",
      description: "AI systems can perpetuate and amplify societal biases present in training data. Key concerns: hiring algorithms discriminating against women (Amazon, 2018), facial recognition performing poorly on darker skin tones (Gender Shades study by Buolamwini & Gebru), and LLMs generating harmful stereotypes. Mitigation approaches: diverse training data, bias auditing, fairness metrics (demographic parity, equalized odds), interpretability tools (SHAP, LIME), and governance frameworks (EU AI Act, NIST AI RMF).",
      icon: Shield,
      keyPoints: [
        "EU AI Act (2024): first comprehensive AI regulation — risk-based classification system",
        "SHAP & LIME: explain individual model predictions for transparency",
        "Responsible AI: fairness, accountability, transparency, ethics (FATE framework)"
      ],
      learnMoreUrl: "https://www.partnershiponai.org/"
    },
    {
      title: "AI in Healthcare & Science",
      description: "AI is transforming medicine and scientific research. Medical imaging: AI detects cancer in radiology scans with accuracy matching or exceeding human radiologists (Google Health, 2020). Drug discovery: AlphaFold predicted the 3D structure of virtually all known proteins — a problem that took biologists decades. AI also accelerates clinical trials, personalized treatment plans, and epidemic prediction. In materials science, GNoME (Google DeepMind) discovered 2.2 million new stable crystal structures.",
      icon: Lightbulb,
      keyPoints: [
        "AlphaFold: predicted 200M+ protein structures — revolutionized biology",
        "GNoME: discovered 2.2M new materials using graph neural networks",
        "FDA has approved 500+ AI/ML-enabled medical devices as of 2024"
      ],
      learnMoreUrl: "https://deepmind.google/technologies/alphafold/"
    },
    {
      title: "Transfer Learning & Foundation Models",
      description: "Transfer learning reuses knowledge from one task/domain to improve performance on another. The foundation model paradigm: pre-train a massive model on broad data (ImageNet for vision, web text for language), then fine-tune or prompt it for specific tasks. This is why GPT-4, Claude, and Gemini work so well — they transfer knowledge from trillions of tokens to any downstream task. Key concept: emergent abilities appear at scale that don't exist in smaller models (in-context learning, chain-of-thought).",
      icon: Layers,
      keyPoints: [
        "Pre-train once (expensive), fine-tune many times (cheap) — amortize training cost",
        "Emergent abilities: in-context learning, CoT reasoning appear only in large models",
        "Foundation models: one model → thousands of applications via prompting or fine-tuning"
      ],
      learnMoreUrl: "https://crfm.stanford.edu/report.html"
    },
    {
      title: "Edge AI & Model Optimization",
      description: "Edge AI runs AI models directly on devices (phones, IoT, cars) rather than in the cloud. Benefits: lower latency, offline capability, data privacy. Key techniques: Quantization (reduce precision from FP32 → INT8 → INT4, shrinking model size 4-8x), Pruning (remove unimportant weights), Knowledge Distillation (train a small 'student' model to mimic a large 'teacher' model). Apple's Core ML, Google's TensorFlow Lite, and ONNX Runtime enable on-device inference. Qualcomm and Apple have dedicated Neural Processing Units (NPUs).",
      icon: Cpu,
      keyPoints: [
        "Quantization: FP32 → INT4 reduces model size by 8x with ~1% accuracy loss",
        "Distillation: small models trained to mimic large ones (e.g., DistilBERT is 60% smaller)",
        "NPUs: dedicated AI chips in phones — Apple A17 Pro, Qualcomm Snapdragon 8 Gen 3"
      ],
      learnMoreUrl: "https://onnxruntime.ai/"
    },
  ];

  const resources = [
    { name: "Stanford CS229 - Machine Learning", desc: "Andrew Ng's foundational ML course — free lecture notes and videos", url: "https://stanford.edu/~shervine/teaching/cs-229/" },
    { name: "Fast.ai Practical Deep Learning", desc: "Top-down, practical deep learning course — code first, theory second", url: "https://course.fast.ai/" },
    { name: "3Blue1Brown Neural Networks", desc: "Beautiful visual explanations of neural networks and deep learning", url: "https://www.3blue1brown.com/topics/neural-networks" },
    { name: "Andrej Karpathy's Zero to Hero", desc: "Build neural networks from scratch in Python — by former Tesla AI director", url: "https://karpathy.ai/zero-to-hero.html" },
    { name: "DeepLearning.AI Specializations", desc: "Comprehensive deep learning courses by Andrew Ng on Coursera", url: "https://www.deeplearning.ai/" },
    { name: "Papers With Code", desc: "Browse state-of-the-art ML papers with code implementations", url: "https://paperswithcode.com/" },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border-0 px-4 py-1.5">
            <Brain className="w-4 h-4 mr-1" /> Foundations
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent mb-4">
            Artificial Intelligence Fundamentals
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From machine learning basics to neural networks, computer vision, NLP, and AI ethics — understand the complete landscape of artificial intelligence with real research and resources.
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
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md">
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
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
                    onClick={() => window.open(concept.learnMoreUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Resources */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">Essential AI Learning Resources</h3>
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
