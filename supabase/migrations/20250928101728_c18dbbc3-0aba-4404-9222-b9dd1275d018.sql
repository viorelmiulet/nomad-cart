-- Create site_analytics table for tracking visits
CREATE TABLE public.site_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  ip_address INET,
  session_id TEXT,
  user_id UUID,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert analytics data" 
ON public.site_analytics 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can view analytics data" 
ON public.site_analytics 
FOR SELECT 
TO authenticated
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_site_analytics_created_at ON public.site_analytics(created_at DESC);
CREATE INDEX idx_site_analytics_page_path ON public.site_analytics(page_path);
CREATE INDEX idx_site_analytics_session_id ON public.site_analytics(session_id);
CREATE INDEX idx_site_analytics_user_id ON public.site_analytics(user_id);

-- Create view for daily statistics
CREATE OR REPLACE VIEW public.daily_analytics AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_visits,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(DISTINCT ip_address) as unique_ips
FROM public.site_analytics
GROUP BY DATE(created_at)
ORDER BY date DESC;