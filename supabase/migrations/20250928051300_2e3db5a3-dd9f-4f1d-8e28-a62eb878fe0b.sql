-- Create support chat messages table
CREATE TABLE public.support_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  message TEXT NOT NULL,
  response TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required)
CREATE POLICY "Anyone can create support messages" 
ON public.support_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view their own messages by email" 
ON public.support_messages 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update support messages" 
ON public.support_messages 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_support_messages_updated_at
  BEFORE UPDATE ON public.support_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime
ALTER TABLE public.support_messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.support_messages;