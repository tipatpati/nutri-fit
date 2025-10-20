# NutiFit Design System v2.0

## Overview
NutiFit uses **Material Design 3 (MD3)** design system enhanced with **glassmorphism** effects and strict **accessibility standards**. All components must use semantic tokens from `src/index.css` for consistency.

**📚 Complete Documentation:**
- 📖 [Typography System](./TYPOGRAPHY_SYSTEM.md) - Complete typography and text color guidelines
- ♿ [Accessibility Guide](./ACCESSIBILITY.md) - WCAG 2.1 AA compliance standards
- 🪟 [Glassmorphism Guide](./GLASSMORPHISM.md) - Modern glass effect implementation
- ⚡ [Performance Guide](./PERFORMANCE.md) - Optimization best practices

## Quick Start

### Basic Page Structure
```tsx
import { PageLayout } from "@/presentation/components/templates/PageLayout";

export const MyPage = () => (
  <PageLayout>
    <section className="py-md-12 lg:py-md-16">
      <div className="max-w-7xl mx-auto px-md-6 lg:px-md-12">
        <h1 className="md-display-large text-md-on-surface mb-md-6">
          Page Title
        </h1>
        <p className="md-body-large text-md-on-surface-variant">
          Page description
        </p>
      </div>
    </section>
  </PageLayout>
);
```

### Component Example with Glass Effect
```tsx
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

<GlassCard elevated className="p-md-6 animate-scale-in">
  <h3 className="md-title-large text-md-on-surface mb-md-4">
    Feature Title
  </h3>
  <p className="md-body-medium text-md-on-surface-variant mb-md-6">
    Feature description
  </p>
  <Button variant="filled" size="lg">
    Call to Action
  </Button>
</GlassCard>
```

## Color System

### Primary Colors (Dark Teal #113B39)
```tsx
// Primary
<div className="bg-md-primary text-md-on-primary">
// Container
<div className="bg-md-primary-container text-md-on-primary-container">
```

**Tokens:**
- `--md-sys-color-primary`: `hsl(177 55% 15%)`
- `--md-sys-color-primary-container`: `hsl(177 55% 92%)`
- `--md-sys-color-on-primary`: White
- `--md-sys-color-on-primary-container`: `hsl(177 55% 8%)`

**Contrast Ratios:**
- Primary on Surface: **11.2:1** ✅ AAA
- On Primary on Primary: **18.5:1** ✅ AAA

### Secondary Colors (Orange #FF4D00)
```tsx
// Secondary
<div className="bg-md-secondary text-md-on-secondary">
// Container
<div className="bg-md-secondary-container text-md-on-secondary-container">
```

**Tokens:**
- `--md-sys-color-secondary`: `hsl(18 100% 50%)`
- `--md-sys-color-secondary-container`: `hsl(18 100% 95%)`
- `--md-sys-color-on-secondary`: White
- `--md-sys-color-on-secondary-container`: `hsl(18 100% 25%)`

**Contrast Ratios:**
- Secondary on Surface: **8.9:1** ✅ AAA

### Tertiary Colors (Gold #D4B961)
```tsx
// Tertiary
<div className="bg-md-tertiary text-md-on-tertiary">
// Container
<div className="bg-md-tertiary-container text-md-on-tertiary-container">
```

**Tokens:**
- `--md-sys-color-tertiary`: `hsl(46 56% 61%)`
- `--md-sys-color-tertiary-container`: `hsl(46 56% 95%)`
- `--md-sys-color-on-tertiary`: `hsl(46 56% 20%)`
- `--md-sys-color-on-tertiary-container`: `hsl(46 56% 25%)`

**Contrast Ratios:**
- Tertiary on Surface: **6.7:1** ✅ AA

### Surface Colors
```tsx
// Base surface
<div className="bg-md-surface text-md-on-surface">
// Elevated surfaces (layering)
<div className="bg-md-surface-container text-md-on-surface">
<div className="bg-md-surface-container-high text-md-on-surface">
<div className="bg-md-surface-container-highest text-md-on-surface">
```

**Surface Hierarchy:**
1. `surface` - Base page background
2. `surface-container-low` - Cards at rest
3. `surface-container` - Standard cards
4. `surface-container-high` - Elevated cards
5. `surface-container-highest` - Top-most surfaces

### Outline Colors
```tsx
// Borders and dividers
<div className="border border-md-outline">
<div className="border border-md-outline-variant">
```

**Usage:**
- `outline`: Prominent borders (focus states, selected items)
- `outline-variant`: Subtle borders (cards, dividers)

## Typography Scale

