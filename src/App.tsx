
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DifficultyProvider } from "@/contexts/DifficultyContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGate } from "@/components/AuthGate";

const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const VerifyCertificate = lazy(() => import("./pages/VerifyCertificate"));
const MyCertificate = lazy(() => import("./pages/MyCertificate"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="prompt-engineering-theme">
      <AuthProvider>
        <DifficultyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AuthGate><Index /></AuthGate>} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/admin" element={<AuthGate><Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}><AdminPanel /></Suspense></AuthGate>} />
              <Route path="/verify" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}><VerifyCertificate /></Suspense>} />
              <Route path="/my-certificate" element={<AuthGate><Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}><MyCertificate /></Suspense></AuthGate>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
        </DifficultyProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
