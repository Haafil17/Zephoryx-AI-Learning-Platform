import { Certifications } from "@/components/Certifications";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthButton } from "@/components/AuthButton";

const MyCertificate = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <AuthButton />
        <ThemeToggle />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Certifications />
      </div>
    </div>
  );
};

export default MyCertificate;
