# Performance Optimization Guide - NutiFit

## Overview
This document outlines performance best practices for the NutiFit application, focusing on Core Web Vitals, rendering optimization, and efficient resource loading.

## Core Web Vitals

### Target Metrics
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTI (Time to Interactive)**: < 3.5s
- **TBT (Total Blocking Time)**: < 200ms

### Current Performance
- Lighthouse Score: Target >90
- Performance Budget: 500KB initial JS
- Critical CSS: < 14KB

## Rendering Optimization

### Code Splitting
```tsx
// ✅ CORRECT - Lazy load routes
const Menu = lazy(() => import('@/pages/Menu'));
const Order = lazy(() => import('@/pages/Order'));
const Profile = lazy(() => import('@/pages/Profile'));

<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/menu" element={<Menu />} />
    <Route path="/order" element={<Order />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
</Suspense>
```

### Component Optimization
```tsx
// ✅ CORRECT - Memoize expensive components
const MealCard = memo(({ meal }) => {
  return <Card>...</Card>;
}, (prevProps, nextProps) => prevProps.meal.id === nextProps.meal.id);

// ✅ CORRECT - Use useCallback for event handlers
const handleClick = useCallback(() => {
  addToCart(meal.id);
}, [meal.id, addToCart]);

// ✅ CORRECT - Optimize re-renders with useMemo
const filteredMeals = useMemo(() => {
  return meals.filter(meal => meal.category === selectedCategory);
}, [meals, selectedCategory]);
```

## Image Optimization

### Responsive Images
```tsx
// ✅ CORRECT
<img
  src="/images/meal.jpg"
  srcSet="/images/meal-400.jpg 400w, /images/meal-800.jpg 800w"
  sizes="(max-width: 640px) 400px, 800px"
  alt="Meal description"
  loading="lazy"
  width="800"
  height="600"
/>
```

### Image Formats
- Use WebP for modern browsers
- Provide JPEG/PNG fallbacks
- Compress images (80-85% quality)
- Max image size: 200KB

### Lazy Loading
```tsx
// Native lazy loading
<img src="image.jpg" loading="lazy" alt="Description" />

// Intersection Observer for complex cases
const ImageWithLazyLoad = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isLoaded ? src : '/placeholder.svg'}
      alt={alt}
    />
  );
};
```

## Glassmorphism Performance

### GPU Acceleration
```css
/* ✅ CORRECT - Force GPU acceleration */
.glass-surface {
  will-change: backdrop-filter;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

/* ⚠️ Remove will-change after animation */
.glass-surface:not(:hover) {
  will-change: auto;
}
```

### Optimize Blur Radius
```css
/* Mobile - reduced blur */
@media (max-width: 768px) {
  .glass-surface {
    backdrop-filter: blur(12px); /* Instead of 20px */
  }
}

/* Desktop - full effect */
@media (min-width: 769px) {
  .glass-surface {
    backdrop-filter: blur(20px) saturate(180%);
  }
}
```

### Limit Glass Elements
```tsx
// ✅ CORRECT - Limited glass usage
<header className="glass-surface">...</header>
<Modal className="glass-surface-elevated">...</Modal>
// Total: 2-3 glass elements max per viewport

// ❌ WRONG - Too many glass elements
<div className="glass-card">
  <div className="glass-surface">
    <div className="glass-primary">...</div>
  </div>
</div>
```

## Animation Performance

### CSS Over JavaScript
```tsx
// ✅ CORRECT - CSS animations
<div className="animate-fade-in">...</div>

// ❌ WRONG - JS animations
<motion.div animate={{ opacity: 1 }}>...</motion.div>
```

### Transform and Opacity Only
```css
/* ✅ CORRECT - Animates on composite layer */
.hover-scale {
  transition: transform 300ms, opacity 300ms;
}
.hover-scale:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

/* ❌ WRONG - Forces repaints */
.hover-scale:hover {
  width: 110%;
  height: 110%;
  background: red;
}
```

### RequestAnimationFrame
```tsx
const AnimatedComponent = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let rafId;
    const animate = () => {
      setOffset(prev => (prev + 1) % 100);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return <div style={{ transform: `translateY(${offset}px)` }} />;
};
```

## Bundle Optimization

### Tree Shaking
```tsx
// ✅ CORRECT - Import specific exports
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

// ❌ WRONG - Imports entire library
import * as UI from "@/components/ui";
import * as Icons from "lucide-react";
```

### Dynamic Imports
```tsx
// ✅ CORRECT - Load on demand
const loadChart = async () => {
  const { Chart } = await import('chart.js');
  return new Chart(ctx, config);
};

// ✅ CORRECT - Preload critical resources
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin />
```

