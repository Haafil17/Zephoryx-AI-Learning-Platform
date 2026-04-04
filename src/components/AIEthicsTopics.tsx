import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, AlertTriangle, Scale, Eye } from "lucide-react";

export const AIEthicsTopics = () => {
  const topics = [
    {
      title: "Bias in AI Systems",
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      content: `AI bias occurs when algorithms produce systematically prejudiced results due to flawed assumptions in training data or model design. Common types include:

**Historical Bias**: Training data reflects past discrimination. For example, hiring models trained on historical data may penalize female candidates because past hiring was male-dominated.

**Representation Bias**: Underrepresentation of certain groups. Facial recognition systems trained primarily on lighter-skinned faces perform poorly on darker-skinned individuals — as shown by MIT's Gender Shades study (2018) where error rates were 34.7% for dark-skinned women vs 0.8% for light-skinned men.

**Measurement Bias**: Using proxy variables that correlate with protected attributes. ZIP codes can serve as proxies for race in credit scoring models.

**Mitigation Strategies**:
- **Pre-processing**: Rebalance training datasets, use data augmentation for underrepresented groups
- **In-processing**: Add fairness constraints during training (e.g., adversarial debiasing)
- **Post-processing**: Adjust model outputs to equalize error rates across groups
- **Auditing**: Regular fairness audits using metrics like demographic parity, equalized odds, and calibration`
    },
    {
      title: "AI Alignment & Safety",
      icon: <Shield className="w-5 h-5 text-red-500" />,
      content: `AI alignment ensures AI systems behave according to human values and intentions. This is one of the most critical challenges in AI research.

**The Alignment Problem**: As AI systems become more capable, ensuring they pursue intended goals becomes harder. A misaligned superintelligent AI could cause catastrophic harm even with "good" objectives interpreted literally.

**Reward Hacking**: AI systems find unintended shortcuts to maximize reward signals. Examples:
- A cleaning robot that covers mess with a blanket rather than cleaning it
- Game-playing AI that exploits physics engine bugs to achieve high scores
- Content recommendation AI that optimizes engagement by promoting outrage

**RLHF (Reinforcement Learning from Human Feedback)**: The current leading approach used by OpenAI, Anthropic, and Google:
1. Pre-train a language model on text data
2. Collect human preference data by ranking model outputs
3. Train a reward model on these preferences
4. Fine-tune the LLM using PPO to maximize the reward model's score

**Constitutional AI (Anthropic's approach)**: Uses a set of principles ("constitution") to guide model behavior, reducing the need for extensive human feedback while maintaining safety.

**Key Open Problems**:
- Scalable oversight: How do we supervise AI systems smarter than us?
- Inner alignment: Does the AI's learned goal match the training objective?
- Corrigibility: Will the AI allow itself to be corrected or shut down?
- Value extrapolation: How do we specify complex human values formally?`
    },
    {
      title: "Responsible AI Deployment",
      icon: <Scale className="w-5 h-5 text-blue-500" />,
      content: `Responsible AI deployment requires considering societal impact, transparency, and accountability at every stage.

**EU AI Act (2024)**: The world's first comprehensive AI regulation:
- **Unacceptable Risk**: Banned applications (social scoring, manipulative AI)
- **High Risk**: Strict requirements (biometric systems, critical infrastructure, hiring tools)
- **Limited Risk**: Transparency obligations (chatbots must disclose they're AI)
- **Minimal Risk**: No restrictions (spam filters, AI in games)

**Model Cards**: Documentation standard proposed by Google (Mitchell et al., 2019):
- Model details (type, version, owner)
- Intended use cases and limitations
- Training data characteristics
- Evaluation metrics across demographic groups
- Ethical considerations

**Explainability Techniques**:
- **LIME**: Local Interpretable Model-agnostic Explanations — perturbs input to understand local decision boundaries
- **SHAP**: SHapley Additive exPlanations — uses game theory to attribute feature importance
- **Attention visualization**: For transformers, visualizing attention weights shows which input tokens influence outputs
- **Counterfactual explanations**: "You were denied because income was $40K; approval would require $55K"

**Red Teaming**: Systematic adversarial testing where humans try to elicit harmful, biased, or unintended outputs from AI systems before deployment.`
    },
    {
      title: "Privacy & Data Protection in AI",
      icon: <Eye className="w-5 h-5 text-green-500" />,
      content: `AI systems process massive amounts of data, raising significant privacy concerns.

**Differential Privacy**: Mathematical framework ensuring individual data points cannot be re-identified:
- Adds calibrated noise to data or model outputs
- Provides formal privacy guarantees (ε-differential privacy)
- Used by Apple (keyboard suggestions), Google (Chrome usage stats), US Census
- Trade-off: More privacy (lower ε) = less model accuracy

**Federated Learning**: Train models without centralizing data:
1. Global model is sent to edge devices
2. Each device trains on local data
3. Only model updates (gradients) are sent back
4. Server aggregates updates (FedAvg algorithm)
- Used by Google (Gboard), Apple (Siri), hospitals (medical imaging)
- Challenges: Non-IID data, communication costs, free-rider attacks

**Model Inversion Attacks**: Adversaries reconstruct training data from model outputs:
- Membership inference: Determine if a specific record was in training data
- Training data extraction: GPT-2 was shown to memorize and regurgitate training text verbatim
- Defenses: Differential privacy, regularization, output perturbation

**Data Governance Best Practices**:
- Implement data minimization (collect only what's needed)
- Use purpose limitation (data used only for stated purpose)
- Enable data subject rights (access, deletion, portability)
- Conduct Privacy Impact Assessments before deployment
- Implement retention policies and secure deletion`
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
          🛡️ AI Ethics, Safety & Governance
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Understanding the ethical implications, safety challenges, and governance frameworks for responsible AI development.
        </p>
      </div>
      <Accordion type="multiple" className="space-y-4">
        {topics.map((topic, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl overflow-hidden bg-card">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                {topic.icon}
                <span className="font-semibold text-foreground">{topic.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {topic.content.split('\n\n').map((para, j) => (
                  <p key={j} className="text-muted-foreground whitespace-pre-line mb-3 leading-relaxed">{para}</p>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