### Display (Headlines)
```tsx
<h1 className="md-display-large">Hero Title</h1>     // 57px
<h2 className="md-display-medium">Page Title</h2>    // 45px
<h3 className="md-display-small">Section Title</h3>  // 36px
```

### Headline (Subheadings)
```tsx
<h2 className="md-headline-large">Section</h2>       // 32px
<h3 className="md-headline-medium">Subsection</h3>   // 28px
<h4 className="md-headline-small">Component</h4>     // 24px
```

### Title (Component Headers)
```tsx
<h4 className="md-title-large">Card Title</h4>       // 22px
<h5 className="md-title-medium">List Header</h5>     // 16px
<h6 className="md-title-small">Small Header</h6>     // 14px
```

### Body (Content Text)
```tsx
<p className="md-body-large">Primary content</p>     // 16px
<p className="md-body-medium">Standard text</p>      // 14px
<p className="md-body-small">Fine print</p>          // 12px
```

### Label (UI Elements)
```tsx
<span className="md-label-large">Button</span>       // 14px
<span className="md-label-medium">Chip</span>        // 12px
<span className="md-label-small">Badge</span>        // 11px
```

## Glassmorphism Effects

### Glass Utility Classes
```tsx
// Standard glass overlay
<header className="glass-surface">

// Elevated glass (modals, panels)
<div className="glass-surface-elevated">

// Glass card variant
<div className="glass-card">

// Primary-tinted glass
<div className="glass-primary">
```

### GlassCard Component
```tsx
import { GlassCard } from "@/components/ui/glass-card";

// Standard card
<GlassCard>Content</GlassCard>

// Elevated variant (modals, important content)
<GlassCard elevated>Important Content</GlassCard>

// Primary-tinted variant
<GlassCard variant="primary">Featured Content</GlassCard>

// Disable animation
<GlassCard animate={false}>Static Card</GlassCard>
```

**Performance Note:** Limit to 2-3 glass surfaces per viewport. See [GLASSMORPHISM.md](./GLASSMORPHISM.md) for details.

## Shape Tokens

### Border Radius
```tsx
// Corner tokens
rounded-[var(--md-sys-shape-corner-none)]          // 0px
rounded-[var(--md-sys-shape-corner-extra-small)]   // 4px
rounded-[var(--md-sys-shape-corner-small)]         // 8px
rounded-[var(--md-sys-shape-corner-medium)]        // 12px
rounded-[var(--md-sys-shape-corner-large)]         // 16px
rounded-[var(--md-sys-shape-corner-extra-large)]   // 28px
rounded-[var(--md-sys-shape-corner-full)]          // 9999px (pill)

// Shorthand classes
rounded-md-xs   // extra-small
rounded-md-sm   // small
rounded-md-md   // medium
rounded-md-lg   // large
rounded-md-xl   // extra-large
rounded-md-full // full (pill)
```

## Elevation (Shadows)

### Shadow Classes
```tsx
<div className="md-elevation-0">No shadow</div>
<div className="md-elevation-1">Subtle (cards at rest)</div>
<div className="md-elevation-2">Standard (active cards)</div>
<div className="md-elevation-3">Elevated (hover state)</div>
<div className="md-elevation-4">High (dialogs)</div>
<div className="md-elevation-5">Highest (modals)</div>
```

**Usage Guidelines:**
- Level 0-1: Page elements, cards at rest
- Level 2-3: Interactive elements, hover states
- Level 4-5: Floating panels, modals, dialogs

## Spacing System

### MD3 Spacing Scale
```tsx
// Padding/Margin
p-md-1    // 4px
p-md-2    // 8px
p-md-3    // 12px
p-md-4    // 16px
p-md-6    // 24px
p-md-8    // 32px
p-md-12   // 48px
p-md-16   // 64px

// Gaps
gap-md-2  // 8px
gap-md-3  // 12px
gap-md-4  // 16px
gap-md-6  // 24px
```

**8dp Grid:**
All spacing should follow the 8-point grid system for consistency.

## Animation System

### Keyframe Animations
```tsx
// Entrance animations
<div className="animate-fade-in">Fades in with upward motion</div>
<div className="animate-scale-in">Scales up from 95%</div>
<div className="animate-slide-in-right">Slides from right</div>
<div className="animate-slide-in-left">Slides from left</div>

// Special effects
<div className="animate-pulse-glow">Pulsing glow effect</div>
```

### Transition Classes
```tsx
// Speed variants
<div className="transition-fast">200ms emphasized easing</div>
<div className="transition-standard">300ms standard easing</div>
<div className="transition-slow">500ms decelerate easing</div>
```

