# Glassmorphism Design Guide - NutiFit

## Overview
Glassmorphism is a modern design trend that creates a frosted glass effect using backdrop filters, transparency, and layered backgrounds. This guide explains how to use glassmorphism effectively in the NutiFit design system.

## What is Glassmorphism?

Glassmorphism creates a translucent, layered UI effect that:
- Uses blurred backgrounds (backdrop-filter)
- Applies subtle transparency
- Adds soft borders with low opacity
- Creates depth through layering
- Maintains readability with proper contrast

## Utility Classes

### Base Classes

#### `.glass-surface`
Standard glass effect for overlays and floating elements
```css
.glass-surface {
  background: hsla(var(--md-sys-color-surface), 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid hsla(var(--md-sys-color-outline-variant), 0.2);
  transition: all var(--md-sys-motion-duration-medium2);
}
```

**Use for:**
- Header navigation
- Floating action buttons
- Tooltips
- Dropdown menus

#### `.glass-surface-elevated`
Enhanced glass effect for dialogs and modals
```css
.glass-surface-elevated {
  background: hsla(var(--md-sys-color-surface-container), 0.6);
  backdrop-filter: blur(30px) saturate(180%);
  border: 1px solid hsla(var(--md-sys-color-outline), 0.2);
  transition: all var(--md-sys-motion-duration-medium2);
}
```

**Use for:**
- Modal dialogs
- Side panels
- Mobile navigation drawers
- Confirmation overlays

#### `.glass-card`
Card variant with glass effect
```css
.glass-card {
  background: hsla(var(--md-sys-color-surface-container-low), 0.85);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid hsla(var(--md-sys-color-outline-variant), 0.3);
  transition: all var(--md-sys-motion-duration-medium2);
}
```

**Use for:**
- Content cards
- Feature highlights
- Meal cards
- Package cards

#### `.glass-primary`
Primary color-tinted glass effect
```css
.glass-primary {
  background: hsla(var(--md-sys-color-primary), 0.1);
  backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid hsla(var(--md-sys-color-primary), 0.2);
}
```

**Use for:**
- Primary call-to-action sections
- Highlighted features
- Selected states
- Brand emphasis areas

## Component Usage

### GlassCard Component
```tsx
import { GlassCard } from "@/components/ui/glass-card";

// Standard card
<GlassCard>
  <h3>Card Title</h3>
  <p>Card content</p>
</GlassCard>

// Elevated variant
<GlassCard elevated>
  <h3>Important Content</h3>
</GlassCard>

// Primary variant
<GlassCard variant="primary">
  <h3>Featured Content</h3>
</GlassCard>
```

### Header Example
```tsx
<header className="sticky top-0 z-40 w-full glass-surface md-elevation-2">
  <div className="max-w-7xl mx-auto px-6">
    <nav>...</nav>
  </div>
</header>
```

### Modal Example
```tsx
<div className="fixed inset-0 z-50">
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
  <div className="glass-surface-elevated rounded-md-lg p-6">
    <h2>Modal Title</h2>
    <p>Modal content</p>
  </div>
</div>
```

## Best Practices

### ✅ DO

1. **Use for Floating Elements**
   - Navigation bars
   - Modals and dialogs
   - Tooltips and popovers
   - Floating action buttons

2. **Ensure Proper Contrast**
   - Test text readability
   - Use appropriate background colors behind glass
   - Add scrim overlays when needed

3. **Layer Appropriately**
   - Use different blur intensities for depth
   - Stack glass elements with varying opacity
   - Respect z-index hierarchy

4. **Optimize Performance**
   - Use `will-change: backdrop-filter`
   - Apply `transform: translateZ(0)` for GPU acceleration
   - Test on lower-end devices

5. **Provide Fallbacks**
   ```css
   @media (prefers-reduced-motion: reduce) {
     .glass-surface {
       backdrop-filter: none;
       background: hsl(var(--md-sys-color-surface-container));
     }
   }
   ```

### ❌ DON'T

1. **Avoid Overuse**
   - Don't apply glass to every component
   - Reserve for floating/elevated elements
   - Maintain visual hierarchy

