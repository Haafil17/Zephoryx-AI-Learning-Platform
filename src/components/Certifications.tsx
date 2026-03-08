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
    const img = new Image();
    img.src = zephorxLogo;
    img.onload = () => { logoImgRef.current = img; };
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

    canvas.width = 1920;
    canvas.height = 1358;

    // Background
    const bgGrad = ctx.createLinearGradient(0, 0, 1920, 1358);
    bgGrad.addColorStop(0, '#0a1628');
    bgGrad.addColorStop(0.5, '#0f1d35');
    bgGrad.addColorStop(1, '#0a1628');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1920, 1358);

    // Outer gold border
    ctx.strokeStyle = '#c8a84e';
    ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, 1840, 1278);
    // Inner border
    ctx.strokeStyle = '#a88a3a';
    ctx.lineWidth = 2;
    ctx.strokeRect(55, 55, 1810, 1248);

    // Corner ornaments
    const drawCorner = (x: number, y: number, sx: number, sy: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(sx, sy);
      ctx.fillStyle = '#c8a84e';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(60, 0, 80, 30);
      ctx.quadraticCurveTo(60, 20, 50, 50);
      ctx.quadraticCurveTo(30, 40, 0, 80);
      ctx.quadraticCurveTo(20, 50, 0, 0);
      ctx.fill();
      ctx.restore();
    };
    drawCorner(60, 60, 1, 1);
    drawCorner(1860, 60, -1, 1);
    drawCorner(60, 1298, 1, -1);
    drawCorner(1860, 1298, -1, -1);

    // Logo
    if (logoImgRef.current) {
      const logoSize = 80;
      ctx.drawImage(logoImgRef.current, 960 - logoSize / 2, 90, logoSize, logoSize);
    }

    // ZEPHORYX AI LAB header
    ctx.fillStyle = '#c8a84e';
    ctx.font = 'bold 52px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('ZEPHORYX AI LAB', 960, 220);

    // Decorative line
    ctx.strokeStyle = '#c8a84e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(600, 245);
    ctx.lineTo(1320, 245);
    ctx.stroke();

    // Certificate title
    ctx.fillStyle = '#e8d5a0';
    ctx.font = 'bold 72px Georgia, serif';
    ctx.fillText('CERTIFICATE', 960, 340);
    ctx.font = '36px Georgia, serif';
    ctx.fillText('OF ACHIEVEMENT', 960, 390);

    // Diamond
    ctx.fillStyle = '#c8a84e';
    ctx.beginPath();
    ctx.moveTo(960, 420);
    ctx.lineTo(970, 435);
    ctx.lineTo(960, 450);
    ctx.lineTo(950, 435);
    ctx.closePath();
    ctx.fill();

    // "This is to certify that"
    ctx.fillStyle = '#8899aa';
    ctx.font = '26px Georgia, serif';
    ctx.fillText('This is to certify that', 960, 510);

    // Recipient name - BIG
    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic bold 72px Georgia, serif';
    ctx.fillText(recipientName, 960, 610);

    // Name underline
    const nw = ctx.measureText(recipientName).width;
    ctx.strokeStyle = '#c8a84e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(960 - nw / 2 - 30, 635);
    ctx.lineTo(960 + nw / 2 + 30, 635);
    ctx.stroke();

    // Description
    ctx.fillStyle = '#a0b0c0';
    ctx.font = '24px Georgia, serif';
    ctx.fillText('has successfully used the ZEPHORYX AI LAB platform', 960, 700);
    ctx.fillText('for a period of one month, demonstrating dedication to AI learning', 960, 740);
    ctx.fillText('across Prompt Engineering, Agentic AI, RAG, MCP, Guardrails,', 960, 780);
    ctx.fillText('Generative AI, and Quantum Computing.', 960, 820);

    // Date & cert number
    if (userCert) {
      ctx.fillStyle = '#8899aa';
      ctx.font = '20px Georgia, serif';
      const d = new Date(userCert.earned_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      ctx.fillText(`Date: ${d}`, 960, 880);
      ctx.fillText(`Certificate No: ${userCert.certificate_number}`, 960, 910);
    }

    // Divider
    ctx.strokeStyle = '#c8a84e';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(400, 950);
    ctx.lineTo(1520, 950);
    ctx.stroke();

    // CEO signature
    ctx.fillStyle = '#c8a84e';
    ctx.font = 'italic 34px Georgia, serif';
    ctx.fillText('Haafil Mohammed', 960, 1020);
    ctx.strokeStyle = '#8899aa';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(780, 1035);
    ctx.lineTo(1140, 1035);
    ctx.stroke();
    ctx.fillStyle = '#8899aa';
    ctx.font = '18px Georgia, serif';
    ctx.fillText('Founder & CEO, ZEPHORYX AI LAB', 960, 1065);

    // Gold seal
    ctx.beginPath();
    ctx.arc(960, 1180, 60, 0, Math.PI * 2);
    const sg = ctx.createRadialGradient(960, 1180, 10, 960, 1180, 60);
    sg.addColorStop(0, '#e8d5a0');
    sg.addColorStop(0.5, '#c8a84e');
    sg.addColorStop(1, '#a88a3a');
    ctx.fillStyle = sg;
    ctx.fill();
    ctx.fillStyle = '#0a1628';
    ctx.font = 'bold 16px Georgia, serif';
    ctx.fillText('ZEPHORYX', 960, 1177);
    ctx.font = '12px Georgia, serif';
    ctx.fillText('AI LAB', 960, 1195);

    // Footer
    ctx.fillStyle = '#556677';
    ctx.font = '14px Georgia, serif';
    ctx.fillText('www.zephoryx-ai-lab.lovable.app', 960, 1290);

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
              Earn your official Certificate of Achievement for dedicated AI learning on our platform.
            </p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="relative overflow-hidden border-2 border-amber-400/50 shadow-2xl shadow-amber-500/10">
            <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400" />
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Certificate Preview */}
                <div className="relative p-8 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-[400px]">
                  <img src={certificateImage} alt="ZEPHORYX AI LAB Certificate" className="w-full max-w-md rounded-lg shadow-2xl border border-amber-500/20" />
                  {recipientName && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center mt-12">
                        <p className="text-amber-200/60 text-xs tracking-widest uppercase">This is to certify that</p>
                        <p className="text-white font-bold text-2xl md:text-3xl italic mt-1 drop-shadow-lg">{recipientName}</p>
                        <p className="text-amber-200/40 text-xs mt-1">has successfully used ZEPHORYX AI LAB for 1 month</p>
                      </div>
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-2">
                    <img src={zephorxLogo} alt="ZEPHORYX" className="w-8 h-8 rounded" />
                    <span className="text-amber-400 font-bold text-sm tracking-wider">ZEPHORYX AI LAB</span>
                  </div>
                </div>

                {/* Right side - name input & actions */}
                <div className="p-8 flex flex-col justify-center space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold font-display mb-2">Certificate of Achievement</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      This certificate recognizes your dedication to AI learning on ZEPHORYX AI LAB for one month, covering Prompt Engineering, Agentic AI, RAG, MCP, Guardrails, Generative AI, and Quantum Computing.
                    </p>
                  </div>

                  {/* CEO Info */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-slate-900 font-bold text-sm">HM</div>
                    <div>
                      <p className="font-semibold text-sm">Haafil Mohammed</p>
                      <p className="text-xs text-muted-foreground">Founder & CEO, ZEPHORYX AI LAB</p>
                    </div>
                  </div>

                  {/* Name input */}
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
                      <Clock className="w-4 h-4" />
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
                    <p className="font-semibold text-foreground/80">Certificate Requirements:</p>
                    <p>• Active ZEPHORYX AI LAB membership for 1 month</p>
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
