
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Zap, Target, Award } from "lucide-react";
import { UsernameSection } from "./UsernameSection";
import { ThemeToggle } from "./ThemeToggle";
import { AuthButton } from "./AuthButton";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import zephoryxLogo from "@/assets/zephoryx-logo.png";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export const Hero = () => {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleStartLearning = () => {
    window.dispatchEvent(new CustomEvent('changeTab', { detail: 'techniques' }));
    setTimeout(() => {
      const tabsSection = document.querySelector('[role="tablist"]');
      if (tabsSection) {
        tabsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleExploreTools = () => {
    window.dispatchEvent(new CustomEvent('changeTab', { detail: 'features' }));
    setTimeout(() => {
      const tabsSection = document.querySelector('[role="tablist"]');
      if (tabsSection) {
        tabsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const featureHighlights = [
    { icon: Brain, title: "AI Chat", subtitle: "Smart Assistant", color: "text-indigo-600" },
    { icon: Target, title: "Techniques", subtitle: "Advanced Methods", color: "text-purple-600" },
    { icon: Zap, title: "Interactive", subtitle: "Hands-on Tools", color: "text-pink-600" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Auth and Theme Toggle */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        {isAdmin && (
          <Button variant="outline" size="sm" onClick={() => navigate('/admin')} className="border-primary/50 bg-primary/10 hover:bg-primary/20">
            <Shield className="w-4 h-4 mr-1" /> Admin
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={() => navigate('/my-certificate')} className="border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300">
          <Award className="w-4 h-4 mr-1" /> Certificate
        </Button>
        <AuthButton />
        <ThemeToggle />
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20"
        />
        <motion.div
          animate={{ x: [0, -40, 20, 0], y: [0, 20, -40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20"
        />
        <motion.div
          animate={{ x: [0, 20, -30, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20"
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="text-center lg:text-left space-y-8">
          <motion.div className="space-y-4" initial="hidden" animate="visible">
            <motion.div
              custom={0}
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 px-4 py-2 rounded-full text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              Master AI Interactions
            </motion.div>

            <motion.div custom={1} variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-6 mb-4">
              <motion.img
                src={zephoryxLogo}
                alt="ZEPHORYX AI LAB Logo"
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
                whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            <motion.h1 custom={2} variants={fadeUp} className="text-5xl md:text-7xl font-bold leading-tight font-display">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                ZEPHORYX AI LAB
              </span>
            </motion.h1>
            <motion.p custom={3} variants={fadeUp} className="text-lg md:text-xl font-medium text-indigo-600 dark:text-indigo-400 tracking-wide">
              AI Learning Platform
            </motion.p>

            <motion.p custom={4} variants={fadeUp} className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Master the art of AI communication with advanced prompting techniques,
              real-time analysis, and interactive learning tools.
            </motion.p>
          </motion.div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featureHighlights.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={scaleIn}
                whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(99,102,241,0.3)" }}
                className="flex items-center gap-3 p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 cursor-default"
              >
                <f.icon className={`w-8 h-8 ${f.color}`} />
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-100">{f.title}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{f.subtitle}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={handleStartLearning}
              className="h-14 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Start Learning
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleExploreTools}
              className="h-14 px-8 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
            >
              Explore Tools
            </Button>
          </motion.div>
        </div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-md">
            <UsernameSection />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
