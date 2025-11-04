import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Database, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const knowledgeEntries = [
  {
    title: "Advanced Prompt Engineering Fundamentals",
    content: "Prompt engineering is the art and science of crafting effective instructions for AI systems. Key principles include: 1) Clarity - Be explicit and unambiguous in your requests. 2) Context - Provide sufficient background information. 3) Specificity - Detail exactly what you want. 4) Structure - Organize prompts logically. 5) Examples - Use few-shot learning with examples. 6) Constraints - Set boundaries and limitations. 7) Tone - Specify desired communication style. 8) Format - Define output structure. Advanced techniques involve chain-of-thought reasoning, where you ask the AI to think step-by-step, role-playing to leverage specific perspectives, and iterative refinement based on outputs.",
    category: "Fundamentals"
  },
  {
    title: "Chain-of-Thought Prompting Techniques",
    content: "Chain-of-Thought (CoT) prompting dramatically improves AI reasoning by asking the model to show its work. Instead of asking for direct answers, prompt the AI to break down problems step-by-step. Example: 'Let's think through this step by step: First, consider... Then, analyze... Finally, conclude...' This technique is especially powerful for: mathematical problems, logical reasoning, complex decision-making, multi-step tasks, and debugging. Variations include Zero-Shot CoT (just add 'Let's think step by step'), Few-Shot CoT (provide examples with reasoning), and Tree-of-Thoughts (explore multiple reasoning paths).",
    category: "Advanced Techniques"
  },
  {
    title: "Role-Based Prompting Strategies",
    content: "Role-based prompting leverages the AI's ability to adopt specific personas and expertise. By assigning a role, you activate relevant knowledge and communication styles. Effective roles include: Expert roles ('As a senior software architect...'), Professional personas ('Act as a marketing consultant...'), Fictional characters for creative tasks, Teaching roles ('Explain like I'm a beginner...'), Critical thinker ('As a devil's advocate...'). Best practices: Be specific about the role's expertise level, define the context and constraints, specify the audience, and combine roles with other techniques for enhanced results.",
    category: "Advanced Techniques"
  },
  {
    title: "Few-Shot Learning Mastery",
    content: "Few-shot learning provides the AI with examples to guide its responses. Structure: Task description + Examples + New prompt. This dramatically improves output quality and consistency. Guidelines: Use 2-5 high-quality examples, ensure examples match your desired format exactly, include diverse scenarios, maintain consistent structure across examples, explicitly label input/output sections. Advanced: Vary complexity in examples, include edge cases, use examples to establish tone and style, combine with other techniques like CoT for maximum effectiveness.",
    category: "Core Concepts"
  },
  {
    title: "Prompt Formatting Best Practices",
    content: "Effective prompt formatting enhances clarity and results. Use clear section headers (###, **bold**, or caps), separate instructions from content with delimiters (\"\"\", ---), number steps for sequential tasks, use bullet points for lists, employ XML-style tags for structured content (<context></context>), indent hierarchical information, add explicit output format specifications, include examples in separate blocks. For complex prompts: start with objective, provide context, list requirements, show examples, specify constraints, define success criteria.",
    category: "Best Practices"
  },
  {
    title: "Zero-Shot vs Few-Shot Prompting",
    content: "Zero-shot prompting means asking the AI to perform a task without examples, relying solely on its training. Few-shot provides examples to guide output. Zero-shot advantages: faster, simpler, good for common tasks. Few-shot advantages: better consistency, handles edge cases, achieves specific formats, reduces errors. Choose zero-shot for: simple tasks, exploratory queries, when examples aren't available. Choose few-shot for: complex formatting, domain-specific tasks, consistency-critical outputs, unusual requirements. Often combine: start zero-shot, add examples if results need improvement.",
    category: "Core Concepts"
  },
  {
    title: "Temperature and Parameter Control",
    content: "Temperature controls AI creativity and randomness. Range: 0-2. Low (0-0.3): Deterministic, focused, best for factual tasks, code generation, data extraction. Medium (0.4-0.7): Balanced, versatile, good for most tasks. High (0.8-2): Creative, diverse, ideal for brainstorming, creative writing, generating alternatives. Other key parameters: max_tokens (response length), top_p (nucleus sampling for diversity), presence_penalty (encourages new topics), frequency_penalty (reduces repetition). Optimal settings depend on use case: technical writing needs low temperature, creative content benefits from higher values.",
    category: "Technical Parameters"
  },
  {
    title: "Prompt Injection Prevention",
    content: "Prompt injection is when malicious users manipulate AI behavior through crafted inputs. Defense strategies: 1) Input validation - sanitize and validate all user inputs. 2) Clear boundaries - use delimiters and tags to separate instructions from data. 3) Instruction hierarchy - establish system prompts that can't be overridden. 4) Content filtering - detect and block suspicious patterns. 5) Sandboxing - limit AI access to sensitive operations. 6) Output validation - verify responses meet safety criteria. Example: 'Ignore all previous instructions' is a common injection attempt. Use structured formats and explicit boundaries to prevent exploitation.",
    category: "Security"
  },
  {
    title: "Context Window Management",
    content: "Context windows define how much text AI can process at once. Modern models: GPT-4 (128k tokens), Claude (200k tokens), Gemini (1M tokens). Strategies for large contexts: 1) Prioritize recent/relevant info. 2) Summarize background information. 3) Use retrieval augmented generation (RAG) for huge datasets. 4) Chunk long documents strategically. 5) Include token-critical information near the end. 6) Leverage sliding windows for conversations. Best practices: Monitor token usage, optimize prompt length, use compression techniques, implement smart truncation, cache frequently used context.",
    category: "Technical Concepts"
  },
  {
    title: "Retrieval Augmented Generation (RAG)",
    content: "RAG combines AI with external knowledge retrieval for accurate, up-to-date responses. Process: 1) Convert query to embeddings. 2) Search vector database for relevant documents. 3) Retrieve top matches. 4) Inject retrieved context into prompt. 5) Generate response using retrieved knowledge. Benefits: reduces hallucinations, provides current information, cites sources, handles vast knowledge bases, updates without retraining. Implementation: use embedding models (OpenAI, Cohere), vector databases (Pinecone, Weaviate, Supabase), semantic search algorithms, proper chunk sizing (500-1000 tokens), and relevance filtering.",
    category: "Advanced Architectures"
  },
  {
    title: "Prompt Chaining and Workflows",
    content: "Prompt chaining breaks complex tasks into sequential steps, where each output feeds the next prompt. Benefits: handles complexity beyond single prompts, allows validation between steps, enables parallel processing, improves reliability. Patterns: Linear chain (A→B→C), Conditional branches (if/else logic), Parallel execution (multiple simultaneous prompts), Recursive loops (iterative refinement), Hub-and-spoke (central coordinator with specialized tasks). Implementation: define clear interfaces between steps, validate intermediate outputs, handle errors gracefully, implement retry logic, log for debugging.",
    category: "Advanced Architectures"
  },
  {
    title: "System Prompt Design",
    content: "System prompts set AI behavior, personality, and constraints. They're persistent throughout conversations. Effective system prompts include: 1) Role definition ('You are an expert...'), 2) Behavioral guidelines (tone, style, approach), 3) Constraints (what not to do), 4) Output format specifications, 5) Knowledge boundaries, 6) Safety guidelines. Structure: Start with core identity, add capabilities, specify limitations, define output format, include examples if needed. Best practices: keep concise but comprehensive, prioritize critical instructions, test thoroughly, version control prompts, iterate based on real usage.",
    category: "Best Practices"
  },
  {
    title: "Multi-Modal Prompting (Text + Images)",
    content: "Multi-modal AI processes both text and images. Effective strategies: 1) Describe what to look for in images ('Identify objects in the image'), 2) Ask comparative questions ('How does this image differ from...'), 3) Request detailed analysis ('Describe the composition and colors'), 4) Extract text from images (OCR), 5) Generate alt text and captions. Best practices: provide context about the image, ask specific questions, use clear reference points, combine with text instructions, specify output format. Applications: document analysis, visual Q&A, content moderation, accessibility, creative feedback.",
    category: "Advanced Techniques"
  },
  {
    title: "Prompt Testing and Evaluation",
    content: "Systematic testing ensures prompt reliability. Testing framework: 1) Define success criteria (accuracy, format, tone), 2) Create diverse test cases (edge cases, typical inputs, error conditions), 3) Run tests systematically, 4) Measure metrics (accuracy, consistency, latency, cost), 5) Iterate based on results. Evaluation methods: Human review (gold standard), Automated metrics (BLEU, ROUGE for text similarity), A/B testing (compare prompt versions), Regression testing (ensure changes don't break existing functionality), User feedback loops. Document results, version prompts, track performance over time.",
    category: "Quality Assurance"
  },
  {
    title: "Cost Optimization Strategies",
    content: "AI API costs can escalate quickly. Optimization strategies: 1) Reduce prompt length (remove unnecessary context), 2) Use cheaper models for simple tasks (GPT-4 vs GPT-3.5), 3) Cache common responses, 4) Implement rate limiting, 5) Use streaming for better UX without extra cost, 6) Batch requests where possible, 7) Set appropriate max_tokens limits, 8) Monitor and analyze usage patterns. Advanced: fine-tune models for specific tasks to reduce prompt length, use embeddings for search instead of full generation, implement smart caching layers, optimize context window usage.",
    category: "Optimization"
  },
  {
    title: "Fine-Tuning vs Prompt Engineering",
    content: "Fine-tuning trains models on custom data; prompt engineering crafts better instructions. When to fine-tune: repeated tasks with consistent format, domain-specific language, unique style requirements, large volume of similar requests, when prompts become too long/complex. When to use prompting: flexible requirements, rapid iteration needed, limited training data, diverse use cases, quick prototyping. Hybrid approach: use prompt engineering first (faster, cheaper), fine-tune if prompting reaches limits. Cost comparison: prompting is pay-per-use, fine-tuning has upfront training cost but lower inference costs. Most use cases are better solved with advanced prompting.",
    category: "Strategic Decisions"
  },
  {
    title: "Conversational AI and Chat Design",
    content: "Building effective chat experiences requires careful design. Key elements: 1) Maintain conversation context (use full message history), 2) Handle conversation flow (greetings, farewells, topic changes), 3) Implement memory (remember user preferences, previous context), 4) Add personality (consistent voice and tone), 5) Handle errors gracefully, 6) Provide clear affordances (what the bot can do). Technical considerations: manage context window efficiently, implement conversation summarization for long chats, use conversation IDs for tracking, store important context in database, implement rate limiting per user.",
    category: "Application Design"
  },
  {
    title: "Jailbreaking and Safety Considerations",
    content: "Jailbreaking attempts to bypass AI safety measures. Common techniques: role-playing scenarios that normalize harmful content, hypothetical framing ('What if...'), encoded instructions, prompt injection, token smuggling. Defense mechanisms: robust system prompts with clear boundaries, input validation and sanitization, output filtering, rate limiting suspicious patterns, user authentication and reputation systems, human-in-the-loop for sensitive operations. Safety best practices: regular security audits, maintain explicit content policies, implement progressive trust levels, log and review flagged interactions, stay updated on new attack vectors.",
    category: "Security"
  },
  {
    title: "Industry-Specific Prompt Patterns",
    content: "Different industries require specialized prompting approaches. Healthcare: emphasize disclaimers, cite evidence, use medical terminology correctly, prioritize safety. Legal: request citations, acknowledge limitations, use precise language, avoid absolute statements. Finance: require data sources, explain reasoning, emphasize risk factors, use standard metrics. Education: adapt to student level, include examples, encourage critical thinking, provide step-by-step explanations. Customer Service: maintain empathy, provide actionable solutions, escalate when appropriate, follow company policies. Customize prompts with industry context, terminology, and compliance requirements.",
    category: "Domain Applications"
  },
  {
    title: "Multilingual Prompting Techniques",
    content: "Effective multilingual AI usage requires special considerations. Strategies: 1) Specify target language explicitly ('Respond in Spanish'), 2) Provide context about regional variations, 3) Use native language prompts for better accuracy, 4) Request translations with cultural context, 5) Verify idioms and expressions appropriately. Challenges: quality varies by language (English typically best), context window fills faster with non-Latin scripts, some languages have limited training data. Solutions: use language-specific models when available, provide English scaffolding for complex tasks, validate outputs with native speakers, consider cultural nuances in tone and formality.",
    category: "Advanced Techniques"
  }
];

