import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "AI Research Engineer",
    avatar: "PS",
    rating: 5,
    text: "ZEPHORYX AI LAB completely transformed how I approach prompt engineering. The interactive tools and real-time analysis helped me improve my AI outputs by 10x.",
  },
  {
    name: "James Chen",
    role: "ML Product Manager",
    avatar: "JC",
    rating: 5,
    text: "The best AI learning platform I've used. The techniques section alone is worth it — chain-of-thought prompting made my team's workflow so much more efficient.",
  },
  {
    name: "Aisha Patel",
    role: "Data Scientist",
    avatar: "AP",
    rating: 5,
    text: "From beginner to advanced, the curriculum is perfectly structured. I love how I can test prompts directly on the platform with real AI models.",
  },
  {
    name: "Marcus Johnson",
    role: "Full-Stack Developer",
    avatar: "MJ",
    rating: 5,
    text: "The coding-specific prompting techniques are incredible. I've reduced my debugging time by 60% using the methods taught here.",
  },
  {
    name: "Sofia Rodriguez",
    role: "UX Designer",
    avatar: "SR",
    rating: 5,
    text: "As a designer, I use AI daily for ideation. ZEPHORYX taught me how to get consistently better creative outputs from generative AI tools.",
  },
  {
    name: "Ravi Kumar",
    role: "AI Consultant",
    avatar: "RK",
    rating: 5,
    text: "I recommend ZEPHORYX to all my clients. The knowledge base and best practices sections are comprehensive and always up-to-date.",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Loved by AI Practitioners
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our community has to say about their learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Card className="h-full bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="w-8 h-8 text-primary/30 mb-3" />
                  <p className="text-foreground/80 leading-relaxed flex-1 mb-4">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{t.name}</div>
                      <div className="text-muted-foreground text-xs">{t.role}</div>
                    </div>
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
