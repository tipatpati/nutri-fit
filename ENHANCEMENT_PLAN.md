# NutriFit Enhancement & Optimization Plan
## Complete Design System Reorganization & UI/UX Refinement

**Version:** 2.0
**Date:** 2025-10-24
**Status:** 🚀 Ready for Implementation

---

## 📋 Executive Summary

This comprehensive plan addresses design system inconsistencies, enhances UI/UX crispness, and optimizes performance across the NutriFit application. The goal is to create a pixel-perfect, performant, and delightful user experience following Material Design 3 principles.

### Key Objectives
1. **Unify Design System** - Eliminate inconsistencies and consolidate token usage
2. **Enhance UI Crispness** - Micro-interactions, enhanced states, and refined aesthetics
3. **Optimize Performance** - Code splitting, lazy loading, and bundle optimization
4. **Improve Accessibility** - WCAG 2.1 AAA where possible
5. **Developer Experience** - Better tooling, documentation, and component discovery

---

## 🔍 Analysis: Current State Issues

### 1. Design System Inconsistencies

#### ❌ **Color Usage Problems**
```tsx
// Found throughout codebase - INCONSISTENT
<div className="bg-[#DE6E27]">           // ❌ Hardcoded hex
<div className="bg-md-secondary">        // ✅ Good
<div style={{ color: '#2B3210' }}>      // ❌ Inline styles
<div className="text-orange-primary">   // ⚠️  Legacy Tailwind class
```

**Impact:**
- Theme switching would be difficult
- Maintenance nightmare
- Inconsistent brand colors across app
- Can't leverage dark mode properly

#### ❌ **Spacing Inconsistencies**
```tsx
// Mixed approaches found
<div className="py-12 px-4">      // ❌ Arbitrary values
<div className="py-md-12 px-md-4"> // ✅ MD3 tokens
<div className="p-6">              // ❌ Tailwind default
```

**Impact:**
- Visual rhythm breaks down
- Responsive design suffers
- 8dp grid system not enforced

#### ❌ **Typography Chaos**
```tsx
// Multiple font declarations
font-['Space_Grotesk']              // ❌ Inline font
className="font-heading"            // ✅ Utility class
className="text-4xl font-bold"     // ❌ Direct sizing
className="md-display-large"       // ✅ MD3 scale
```

**Impact:**
- Inconsistent visual hierarchy
- Font loading issues
- Accessibility concerns

### 2. Component Quality Issues

#### ⚠️ **Missing Enhanced States**
- Hover states: Basic but could be more delightful
- Focus states: Present but not prominent enough
- Active states: Inconsistent across components
- Loading states: Basic spinners, need skeletons
- Error states: Text-only, need illustrations
- Empty states: Minimal, need better graphics

#### ⚠️ **Micro-interaction Gaps**
- Button press feedback: Could be more tactile
- Card hover effects: Present but could be smoother
- Transition timing: Some abrupt transitions
- Spring animations: Not utilized
- Haptic patterns: Not implemented

#### ⚠️ **Glassmorphism Implementation**
```css
/* Current implementation */
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
}

/* Issues: */
- Performance impact not measured
- No fallback for unsupported browsers
- Overused in some areas
- Blur intensity not optimized
```

### 3. Performance Concerns

#### ⚠️ **Bundle Size**
- No bundle analysis documentation
- All routes loaded upfront
- Heavy libraries not code-split
- Icon libraries fully imported

#### ⚠️ **Image Optimization**
- No progressive loading
- Missing lazy loading on below-fold images
- No responsive image sets
- No WebP/AVIF format support

#### ⚠️ **Re-rendering Issues**
- Some components re-render unnecessarily
- Missing memoization opportunities
- Context providers could be optimized

---

## 🎯 Enhancement Strategy

## Phase 1: Design System Consolidation (Week 1)

### 1.1 Create Unified Token System

**Goal:** Single source of truth for all design tokens

#### File Structure Reorganization
```
src/shared/design-system/
├── tokens/
│   ├── colors.ts          # All color tokens
│   ├── typography.ts      # Typography scale & fonts
│   ├── spacing.ts         # Spacing & sizing
│   ├── motion.ts          # Animation & transitions
│   ├── elevation.ts       # Shadows & depth
│   ├── shape.ts           # Border radius
│   └── index.ts           # Unified exports
├── utils/
│   ├── color-utils.ts     # Color manipulation
│   ├── spacing-utils.ts   # Spacing calculations
│   ├── motion-utils.ts    # Animation builders
│   └── index.ts
├── components/
│   ├── primitives/        # Unstyled base components
│   ├── composites/        # Styled compositions
│   └── index.ts
├── hooks/
│   ├── useTheme.ts
│   ├── useMotion.ts
│   ├── useMediaQuery.ts
│   └── index.ts
├── constants/
│   ├── breakpoints.ts
│   ├── z-index.ts
│   └── index.ts
└── index.ts               # Main export
```

