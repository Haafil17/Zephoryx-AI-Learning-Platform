import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Atom, Zap, Brain, Target, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const QuantumTopics = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const quantumConcepts = [
    {
      title: "Quantum Bits (Qubits)",
      description: "The fundamental unit of quantum information that can exist in multiple states simultaneously",
      category: "fundamentals",
      complexity: "Beginner",
      principles: ["Superposition", "Entanglement", "Measurement"],
      learnMoreUrl: "https://qiskit.org/textbook/ch-states/introduction.html"
    },
    {
      title: "Quantum Superposition",
      description: "The quantum principle allowing particles to exist in multiple states at once",
      category: "fundamentals",
      complexity: "Beginner",
      principles: ["Wave Function", "Probability", "Collapse"],
      learnMoreUrl: "https://quantum.microsoft.com/en-us/experience/quantum-katas"
    },
    {
      title: "Quantum Entanglement",
      description: "The mysterious connection between quantum particles regardless of distance",
      category: "fundamentals",
      complexity: "Intermediate",
      principles: ["Non-locality", "Correlation", "Bell's Theorem"],
      learnMoreUrl: "https://www.ibm.com/quantum-computing/learn/quantum-entanglement/"
    },
    {
      title: "Quantum Algorithms",
      description: "Specialized algorithms that leverage quantum properties for computational advantages",
      category: "computing",
      complexity: "Advanced",
      principles: ["Shor's Algorithm", "Grover's Search", "Quantum Fourier Transform"],
      learnMoreUrl: "https://qiskit.org/textbook/ch-algorithms/quantum-algorithms.html"
    },
    {
      title: "Quantum Cryptography",
      description: "Ultra-secure communication using quantum properties for unbreakable encryption",
      category: "applications",
      complexity: "Advanced",
      principles: ["Quantum Key Distribution", "No-Cloning Theorem", "Quantum Signatures"],
      learnMoreUrl: "https://www.nist.gov/topics/quantum-information-science"
    },
    {
      title: "Quantum Machine Learning",
      description: "Combining quantum computing with AI for exponential speedups in learning tasks",
      category: "applications",
      complexity: "Advanced",
      principles: ["Quantum Neural Networks", "Variational Algorithms", "Quantum Advantage"],
      learnMoreUrl: "https://quantum-machine-learning.org/"
    }
  ];

  const categories = [
    { id: "all", name: "All Concepts", count: quantumConcepts.length },
    { id: "fundamentals", name: "Fundamentals", count: quantumConcepts.filter(c => c.category === "fundamentals").length },
    { id: "computing", name: "Computing", count: quantumConcepts.filter(c => c.category === "computing").length },
    { id: "applications", name: "Applications", count: quantumConcepts.filter(c => c.category === "applications").length }
  ];

  const filteredConcepts = selectedCategory === "all" 
    ? quantumConcepts 
    : quantumConcepts.filter(concept => concept.category === selectedCategory);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const applications = [
    { name: "Drug Discovery", description: "Molecular simulation for new medicines", impact: "10x faster" },
    { name: "Financial Modeling", description: "Risk analysis and portfolio optimization", impact: "Real-time" },
    { name: "Climate Modeling", description: "Weather prediction and climate change", impact: "Years ahead" },
    { name: "Materials Science", description: "Design of new materials and catalysts", impact: "Revolutionary" },
    { name: "Logistics", description: "Supply chain and route optimization", impact: "Global scale" },
    { name: "Cybersecurity", description: "Unbreakable quantum encryption", impact: "Ultimate security" }
  ];

  const handleExploreConcept = (concept: typeof quantumConcepts[0]) => {
    window.open(concept.learnMoreUrl, '_blank', 'noopener,noreferrer');
    toast.success(`Exploring ${concept.title} concept...`);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Quantum Computing
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Explore the revolutionary world of quantum computing and its potential to solve humanity's greatest challenges
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? "bg-cyan-600 text-white"
                  : "bg-white text-slate-700 hover:bg-cyan-50"
              } px-4 py-2 rounded-full border transition-all duration-200`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Quantum Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredConcepts.map((concept, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-cyan-100 dark:bg-cyan-900/50 rounded-full group-hover:bg-cyan-200 dark:group-hover:bg-cyan-800/70 transition-colors">
                    <Atom className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <Badge className={getComplexityColor(concept.complexity)}>
                    {concept.complexity}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {concept.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {concept.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Key Principles:</h4>
                  <div className="flex flex-wrap gap-2">
                    {concept.principles.map((principle, principleIndex) => (
                      <Badge key={principleIndex} variant="outline" className="text-xs">
                        {principle}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 dark:text-cyan-400 dark:hover:text-cyan-300 dark:hover:bg-cyan-900/30"
                  onClick={() => handleExploreConcept(concept)}
                >
                  Explore Concept
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quantum Applications */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-100">Real-World Applications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, index) => (
              <div key={index} className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100">{app.name}</h4>
                  <Badge variant="outline" className="text-xs bg-cyan-50 text-cyan-700">{app.impact}</Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{app.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quantum Computing Stats */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">The Quantum Advantage</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Quantum computing promises exponential speedups for specific problems that are impossible for classical computers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">10^6x</div>
              <div className="text-sm opacity-90">Potential Speedup</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">2030</div>
              <div className="text-sm opacity-90">Quantum Advantage</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-sm opacity-90">Active Qubits</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">$50B</div>
              <div className="text-sm opacity-90">Market by 2030</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
