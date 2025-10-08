# NutriFit Design System

Material Design 3 implementation for the NutriFit application.

## 📦 Installation

```typescript
import { colors, spacing, typography } from '@/shared/design-system';
import { getCategoryColor, getSpacing } from '@/shared/design-system/utils';
```

## 🎨 Colors

### Usage in Components

```tsx
// ❌ BAD - Hardcoded colors
<div className="bg-emerald-500 text-white">

// ✅ GOOD - Using design system tokens
<div className="bg-md-primary text-md-primary-on-primary">

// ✅ GOOD - Using Tailwind utility classes
<div className="md-primary">
```

### Available Color Tokens

- **Primary**: `md-primary`, `md-primary-container`, `md-primary-on-primary`, `md-primary-on-container`
- **Secondary**: `md-secondary`, `md-secondary-container`, `md-secondary-on-secondary`, `md-secondary-on-container`
- **Tertiary**: `md-tertiary`, `md-tertiary-container`, `md-tertiary-on-tertiary`, `md-tertiary-on-container`
- **Error**: `md-error`, `md-error-container`, `md-error-on-error`, `md-error-on-container`
- **Surface**: `md-surface`, `md-surface-variant`, `md-surface-container`, `md-surface-container-low`, `md-surface-container-high`
- **Outline**: `md-outline`, `md-outline-variant`

## 📏 Spacing (8dp Grid)

### Usage

```tsx
// ❌ BAD - Arbitrary spacing
<div className="p-5 m-3">

// ✅ GOOD - MD3 spacing tokens
<div className="p-md-3 m-md-2">

// Available: md-1 (8px), md-2 (16px), md-3 (24px), md-4 (32px), 
//            md-5 (40px), md-6 (48px), md-7 (56px), md-8 (64px)
```

### Spacing Scale

| Token | Pixels | Units | Use Case |
|-------|--------|-------|----------|
| `md-1` | 8px | 1 | Tight spacing, icon padding |
| `md-2` | 16px | 2 | Default padding, small gaps |
| `md-3` | 24px | 3 | Medium padding, card spacing |
| `md-4` | 32px | 4 | Large padding, section spacing |
| `md-6` | 48px | 6 | Extra large spacing |
| `md-8` | 64px | 8 | Section dividers |

## ✍️ Typography

### Usage

```tsx
// ❌ BAD - Inline styles
<h1 className="text-3xl font-bold">

// ✅ GOOD - MD3 typography scale
<h1 className="md-headline-large">

// Available scales:
// - Display: md-display-large/medium/small
// - Headline: md-headline-large/medium/small
// - Title: md-title-large/medium/small
// - Body: md-body-large/medium/small
// - Label: md-label-large/medium/small
```

### Typography Scale

| Class | Size | Weight | Use Case |
|-------|------|--------|----------|
| `md-display-large` | 57px | Normal | Hero titles |
| `md-headline-large` | 32px | Normal | Page titles |
| `md-title-large` | 22px | Medium | Section titles |
| `md-body-large` | 16px | Normal | Body text |
| `md-label-large` | 14px | Medium | Buttons, labels |

## 🔲 Shapes (Border Radius)

```tsx
// Available: rounded-none, rounded-xs, rounded-sm, rounded-md, 
//            rounded-lg, rounded-xl, rounded-full

<Button className="rounded-[20px]"> // MD3 Button shape
<Card className="rounded-xl"> // Large shape for cards
```

## 🌟 Elevation (Shadows)

```tsx
// ❌ BAD - Custom shadows
<div className="shadow-lg">

// ✅ GOOD - MD3 elevation levels
<div className="md-elevation-2">

// Available: md-elevation-0 to md-elevation-5
```

## 🎭 State Layers

```tsx
// Add interactive state layers
<button className="md-state-layer">
  // Automatically adds hover, focus, and active states
</button>

// Add ripple effect
<button className="md-ripple">
  // Material ripple on click
</button>
```

## 🎬 Animations

```tsx
// Fade animations
<div className="animate-fade-in">
<div className="animate-fade-up">

// Scale animations
<div className="animate-scale-in">
<div className="animate-bounce-in">

// Slide animations
<div className="animate-slide-in-right">
<div className="animate-slide-in-left">

// Interactive animations
<a className="story-link hover-scale">
```

## 📱 Component Examples

### Button

```tsx
import { Button } from '@/components/ui/button';

// Primary action
<Button variant="filled">Submit</Button>

// Secondary action
<Button variant="outlined">Cancel</Button>

// Tertiary action
<Button variant="text">Learn More</Button>

// Icon button
<Button variant="filled" size="icon">
  <Icon />
</Button>
```

### Card

```tsx
import { Card, CardContent } from '@/components/ui/card';

<Card className="md-elevation-1 rounded-xl">
  <CardContent className="p-md-4">
    <h3 className="md-title-large mb-md-2">Title</h3>
    <p className="md-body-medium">Content</p>
  </CardContent>
</Card>
```

### Surface Container

```tsx
<div className="md-surface-container p-md-4 rounded-lg">
  <h2 className="md-headline-small mb-md-3">Section Title</h2>
  <p className="md-body-medium">Content goes here</p>
</div>
```

## 🚫 Common Mistakes to Avoid

1. **Hardcoded Colors**
   ```tsx
   // ❌ DON'T
   <div className="bg-green-500 text-white">
   
   // ✅ DO
   <div className="bg-md-primary text-md-primary-on-primary">
   ```

2. **Arbitrary Spacing**
   ```tsx
   // ❌ DON'T
   <div className="p-5 m-7">
   
   // ✅ DO
   <div className="p-md-3 m-md-4">
   ```

3. **Custom Typography**
   ```tsx
   // ❌ DON'T
   <h1 className="text-2xl font-semibold">
   
   // ✅ DO
   <h1 className="md-headline-medium">
   ```

4. **Inconsistent Shapes**
   ```tsx
   // ❌ DON'T
   <Button className="rounded-[13px]">
   
   // ✅ DO
   <Button className="rounded-[20px]"> // MD3 standard
   ```

## 🎯 Best Practices

1. **Always use design tokens** - Never hardcode values
2. **Follow the 8dp grid** - All spacing should be multiples of 8
3. **Use semantic color names** - Not color values
4. **Apply elevation consistently** - Match MD3 guidelines
5. **Leverage state layers** - For interactive elements
6. **Use MD3 motion** - For animations and transitions

## 🔧 Utility Functions

```typescript
import { getSpacing, getColor, buildTransition } from '@/shared/design-system';

// Get spacing value
const padding = getSpacing('md');

// Get color value
const primaryColor = getColor('primary', 'main');

// Build transition
const transition = buildTransition('all', 'medium2', 'standard');
```

## 📚 Resources

- [Material Design 3 Guidelines](https://m3.material.io/)
- [Color System](https://m3.material.io/styles/color/overview)
- [Typography](https://m3.material.io/styles/typography/overview)
- [Elevation](https://m3.material.io/styles/elevation/overview)
