import { useState, useEffect } from 'react';

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const adminAuth = localStorage.getItem('admin_authenticated');
      const authTime = localStorage.getItem('admin_auth_time');
      
      if (adminAuth === 'true' && authTime) {
        const authTimestamp = parseInt(authTime);
        const currentTime = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        // Check if session is still valid (24 hours)
        if (currentTime - authTimestamp < twentyFourHours) {
          setIsAuthenticated(true);
        } else {
          // Session expired, clear storage
          clearAuth();
        }
      }
    } catch (error) {
      console.error('Error checking admin auth status:', error);
      clearAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const clearAuth = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_auth_time');
    setIsAuthenticated(false);
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearAuth();
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuthStatus
  };
}