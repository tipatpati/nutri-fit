# NutiFit Design System

## Overview
NutiFit uses Material Design 3 (MD3) design system with a custom color palette based on the brand identity. All components must use semantic tokens from `src/index.css` for consistency.

**📚 Related Documentation:**
- See `TYPOGRAPHY_SYSTEM.md` for complete typography and text color guidelines

## Color Palette

### Primary Colors (Dark Teal #113B39)
- Primary: `hsl(var(--md-sys-color-primary))` - `hsl(177 55% 15%)`
- Primary Container: `hsl(var(--md-sys-color-primary-container))` - `hsl(177 55% 92%)`
- On Primary: `hsl(var(--md-sys-color-on-primary))` - White
- On Primary Container: `hsl(var(--md-sys-color-on-primary-container))` - `hsl(177 55% 8%)`

### Secondary Colors (Orange #FF4D00)
- Secondary: `hsl(var(--md-sys-color-secondary))` - `hsl(18 100% 50%)`
- Secondary Container: `hsl(var(--md-sys-color-secondary-container))` - `hsl(18 100% 95%)`
- On Secondary: `hsl(var(--md-sys-color-on-secondary))` - White
- On Secondary Container: `hsl(var(--md-sys-color-on-secondary-container))` - `hsl(18 100% 25%)`

### Tertiary Colors (Gold #D4B961)
- Tertiary: `hsl(var(--md-sys-color-tertiary))` - `hsl(46 56% 61%)`
- Tertiary Container: `hsl(var(--md-sys-color-tertiary-container))` - `hsl(46 56% 95%)`
- On Tertiary: `hsl(var(--md-sys-color-on-tertiary))` - `hsl(46 56% 20%)`
- On Tertiary Container: `hsl(var(--md-sys-color-on-tertiary-container))` - `hsl(46 56% 25%)`

### Surface Colors
- Surface: `hsl(var(--md-sys-color-surface))` - `hsl(254 247 255)`
- Surface Container: `hsl(var(--md-sys-color-surface-container))` - `hsl(243 237 247)`
- Surface Container Low: `hsl(var(--md-sys-color-surface-container-low))` - `hsl(247 242 250)`
- Surface Container High: `hsl(var(--md-sys-color-surface-container-high))` - `hsl(236 230 240)`
- Surface Container Highest: `hsl(var(--md-sys-color-surface-container-highest))` - `hsl(230 224 233)`
- On Surface: `hsl(var(--md-sys-color-on-surface))` - `hsl(28 27 31)`
- On Surface Variant: `hsl(var(--md-sys-color-on-surface-variant))` - `hsl(73 69 79)`

### Outline Colors (Olive #525944)
- Outline: `hsl(var(--md-sys-color-outline))` - `hsl(75 13% 31%)`
- Outline Variant: `hsl(var(--md-sys-color-outline-variant))` - `hsl(75 13% 85%)`

## Typography Scale

### Display
- **Display Large**: `md-display-large` - 57px / 64px line height / -0.25px tracking
- **Display Medium**: `md-display-medium` - 45px / 52px line height
- **Display Small**: `md-display-small` - 36px / 44px line height

### Headline
- **Headline Large**: `md-headline-large` - 32px / 40px line height
- **Headline Medium**: `md-headline-medium` - 28px / 36px line height
- **Headline Small**: `md-headline-small` - 24px / 32px line height

### Title
- **Title Large**: `md-title-large` - 22px / 28px line height / medium weight
- **Title Medium**: `md-title-medium` - 16px / 24px line height / medium weight / 0.1px tracking
- **Title Small**: `md-title-small` - 14px / 20px line height / medium weight / 0.1px tracking

### Label
- **Label Large**: `md-label-large` - 14px / 20px line height / medium weight / 0.1px tracking
- **Label Medium**: `md-label-medium` - 12px / 16px line height / medium weight / 0.5px tracking
- **Label Small**: `md-label-small` - 11px / 16px line height / medium weight / 0.5px tracking

### Body
- **Body Large**: `md-body-large` - 16px / 24px line height / 0.5px tracking
- **Body Medium**: `md-body-medium` - 14px / 20px line height / 0.25px tracking
- **Body Small**: `md-body-small` - 12px / 16px line height / 0.4px tracking

## Shape Tokens

- **Corner None**: `var(--md-sys-shape-corner-none)` - 0px
- **Corner Extra Small**: `var(--md-sys-shape-corner-extra-small)` - 4px
- **Corner Small**: `var(--md-sys-shape-corner-small)` - 8px
- **Corner Medium**: `var(--md-sys-shape-corner-medium)` - 12px
- **Corner Large**: `var(--md-sys-shape-corner-large)` - 16px
- **Corner Extra Large**: `var(--md-sys-shape-corner-extra-large)` - 28px
- **Corner Full**: `var(--md-sys-shape-corner-full)` - 9999px (pill shape)

## Elevation Shadows

- **Level 0**: `md-elevation-0` - No shadow
- **Level 1**: `md-elevation-1` - Subtle shadow for cards at rest
- **Level 2**: `md-elevation-2` - Standard card shadow
- **Level 3**: `md-elevation-3` - Elevated cards
- **Level 4**: `md-elevation-4` - Hovered/focused cards
- **Level 5**: `md-elevation-5` - Highest elevation for modals/dialogs

