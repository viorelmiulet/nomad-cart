-- Create price_history table to track all price changes
CREATE TABLE IF NOT EXISTS public.price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  old_price NUMERIC NOT NULL,
  new_price NUMERIC NOT NULL,
  changed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  change_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.price_history ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view price history
CREATE POLICY "Authenticated users can view price history"
ON public.price_history
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to insert price history
CREATE POLICY "Authenticated users can insert price history"
ON public.price_history
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_price_history_product_id ON public.price_history(product_id);
CREATE INDEX idx_price_history_created_at ON public.price_history(created_at DESC);