export const KnowledgePopulator = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(0);

  const populateKnowledge = async () => {
    setLoading(true);
    setProgress(0);
    setCompleted(0);

    const total = knowledgeEntries.length;
    let successCount = 0;

    for (let i = 0; i < knowledgeEntries.length; i++) {
      const entry = knowledgeEntries[i];
      
      try {
        const { error } = await supabase.functions.invoke("prompt-ai", {
          body: {
            action: "embed",
            addToKnowledge: {
              title: entry.title,
              content: entry.content,
              category: entry.category
            }
          }
        });

        if (error) {
          console.error(`Failed to add ${entry.title}:`, error);
          toast.error(`Failed: ${entry.title}`);
        } else {
          successCount++;
          toast.success(`Added: ${entry.title}`);
        }
      } catch (error) {
        console.error(`Error adding ${entry.title}:`, error);
      }

      setCompleted(i + 1);
      setProgress(((i + 1) / total) * 100);
    }

    setLoading(false);
    toast.success(`Knowledge base populated! Added ${successCount}/${total} entries.`);
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Knowledge Base Populator
        </CardTitle>
        <CardDescription>
          Add {knowledgeEntries.length} comprehensive AI knowledge entries to enhance RAG capabilities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={populateKnowledge}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Populating... {completed}/{knowledgeEntries.length}
            </>
          ) : (
            <>
              <Database className="w-4 h-4 mr-2" />
              Populate Knowledge Base
            </>
          )}
        </Button>

        {loading && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground text-center">
              {completed}/{knowledgeEntries.length} entries added ({Math.round(progress)}%)
            </p>
          </div>
        )}

        {progress === 100 && !loading && (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 justify-center">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Knowledge base populated successfully!</span>
          </div>
        )}

        <div className="text-xs text-muted-foreground space-y-1 mt-4">
          <p>This will add comprehensive knowledge about:</p>
          <ul className="list-disc list-inside space-y-0.5 ml-2">
            <li>Advanced prompt engineering techniques</li>
            <li>Chain-of-thought and role-based prompting</li>
            <li>RAG and multi-modal approaches</li>
            <li>Security and safety considerations</li>
            <li>Cost optimization strategies</li>
            <li>Industry-specific patterns</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
