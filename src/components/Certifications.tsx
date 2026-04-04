import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Award, Download, User, Clock } from 'lucide-react';
import { toast } from 'sonner';

const INSTANT_EMAILS = ['asma.haifz06@gmail.com', 'haafil006@gmail.com'];

interface UserCert {
  certification_id: string;
  earned_at: string;
  certificate_number: string;
}

export const Certifications = () => {
  const { user } = useAuth();
  const [certId, setCertId] = useState<string | null>(null);
  const [userCert, setUserCert] = useState<UserCert | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [nameLoaded, setNameLoaded] = useState(false);
  const certCanvasRef = useRef<HTMLCanvasElement>(null);

  const isInstant = user ? INSTANT_EMAILS.includes(user.email || '') : false;
  const accountAgeDays = user?.created_at
    ? Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const isEligible = isInstant || accountAgeDays >= 30;
  const daysRemaining = Math.max(0, 30 - accountAgeDays);

  useEffect(() => {
    fetchCert();
    if (user) {
      fetchUserCert();
      const loadName = async () => {
        const { data } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
        if (data?.full_name) setRecipientName(data.full_name);
        setNameLoaded(true);
      };
      loadName();
    }
  }, [user]);

  const fetchCert = async () => {
    const { data } = await supabase.from('certifications').select('id').limit(1).single();
    if (data) setCertId(data.id);
  };

  const fetchUserCert = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('user_certifications')
      .select('certification_id, earned_at, certificate_number')
      .eq('user_id', user.id);
    if (data && data.length > 0) setUserCert(data[0]);
  };

  const claimCert = async () => {
    if (!user || !certId) { toast.error('Sign in to claim your certification'); return; }
    if (!recipientName.trim()) { toast.error('Please enter your name'); return; }
    if (!isEligible) { toast.error(`You need ${daysRemaining} more days of membership`); return; }

    setClaiming(true);
    const { error } = await supabase.from('user_certifications').insert({
      user_id: user.id,
      certification_id: certId,
    });
    if (error) {
      if (error.code === '23505') {
        toast.info('You already have this certification!');
        fetchUserCert();
      } else toast.error('Failed to claim certification');
    } else {
      toast.success('🎉 Certificate earned!');
      fetchUserCert();
    }
    setClaiming(false);
  };

  const downloadCertificate = async () => {
    const canvas = certCanvasRef.current;
    if (!canvas || !recipientName.trim()) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1920, H = 1358;
    canvas.width = W;
    canvas.height = H;

    // === CLEAN CORPORATE CERTIFICATE ===
    // White background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, W, H);

    // Top accent bar — solid dark navy
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, W, 8);

    // Bottom accent bar
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, H - 8, W, 8);

    // Left accent stripe
    ctx.fillStyle = '#2563EB';
    ctx.fillRect(0, 8, 6, H - 16);

    // Subtle border
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, W - 80, H - 80);

    // Inner border
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 50, W - 100, H - 100);

    ctx.textAlign = 'center';

    // "CERTIFICATE OF ACHIEVEMENT" — clean sans-serif
    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 14px "Helvetica Neue", Arial, sans-serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('C E R T I F I C A T E   O F   A C H I E V E M E N T', W / 2, 130);

    // Thin horizontal rule
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 200, 155);
    ctx.lineTo(W / 2 + 200, 155);
    ctx.stroke();

    // Organization name
    ctx.fillStyle = '#0F172A';
    ctx.font = '700 28px "Helvetica Neue", Arial, sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('ZEPHORYX AI LAB', W / 2, 210);
    ctx.letterSpacing = '0px';

    // "This certifies that"
    ctx.fillStyle = '#64748B';
    ctx.font = '400 22px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('This is to certify that', W / 2, 310);

    // Recipient name — large, bold, clean
    ctx.fillStyle = '#0F172A';
    ctx.font = '700 64px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(recipientName, W / 2, 420);

    // Blue underline under name
    const nw = ctx.measureText(recipientName).width;
    ctx.strokeStyle = '#2563EB';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(W / 2 - nw / 2 - 20, 445);
    ctx.lineTo(W / 2 + nw / 2 + 20, 445);
    ctx.stroke();

    // Description — clean body text
    ctx.fillStyle = '#475569';
    ctx.font = '400 22px "Helvetica Neue", Arial, sans-serif';
    const lines = [
      'has successfully demonstrated dedication to AI learning by actively',
      'engaging with the ZEPHORYX AI LAB platform for a period of one month.',
      '',
      'Topics covered include Prompt Engineering, Agentic AI, RAG,',
      'Model Context Protocol, Guardrails, Generative AI, Deep Learning,',
      'Computer Vision, NLP, MLOps, and Quantum Computing.',
    ];
    lines.forEach((line, i) => {
      ctx.fillText(line, W / 2, 510 + i * 36);
    });

    // Horizontal divider
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(200, 760);
    ctx.lineTo(W - 200, 760);
    ctx.stroke();

    // Date and Certificate Number — two columns
    if (userCert) {
      ctx.textAlign = 'left';
      ctx.fillStyle = '#94A3B8';
      ctx.font = '400 14px "Helvetica Neue", Arial, sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('DATE ISSUED', 250, 810);
      ctx.letterSpacing = '0px';
      ctx.fillStyle = '#0F172A';
      ctx.font = '600 20px "Helvetica Neue", Arial, sans-serif';
      const d = new Date(userCert.earned_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      ctx.fillText(d, 250, 840);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#94A3B8';
      ctx.font = '400 14px "Helvetica Neue", Arial, sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('CERTIFICATE NO.', W - 250, 810);
      ctx.letterSpacing = '0px';
      ctx.fillStyle = '#0F172A';
      ctx.font = '600 20px "Courier New", monospace';
      ctx.fillText(userCert.certificate_number, W - 250, 840);
    }

    // Signature section — centered
    ctx.textAlign = 'center';

    // Signature line
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 150, 960);
    ctx.lineTo(W / 2 + 150, 960);
    ctx.stroke();

    // Signature name
    ctx.fillStyle = '#0F172A';
    ctx.font = '600 24px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('Haafil Mohammed', W / 2, 1000);

    // Title
    ctx.fillStyle = '#64748B';
    ctx.font = '400 16px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('Founder & CEO', W / 2, 1030);

    // Footer — brand
    ctx.fillStyle = '#94A3B8';
    ctx.font = '400 13px "Helvetica Neue", Arial, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('ZEPHORYX AI LAB', W / 2, 1120);
    ctx.letterSpacing = '0px';

    // Verification URL
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '400 12px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('Verify at: zephoryx-ai-lab-ai-learning-platform.lovable.app/verify', W / 2, 1150);

    // Small blue accent dot
    ctx.fillStyle = '#2563EB';
    ctx.beginPath();
    ctx.arc(W / 2, 1080, 4, 0, Math.PI * 2);
    ctx.fill();

    const link = document.createElement('a');
    link.download = `ZEPHORYX-Certificate-${recipientName.replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast.success('Certificate downloaded!');
  };

  // Certificate preview component
  const CertificatePreview = () => (
    <div className="relative bg-white rounded-lg shadow-2xl border border-slate-200 p-8 aspect-[1920/1358] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-900" />
      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-900" />
      {/* Left accent */}
      <div className="absolute top-1.5 left-0 bottom-1.5 w-1 bg-blue-600" />

      <p className="text-[8px] tracking-[0.25em] text-slate-400 uppercase mb-1">Certificate of Achievement</p>
      <div className="w-16 h-px bg-slate-300 mb-2" />
      <p className="text-[10px] font-bold tracking-[0.15em] text-slate-900 uppercase mb-3">ZEPHORYX AI LAB</p>

      <p className="text-[7px] text-slate-500 mb-1">This is to certify that</p>
      <p className="text-lg font-bold text-slate-900 mb-0.5 leading-tight">
        {recipientName || 'Your Name'}
      </p>
      <div className="w-20 h-0.5 bg-blue-600 mb-2" />

      <p className="text-[6px] text-slate-500 max-w-[180px] leading-relaxed mb-3">
        has successfully demonstrated dedication to AI learning by actively engaging with the ZEPHORYX AI LAB platform.
      </p>

      <div className="w-12 h-px bg-slate-200 mb-1" />
      <p className="text-[8px] font-semibold text-slate-900">Haafil Mohammed</p>
      <p className="text-[6px] text-slate-500">Founder & CEO</p>

      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mb-1" />
      <p className="text-[5px] tracking-[0.1em] text-slate-400">ZEPHORYX AI LAB</p>
    </div>
  );

  return (
    <section className="py-16 px-4">
      <canvas ref={certCanvasRef} className="hidden" />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Badge className="mb-4 bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-0 px-4 py-1.5">
              <Award className="w-4 h-4 mr-1" /> Official Certification
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Certificate of Achievement
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Earn your official ZEPHORYX AI LAB certificate after one month of active learning.
            </p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="relative overflow-hidden border border-border shadow-xl">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Certificate Preview */}
                <div className="p-8 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 min-h-[420px]">
                  <div className="w-full max-w-sm">
                    <CertificatePreview />
                  </div>
                </div>

                {/* Right side */}
                <div className="p-8 flex flex-col justify-center space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground">Claim Your Certificate</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      This certificate recognizes your dedication to AI learning on ZEPHORYX AI LAB, covering Prompt Engineering, Agentic AI, RAG, MCP, Guardrails, Generative AI, and more.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 font-bold text-sm">HM</div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Haafil Mohammed</p>
                      <p className="text-xs text-muted-foreground">Founder & CEO, ZEPHORYX AI LAB</p>
                    </div>
                  </div>

                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={nameLoaded && !recipientName ? "Set your name during sign up" : "Your name from sign up"}
                      value={recipientName}
                      readOnly
                      className="pl-10 bg-muted/50 cursor-not-allowed"
                    />
                    <div className="flex items-center justify-between mt-1">
                      {nameLoaded && !recipientName && user && (
                        <p className="text-xs text-destructive">Your name was not set during sign up.</p>
                      )}
                      {user && (
                        <button
                          type="button"
                          onClick={() => {
                            const subject = encodeURIComponent('Certificate Name Change Request');
                            const body = encodeURIComponent(
                              `Hi Admin,\n\nI would like to request a name change for my certificate.\n\nAccount email: ${user.email}\nCurrent name: ${recipientName || '(not set)'}\nRequested new name: [Please enter your desired name here]\n\nThank you.`
                            );
                            window.open(`mailto:haafil006@gmail.com?subject=${subject}&body=${body}`, '_blank');
                          }}
                          className="text-xs text-primary hover:underline ml-auto"
                        >
                          Request name change
                        </button>
                      )}
                    </div>
                  </div>

                  {!user ? (
                    <p className="text-sm text-muted-foreground">Sign in to claim your certificate.</p>
                  ) : !isEligible ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground p-4 rounded-lg bg-muted/30 border border-border/50">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span>{daysRemaining} days remaining until you can claim your certificate.</span>
                    </div>
                  ) : userCert ? (
                    <div className="space-y-3">
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                        ✅ Certificate #{userCert.certificate_number} earned on {new Date(userCert.earned_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <Button
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-lg"
                        onClick={downloadCertificate}
                        disabled={!recipientName.trim()}
                      >
                        <Download className="w-4 h-4 mr-2" /> Download Certificate
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-lg text-lg py-6"
                      onClick={claimCert}
                      disabled={claiming || !recipientName.trim()}
                    >
                      {claiming ? 'Claiming...' : 'Claim Your Certificate'}
                    </Button>
                  )}

                  <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border/50">
                    <p className="font-semibold text-foreground/80">Requirements:</p>
                    <p>• Active membership for 1 month (or instant access for select accounts)</p>
                    <p>• Signed by Founder & CEO Haafil Mohammed</p>
                    <p>• Unique certificate number for public verification</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
