-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Create product_images table to store multiple images per product
CREATE TABLE public.product_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Create policies for product images
CREATE POLICY "Allow public access on product_images" ON public.product_images FOR ALL USING (true);

-- Create storage policies for product images
CREATE POLICY "Public can view product images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Public can upload product images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Public can update product images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'product-images');

CREATE POLICY "Public can delete product images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'product-images');

-- Create index for better performance
CREATE INDEX idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX idx_product_images_display_order ON public.product_images(product_id, display_order);