import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TermsAndConditions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Clavis AI</span>
            </div>
            <Button onClick={() => navigate("/")} variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <Card className="shadow-xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-4xl font-bold text-center">Terms and Conditions</CardTitle>
            <p className="text-center text-muted-foreground">Last updated: December 2024</p>
          </CardHeader>
          <CardContent className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Clavis AI ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms and Conditions, please do not use the Service.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily access the materials (information or software) on Clavis AI for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on Clavis AI</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Clavis AI and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Clavis AI.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. User Content</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Prohibited Uses</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>In any way that violates any applicable national or international law or regulation</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                <li>To impersonate or attempt to impersonate Clavis AI, a Clavis AI employee, another user, or any other person or entity</li>
                <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Clavis AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium">Email: hello@clavisai.com</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
