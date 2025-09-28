-- Remove the bootstrap first admin policy
DROP POLICY IF EXISTS "Bootstrap first admin" ON public.user_roles;