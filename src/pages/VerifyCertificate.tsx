import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, XCircle, Award, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import zephorxLogo from '@/assets/zephoryx-logo.png';

interface VerificationResult {
  valid: boolean;
  certificate_number?: string;
  earned_at?: string;
  certification_title?: string;
}

const VerifyCertificate = () => {
  const [searchParams] = useSearchParams();
  const initialCode = searchParams.get('code') || '';
  const [certCode, setCertCode] = useState(initialCode);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const verify = async () => {
    if (!certCode.trim()) return;
    setLoading(true);
    setSearched(true);

    const { data } = await supabase
      .from('user_certifications')
      .select('certificate_number, earned_at, certification_id')
      .eq('certificate_number', certCode.trim().toUpperCase())
      .limit(1);

    if (data && data.length > 0) {
      const cert = data[0];
      // Fetch certification title
      const { data: certInfo } = await supabase
        .from('certifications')
        .select('title')
        .eq('id', cert.certification_id)
        .single();

      setResult({
        valid: true,
        certificate_number: cert.certificate_number,
        earned_at: cert.earned_at,
        certification_title: certInfo?.title || 'Certificate of Achievement',
      });
    } else {
      setResult({ valid: false });
    }
    setLoading(false);
  };

  // Auto-verify if code is in URL
  useState(() => {
    if (initialCode) verify();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-background to-amber-50/30 dark:from-amber-950/20 dark:via-background dark:to-amber-950/10 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to ZEPHORYX AI LAB
            </Link>
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src={zephorxLogo} alt="ZEPHORYX" className="w-10 h-10 rounded" />
              <h1 className="text-2xl font-bold font-display">Certificate Verification</h1>
            </div>
            <p className="text-muted-foreground text-sm">
              Enter a certificate number to verify its authenticity.
            </p>
          </div>

          {/* Search */}
          <Card className="border-2 border-amber-400/30 shadow-xl">
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. ZEPH-A1B2C3D4"
                  value={certCode}
                  onChange={(e) => setCertCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && verify()}
                  className="font-mono tracking-wider"
                />
                <Button
                  onClick={verify}
                  disabled={loading || !certCode.trim()}
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold hover:opacity-90 shrink-0"
                >
                  <Search className="w-4 h-4 mr-1" />
                  {loading ? 'Checking...' : 'Verify'}
                </Button>
              </div>

              {/* Result */}
              {searched && result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`rounded-lg p-6 border-2 ${
                    result.valid
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700'
                      : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-700'
                  }`}
                >
                  {result.valid ? (
                    <div className="text-center space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                      <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                        ✅ Valid Certificate
                      </h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">
                          <span className="font-semibold text-foreground">{result.certification_title}</span>
                        </p>
                        <Badge variant="outline" className="font-mono">
                          {result.certificate_number}
                        </Badge>
                        <p className="text-muted-foreground">
                          Issued on{' '}
                          {new Date(result.earned_at!).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 pt-2">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span className="text-xs text-muted-foreground">Issued by ZEPHORYX AI LAB</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <XCircle className="w-12 h-12 text-red-500 mx-auto" />
                      <h3 className="text-lg font-bold text-red-700 dark:text-red-300">
                        ❌ Certificate Not Found
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        This certificate number could not be verified. Please check and try again.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
