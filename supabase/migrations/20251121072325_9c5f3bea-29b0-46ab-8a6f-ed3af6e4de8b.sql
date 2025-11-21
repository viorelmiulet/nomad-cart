-- Add discount code tracking to orders table
ALTER TABLE public.orders
ADD COLUMN discount_code_id UUID REFERENCES public.discount_codes(id),
ADD COLUMN discount_percentage INTEGER DEFAULT 0,
ADD COLUMN discount_amount NUMERIC DEFAULT 0;

-- Create index for faster lookups
CREATE INDEX idx_orders_discount_code ON public.orders(discount_code_id);