#### Enhanced Color Token System
```typescript
// src/shared/design-system/tokens/colors.ts
export const colorTokens = {
  // Semantic color roles
  brand: {
    primary: {
      main: 'var(--brand-primary)',           // #2B3210 (Deep Olive)
      light: 'var(--brand-primary-light)',
      dark: 'var(--brand-primary-dark)',
      contrast: 'var(--brand-primary-contrast)',
    },
    secondary: {
      main: 'var(--brand-secondary)',         // #DE6E27 (Burnt Orange)
      light: 'var(--brand-secondary-light)',
      dark: 'var(--brand-secondary-dark)',
      contrast: 'var(--brand-secondary-contrast)',
    },
    accent: {
      main: 'var(--brand-accent)',            // #505631 (Sage Green)
      light: 'var(--brand-accent-light)',
      dark: 'var(--brand-accent-dark)',
      contrast: 'var(--brand-accent-contrast)',
    },
  },

  // Functional colors
  functional: {
    success: { main: 'var(--color-success)', light: '...', dark: '...' },
    warning: { main: 'var(--color-warning)', light: '...', dark: '...' },
    error: { main: 'var(--color-error)', light: '...', dark: '...' },
    info: { main: 'var(--color-info)', light: '...', dark: '...' },
  },

  // Nutritional category colors (semantic)
  nutrition: {
    balanced: 'var(--nutrition-balanced)',    // Yellow/Gold
    weightLoss: 'var(--nutrition-weight-loss)', // Green
    muscleGain: 'var(--nutrition-muscle-gain)', // Orange
  },

  // State colors
  state: {
    hover: 'var(--state-hover)',
    active: 'var(--state-active)',
    focus: 'var(--state-focus)',
    disabled: 'var(--state-disabled)',
  },
} as const;

// Type-safe color accessor
export type ColorPath =
  | `brand.${keyof typeof colorTokens.brand}.${string}`
  | `functional.${keyof typeof colorTokens.functional}.${string}`;

export const getColor = (path: ColorPath): string => {
  // Implementation with type safety
};
```

#### Enhanced Typography System
```typescript
// src/shared/design-system/tokens/typography.ts
export const typographyScale = {
  // Material Design 3 Type Scale
  display: {
    large: {
      fontSize: '57px',
      lineHeight: '64px',
      letterSpacing: '-0.25px',
      fontWeight: 400,
      fontFamily: 'var(--font-heading)',
      mobile: { fontSize: '36px', lineHeight: '40px' },
    },
    medium: {
      fontSize: '45px',
      lineHeight: '52px',
      letterSpacing: '0px',
      fontWeight: 400,
      fontFamily: 'var(--font-heading)',
      mobile: { fontSize: '32px', lineHeight: '36px' },
    },
    small: {
      fontSize: '36px',
      lineHeight: '44px',
      letterSpacing: '0px',
      fontWeight: 400,
      fontFamily: 'var(--font-heading)',
      mobile: { fontSize: '28px', lineHeight: '32px' },
    },
  },
  // ... rest of scales
} as const;

// Font loading strategy
export const fontConfig = {
  heading: {
    family: 'Outfit',
    weights: [400, 500, 600, 700],
    display: 'swap',
    preload: true,
  },
  body: {
    family: 'Inter',
    weights: [400, 500, 600],
    display: 'swap',
    preload: true,
  },
  script: {
    family: 'Caveat',
    weights: [400, 700],
    display: 'swap',
    preload: false, // Load on-demand
  },
};
```

