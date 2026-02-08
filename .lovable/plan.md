

# ZEPHORYX AI LAB - Final Pricing System

## Overview

Implementing the subscription system with the updated Elite tier pricing at ₹5,199/month (increased by ₹1,700).

---

## Final Pricing Tiers

```text
+------------------+------------------+------------------+------------------+
|      FREE        |     BASIC        |     PREMIUM      |      ELITE       |
+------------------+------------------+------------------+------------------+
|       ₹0         |   ₹799/month     |  ₹1,999/month    |  ₹5,199/month    |
|     Forever      |    No Discount   |   No Discount    |   No Discount    |
+------------------+------------------+------------------+------------------+
```

---

## Feature Breakdown

| Feature | FREE | BASIC | PREMIUM | ELITE |
|---------|------|-------|---------|-------|
| AI Prompt Analyzer | 2/day | 10/day | 50/day | Unlimited |
| AI Chat Assistant | 3/day | 15/day | 50/day | Unlimited |
| Prompt Tester | 2/day | 10/day | 40/day | Unlimited |
| Video Tutorials | 3 videos | 10 videos | All videos | All videos |
| Knowledge Base | No access | Limited | Full access | Full access |
| Prompt Templates | 5 basic | 20 | 100 | All + Custom |
| Techniques Guide | Preview only | Basic | All | All + Advanced |
| Export Prompts | No | No | Yes | Yes |
| Save History | No | 7 days | 30 days | Unlimited |
| API Access | No | No | No | Yes |
| Certificate | No | No | No | Yes |
| Early Access | No | No | No | Yes |

---

## Implementation Steps

### Step 1: Database Schema

Create subscription tables with RLS policies:

- `subscription_plans` - Store plan details (FREE, BASIC, PREMIUM, ELITE with prices 0, 799, 1999, 5199)
- `subscriptions` - Link users to their active plans
- `usage_tracking` - Track daily feature usage per user

### Step 2: Pricing Page

Create `/pricing` route with:

- Clean comparison table showing all 4 tiers
- Monthly prices displayed prominently
- Feature checkmarks and limits clearly shown
- CTA buttons for each tier
- Responsive design for mobile

### Step 3: Subscription Hook

Create `useSubscription` hook to:

- Fetch current user's plan
- Check remaining daily usage
- Provide upgrade prompts

### Step 4: Usage Gate Component

Create wrapper component that:

- Checks if user has remaining uses
- Shows "X uses remaining today" counter
- Displays upgrade modal when limit reached

### Step 5: Feature Gating

Wrap these components with usage checks:

- PromptAnalyzer - Check analyzer limit
- PromptTester - Check tester limit
- AIChatAssistant - Check chat limit
- Videos - Lock videos based on tier

### Step 6: Edge Functions

Create backend functions for:

- `check-usage` - Verify daily limits
- `track-usage` - Increment counters, reset at midnight IST
- `payment-webhook` - Handle Razorpay payment confirmations

### Step 7: Payment Integration

Integrate Razorpay for:

- UPI payments
- Credit/Debit cards
- Net Banking
- Monthly subscription billing

---

## Files to Create

| File | Purpose |
|------|---------|
| `supabase/migrations/xxx_subscription_tables.sql` | Database schema |
| `src/pages/Pricing.tsx` | Pricing page UI |
| `src/hooks/useSubscription.ts` | Subscription state management |
| `src/components/UsageGate.tsx` | Feature limit wrapper |
| `src/components/UpgradeModal.tsx` | Upgrade prompt modal |
| `supabase/functions/check-usage/index.ts` | Usage verification |
| `supabase/functions/track-usage/index.ts` | Usage tracking |

## Files to Modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Add /pricing route |
| `src/components/PromptAnalyzer.tsx` | Add usage gate |
| `src/components/PromptTester.tsx` | Add usage gate |
| `src/components/AIChatAssistant.tsx` | Add usage gate |
| `src/components/Hero.tsx` | Add pricing CTA button |

---

## Technical Details

### Database RLS Policies

- Users can only read their own subscription
- Users can only read/update their own usage tracking
- subscription_plans table is publicly readable

### Usage Reset Logic

Daily limits reset at midnight IST (Indian Standard Time) using a scheduled edge function or on-demand calculation.

### Payment Flow

1. User selects plan on Pricing page
2. Razorpay checkout opens
3. Payment processed
4. Webhook updates subscription in database
5. User gains access immediately

