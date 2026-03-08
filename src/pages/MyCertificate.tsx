import { Certifications } from "@/components/Certifications";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Award, Shield, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthButton } from "@/components/AuthButton";
import { motion } from "framer-motion";

const MyCertificate = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Award, label: "Unique Certificate Number", description: "Each certificate gets a unique serial for verification", color: "from-amber-500 to-orange-500" },
    { icon: Shield, label: "Publicly Verifiable", description: "Anyone can verify your certificate at /verify", color: "from-emerald-500 to-teal-500" },
    { icon: Users, label: "30-Day Milestone", description: "Earned after one month of active membership", color: "from-blue-500 to-indigo-500" },
    { icon: Star, label: "High-Res Download", description: "Download as a professional 1920×1358 PNG", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/20 dark:from-slate-950 dark:via-amber-950/10 dark:to-orange-950/10">
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <AuthButton />
        <ThemeToggle />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 border-0 px-4 py-1.5">
            <Award className="w-4 h-4 mr-1" /> Professional Certification
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Your ZEPHORYX Certificate
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Earn your professional AI certification and showcase your expertise. Each certificate is uniquely numbered, verifiable, and recognized globally.
          </p>
        </motion.div>

        {/* Features Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {features.map((feat, i) => (
            <motion.div
              key={feat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-0 shadow-md bg-card/80 backdrop-blur-sm text-center">
                <CardContent className="pt-6 pb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mx-auto mb-3`}>
                    <feat.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-bold text-foreground">{feat.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{feat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certificate Component */}
        <Certifications />

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="border-0 shadow-md bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-foreground mb-2">🔐 Secure & Verifiable</h3>
              <p className="text-sm text-muted-foreground">Each certificate has a unique serial number that can be verified by anyone at /verify</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-foreground mb-2">📥 Downloadable</h3>
              <p className="text-sm text-muted-foreground">Download your certificate as a high-resolution PNG image for sharing on LinkedIn or printing</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-foreground mb-2">🏆 Achievement-Based</h3>
              <p className="text-sm text-muted-foreground">Certificates are earned through consistent engagement — 30 days of active membership</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MyCertificate;
