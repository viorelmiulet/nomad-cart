-- Create product_reviews table
CREATE TABLE IF NOT EXISTS public.product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  images TEXT[], -- Array of image URLs
  is_verified_purchase BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view approved reviews
CREATE POLICY "Anyone can view approved reviews"
ON public.product_reviews
FOR SELECT
USING (status = 'approved');

-- Allow authenticated users to insert their own reviews
CREATE POLICY "Authenticated users can create reviews"
ON public.product_reviews
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own pending reviews
CREATE POLICY "Users can update their own pending reviews"
ON public.product_reviews
FOR UPDATE
USING (auth.uid() = user_id AND status = 'pending');

-- Allow admins to update any review (will need admin check)
CREATE POLICY "Admins can update any review"
ON public.product_reviews
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Allow admins to delete reviews
CREATE POLICY "Admins can delete reviews"
ON public.product_reviews
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_product_reviews_updated_at
  BEFORE UPDATE ON public.product_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_product_reviews_product_id ON public.product_reviews(product_id);
CREATE INDEX idx_product_reviews_status ON public.product_reviews(status);
CREATE INDEX idx_product_reviews_rating ON public.product_reviews(rating);