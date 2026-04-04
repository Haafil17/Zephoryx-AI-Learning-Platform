import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Database, Clock, Layers, Cpu, RefreshCw, HardDrive, Zap } from "lucide-react";

const topics = [
  {
    icon: Clock,
    title: "Short-Term Memory (STM) in AI",
    color: "from-blue-500 to-cyan-500",
    content: `Short-term memory in AI systems refers to the context window — the finite amount of information a model can process in a single interaction. For transformer-based LLMs, this is determined by the maximum token limit (e.g., 4K, 8K, 32K, 128K, or 1M tokens).

**How STM Works in LLMs:**
- The self-attention mechanism computes relationships between all tokens in the context window
- Attention complexity scales quadratically: O(n²) where n = sequence length
- KV-cache stores key-value pairs from previous tokens to avoid recomputation during autoregressive generation
- Once the context window is full, earliest tokens are typically dropped (sliding window)

**Practical Implications:**
- GPT-4 Turbo: 128K tokens (~300 pages of text)
- Claude 3: 200K tokens
- Gemini 1.5 Pro: 1M tokens (experimental 10M)
- Longer contexts don't guarantee better recall — "Lost in the Middle" phenomenon shows models attend better to the beginning and end of long contexts

**Optimization Techniques:**
- Sliding Window Attention (Mistral): limits attention to a fixed local window
- Sparse Attention (BigBird, Longformer): reduces O(n²) to O(n√n) or O(n·log(n))
- Ring Attention: distributes long sequences across multiple devices
- Flash Attention: memory-efficient attention computation without materializing the full attention matrix`
  },
  {
    icon: HardDrive,
    title: "Long-Term Memory (LTM) in AI",
    color: "from-purple-500 to-indigo-500",
    content: `Long-term memory allows AI agents to retain information across sessions and conversations. Unlike STM (context window), LTM persists indefinitely and must be explicitly stored and retrieved.

**Approaches to LTM:**

1. **Vector Databases (Retrieval-Based)**
   - Store embeddings of past conversations, documents, or facts
   - Use cosine similarity or ANN (Approximate Nearest Neighbor) search for retrieval
   - Tools: Pinecone, Weaviate, Qdrant, ChromaDB, pgvector
   - Tradeoff: retrieval quality depends on embedding model and chunking strategy

2. **Explicit Memory Stores**
   - Key-value stores where the agent explicitly saves named facts
   - Example: MemGPT uses a "main context" + "archival storage" architecture
   - The agent decides what to store and what to forget (memory management)

3. **Fine-Tuning as Memory**
   - Updating model weights encodes information permanently
   - Expensive and inflexible — can't selectively "forget"
   - Used for domain adaptation, not per-user memory

4. **Episodic vs. Semantic Memory**
   - Episodic: specific past interactions ("User asked about Python on March 5")
   - Semantic: generalized knowledge ("User prefers Python over JavaScript")
   - Inspired by human cognitive science (Tulving, 1972)

**Key Challenge:** Memory staleness — stored information becomes outdated. Systems need mechanisms for memory consolidation, summarization, and garbage collection.`
  },
  {
    icon: Layers,
    title: "Memory Architectures in Agents",
    color: "from-emerald-500 to-teal-500",
    content: `Modern AI agents use sophisticated memory architectures that combine multiple memory types to approximate human-like information processing.

**MemGPT Architecture (Packer et al., 2023):**
- Inspired by operating system virtual memory
- Main Context: limited working memory (like RAM)
- Archival Storage: unlimited persistent memory (like disk)
- Recall Storage: searchable conversation history
- The LLM itself manages memory operations (save, search, delete)

**Generative Agents (Park et al., 2023):**
- Stanford's "Smallville" experiment with 25 AI agents
- Memory Stream: timestamped observations
- Retrieval: scored by recency, importance, and relevance
- Reflection: periodic synthesis of memories into higher-level insights
- Planning: using memories to generate daily plans and react to events

**LangChain/LangGraph Memory Types:**
- ConversationBufferMemory: stores full history (simple but grows unbounded)
- ConversationSummaryMemory: LLM summarizes older parts of conversation
- ConversationBufferWindowMemory: keeps last K exchanges
- EntityMemory: extracts and tracks named entities across conversations

**Production Considerations:**
- Memory isolation: each user's memories must be separate (multi-tenancy)
- Memory permissions: some memories shared (team), some private
- Memory versioning: track how stored information evolves
- GDPR compliance: ability to delete all memories for a user on request`
  },
  {
    icon: Cpu,
    title: "Attention Mechanisms Deep Dive",
    color: "from-orange-500 to-red-500",
    content: `Attention is the fundamental mechanism enabling transformers to process sequences. Understanding its variants is essential for modern AI engineering.

**Self-Attention (Vaswani et al., 2017):**
- Input: sequence of token embeddings X
- Three projections: Q = XWq, K = XWk, V = XWv
- Attention(Q,K,V) = softmax(QK^T / √dk) · V
- √dk scaling prevents softmax saturation for large dimensions
- Multi-Head Attention: runs h parallel attention functions, concatenates results

**Attention Variants:**

| Type | Complexity | Used In |
|------|-----------|---------|
| Full Self-Attention | O(n²) | GPT, BERT |
| Sliding Window | O(n·w) | Mistral, Longformer |
| Linear Attention | O(n) | Performer, RWKV |
| Flash Attention | O(n²) time, O(n) memory | Most modern LLMs |
| Multi-Query Attention | Reduced KV cache | Llama 2, Falcon |
| Grouped-Query Attention | Between MHA and MQA | Llama 3, Gemma |

**Cross-Attention:**
- Used in encoder-decoder models (T5, Whisper)
- Query from decoder, Key/Value from encoder
- Enables the decoder to "attend to" encoder representations

**Key Innovations:**
- Rotary Positional Embeddings (RoPE): encodes position through rotation matrices, enabling length extrapolation
- ALiBi (Attention with Linear Biases): adds linear bias based on token distance, no learned positional embeddings
- Flash Attention v2 (Dao, 2023): IO-aware algorithm achieving 2-4x speedup over standard attention`
  },
  {
    icon: RefreshCw,
    title: "State Space Models & Beyond Attention",
    color: "from-pink-500 to-rose-500",
    content: `State Space Models (SSMs) represent a paradigm shift away from attention-based architectures, offering linear-time sequence processing.

**Mamba (Gu & Dao, 2023):**
- Selective State Space Model
- Key insight: make SSM parameters input-dependent (selective)
- Linear time complexity O(n) vs transformer's O(n²)
- Hardware-aware algorithm using parallel scan
- Mamba-2 achieves competitive performance with transformers at similar scale

**How SSMs Work:**
- Continuous-time formulation: h'(t) = Ah(t) + Bx(t), y(t) = Ch(t) + Dx(t)
- Discretized for digital computation using zero-order hold or bilinear method
- The hidden state h acts as a compressed memory of the entire sequence
- Unlike attention, SSMs process tokens sequentially but can be parallelized via convolution

**Hybrid Architectures:**
- Jamba (AI21): interleaves transformer and Mamba layers
- StripedHyena: alternates attention and SSM layers
- Griffin (Google DeepMind): combines gated linear recurrences with local attention
- These hybrids aim to get transformer-quality reasoning with SSM-efficiency

**RWKV (Peng et al., 2023):**
- "Receptance Weighted Key Value" — linear attention alternative
- Runs like an RNN during inference (constant memory per token)
- Trains like a transformer (parallelizable)
- Open-source with models up to 14B parameters

**Comparison with Transformers:**
- SSMs excel at: long sequences, constant memory inference, streaming
- Transformers excel at: in-context learning, retrieval, complex reasoning
- Current consensus: hybrids will likely dominate future architectures`
  },
  {
    icon: Database,
    title: "Embeddings & Vector Representations",
    color: "from-violet-500 to-purple-500",
    content: `Embeddings are dense vector representations that encode semantic meaning, forming the backbone of modern NLP, search, and RAG systems.

**Evolution of Embeddings:**
1. Word2Vec (2013): Skip-gram and CBOW, 300-dimensional
2. GloVe (2014): Global co-occurrence statistics
3. FastText (2016): Subword embeddings, handles OOV words
4. ELMo (2018): Contextualized embeddings from bidirectional LSTM
5. BERT embeddings (2018): Contextualized from transformer encoder
6. Sentence-BERT (2019): Siamese networks for sentence-level embeddings
7. Modern: text-embedding-3-large (OpenAI), voyage-3 (Anthropic), all-MiniLM-L6-v2

**Properties of Good Embeddings:**
- Semantic similarity maps to cosine similarity
- king - man + woman ≈ queen (analogical reasoning)
- Clustering: similar concepts group together in vector space
- Dimensionality: typically 384 to 3072 dimensions

**Embedding Models Comparison:**

| Model | Dimensions | MTEB Score | Speed |
|-------|-----------|------------|-------|
| text-embedding-3-large | 3072 | 64.6 | Fast (API) |
| voyage-3 | 1024 | 67.4 | Fast (API) |
| all-MiniLM-L6-v2 | 384 | 56.3 | Very Fast |
| bge-large-en-v1.5 | 1024 | 63.6 | Medium |
| nomic-embed-text | 768 | 62.4 | Fast |

**Practical Applications:**
- Semantic search: find documents by meaning, not keywords
- Clustering: group similar content automatically
- Classification: use embeddings as features for downstream models
- Anomaly detection: identify outliers in embedding space
- Cross-lingual: multilingual embeddings enable zero-shot translation`
  },
  {
    icon: Zap,
    title: "Regression, Classification & ML Foundations",
    color: "from-amber-500 to-orange-500",
    content: `Understanding classical ML foundations is essential even in the era of large language models — they're used in preprocessing, evaluation, and hybrid systems.

**Linear Regression:**
- Predicts continuous output: ŷ = Xw + b
- Loss: Mean Squared Error (MSE) = (1/n)Σ(yi - ŷi)²
- Solved analytically (Normal Equation) or via Gradient Descent
- Regularization: L1 (Lasso) for sparsity, L2 (Ridge) for stability, Elastic Net for both

**Logistic Regression:**
- Binary classification: P(y=1|x) = σ(wTx + b) where σ = sigmoid
- Loss: Binary Cross-Entropy
- Despite the name, it's a classifier, not a regressor
- Multinomial variant (softmax) for multi-class problems

**Key ML Concepts for AI Engineers:**

| Concept | Why It Matters |
|---------|---------------|
| Bias-Variance Tradeoff | Underfitting vs overfitting diagnosis |
| Cross-Validation | Reliable model evaluation |
| Feature Scaling | Required for gradient-based optimization |
| Curse of Dimensionality | Why embeddings need dimensionality reduction |
| Ensemble Methods | Random Forest, XGBoost still beat LLMs on tabular data |

**Where Classical ML Meets LLMs:**
- Reranking: train a cross-encoder or gradient-boosted model to rerank LLM retrieval results
- Classification heads: fine-tune a small classifier on top of frozen embeddings
- Feature extraction: use LLM embeddings as input to traditional ML pipelines
- Evaluation: precision, recall, F1, AUC-ROC apply to LLM classification tasks
- Tabular data: XGBoost/LightGBM consistently outperform LLMs on structured data (Grinsztajn et al., 2022)`
  },
  {
    icon: Brain,
    title: "Transformer Architecture Internals",
    color: "from-sky-500 to-blue-500",
    content: `The transformer architecture (Vaswani et al., 2017, "Attention Is All You Need") is the foundation of modern AI. Understanding its internals is critical for anyone working with LLMs.

**Architecture Overview:**
- Encoder: bidirectional, used for understanding (BERT, T5 encoder)
- Decoder: causal (left-to-right), used for generation (GPT, Llama)
- Encoder-Decoder: full architecture (T5, BART, Whisper)

**Layer Components (Decoder Block):**
1. Masked Multi-Head Self-Attention
2. Add & Normalize (Layer Norm or RMSNorm)
3. Feed-Forward Network (FFN): two linear layers with activation
4. Add & Normalize

**Feed-Forward Network:**
- FFN(x) = max(0, xW1 + b1)W2 + b2 (original ReLU)
- Modern: SwiGLU activation (Llama, Mistral): FFN(x) = (Swish(xW1) ⊙ xV)W2
- FFN typically has 4x the hidden dimension (e.g., d_model=4096 → d_ff=16384)
- ~2/3 of transformer parameters are in FFN layers
- Research suggests FFNs act as key-value memories (Geva et al., 2021)

**Modern Modifications:**
- Pre-LayerNorm (GPT-2+): normalize before attention, improves training stability
- RMSNorm (Llama): faster than LayerNorm, removes mean centering
- Rotary Positional Embeddings (RoPE): relative position via rotation
- KV-Cache: stores computed key-value pairs for efficient autoregressive generation
- Mixture of Experts (MoE): activates only a subset of FFN experts per token (Mixtral, Switch Transformer)

**Scaling Laws (Chinchilla, 2022):**
- Optimal training: tokens ≈ 20× parameters
- A 70B model needs ~1.4T training tokens
- Compute-optimal training is more important than raw model size
- This overturned the "bigger is always better" paradigm`
  }
];

export const MemorySystemsTopics = () => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <Badge className="mb-3 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border-0">
        <Brain className="w-3 h-3 mr-1" /> Memory, Attention & Foundations
      </Badge>
      <h2 className="text-3xl font-bold text-foreground">Memory Systems, Attention & ML Foundations</h2>
      <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
        Deep dive into how AI systems remember, attend, and learn — from short-term context windows to persistent long-term memory architectures.
      </p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {topics.map((topic) => (
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
