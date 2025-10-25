/**
 * Performance Monitoring Utility
 * Tracks Core Web Vitals and custom performance metrics
 *
 * Metrics tracked:
 * - CLS (Cumulative Layout Shift)
 * - FID (First Input Delay)
 * - FCP (First Contentful Paint)
 * - LCP (Largest Contentful Paint)
 * - TTFB (Time to First Byte)
 * - Bundle size
 * - Route change performance
 */

/**
 * Core Web Vitals thresholds
 * Good / Needs Improvement / Poor
 */
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
} as const;

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

/**
 * Initialize performance monitoring
 * Call this in main.tsx or App.tsx
 */
export const initPerformanceMonitoring = () => {
  // Only run in browser
  if (typeof window === 'undefined') return;

  // Track Core Web Vitals
  trackWebVitals();

  // Track custom metrics
  trackBundleSize();
  trackRouteChanges();
  trackResourceTiming();

  console.log('[Performance] Monitoring initialized');
};

/**
 * Track Core Web Vitals using web-vitals library
 * Falls back to manual tracking if library not available
 */
const trackWebVitals = async () => {
  try {
    // Try to use web-vitals library if available
    const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');

    onCLS(onPerfEntry);
    onINP(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  } catch {
    // Fallback: manual tracking using PerformanceObserver
    trackWebVitalsManually();
  }
};

/**
 * Manual web vitals tracking (fallback)
 */
const trackWebVitalsManually = () => {
  // LCP tracking
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        onPerfEntry({
          name: 'LCP',
          value: lastEntry.renderTime || lastEntry.loadTime,
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('[Performance] LCP tracking not supported');
    }

    // FID tracking
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          onPerfEntry({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('[Performance] FID tracking not supported');
    }

    // CLS tracking
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Report CLS on page hide
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          onPerfEntry({ name: 'CLS', value: clsValue });
        }
      });
    } catch (e) {
      console.warn('[Performance] CLS tracking not supported');
    }
  }
};

/**
 * Handle performance metric
 */
const onPerfEntry = (metric: any) => {
  const rating = getRating(metric.name, metric.value);
  const perfMetric: PerformanceMetric = {
    name: metric.name,
    value: Math.round(metric.value),
    rating,
    timestamp: Date.now(),
  };

  // Log to console
  const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';
  console.log(
    `[Performance] ${emoji} ${metric.name}: ${perfMetric.value}${getUnit(metric.name)} (${rating})`
  );

  // Send to analytics (if available)
  sendToAnalytics(perfMetric);

  // Store in session storage for debugging
  storeMetric(perfMetric);
};

/**
 * Get rating based on thresholds
 */
const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

/**
 * Get unit for metric
 */
const getUnit = (name: string): string => {
  if (name === 'CLS') return '';
  return 'ms';
};

/**
 * Track bundle size
 */
const trackBundleSize = () => {
  if (!('performance' in window)) return;

  // Wait for resources to load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

      const jsSize = entries
        .filter((entry) => entry.name.endsWith('.js'))
        .reduce((acc, entry) => acc + (entry.transferSize || 0), 0);

      const cssSize = entries
        .filter((entry) => entry.name.endsWith('.css'))
        .reduce((acc, entry) => acc + (entry.transferSize || 0), 0);

      const imageSize = entries
        .filter((entry) =>
          entry.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
        )
        .reduce((acc, entry) => acc + (entry.transferSize || 0), 0);

      const totalSize = jsSize + cssSize + imageSize;

      console.log('[Performance] Bundle sizes:');
      console.log(`  JS: ${(jsSize / 1024).toFixed(2)} KB`);
      console.log(`  CSS: ${(cssSize / 1024).toFixed(2)} KB`);
      console.log(`  Images: ${(imageSize / 1024).toFixed(2)} KB`);
      console.log(`  Total: ${(totalSize / 1024).toFixed(2)} KB`);

      // Warn if bundle is too large
      if (jsSize > 500 * 1024) {
        console.warn('[Performance] ⚠️ JS bundle size exceeds 500KB');
      }
    }, 1000);
  });
};

/**
 * Track route changes
 */
