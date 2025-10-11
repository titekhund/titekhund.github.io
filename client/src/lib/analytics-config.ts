/**
 * Analytics Configuration
 * 
 * Uncomment one of the analytics providers below to enable tracking.
 * Both Plausible and Simple Analytics are privacy-friendly, GDPR-compliant options.
 */

export type AnalyticsProvider = 'plausible' | 'simple-analytics' | null;

// Choose your analytics provider (set to null to disable analytics)
export const ANALYTICS_PROVIDER: AnalyticsProvider = null;

// Plausible Analytics Configuration
// Sign up at https://plausible.io
export const PLAUSIBLE_CONFIG = {
  domain: 'yourdomain.com', // Replace with your domain
  // Optional: Set to true for local testing
  trackLocalhost: false,
  // Optional: Custom API host for self-hosted Plausible
  apiHost: undefined as string | undefined,
};

// Simple Analytics Configuration  
// Sign up at https://simpleanalytics.com
export const SIMPLE_ANALYTICS_CONFIG = {
  // Optional: Custom hostname for self-hosted Simple Analytics
  hostname: undefined as string | undefined,
  // Optional: Set to true to ignore DNT (Do Not Track)
  ignoreDNT: false,
};
