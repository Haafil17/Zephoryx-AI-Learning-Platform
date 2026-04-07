import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Search, FileText, Layers, ChevronRight, Workflow, Server, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useDifficulty } from "@/contexts/DifficultyContext";

const conceptsByDifficulty = {
  beginner: [
    {
      title: "What is RAG? (Think: Open-Book Exam)",
      description: "Imagine taking an exam. Without RAG, the AI is like a student taking a closed-book test — it can only use what it memorized during training. With RAG, it's like an open-book exam — the AI can look up information before answering! RAG stands for Retrieval-Augmented Generation. When you ask a question, the system first searches a knowledge base (like flipping through a textbook), finds the most relevant pages, then gives them to the AI to read before answering. This is why Perplexity AI can answer with real sources — it googles first, then answers.",
      icon: Database,
      keyPoints: ["Without RAG: closed-book test — AI might make stuff up", "With RAG: open-book test — AI looks things up, then answers", "This is how AI gives accurate, up-to-date answers with real sources"],
      realWorld: "Perplexity AI uses RAG to search the web and answer with citations. Microsoft Copilot does the same.",
      learnMoreUrl: "https://www.youtube.com/watch?v=T-D1OfcDW1M"
    },
    {
      title: "How AI Understands Similarity (Embeddings)",
      description: "How does the AI know which 'pages' are relevant to your question? It uses embeddings — turning words into numbers that capture meaning. Think of it like a map: 'happy' and 'joyful' are placed close together, while 'happy' and 'refrigerator' are far apart. When you ask 'how do solar panels work?', the AI converts your question into a point on this map, then finds documents that are nearby. The closer on the map, the more relevant!",
      icon: Search,
      keyPoints: ["Words become numbers that show meaning on a map", "Similar meanings = close together on the map", "Your question gets mapped, then we find the nearest documents"],
      realWorld: "This is how Spotify finds songs similar to ones you like, and how Google finds relevant web pages.",
      learnMoreUrl: "https://www.youtube.com/watch?v=wjZofJX0v4M"
    },
    {
      title: "Splitting Documents Into Pieces (Chunking)",
      description: "You can't feed an entire textbook to the AI at once — it has a reading limit! So we split documents into smaller pieces called 'chunks.' Think of it like cutting a pizza — you need slices small enough to eat but big enough to get toppings on each one. If you cut too small, each piece loses context. Too big, and it's unwieldy. The sweet spot is usually a few paragraphs — enough to make sense on its own but not so much that it overwhelms the AI.",
      icon: FileText,
      keyPoints: ["Documents are too big — we split them into bite-sized pieces", "Each piece needs to make sense on its own (not too small!)", "A little overlap between pieces helps keep context"],
      realWorld: "Every RAG system does this. LangChain has popular tools for smart document splitting.",
      learnMoreUrl: "https://www.pinecone.io/learn/chunking-strategies/"
    },
    {
      title: "Making RAG Better (Advanced Tricks)",
      description: "Basic RAG is like searching Google and reading the first result. Advanced RAG is like a research librarian who knows multiple strategies! For example: HyDE writes a draft answer first, then searches for sources to verify it (like writing your essay then fact-checking). Re-ranking takes the search results and re-orders them by actual relevance. Multi-query asks the question in 3 different ways to find more diverse results. These tricks make the AI way more accurate.",
      icon: Layers,
      keyPoints: ["HyDE: write a draft answer → use it to search → find better sources", "Re-ranking: re-order search results by actual relevance, not just keywords", "Multi-query: ask the same question 3 different ways for better coverage"],
      realWorld: "Notion AI and enterprise chatbots use these advanced techniques for better accuracy.",
      learnMoreUrl: "https://docs.llamaindex.ai/en/stable/"
    },
  ],
  intermediate: [
    {
      title: "What is RAG?",
      description: "Retrieval-Augmented Generation combines information retrieval with text generation. Instead of relying solely on training data, RAG fetches relevant documents from an external knowledge base at query time. Introduced by Facebook AI Research (Lewis et al., 2020). This reduces hallucinations, keeps knowledge current, and separates storage from reasoning.",
      icon: Database,
      keyPoints: ["Reduces hallucinations by grounding responses in real data", "Keeps knowledge current without retraining", "Separates knowledge storage from reasoning"],
      realWorld: "Used by Perplexity AI, Microsoft Copilot, and most enterprise chatbots.",
      learnMoreUrl: "https://arxiv.org/abs/2005.11401"
    },
    {
      title: "Embedding & Vector Search",
      description: "Text embeddings convert documents into dense vectors capturing semantic meaning. Vector databases (Pinecone, Weaviate, Qdrant, pgvector) enable fast similarity search using ANN algorithms like HNSW. Cosine similarity measures semantic closeness between query and document embeddings.",
      icon: Search,
      keyPoints: ["OpenAI text-embedding-3-small/large models", "Cosine similarity measures semantic closeness", "HNSW indexing enables sub-millisecond search at scale"],
      realWorld: "Spotify uses embeddings for recommendations. GitHub Copilot uses them for code context.",
      learnMoreUrl: "https://www.pinecone.io/learn/vector-embeddings/"
    },
    {
      title: "Chunking Strategies",
      description: "Documents must be split into chunks before embedding. Fixed-size chunking is simple but can break context. Semantic chunking groups related sentences. Recursive character splitting respects document structure. Overlap between chunks preserves context.",
      icon: FileText,
      keyPoints: ["Overlap (50-200 tokens) preserves context between chunks", "Smaller chunks = more precise, less context", "Metadata enables filtering and citation"],
      realWorld: "LangChain's RecursiveCharacterTextSplitter is the most popular implementation.",
      learnMoreUrl: "https://www.pinecone.io/learn/chunking-strategies/"
    },
    {
      title: "Advanced RAG Patterns",
      description: "HyDE generates a hypothetical answer first for better retrieval. Multi-query generates search queries from different angles. Re-ranking uses cross-encoders to reorder results. Parent-child retrieval fetches small chunks but returns parent sections for context. Agentic RAG lets the LLM decide when to retrieve.",
      icon: Layers,
      keyPoints: ["HyDE improves retrieval for complex questions", "Cohere Rerank or cross-encoders improve relevance", "Agentic RAG: LLM decides when and what to retrieve"],
      realWorld: "LlamaIndex implements all these patterns. Anthropic uses similar techniques internally.",
      learnMoreUrl: "https://docs.llamaindex.ai/en/stable/"
    },
    {
      title: "RAG Evaluation",
      description: "Measuring RAG quality requires evaluating retrieval and generation. Key metrics: Context Relevance, Faithfulness, Answer Relevance. RAGAS and TruLens provide automated evaluation. Human evaluation remains essential for production.",
      icon: Workflow,
      keyPoints: ["RAGAS provides standardized RAG metrics", "Precision@K measures retrieval accuracy", "Faithfulness score detects hallucinations"],
      realWorld: "Databricks and Weights & Biases use RAGAS in their MLOps pipelines.",
      learnMoreUrl: "https://docs.ragas.io/en/stable/"
    },
    {
      title: "Production RAG Architecture",
      description: "A production RAG system includes: document ingestion, vector database, query pipeline (transform, retrieve, rerank, generate), and observability. Popular stacks: LangChain + Pinecone + OpenAI, or LlamaIndex + Weaviate + Anthropic.",
      icon: Server,
      keyPoints: ["Hybrid search: keyword (BM25) + semantic search", "Streaming responses improve perceived latency", "Caching frequent queries reduces cost"],
      realWorld: "Notion AI, Intercom Fin, and Shopify Sidekick use production RAG.",
      learnMoreUrl: "https://python.langchain.com/docs/tutorials/rag/"
    },
  ],
  advanced: [
    {
      title: "RAG Theoretical Foundations & REALM",
      description: "RAG (Lewis et al., 2020) jointly trains a retriever (DPR, bi-encoder) and generator (BART/T5) end-to-end. The retriever computes p(z|x) using MIPS over FAISS indices of document embeddings. The generator computes p(y|x,z) conditioned on retrieved passages. REALM (Guu et al., 2020) pre-trains the retriever alongside the LM, treating retrieval as a latent variable: p(y|x) = Σ_z p(y|x,z)p(z|x). This allows gradients to flow through the retrieval step via the REINFORCE estimator or Gumbel-Softmax.",
      icon: Database,
      keyPoints: ["End-to-end training: retriever and generator jointly optimized", "REALM: retrieval as a latent variable with gradient flow through retriever", "DPR bi-encoder: q(x)·d(z) inner product for O(1) retrieval via MIPS"],
      realWorld: "Meta's Atlas (Izacard et al., 2023) scales this to 540B tokens with 64 retrieved passages.",
      learnMoreUrl: "https://arxiv.org/abs/2005.11401"
    },
    {
      title: "Dense Retrieval: ColBERT, SPLADE & Late Interaction",
      description: "Bi-encoders (DPR) encode query and document independently — fast but limited interaction. Cross-encoders process (query, doc) pairs jointly — accurate but O(n) at query time. ColBERT (Khattab & Zaharia, 2020) introduces late interaction: encode query and document independently into token-level embeddings, then compute fine-grained similarity via MaxSim. ColBERTv2 uses residual compression for 6× index reduction. SPLADE (Formal et al., 2021) learns sparse representations using MLM head weights, combining neural quality with inverted index efficiency.",
      icon: Search,
      keyPoints: ["ColBERT: MaxSim(Q,D) = Σᵢ maxⱼ Qᵢ·Dⱼ — token-level late interaction", "SPLADE: sparse + dense hybrid via MLM weight activation as term weights", "Matryoshka retrieval: truncate embeddings at query time for speed-accuracy tradeoff"],
      realWorld: "Stanford's DSPy uses ColBERTv2 as default retriever. Vespa.ai supports ColBERT natively.",
      learnMoreUrl: "https://arxiv.org/abs/2004.12832"
    },
    {
      title: "Chunking: Contextual Retrieval & Proposition-Based",
      description: "Anthropic's Contextual Retrieval (2024) prepends a short context summary to each chunk before embedding, reducing retrieval failure by 49%. Proposition-based chunking (Chen et al., 2023) decomposes documents into atomic, self-contained propositions. Late Chunking (Jina AI, 2024) runs the full document through the embedding model first, then pools token embeddings into chunk embeddings — preserving cross-chunk context. Agentic chunking uses an LLM to decide chunk boundaries based on semantic coherence. The key insight: chunk quality > chunk quantity.",
      icon: FileText,
      keyPoints: ["Contextual Retrieval: add summary prefix to each chunk → -49% retrieval failures", "Proposition-based: decompose into atomic facts — high precision, more chunks", "Late Chunking: embed full document → pool into chunks, preserving global context"],
      realWorld: "Anthropic uses Contextual Retrieval in Claude's tool-use. Jina AI ships Late Chunking.",
      learnMoreUrl: "https://www.anthropic.com/news/contextual-retrieval"
    },
    {
      title: "Advanced RAG: CRAG, Self-RAG & Adaptive Retrieval",
      description: "Corrective RAG (CRAG, Yan et al., 2024) adds a self-reflection step: the LLM evaluates retrieved documents for relevance before generation, discarding irrelevant ones and triggering web search if needed. Self-RAG (Asai et al., 2023) trains the LM to emit special tokens ([Retrieve], [IsRel], [IsSup], [IsUse]) that control retrieval and self-evaluation inline. Adaptive RAG decides whether to retrieve at all — simple questions skip retrieval entirely. RAPTOR (Sarthi et al., 2024) builds a tree of summaries for hierarchical retrieval across abstraction levels.",
      icon: Layers,
      keyPoints: ["Self-RAG: inline retrieval control via special tokens [Retrieve][IsRel][IsSup]", "CRAG: evaluate → correct → regenerate pipeline with web search fallback", "RAPTOR: recursive abstractive tree of summaries for multi-scale retrieval"],
      realWorld: "Perplexity likely uses CRAG-like patterns. LlamaIndex implements RAPTOR.",
      learnMoreUrl: "https://arxiv.org/abs/2310.11511"
    },
    {
      title: "RAG Evaluation: RAGAS, ARES & Needle-in-Haystack",
      description: "RAGAS (Es et al., 2023) provides reference-free evaluation: Faithfulness (LLM decomposes answer into claims, checks against context), Answer Relevance (generate hypothetical questions from answer, compare to original), Context Precision/Recall. ARES (Saad-Falcon et al., 2023) uses synthetic data for judge-model training. Needle-in-a-Haystack tests insert known facts into large contexts to measure retrieval accuracy at depth. Multi-hop evaluation (MuSiQue, HotpotQA) tests compositional reasoning. Production metrics: retrieval latency p50/p99, embedding cost per query, and cache hit rate.",
      icon: Workflow,
      keyPoints: ["RAGAS Faithfulness: decompose answer → check each claim against retrieved context", "Needle-in-Haystack: systematic context-length stress testing", "Production KPIs: retrieval p99 latency, cost/query, faithfulness score distribution"],
      realWorld: "Anthropic published Needle-in-Haystack results for Claude. RAGAS is the de facto OSS standard.",
      learnMoreUrl: "https://docs.ragas.io/en/stable/"
    },
    {
      title: "Production Architecture: Graph RAG, Hybrid Search & Caching",
      description: "Microsoft's GraphRAG (Edge et al., 2024) builds a knowledge graph from documents, then uses community detection (Leiden algorithm) to create hierarchical summaries. Queries are answered by traversing the graph + summarizing relevant communities — superior for global questions across large corpora. Hybrid search combines BM25 (keyword) + dense retrieval with Reciprocal Rank Fusion (RRF): score(d) = Σᵢ 1/(k+rankᵢ(d)). Semantic caching (GPTCache) embeds queries and serves cached responses for semantically similar inputs. Production stack: embedding pipeline (batch) → vector DB → query pipeline (real-time) → LLM → streaming response.",
      icon: Server,
      keyPoints: ["GraphRAG: knowledge graph + community summaries for global questions", "RRF: Reciprocal Rank Fusion combines keyword + semantic rankings", "Semantic caching: embed queries, serve cached responses for similar queries"],
      realWorld: "Microsoft uses GraphRAG in Copilot. Pinecone and Weaviate support hybrid search natively.",
      learnMoreUrl: "https://arxiv.org/abs/2404.16130"
    },
  ],
};

