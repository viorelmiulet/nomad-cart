-- Fix security definer view issue by recreating daily_analytics view without SECURITY DEFINER
DROP VIEW IF EXISTS public.daily_analytics;

-- Recreate the view without SECURITY DEFINER (default is SECURITY INVOKER which is safer)
CREATE VIEW public.daily_analytics AS 
SELECT 
  date(created_at) AS date,
  count(*) AS total_visits,
  count(DISTINCT session_id) AS unique_sessions,
  count(DISTINCT user_id) AS unique_users,
  count(DISTINCT ip_address) AS unique_ips
FROM site_analytics
GROUP BY date(created_at)
ORDER BY date(created_at) DESC;