const trackRouteChanges = () => {
  let routeChangeStart = 0;
  let currentPath = window.location.pathname;

  // Start timing on navigation
  const startRouteChange = () => {
    routeChangeStart = performance.now();
  };

  // Track popstate (back/forward)
  window.addEventListener('popstate', startRouteChange);

  // Track programmatic navigation
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    startRouteChange();
    return originalPushState.apply(this, args);
  };

  // Monitor DOM changes to detect route completion
  const observer = new MutationObserver(() => {
    const newPath = window.location.pathname;
    if (newPath !== currentPath && routeChangeStart > 0) {
      const duration = performance.now() - routeChangeStart;

      if (duration > 0 && duration < 10000) {
        const rating = duration < 300 ? 'good' : duration < 1000 ? 'needs-improvement' : 'poor';
        const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';

        console.log(
          `[Performance] ${emoji} Route change (${currentPath} → ${newPath}): ${duration.toFixed(0)}ms (${rating})`
        );
      }

      currentPath = newPath;
      routeChangeStart = 0;
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

/**
 * Track resource timing
 */
const trackResourceTiming = () => {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries() as PerformanceResourceTiming[];

      // Find slow resources
      const slowResources = entries.filter((entry) => entry.duration > 1000);

      if (slowResources.length > 0) {
        console.warn('[Performance] Slow resources detected:');
        slowResources.forEach((entry) => {
          console.warn(`  ${entry.name}: ${entry.duration.toFixed(0)}ms`);
        });
      }
    });

    observer.observe({ entryTypes: ['resource'] });
  } catch (e) {
    console.warn('[Performance] Resource timing not supported');
  }
};

/**
 * Send metrics to analytics
 * Replace with your analytics service (Google Analytics, Plausible, etc.)
 */
const sendToAnalytics = (metric: PerformanceMetric) => {
  // Example: Send to Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'web_vitals', {
      event_category: 'Performance',
      event_label: metric.name,
      value: metric.value,
      metric_rating: metric.rating,
    });
  }

  // Example: Send to custom analytics endpoint
  // fetch('/api/analytics/performance', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(metric),
  // }).catch(() => {}); // Fail silently
};

/**
 * Store metric in session storage for debugging
 */
const storeMetric = (metric: PerformanceMetric) => {
  try {
    const key = 'performance-metrics';
    const stored = sessionStorage.getItem(key);
    const metrics = stored ? JSON.parse(stored) : [];

    metrics.push(metric);

    // Keep only last 50 metrics
    if (metrics.length > 50) {
      metrics.shift();
    }

    sessionStorage.setItem(key, JSON.stringify(metrics));
  } catch {
    // Ignore storage errors
  }
};

/**
 * Get stored performance metrics
 * Useful for debugging
 */
export const getPerformanceMetrics = (): PerformanceMetric[] => {
  try {
    const stored = sessionStorage.getItem('performance-metrics');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/**
 * Clear stored performance metrics
 */
export const clearPerformanceMetrics = () => {
  try {
    sessionStorage.removeItem('performance-metrics');
  } catch {
    // Ignore storage errors
  }
};

/**
 * Log performance summary
 * Call this to see a summary of all metrics
 */
export const logPerformanceSummary = () => {
  const metrics = getPerformanceMetrics();

  if (metrics.length === 0) {
    console.log('[Performance] No metrics recorded yet');
    return;
  }

  console.log('[Performance] Summary:');
  console.log('='.repeat(50));

  const grouped = metrics.reduce((acc, metric) => {
    if (!acc[metric.name]) {
      acc[metric.name] = [];
    }
    acc[metric.name].push(metric);
    return {};
  }, {} as Record<string, PerformanceMetric[]>);

  Object.entries(grouped).forEach(([name, metricList]) => {
    const avg = metricList.reduce((sum, m) => sum + m.value, 0) / metricList.length;
    const lastMetric = metricList[metricList.length - 1];
    const emoji = lastMetric.rating === 'good' ? '✅' : lastMetric.rating === 'needs-improvement' ? '⚠️' : '❌';

    console.log(`${emoji} ${name}: ${avg.toFixed(0)}${getUnit(name)} (avg)`);
  });

  console.log('='.repeat(50));
};

// Export for use in dev tools console
if (typeof window !== 'undefined') {
  (window as any).__performance__ = {
    getMetrics: getPerformanceMetrics,
    clearMetrics: clearPerformanceMetrics,
    logSummary: logPerformanceSummary,
  };

  console.log('[Performance] Dev tools available: window.__performance__');
}
