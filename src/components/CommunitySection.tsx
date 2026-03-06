import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Globe, TrendingUp, Award, BookOpen } from 'lucide-react';

const stats = [
  { icon: Users, value: '15,000+', label: 'Active Learners', color: 'text-blue-500' },
  { icon: BookOpen, value: '200+', label: 'Lessons & Guides', color: 'text-purple-500' },
  { icon: Award, value: '50+', label: 'Certifications Issued', color: 'text-amber-500' },
  { icon: Globe, value: '45+', label: 'Countries', color: 'text-emerald-500' },
  { icon: MessageSquare, value: '10K+', label: 'AI Conversations', color: 'text-pink-500' },
  { icon: TrendingUp, value: '98%', label: 'Satisfaction Rate', color: 'text-cyan-500' },
];

export const CommunitySection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Badge className="mb-4 bg-white/20 text-white border-white/30 px-4 py-1.5">
              <Users className="w-4 h-4 mr-1" /> Our Community
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              Join a Global AI Community
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Connect with thousands of AI enthusiasts, developers, and researchers from around the world.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 text-center">
                <CardContent className="pt-6 pb-4">
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 text-white`} />
                  <p className="text-2xl md:text-3xl font-bold font-display text-white">{stat.value}</p>
                  <p className="text-xs text-white/70 mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