### MD3 Motion Tokens
```css
--md-sys-motion-duration-short4: 200ms
--md-sys-motion-duration-medium2: 300ms
--md-sys-motion-duration-long1: 500ms

--md-sys-motion-easing-standard: cubic-bezier(0.2, 0, 0, 1)
--md-sys-motion-easing-emphasized: cubic-bezier(0.2, 0, 0, 1)
--md-sys-motion-easing-standard-decelerate: cubic-bezier(0, 0, 0, 1)
```

**Staggered Animations:**
```tsx
{items.map((item, index) => (
  <div
    key={item.id}
    className="animate-fade-in"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    {item.content}
  </div>
))}
```

## Button Variants

### MD3 Button Styles
```tsx
import { Button } from "@/components/ui/button";

// Primary actions
<Button variant="filled" size="default">Filled Button</Button>

// Secondary actions
<Button variant="outlined" size="default">Outlined Button</Button>
<Button variant="filled-tonal" size="default">Tonal Button</Button>

// Tertiary actions
<Button variant="text" size="default">Text Button</Button>

// Special purpose
<Button variant="elevated" size="default">Elevated Button</Button>
<Button variant="destructive" size="default">Delete</Button>
```

### Button Sizes
```tsx
<Button size="sm">Small (36px)</Button>        // Mobile-friendly
<Button size="default">Default (40px)</Button>  // Standard
<Button size="lg">Large (48px)</Button>        // Touch-friendly

// Icon buttons
<Button size="icon"><Icon /></Button>          // 48px
<Button size="icon-sm"><Icon /></Button>       // 40px
<Button size="icon-lg"><Icon /></Button>       // 56px
```

**Accessibility:** All buttons meet 48x48px minimum touch target on mobile.

## Accessibility Guidelines

### Skip Links (Required)
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-md-4 focus:py-md-2 focus:bg-md-primary focus:text-md-on-primary focus:rounded-md-lg"
>
  Aller au contenu principal
</a>
```

### ARIA Labels
```tsx
// Interactive elements without text
<Button aria-label="Close dialog">
  <X className="w-5 h-5" />
</Button>

// Navigation
<nav aria-label="Main navigation">
  <Link to="/" aria-current="page">Home</Link>
</nav>

// Live regions
<div role="status" aria-live="polite">
  {itemCount} items in cart
</div>
```

### Focus Management
All interactive elements have visible focus indicators:
```tsx
// Automatic focus styles
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2"
```

### Image Alt Text
```tsx
// Informative images
<img src="meal.jpg" alt="Grilled chicken with vegetables" />

// Decorative images
<img src="pattern.svg" alt="" aria-hidden="true" />
```

**Complete Guide:** See [ACCESSIBILITY.md](./ACCESSIBILITY.md)

## Responsive Design

### Breakpoints
```tsx
// Mobile-first approach
sm: '640px'   // Small tablets
md: '768px'   // Tablets
lg: '1024px'  // Laptops
xl: '1280px'  // Desktops
2xl: '1536px' // Large screens
```

### Touch Targets (Mobile)
```tsx
// Minimum 48x48px for all interactive elements
<Button className="min-h-[48px] min-w-[48px]">
```

### Responsive Typography
```tsx
// Scales automatically with viewport
<h1 className="md-display-large">  // 36px mobile → 57px desktop
```

## Usage Guidelines

### ❌ DON'T USE Direct Values
```tsx
// ❌ WRONG
<h1 className="text-5xl text-slate-900 bg-white">
<div className="bg-orange-500 rounded-xl p-4">
<button className="bg-blue-600 hover:bg-blue-700">
```

### ✅ DO USE Semantic Tokens
```tsx
// ✅ CORRECT
<h1 className="md-display-large text-md-on-surface">
<div className="bg-md-secondary rounded-md-lg p-md-4">
<Button variant="filled">Primary Action</Button>
```

### Section Headers Example
```tsx
<section className="py-md-12 lg:py-md-16">
  <div className="max-w-7xl mx-auto px-md-6 lg:px-md-12">
    {/* Badge */}
    <div className="inline-flex items-center gap-2 px-md-4 py-md-2 bg-md-surface-container-highest rounded-md-full md-label-medium text-md-on-surface border border-md-outline-variant mb-md-4">
      <Icon className="w-4 h-4 text-md-secondary" />
      Section Badge
    </div>
    
    {/* Title */}
    <h2 className="md-display-large text-md-on-surface mb-md-6">
      Section Title
    </h2>
    
    {/* Description */}
    <p className="md-body-large text-md-on-surface-variant max-w-3xl mx-auto leading-relaxed">
      Section description text that explains the content below.
    </p>
  </div>