export const RAGTopics = () => {
  const { difficulty } = useDifficulty();
  const ragConcepts = conceptsByDifficulty[difficulty];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200 border-0 px-4 py-1.5">
            <Database className="w-4 h-4 mr-1" /> Core AI Architecture Pattern
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Retrieval-Augmented Generation (RAG)
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            The most important architecture pattern in modern AI applications. Learn how to build systems that ground LLM responses in your own data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {ragConcepts.map((concept, i) => (
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
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
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
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-sm"><span className="font-semibold text-foreground">Real-World:</span> <span className="text-muted-foreground">{concept.realWorld}</span></p>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
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

        {/* RAG vs Fine-tuning comparison */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">RAG vs Fine-tuning: When to Use What</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-xl font-bold mb-3">✅ Use RAG When:</h4>
              <ul className="space-y-2 text-white/90">
                <li>• Knowledge changes frequently (docs, policies, products)</li>
                <li>• You need citations and source attribution</li>
                <li>• Data is private and can't be sent to training</li>
                <li>• You want to avoid retraining costs</li>
                <li>• You need to combine multiple data sources</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-xl font-bold mb-3">✅ Use Fine-tuning When:</h4>
              <ul className="space-y-2 text-white/90">
                <li>• You need a specific output format or style</li>
                <li>• The task requires specialized domain knowledge</li>
                <li>• Latency is critical (no retrieval step)</li>
                <li>• The knowledge is relatively static</li>
                <li>• You need to reduce prompt length and cost</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
