import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { 
  ANALYTICS_PROVIDER, 
  PLAUSIBLE_CONFIG, 
  SIMPLE_ANALYTICS_CONFIG 
} from '@/lib/analytics-config';

/**
 * Analytics Component
 * 
 * Handles lightweight, privacy-friendly analytics integration.
 * Supports Plausible Analytics and Simple Analytics.
 * 
 * No tracking is enabled by default - configure in analytics-config.ts
 */
export function Analytics() {
  const [location] = useLocation();

  useEffect(() => {
    if (!ANALYTICS_PROVIDER) return;

    // Track page views on route change
    if (ANALYTICS_PROVIDER === 'plausible' && window.plausible) {
      window.plausible('pageview');
    } else if (ANALYTICS_PROVIDER === 'simple-analytics' && window.sa_pageview) {
      window.sa_pageview();
    }
  }, [location]);

  useEffect(() => {
    if (!ANALYTICS_PROVIDER) return;

    // Load analytics script
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;

    if (ANALYTICS_PROVIDER === 'plausible') {
      const dataDomain = PLAUSIBLE_CONFIG.domain;
      const apiHost = PLAUSIBLE_CONFIG.apiHost || 'https://plausible.io';
      
      script.src = `${apiHost}/js/plausible.js`;
      script.setAttribute('data-domain', dataDomain);
      
      if (PLAUSIBLE_CONFIG.trackLocalhost) {
        script.setAttribute('data-include-localhost', 'true');
      }
    } else if (ANALYTICS_PROVIDER === 'simple-analytics') {
      const hostname = SIMPLE_ANALYTICS_CONFIG.hostname || 'scripts.simpleanalyticscdn.com';
      
      script.src = `https://${hostname}/latest.js`;
      
      if (SIMPLE_ANALYTICS_CONFIG.ignoreDNT) {
        script.setAttribute('data-ignore-dnt', 'true');
      }
    }

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}

// Type declarations for global analytics objects
declare global {
  interface Window {
    plausible?: (event: string, options?: Record<string, unknown>) => void;
    sa_pageview?: () => void;
    sa_event?: (event: string, options?: Record<string, unknown>) => void;
  }
}
