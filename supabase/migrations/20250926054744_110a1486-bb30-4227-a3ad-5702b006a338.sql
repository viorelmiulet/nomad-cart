-- Add customer_address column to orders table
ALTER TABLE public.orders ADD COLUMN customer_address TEXT NOT NULL DEFAULT '';