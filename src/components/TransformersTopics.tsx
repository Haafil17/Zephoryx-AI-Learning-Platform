import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Cpu, Layers, Zap, GitBranch } from "lucide-react";

export const TransformersTopics = () => {
  const topics = [
    {
      title: "Transformer Architecture Deep Dive",
      icon: <Cpu className="w-5 h-5 text-indigo-500" />,
      content: `The Transformer (Vaswani et al., 2017 — "Attention Is All You Need") revolutionized NLP and now powers nearly all modern AI.

**Core Architecture**:
- **Encoder**: Processes input sequence bidirectionally. Used in BERT, RoBERTa.
- **Decoder**: Generates output auto-regressively. Used in GPT series.
- **Encoder-Decoder**: Full sequence-to-sequence. Used in T5, BART, original Transformer.

**Self-Attention Mechanism**:
For each token, compute attention weights over all other tokens:
1. Create Query (Q), Key (K), Value (V) matrices from input
2. Attention(Q,K,V) = softmax(QK^T / √d_k) × V
3. √d_k scaling prevents softmax from becoming too peaked

**Multi-Head Attention**:
- Run attention in parallel across h heads (e.g., 12 in BERT-base)
- Each head learns different attention patterns (syntactic, semantic, positional)
- Concatenate heads and project: MultiHead = Concat(head_1,...,head_h) × W_O

**Position Encoding**:
- Original: Sinusoidal functions (sin/cos at different frequencies)
- Learned: Trainable position embeddings (GPT, BERT)
- RoPE (Rotary Position Embedding): Used in LLaMA, encodes relative position via rotation matrices
- ALiBi: Adds linear bias to attention scores based on distance

**Feed-Forward Network (FFN)**:
- Two linear layers with activation: FFN(x) = W_2 × GELU(W_1 × x + b_1) + b_2
- Typically 4x the hidden dimension (e.g., 768 → 3072 → 768 in BERT-base)
- Recent variants: SwiGLU (LLaMA), GeGLU — improve training stability`
    },
    {
      title: "RNNs, LSTMs & GRUs vs Transformers",
      icon: <GitBranch className="w-5 h-5 text-green-500" />,
      content: `Understanding the evolution from recurrent architectures to attention-based models.

**RNN (Recurrent Neural Network)**:
- Processes sequences token by token, maintaining a hidden state
- h_t = tanh(W_hh × h_{t-1} + W_xh × x_t)
- Problem: Vanishing/exploding gradients over long sequences
- Cannot parallelize — each step depends on the previous

**LSTM (Long Short-Term Memory, Hochreiter 1997)**:
- Adds gated memory cell to control information flow
- Three gates: Forget gate (what to discard), Input gate (what to store), Output gate (what to output)
- Cell state provides a highway for gradients to flow unimpeded
- Can capture dependencies up to ~500 tokens in practice
- Still sequential — cannot parallelize training

**GRU (Gated Recurrent Unit, Cho 2014)**:
- Simplified LSTM with two gates instead of three (reset + update)
- Fewer parameters, faster training, comparable performance
- Merges cell state and hidden state

**Why Transformers Won**:
- **Parallelization**: All positions computed simultaneously (massive GPU speedup)
- **Long-range dependencies**: Direct attention between any two positions (no information bottleneck)
- **Scalability**: Performance scales with model size and data (scaling laws)
- **Transfer learning**: Pre-trained transformers transfer to diverse tasks

**Where RNNs Still Shine**:
- Very long sequences with strict memory constraints
- Streaming/online processing (one token at a time)
- xLSTM (2024): Extended LSTM with exponential gating, competitive with transformers
- State-space models (Mamba) borrow RNN-like sequential processing with near-transformer quality`
    },
    {
      title: "Attention Variants & Efficient Transformers",
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      content: `Standard self-attention has O(n²) complexity. These variants reduce cost for long sequences.

**Multi-Query Attention (MQA)**:
- All heads share the same K and V, only Q differs per head
- Reduces KV-cache memory by number of heads (e.g., 32x)
- Used in PaLM, Falcon, StarCoder

**Grouped-Query Attention (GQA)**:
- Compromise between MHA and MQA: Groups of heads share KV
- LLaMA 2 70B uses 8 KV heads for 64 query heads
- Near-MHA quality with MQA-like efficiency

**Flash Attention (Dao et al., 2022)**:
- Exact attention, but with IO-aware tiling
- Avoids materializing the full N×N attention matrix in GPU HBM
- Computes attention in tiles that fit in SRAM (fast on-chip memory)
- 2-4x speedup, enables much longer context windows
- Flash Attention 2: Further optimized, used by all major models

**Sliding Window Attention (Mistral)**:
- Each token attends only to W nearest neighbors
- Reduces complexity from O(n²) to O(n×W)
- Information propagates through overlapping windows across layers

**Ring Attention**: Distributes sequence across devices in a ring topology for extremely long contexts (millions of tokens).

**Sparse Attention Patterns**:
- **Longformer**: Combination of local windowed + global attention on special tokens
- **BigBird**: Random + window + global attention (Turing-complete)
- **Sparse Transformer**: Factorized attention patterns (strided + fixed)`
    },
    {
      title: "Model Architectures: BERT, GPT, T5 & Beyond",
      icon: <Layers className="w-5 h-5 text-purple-500" />,
      content: `Major transformer model families and their design choices.

**BERT (Google, 2018)** — Bidirectional Encoder:
- Pre-training: Masked Language Modeling (MLM) + Next Sentence Prediction
- Masks 15% of tokens, predicts them from bidirectional context
- BERT-base: 110M params, 12 layers, 768 hidden, 12 heads
- Best for: Classification, NER, question answering, sentence similarity
- Variants: RoBERTa (better training), ALBERT (parameter sharing), DeBERTa (disentangled attention)

**GPT Series (OpenAI)** — Autoregressive Decoder:
- GPT-1 (2018): 117M params, proved pre-train→fine-tune works
- GPT-2 (2019): 1.5B params, zero-shot capabilities emerged
- GPT-3 (2020): 175B params, in-context learning, few-shot prompting
- GPT-4 (2023): Multimodal, rumored MoE architecture, 1.76T params
- GPT-4o (2024): Omni-modal, faster, cheaper
- Training: Causal language modeling (predict next token)

**T5 (Google, 2019)** — Text-to-Text Framework:
- Converts ALL tasks to text-to-text format
- "translate English to German: ..." / "summarize: ..." / "classify: ..."
- Encoder-decoder architecture
- Flan-T5: Instruction-tuned variant, excellent for structured tasks

**LLaMA (Meta, 2023-2024)**:
- LLaMA 1: 7B-65B params, trained on public data only
- LLaMA 2: 7B-70B, RLHF alignment, 4K context (extended to 32K)
- LLaMA 3: 8B-405B, 128K context, 15T training tokens
- Design: RoPE, SwiGLU, GQA, RMSNorm (pre-norm)

**Mixture of Experts (MoE)**:
- Mixtral 8x7B: 8 expert FFN layers, router selects 2 per token
- 46.7B total params but only 12.9B active per forward pass
- Near GPT-3.5 quality at fraction of compute
- DeepSeek-V2: 236B total, 21B active, extremely cost-efficient`
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
          ⚡ Transformers, RNNs & Model Architectures
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Complete deep dive into the Transformer architecture, attention mechanisms, RNN/LSTM/GRU comparisons, and major model families.
        </p>
      </div>
      <Accordion type="multiple" className="space-y-4">
        {topics.map((topic, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl overflow-hidden bg-card">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                {topic.icon}
                <span className="font-semibold text-foreground">{topic.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {topic.content.split('\n\n').map((para, j) => (
                  <p key={j} className="text-muted-foreground whitespace-pre-line mb-3 leading-relaxed">{para}</p>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