#### Enhanced Motion System
```typescript
// src/shared/design-system/tokens/motion.ts
export const motionTokens = {
  // Material Design 3 Easing Functions
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
    decelerated: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
    accelerated: 'cubic-bezier(0.3, 0, 0.8, 0.15)',

    // Spring-based (for Framer Motion)
    spring: {
      gentle: { type: 'spring', stiffness: 120, damping: 14 },
      bouncy: { type: 'spring', stiffness: 300, damping: 20 },
      snappy: { type: 'spring', stiffness: 400, damping: 30 },
    },
  },

  // Duration tokens
  duration: {
    instant: '50ms',    // Immediate feedback
    fast: '100ms',      // Quick transitions
    normal: '200ms',    // Standard
    slow: '300ms',      // Emphasis
    slower: '500ms',    // Major changes
  },

  // Preset transitions
  presets: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
    },
    slideUp: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    scale: {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
    },
    // ... more presets
  },
} as const;
```

### 1.2 Component Primitive System

Create unstyled, accessible base components:

```typescript
// src/shared/design-system/components/primitives/Button.tsx
interface ButtonPrimitiveProps {
  variant?: 'filled' | 'outlined' | 'text' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'hover' | 'active' | 'disabled';
  // ... props
}

// Fully typed, accessible, unstyled
export const ButtonPrimitive = forwardRef<HTMLButtonElement, ButtonPrimitiveProps>(
  ({ variant = 'filled', size = 'md', ...props }, ref) => {
    // Accessibility built-in
    // Focus management
    // Keyboard handling
    // No styling - just behavior
  }
);
```

### 1.3 Tailwind Configuration Cleanup

```typescript
// tailwind.config.ts - CLEANED UP
export default {
  theme: {
    extend: {
      // Only semantic color references
      colors: {
        brand: {
          primary: 'hsl(var(--brand-primary))',
          secondary: 'hsl(var(--brand-secondary))',
          // ... all via CSS vars
        },
      },
      // Only MD3 spacing
      spacing: {
        // Remove arbitrary values, enforce 8dp grid
      },
      // Only MD3 typography
      fontSize: {
        // Remove custom sizes, use MD3 scale
      },
    },
  },
} satisfies Config;
```

---

## Phase 2: UI/UX Crispness Enhancement (Week 2)

### 2.1 Enhanced Interactive States

#### Micro-interactions Library
```typescript
// src/shared/design-system/utils/micro-interactions.ts

export const microInteractions = {
  // Button interactions
  button: {
    press: {
      scale: 0.96,
      duration: 100,
      easing: 'easeOut',
    },
    release: {
      scale: 1,
      duration: 150,
      easing: 'spring',
    },
    ripple: {
      // Material ripple effect
      duration: 600,
      easing: 'easeOut',
    },
  },

  // Card interactions
  card: {
    hover: {
      y: -4,
      scale: 1.01,
      shadow: 'elevated',
      duration: 200,
    },
    tap: {
      scale: 0.99,
      duration: 100,
    },
  },

  // Input interactions
  input: {
    focus: {
      borderWidth: 2,
      borderColor: 'brand.secondary',
      scale: 1.01,
    },
  },
} as const;
```

#### Enhanced Button Component
```typescript
// src/components/ui/enhanced-button.tsx
import { motion } from 'framer-motion';
import { microInteractions } from '@/shared/design-system/utils/micro-interactions';

export const EnhancedButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'filled', size = 'md', ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          // Use only design tokens
          'relative overflow-hidden',
          'transition-colors duration-200',
          'focus-visible:ring-2 focus-visible:ring-offset-2',
          variantStyles[variant],
          sizeStyles[size],
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {/* Ripple effect layer */}
        <span className="absolute inset-0 overflow-hidden">
          <span className="ripple" />
        </span>

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </motion.button>
    );
  }
);
```

### 2.2 Enhanced Card System

```typescript
// src/components/ui/enhanced-card.tsx
import { motion } from 'framer-motion';

interface EnhancedCardProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  interactive?: boolean;
  glowOnHover?: boolean;
  children: React.ReactNode;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  variant = 'elevated',
  interactive = false,
  glowOnHover = false,
  children,
}) => {
  return (
    <motion.div
      className={cn(
        'rounded-md-lg overflow-hidden',
        'transition-all duration-300',
        variantStyles[variant],
        interactive && 'cursor-pointer',
      )}
      whileHover={interactive ? {
        y: -4,
        scale: 1.01,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      } : undefined}
      whileTap={interactive ? { scale: 0.99 } : undefined}
    >
      {/* Glow effect on hover */}
      {glowOnHover && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary/20 to-brand-primary/20 blur-xl" />
        </div>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
```

### 2.3 Loading States & Skeletons

