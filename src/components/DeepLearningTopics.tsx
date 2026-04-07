import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, ChevronRight, BookOpen, Workflow, Repeat, ArrowRightLeft, BarChart3, Layers, Sparkles, Shuffle, GitBranch, Gauge, Box } from "lucide-react";
import { motion } from "framer-motion";
import { useDifficulty } from "@/contexts/DifficultyContext";

const conceptsByDifficulty = {
  beginner: [
    {
      title: "What is a Neural Network?",
      description: "Think of a neural network like a team of tiny decision-makers. Each one looks at a small piece of information and passes its opinion to the next team. Layer by layer, the network gets smarter — like a game of telephone, but each person actually makes the message better! The first layer might notice simple things (is it bright? is it dark?), and later layers combine those into complex ideas (is it a cat? is it a dog?). When the network gets it wrong, it adjusts — like studying mistakes on a test to do better next time.",
      icon: Brain,
      keyPoints: ["Layers of tiny calculators that learn from examples", "Early layers see simple things, later layers see the big picture", "It learns by making mistakes and adjusting — just like you!"],
      realWorld: "Your phone uses neural networks for face unlock, autocorrect, and photo filters.",
      learnMoreUrl: "https://www.3blue1brown.com/topics/neural-networks"
    },
    {
      title: "How AI 'Reads' Text (Transformers)",
      description: "Imagine reading a book but you can see ALL the words at once instead of one at a time. That's what a Transformer does! Older AI (like LSTM) read words one by one, like reading left to right. Transformers use a trick called 'attention' — they look at every word and figure out which other words are most related. When you read 'The cat sat on the mat because it was tired,' the Transformer knows 'it' refers to 'cat' by paying attention to context. This is what makes ChatGPT so good at understanding language!",
      icon: Workflow,
      keyPoints: ["Sees all words at once instead of one at a time", "'Attention' helps it understand which words relate to each other", "Powers ChatGPT, Claude, Gemini — all the smart AI you use"],
      realWorld: "Every AI chatbot you've used is powered by Transformers. Google Translate uses them too!",
      learnMoreUrl: "https://jalammar.github.io/illustrated-transformer/"
    },
    {
      title: "How AI Remembers Things (Memory Networks)",
      description: "Some AI needs to remember things from earlier in a conversation, like how you remember what someone said 5 minutes ago. LSTM (Long Short-Term Memory) is like giving AI a notebook — it can write important stuff down and erase unimportant stuff. GRU is a simpler version — same idea, smaller notebook. These are being replaced by Transformers for text, but they're still great for things like predicting weather or stock prices where order matters a lot.",
      icon: Repeat,
      keyPoints: ["LSTM = AI with a notebook that remembers important details", "GRU = simpler, faster version of LSTM", "Great for sequences: weather, music, stock prices"],
      realWorld: "Siri and Google Assistant used these before Transformers. Still used for predicting time-based data.",
      learnMoreUrl: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/"
    },
    {
      title: "How AI Creates Images (Diffusion)",
      description: "Imagine taking a beautiful painting and slowly adding TV static until it's just noise. Now imagine teaching a computer to reverse that process — starting from pure noise and gradually removing it to reveal a picture! That's diffusion. You type 'a cat wearing sunglasses on a beach' and the AI starts with random dots, then step by step shapes them into your requested image. It learned how to do this by studying millions of real images.",
      icon: Box,
      keyPoints: ["Starts from random noise and gradually creates an image", "Learned by studying millions of real photos and artworks", "This is how Midjourney, DALL-E, and Stable Diffusion work"],
      realWorld: "Midjourney, DALL-E 3, and Stable Diffusion all use diffusion models. So does Adobe Firefly.",
      learnMoreUrl: "https://lilianweng.github.io/posts/2021-07-11-diffusion-models/"
    },
    {
      title: "How AI Learns from Mistakes",
      description: "When you study for a test and get a question wrong, you focus more on that topic next time, right? AI works the same way! It uses 'loss functions' — basically a score that says how wrong the answer was. The bigger the mistake, the more it adjusts. It's like a coach watching a soccer game and saying 'you kicked too far left' — the player adjusts a tiny bit each time until they score. AI does this millions of times with something called 'gradient descent' — taking small steps toward the right answer.",
      icon: BarChart3,
      keyPoints: ["Loss function = a score for 'how wrong was I?'", "Gradient descent = take small steps toward the right answer", "The AI adjusts millions of times until it gets really good"],
      realWorld: "This is how every AI model learns — from ChatGPT to self-driving cars to Spotify recommendations.",
      learnMoreUrl: "https://www.3blue1brown.com/topics/neural-networks"
    },
    {
      title: "How AI Fights Fake Images (GANs)",
      description: "Imagine two artists: one tries to paint fakes, and the other tries to spot fakes. They compete — the faker gets better at faking, the detective gets better at detecting. Eventually, the faker creates images so realistic nobody can tell! This is a GAN (Generative Adversarial Network). The 'Generator' creates images and the 'Discriminator' judges them. This competition produces amazingly realistic faces, art, and even video.",
      icon: GitBranch,
      keyPoints: ["Two AIs compete: one creates, one judges", "The competition makes both better over time", "Can create realistic faces of people who don't exist!"],
      realWorld: "thispersondoesnotexist.com uses GANs. They're also used for aging filters in photo apps.",
      learnMoreUrl: "https://poloclub.github.io/ganlab/"
    },
  ],
  intermediate: [
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
      description: "Long Short-Term Memory (LSTM, Hochreiter & Schmidhuber, 1997) solved the vanishing gradient problem with a gating mechanism: forget gate, input gate, and output gate. GRU simplified this to two gates (reset and update), achieving similar performance with fewer parameters. While largely replaced by transformers for NLP, LSTMs remain relevant for time series, audio processing, and resource-constrained settings.",
      icon: Repeat,
      keyPoints: ["LSTM: 3 gates (forget, input, output) + cell state", "GRU: 2 gates (reset, update) — simpler, often equally effective", "Bidirectional variants process sequences in both directions"],
      realWorld: "Google used LSTMs for Google Translate. Apple uses LSTMs in Siri. Stock prediction models often use LSTM/GRU.",
      learnMoreUrl: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/"
    },
    {
      title: "Attention Mechanisms",
      description: "Attention allows models to focus on relevant parts of input. Scaled dot-product attention is the core of transformers. Flash Attention (Dao, 2022) makes computation memory-efficient through tiling and recomputation. Multi-Query Attention (MQA) and Grouped-Query Attention (GQA) reduce KV cache memory for faster inference.",
      icon: Sparkles,
      keyPoints: ["Q, K, V: Query, Key, Value matrices from input", "Flash Attention: 2-4x speedup, exact computation", "GQA: used in Llama 2/3, balances speed and quality"],
      realWorld: "Flash Attention is used in virtually all modern LLM training. Claude, GPT-4, and Gemini use variants.",
      learnMoreUrl: "https://arxiv.org/abs/2205.14135"
    },
    {
      title: "Embeddings & Representation Learning",
      description: "Embeddings project high-dimensional discrete data into dense continuous vector spaces. Word2Vec/GloVe learn static embeddings. BERT and GPT produce contextual embeddings. Contrastive learning (SimCLR, CLIP) learns representations by pulling similar pairs together. Embeddings enable similarity search, clustering, recommendation, and transfer learning.",
      icon: Layers,
      keyPoints: ["Embedding dimensions: typically 256-4096", "Contrastive loss: InfoNCE, triplet loss, cosine similarity", "Matryoshka embeddings: variable-dimension representations"],
      realWorld: "OpenAI text-embedding-3 powers RAG systems. Spotify uses audio embeddings. Airbnb uses listing embeddings.",
      learnMoreUrl: "https://openai.com/index/new-embedding-models-and-api-updates/"
    },
    {
      title: "Loss Functions & Optimization",
      description: "Loss functions measure the difference between predictions and ground truth. MSE for regression, Cross-Entropy for classification, Focal Loss for class imbalance. Adam/AdamW optimizers use adaptive learning rates per parameter. Learning rate warmup + cosine decay is the standard schedule for transformer training.",
      icon: BarChart3,
      keyPoints: ["Adam optimizer: adaptive learning rates per parameter", "Learning rate warmup + cosine decay schedule", "Weight decay (L2 regularization) prevents overfitting"],
      realWorld: "AdamW is the default optimizer for transformer training. Cosine LR schedules are used in all LLM training runs.",
      learnMoreUrl: "https://d2l.ai/chapter_optimization/"
    },
    {
      title: "Transfer Learning & Foundation Models",
      description: "Transfer learning uses knowledge from a pre-trained model for new tasks. Foundation models (GPT-4, CLIP, SAM) are trained on massive datasets and adapt to many downstream tasks. Key techniques: feature extraction, fine-tuning, and in-context learning.",
      icon: ArrowRightLeft,
      keyPoints: ["Pre-train on large data, fine-tune on task data", "Foundation models: one model, many tasks", "Emergent abilities appear at scale (>100B parameters)"],
      realWorld: "ImageNet-pretrained CNNs power medical imaging. GPT-4 is a foundation model used for 1000s of apps via API.",
      learnMoreUrl: "https://arxiv.org/abs/2108.07258"
    },
    {
      title: "Normalization Techniques",
      description: "BatchNorm normalizes across the batch dimension — critical for CNNs. LayerNorm normalizes across features within each sample — default for transformers. RMSNorm (used in Llama) simplifies LayerNorm by removing mean-centering, reducing compute by ~10-15%.",
      icon: Gauge,
      keyPoints: ["BatchNorm: dominant in CNNs", "LayerNorm: standard in transformers", "RMSNorm: faster variant used in Llama 2/3 and Mistral"],
      realWorld: "Every modern transformer uses LayerNorm or RMSNorm. ResNet's success was partly due to BatchNorm.",
      learnMoreUrl: "https://arxiv.org/abs/1607.06450"
    },
    {
      title: "GANs & Diffusion Models",
      description: "GANs train a Generator and Discriminator in competition. Diffusion models learn to reverse a noising process. While GANs pioneered image generation, diffusion models now dominate due to better stability and quality. Latent Diffusion operates in compressed space, making generation practical.",
      icon: GitBranch,
      keyPoints: ["GANs: adversarial training, fast but unstable", "Diffusion: iterative denoising, slower but higher quality", "CFG scale controls quality vs diversity trade-off"],
      realWorld: "Stable Diffusion, DALL-E 3, Midjourney use diffusion. StyleGAN generates photorealistic faces.",
      learnMoreUrl: "https://arxiv.org/abs/2006.11239"
    },
  ],
  advanced: [
    {
      title: "Transformer Architecture: Mathematical Foundations",
      description: "Self-attention computes Attention(Q,K,V) = softmax(QK^T/√d_k)V where Q,K,V ∈ ℝ^{n×d}. The √d_k scaling prevents softmax saturation for large d_k. Multi-head attention projects Q,K,V through h separate linear transformations, concatenates outputs, and projects again: MultiHead = Concat(head_1,...,head_h)W^O. RoPE (Rotary Position Embedding, Su et al., 2021) encodes relative position through rotation matrices in complex space, enabling length generalization. ALiBi (Press et al., 2022) adds linear bias to attention scores instead. FlashAttention-2 achieves near-optimal FLOPs by fusing softmax computation with matrix multiplication using tiling on SRAM.",
      icon: Workflow,
      keyPoints: ["Attention: O(n²d) time, O(n²) memory — FlashAttention reduces to O(n²d) time, O(n) memory", "RoPE: f(x,m) = x·e^{imθ} — rotation in complex space for position encoding", "KV-cache: stores K,V matrices across autoregressive steps, O(n·d·L) memory per sequence"],
      realWorld: "Llama 3.1 uses RoPE + GQA + FlashAttention-2. GPT-4 likely uses MoE with expert-parallel KV caching.",
      learnMoreUrl: "https://arxiv.org/abs/1706.03762"
    },
    {
      title: "Recurrent Architectures: State Space Models & Mamba",
      description: "State Space Models (SSMs) like S4 (Gu et al., 2022) reformulate sequence modeling as a continuous dynamical system: x'(t) = Ax(t) + Bu(t), y(t) = Cx(t) + Du(t). The key insight: discretizing this system and applying the convolution theorem enables O(n log n) training via FFT, avoiding the O(n²) attention bottleneck. Mamba (Gu & Dao, 2023) makes SSM parameters input-dependent (selective state spaces), achieving transformer-quality results with linear-time inference. Mamba-2 unifies SSMs with structured attention, showing they're special cases of the same framework. RWKV applies similar ideas with linear attention in a transformer-like architecture.",
      icon: Repeat,
      keyPoints: ["S4: continuous SSM → discretize → convolve in frequency domain, O(n log n)", "Mamba: selective SSMs with input-dependent parameters, linear-time inference", "Mamba-2: unified SSM-attention framework; Jamba (AI21) hybridizes Mamba + Transformer layers"],
      realWorld: "Jamba 1.5 (AI21 Labs) uses Mamba layers for efficiency. RWKV-6 achieves competitive quality with linear complexity.",
      learnMoreUrl: "https://arxiv.org/abs/2312.00752"
    },
    {
      title: "Attention Variants: From Multi-Head to Differential",
      description: "Multi-Head Attention (MHA) uses h independent heads with separate Q,K,V projections: O(h·n²·d_h). Multi-Query Attention (MQA, Shazeer 2019) shares K,V across heads, reducing KV-cache by h×. Grouped-Query Attention (GQA, Ainslie et al., 2023) groups heads, interpolating between MHA and MQA — Llama 2 70B uses 8 KV groups for 64 heads. Differential Attention (Ye et al., 2024) computes attention as the difference between two softmax maps, reducing noise and improving signal extraction. Sliding Window Attention (Mistral) attends to local windows of size w, achieving O(n·w) complexity.",
      icon: Sparkles,
      keyPoints: ["GQA: h_q heads, h_kv groups — reduces memory by h_q/h_kv factor", "Differential Attention: Attn = softmax(Q₁K₁ᵀ) - λ·softmax(Q₂K₂ᵀ)", "Ring Attention (Liu et al., 2023): distributes sequence across devices for unlimited context"],
      realWorld: "Gemini 1.5 Pro: 10M context via ring attention. Mistral uses sliding window + full attention layers.",
      learnMoreUrl: "https://arxiv.org/abs/2305.13245"
    },
    {
      title: "Representation Learning: Matryoshka, CLIP & Beyond",
      description: "Matryoshka Representation Learning (Kusupati et al., 2022) trains a single embedding model that works at multiple dimensionalities — the first d dimensions of a 1024-dim embedding are useful as a d-dim embedding. This enables adaptive compute-accuracy trade-offs at inference. CLIP (Radford et al., 2021) learns aligned image-text embeddings via contrastive learning on 400M image-text pairs, enabling zero-shot image classification. SigLIP improves CLIP with sigmoid loss (pairwise instead of softmax over batch), removing the need for large batch sizes. InternVL and EVA-CLIP push to billion-parameter vision encoders.",
      icon: Layers,
      keyPoints: ["Matryoshka: truncatable embeddings — first d dims ≈ d-dim model quality", "CLIP loss: InfoNCE over (image, text) pairs with temperature scaling τ", "SigLIP: σ(cos(image,text)/τ) per pair — no batch-size dependency"],
      realWorld: "OpenAI text-embedding-3 uses Matryoshka. CLIP powers GPT-4V's vision understanding. Cohere Embed v3 uses Matryoshka.",
      learnMoreUrl: "https://arxiv.org/abs/2205.13147"
    },
    {
      title: "Optimization: Muon, Schedule-Free & Tensor Programs",
      description: "AdamW remains standard but newer optimizers show promise. Muon (Jordan et al., 2024) uses momentum in the spectral domain, showing 1.5-2× speedup over AdamW on transformer training. Schedule-Free optimization (Defazio & Mishchenko, 2024) eliminates learning rate schedules entirely by maintaining a separate evaluation point. Maximal Update Parameterization (µP, Yang et al., 2022) enables hyperparameter transfer from small to large models by scaling initialization and learning rates with width. Sophia (Liu et al., 2023) uses diagonal Hessian for adaptive second-order optimization.",
      icon: BarChart3,
      keyPoints: ["µP: tune hyperparameters on 10M-param proxy → transfer to 10B-param model", "Schedule-Free: no warmup, no cosine decay — competitive with tuned schedules", "Muon: spectral-domain momentum, demonstrated on GPT-2 scale"],
      realWorld: "Microsoft used µP for training models efficiently. Schedule-Free is in PyTorch experimental.",
      learnMoreUrl: "https://arxiv.org/abs/2203.03466"
    },
    {
      title: "Mixture of Experts (MoE) & Sparse Architectures",
      description: "MoE routes each token to a subset of expert networks via a learned gating function: y = Σᵢ G(x)ᵢ · Eᵢ(x) where G is a top-k softmax router. This enables massive parameter counts (1.8T for Mixtral-scale) with constant compute cost per token. Switch Transformer (Fedus et al., 2022) uses top-1 routing for simplicity. Expert-choice routing (Zhou et al., 2022) lets experts choose tokens instead of vice versa, improving load balance. DeepSeek-V2 uses fine-grained experts (256 experts, top-6 routing) with shared experts for common knowledge. Key challenge: load balancing — auxiliary losses prevent expert collapse.",
      icon: ArrowRightLeft,
      keyPoints: ["Top-k routing: each token activates k of N experts (typically k=2, N=8-256)", "Auxiliary load-balancing loss: L_aux = α · Σᵢ fᵢ · Pᵢ where f=fraction, P=probability", "DeepSeek-V2: 236B total, 21B active per token; Mixtral 8×7B: 47B total, 13B active"],
      realWorld: "GPT-4 is widely believed to be MoE. Mixtral 8x7B, DeepSeek-V2/V3, and Grok use MoE architectures.",
      learnMoreUrl: "https://arxiv.org/abs/2101.03961"
    },
    {
      title: "Flow Matching & Rectified Flow",
      description: "Flow Matching (Lipman et al., 2023) generalizes diffusion by learning a vector field that transports noise to data along straight paths. Rectified Flow (Liu et al., 2023) learns optimal transport maps that straighten probability flow, enabling generation in 1-4 steps vs 20-50 for DDPM. Stable Diffusion 3 uses this approach. Consistency Models (Song et al., 2023) distill diffusion into single-step generators. The mathematical framework: learn v_θ(x,t) such that dx/dt = v_θ(x,t) transports p_noise to p_data. Training: L = E[||v_θ(x_t, t) - (x_1 - x_0)||²] where x_t = (1-t)x_0 + tx_1.",
      icon: Box,
      keyPoints: ["Flow Matching: learn ODE dx/dt = v_θ(x,t) from noise to data", "Rectified Flow: straight paths enable 1-4 step generation", "Consistency Models: single-step generation via self-consistency training"],
      realWorld: "Stable Diffusion 3 uses rectified flow. FLUX (Black Forest Labs) achieves SOTA quality with flow matching.",
      learnMoreUrl: "https://arxiv.org/abs/2210.02747"
    },
  ],
};

export const DeepLearningTopics = () => {
  const { difficulty } = useDifficulty();
  const concepts = conceptsByDifficulty[difficulty];

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
