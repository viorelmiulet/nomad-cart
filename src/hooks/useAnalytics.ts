import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// Generate session ID for tracking unique sessions
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Detect device type
const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
};

// Detect browser
const getBrowser = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Other';
};

export function useAnalytics() {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const sessionId = getSessionId();
        const deviceType = getDeviceType();
        const browser = getBrowser();

        const analyticsData = {
          page_path: location.pathname,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
          session_id: sessionId,
          user_id: user?.id || null,
          device_type: deviceType,
          browser: browser,
        };

        // Insert analytics data
        const { error } = await supabase
          .from('site_analytics')
          .insert(analyticsData);

        if (error) {
          console.error('Error tracking page view:', error);
        }
      } catch (error) {
        console.error('Error in analytics tracking:', error);
      }
    };

    // Track page view
    trackPageView();
  }, [location.pathname, user?.id]);

  return null; // This hook doesn't return anything
}