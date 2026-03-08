import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Atom, ChevronRight, BookOpen, Zap, Lock, Brain, Cpu, Workflow, FlaskConical, Globe } from "lucide-react";
import { motion } from "framer-motion";

export const QuantumTopics = () => {
  const concepts = [
    {
      title: "What is Quantum Computing?",
      description: "Quantum computing harnesses quantum mechanical phenomena — superposition, entanglement, and interference — to perform computations impossible for classical computers. While classical bits are 0 or 1, quantum bits (qubits) can exist in a superposition of both states simultaneously. This allows quantum computers to explore many solutions in parallel. Quantum computers aren't faster at everything — they excel at specific problems: optimization, simulation, cryptography, and certain machine learning tasks. They won't replace classical computers but will solve previously intractable problems.",
      icon: Atom,
      keyPoints: [
        "Qubits exploit superposition to represent 0, 1, or both simultaneously",
        "Entanglement creates correlated qubits — measuring one instantly determines the other",
        "Quantum advantage: exponential speedup for specific problem classes, not all computing"
      ],
      learnMoreUrl: "https://quantum.ibm.com/learning"
    },
    {
      title: "Quantum Gates & Circuits",
      description: "Quantum circuits manipulate qubits using quantum gates — analogous to classical logic gates but operating on quantum states. Key gates: Hadamard (H) creates superposition from a definite state. CNOT (Controlled-NOT) creates entanglement between two qubits. Pauli gates (X, Y, Z) rotate qubits around different axes. Phase gates control interference patterns. Quantum algorithms are expressed as circuits — sequences of gates applied to qubits. Tools like Qiskit (IBM) and Cirq (Google) let you build and simulate quantum circuits in Python.",
      icon: Cpu,
      keyPoints: [
        "Hadamard gate: |0⟩ → (|0⟩ + |1⟩)/√2 — creates equal superposition",
        "CNOT gate: flips target qubit if control qubit is |1⟩ — creates entanglement",
        "Qiskit and Cirq: Python frameworks for building and simulating quantum circuits"
      ],
      learnMoreUrl: "https://qiskit.org/learn"
    },
    {
      title: "Shor's Algorithm & Cryptography",
      description: "Shor's Algorithm (Peter Shor, 1994) can factor large numbers exponentially faster than any known classical algorithm. This is significant because RSA encryption — used to secure the internet — relies on the difficulty of factoring large primes. A sufficiently powerful quantum computer could break RSA-2048 in hours vs billions of years classically. Current quantum computers (~1,000 qubits) can't do this yet — estimates suggest needing millions of error-corrected qubits. NIST has already published post-quantum cryptography standards (CRYSTALS-Kyber, CRYSTALS-Dilithium) to prepare.",
      icon: Lock,
      keyPoints: [
        "RSA-2048: unbreakable classically, vulnerable to quantum computers with ~4,000 logical qubits",
        "NIST post-quantum standards (2024): CRYSTALS-Kyber (encryption), CRYSTALS-Dilithium (signatures)",
        "'Harvest now, decrypt later': adversaries may be storing encrypted data to decrypt with future quantum computers"
      ],
      learnMoreUrl: "https://csrc.nist.gov/projects/post-quantum-cryptography"
    },
    {
      title: "Grover's Algorithm & Quantum Search",
      description: "Grover's Algorithm (Lov Grover, 1996) provides a quadratic speedup for unstructured search problems. Searching an unsorted database of N items takes O(N) classically but only O(√N) with Grover's algorithm. While not as dramatic as Shor's exponential speedup, quadratic improvement is significant at scale: searching a billion items takes ~31,623 steps instead of 1 billion. Applications include database search, optimization, and constraint satisfaction problems. Grover's is provably optimal — no quantum algorithm can do better for unstructured search.",
      icon: Zap,
      keyPoints: [
        "Quadratic speedup: O(√N) instead of O(N) for searching unsorted data",
        "Uses amplitude amplification — increases probability of the correct answer over iterations",
        "Provably optimal: no quantum algorithm can search faster than Grover's for unstructured data"
      ],
      learnMoreUrl: "https://qiskit.org/textbook/ch-algorithms/grover.html"
    },
    {
      title: "Quantum Machine Learning (QML)",
      description: "Quantum Machine Learning explores using quantum computers to speed up or improve ML algorithms. Approaches: (1) Quantum kernels — compute similarity measures in exponentially large Hilbert spaces. (2) Variational Quantum Eigensolver (VQE) — hybrid classical-quantum optimization. (3) Quantum Neural Networks (QNNs) — parameterized quantum circuits trained like neural networks. (4) Quantum-enhanced feature maps — encode data into quantum states for richer representations. Current status: theoretical promise is strong, but practical quantum advantage for ML hasn't been conclusively demonstrated yet.",
      icon: Brain,
      keyPoints: [
        "Variational algorithms (VQE, QAOA): hybrid classical-quantum — most practical near-term approach",
        "PennyLane by Xanadu: Python library for quantum ML, integrates with PyTorch and TensorFlow",
        "Quantum advantage for ML: theoretically possible but not yet proven in practice"
      ],
      learnMoreUrl: "https://pennylane.ai/qml/"
    },
    {
      title: "Quantum Error Correction",
      description: "Real quantum computers suffer from noise — qubits lose their quantum state (decoherence) and gates introduce errors. Quantum error correction (QEC) encodes logical qubits into multiple physical qubits to detect and correct errors. The surface code is the leading approach — it requires ~1,000 physical qubits per logical qubit with current error rates. Google's Willow chip (2024) demonstrated 'below threshold' error correction — adding more qubits actually reduced errors, a critical milestone. Current systems: 1,000-1,100 physical qubits (IBM, Google), but only ~10-50 usable logical qubits.",
      icon: Workflow,
      keyPoints: [
        "Surface code: ~1,000 physical qubits needed per error-corrected logical qubit",
        "Google Willow (2024): first 'below threshold' demonstration — more qubits = fewer errors",
        "Fault-tolerant quantum computing (millions of qubits) is estimated 5-15 years away"
      ],
      learnMoreUrl: "https://blog.google/technology/research/google-willow-quantum-chip/"
    },
    {
      title: "Quantum Hardware Platforms",
      description: "Multiple physical approaches compete to build quantum computers: (1) Superconducting qubits (IBM, Google) — most mature, use microwave pulses to control supercooled circuits at 15 millikelvin. (2) Trapped ions (IonQ, Quantinuum) — use electromagnetic fields to trap individual atoms, longer coherence times. (3) Photonic (Xanadu, PsiQuantum) — use photons, can operate at room temperature. (4) Neutral atoms (Atom Computing, QuEra) — use laser-trapped atoms, promising for scalability. IBM's roadmap targets 100,000+ qubits by 2033.",
      icon: FlaskConical,
      keyPoints: [
        "IBM Eagle: 127 qubits (2021) → Condor: 1,121 qubits (2023) → 100K+ by 2033",
        "Trapped ions (IonQ, Quantinuum): highest gate fidelity but slower gate operations",
        "Photonic quantum computing: room temperature operation, natural for networking"
      ],
      learnMoreUrl: "https://www.ibm.com/quantum/roadmap"
    },
    {
      title: "Quantum Simulation & Drug Discovery",
      description: "Simulating quantum systems is the most natural application for quantum computers — Richard Feynman proposed this in 1982. Molecular simulation on classical computers scales exponentially with molecule size — a 100-atom molecule is intractable. Quantum computers can simulate molecular interactions natively. Applications: drug discovery (simulating protein-drug binding), battery design (modeling electrolyte chemistry), catalyst development, and materials science. Pharma companies (Roche, Merck) and startups (Zapata, QSimulate) are actively exploring quantum chemistry.",
      icon: FlaskConical,
      keyPoints: [
        "Feynman's insight (1982): 'Nature isn't classical, so use a quantum computer to simulate it'",
        "Simulating caffeine (24 atoms) on a classical computer requires astronomical resources",
        "Near-term: hybrid quantum-classical approaches for molecular energy calculations"
      ],
      learnMoreUrl: "https://research.ibm.com/blog/quantum-chemistry-simulation"
    },
    {
      title: "Quantum Computing Ecosystem",
      description: "The quantum computing ecosystem includes hardware providers, cloud platforms, and software tools. Cloud access: IBM Quantum (free tier, 127+ qubit systems), Amazon Braket (access to IonQ, Rigetti, QuEra), Google Quantum AI, and Azure Quantum (IonQ, Quantinuum). Software: Qiskit (IBM, Python), Cirq (Google), PennyLane (Xanadu, ML-focused), and Q# (Microsoft). Learning: IBM Quantum Learning offers free courses and access to real quantum hardware. The global quantum computing market is projected to reach $50B by 2030.",
      icon: Globe,
      keyPoints: [
        "IBM Quantum: free access to real quantum hardware with up to 127 qubits",
        "Amazon Braket: unified access to IonQ, Rigetti, and QuEra quantum computers",
        "Qiskit: most popular open-source quantum computing SDK with 500K+ users"
      ],
      learnMoreUrl: "https://quantum.ibm.com/"
    },
  ];

  const resources = [
    { name: "IBM Quantum Learning", desc: "Free courses and access to real quantum hardware", url: "https://quantum.ibm.com/learning" },
    { name: "Qiskit Textbook", desc: "Open-source, interactive quantum computing textbook", url: "https://qiskit.org/learn" },
    { name: "PennyLane QML", desc: "Quantum machine learning tutorials and demos", url: "https://pennylane.ai/qml/" },
    { name: "Microsoft Quantum Katas", desc: "Self-paced quantum programming tutorials", url: "https://quantum.microsoft.com/en-us/experience/quantum-katas" },
    { name: "Quantum Computing Report", desc: "Industry tracking and news on quantum computing progress", url: "https://quantumcomputingreport.com/" },
    { name: "Google Quantum AI", desc: "Research papers and tools from Google's quantum team", url: "https://quantumai.google/" },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-200 border-0 px-4 py-1.5">
            <Atom className="w-4 h-4 mr-1" /> The Next Computing Frontier
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Quantum Computing
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From qubits and quantum gates to Shor's algorithm, error correction, and quantum machine learning — understand the technology that will transform computing, cryptography, and science.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {concepts.map((concept, i) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/90 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md">
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
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-cyan-900/30"
                    onClick={() => window.open(concept.learnMoreUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Resources */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">Quantum Computing Learning Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((r) => (
              <button
                key={r.name}
                onClick={() => window.open(r.url, '_blank', 'noopener,noreferrer')}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/20 transition-colors"
              >
                <h4 className="font-bold text-lg mb-1">{r.name}</h4>
                <p className="text-sm text-white/80">{r.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
