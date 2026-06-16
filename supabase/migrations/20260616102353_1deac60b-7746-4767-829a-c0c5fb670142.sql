-- Drop overly permissive policies
DROP POLICY IF EXISTS "Users can create own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can update own subscription" ON public.subscriptions;

-- Allow users to self-insert ONLY a free-plan subscription
CREATE POLICY "Users can create own free subscription"
ON public.subscriptions
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND status = 'active'
  AND plan_id IN (SELECT id FROM public.subscription_plans WHERE name = 'free')
);

-- Allow users to update their own subscription only while keeping it on the free plan
CREATE POLICY "Users can update own free subscription"
ON public.subscriptions
FOR UPDATE
TO authenticated
USING (
  auth.uid() = user_id
  AND plan_id IN (SELECT id FROM public.subscription_plans WHERE name = 'free')
)
WITH CHECK (
  auth.uid() = user_id
  AND status = 'active'
  AND plan_id IN (SELECT id FROM public.subscription_plans WHERE name = 'free')
);