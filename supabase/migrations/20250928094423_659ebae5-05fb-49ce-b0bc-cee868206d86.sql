-- Bootstrap policy to allow the first authenticated user to become admin
-- Ensures security by allowing this only if no admin exists yet

-- Enable RLS just in case (no-op if already enabled)
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create insert policy for first admin bootstrap
CREATE POLICY "Bootstrap first admin"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'admin'::app_role
  )
  AND auth.uid() = user_id
  AND role = 'admin'::app_role
);
