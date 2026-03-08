import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, ChevronRight, BookOpen, Server, BarChart3, GitBranch, Shield, Monitor, Container, Cpu, Cloud, FileText } from "lucide-react";
import { motion } from "framer-motion";

export const MLOpsTopics = () => {
  const concepts = [
    {
      title: "Model Serving & APIs",
      description: "Model serving is the process of deploying trained models to handle real-time or batch inference requests. Key approaches: REST APIs (FastAPI, Flask), gRPC for high-throughput, and serverless functions for sporadic traffic. For LLMs, specialized serving frameworks like vLLM (PagedAttention for efficient KV cache), Text Generation Inference (TGI), and Ollama handle the unique challenges of autoregressive generation — continuous batching, speculative decoding, and KV cache management.",
      icon: Server,
      keyPoints: ["vLLM: PagedAttention enables 24x throughput vs naive serving", "TGI: Hugging Face's production LLM serving solution", "Batching strategies: static, dynamic, continuous"],
      realWorld: "Hugging Face Inference Endpoints serve millions of requests. Anyscale/Ray Serve powers OpenAI's infrastructure.",
      learnMoreUrl: "https://docs.vllm.ai/en/latest/"
    },
    {
      title: "Model Monitoring & Observability",
      description: "Production AI systems need continuous monitoring for data drift (input distribution changes), concept drift (relationship between inputs and outputs changes), and model degradation. Tools like Evidently AI, WhyLabs, and Arize detect drift automatically. LLM-specific monitoring tracks token usage, latency distributions, error rates, and output quality. Tracing tools (LangSmith, Langfuse) provide request-level observability for LLM chains.",
      icon: Monitor,
      keyPoints: ["Data drift: PSI, KS test, Wasserstein distance", "LangSmith/Langfuse for LLM trace observability", "Alert on latency, error rate, and quality regressions"],
      realWorld: "Uber uses ML monitoring for Michelangelo platform. Netflix monitors recommendation model performance continuously.",
      learnMoreUrl: "https://docs.smith.langchain.com/"
    },
    {
      title: "CI/CD for Machine Learning",
      description: "ML CI/CD extends traditional software CI/CD with model training, evaluation, and deployment pipelines. Key tools: GitHub Actions for automation, DVC for data versioning, MLflow for experiment tracking and model registry, and Weights & Biases for experiment comparison. The pipeline: code change → data validation → training → evaluation → model registry → canary deployment → full rollout. Feature stores (Feast, Tecton) manage training and serving features.",
      icon: GitBranch,
      keyPoints: ["DVC: Git for data — version datasets and models", "MLflow: experiment tracking + model registry", "Feature stores unify training and serving features"],
      realWorld: "Spotify uses ML pipelines for personalization. Airbnb's Bighead platform manages ML lifecycle end-to-end.",
      learnMoreUrl: "https://mlflow.org/docs/latest/index.html"
    },
    {
      title: "A/B Testing & Experimentation",
      description: "A/B testing for AI models compares model variants on real users with statistical rigor. Shadow mode deploys new models alongside production without affecting users. Canary deployments route a small percentage of traffic to new models. Multi-armed bandits dynamically allocate traffic to better-performing variants. For LLMs, human evaluation frameworks (Chatbot Arena's Elo rating) complement automated metrics. Key: define clear success metrics before testing.",
      icon: BarChart3,
      keyPoints: ["Shadow mode: compare models without user impact", "Canary deployment: 1% → 5% → 25% → 100% rollout", "Interleaving experiments for ranking models"],
      realWorld: "Netflix runs thousands of ML A/B tests simultaneously. Chatbot Arena uses Elo ratings from 1M+ human comparisons.",
      learnMoreUrl: "https://neptune.ai/blog/ml-experiment-tracking"
    },
    {
      title: "Model Optimization & Quantization",
      description: "Quantization reduces model precision (FP32 → INT8/INT4) to decrease memory usage and increase inference speed with minimal accuracy loss. GGUF format (llama.cpp) enables running LLMs on CPUs and consumer GPUs. AWQ and GPTQ provide GPU-optimized quantization. Knowledge distillation trains smaller 'student' models from larger 'teacher' models. Pruning removes less important weights. ONNX Runtime provides cross-platform optimization.",
      icon: Rocket,
      keyPoints: ["INT4 quantization: 4x memory reduction, ~1% accuracy loss", "GGUF: universal format for local LLM inference", "Knowledge distillation: DistilBERT is 60% smaller, 97% as good"],
      realWorld: "Apple uses quantized models for on-device Siri. TheBloke provides quantized versions of every popular open-source LLM.",
      learnMoreUrl: "https://huggingface.co/docs/optimum/en/index"
    },
    {
      title: "Security & Compliance",
      description: "Production AI requires security at every layer. Model security: adversarial attacks, model extraction prevention, prompt injection defense. Data security: PII detection and redaction, data residency compliance, encryption at rest and in transit. Compliance frameworks: SOC 2, GDPR, HIPAA for healthcare AI, EU AI Act risk categories. Responsible AI: bias auditing, fairness metrics, model cards, and impact assessments.",
      icon: Shield,
      keyPoints: ["OWASP Top 10 for LLM Applications", "Model cards document capabilities and limitations", "EU AI Act: risk-based classification of AI systems"],
      realWorld: "Microsoft Responsible AI Standard governs all AI products. Google's Model Cards provide transparency for all public models.",
      learnMoreUrl: "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
    },
    {
      title: "Containerization & Orchestration",
      description: "Docker packages ML models with their dependencies into portable containers. Kubernetes orchestrates container deployments with auto-scaling, health checks, and rolling updates. KServe (formerly KFServing) provides Kubernetes-native model serving with auto-scaling to zero, canary deployments, and multi-model serving. Triton Inference Server (Nvidia) supports TensorFlow, PyTorch, ONNX, and custom backends in a single serving solution with dynamic batching.",
      icon: Container,
      keyPoints: ["Docker multi-stage builds minimize image size for ML", "KServe: Kubernetes CRD for model serving with auto-scaling", "Triton: concurrent model execution with dynamic batching"],
      realWorld: "Google Cloud Vertex AI uses containers for custom model serving. AWS SageMaker runs models in Docker containers. Seldon Core provides production ML deployment on Kubernetes.",
      learnMoreUrl: "https://kserve.github.io/website/"
    },
    {
      title: "GPU Infrastructure & Cost Optimization",
      description: "Training and inference costs dominate ML budgets. Key strategies: spot/preemptible instances (70-90% cheaper), right-sizing GPU selection (A100 vs L4 vs T4), model quantization to reduce GPU memory, and batch inference for non-real-time workloads. Multi-GPU training with DeepSpeed ZeRO or PyTorch FSDP distributes model and data across GPUs. Cloud GPU comparisons: AWS (p5, g5), GCP (A3, G2), Azure (ND H100), and specialized providers (Lambda, RunPod, Together.ai).",
      icon: Cpu,
      keyPoints: ["Spot instances: 70-90% savings with interruption handling", "H100 vs A100 vs L4: match GPU to workload needs", "DeepSpeed ZeRO: partition optimizer, gradients, and parameters"],
      realWorld: "Meta trained Llama 3 on 16K H100 GPUs. Stability AI uses A100 clusters for Stable Diffusion training. RunPod offers on-demand H100s at $3.89/hr.",
      learnMoreUrl: "https://www.deepspeed.ai/"
    },
    {
      title: "Edge Deployment & On-Device AI",
      description: "Edge AI runs models directly on user devices — phones, browsers, IoT devices — reducing latency and preserving privacy. Key runtimes: ONNX Runtime (cross-platform), TensorFlow Lite (mobile), Core ML (Apple), and WebAssembly/WebGPU for browsers. Model optimization for edge: pruning, quantization (INT8/INT4), knowledge distillation, and architecture search (MobileNet, EfficientNet-Lite). On-device LLMs: Phi-3-mini, Gemma 2B, and Llama 3.2 1B run on smartphones.",
      icon: Cloud,
      keyPoints: ["TFLite and Core ML for mobile deployment", "WebGPU enables in-browser model inference", "Phi-3-mini: 3.8B parameter model runs on-device"],
      realWorld: "Apple Intelligence runs models on-device for privacy. Google Pixel uses on-device AI for photo editing. Samsung Galaxy AI uses on-device translation.",
      learnMoreUrl: "https://onnxruntime.ai/"
    },
    {
      title: "Data Pipelines & Feature Engineering",
      description: "Production ML requires robust data pipelines for ingestion, cleaning, transformation, and feature computation. Apache Airflow orchestrates data workflows. Feature stores (Feast, Tecton, Hopsworks) ensure consistency between training and serving features. Data validation (Great Expectations, TFX Data Validation) catches schema drift and anomalies before they impact models. Streaming features from Kafka or Flink enable real-time ML applications.",
      icon: FileText,
      keyPoints: ["Feast: open-source feature store for offline/online serving", "Great Expectations: data quality validation framework", "Point-in-time correctness prevents data leakage in training"],
      realWorld: "Uber's Michelangelo platform manages features for 1000s of models. DoorDash uses real-time features for delivery time prediction. Stripe uses features for fraud detection.",
      learnMoreUrl: "https://feast.dev/"
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-lime-100 text-lime-800 dark:bg-lime-900/50 dark:text-lime-200 border-0 px-4 py-1.5">
            <Rocket className="w-4 h-4 mr-1" /> Production AI Systems
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-lime-600 via-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            AI Deployment & MLOps
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Ship AI to production — model serving, monitoring, CI/CD, optimization, and security for real-world AI systems.
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
                    <div className="p-3 rounded-xl bg-gradient-to-br from-lime-500 to-green-500 shadow-md">
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
                          <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-sm"><span className="font-semibold text-foreground">Real-World:</span> <span className="text-muted-foreground">{concept.realWorld}</span></p>
                  </div>
                  <Button variant="ghost" className="w-full justify-between text-lime-600 hover:text-lime-700 hover:bg-lime-50 dark:text-lime-400 dark:hover:bg-lime-900/30" onClick={() => window.open(concept.learnMoreUrl, '_blank', 'noopener,noreferrer')}>
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