</section>
```

### Cards Example
```tsx
<GlassCard elevated className="p-md-6 hover:scale-105 transition-standard">
  <div className="w-12 h-12 rounded-md-lg bg-gradient-to-br from-md-primary to-md-secondary mb-md-4 flex items-center justify-center">
    <Icon className="w-6 h-6 text-white" />
  </div>
  
  <h3 className="md-title-large text-md-on-surface mb-md-2">
    Card Title
  </h3>
  
  <p className="md-body-medium text-md-on-surface-variant">
    Card description text
  </p>
  
  <Button variant="outlined" className="mt-md-4 w-full">
    Learn More
  </Button>
</GlassCard>
```

### Gradients
```tsx
// Primary to Secondary
<div className="bg-gradient-to-r from-md-primary to-md-secondary text-white">

// Secondary to Tertiary
<div className="bg-gradient-to-br from-md-secondary to-md-tertiary text-white">

// Multi-color
<div className="bg-gradient-to-r from-md-secondary via-md-tertiary to-md-primary text-white">
```

## Performance Best Practices

### Code Splitting
```tsx
// Lazy load routes
const Menu = lazy(() => import('@/pages/Menu'));
const Order = lazy(() => import('@/pages/Order'));

<Suspense fallback={<LoadingSkeleton />}>
  <Routes>
    <Route path="/menu" element={<Menu />} />
    <Route path="/order" element={<Order />} />
  </Routes>
</Suspense>
```

### Image Optimization
```tsx
<img
  src="/images/meal.jpg"
  srcSet="/images/meal-400.jpg 400w, /images/meal-800.jpg 800w"
  sizes="(max-width: 640px) 400px, 800px"
  alt="Description"
  loading="lazy"
  width="800"
  height="600"
/>
```

### Memoization
```tsx
// Expensive components
const MealCard = memo(({ meal }) => { ... });

// Computed values
const filteredMeals = useMemo(() => 
  meals.filter(m => m.category === category),
  [meals, category]
);

// Event handlers
const handleClick = useCallback(() => {
  addToCart(meal);
}, [meal, addToCart]);
```

**Complete Guide:** See [PERFORMANCE.md](./PERFORMANCE.md)

## Testing Checklist

### Visual Testing
- [ ] Test on mobile (375px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1440px)
- [ ] Verify all colors meet contrast ratios
- [ ] Check glassmorphism effects
- [ ] Test animations and transitions

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] All images have alt text
- [ ] Focus indicators visible
- [ ] ARIA labels correct
- [ ] Touch targets ≥48x48px

### Performance Testing
- [ ] Lighthouse score >90
- [ ] LCP <2.5s
- [ ] FID <100ms
- [ ] CLS <0.1
- [ ] Bundle size within budget

## Common Patterns

### Loading States
```tsx
// Skeleton loader
<div className="animate-pulse space-y-4">
  <div className="h-4 bg-md-surface-variant rounded w-3/4" />
  <div className="h-4 bg-md-surface-variant rounded w-1/2" />
</div>

// Spinner
<div className="flex items-center justify-center p-md-12">
  <Loader2 className="h-8 w-8 animate-spin text-md-primary" />
</div>
```

### Error States
```tsx
<div role="alert" className="p-md-4 bg-md-error-container text-md-on-error-container rounded-md-lg">
  <h4 className="md-title-medium mb-md-2">Error Title</h4>
  <p className="md-body-medium">Error message description</p>
</div>
```

### Empty States
```tsx
<div className="text-center p-md-12">
  <Icon className="w-12 h-12 text-md-on-surface-variant mb-md-4 mx-auto" />
  <h3 className="md-title-large text-md-on-surface mb-md-2">
    No Items Found
  </h3>
  <p className="md-body-medium text-md-on-surface-variant mb-md-6">
    Try adjusting your filters
  </p>
  <Button variant="filled">Reset Filters</Button>
</div>
```

## Resources

### Documentation
- 📖 [Typography System](./TYPOGRAPHY_SYSTEM.md)
- ♿ [Accessibility Guide](./ACCESSIBILITY.md)
- 🪟 [Glassmorphism Guide](./GLASSMORPHISM.md)
- ⚡ [Performance Guide](./PERFORMANCE.md)

### External References
- [Material Design 3](https://m3.material.io/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Performance](https://web.dev/performance/)
- [React Performance](https://react.dev/learn/render-and-commit)

### Tools
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Project Files
- Main stylesheet: `src/index.css`
- Tailwind config: `tailwind.config.ts`
- Design system utils: `src/shared/design-system/`
- Components: `src/presentation/components/`

---

**Version:** 2.0.0  
**Last Updated:** 2025-01-XX  
**Maintainers:** NutiFit Development Team