2. **Don't Sacrifice Readability**
   - Never blur text content
   - Ensure sufficient contrast
   - Test with various backgrounds

3. **Don't Use on Large Areas**
   - Avoid full-page glass backgrounds
   - Keep glass surfaces focused
   - Use for accent, not foundation

4. **Don't Stack Too Many Layers**
   - Maximum 2-3 glass layers
   - Each layer should have distinct purpose
   - Avoid "foggy" appearance

5. **Don't Ignore Performance**
   - Test on mobile devices
   - Monitor frame rates
   - Provide reduced motion alternatives

## Hover States

### Enhanced Interactions
```tsx
<div className="glass-card hover:backdrop-blur-[24px] hover:border-md-outline transition-standard">
  Content
</div>
```

Glass surfaces should enhance on hover:
- Increase blur intensity
- Brighten border color
- Add elevation shadow
- Subtle scale transformation

## Accessibility Considerations

### Contrast Requirements
- **Minimum 4.5:1** for normal text on glass
- **Minimum 3:1** for large text on glass
- Use WebAIM Contrast Checker to verify

### Reduced Motion
Always provide non-glass fallback:
```css
@supports not (backdrop-filter: blur(10px)) {
  .glass-surface {
    background: hsl(var(--md-sys-color-surface-container));
  }
}
```

### Browser Support
Check for backdrop-filter support:
```tsx
const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(10px)');
```

## Performance Optimization

### GPU Acceleration
```css
.glass-surface {
  will-change: backdrop-filter;
  transform: translateZ(0);
}
```

### Reduce Blur on Mobile
```css
@media (max-width: 768px) {
  .glass-surface {
    backdrop-filter: blur(12px); /* Reduced from 20px */
  }
}
```

### Limit Usage
- Maximum 5-6 glass surfaces per viewport
- Prioritize critical UI elements
- Remove during scroll if performance suffers

## Testing Checklist

- [ ] Verify contrast ratios meet WCAG AA
- [ ] Test on various background colors
- [ ] Check mobile performance (60fps)
- [ ] Verify reduced motion fallback
- [ ] Test in Safari (WebKit prefix)
- [ ] Check Firefox compatibility
- [ ] Test on low-end devices
- [ ] Verify keyboard focus visibility
- [ ] Check screen reader compatibility
- [ ] Test with browser zoom

## Browser Support

### Full Support
- Chrome/Edge 76+
- Safari 9+
- Firefox 103+

### Fallback Required
- IE 11 (no support)
- Older Android browsers

### Vendor Prefixes
```css
.glass-surface {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

## Examples Gallery

### Navigation Header
```tsx
<header className="glass-surface">
  <nav className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      <Logo />
      <Navigation />
      <Actions />
    </div>
  </nav>
</header>
```

### Feature Card
```tsx
<GlassCard className="p-6 hover:scale-105 transition-standard">
  <Icon className="w-12 h-12 text-md-primary mb-4" />
  <h3 className="md-title-large mb-2">Feature Title</h3>
  <p className="md-body-medium text-md-on-surface-variant">
    Feature description
  </p>
</GlassCard>
```

### Mobile Navigation
```tsx
<div className="fixed inset-0 z-50">
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />
  <nav className="absolute right-0 top-0 h-full w-80 glass-surface-elevated p-6">
    <button onClick={close}>Close</button>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/menu">Menu</Link></li>
    </ul>
  </nav>
</div>
```

## Debugging Tips

1. **Blur Not Working**
   - Check browser support
   - Verify backdrop-filter syntax
   - Add -webkit- prefix for Safari
   - Ensure element has background

2. **Poor Performance**
   - Reduce blur radius
   - Limit number of glass elements
   - Add GPU acceleration
   - Test on target devices

3. **Low Contrast**
   - Increase background opacity
   - Add darker scrim overlay
   - Use bolder typography
   - Test with contrast checker

4. **Border Not Visible**
   - Increase border opacity
   - Use outline color variant
   - Add box-shadow as fallback
   - Test against various backgrounds

## Resources

- [CSS backdrop-filter on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [Can I Use backdrop-filter](https://caniuse.com/css-backdrop-filter)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Material Design Elevation](https://m3.material.io/styles/elevation/overview)
