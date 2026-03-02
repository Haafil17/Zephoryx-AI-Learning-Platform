-- Auto-assign admin role when syedmusheer982@gmail.com signs up
CREATE OR REPLACE FUNCTION public.auto_assign_admin_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.email IN ('haafil006@gmail.com', 'syedmusheer982@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger on profiles table (fires after insert)
DROP TRIGGER IF EXISTS auto_admin_role_trigger ON public.profiles;
CREATE TRIGGER auto_admin_role_trigger
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_assign_admin_role();

-- Also insert admin role now if the user already exists
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM public.profiles WHERE email = 'syedmusheer982@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;