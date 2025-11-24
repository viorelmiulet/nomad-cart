-- Create email tracking tables for opens, clicks, and feedback

-- Table for tracking email opens
CREATE TABLE IF NOT EXISTS public.email_opens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email_history_id UUID NOT NULL REFERENCES public.email_history(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  opened_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for tracking email link clicks
CREATE TABLE IF NOT EXISTS public.email_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email_history_id UUID NOT NULL REFERENCES public.email_history(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  link_url TEXT NOT NULL,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for email feedback from customers
CREATE TABLE IF NOT EXISTS public.email_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email_history_id UUID NOT NULL REFERENCES public.email_history(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_opens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies for email_opens
CREATE POLICY "Anyone can track email opens"
  ON public.email_opens
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view email opens"
  ON public.email_opens
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for email_clicks
CREATE POLICY "Anyone can track email clicks"
  ON public.email_clicks
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view email clicks"
  ON public.email_clicks
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for email_feedback
CREATE POLICY "Anyone can submit email feedback"
  ON public.email_feedback
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view email feedback"
  ON public.email_feedback
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email_opens_history_id ON public.email_opens(email_history_id);
CREATE INDEX IF NOT EXISTS idx_email_opens_recipient ON public.email_opens(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_clicks_history_id ON public.email_clicks(email_history_id);
CREATE INDEX IF NOT EXISTS idx_email_clicks_recipient ON public.email_clicks(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_feedback_history_id ON public.email_feedback(email_history_id);