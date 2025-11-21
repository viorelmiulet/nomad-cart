-- Create email_history table to track all sent emails
CREATE TABLE IF NOT EXISTS public.email_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  recipients TEXT[] NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  email_type TEXT NOT NULL, -- 'custom' or 'order_status'
  order_id UUID NULL,
  sent_by UUID NULL,
  status TEXT NOT NULL DEFAULT 'sent',
  error_message TEXT NULL
);

-- Enable Row Level Security
ALTER TABLE public.email_history ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to view email history
CREATE POLICY "Authenticated users can view email history"
ON public.email_history
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Create policy for system to insert email history
CREATE POLICY "System can insert email history"
ON public.email_history
FOR INSERT
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_email_history_created_at ON public.email_history(created_at DESC);
CREATE INDEX idx_email_history_order_id ON public.email_history(order_id) WHERE order_id IS NOT NULL;