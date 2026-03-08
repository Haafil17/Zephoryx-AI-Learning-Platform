import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, ChevronRight, BookOpen, Workflow, Repeat, ArrowRightLeft, BarChart3, Layers, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const DeepLearningTopics = () => {
  const concepts = [
    {
      title: "Transformer Architecture",
      description: "The Transformer ('Attention is All You Need', Vaswani et al., 2017) replaced RNNs as the dominant architecture. It uses self-attention to process all tokens in parallel, computing attention scores between every pair of positions. Multi-head attention allows the model to attend to different aspects simultaneously. The architecture consists of an encoder (for understanding) and decoder (for generation), though modern LLMs often use decoder-only (GPT) or encoder-only (BERT) variants.",
      icon: Workflow,
      keyPoints: ["Self-attention: O(n²) complexity with sequence length", "Multi-head attention: 8-128 parallel attention heads", "Positional encoding: sinusoidal or rotary (RoPE)"],
      realWorld: "GPT-4, Claude, Gemini, Llama — all based on transformers. BERT powers Google Search ranking.",
      learnMoreUrl: "https://arxiv.org/abs/1706.03762"
    },
    {
      title: "LSTM & GRU (Recurrent Networks)",
      description: "Long Short-Term Memory (LSTM, Hochreiter & Schmidhuber, 1997) solved the vanishing gradient problem in RNNs with a gating mechanism: forget gate (what to discard), input gate (what to store), and output gate (what to output). GRU (Gated Recurrent Unit) simplified LSTM to two gates (reset and update), achieving similar performance with fewer parameters. While largely replaced by transformers for NLP, LSTMs remain relevant for time series, audio processing, and resource-constrained settings.",
      icon: Repeat,
      keyPoints: ["LSTM: 3 gates (forget, input, output) + cell state", "GRU: 2 gates (reset, update) — simpler, often equally effective", "Bidirectional variants process sequences in both directions"],
      realWorld: "Google used LSTMs for Google Translate before transformers. Apple uses LSTMs in Siri. Stock prediction models often use LSTM/GRU.",
      learnMoreUrl: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/"
    },
    {
      title: "Attention Mechanisms",
      description: "Attention allows models to focus on relevant parts of the input. Bahdanau attention (2014) was the first to apply attention to seq2seq models. Scaled dot-product attention is the core of transformers. Flash Attention (Dao, 2022) makes attention computation memory-efficient through tiling and recomputation, enabling longer context windows. Multi-Query Attention (MQA) and Grouped-Query Attention (GQA) reduce KV cache memory for faster inference.",
      icon: Sparkles,
      keyPoints: ["Q, K, V: Query, Key, Value matrices from input", "Flash Attention: 2-4x speedup, exact computation", "GQA: used in Llama 2/3, balances speed and quality"],
      realWorld: "Flash Attention is used in virtually all modern LLM training. Claude, GPT-4, and Gemini use variants of efficient attention.",
      learnMoreUrl: "https://arxiv.org/abs/2205.14135"
    },
    {
      title: "Embeddings & Representation Learning",
      description: "Embeddings project high-dimensional discrete data (words, images, users) into dense continuous vector spaces. Word2Vec and GloVe learn static word embeddings. BERT and GPT produce contextual embeddings. Contrastive learning (SimCLR, CLIP) learns representations by pulling similar pairs together and pushing dissimilar pairs apart. Embeddings enable similarity search, clustering, recommendation, and transfer learning across modalities.",
      icon: Layers,
      keyPoints: ["Embedding dimensions: typically 256-4096", "Contrastive loss: InfoNCE, triplet loss, cosine similarity", "Matryoshka embeddings: variable-dimension representations"],
      realWorld: "OpenAI text-embedding-3 powers RAG systems. Spotify uses audio embeddings for music discovery. Airbnb uses listing embeddings for search.",
      learnMoreUrl: "https://openai.com/index/new-embedding-models-and-api-updates/"
    },
    {
      title: "Regression & Loss Functions",
      description: "Loss functions measure the difference between model predictions and ground truth, driving the learning process. MSE (Mean Squared Error) for regression, Cross-Entropy for classification, and specialized losses like Focal Loss (for class imbalance), Contrastive Loss, and RLHF reward losses. Linear regression, logistic regression, and polynomial regression remain fundamental ML techniques. Understanding gradient descent, learning rate schedules, and optimization (Adam, AdamW) is essential.",
      icon: BarChart3,
      keyPoints: ["Adam optimizer: adaptive learning rates per parameter", "Learning rate warmup + cosine decay schedule", "Weight decay (L2 regularization) prevents overfitting"],
      realWorld: "AdamW is the default optimizer for transformer training. Cosine learning rate schedules are used by virtually all LLM training runs.",
      learnMoreUrl: "https://d2l.ai/chapter_optimization/"
    },
    {
      title: "Transfer Learning & Foundation Models",
      description: "Transfer learning uses knowledge from a pre-trained model for new tasks. Foundation models (GPT-4, CLIP, SAM) are trained on massive datasets and can be adapted to many downstream tasks. The paradigm shift: instead of training task-specific models, we fine-tune or prompt general-purpose models. Key techniques: feature extraction (freeze base, train head), fine-tuning (update all or some layers), and in-context learning (no weight updates, just prompting).",
      icon: ArrowRightLeft,
      keyPoints: ["Pre-train on large data, fine-tune on task data", "Foundation models: one model, many tasks", "Emergent abilities appear at scale (>100B parameters)"],
      realWorld: "ImageNet-pretrained CNNs power medical imaging. GPT-4 is a foundation model used for 1000s of applications via API.",
      learnMoreUrl: "https://arxiv.org/abs/2108.07258"
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200 border-0 px-4 py-1.5">
            <Brain className="w-4 h-4 mr-1" /> Neural Network Architectures
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Deep Learning Foundations
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Transformers, LSTMs, GRUs, attention mechanisms, embeddings, and the architectures that power modern AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                    <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-md">
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
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-sm"><span className="font-semibold text-foreground">Real-World:</span> <span className="text-muted-foreground">{concept.realWorld}</span></p>
                  </div>
                  <Button variant="ghost" className="w-full justify-between text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/30" onClick={() => window.open(concept.learnMoreUrl, '_blank', 'noopener,noreferrer')}>
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