```typescript
// src/components/ui/skeleton.tsx
export const Skeleton = {
  // Text skeleton
  Text: ({ lines = 1, className }: { lines?: number; className?: string }) => (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-md-surface-variant rounded animate-pulse"
          style={{ width: `${100 - (i * 10)}%` }}
        />
      ))}
    </div>
  ),

  // Card skeleton
  Card: () => (
    <div className="glass-card p-md-6 animate-pulse space-y-4">
      <div className="h-48 bg-md-surface-variant rounded-md-lg" />
      <div className="space-y-2">
        <div className="h-6 bg-md-surface-variant rounded w-3/4" />
        <div className="h-4 bg-md-surface-variant rounded w-1/2" />
      </div>
    </div>
  ),

  // Meal card skeleton (specific)
  MealCard: () => (
    <div className="glass-card overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-56 bg-gradient-to-br from-md-surface-variant to-md-surface-container-high relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <UtensilsCrossed className="w-16 h-16 text-md-outline-variant animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="p-md-6 space-y-4">
        <div className="h-7 bg-md-surface-variant rounded-md-sm w-4/5" />
        <div className="h-4 bg-md-surface-variant rounded-md-sm w-2/3" />

        {/* Nutrition badges */}
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-md-surface-variant rounded-md-full" />
          <div className="h-8 w-20 bg-md-surface-variant rounded-md-full" />
          <div className="h-8 w-20 bg-md-surface-variant rounded-md-full" />
        </div>

        {/* Button */}
        <div className="h-12 bg-md-surface-variant rounded-md-lg" />
      </div>
    </div>
  ),
};
```

### 2.4 Empty States

```typescript
// src/components/ui/empty-state.tsx
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  illustration?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  illustration,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-md-3xl p-md-12 text-center max-w-md mx-auto"
    >
      {/* Illustration or Icon */}
      {illustration ? (
        <div className="mb-md-6">{illustration}</div>
      ) : (
        <div className="w-20 h-20 mx-auto mb-md-6 rounded-md-full bg-gradient-to-br from-brand-secondary/20 to-brand-primary/20 flex items-center justify-center">
          <Icon className="w-10 h-10 text-brand-secondary" />
        </div>
      )}

      {/* Content */}
      <h3 className="md-title-large text-md-on-surface mb-md-2">
        {title}
      </h3>
      <p className="md-body-medium text-md-on-surface-variant mb-md-6">
        {description}
      </p>

      {/* Action */}
      {action && (
        <EnhancedButton
          variant="filled"
          onClick={action.onClick}
        >
          {action.label}
        </EnhancedButton>
      )}
    </motion.div>
  );
};
```

### 2.5 Error States

```typescript
// src/components/ui/error-state.tsx
export const ErrorState: React.FC<{
  error: Error;
  reset?: () => void;
}> = ({ error, reset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card bg-md-error-container/50 rounded-md-lg p-md-8 max-w-lg mx-auto"
    >
      <div className="flex items-start gap-4">
        {/* Error icon */}
        <div className="shrink-0 w-12 h-12 rounded-md-full bg-md-error flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-md-on-error" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="md-title-medium text-md-on-error-container mb-2">
            Une erreur s'est produite
          </h3>
          <p className="md-body-small text-md-on-error-container/80 mb-4">
            {error.message || "Quelque chose s'est mal passé"}
          </p>

          {reset && (
            <EnhancedButton
              variant="outlined"
              size="sm"
              onClick={reset}
            >
              Réessayer
            </EnhancedButton>
          )}
        </div>
      </div>
    </motion.div>
  );
};
```

---

## Phase 3: Performance Optimization (Week 3)

### 3.1 Code Splitting Strategy

```typescript
// src/App.tsx - Enhanced with code splitting
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

// Immediate load (critical path)
import Index from './pages/Index';
import Auth from './pages/Auth';

// Lazy load (code split)
const Menu = lazy(() => import('./pages/Menu'));
const Order = lazy(() => import('./pages/Order'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Profile = lazy(() => import('./pages/Profile'));

// Admin routes (separate chunk)
const AdminRoutes = lazy(() => import('./routes/AdminRoutes'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-md-surface p-md-6">
    <Skeleton.Card />
  </div>
);

export const App = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Immediate */}
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />

      {/* Code split */}
      <Route path="/menu" element={<Menu />} />
      <Route path="/order" element={<Order />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<Profile />} />

      {/* Admin chunk */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  </Suspense>
);
```

### 3.2 Image Optimization

