-- Create company_info table for storing company details
CREATE TABLE public.company_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL DEFAULT 'Mobila Nomad',
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  description TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.company_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for displaying on site)
CREATE POLICY "Anyone can view company info" 
ON public.company_info 
FOR SELECT 
USING (true);

-- Only authenticated users can modify (we'll handle admin check in app)
CREATE POLICY "Authenticated users can update company info" 
ON public.company_info 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert company info" 
ON public.company_info 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_company_info_updated_at
BEFORE UPDATE ON public.company_info
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default company information
INSERT INTO public.company_info (
  company_name,
  email,
  phone,
  address,
  city,
  description,
  website
) VALUES (
  'Mobila Nomad',
  'contact@mobilanomad.ro',
  '+40 123 456 789',
  'Strada Exemplu nr. 123',
  'București',
  'Magazin de mobilier de calitate pentru casa ta',
  'https://mobilanomad.ro'
);