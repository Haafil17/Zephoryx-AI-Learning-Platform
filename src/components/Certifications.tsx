import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Lock, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Certification {
  id: string;
  title: string;
  description: string | null;
  category: string;
  badge_color: string;
}

interface UserCert {
  certification_id: string;
  earned_at: string;
  certificate_number: string;
}

const colorMap: Record<string, string> = {
  blue: 'from-blue-500 to-cyan-500',
  purple: 'from-purple-500 to-indigo-500',
  pink: 'from-pink-500 to-rose-500',
  cyan: 'from-cyan-500 to-teal-500',
  green: 'from-emerald-500 to-green-500',
  gold: 'from-amber-400 to-yellow-500',
};

const borderColorMap: Record<string, string> = {
  blue: 'border-blue-400/50',
  purple: 'border-purple-400/50',
  pink: 'border-pink-400/50',
  cyan: 'border-cyan-400/50',
  green: 'border-emerald-400/50',
  gold: 'border-amber-400/50',
};

export const Certifications = () => {
  const { user } = useAuth();
  const [certs, setCerts] = useState<Certification[]>([]);
  const [userCerts, setUserCerts] = useState<UserCert[]>([]);
  const [claiming, setClaiming] = useState<string | null>(null);

  useEffect(() => {
    fetchCerts();
    if (user) fetchUserData();
  }, [user]);

  const fetchCerts = async () => {
    const { data } = await supabase.from('certifications').select('id, title, description, category, badge_color');
    if (data) setCerts(data);
  };

  const fetchUserData = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('user_certifications')
      .select('certification_id, earned_at, certificate_number')
      .eq('user_id', user.id);
    if (data) setUserCerts(data);
  };

  const claimCert = async (certId: string) => {
    if (!user) { toast.error('Sign in to claim certifications'); return; }
    setClaiming(certId);
    const { error } = await supabase.from('user_certifications').insert({
      user_id: user.id,
      certification_id: certId,
    });
    if (error) {
      toast.error('Failed to claim certification');
    } else {
      toast.success('🎉 Certification earned! Congratulations!');
      fetchUserData();
    }
    setClaiming(null);
  };

  const isEarned = (certId: string) => userCerts.some(uc => uc.certification_id === certId);
  const getCertData = (certId: string) => userCerts.find(uc => uc.certification_id === certId);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/50 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-yellow-950/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Badge className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 border-0 px-4 py-1.5">
              <Award className="w-4 h-4 mr-1" /> Certifications
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Earn Your AI Certifications
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete learning paths and claim your certificates. Each certification validates your expertise in a specific AI domain.
            </p>
            {user && (
              <div className="mt-6 inline-flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 border border-border">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="font-semibold">{userCerts.length}/{certs.length} certifications earned</span>
              </div>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => {
            const earned = isEarned(cert.id);
            const certData = getCertData(cert.id);
            const gradient = colorMap[cert.badge_color] || colorMap.blue;
            const borderColor = borderColorMap[cert.badge_color] || borderColorMap.blue;

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`relative overflow-hidden h-full transition-all duration-300 hover:shadow-xl ${earned ? `border-2 ${borderColor} shadow-lg` : 'border border-border/50'}`}>
                  <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                  
                  {earned && (
                    <div className="absolute top-4 right-4">
                      <div className={`p-2 rounded-full bg-gradient-to-r ${gradient} shadow-lg`}>
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}

                  <CardHeader className="pb-3">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 shadow-lg`}>
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-display">{cert.title}</CardTitle>
                    <Badge variant="outline" className="w-fit capitalize text-xs">{cert.category}</Badge>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>

                    {earned && certData ? (
                      <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="font-medium text-emerald-700 dark:text-emerald-400">Earned!</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Certificate: <span className="font-mono">{certData.certificate_number}</span></p>
                        <p className="text-xs text-muted-foreground">Date: {new Date(certData.earned_at).toLocaleDateString()}</p>
                      </div>
                    ) : user ? (
                      <Button
                        className={`w-full bg-gradient-to-r ${gradient} text-white hover:opacity-90 shadow-md`}
                        onClick={() => claimCert(cert.id)}
                        disabled={claiming === cert.id}
                      >
                        {claiming === cert.id ? 'Claiming...' : '🎉 Claim Certification'}
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 rounded-lg bg-muted/30">
                        <Lock className="w-4 h-4" />
                        <span>Sign in to earn certifications</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