### Code Splitting Strategy
```
Initial Bundle (main):
- React core
- Router
- Global styles
- Critical components

Route Bundles:
- /menu → Menu components
- /order → Order flow
- /profile → User components

Vendor Bundles:
- react-query
- date-fns
- lucide-react
```

## Data Fetching

### React Query Optimization
```tsx
// ✅ CORRECT - Proper caching
const { data } = useQuery({
  queryKey: ['meals', filters],
  queryFn: () => fetchMeals(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});

// ✅ CORRECT - Prefetch on hover
const prefetchMeal = (mealId) => {
  queryClient.prefetchQuery({
    queryKey: ['meal', mealId],
    queryFn: () => fetchMeal(mealId),
  });
};

<MealCard onMouseEnter={() => prefetchMeal(meal.id)} />
```

### Pagination and Infinite Scroll
```tsx
// ✅ CORRECT - Paginated queries
const { data, fetchNextPage } = useInfiniteQuery({
  queryKey: ['meals'],
  queryFn: ({ pageParam = 0 }) => fetchMeals(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextPage,
});
```

## Network Optimization

### Compression
- Enable Gzip/Brotli compression
- Target: 80% size reduction for text assets

### CDN Strategy
- Static assets on CDN
- Image optimization service
- Edge caching for API responses

### HTTP/2 Server Push
```html
<!-- Preload critical resources -->
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin>
<link rel="preload" href="/css/critical.css" as="style">
<link rel="modulepreload" href="/js/main.js">
```

## Memory Management

### Cleanup Effects
```tsx
// ✅ CORRECT - Cleanup subscriptions
useEffect(() => {
  const subscription = dataStream.subscribe(handleData);
  return () => subscription.unsubscribe();
}, []);

// ✅ CORRECT - Cancel API requests
useEffect(() => {
  const controller = new AbortController();
  
  fetch('/api/meals', { signal: controller.signal })
    .then(handleResponse)
    .catch(err => {
      if (err.name === 'AbortError') return;
      handleError(err);
    });

  return () => controller.abort();
}, []);
```

### Event Listener Cleanup
```tsx
// ✅ CORRECT - Remove listeners
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

## Mobile Performance

### Touch Optimization
```css
/* Improve tap responsiveness */
* {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* Smooth scrolling */
.scrollable {
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
}
```

### Reduce JavaScript
- Minimize third-party scripts
- Use native browser features
- Defer non-critical scripts

### Network Conditions
```tsx
// Detect slow connections
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

if (connection && connection.effectiveType === 'slow-2g') {
  // Disable animations
  // Reduce image quality
  // Limit concurrent requests
}
```

## Monitoring

### Performance Metrics
```tsx
// Measure component render time
const measureRender = (componentName) => {
  performance.mark(`${componentName}-start`);
  
  useEffect(() => {
    performance.mark(`${componentName}-end`);
    performance.measure(
      componentName,
      `${componentName}-start`,
      `${componentName}-end`
    );
  });
};
```

### Error Tracking
```tsx
// Report performance issues
const reportWebVitals = ({ name, value, id }) => {
  analytics.track('web-vital', {
    metric: name,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    id,
  });
};
```

## Performance Budget

### Asset Limits
- JavaScript: < 500KB total, < 150KB initial
- CSS: < 100KB total, < 14KB critical
- Images: < 200KB per image
- Fonts: < 100KB total

### Metrics Budget
- Lighthouse Performance: > 90
- First Contentful Paint: < 1.8s
- Speed Index: < 3.4s
- Time to Interactive: < 3.9s

## Testing

### Lighthouse CI
```bash
# Run Lighthouse
lighthouse https://app.nutrifit.com --view

# Automated testing
lhci autorun --collect.url=https://app.nutrifit.com
```

### Performance Profiling
1. Chrome DevTools > Performance
2. Record user interaction
3. Analyze flame graph
4. Identify bottlenecks
5. Optimize critical paths

### Network Throttling
Test with:
- Fast 3G
- Slow 3G
- Offline mode

## Quick Wins Checklist

- [ ] Enable compression (Gzip/Brotli)
- [ ] Optimize images (WebP, lazy loading)
- [ ] Add service worker for caching
- [ ] Lazy load routes
- [ ] Defer non-critical JavaScript
- [ ] Preload critical fonts
- [ ] Minify CSS and JavaScript
- [ ] Use CDN for static assets
- [ ] Enable HTTP/2
- [ ] Implement code splitting
- [ ] Add performance monitoring
- [ ] Optimize third-party scripts

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [React Performance](https://react.dev/learn/render-and-commit#optimizing-performance)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