```typescript
// src/components/ui/optimized-image.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>();

  useEffect(() => {
    // Load low-quality placeholder first
    const img = new Image();
    const placeholder = src.replace(/\.(jpg|jpeg|png)$/, '-thumb.$1');

    img.src = placeholder;
    img.onload = () => {
      setCurrentSrc(placeholder);

      // Then load full quality
      const fullImg = new Image();
      fullImg.src = src;
      fullImg.onload = () => {
        setCurrentSrc(src);
        setIsLoaded(true);
      };
    };
  }, [src]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Placeholder blur */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-md-surface-variant animate-pulse" />
      )}

      {/* Image */}
      <motion.img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        className={cn(
          'w-full h-full object-cover',
          !isLoaded && 'blur-lg scale-105',
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};
```

### 3.3 Virtual Scrolling for Long Lists

```typescript
// src/components/ui/virtual-list.tsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

interface VirtualListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  estimatedItemHeight: number;
}

export function VirtualList<T>({
  items,
  renderItem,
  estimatedItemHeight,
}: VirtualListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedItemHeight,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="h-full overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(items[virtualItem.index], virtualItem.index)}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3.4 Bundle Analysis & Optimization

```json
// package.json - Add bundle analysis
{
  "scripts": {
    "analyze": "vite-bundle-visualizer",
    "build:analyze": "vite build && npm run analyze"
  },
  "devDependencies": {
    "vite-bundle-visualizer": "^1.0.0",
    "rollup-plugin-visualizer": "^5.12.0"
  }
}
```

---

## Phase 4: Accessibility Enhancements (Week 4)

### 4.1 Enhanced Focus Management

```typescript
// src/shared/design-system/utils/focus-management.ts

export const focusStyles = {
  // High contrast focus ring
  ring: cn(
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-brand-secondary',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-offset-md-surface',
  ),

  // Enhanced for dark backgrounds
  ringLight: cn(
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-white',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-offset-brand-primary',
  ),

  // Subtle for cards
  cardFocus: cn(
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-brand-secondary/50',
    'focus-visible:ring-offset-0',
  ),
};

// Focus trap for modals
export const useFocusTrap = (isActive: boolean) => {
  // Implementation
};
```

### 4.2 Screen Reader Enhancements

```typescript
// src/components/ui/sr-only.tsx
export const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <span className="sr-only">{children}</span>
);

// Live region announcer
export const LiveRegion: React.FC<{
  message: string;
  type?: 'polite' | 'assertive';
}> = ({ message, type = 'polite' }) => (
  <div
    role="status"
    aria-live={type}
    aria-atomic="true"
    className="sr-only"
  >
    {message}
  </div>
);
```

---

## Phase 5: Developer Experience (Week 5)

### 5.1 Component Documentation System

```typescript
// src/shared/design-system/docs/ComponentDoc.tsx
interface ComponentDocProps {
  name: string;
  description: string;
  examples: {
    title: string;
    code: string;
    component: React.ReactNode;
  }[];
  props?: Record<string, {
    type: string;
    default?: string;
    description: string;
  }>;
}

export const ComponentDoc: React.FC<ComponentDocProps> = ({
  name,
  description,
  examples,
  props,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="md-display-medium text-md-on-surface mb-4">
          {name}
        </h1>
        <p className="md-body-large text-md-on-surface-variant">
          {description}
        </p>
      </div>

      {/* Props table */}
      {props && (
        <PropsTable props={props} />
      )}

      {/* Examples */}
      {examples.map((example, i) => (
        <ExampleSection key={i} {...example} />
      ))}
    </div>
  );
};
```

### 5.2 Storybook Setup

```typescript
// .storybook/main.ts
export default {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react-vite',
};

// Example story
// src/components/ui/enhanced-button.stories.tsx
export default {
  title: 'UI/EnhancedButton',
  component: EnhancedButton,
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text', 'elevated'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export const Filled = {
  args: {
    children: 'Filled Button',
    variant: 'filled',
  },
};

