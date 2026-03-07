import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Users, BookOpen, Award, Zap } from "lucide-react";

const stats = [
  { icon: BookOpen, label: "Learning Topics", target: 15, suffix: "+" },
  { icon: Award, label: "Certifications Available", target: 6, suffix: "" },
  { icon: Users, label: "Content Sections", target: 50, suffix: "+" },
  { icon: Zap, label: "Real Resources & Links", target: 120, suffix: "+" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export const StatsCounter = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnpNNiAzNHY2SDB2LTZoNnptMC0zMHY2SDBWNGg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 font-display">
            Trusted by Thousands of AI Enthusiasts
          </h2>
          <p className="text-white/70 text-lg">Join the fastest growing AI learning community</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-display">
                <AnimatedNumber target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-white/70 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
