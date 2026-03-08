import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Lock, Clock } from 'lucide-react';
import { toast } from 'sonner';
import certificateImage from '@/assets/certificate-badge.png';

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

export const Certifications = () => {
  const { user } = useAuth();
  const [cert, setCert] = useState<Certification | null>(null);
  const [userCert, setUserCert] = useState<UserCert | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [accountAge, setAccountAge] = useState<number>(0);

  useEffect(() => {
    fetchCert();
    if (user) {
      fetchUserData();
      // Calculate account age in days
      const createdAt = new Date(user.created_at);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
      setAccountAge(diffDays);
    }
  }, [user]);

  const fetchCert = async () => {
    const { data } = await supabase.from('certifications').select('id, title, description, category, badge_color').limit(1).single();
    if (data) setCert(data);
  };

  const fetchUserData = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('user_certifications')
      .select('certification_id, earned_at, certificate_number')
      .eq('user_id', user.id);
    if (data && data.length > 0) setUserCert(data[0]);
  };

  const claimCert = async () => {
    if (!user || !cert) { toast.error('Sign in to claim your certification'); return; }
    if (accountAge < 30) {
      toast.error(`You need ${30 - accountAge} more days to earn this certificate. Keep learning!`);
      return;
    }
    setClaiming(true);
    const { error } = await supabase.from('user_certifications').insert({
      user_id: user.id,
      certification_id: cert.id,
    });
    if (error) {
      if (error.code === '23505') {
        toast.info('You already have this certification!');
      } else {
        toast.error('Failed to claim certification');
      }
    } else {
      toast.success('🎉 Certification earned! Congratulations!');
      fetchUserData();
    }
    setClaiming(false);
  };

  const daysRemaining = Math.max(0, 30 - accountAge);
  const progress = Math.min(100, (accountAge / 30) * 100);
  const isEligible = accountAge >= 30;

  if (!cert) return null;

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/50 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-yellow-950/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Badge className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 border-0 px-4 py-1.5">
              <Award className="w-4 h-4 mr-1" /> Certification
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Earn Your Certificate
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Use ZEPHORYX AI LAB for one month and earn your official certificate of achievement.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="relative overflow-hidden border-2 border-amber-400/50 shadow-2xl shadow-amber-500/10">
            <div className="h-2 bg-gradient-to-r from-amber-400 to-yellow-500" />
            
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Certificate Image */}
                <div className="p-8 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                  <img
                    src={certificateImage}
                    alt="ZEPHORYX AI LAB Certificate of Achievement"
                    className="w-full max-w-sm rounded-lg shadow-2xl"
                  />
                </div>

                {/* Certificate Details */}
                <div className="p-8 flex flex-col justify-center space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold font-display mb-2">{cert.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{cert.description}</p>
                  </div>

                  {/* Progress Section */}
                  {user && !userCert && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {isEligible ? 'Ready to claim!' : `${daysRemaining} days remaining`}
                        </span>
                        <span className="font-semibold">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: 'easeOut' }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Account created {accountAge} day{accountAge !== 1 ? 's' : ''} ago • 30 days required
                      </p>
                    </div>
                  )}

                  {/* Action */}
                  {userCert ? (
                    <div className="space-y-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">Certificate Earned!</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Certificate #: <span className="font-mono font-semibold">{userCert.certificate_number}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Earned: {new Date(userCert.earned_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  ) : user ? (
                    <Button
                      className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold hover:opacity-90 shadow-lg text-lg py-6"
                      onClick={claimCert}
                      disabled={claiming || !isEligible}
                    >
                      {claiming ? 'Claiming...' : isEligible ? '🎉 Claim Your Certificate' : `🔒 Available in ${daysRemaining} days`}
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground p-4 rounded-lg bg-muted/30">
                      <Lock className="w-4 h-4" />
                      <span>Sign in and use the platform for 30 days to earn this certificate</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
