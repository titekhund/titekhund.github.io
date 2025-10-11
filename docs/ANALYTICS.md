# Analytics Setup Guide

This project supports privacy-friendly analytics using either **Plausible Analytics** or **Simple Analytics**. Both are GDPR-compliant, cookieless alternatives to Google Analytics.

## Why These Analytics Providers?

### Plausible Analytics
- ✅ Privacy-friendly and GDPR-compliant
- ✅ No cookies, no personal data collection
- ✅ Lightweight script (<1KB)
- ✅ Open-source
- ✅ Self-hosting option available
- 📍 Website: https://plausible.io

### Simple Analytics
- ✅ Privacy-first analytics
- ✅ Cookieless tracking
- ✅ Lightweight and fast
- ✅ GDPR, CCPA, PECR compliant
- ✅ Self-hosting option available
- 📍 Website: https://simpleanalytics.com

## Setup Instructions

### 1. Choose Your Provider

Edit `client/src/lib/analytics-config.ts`:

```typescript
// Set to 'plausible', 'simple-analytics', or null
export const ANALYTICS_PROVIDER: AnalyticsProvider = 'plausible'; // or 'simple-analytics'
```

### 2. Configure Plausible Analytics

If using Plausible:

```typescript
export const PLAUSIBLE_CONFIG = {
  domain: 'yoursite.com', // Replace with your actual domain
  trackLocalhost: false,  // Set to true for local testing
  apiHost: undefined,     // For self-hosted: 'https://plausible.yourserver.com'
};
```

**Setup Steps:**
1. Sign up at https://plausible.io
2. Add your website domain
3. Update `domain` in the config
4. Deploy your site - tracking starts automatically

### 3. Configure Simple Analytics

If using Simple Analytics:

```typescript
export const SIMPLE_ANALYTICS_CONFIG = {
  hostname: undefined,    // For self-hosted: 'analytics.yourserver.com'
  ignoreDNT: false,      // Set to true to ignore Do Not Track
};
```

**Setup Steps:**
1. Sign up at https://simpleanalytics.com
2. Add your website
3. Deploy your site - tracking starts automatically

## Features

### Automatic Page View Tracking
The analytics component automatically tracks page views when users navigate between routes using wouter's client-side routing.

### Privacy-First
- No cookies used
- No personal data collected
- No IP address logging (Plausible hashes IPs, Simple Analytics doesn't store them)
- GDPR compliant by default
- No consent banner required

### Lightweight
Both providers use minimal JavaScript:
- Plausible: <1KB
- Simple Analytics: ~3KB

This ensures your site stays fast and performant.

## Testing

### Local Testing (Plausible only)
To test analytics in your local development environment:

```typescript
export const PLAUSIBLE_CONFIG = {
  domain: 'localhost',
  trackLocalhost: true, // Enable local tracking
};
```

### Verify Installation

After deploying with analytics enabled:

1. Visit your website
2. Check your analytics dashboard
3. Verify page views are being tracked
4. Navigate between pages to confirm route tracking works

### Debug Mode

Check browser console for analytics script loading:
- Plausible: Look for `plausible.js` in Network tab
- Simple Analytics: Look for `latest.js` in Network tab

## Disabling Analytics

To completely disable analytics:

```typescript
export const ANALYTICS_PROVIDER: AnalyticsProvider = null;
```

This removes all analytics scripts from your site.

## Self-Hosting

Both providers support self-hosting for maximum privacy and control:

### Plausible Self-Hosted
- GitHub: https://github.com/plausible/analytics
- Update `apiHost` in config to your server URL

### Simple Analytics Self-Hosted  
- GitHub: https://github.com/simpleanalytics/roadmap/issues/24
- Update `hostname` in config to your server URL

## Custom Events (Optional)

If you want to track custom events beyond page views:

### Plausible Custom Events
```typescript
window.plausible?.('Download', { props: { file: 'cv.pdf' } });
```

### Simple Analytics Custom Events
```typescript
window.sa_event?.('download_cv');
```

## Best Practices

1. **Choose one provider** - Don't enable both simultaneously
2. **Update domain** - Make sure your domain matches your production URL
3. **Respect DNT** - Keep `ignoreDNT: false` unless you have a specific reason
4. **Test before deploy** - Verify tracking works in staging environment
5. **Review data regularly** - Use insights to improve your site

## Privacy Policy

When using analytics, mention it in your privacy policy:

> "This website uses [Plausible/Simple Analytics], a privacy-friendly analytics service that does not use cookies and does not collect personal data. [Plausible/Simple Analytics] is GDPR-compliant and respects your privacy."

## Support

- Plausible Docs: https://plausible.io/docs
- Simple Analytics Docs: https://docs.simpleanalytics.com
- Issues: Check your provider's support channels
