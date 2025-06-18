
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Target, Layers, Zap, Brain, Code, Lightbulb, Workflow, Cpu, Globe, Microscope, Rocket } from "lucide-react";
import { useState } from "react";

export const ExpandedTechniques = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<number | null>(null);

  const techniques = [
    {
      title: "Zero-Shot Prompting",
      description: "Get AI to perform tasks without any examples, using clear instructions and context.",
      icon: MessageSquare,
      level: "Beginner",
      color: "from-green-500 to-emerald-500",
      example: "Translate the following English text to French: 'Hello, how are you today?' - No examples needed, just clear instructions.",
      detailedExample: `Task: Classify the sentiment of this review
Instruction: "Analyze the sentiment of the following product review and classify it as positive, negative, or neutral. Provide your reasoning."
Review: "The product arrived quickly and works as expected, though the packaging could be better."
Expected Output: Positive - The review mentions quick delivery and functional product, outweighing the minor packaging concern.`,
      useCases: ["Quick translations", "Simple classifications", "Basic text generation", "Content summarization", "Question answering"],
      tips: [
        "Be specific about the desired output format",
        "Provide clear context and constraints",
        "Use action words like 'translate', 'summarize', 'explain'",
        "Include examples of the expected format",
        "Set clear boundaries for the response"
      ],
      advantages: ["Fast setup", "No training data needed", "Works immediately", "Good for simple tasks"],
      bestFor: "Quick tasks, simple classifications, when you need immediate results without training"
    },
    {
      title: "Few-Shot Prompting",
      description: "Provide examples to guide AI behavior and establish patterns for consistent outputs.",
      icon: Target,
      level: "Intermediate",
      color: "from-blue-500 to-cyan-500",
      example: "Examples: Positive: 'I love this!' → Sentiment: Positive | Negative: 'This is terrible.' → Sentiment: Negative | Now classify: 'The service was okay.'",
      detailedExample: `Task: Extract key information from customer feedback
Example 1:
Input: "Great product! Fast shipping. Will buy again. 5 stars."
Output: {"sentiment": "positive", "rating": 5, "mentions_shipping": true, "mentions_quality": true}

Example 2:
Input: "Poor quality, slow delivery, disappointed. 2 stars."
Output: {"sentiment": "negative", "rating": 2, "mentions_shipping": true, "mentions_quality": true}

Now process: "Decent product, average shipping time. 3 stars."`,
      useCases: ["Pattern recognition", "Style mimicking", "Complex classifications", "Data extraction", "Format standardization"],
      tips: [
        "Use 2-5 diverse examples covering different scenarios",
        "Ensure examples cover edge cases and variations",
        "Maintain consistent formatting across all examples",
        "Include both positive and negative examples",
        "Show the exact input-output relationship"
      ],
      advantages: ["Higher accuracy", "Consistent formatting", "Better pattern recognition", "Handles edge cases"],
      bestFor: "When you need consistent formatting, pattern matching, or handling various input types"
    },
    {
      title: "Chain-of-Thought (CoT)",
      description: "Guide AI through step-by-step reasoning to improve accuracy in complex problem-solving.",
      icon: Layers,
      level: "Advanced",
      color: "from-purple-500 to-indigo-500",
      example: "Solve step by step: Problem: Store has 150 apples, sells 60%. Step 1: Calculate 60% of 150 = 90. Step 2: Subtract 90 from 150 = 60 apples left.",
      detailedExample: `Problem: A company's revenue increased from $100,000 to $150,000, but expenses increased from $60,000 to $95,000. What's the percentage change in profit margin?

Step-by-step solution:
Step 1: Calculate initial profit = $100,000 - $60,000 = $40,000
Step 2: Calculate initial profit margin = ($40,000 ÷ $100,000) × 100 = 40%
Step 3: Calculate new profit = $150,000 - $95,000 = $55,000  
Step 4: Calculate new profit margin = ($55,000 ÷ $150,000) × 100 = 36.67%
Step 5: Calculate change = 36.67% - 40% = -3.33%
Answer: The profit margin decreased by 3.33 percentage points.`,
      useCases: ["Mathematical problems", "Logical reasoning", "Complex analysis", "Multi-step processes", "Problem diagnosis"],
      tips: [
        "Break complex problems into logical, sequential steps",
        "Ask for reasoning before the final answer",
        "Use phrases like 'think step by step' or 'show your work'",
        "Number each step clearly",
        "Verify intermediate results"
      ],
      advantages: ["Higher accuracy on complex tasks", "Transparent reasoning", "Error detection", "Better understanding"],
      bestFor: "Complex calculations, logical puzzles, multi-step analysis, when reasoning transparency is important"
    },
    {
      title: "Role-Based Prompting",
      description: "Assign specific roles or personas to AI for specialized knowledge and perspective.",
      icon: Brain,
      level: "Intermediate",
      color: "from-orange-500 to-red-500",
      example: "You are a financial advisor with 20 years of experience. A 30-year-old client asks about retirement planning. Provide comprehensive advice.",
      detailedExample: `Role Assignment:
"You are Dr. Sarah Chen, a senior cybersecurity consultant with 15 years of experience in enterprise security. You specialize in risk assessment and have worked with Fortune 500 companies. You communicate in a professional but accessible manner.

Task: A mid-sized company (500 employees) wants to implement a remote work policy. They're concerned about security risks. Provide a comprehensive security assessment and recommendations.

Response should include:
- Risk assessment framework
- Specific security measures
- Implementation timeline
- Cost considerations
- Employee training requirements"`,
      useCases: ["Expert consultations", "Creative writing", "Professional advice", "Specialized analysis", "Industry-specific content"],
      tips: [
        "Define the role clearly with relevant expertise level",
        "Specify years of experience and specializations",
        "Include relevant background information and context",
        "Set the appropriate tone and communication style",
        "Mention specific credentials or achievements"
      ],
      advantages: ["Expert-level responses", "Appropriate tone", "Specialized knowledge", "Contextual understanding"],
      bestFor: "Professional advice, expert analysis, industry-specific content, when specialized knowledge is needed"
    },
    {
      title: "Template-Based Prompting",
      description: "Create reusable prompt structures for consistent results across similar tasks.",
      icon: Code,
      level: "Beginner",
      color: "from-teal-500 to-green-500",
      example: "Template: Analyze [TOPIC] for [AUDIENCE] focusing on [ASPECTS]. Provide [FORMAT] with [LENGTH] words.",
      detailedExample: `Universal Content Analysis Template:

TOPIC: [Insert topic here]
AUDIENCE: [Target audience description]
PERSPECTIVE: [Analytical angle/focus]
FORMAT: [Output format - bullet points, essay, report, etc.]
LENGTH: [Word count or detail level]
TONE: [Professional, casual, academic, etc.]
SPECIAL_REQUIREMENTS: [Any specific needs]

Example Usage:
TOPIC: Artificial Intelligence in Healthcare
AUDIENCE: Hospital administrators and medical directors
PERSPECTIVE: Implementation challenges and opportunities
FORMAT: Executive summary with bullet points
LENGTH: 500 words
TONE: Professional and balanced
SPECIAL_REQUIREMENTS: Include ROI considerations and compliance factors`,
      useCases: ["Content creation", "Analysis tasks", "Standardized reporting", "Batch processing", "Quality control"],
      tips: [
        "Create placeholders for all variable elements",
        "Test templates with different inputs to ensure flexibility",
        "Document successful template variations for future use",
        "Include optional fields for special requirements",
        "Version control your most effective templates"
      ],
      advantages: ["Consistency", "Time efficiency", "Quality control", "Easy scaling"],
      bestFor: "Repetitive tasks, content series, standardized analysis, team collaboration"
    },
    {
      title: "Iterative Refinement",
      description: "Progressively improve outputs through multiple rounds of feedback and adjustment.",
      icon: Workflow,
      level: "Advanced",
      color: "from-pink-500 to-purple-500",
      example: "Draft 1: Basic description → Draft 2: Add benefits → Draft 3: Adjust tone → Final: Optimize for SEO",
      detailedExample: `Iterative Process Example - Product Description:

Round 1 (Basic): "This is a wireless headphone with noise cancellation."
Feedback: "Make it more compelling, add specific benefits"

Round 2 (Enhanced): "Premium wireless headphones featuring advanced noise cancellation technology for immersive audio experience."
Feedback: "Target millennial audience, emphasize lifestyle benefits"

Round 3 (Targeted): "Level up your audio game with these premium wireless headphones. Advanced noise cancellation lets you escape into your music, podcasts, or calls - perfect for work-from-home productivity or your daily commute."
Feedback: "Add technical specs and SEO keywords"

Final (Optimized): "Level up your audio experience with our premium Bluetooth wireless headphones featuring industry-leading active noise cancellation (ANC). Perfect for remote work, commuting, or leisure - enjoy crystal-clear sound quality with 30-hour battery life and fast charging. Compatible with all devices."`,
      useCases: ["Content optimization", "Creative projects", "Problem solving", "Product development", "Strategy refinement"],
      tips: [
        "Start with a basic version to establish foundation",
        "Provide specific, actionable feedback for each iteration",
        "Build complexity gradually rather than all at once",
        "Test different approaches in separate iterations",
        "Document what works for future reference"
      ],
      advantages: ["High-quality results", "Customized outputs", "Learning opportunity", "Flexibility"],
      bestFor: "High-stakes content, creative projects, complex problem-solving, when perfection matters"
    },
    {
      title: "Constraint-Based Prompting",
      description: "Use specific limitations and boundaries to control AI output format and content.",
      icon: Zap,
      level: "Intermediate",
      color: "from-yellow-500 to-orange-500",
      example: "Write exactly 100 words, positive tone, include 3 features, end with 5-star rating.",
      detailedExample: `Multi-Constraint Example:

Task: Write a product review for a smartwatch
Constraints:
- Exactly 150 words (±5 words acceptable)
- Include at least 4 specific features
- Mention both pros and cons
- Use conversational tone
- Include a numeric rating (1-10)
- Target audience: fitness enthusiasts
- Include one comparison to competitors
- End with a purchase recommendation

Sample Output:
"As a fitness enthusiast, I've been testing this smartwatch for three months, and it's impressed me in several key areas. The GPS accuracy is spot-on during my trail runs, the heart rate monitor provides consistent readings, and the 7-day battery life means I'm not constantly charging. The sleep tracking feature offers detailed insights that have actually improved my recovery routine.

However, the touchscreen can be unresponsive when wet, and the app ecosystem isn't as robust as Apple Watch's. The build quality feels premium though, and it's significantly more affordable than Garmin's equivalent models.

For serious athletes who want reliable tracking without breaking the bank, this is a solid choice. The fitness features are comprehensive and accurate.

Rating: 8.5/10
Recommendation: Buy if you prioritize fitness tracking over smart features."

Word count: 150 words exactly ✓`,
      useCases: ["Social media content", "Structured responses", "Content formatting", "Platform-specific posts", "Quality control"],
      tips: [
        "Set clear word or character limits with acceptable ranges",
        "Specify required elements and their placement",
        "Define tone, style, and audience constraints",
        "Include format requirements (bullets, paragraphs, etc.)",
        "Test constraints with various inputs to ensure feasibility"
      ],
      advantages: ["Precise control", "Platform optimization", "Consistent quality", "Brand alignment"],
      bestFor: "Platform-specific content, brand consistency, when precise specifications are required"
    },
    {
      title: "Meta-Prompting",
      description: "Have AI help create and improve prompts for better performance on specific tasks.",
      icon: Lightbulb,
      level: "Expert",
      color: "from-indigo-500 to-blue-500",
      example: "Help me create a better prompt for generating creative product names. My current prompt needs improvement - suggest specific enhancements.",
      detailedExample: `Meta-Prompting Session:

Current Prompt: "Give me product names for a new energy drink."

Meta-Prompt: "Analyze this prompt and suggest improvements for generating creative, marketable product names for a new energy drink. Consider target audience, brand positioning, naming conventions, and market research best practices."

AI Suggestions:
1. Add target demographic (age, lifestyle, interests)
2. Specify brand personality (edgy, professional, fun, premium)
3. Include positioning against competitors
4. Set naming style preferences (short/long, descriptive/abstract)
5. Request trademark considerations
6. Ask for reasoning behind each suggestion

Improved Prompt:
"Generate 10 creative names for a premium energy drink targeting health-conscious millennials (25-35) who are fitness enthusiasts and entrepreneurs. The brand should convey: natural ingredients, sustained energy, mental clarity, and premium quality. 

Avoid names similar to Red Bull, Monster, or 5-Hour Energy. Prefer names that are:
- 1-2 words maximum
- Easy to pronounce and remember  
- Suitable for trademark registration
- Convey both energy and wellness

For each name, provide a brief rationale explaining the connection to our brand values and target audience psychology."`,
      useCases: ["Prompt optimization", "Task analysis", "Performance improvement", "Training development", "Quality assurance"],
      tips: [
        "Ask AI to analyze your current prompts for weaknesses",
        "Request specific improvement suggestions with reasoning",
        "Test AI-suggested modifications against your goals",
        "Document effective prompt patterns for reuse",
        "Use meta-prompting to understand task requirements better"
      ],
      advantages: ["Continuous improvement", "Expert insights", "Systematic optimization", "Learning tool"],
      bestFor: "Prompt optimization, understanding complex tasks, when you need expert-level prompt engineering"
    },
    {
      title: "Contextual Priming",
      description: "Set up detailed context and background information to prime AI for specialized responses.",
      icon: Globe,
      level: "Advanced",
      color: "from-emerald-500 to-teal-500",
      example: "Context: You're analyzing data for a SaaS company with 50% churn rate in Q1. Industry average is 20%. The company sells project management software to small businesses...",
      detailedExample: `Contextual Priming Example:

Context Setup:
"You are analyzing a critical business situation for TechFlow Solutions, a B2B SaaS company founded in 2019. Here's the context:

Company Profile:
- Product: Project management software for small-medium businesses (10-100 employees)
- Current MRR: $250K, down from $300K six months ago
- Customer base: 850 active accounts
- Primary market: North American small businesses
- Main competitors: Asana, Monday.com, Trello

Current Crisis:
- Q1 churn rate: 47% (industry average: 18%)
- Customer acquisition cost: $180 (up from $120)
- Average customer lifetime: 8 months (down from 14 months)
- Support ticket volume: Up 85% from last quarter
- Recent negative reviews mention: UI complexity, slow loading times, poor customer support

Internal Factors:
- Development team reduced by 30% due to budget cuts
- No product updates in 4 months
- Customer success team overwhelmed
- Marketing budget reduced by 50%

Task: Provide a comprehensive turnaround strategy with prioritized action items, timeline, and expected outcomes. Focus on immediate wins and long-term sustainability."

This context enables the AI to provide specific, relevant advice rather than generic business recommendations.`,
      useCases: ["Business analysis", "Technical consulting", "Industry-specific advice", "Complex decision making"],
      tips: [
        "Provide comprehensive background information",
        "Include relevant metrics and benchmarks", 
        "Set the stakes and urgency level",
        "Mention key constraints and limitations",
        "Define success criteria clearly"
      ],
      advantages: ["Highly relevant responses", "Context-aware recommendations", "Nuanced understanding"],
      bestFor: "Complex business scenarios, technical analysis, when context significantly impacts the solution"
    },
    {
      title: "Multi-Modal Integration",
      description: "Combine different types of inputs (text, data, constraints) for comprehensive analysis.",
      icon: Cpu,
      level: "Expert",
      color: "from-violet-500 to-purple-500",
      example: "Analyze this sales data [table], considering market trends [context], customer feedback [text], and budget constraints [parameters] to recommend strategy.",
      detailedExample: `Multi-Modal Integration Example:

Input Types:
1. Quantitative Data: Sales figures, conversion rates, customer metrics
2. Qualitative Data: Customer feedback, market research, competitor analysis  
3. Constraints: Budget limitations, timeline, resource availability
4. Context: Industry trends, seasonal patterns, company goals

Integrated Prompt:
"Analyze our Q4 marketing performance using multiple data sources:

SALES DATA:
- Total revenue: $1.2M (target: $1.5M)
- Conversion rate: 2.3% (industry avg: 3.1%)
- Customer acquisition cost: $95
- Average order value: $340

CUSTOMER FEEDBACK THEMES:
- Price sensitivity: 68% mention cost concerns
- Product satisfaction: 4.2/5 average rating
- Support experience: 3.7/5 average rating
- Feature requests: Mobile app (mentioned 45 times)

CONSTRAINTS:
- Q1 marketing budget: $75K (reduced from $100K)
- Cannot hire additional staff
- Product development frozen until March
- Must maintain current pricing

MARKET CONTEXT:
- Economic uncertainty affecting B2B spending
- Competitors launching aggressive discount campaigns
- Industry shift toward mobile-first solutions

Provide integrated recommendations that account for all these factors, prioritizing initiatives by ROI and feasibility."`,
      useCases: ["Strategic planning", "Complex analysis", "Data-driven decisions", "Comprehensive assessments"],
      tips: [
        "Clearly separate different types of input",
        "Explain relationships between data sources",
        "Prioritize constraints and limitations",
        "Request integrated rather than isolated analysis",
        "Ask for trade-off considerations"
      ],
      advantages: ["Holistic analysis", "Real-world applicability", "Balanced recommendations"],
      bestFor: "Strategic decisions, complex projects, when multiple factors must be considered simultaneously"
    },
    {
      title: "Progressive Disclosure",
      description: "Gradually reveal information to build understanding and maintain engagement.",
      icon: Microscope,
      level: "Advanced", 
      color: "from-rose-500 to-pink-500",
      example: "Level 1: Basic concept → Level 2: Add complexity → Level 3: Expert details → Level 4: Advanced applications",
      detailedExample: `Progressive Disclosure Example - Teaching Machine Learning:

Level 1 (Foundation):
"Explain machine learning like I'm 10 years old. Use simple analogies."

Level 2 (Building Blocks):
"Now that I understand the basic concept, explain the three main types of machine learning with real-world examples."

Level 3 (Technical Details):
"I'm ready for more technical details. Explain how neural networks work, including the mathematics involved."

Level 4 (Advanced Applications):
"Now explain advanced architectures like transformers and how they're used in large language models like GPT."

Level 5 (Expert Implementation):
"Finally, provide guidance on implementing a transformer model from scratch, including code structure and optimization techniques."

This approach ensures understanding at each level before adding complexity.`,
      useCases: ["Educational content", "Complex explanations", "Training materials", "Onboarding processes"],
      tips: [
        "Start with foundational concepts",
        "Check understanding before progressing",
        "Use appropriate complexity for each level",
        "Build on previous knowledge systematically",
        "Provide clear transition points"
      ],
      advantages: ["Better comprehension", "Reduced cognitive load", "Maintained engagement"],
      bestFor: "Teaching complex topics, user onboarding, when building understanding over time"
    },
    {
      title: "Systematic Evaluation",
      description: "Structure AI responses using evaluation frameworks and scoring systems.",
      icon: Rocket,
      level: "Expert",
      color: "from-amber-500 to-orange-500", 
      example: "Evaluate each option using: Impact (1-10), Feasibility (1-10), Cost (1-10), Risk (1-10). Provide scores and rationale.",
      detailedExample: `Systematic Evaluation Example - Technology Stack Selection:

Evaluation Framework:
- Technical Fit (1-10): How well does it meet our requirements?
- Learning Curve (1-10): How quickly can team adopt it?
- Community Support (1-10): Availability of resources and help
- Scalability (1-10): Can it grow with our needs?
- Cost Effectiveness (1-10): Total cost of ownership
- Long-term Viability (1-10): Will it be supported in 5+ years?

Options Analysis:

React.js:
- Technical Fit: 9/10 (Excellent for our SPA requirements)
- Learning Curve: 7/10 (Moderate learning curve, good docs)
- Community Support: 10/10 (Massive community, extensive resources)
- Scalability: 8/10 (Scales well with proper architecture)
- Cost Effectiveness: 9/10 (Free, low hosting costs)
- Long-term Viability: 9/10 (Backed by Meta, widely adopted)
Total Score: 52/60

Vue.js:
- Technical Fit: 8/10 (Good fit, slightly less feature-rich)
- Learning Curve: 9/10 (Easier learning curve than React)
- Community Support: 7/10 (Good but smaller than React)
- Scalability: 7/10 (Scales well but fewer proven large implementations)
- Cost Effectiveness: 9/10 (Free, similar hosting costs)
- Long-term Viability: 7/10 (Strong but smaller backing)
Total Score: 47/60

Recommendation: React.js based on superior community support and long-term viability, despite Vue's easier learning curve.`,
      useCases: ["Decision making", "Comparative analysis", "Investment evaluation", "Risk assessment"],
      tips: [
        "Define clear evaluation criteria upfront",
        "Use consistent scoring scales",
        "Require justification for each score",
        "Weight factors based on importance",
        "Compare total scores and discuss trade-offs"
      ],
      advantages: ["Objective analysis", "Structured decisions", "Clear rationale", "Comparable results"],
      bestFor: "Important decisions, vendor selection, strategic choices, when objectivity is crucial"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Advanced": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Expert": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Master Advanced Prompting Techniques
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Discover powerful techniques used by AI experts to achieve consistent, high-quality results. 
            From basic prompts to advanced strategies, master the art of communicating with AI systems effectively.
          </p>
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
            <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
              💡 Pro Tip: Click on any technique card to see detailed examples and implementation guides!
            </p>
          </div>
        </div>

        {/* Techniques Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {techniques.map((technique, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-2xl transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 hover:border-purple-300 dark:hover:border-purple-600 overflow-hidden cursor-pointer ${
                selectedTechnique === index ? 'ring-4 ring-purple-300 border-purple-500' : ''
              }`}
              onClick={() => setSelectedTechnique(selectedTechnique === index ? null : index)}
            >
              <div className={`h-3 bg-gradient-to-r ${technique.color}`}></div>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${technique.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <technique.icon className="w-7 h-7 text-white" />
                  </div>
                  <Badge className={getLevelColor(technique.level)}>
                    {technique.level}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                  {technique.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                  {technique.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Basic Example */}
                <div>
                  <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Quick Example:</h4>
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 text-sm text-slate-700 dark:text-slate-300 font-mono leading-relaxed">
                    {technique.example}
                  </div>
                </div>

                {/* Expanded Content */}
                {selectedTechnique === index && (
                  <div className="space-y-6 border-t pt-6">
                    {/* Detailed Example */}
                    <div>
                      <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Detailed Implementation:</h4>
                      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg p-5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-600">
                        <pre className="whitespace-pre-wrap font-mono">{technique.detailedExample}</pre>
                      </div>
                    </div>

                    {/* Advantages */}
                    <div>
                      <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Key Advantages:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {technique.advantages.map((advantage, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs font-medium bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                            ✓ {advantage}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Best For */}
                    <div>
                      <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Best For:</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                        {technique.bestFor}
                      </p>
                    </div>
                  </div>
                )}

                {/* Use Cases */}
                <div>
                  <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Perfect For:</h4>
                  <div className="flex flex-wrap gap-2">
                    {technique.useCases.slice(0, 3).map((useCase, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {useCase}
                      </Badge>
                    ))}
                    {technique.useCases.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{technique.useCases.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Pro Tips */}
                <div>
                  <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Expert Tips:</h4>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    {technique.tips.slice(0, 3).map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                  {selectedTechnique !== index && technique.tips.length > 3 && (
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 font-medium">
                      Click to see {technique.tips.length - 3} more expert tips...
                    </p>
                  )}
                </div>

                {/* Click indicator */}
                {selectedTechnique !== index && (
                  <div className="text-center pt-2 border-t">
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                      👆 Click for detailed examples and implementation guide
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Quick Reference */}
        <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-3xl p-10 text-white shadow-2xl">
          <h3 className="text-4xl font-bold mb-8 text-center">Quick Mastery Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="font-bold text-xl mb-3">Be Laser-Focused</h4>
              <p className="text-sm opacity-90 leading-relaxed">Precise, detailed instructions with clear expectations yield exponentially better results than vague requests</p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">📚</div>
              <h4 className="font-bold text-xl mb-3">Show, Don't Tell</h4>
              <p className="text-sm opacity-90 leading-relaxed">Concrete examples demonstrate desired patterns better than abstract descriptions ever could</p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">🔄</div>
              <h4 className="font-bold text-xl mb-3">Iterate Relentlessly</h4>
              <p className="text-sm opacity-90 leading-relaxed">Refine prompts based on results, feedback, and changing requirements for continuous improvement</p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="font-bold text-xl mb-3">Control Everything</h4>
              <p className="text-sm opacity-90 leading-relaxed">Strategic constraints and boundaries ensure outputs align perfectly with your specific needs and brand</p>
            </div>
          </div>
          
          {/* Success Metrics */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-300 mb-2">10x</div>
              <div className="text-lg font-semibold">Faster Results</div>
              <div className="text-sm opacity-80">With optimized prompting techniques</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">95%</div>
              <div className="text-lg font-semibold">Consistency Rate</div>
              <div className="text-sm opacity-80">Across all AI interactions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">50+</div>
              <div className="text-lg font-semibold">Advanced Techniques</div>
              <div className="text-sm opacity-80">Ready to implement today</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
