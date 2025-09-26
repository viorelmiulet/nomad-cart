-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  category_id UUID REFERENCES public.categories(id),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  total DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (admin functionality)
CREATE POLICY "Allow public read access on categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public access on categories" ON public.categories FOR ALL USING (true);

CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public access on products" ON public.products FOR ALL USING (true);

CREATE POLICY "Allow public access on orders" ON public.orders FOR ALL USING (true);
CREATE POLICY "Allow public access on order_items" ON public.order_items FOR ALL USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample categories
INSERT INTO public.categories (name, slug, description) VALUES
('Living', 'living', 'Mobilier pentru camera de zi'),
('Dormitor', 'dormitor', 'Mobilier pentru dormitor'),
('Bucătărie', 'bucatarie', 'Mobilier pentru bucătărie'),
('Hol', 'hol', 'Mobilier pentru hol');

-- Insert sample products
INSERT INTO public.products (name, description, price, stock, category_id) VALUES
('Canapea Modernă', 'Canapea confortabilă din piele naturală', 2500.00, 15, (SELECT id FROM public.categories WHERE slug = 'living')),
('Masă Dining', 'Masă din lemn masiv pentru 6 persoane', 1800.00, 8, (SELECT id FROM public.categories WHERE slug = 'bucatarie')),
('Dulap Dormitor', 'Dulap spațios cu 4 uși', 3200.00, 5, (SELECT id FROM public.categories WHERE slug = 'dormitor')),
('Fotoliu Elegant', 'Fotoliu tapițat în catifea', 1200.00, 12, (SELECT id FROM public.categories WHERE slug = 'living')),
('Pat Matrimonial', 'Pat cu somieră inclusă', 2800.00, 7, (SELECT id FROM public.categories WHERE slug = 'dormitor')),
('Comoda Hol', 'Comoda cu 3 sertare', 950.00, 10, (SELECT id FROM public.categories WHERE slug = 'hol'));

-- Insert sample orders
INSERT INTO public.orders (customer_name, customer_email, customer_phone, total, status) VALUES
('Ion Popescu', 'ion.popescu@email.com', '0722123456', 2500.00, 'completed'),
('Maria Ionescu', 'maria.ionescu@email.com', '0733234567', 1800.00, 'pending'),
('Andrei Stoica', 'andrei.stoica@email.com', '0744345678', 4400.00, 'processing');