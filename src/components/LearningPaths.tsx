import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Brain, Code, Atom, Sparkles, Palette, Shield } from 'lucide-react';

const paths = [
  {
    icon: Brain,
    title: 'AI Fundamentals',
    description: 'Start your AI journey with core concepts, neural networks, and machine learning basics',
    modules: ['Introduction to AI', 'Neural Networks 101', 'Machine Learning Basics', 'Data Preprocessing'],
    duration: '4 weeks',
    difficulty: 'Beginner',
    color: 'from-blue-500 to-cyan-500',
    students: '2.4K',
  },
  {
    icon: Sparkles,
    title: 'Prompt Engineering Mastery',
    description: 'Master the art of crafting effective prompts for any AI model',
    modules: ['Zero-Shot Prompting', 'Few-Shot Learning', 'Chain-of-Thought', 'Advanced Techniques'],
    duration: '6 weeks',
    difficulty: 'Intermediate',
    color: 'from-purple-500 to-indigo-500',
    students: '1.8K',
  },
  {
    icon: Palette,
    title: 'Generative AI Creative Suite',
    description: 'Create stunning AI art, music, and content with cutting-edge generative models',
    modules: ['Text-to-Image', 'AI Video Generation', 'Creative Writing with AI', 'Multimodal AI'],
    duration: '5 weeks',
    difficulty: 'Intermediate',
    color: 'from-pink-500 to-rose-500',
    students: '1.2K',
  },
  {
    icon: Code,
    title: 'AI-Powered Development',
    description: 'Leverage AI tools for coding, debugging, testing, and software architecture',
    modules: ['AI Code Assistants', 'Automated Testing', 'Code Review with AI', 'Architecture Patterns'],
    duration: '8 weeks',
    difficulty: 'Advanced',
    color: 'from-emerald-500 to-green-500',
    students: '956',
  },
  {
    icon: Atom,
    title: 'Quantum AI Explorer',
    description: 'Explore the frontier of quantum computing and its intersection with AI',
    modules: ['Quantum Basics', 'Qubits & Gates', 'Quantum ML', 'Hybrid Algorithms'],
    duration: '10 weeks',
    difficulty: 'Expert',
    color: 'from-cyan-500 to-teal-500',
    students: '432',
  },
  {
    icon: Shield,
    title: 'AI Ethics & Safety',
    description: 'Understand responsible AI development, bias mitigation, and ethical frameworks',
    modules: ['AI Bias Detection', 'Fairness Metrics', 'Responsible AI', 'Governance Frameworks'],
    duration: '3 weeks',
    difficulty: 'All Levels',
    color: 'from-amber-500 to-orange-500',
    students: '1.6K',
  },
];

const difficultyColor: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  Intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  Advanced: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
  Expert: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
  'All Levels': 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
};

export const LearningPaths = () => {
  const handleExplore = (title: string) => {
    window.dispatchEvent(new CustomEvent('changeTab', { detail: 'techniques' }));
    setTimeout(() => {
      const tabsSection = document.querySelector('[role="tablist"]');
      if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-slate-950 dark:via-indigo-950/20 dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Badge className="mb-4 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200 border-0 px-4 py-1.5">
              <BookOpen className="w-4 h-4 mr-1" /> Learning Paths
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Structured Learning Journeys
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Follow curated learning paths designed by AI experts. From beginner to master, each path builds on the previous.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path, i) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-card/90 backdrop-blur-sm">
                <div className={`h-1.5 bg-gradient-to-r ${path.color}`} />
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${path.color} shadow-md`}>
                      <path.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className={`${difficultyColor[path.difficulty]} border-0 text-xs`}>
                      {path.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-display">{path.title}</CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">{path.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    {path.modules.map((mod, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${path.color}`} />
                        <span className="text-muted-foreground">{mod}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>⏱ {path.duration}</span>
                      <span>👥 {path.students}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-sm group-hover:text-primary transition-colors"
                      onClick={() => handleExplore(path.title)}
                    >
                      Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
