CREATE POLICY "Anyone can verify certificates by number"
ON public.user_certifications
FOR SELECT
TO anon, authenticated
USING (true);