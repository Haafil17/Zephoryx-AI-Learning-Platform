import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Scale, Cpu, Layers, Zap, GitCompare } from "lucide-react";

const comparisons = [
  {
    icon: Scale,
    title: "GPT-4 vs Claude 3.5 vs Gemini 1.5 vs Llama 3.1",
    color: "from-blue-500 to-indigo-500",
    content: `A factual, benchmark-based comparison of the leading foundation models as of 2024-2025.

**Benchmarks (approximate, from public reports):**

| Benchmark | GPT-4o | Claude 3.5 Sonnet | Gemini 1.5 Pro | Llama 3.1 405B |
|-----------|--------|-------------------|----------------|----------------|
| MMLU | 88.7% | 88.7% | 85.9% | 88.6% |
| HumanEval | 90.2% | 92.0% | 84.1% | 89.0% |
| MATH | 76.6% | 78.3% | 67.7% | 73.8% |
| GSM8K | 95.3% | 96.4% | 90.8% | 96.8% |
| Context Window | 128K | 200K | 1M+ | 128K |

**Key Differentiators:**
- **GPT-4o**: Fastest multimodal model, strong at tool use and function calling, best ecosystem (ChatGPT, API, plugins)
- **Claude 3.5 Sonnet**: Best at coding benchmarks, longest standard context, strong instruction following, "Artifacts" UI
- **Gemini 1.5 Pro**: Largest context window (1M+), native multimodal (video, audio), best for retrieval over massive documents
- **Llama 3.1 405B**: Best open-weight model, self-hostable, no data leaves your infrastructure, competitive benchmarks

**Cost Comparison (per 1M tokens, approximate):**

| Model | Input | Output |
|-------|-------|--------|
| GPT-4o | $2.50 | $10.00 |
| Claude 3.5 Sonnet | $3.00 | $15.00 |
| Gemini 1.5 Pro | $1.25 | $5.00 |
| Llama 3.1 405B (self-hosted) | Compute cost | Compute cost |

**When to Use Which:**
- Complex reasoning + tool use → GPT-4o
- Code generation + long documents → Claude 3.5 Sonnet
- Massive context needs + video → Gemini 1.5 Pro
- Data privacy + customization → Llama 3.1 405B`
  },
  {
    icon: GitCompare,
    title: "RAG vs Fine-Tuning vs Prompt Engineering",
    color: "from-emerald-500 to-teal-500",
    content: `Three fundamental approaches to customizing LLM behavior, each with distinct tradeoffs.

**Prompt Engineering:**
- Modify input only, no model changes
- Zero infrastructure cost, instant iteration
- Limited by context window size
- Best for: formatting output, role-playing, simple task adaptation
- Limitation: can't add knowledge the model doesn't have

**Retrieval-Augmented Generation (RAG):**
- Retrieve relevant documents and inject into prompt
- No model modification required
- Knowledge can be updated by updating the document store
- Requires: vector database, embedding model, retrieval pipeline
- Best for: knowledge-intensive tasks, up-to-date information, source attribution
- Limitation: retrieval quality is a bottleneck, adds latency

**Fine-Tuning:**
- Update model weights on task-specific data
- Changes model behavior permanently
- Requires: labeled training data, GPU compute, evaluation pipeline
- Best for: specific output formats, domain jargon, consistent style, classification
- Limitation: expensive, risk of catastrophic forgetting, can't easily update knowledge

**Decision Framework:**

| Factor | Prompt Eng. | RAG | Fine-Tuning |
|--------|------------|-----|-------------|
| Setup Cost | None | Medium | High |
| Latency | Lowest | Higher | Lowest |
| Knowledge Updates | Manual | Easy | Retrain |
| Data Privacy | Prompt visible | Controlled | Encoded in weights |
| Best Scale | Prototype | Production | Enterprise |

**Hybrid Approach (Recommended for Production):**
Fine-tune a model for your domain's style/format, use RAG for factual grounding, and prompt engineering for per-request customization. This three-layer approach is used by most production AI systems.`
  },
  {
    icon: Cpu,
    title: "Open Source vs Closed Source Models",
    color: "from-orange-500 to-red-500",
    content: `The open vs. closed model debate has significant implications for cost, privacy, customization, and capability.

**Closed-Source Models:**
- GPT-4, Claude 3.5, Gemini 1.5
- Advantages: highest capability, managed infrastructure, regular updates
- Disadvantages: data sent to third party, rate limits, vendor lock-in, no customization of weights
- Pricing: pay-per-token, costs scale linearly with usage

**Open-Weight Models:**
- Llama 3.1, Mistral, Qwen 2.5, Gemma 2, Phi-3, DeepSeek V2
- Advantages: self-hostable, full control, fine-tunable, no per-token cost at scale
- Disadvantages: requires GPU infrastructure, lower ceiling on benchmarks, you manage updates
- Licensing: varies (Llama has use restrictions >700M MAU, Mistral is Apache 2.0)

**Performance Gap is Narrowing:**
- 2023: GPT-4 was far ahead of open models
- 2024: Llama 3.1 405B matches GPT-4 on most benchmarks
- 2025: DeepSeek R1 matches o1 on reasoning; open models closing the gap rapidly

**Total Cost of Ownership (TCO):**
- Low volume (<1M tokens/day): API is cheaper
- Medium volume (1M-100M tokens/day): depends on use case
- High volume (>100M tokens/day): self-hosting is significantly cheaper
- Consider: GPU rental ($2-5/hr for A100), engineering time, monitoring, failover

**Quantization for Efficiency:**
- GPTQ, AWQ, GGUF formats reduce model size
- 4-bit quantization: ~50% size reduction with <1% quality loss
- Enables running 70B models on consumer GPUs (48GB VRAM)
- Tools: llama.cpp, vLLM, TGI, Ollama`
  },
  {
    icon: Layers,
    title: "Supervised vs Unsupervised vs Reinforcement Learning",
    color: "from-violet-500 to-purple-500",
    content: `The three paradigms of machine learning, their relationship to modern AI, and when each applies.

**Supervised Learning:**
- Training data: (input, label) pairs
- Goal: learn mapping f(x) → y
- Examples: image classification, spam detection, named entity recognition
- LLM connection: fine-tuning is supervised learning on (prompt, completion) pairs
- Metrics: accuracy, precision, recall, F1, AUC-ROC

**Unsupervised Learning:**
- Training data: inputs only, no labels
- Goal: discover structure in data
- Examples: clustering (K-means, DBSCAN), dimensionality reduction (PCA, t-SNE, UMAP), anomaly detection
- LLM connection: pre-training is unsupervised (next-token prediction on unlabeled text)
- Metrics: silhouette score, reconstruction error, perplexity

**Reinforcement Learning (RL):**
- Training data: agent interacts with environment, receives rewards
- Goal: maximize cumulative reward
- Examples: game playing (AlphaGo), robotics, trading
- LLM connection: RLHF (Reinforcement Learning from Human Feedback) aligns LLMs with human preferences
- Key concepts: policy, value function, reward model, PPO, DPO

**Self-Supervised Learning (the LLM paradigm):**
- A subset of unsupervised learning
- Creates supervision signal from the data itself
- Masked Language Modeling (BERT): predict masked tokens
- Causal Language Modeling (GPT): predict next token
- Contrastive Learning (CLIP): align image-text pairs
- This is how all modern foundation models are pre-trained

**RLHF Pipeline (how ChatGPT-like models are trained):**
1. Pre-train on internet text (self-supervised)
2. Supervised Fine-Tuning (SFT) on human-written demonstrations
3. Train a reward model on human preference comparisons
4. Optimize policy with PPO against the reward model
5. Alternative: DPO (Direct Preference Optimization) skips steps 3-4`
  },
  {
    icon: BarChart3,
    title: "GPU Comparison for AI Workloads",
    color: "from-pink-500 to-rose-500",
    content: `Choosing the right hardware is critical for training, fine-tuning, and inference. Here's a factual comparison of current options.

**NVIDIA Data Center GPUs:**

| GPU | VRAM | FP16 TFLOPS | Memory BW | Price (Cloud/hr) |
|-----|------|-------------|-----------|-------------------|
| H100 SXM | 80GB HBM3 | 989 | 3.35 TB/s | $3-5 |
| A100 SXM | 80GB HBM2e | 312 | 2.0 TB/s | $1.5-3 |
| L40S | 48GB GDDR6 | 362 | 864 GB/s | $1-2 |
| H200 | 141GB HBM3e | 989 | 4.8 TB/s | $5-8 |

**Consumer GPUs for Local Inference:**

| GPU | VRAM | Can Run |
|-----|------|---------|
| RTX 4090 | 24GB | 13B models (4-bit), 7B models (FP16) |
| RTX 4080 | 16GB | 7B models (4-bit) |
| RTX 3090 | 24GB | 13B models (4-bit) |
| Mac M2 Ultra | 192GB | 70B models (4-bit) via llama.cpp |

**Key Concepts:**
- VRAM determines maximum model size you can load
- Memory bandwidth determines tokens/second (inference speed)
- TFLOPS determines training speed
- For inference: memory bandwidth matters more than compute
- For training: both compute and memory bandwidth matter

**Cloud GPU Providers:**
- AWS (P5 instances with H100s)
- Google Cloud (A3 instances, TPU v5e)
- Lambda Labs, RunPod, Together AI (budget-friendly)
- Modal, Replicate (serverless GPU)

**Rule of Thumb for Model Loading:**
- FP16: parameters × 2 bytes (7B → 14GB VRAM)
- INT8: parameters × 1 byte (7B → 7GB VRAM)
- INT4: parameters × 0.5 bytes (7B → 3.5GB VRAM)
- Add ~2GB overhead for KV-cache and framework`
  },
  {
    icon: Zap,
    title: "Inference Optimization Techniques",
    color: "from-amber-500 to-yellow-500",
    content: `Production AI systems need fast, cost-efficient inference. Here are the key optimization techniques used in practice.

**Quantization:**
- Reduces precision of model weights (FP32 → FP16 → INT8 → INT4)
- Post-Training Quantization (PTQ): quantize after training, no retraining needed
- Quantization-Aware Training (QAT): train with quantization in the loop
- GPTQ: GPU-optimized PTQ for transformers
- AWQ: Activation-aware Weight Quantization, preserves salient weights
- GGUF: CPU-friendly format used by llama.cpp

**Speculative Decoding:**
- Use a small "draft" model to generate candidate tokens
- Large "target" model verifies candidates in parallel
- Accepted tokens are free — only rejected ones cost a forward pass
- 2-3x speedup with no quality degradation
- Used by: Medusa, Eagle, Lookahead Decoding

**Continuous Batching:**
- Traditional: wait for all requests in batch to finish
- Continuous: as soon as one request finishes, add a new one
- Dramatically improves throughput and GPU utilization
- Implemented in: vLLM, TGI, TensorRT-LLM

**KV-Cache Optimization:**
- PagedAttention (vLLM): manages KV-cache like virtual memory pages
- Eliminates memory waste from pre-allocated contiguous buffers
- Enables 2-4x more concurrent requests

**Model Parallelism for Large Models:**
- Tensor Parallelism: split individual layers across GPUs
- Pipeline Parallelism: split model layers across GPUs sequentially
- Data Parallelism: replicate model, split batches
- Expert Parallelism: for MoE models, different experts on different GPUs

**Serving Frameworks Comparison:**

| Framework | Best For | Key Feature |
|-----------|----------|-------------|
| vLLM | High throughput | PagedAttention |
| TGI (HuggingFace) | Easy deployment | Docker-native |
| TensorRT-LLM | NVIDIA optimization | Kernel fusion |
| Ollama | Local/dev | One-command setup |
| llama.cpp | CPU inference | GGUF quantization |`
  }
];

export const AIComparisonTopics = () => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <Badge className="mb-3 bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200 border-0">
        <BarChart3 className="w-3 h-3 mr-1" /> Comparisons & Foundations
      </Badge>
      <h2 className="text-3xl font-bold text-foreground">AI Comparisons, Hardware & Optimization</h2>
      <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
        Side-by-side comparisons of models, approaches, hardware, and optimization techniques — backed by real benchmarks and data.
      </p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {comparisons.map((topic) => (
        <Card key={topic.title} className="border-0 shadow-lg bg-card/90 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center`}>
                <topic.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{topic.title}</h3>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
              {topic.content}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
