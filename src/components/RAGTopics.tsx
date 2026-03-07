import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Search, FileText, Layers, ChevronRight, Workflow, Server, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export const RAGTopics = () => {
  const ragConcepts = [
    {
      title: "What is RAG?",
      description: "Retrieval-Augmented Generation combines information retrieval with text generation. Instead of relying solely on a model's training data, RAG fetches relevant documents from an external knowledge base at query time, then feeds them to the LLM as context. This was introduced by Facebook AI Research (Lewis et al., 2020) and has become the standard pattern for building knowledge-grounded AI applications.",
      icon: Database,
      keyPoints: ["Reduces hallucinations by grounding responses in real data", "Keeps knowledge current without retraining", "Separates knowledge storage from reasoning"],
      realWorld: "Used by Perplexity AI, Microsoft Copilot, and most enterprise chatbots to provide accurate, cited answers.",
      learnMoreUrl: "https://arxiv.org/abs/2005.11401"
    },
    {
      title: "Embedding & Vector Search",
      description: "Text embeddings convert words and documents into dense numerical vectors that capture semantic meaning. Similar concepts end up close together in vector space. Vector databases like Pinecone, Weaviate, Qdrant, and pgvector enable fast similarity search over millions of documents using approximate nearest neighbor (ANN) algorithms like HNSW.",
      icon: Search,
      keyPoints: ["OpenAI text-embedding-3-small/large models", "Cosine similarity measures semantic closeness", "HNSW indexing enables sub-millisecond search at scale"],
      realWorld: "Spotify uses embeddings for music recommendations. GitHub Copilot uses them to find relevant code context.",
      learnMoreUrl: "https://www.pinecone.io/learn/vector-embeddings/"
    },
    {
      title: "Chunking Strategies",
      description: "Before embedding, documents must be split into chunks. The chunking strategy dramatically affects retrieval quality. Fixed-size chunking (e.g., 512 tokens) is simple but can break context. Semantic chunking groups related sentences together. Recursive character splitting respects document structure (paragraphs, sections). The optimal chunk size depends on your embedding model and use case.",
      icon: FileText,
      keyPoints: ["Overlap between chunks (50-200 tokens) preserves context", "Smaller chunks = more precise retrieval, less context", "Metadata (source, page number) enables filtering and citation"],
      realWorld: "LangChain's RecursiveCharacterTextSplitter is the most popular implementation, used in production by thousands of companies.",
      learnMoreUrl: "https://www.pinecone.io/learn/chunking-strategies/"
    },
    {
      title: "Advanced RAG Patterns",
      description: "Basic RAG retrieves chunks and passes them to the LLM. Advanced patterns include: HyDE (Hypothetical Document Embedding) — the LLM generates a hypothetical answer first, then uses it for retrieval. Multi-query RAG generates multiple search queries from different angles. Re-ranking uses a cross-encoder to score and reorder retrieved chunks. Parent-child retrieval fetches small chunks but passes their parent sections for full context.",
      icon: Layers,
      keyPoints: ["HyDE improves retrieval for complex questions", "Cohere Rerank or cross-encoders improve relevance", "Agentic RAG lets the LLM decide when and what to retrieve"],
      realWorld: "LlamaIndex implements these patterns. Anthropic's Claude uses similar retrieval techniques internally.",
      learnMoreUrl: "https://docs.llamaindex.ai/en/stable/"
    },
    {
      title: "RAG Evaluation",
      description: "Measuring RAG quality requires evaluating both retrieval and generation. Key metrics: Context Relevance (are retrieved documents relevant?), Faithfulness (does the answer stick to the retrieved context?), Answer Relevance (does it actually answer the question?). Frameworks like RAGAS and TruLens provide automated evaluation. Human evaluation remains essential for production systems.",
      icon: Workflow,
      keyPoints: ["RAGAS framework provides standardized RAG metrics", "Precision@K measures retrieval accuracy", "Faithfulness score detects hallucinations beyond context"],
      realWorld: "Companies like Databricks and Weights & Biases use RAGAS in their MLOps pipelines.",
      learnMoreUrl: "https://docs.ragas.io/en/stable/"
    },
    {
      title: "Production RAG Architecture",
      description: "A production RAG system includes: Document ingestion pipeline (parsing, chunking, embedding), Vector database with metadata filtering, Query pipeline (query transformation, retrieval, reranking, generation), Observability (logging, tracing, evaluation). Popular stacks include LangChain + Pinecone + OpenAI, or LlamaIndex + Weaviate + Anthropic. Supabase pgvector is excellent for smaller-scale applications.",
      icon: Server,
      keyPoints: ["Hybrid search combines keyword (BM25) + semantic search", "Streaming responses improve perceived latency", "Caching frequent queries reduces cost and latency"],
      realWorld: "Notion AI, Intercom Fin, and Shopify Sidekick all use production RAG architectures.",
      learnMoreUrl: "https://python.langchain.com/docs/tutorials/rag/"
    },
  ];

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
