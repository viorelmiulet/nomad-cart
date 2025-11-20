-- Create discount settings table
CREATE TABLE IF NOT EXISTS public.discount_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  discount_percentage integer NOT NULL DEFAULT 10,
  is_active boolean NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.discount_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Anyone can view discount settings"
  ON public.discount_settings
  FOR SELECT
  USING (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update discount settings"
  ON public.discount_settings
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Only authenticated users can insert
CREATE POLICY "Authenticated users can insert discount settings"
  ON public.discount_settings
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_discount_settings_updated_at
  BEFORE UPDATE ON public.discount_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default discount setting
INSERT INTO public.discount_settings (discount_percentage, is_active)
VALUES (10, true);