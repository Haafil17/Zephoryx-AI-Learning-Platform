
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Lightbulb, Target, Zap, Brain, Trophy, Rocket, Shield, Star } from "lucide-react";
import { useState } from "react";

export const EnhancedBestPractices = () => {
  const [activeCategory, setActiveCategory] = useState("fundamentals");

  const categories = {
    fundamentals: {
      title: "Core Fundamentals",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      practices: [
        {
          type: "do",
          icon: CheckCircle,
          title: "Be Hyper-Specific and Crystal Clear",
          description: "Provide detailed, unambiguous instructions with specific requirements, constraints, and expected outcomes.",
          example: "❌ 'Write about AI' → ✅ 'Write a 500-word executive summary on AI applications in healthcare for hospital administrators, focusing on ROI, implementation challenges, and patient outcomes'",
          tips: [
            "Use concrete numbers, metrics, and specific requirements",
            "Define your target audience with demographic details",
            "Specify exact format, tone, and structure preferences",
            "Include success criteria and measurement parameters",
            "Provide context about intended use and distribution"
          ],
          impact: "Up to 10x improvement in response relevance and usability"
        },
        {
          type: "do", 
          icon: CheckCircle,
          title: "Establish Clear Context and Expert Roles",
          description: "Define the AI's expertise level, role, and provide comprehensive background context for nuanced responses.",
          example: "✅ 'You are Dr. Sarah Chen, a senior cybersecurity consultant with 15 years enterprise experience. A mid-sized company wants to implement remote work. Assess security risks and provide specific recommendations with implementation timeline and costs.'",
          tips: [
            "Establish specific expertise level and years of experience",
            "Provide relevant background information and constraints",
            "Set appropriate professional tone and communication style",
            "Include relevant certifications or specializations",
            "Define the stakes and urgency level of the situation"
          ],
          impact: "Professional-grade responses with appropriate expertise level"
        },
        {
          type: "do",
          icon: CheckCircle,
          title: "Leverage Examples and Templates for Consistency", 
          description: "Provide concrete examples of desired output format, style, and structure for consistent results.",
          example: "✅ 'Format each recommendation as: PRIORITY: [High/Medium/Low] | ACTION: [Specific task] | TIMELINE: [Duration] | OWNER: [Role] | SUCCESS METRIC: [Measurable outcome]'",
          tips: [
            "Show before/after examples for transformations",
            "Include formatting preferences with visual structure",
            "Demonstrate style guidelines with sample content",
            "Provide templates for repeated use cases",
            "Show examples of both good and poor outputs"
          ],
          impact: "90% reduction in formatting inconsistencies"
        }
      ]
    },
    advanced: {
      title: "Advanced Strategies",
      icon: Rocket,
      color: "from-purple-500 to-pink-500", 
      practices: [
        {
          type: "do",
          icon: Brain,
          title: "Implement Multi-Step Reasoning Chains",
          description: "Break complex tasks into logical sequences with intermediate verification steps.",
          example: "✅ 'Analyze market opportunity: 1) Research target demographics 2) Assess competitive landscape 3) Calculate addressable market 4) Identify key differentiators 5) Project revenue potential 6) Recommend go-to-market strategy'",
          tips: [
            "Number each step clearly with specific deliverables",
            "Include verification checkpoints between major steps",
            "Define dependencies between sequential tasks",
            "Set priority levels for each component",
            "Build in feedback loops for iterative improvement"
          ],
          impact: "75% improvement in complex problem-solving accuracy"
        },
        {
          type: "do",
          icon: Zap,
          title: "Master Constraint-Based Architecture",
          description: "Use strategic limitations to control output precision, format, and quality parameters.",
          example: "✅ 'Create social media post: Exactly 280 characters, include 2 hashtags, tag @company, use encouraging tone, include call-to-action, target Gen Z audience, promote sustainability focus, end with emoji'",
          tips: [
            "Set precise word/character limits with acceptable ranges",
            "Define required elements and their optimal placement",
            "Specify tone, style, and brand voice requirements",
            "Include platform-specific formatting constraints",
            "Test constraint combinations for feasibility"
          ],
          impact: "Platform-optimized content with 95% specification compliance"
        },
        {
          type: "do",
          icon: Trophy,
          title: "Deploy Iterative Refinement Workflows",
          description: "Systematically improve outputs through structured feedback cycles and progressive enhancement.",
          example: "✅ 'Round 1: Core content draft → Round 2: Add data/statistics → Round 3: Optimize for SEO → Round 4: Adjust tone for audience → Final: Proofread and format'",
          tips: [
            "Start with foundational version to establish baseline",
            "Provide specific, actionable feedback for each iteration",
            "Build complexity gradually rather than overwhelming initially",
            "Test different approaches in parallel when possible",
            "Document successful patterns for future replication"
          ],
          impact: "Professional-grade content quality with iterative improvement"
        }
      ]
    },
    pitfalls: {
      title: "Critical Pitfalls to Avoid",
      icon: Shield,
      color: "from-red-500 to-orange-500",
      practices: [
        {
          type: "dont",
          icon: XCircle,
          title: "Never Use Vague or Ambiguous Language",
          description: "Avoid requests that could be interpreted multiple ways or lack specific direction.",
          example: "❌ 'Make it better' or 'Write something good' → ✅ 'Improve conversion rate by 25% through A/B testing headline variations, focusing on value proposition clarity and urgency'",
          tips: [
            "Eliminate subjective terms like 'good', 'better', 'nice'",
            "Replace general concepts with specific, measurable outcomes",
            "Define scope boundaries and exactly what's included/excluded",
            "Provide context for why the request is important",
            "Include examples of what success looks like"
          ],
          impact: "Prevents 80% of misaligned outputs and revision cycles"
        },
        {
          type: "dont",
          icon: XCircle,
          title: "Don't Ignore Edge Cases and Error Handling",
          description: "Always account for unusual inputs, missing data, and unexpected scenarios.",
          example: "❌ No error handling → ✅ 'If data is incomplete, flag missing elements and provide recommendations based on available information. If conflicting information exists, present both perspectives with reasoning.'",
          tips: [
            "Plan for missing or corrupted data scenarios",
            "Define behavior for conflicting or contradictory inputs",
            "Specify fallback options when primary approach fails",
            "Include validation rules for input quality",
            "Prepare graceful degradation strategies"
          ],
          impact: "90% reduction in broken workflows and system failures"
        },
        {
          type: "dont",
          icon: XCircle,
          title: "Avoid Information Overload and Scope Creep",
          description: "Don't cram multiple complex requirements into single prompts.",
          example: "❌ '15 different requirements in one prompt' → ✅ 'Focus on 2-3 primary objectives with clear success metrics and measurable outcomes'",
          tips: [
            "Prioritize requirements by business impact and feasibility",
            "Use separate prompts for distinct functional areas",
            "Keep instructions focused on core objectives",
            "Break large projects into manageable phases",
            "Establish clear boundaries for each interaction"
          ],
          impact: "Improved focus and 60% better execution quality"
        }
      ]
    },
    ethics: {
      title: "Ethics & Quality Assurance",
      icon: Star,
      color: "from-green-500 to-teal-500",
      practices: [
        {
          type: "warning",
          icon: AlertTriangle,
          title: "Implement Comprehensive Testing and Validation",
          description: "Systematically test prompts with diverse inputs and validate outputs for quality and bias.",
          example: "✅ 'Test with 10 different demographic examples, validate for cultural sensitivity, check for stereotypes, ensure inclusive language, measure consistency across variations'",
          tips: [
            "Create test cases covering diverse demographics and scenarios",
            "Implement bias detection and correction workflows",
            "Validate outputs against established quality criteria",
            "Collect feedback from diverse user groups",
            "Monitor performance metrics over time"
          ],
          impact: "95% reduction in biased or inappropriate outputs"
        },
        {
          type: "warning",
          icon: AlertTriangle,
          title: "Address Bias and Ethical Considerations Proactively",
          description: "Actively monitor for biases, ensure inclusive outputs, and maintain ethical standards.",
          example: "✅ 'Review outputs for gender, racial, cultural, and socioeconomic bias. Ensure recommendations are inclusive, fair, and consider diverse perspectives and needs.'",
          tips: [
            "Check for stereotypes and unconscious bias patterns",
            "Ensure representation across different demographics",
            "Validate recommendations for fairness and inclusivity",
            "Consider cultural context and sensitivities",
            "Implement bias correction mechanisms"
          ],
          impact: "Ethical, inclusive outputs that serve diverse audiences"
        },
        {
          type: "tip",
          icon: Lightbulb,
          title: "Build Robust Template Libraries and Documentation",
          description: "Create comprehensive collections of tested prompts, templates, and best practices.",
          example: "✅ 'Maintain versioned templates for: content creation, data analysis, customer support, technical documentation, marketing campaigns - each with success metrics and use case guidelines'",
          tips: [
            "Version control your most effective prompt templates",
            "Document success metrics and use case guidelines",
            "Share templates across teams with training materials",
            "Regularly update based on performance data",
            "Create template categories for different business functions"
          ],
          impact: "75% faster prompt development and consistent quality"
        }
      ]
    }
  };

  const getCardStyle = (type: string) => {
    switch (type) {
      case "do":
        return "border-l-4 border-l-green-500 bg-gradient-to-r from-green-50/80 to-green-50/40 dark:from-green-950/40 dark:to-green-950/20 shadow-lg shadow-green-500/10";
      case "dont":
        return "border-l-4 border-l-red-500 bg-gradient-to-r from-red-50/80 to-red-50/40 dark:from-red-950/40 dark:to-red-950/20 shadow-lg shadow-red-500/10";
      case "warning":
        return "border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 dark:from-yellow-950/40 dark:to-yellow-950/20 shadow-lg shadow-yellow-500/10";
      case "tip":
        return "border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/80 to-blue-50/40 dark:from-blue-950/40 dark:to-blue-950/20 shadow-lg shadow-blue-500/10";
      default:
        return "";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "do":
        return "text-green-600 dark:text-green-400";
      case "dont":
        return "text-red-600 dark:text-red-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "tip":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-gray-600";
    }
  };

  return (
    <section id="best-practices" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Elite Best Practices Mastery
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Comprehensive guidelines and advanced strategies used by AI experts to achieve consistently exceptional results. 
            Master the art of prompt engineering with proven methodologies and real-world expertise.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, category]) => (
            <Button
              key={key}
              onClick={() => setActiveCategory(key)}
              variant={activeCategory === key ? "default" : "outline"}
              size="lg"
              className={`px-6 py-3 text-base font-semibold transition-all duration-300 ${
                activeCategory === key 
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg hover:shadow-xl` 
                  : 'hover:scale-105'
              }`}
            >
              <category.icon className="w-5 h-5 mr-2" />
              {category.title}
            </Button>
          ))}
        </div>

        {/* Active Category Content */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className={`text-3xl font-bold bg-gradient-to-r ${categories[activeCategory].color} bg-clip-text text-transparent mb-4`}>
              {categories[activeCategory].title}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories[activeCategory].practices.map((practice, index) => (
              <Card key={index} className={`${getCardStyle(practice.type)} hover:shadow-2xl transition-all duration-300 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 hover:scale-[1.02]`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${categories[activeCategory].color} flex items-center justify-center shadow-lg`}>
                      <practice.icon className={`w-6 h-6 text-white`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                        {practice.title}
                      </CardTitle>
                      {practice.impact && (
                        <div className="text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full inline-block">
                          📈 {practice.impact}
                        </div>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                    {practice.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Example */}
                  <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Real-World Example:
                    </h4>
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-5 text-sm text-slate-700 dark:text-slate-300 font-mono leading-relaxed border border-slate-200 dark:border-slate-600">
                      {practice.example}
                    </div>
                  </div>

                  {/* Expert Tips */}
                  <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      Expert Implementation Tips:
                    </h4>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      {practice.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-3 p-2 rounded-lg bg-slate-50/50 dark:bg-slate-800/50">
                          <span className="text-green-500 mt-1 font-bold text-base">•</span>
                          <span className="leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Framework */}
        <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-3xl p-10 text-white shadow-2xl mb-16">
          <h3 className="text-4xl font-bold mb-8 text-center">The Expert Success Framework</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h4 className="font-bold text-xl mb-3">Strategic Foundation</h4>
              <p className="text-sm opacity-90 leading-relaxed">Begin with crystal-clear objectives, defined success metrics, and comprehensive context setting</p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h4 className="font-bold text-xl mb-3">Precision Engineering</h4>
              <p className="text-sm opacity-90 leading-relaxed">Craft detailed specifications with examples, constraints, and quality parameters</p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h4 className="font-bold text-xl mb-3">Systematic Testing</h4>
              <p className="text-sm opacity-90 leading-relaxed">Validate with diverse inputs, measure performance, and iterate based on real-world results</p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h4 className="font-bold text-xl mb-3">Continuous Evolution</h4>
              <p className="text-sm opacity-90 leading-relaxed">Build knowledge libraries, document patterns, and continuously refine based on emerging best practices</p>
            </div>
          </div>
          
          {/* Framework Metrics */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/20 pt-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-300 mb-2">15x</div>
              <div className="text-xl font-semibold">Quality Improvement</div>
              <div className="text-sm opacity-80">With systematic approach implementation</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-300 mb-2">98%</div>
              <div className="text-xl font-semibold">Success Consistency</div>
              <div className="text-sm opacity-80">Across all prompt engineering tasks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-300 mb-2">80%</div>
              <div className="text-xl font-semibold">Time Reduction</div>
              <div className="text-sm opacity-80">In prompt development and refinement</div>
            </div>
          </div>
        </div>

        {/* Action Plan */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 border border-slate-200 dark:border-slate-600">
          <h3 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-slate-100">Your Next Steps to Mastery</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-600">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100">Week 1-2: Foundation</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <li>• Master basic prompt structure and clarity</li>
                <li>• Practice with simple zero-shot examples</li>
                <li>• Implement template-based approaches</li>
                <li>• Start building your prompt library</li>
              </ul>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-600">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100">Week 3-4: Advanced</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <li>• Implement few-shot and chain-of-thought</li>
                <li>• Master role-based prompting</li>
                <li>• Practice iterative refinement</li>
                <li>• Test constraint-based approaches</li>
              </ul>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-600">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100">Week 5+: Expert</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <li>• Deploy meta-prompting strategies</li>
                <li>• Build systematic evaluation frameworks</li>
                <li>• Implement bias detection and correction</li>
                <li>• Create enterprise-grade prompt systems</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
