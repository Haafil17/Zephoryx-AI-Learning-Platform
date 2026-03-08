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
import certificateImage from '@/assets/certificate-badge.png';
import zephorxLogo from '@/assets/zephoryx-logo.png';

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
  const certCanvasRef = useRef<HTMLCanvasElement>(null);
  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const logoImgRef = useRef<HTMLImageElement | null>(null);

  const isInstant = user ? INSTANT_EMAILS.includes(user.email || '') : false;
  const accountAgeDays = user?.created_at
    ? Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const isEligible = isInstant || accountAgeDays >= 30;
  const daysRemaining = Math.max(0, 30 - accountAgeDays);

  useEffect(() => {
    fetchCert();
    if (user) fetchUserCert();
  }, [user]);

  useEffect(() => {
    const bg = new Image();
    bg.src = certificateImage;
    bg.onload = () => { bgImgRef.current = bg; };
    const logo = new Image();
    logo.src = zephorxLogo;
    logo.onload = () => { logoImgRef.current = logo; };
  }, []);

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

  const downloadCertificate = () => {
    const canvas = certCanvasRef.current;
    if (!canvas || !recipientName.trim()) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1920, H = 1358;
    canvas.width = W;
    canvas.height = H;

    // Draw the parchment certificate background
    if (bgImgRef.current) {
      ctx.drawImage(bgImgRef.current, 0, 0, W, H);
    } else {
      ctx.fillStyle = '#fdf6e3';
      ctx.fillRect(0, 0, W, H);
    }

    ctx.textAlign = 'center';

    // "CERTIFICATE OF ACHIEVEMENT" title
    ctx.fillStyle = '#8B6914';
    ctx.font = 'bold 60px Georgia, serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('CERTIFICATE OF ACHIEVEMENT', W / 2, 220);

    // Decorative line under title
    ctx.strokeStyle = '#8B6914';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 350, 245);
    ctx.lineTo(W / 2 + 350, 245);
    ctx.stroke();

    // "This is to certify that"
    ctx.fillStyle = '#444444';
    ctx.font = '30px Georgia, serif';
    ctx.fillText('This is to certify that', W / 2, 340);

    // Recipient name - BIG elegant
    ctx.fillStyle = '#1a1a2e';
    ctx.font = 'italic bold 86px Georgia, serif';
    ctx.fillText(recipientName, W / 2, 460);

    // Gold underline beneath name
    const nw = ctx.measureText(recipientName).width;
    ctx.strokeStyle = '#8B6914';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - nw / 2 - 60, 490);
    ctx.lineTo(W / 2 + nw / 2 + 60, 490);
    ctx.stroke();

    // Description text
    ctx.fillStyle = '#333333';
    ctx.font = '28px Georgia, serif';
    ctx.fillText('has successfully used the ZEPHORYX AI LAB platform', W / 2, 570);
    ctx.fillText('for a period of one month, demonstrating commitment to AI learning', W / 2, 615);
    ctx.fillText('across Prompt Engineering, Agentic AI, RAG, MCP, Guardrails,', W / 2, 660);
    ctx.fillText('Generative AI, and Quantum Computing.', W / 2, 705);

    // Date & cert number
    if (userCert) {
      ctx.fillStyle = '#555555';
      ctx.font = '22px Georgia, serif';
      const d = new Date(userCert.earned_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      ctx.fillText(`Date: ${d}`, W / 2, 790);
      ctx.fillText(`Certificate No: ${userCert.certificate_number}`, W / 2, 825);
    }

    // Decorative divider
    ctx.strokeStyle = '#8B6914';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(550, 880);
    ctx.lineTo(W - 550, 880);
    ctx.stroke();

    // CEO signature
    ctx.fillStyle = '#1a1a2e';
    ctx.font = 'italic 42px Georgia, serif';
    ctx.fillText('Haafil Mohammed', W / 2, 960);
    ctx.strokeStyle = '#555555';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 200, 978);
    ctx.lineTo(W / 2 + 200, 978);
    ctx.stroke();
    ctx.fillStyle = '#555555';
    ctx.font = '20px Georgia, serif';
    ctx.fillText('Founder & CEO, ZEPHORYX AI LAB', W / 2, 1010);

    // Logo
    if (logoImgRef.current) {
      ctx.drawImage(logoImgRef.current, W / 2 - 35, 1040, 70, 70);
    }

    // "ZEPHORYX AI LAB" branding
    ctx.fillStyle = '#8B6914';
    ctx.font = 'bold 18px Georgia, serif';
    ctx.fillText('ZEPHORYX AI LAB', W / 2, 1140);

    // Footer
    ctx.fillStyle = '#888888';
    ctx.font = '14px Georgia, serif';
    ctx.fillText('www.zephoryx-ai-lab.lovable.app', W / 2, 1170);

    const link = document.createElement('a');
    link.download = `ZEPHORYX-Certificate-${recipientName.replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast.success('Certificate downloaded!');
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/50 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-yellow-950/20">
      <canvas ref={certCanvasRef} className="hidden" />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Badge className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 border-0 px-4 py-1.5">
              <Award className="w-4 h-4 mr-1" /> Official Certification
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              ZEPHORYX AI LAB Certificate
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Earn your official Certificate of Achievement for dedicated AI learning.
            </p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="relative overflow-hidden border-2 border-amber-400/50 shadow-2xl shadow-amber-500/10">
            <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400" />
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Certificate Preview */}
                <div className="relative p-8 flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-amber-100/50 to-amber-50 min-h-[420px]">
                  <img src={certificateImage} alt="ZEPHORYX AI LAB Certificate" className="w-full max-w-md rounded-lg shadow-2xl border border-amber-300/50" />
                  {recipientName && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center mt-4">
                        <p className="text-amber-700/60 text-[9px] tracking-[0.2em] uppercase">This is to certify that</p>
                        <p className="text-slate-900 font-bold text-xl md:text-2xl italic mt-1">{recipientName}</p>
                        <p className="text-amber-700/40 text-[8px] mt-1 max-w-[200px] mx-auto leading-tight">has successfully used ZEPHORYX AI LAB for 1 month</p>
                      </div>
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-2">
                    <img src={zephorxLogo} alt="ZEPHORYX" className="w-8 h-8 rounded" />
                    <span className="text-amber-800 font-bold text-sm tracking-wider">ZEPHORYX AI LAB</span>
                  </div>
                </div>

                {/* Right side */}
                <div className="p-8 flex flex-col justify-center space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold font-display mb-2">Certificate of Achievement</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      This certificate recognizes your dedication to AI learning on ZEPHORYX AI LAB for one month, covering Prompt Engineering, Agentic AI, RAG, MCP, Guardrails, Generative AI, and Quantum Computing.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-slate-900 font-bold text-sm">HM</div>
                    <div>
                      <p className="font-semibold text-sm">Haafil Mohammed</p>
                      <p className="text-xs text-muted-foreground">Founder & CEO, ZEPHORYX AI LAB</p>
                    </div>
                  </div>

                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter your full name for the certificate"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="pl-10"
                    />
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
                        className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold hover:opacity-90 shadow-lg"
                        onClick={downloadCertificate}
                        disabled={!recipientName.trim()}
                      >
                        <Download className="w-4 h-4 mr-2" /> Download Certificate
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold hover:opacity-90 shadow-lg text-lg py-6"
                      onClick={claimCert}
                      disabled={claiming || !recipientName.trim()}
                    >
                      {claiming ? 'Claiming...' : '🎉 Claim Your Certificate'}
                    </Button>
                  )}

                  <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border/50">
                    <p className="font-semibold text-foreground/80">Requirements:</p>
                    <p>• Active membership for 1 month</p>
                    <p>• Signed by Founder & CEO Haafil Mohammed</p>
                    <p>• Unique certificate number for verification</p>
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
