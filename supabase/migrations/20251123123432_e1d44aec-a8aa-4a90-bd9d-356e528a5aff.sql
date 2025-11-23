-- Fix email_history.order_id type to allow storing short order numbers
ALTER TABLE public.email_history
ALTER COLUMN order_id TYPE text USING order_id::text;