export const AllVariants = () => (
  <div className="flex gap-4">
    <EnhancedButton variant="filled">Filled</EnhancedButton>
    <EnhancedButton variant="outlined">Outlined</EnhancedButton>
    <EnhancedButton variant="text">Text</EnhancedButton>
    <EnhancedButton variant="elevated">Elevated</EnhancedButton>
  </div>
);
```

---

## 📊 Success Metrics

### Performance Targets
- **Lighthouse Score:** >95 (currently ~85)
- **First Contentful Paint:** <1.5s (currently ~2s)
- **Time to Interactive:** <3s (currently ~4s)
- **Bundle Size:** <500KB gzipped (currently ~650KB)

### Quality Metrics
- **Accessibility:** WCAG 2.1 AAA where possible
- **Design System Adoption:** 100% components using tokens
- **Test Coverage:** >80%
- **Type Safety:** Zero `any` types

### User Experience
- **Animation Frame Rate:** Consistent 60fps
- **Touch Target Size:** All interactive elements ≥48x48px
- **Color Contrast:** All text ≥4.5:1 (AA), aim for ≥7:1 (AAA)

---

## 🚀 Implementation Roadmap

### Week 1: Foundation
- [ ] Reorganize design system structure
- [ ] Create unified token system
- [ ] Update Tailwind configuration
- [ ] Audit and fix color inconsistencies
- [ ] Document new token usage

### Week 2: UI Enhancement
- [ ] Implement enhanced button component
- [ ] Create card system with micro-interactions
- [ ] Build skeleton loader components
- [ ] Design empty/error state components
- [ ] Add glassmorphism performance optimizations

### Week 3: Performance
- [ ] Implement code splitting
- [ ] Add image optimization
- [ ] Set up bundle analysis
- [ ] Implement virtual scrolling where needed
- [ ] Optimize re-renders

### Week 4: Accessibility
- [ ] Enhanced focus management
- [ ] Screen reader optimizations
- [ ] Keyboard navigation audit
- [ ] ARIA labels audit
- [ ] Color contrast fixes

### Week 5: Developer Experience
- [ ] Set up Storybook
- [ ] Write component documentation
- [ ] Create usage examples
- [ ] Build design system showcase
- [ ] Write migration guide

---

## 📝 Migration Guide

### For Existing Components

#### Step 1: Update Color Usage
```tsx
// ❌ Before
<div className="bg-[#DE6E27] text-white">

// ✅ After
<div className="bg-brand-secondary text-brand-secondary-contrast">
```

#### Step 2: Update Spacing
```tsx
// ❌ Before
<div className="py-12 px-4">

// ✅ After
<div className="py-md-12 px-md-4">
```

#### Step 3: Update Typography
```tsx
// ❌ Before
<h1 className="text-4xl font-bold font-['Space_Grotesk']">

// ✅ After
<h1 className="md-display-medium font-heading">
```

#### Step 4: Add Enhanced Interactions
```tsx
// ❌ Before
<button className="bg-orange-500 hover:bg-orange-600">

// ✅ After
<EnhancedButton variant="filled">
```

---

## 🔧 Tools & Resources

### Development Tools
- **Storybook** - Component development & documentation
- **Vite Bundle Visualizer** - Bundle analysis
- **axe DevTools** - Accessibility testing
- **Lighthouse** - Performance auditing

### Design Tools
- **Figma Material Design Kit** - Design reference
- **Contrast Checker** - WCAG compliance
- **Color Palette Generator** - Theme variations

### Documentation
- [Material Design 3 Guidelines](https://m3.material.io/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Vitals](https://web.dev/vitals/)

---

## ✅ Checklist for "Super Crisp" UI

### Visual Polish
- [ ] All colors use design tokens (no hardcoded values)
- [ ] Consistent spacing using 8dp grid
- [ ] Typography follows MD3 scale
- [ ] All borders use shape tokens
- [ ] Shadows use elevation system

### Interactions
- [ ] Smooth hover states (200-300ms)
- [ ] Tactile press feedback (scale/shadow)
- [ ] Loading states for all async operations
- [ ] Empty states for all lists/grids
- [ ] Error states with recovery actions
- [ ] Success feedback (toasts/animations)

### Performance
- [ ] No layout shift (CLS < 0.1)
- [ ] Fast interaction feedback (<100ms)
- [ ] Smooth animations (60fps)
- [ ] Progressive image loading
- [ ] Code splitting implemented

### Accessibility
- [ ] Keyboard navigation works everywhere
- [ ] Focus indicators highly visible
- [ ] Screen reader friendly
- [ ] Touch targets ≥48x48px
- [ ] Color contrast WCAG AA minimum

### Consistency
- [ ] All buttons use same component
- [ ] All cards use same system
- [ ] All inputs follow same pattern
- [ ] All animations use same timing
- [ ] All icons from same library

---

**This plan transforms NutriFit into a pixel-perfect, performant, and delightful application with a rock-solid design system foundation.**