## Animation Guidelines

### Fade Animations
- `animate-fade-in` - Fade in with slight upward motion (300ms)
- `animate-fade-out` - Fade out with downward motion (300ms)

### Scale Animations
- `animate-scale-in` - Scale up from 0.95 to 1 (200ms)
- `animate-scale-out` - Scale down from 1 to 0.95 (200ms)

### Interactive Utilities
- `hover-scale` - Scale to 105% on hover
- `hover-lift` - Lift element with shadow on hover
- `md-ripple` - Material Design ripple effect
- `md-state-layer` - Material Design state layer for interactive elements

### Motion Durations
- Short: 50-200ms (quick transitions)
- Medium: 250-400ms (standard animations)
- Long: 450-600ms (complex transitions)

## Usage Guidelines

### ❌ DON'T USE Direct Values
```tsx
// ❌ WRONG - Direct Tailwind classes
<h1 className="text-5xl text-slate-900 bg-white">
<div className="bg-orange-500 text-white rounded-xl">
```

### ✅ DO USE Semantic Tokens
```tsx
// ✅ CORRECT - Material Design 3 tokens
<h1 className="md-display-large text-[hsl(var(--md-sys-color-on-surface))]">
<div className="bg-[hsl(var(--md-sys-color-secondary))] text-[hsl(var(--md-sys-color-on-secondary))] rounded-[var(--md-sys-shape-corner-large)]">
```

### Section Headers Example
```tsx
<div className="text-center mb-12 animate-fade-in">
  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--md-sys-color-surface-container-highest))] rounded-[var(--md-sys-shape-corner-full)] md-label-medium text-[hsl(var(--md-sys-color-on-surface))] mb-4 border border-[hsl(var(--md-sys-color-outline-variant))]">
    <Icon className="w-4 h-4 text-[hsl(var(--md-sys-color-secondary))]" />
    Badge Text
  </div>
  <h2 className="md-display-large text-[hsl(var(--md-sys-color-on-surface))] mb-4">
    Section Title
  </h2>
  <p className="md-body-large text-[hsl(var(--md-sys-color-on-surface-variant))] max-w-3xl mx-auto">
    Section description
  </p>
</div>
```

### Cards Example
```tsx
<Card className="bg-[hsl(var(--md-sys-color-surface))] border-[hsl(var(--md-sys-color-outline-variant))] rounded-[var(--md-sys-shape-corner-large)] md-elevation-2 hover:md-elevation-4 transition-all">
  <CardContent>
    <h3 className="md-headline-medium text-[hsl(var(--md-sys-color-on-surface))]">
      Card Title
    </h3>
    <p className="md-body-medium text-[hsl(var(--md-sys-color-on-surface-variant))]">
      Card content
    </p>
  </CardContent>
</Card>
```

### Buttons with Brand Colors
```tsx
// Primary button (Dark Teal)
<Button className="bg-[hsl(var(--md-sys-color-primary))] text-[hsl(var(--md-sys-color-on-primary))] hover:md-elevation-3">

// Secondary button (Orange)
<Button className="bg-[hsl(var(--md-sys-color-secondary))] text-[hsl(var(--md-sys-color-on-secondary))] hover:md-elevation-3">

// Tertiary button (Gold)
<Button className="bg-[hsl(var(--md-sys-color-tertiary))] text-[hsl(var(--md-sys-color-on-tertiary))] hover:md-elevation-3">
```

## Brand Color Applications

### Step/Process Flow
- **Step 1**: Primary (Dark Teal) - `bg-[hsl(var(--md-sys-color-primary-container))]` with `text-[hsl(var(--md-sys-color-primary))]`
- **Step 2**: Secondary (Orange) - `bg-[hsl(var(--md-sys-color-secondary-container))]` with `text-[hsl(var(--md-sys-color-secondary))]`
- **Step 3**: Tertiary (Gold) - `bg-[hsl(var(--md-sys-color-tertiary-container))]` with `text-[hsl(var(--md-sys-color-tertiary))]`

### Gradients
```tsx
// Primary to Secondary
className="bg-gradient-to-r from-[hsl(var(--md-sys-color-primary))] to-[hsl(var(--md-sys-color-secondary))]"

// Secondary to Tertiary
className="bg-gradient-to-br from-[hsl(var(--md-sys-color-secondary))] to-[hsl(var(--md-sys-color-tertiary))]"

// All three colors
className="bg-gradient-to-r from-[hsl(var(--md-sys-color-secondary))] via-[hsl(var(--md-sys-color-tertiary))] to-[hsl(var(--md-sys-color-primary))]"
```

## Best Practices

1. **Always use semantic color tokens** - Never hardcode color values
2. **Use MD3 typography scale** - Consistent text sizing and hierarchy
3. **Apply proper shape tokens** - Consistent border radius throughout
4. **Leverage elevation system** - Appropriate shadows for visual hierarchy
5. **Add smooth animations** - Use built-in animation utilities
6. **Maintain color contrast** - Always pair surface colors with their "on" variants
7. **Test in dark mode** - Ensure colors work in both light and dark themes

## Resources

- Main stylesheet: `src/index.css`
- Tailwind config: `tailwind.config.ts`
- Design system utils: `src/shared/design-system/`
- Component examples: `src/presentation/components/`
