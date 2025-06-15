
import { Hero } from "@/components/Hero";
import { Techniques } from "@/components/Techniques";
import { Examples } from "@/components/Examples";
import { BestPractices } from "@/components/BestPractices";
import { Resources } from "@/components/Resources";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Hero />
      <Techniques />
      <Examples />
      <BestPractices />
      <Resources />
      <Footer />
    </div>
  );
};

export default Index;
