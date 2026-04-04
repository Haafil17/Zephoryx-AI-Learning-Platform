import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Database, Layers, Search, Zap } from "lucide-react";

export const EmbeddingsTopics = () => {
  const topics = [
    {
      title: "Word Embeddings: Word2Vec, GloVe & FastText",
      icon: <Layers className="w-5 h-5 text-blue-500" />,
      content: `Word embeddings map words to dense vector representations where semantic similarity corresponds to vector proximity.

**Word2Vec (Google, 2013)**: Two architectures:
- **CBOW (Continuous Bag of Words)**: Predicts target word from surrounding context words. Faster training, works well for frequent words.
- **Skip-gram**: Predicts context words from the target word. Better for rare words and smaller datasets.
- Famous example: king - man + woman ≈ queen

**GloVe (Stanford, 2014)**: Global Vectors for Word Representation:
- Combines count-based (like LSA) and prediction-based approaches
- Builds a word co-occurrence matrix from the corpus
- Factorizes the log co-occurrence matrix to learn embeddings
- Better at capturing global statistics than Word2Vec

**FastText (Facebook, 2016)**:
- Extends Word2Vec by representing words as bags of character n-grams
- "apple" → <ap, app, ppl, ple, le> + the full word
- Can generate embeddings for out-of-vocabulary words
- Handles morphologically rich languages better

**Limitations of Static Embeddings**:
- One vector per word regardless of context ("bank" in river vs. finance)
- Cannot capture polysemy (multiple meanings)
- This limitation led to contextual embeddings (ELMo, BERT, GPT)`
    },
    {
      title: "Sentence & Document Embeddings",
      icon: <Search className="w-5 h-5 text-purple-500" />,
      content: `Moving beyond word-level to encode meaning of entire sentences and documents.

**Sentence-BERT (SBERT, 2019)**: Modified BERT with siamese network structure:
- Two BERT models share weights, process sentences independently
- Pooling layer (mean/CLS) produces fixed-size sentence embeddings
- 1000x faster than cross-encoder BERT for similarity tasks
- Used for semantic search, clustering, paraphrase detection

**OpenAI Embeddings (text-embedding-3-small/large)**:
- text-embedding-3-small: 1536 dimensions, $0.02/1M tokens
- text-embedding-3-large: 3072 dimensions, better accuracy
- Support Matryoshka representation learning (truncate to fewer dims)
- Industry standard for RAG applications

**Cohere Embed v3**: Multi-modal embeddings supporting:
- 1024 dimensions, supports 100+ languages
- Separate "search_document" and "search_query" input types for asymmetric search
- Compression to binary/int8 with minimal quality loss

**Embedding Quality Metrics**:
- **MTEB Benchmark**: Massive Text Embedding Benchmark covering 56 datasets
- Tasks: Retrieval, classification, clustering, STS, reranking, summarization
- Current leaders: Voyage 3, OpenAI large, Cohere v3, BGE series

**Dimensionality Reduction**:
- PCA: Linear projection to lower dimensions
- t-SNE: Non-linear, preserves local structure (for visualization)
- UMAP: Faster than t-SNE, preserves more global structure`
    },
    {
      title: "Vector Databases & Similarity Search",
      icon: <Database className="w-5 h-5 text-emerald-500" />,
      content: `Vector databases store and efficiently query high-dimensional embeddings using approximate nearest neighbor (ANN) algorithms.

**Major Vector Databases**:

**Pinecone**: Fully managed, serverless
- Supports metadata filtering, namespaces
- Up to 10M vectors on free tier
- Sub-100ms query latency at scale

**Weaviate**: Open-source, supports hybrid search
- Built-in vectorization modules (OpenAI, Cohere, HuggingFace)
- GraphQL API, multi-tenancy support
- Combines BM25 keyword search + vector search

**Chroma**: Lightweight, developer-friendly
- Python-native, embeds in applications
- Great for prototyping and small-medium datasets
- Simple API: add, query, update, delete

**Milvus**: High-performance, distributed
- Handles billions of vectors
- GPU-accelerated indexing
- Used by major enterprises

**pgvector (Supabase)**: PostgreSQL extension
- Familiar SQL interface with vector operations
- IVFFlat and HNSW indexes
- Perfect when you already use PostgreSQL

**ANN Algorithms**:
- **IVFFlat**: Inverted file index, clusters vectors, searches nearby clusters. Fast but less accurate.
- **HNSW**: Hierarchical Navigable Small World graphs. Best accuracy-speed trade-off. Industry standard.
- **Annoy (Spotify)**: Random projection trees. Memory-efficient, immutable index.
- **ScaNN (Google)**: Learned quantization for better compression.

**Distance Metrics**:
- Cosine similarity: Most common for text embeddings (angle between vectors)
- Euclidean (L2): Actual distance, sensitive to magnitude
- Dot product: Unnormalized cosine, faster computation`
    },
    {
      title: "Building Embedding Pipelines",
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      content: `Production embedding pipelines require careful design for chunking, indexing, and retrieval.

**Chunking Strategies** (critical for RAG):
- **Fixed-size**: Split by character/token count (e.g., 512 tokens with 50-token overlap)
- **Sentence-based**: Split on sentence boundaries using NLP tokenizers
- **Semantic chunking**: Use embedding similarity to find natural breakpoints
- **Recursive character splitting**: LangChain's default — tries paragraph, sentence, then character splits
- **Document-structure aware**: Respect headers, sections, code blocks

**Optimal Chunk Sizes**:
- Most embedding models: 256-512 tokens per chunk
- Overlap: 10-20% prevents information loss at boundaries
- Too small: Loses context. Too large: Dilutes relevance.

**Indexing Pipeline**:
1. Extract text from sources (PDF, HTML, Markdown, DOCX)
2. Clean and preprocess (remove boilerplate, normalize whitespace)
3. Chunk using appropriate strategy
4. Generate embeddings via API or local model
5. Store in vector database with metadata (source, page, date)
6. Build indexes (HNSW recommended for most use cases)

**Retrieval Optimization**:
- **Hybrid search**: Combine vector similarity with BM25 keyword matching
- **Reranking**: Use cross-encoder models (Cohere Rerank, ColBERT) to re-score top-K results
- **Metadata filtering**: Pre-filter by date, source, category before vector search
- **Multi-query retrieval**: Generate multiple query variations, retrieve for each, deduplicate
- **Maximal Marginal Relevance (MMR)**: Balance relevance with diversity in results

**Monitoring & Maintenance**:
- Track retrieval precision/recall with labeled evaluation sets
- Monitor embedding drift as models are updated
- Implement incremental indexing for new documents
- Set up alerts for query latency spikes`
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📐 Embeddings & Vector Databases
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Deep dive into word/sentence embeddings, vector databases, similarity search algorithms, and production embedding pipelines.
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
