import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome aboard! 🎉", {
      description: "You'll receive our weekly AI insights newsletter."
    });
    setEmail("");
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-10 md:p-16 text-center">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Weekly AI Insights
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
              Stay Ahead in the AI Revolution
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Get weekly tips, new techniques, and exclusive content delivered straight to your inbox. Join 1AI practitioners.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/15 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/50" />
              
              <Button type="submit" size="lg" className="h-12 bg-white text-indigo-700 hover:bg-white/90 font-semibold">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
            <p className="text-white/50 text-xs mt-4">No spam, unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>);

};