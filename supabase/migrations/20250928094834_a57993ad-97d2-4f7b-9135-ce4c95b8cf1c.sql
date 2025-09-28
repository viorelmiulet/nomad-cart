-- Grant admin role to the specified user (one-time bootstrap)
INSERT INTO public.user_roles (user_id, role)
VALUES ('63843fe8-3165-464f-9b37-738cdcb52316', 'admin'::app_role)
ON CONFLICT (user_id, role) DO NOTHING;