-- Add policy to ensure only authenticated users can access profiles
CREATE POLICY "Authenticated users only" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = id OR has_role(auth.uid(), 'admin'::app_role));

-- Drop the old policies that don't require authentication
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;