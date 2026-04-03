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
  const [nameLoaded, setNameLoaded] = useState(false);
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
    if (user) {
      fetchUserCert();
      // Load the user's full_name from their profile
      const loadName = async () => {
        const { data } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
        if (data?.full_name) setRecipientName(data.full_name);
        setNameLoaded(true);
      };
      loadName();
    }
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

  const downloadCertificate = async () => {
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

    // Ornamental top accent
    const drawOrnament = (y: number) => {
      ctx.strokeStyle = '#B8860B';
      ctx.lineWidth = 1.5;
      const cx = W / 2;
      // Left flourish
      ctx.beginPath();
      ctx.moveTo(cx - 300, y);
      ctx.bezierCurveTo(cx - 250, y - 15, cx - 150, y - 15, cx - 80, y);
      ctx.stroke();
      // Right flourish
      ctx.beginPath();
      ctx.moveTo(cx + 300, y);
      ctx.bezierCurveTo(cx + 250, y - 15, cx + 150, y - 15, cx + 80, y);
      ctx.stroke();
      // Center diamond
      ctx.fillStyle = '#B8860B';
      ctx.beginPath();
      ctx.moveTo(cx, y - 8);
      ctx.lineTo(cx + 8, y);
      ctx.lineTo(cx, y + 8);
      ctx.lineTo(cx - 8, y);
      ctx.closePath();
      ctx.fill();
    };

    // "CERTIFICATE OF ACHIEVEMENT" title
    ctx.fillStyle = '#6B4F1D';
    ctx.font = '600 16px Georgia, serif';
    ctx.letterSpacing = '12px';
    ctx.fillText('C E R T I F I C A T E', W / 2, 185);
    ctx.font = '600 13px Georgia, serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('O F   A C H I E V E M E N T', W / 2, 215);

    drawOrnament(250);

    // "This is to certify that"
    ctx.letterSpacing = '0px';
    ctx.fillStyle = '#555555';
    ctx.font = 'italic 26px Georgia, serif';
    ctx.fillText('This is to certify that', W / 2, 320);

    // Recipient name - elegant script style
    ctx.fillStyle = '#1a1a2e';
    ctx.font = 'italic bold 78px Georgia, serif';
    ctx.fillText(recipientName, W / 2, 430);

    // Elegant underline beneath name
    const nw = ctx.measureText(recipientName).width;
    const gradient = ctx.createLinearGradient(W / 2 - nw / 2 - 40, 0, W / 2 + nw / 2 + 40, 0);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.15, '#B8860B');
    gradient.addColorStop(0.85, '#B8860B');
    gradient.addColorStop(1, 'transparent');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(W / 2 - nw / 2 - 40, 460);
    ctx.lineTo(W / 2 + nw / 2 + 40, 460);
    ctx.stroke();

    // Description text
    ctx.fillStyle = '#444444';
    ctx.font = '24px Georgia, serif';
    const lines = [
      'has successfully demonstrated dedication to AI learning',
      'by actively using the ZEPHORYX AI LAB platform',
      'for a period of one month, engaging with topics including',
      'Prompt Engineering, Agentic AI, RAG, MCP, Guardrails,',
      'Generative AI, Deep Learning, and Quantum Computing.',
    ];
    lines.forEach((line, i) => {
      ctx.fillText(line, W / 2, 530 + i * 38);
    });

    drawOrnament(740);

    // Date & cert number
    if (userCert) {
      ctx.fillStyle = '#666666';
      ctx.font = '20px Georgia, serif';
      const d = new Date(userCert.earned_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      ctx.fillText(`Issued: ${d}`, W / 2, 790);
      ctx.font = '600 18px "Courier New", monospace';
      ctx.fillStyle = '#8B6914';
      ctx.fillText(`Certificate No: ${userCert.certificate_number}`, W / 2, 825);
    }

    // Signature section
    ctx.fillStyle = '#1a1a2e';
    ctx.font = 'italic 38px Georgia, serif';
    ctx.fillText('Haafil Mohammed', W / 2, 930);

    // Signature line
    const sigGradient = ctx.createLinearGradient(W / 2 - 180, 0, W / 2 + 180, 0);
    sigGradient.addColorStop(0, 'transparent');
    sigGradient.addColorStop(0.2, '#888');
    sigGradient.addColorStop(0.8, '#888');
    sigGradient.addColorStop(1, 'transparent');
    ctx.strokeStyle = sigGradient;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 180, 948);
    ctx.lineTo(W / 2 + 180, 948);
    ctx.stroke();

    ctx.fillStyle = '#666666';
    ctx.font = '16px Georgia, serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('F O U N D E R  &  C E O', W / 2, 980);
    ctx.letterSpacing = '0px';

    // Logo
    if (logoImgRef.current) {
      ctx.drawImage(logoImgRef.current, W / 2 - 30, 1010, 60, 60);
    }

    // Brand name
    ctx.fillStyle = '#8B6914';
    ctx.font = '600 15px Georgia, serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('Z E P H O R Y X   A I   L A B', W / 2, 1100);
    ctx.letterSpacing = '0px';

    // Verification URL
    ctx.fillStyle = '#999999';
    ctx.font = '12px Georgia, serif';
    ctx.fillText('Verify at: zephoryx-ai-lab-ai-learning-platform.lovable.app/verify', W / 2, 1135);

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
