import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ChevronRight, BookOpen, Type, Languages, MessageSquare, BarChart3, Sparkles, HelpCircle, Link, Database, Search } from "lucide-react";
import { motion } from "framer-motion";

export const NLPTopics = () => {
  const concepts = [
    {
      title: "Tokenization & Text Processing",
      description: "Tokenization splits text into tokens — the fundamental units that language models process. BPE (Byte Pair Encoding) used by GPT models builds a vocabulary by iteratively merging frequent character pairs. SentencePiece (used by Llama) works directly on raw text without pre-tokenization. WordPiece (BERT) is similar to BPE but uses likelihood-based merging. Understanding tokenization is crucial because it directly affects model cost, context length, and multilingual performance.",
      icon: Type,
      keyPoints: ["BPE: GPT-2/3/4 tokenizer — ~100K vocab size", "tiktoken library for counting OpenAI tokens", "1 token ≈ 4 characters in English, varies by language"],
      realWorld: "OpenAI's tiktoken and Hugging Face tokenizers are the standard tools. cl100k_base is GPT-4's tokenizer.",
      learnMoreUrl: "https://huggingface.co/docs/tokenizers/en/index"
    },
    {
      title: "Word Embeddings & Representations",
      description: "Word embeddings map words to dense vectors where semantic relationships are preserved. Word2Vec (2013) learned that 'king - man + woman ≈ queen'. GloVe combined global co-occurrence statistics with local context. FastText added subword information for handling rare words. Modern contextual embeddings from BERT/GPT produce different vectors for the same word based on context — 'bank' in 'river bank' vs 'bank account' get different representations.",
      icon: Sparkles,
      keyPoints: ["Word2Vec: Skip-gram and CBOW architectures", "Contextual embeddings capture polysemy", "Sentence-BERT enables efficient semantic search"],
      realWorld: "Google's Word2Vec trained on Google News. Sentence-transformers power most modern search and RAG systems.",
      learnMoreUrl: "https://www.sbert.net/"
    },
    {
      title: "Named Entity Recognition (NER)",
      description: "NER identifies and classifies named entities in text — persons, organizations, locations, dates, monetary values, etc. Traditional approaches used CRF (Conditional Random Fields) with hand-crafted features. Modern NER uses transformer models fine-tuned on datasets like CoNLL-2003 and OntoNotes. spaCy provides production-ready NER pipelines. For custom entities (product names, medical terms), you can fine-tune models on domain-specific annotated data.",
      icon: FileText,
      keyPoints: ["BIO tagging: B-PER, I-PER, O for person entities", "spaCy NER supports 18 entity types out of the box", "Few-shot NER with GPT-4 for rapid prototyping"],
      realWorld: "LinkedIn uses NER for profile parsing. Google uses it for Knowledge Graph population. Healthcare NER extracts drug names and symptoms.",
      learnMoreUrl: "https://spacy.io/usage/linguistic-features#named-entities"
    },
    {
      title: "Sentiment Analysis & Opinion Mining",
      description: "Sentiment analysis determines the emotional tone of text — positive, negative, or neutral. Aspect-based sentiment analysis (ABSA) identifies sentiment toward specific aspects ('The food was great but service was slow'). Modern approaches use pre-trained models like RoBERTa fine-tuned on sentiment datasets. VADER provides rule-based sentiment for social media text. LLMs can perform zero-shot sentiment analysis with nuanced reasoning.",
      icon: BarChart3,
      keyPoints: ["VADER: rule-based, great for social media", "Fine-tuned BERT achieves 95%+ on SST-2", "Aspect-based: entity-level sentiment extraction"],
      realWorld: "Twitter/X uses sentiment for trending topics. Brandwatch and Sprout Social use it for brand monitoring. Financial sentiment drives trading signals.",
      learnMoreUrl: "https://huggingface.co/blog/sentiment-analysis-python"
    },
    {
      title: "Machine Translation & Multilingual NLP",
      description: "Neural Machine Translation (NMT) uses encoder-decoder transformer architectures. The original Transformer paper ('Attention is All You Need', 2017) was specifically about translation. Modern multilingual models like mBART, NLLB-200 (No Language Left Behind), and M2M-100 can translate between 200+ languages. Multilingual embeddings (LABSE, multilingual-e5) enable cross-lingual search and retrieval.",
      icon: Languages,
      keyPoints: ["NLLB-200 covers 200 languages including low-resource ones", "Back-translation augments training data", "Cross-lingual transfer: train in English, apply to other languages"],
      realWorld: "Google Translate uses a massive multilingual transformer. DeepL uses specialized NMT. Meta's SeamlessM4T handles speech + text translation.",
      learnMoreUrl: "https://ai.meta.com/research/no-language-left-behind/"
    },
    {
      title: "Text Summarization & Generation",
      description: "Extractive summarization selects key sentences from the source text. Abstractive summarization generates new text that captures the meaning. Modern approaches use LLMs for high-quality abstractive summaries. Controlled generation techniques (temperature, top-p, frequency penalty) shape output characteristics. Structured output generation (JSON mode, function calling) ensures machine-readable responses. Constrained decoding and grammar-based generation ensure format compliance.",
      icon: MessageSquare,
      keyPoints: ["ROUGE metrics evaluate summary quality", "Extractive: TextRank, BERT-based selection", "Abstractive: T5, BART, or LLM-based generation"],
      realWorld: "Notion AI summarizes documents. Slack uses AI for channel summaries. Bloomberg GPT summarizes financial reports.",
      learnMoreUrl: "https://huggingface.co/docs/transformers/en/tasks/summarization"
    },
    {
      title: "Question Answering Systems",
      description: "QA systems extract or generate answers from text. Extractive QA (SQuAD-style) identifies answer spans within a passage — BERT-based models dominated this for years. Generative QA uses LLMs to synthesize answers from multiple sources. Open-domain QA combines retrieval (finding relevant documents) with reading comprehension (extracting answers). Modern RAG systems are essentially open-domain QA at scale. Benchmarks: SQuAD 2.0, Natural Questions, TriviaQA.",
      icon: HelpCircle,
      keyPoints: ["Extractive QA: predict start and end token positions", "Open-domain: retriever + reader pipeline (DPR + BERT)", "Modern approach: RAG with LLM replaces traditional QA pipelines"],
      realWorld: "Google Search uses QA to show featured snippets. Alexa and Siri use QA for factual queries. Enterprise search tools use QA for internal knowledge bases.",
      learnMoreUrl: "https://huggingface.co/docs/transformers/en/tasks/question_answering"
    },
    {
      title: "Coreference Resolution & Relation Extraction",
      description: "Coreference resolution identifies when different expressions refer to the same entity ('Obama' → 'he' → 'the president'). This is critical for document understanding and knowledge graph construction. Relation extraction identifies semantic relationships between entities ('Elon Musk' → 'CEO of' → 'Tesla'). Together, they enable structured information extraction from unstructured text. SpanBERT and neural coref models achieve near-human performance.",
      icon: Link,
      keyPoints: ["SpanBERT achieves state-of-the-art coreference resolution", "Relation types: is-a, part-of, located-in, works-for", "Knowledge graph construction from text via NER + RE"],
      realWorld: "Google Knowledge Graph uses relation extraction at scale. Bloomberg extracts corporate relationships from news. Medical NLP extracts drug-disease relations from literature.",
      learnMoreUrl: "https://arxiv.org/abs/1907.10529"
    },
    {
      title: "Information Retrieval & Semantic Search",
      description: "Information retrieval (IR) finds relevant documents for a query. Traditional IR uses TF-IDF and BM25 (lexical matching). Neural IR uses dense embeddings for semantic matching — ColBERT provides token-level interaction for high accuracy. Hybrid search combines BM25 + dense retrieval for the best of both worlds. Learned sparse representations (SPLADE) bridge lexical and semantic approaches. Cross-encoders re-rank candidates for maximum relevance.",
      icon: Search,
      keyPoints: ["BM25: still competitive, no training needed, fast", "ColBERT: late interaction for efficient neural retrieval", "Hybrid: BM25 + dense retrieval with reciprocal rank fusion"],
      realWorld: "Elasticsearch 8+ supports dense vector search. Vespa.ai powers Yahoo and Spotify search. Cohere Rerank is widely used for re-ranking.",
      learnMoreUrl: "https://www.sbert.net/examples/applications/retrieve_rerank/README.html"
    },
    {
      title: "Text Classification & Topic Modeling",
      description: "Text classification assigns predefined categories to text — spam detection, intent classification, content moderation. Fine-tuned BERT models achieve state-of-the-art on most benchmarks. Zero-shot classification using NLI models (BART-MNLI) handles unseen categories without training. Topic modeling discovers latent themes in document collections — LDA (Latent Dirichlet Allocation) is classical, BERTopic uses transformer embeddings + HDBSCAN clustering for modern topic discovery.",
      icon: Database,
      keyPoints: ["SetFit: few-shot classification with 8 examples matches full fine-tuning", "BERTopic: BERT embeddings + UMAP + HDBSCAN for topics", "Zero-shot via NLI: classify without any labeled data"],
      realWorld: "Gmail uses text classification for spam filtering. Reddit uses it for content moderation. News organizations use topic modeling to track emerging stories.",
      learnMoreUrl: "https://maartengr.github.io/BERTopic/index.html"
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200 border-0 px-4 py-1.5">
            <FileText className="w-4 h-4 mr-1" /> Language Understanding
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            NLP & Text Processing
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            The foundations of language AI — from tokenization and embeddings to sentiment analysis, NER, and machine translation.
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
                    <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 shadow-md">
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
                          <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-sm"><span className="font-semibold text-foreground">Real-World:</span> <span className="text-muted-foreground">{concept.realWorld}</span></p>
                  </div>
                  <Button variant="ghost" className="w-full justify-between text-sky-600 hover:text-sky-700 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-900/30" onClick={() => window.open(concept.learnMoreUrl, '_blank', 'noopener,noreferrer')}>
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
