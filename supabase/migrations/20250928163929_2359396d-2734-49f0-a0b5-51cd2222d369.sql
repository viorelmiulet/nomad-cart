-- Fix security definer view by recreating with security_invoker = true
DROP VIEW IF EXISTS daily_analytics;

-- Create the view with security_invoker to respect RLS
CREATE VIEW daily_analytics
WITH (security_invoker = true) AS
SELECT 
  date(created_at) AS date,
  count(*) AS total_visits,
  count(DISTINCT session_id) AS unique_sessions,
  count(DISTINCT user_id) AS unique_users,
  count(DISTINCT ip_address) AS unique_ips
FROM site_analytics
GROUP BY date(created_at)
ORDER BY date(created_at) DESC;