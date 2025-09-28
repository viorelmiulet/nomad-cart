import { useAnalytics } from '@/hooks/useAnalytics';

interface AnalyticsTrackerProps {
  children: React.ReactNode;
}

export function AnalyticsTracker({ children }: AnalyticsTrackerProps) {
  useAnalytics(); // This will track page views automatically
  
  return <>{children}</>;
}