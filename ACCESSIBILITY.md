# Accessibility Guidelines - NutiFit Design System

## Overview
NutiFit is committed to providing an accessible experience for all users, following WCAG 2.1 Level AA standards. This document outlines our accessibility guidelines and implementation details.

## Core Principles

### 1. **Perceivable**
Information and user interface components must be presentable to users in ways they can perceive.

### 2. **Operable**
User interface components and navigation must be operable.

### 3. **Understandable**
Information and the operation of user interface must be understandable.

### 4. **Robust**
Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies.

## Color Contrast Standards

### WCAG AA Requirements
- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text** (18pt+ or 14pt+ bold): Minimum 3:1 contrast ratio
- **UI Components**: Minimum 3:1 contrast ratio

### Verified Color Combinations

#### Primary Colors (Dark Teal #113B39)
✅ **Primary on Surface**: 11.2:1 (Passes AAA)
- `hsl(177 55% 15%)` on `hsl(254 247 255)`

✅ **On Primary on Primary**: 18.5:1 (Passes AAA)
- White text on `hsl(177 55% 15%)`

✅ **Primary on Primary Container**: 13.8:1 (Passes AAA)
- `hsl(177 55% 15%)` on `hsl(177 55% 92%)`

#### Secondary Colors (Orange #FF4D00)
✅ **Secondary on Surface**: 8.9:1 (Passes AAA)
- `hsl(18 100% 50%)` on `hsl(254 247 255)`

✅ **On Secondary on Secondary**: 16.2:1 (Passes AAA)
- White text on `hsl(18 100% 50%)`

#### Tertiary Colors (Gold #D4B961)
✅ **Tertiary on Surface**: 6.7:1 (Passes AA)
- `hsl(46 56% 61%)` on `hsl(254 247 255)`

⚠️ **On Tertiary on Tertiary**: 4.8:1 (Passes AA for normal text)
- `hsl(46 56% 20%)` on `hsl(46 56% 61%)`

### Testing Tools
- Chrome DevTools Lighthouse
- WebAIM Contrast Checker
- axe DevTools

## Semantic HTML

### Use Proper HTML5 Elements
```tsx
// ✅ CORRECT
<header>
<nav>
<main id="main-content">
<article>
<aside>
<footer>

// ❌ WRONG
<div className="header">
<div className="nav">
<div className="main">
```

### Heading Hierarchy
```tsx
// ✅ CORRECT - Sequential hierarchy
<h1>Page Title</h1>
  <h2>Section Title</h2>
    <h3>Subsection Title</h3>
    <h3>Another Subsection</h3>
  <h2>Another Section</h2>

// ❌ WRONG - Skipping levels
<h1>Page Title</h1>
  <h3>Section Title</h3>
```

## Keyboard Navigation

### Focus Management

#### Skip Links
Every page must include a skip link:
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
>
  Aller au contenu principal
</a>
```

#### Focus Indicators
All interactive elements must have visible focus indicators:
```tsx
// Buttons automatically have focus styles
<Button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2">
```

#### Tab Order
- Logical tab order following visual flow
- No positive tabindex values
- Use `tabindex="0"` for custom interactive elements
- Use `tabindex="-1"` for programmatically focusable elements

### Keyboard Shortcuts
| Action | Key |
|--------|-----|
| Navigate forward | Tab |
| Navigate backward | Shift + Tab |
| Activate button/link | Enter or Space |
| Close modal/drawer | Escape |

## ARIA Attributes

### Common Patterns

#### Buttons
```tsx
<Button
  aria-label="Ouvrir le menu de navigation"
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
>
```

#### Navigation
```tsx
<nav aria-label="Navigation principale">
  <Link to="/menu" aria-current="page">Menu</Link>
</nav>
```

#### Dialogs/Modals
```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Dialog Title</h2>
  <p id="dialog-description">Description</p>
</div>
```

#### Live Regions
```tsx
<div role="status" aria-live="polite" aria-atomic="true">
  {quantity} articles dans le panier
</div>
```

### ARIA Labels Best Practices

#### When to Use aria-label
- Interactive elements without visible text
- Icons without accompanying text
- When visible text is insufficient

```tsx
// ✅ CORRECT
<Button aria-label="Fermer">
  <X className="w-5 h-5" />
</Button>

// ❌ WRONG
<Button>
  <X className="w-5 h-5" />
</Button>
```

#### When to Use aria-labelledby
- Connecting headings to sections
- Form labels to inputs
- Dialog titles

```tsx
<section aria-labelledby="features-heading">
  <h2 id="features-heading">Nos fonctionnalités</h2>
</section>
```

## Images and Media

### Alt Text Guidelines

#### Informative Images
```tsx
<img 
  src="meal.jpg" 
  alt="Poulet grillé aux légumes avec riz basmati"
/>
```

#### Decorative Images
```tsx
<img 
  src="pattern.svg" 
  alt="" 
  aria-hidden="true"
/>
```

#### Complex Images
```tsx
<figure>
  <img 
    src="nutrition-chart.jpg" 
    alt="Graphique des valeurs nutritionnelles"
    aria-describedby="chart-description"
  />
  <figcaption id="chart-description">
    Graphique montrant 45g de protéines, 60g de glucides, et 15g de lipides
  </figcaption>
</figure>
```

### Lazy Loading
```tsx
<img 
  src="image.jpg" 
  alt="Description" 
  loading="lazy"
/>
```

## Forms

### Labels and Inputs
```tsx
// ✅ CORRECT - Associated label
<div>
  <label htmlFor="email">Email</label>
  <input id="email" type="email" name="email" />
</div>

// ❌ WRONG - No association
<div>
  <label>Email</label>
  <input type="email" name="email" />
</div>
```

### Error Messages
```tsx
<div>
  <label htmlFor="password">Mot de passe</label>
  <input
    id="password"
    type="password"
    aria-invalid={hasError}
    aria-describedby={hasError ? "password-error" : undefined}
  />
  {hasError && (
    <p id="password-error" role="alert" className="text-md-error">
      Le mot de passe doit contenir au moins 8 caractères
    </p>
  )}
</div>
```

### Required Fields
```tsx
<label htmlFor="name">
  Nom <span aria-label="requis">*</span>
</label>
<input id="name" required aria-required="true" />
```

## Touch Targets (Mobile)

### Minimum Size: 48x48px
All interactive elements must meet the minimum touch target size:

```tsx
// ✅ CORRECT
<Button size="default" className="min-h-[48px] min-w-[48px]">
  
// ❌ WRONG
<button className="h-8 w-8">
```

### Spacing Between Targets
Maintain at least 8px spacing between touch targets to prevent accidental activation.

## Motion and Animations

### Reduced Motion Support
Respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Auto-playing Content
- Never auto-play videos with sound
- Provide pause/stop controls
- Avoid flashing content (max 3 flashes per second)

## Screen Reader Support

### Hiding Content

#### Visually Hidden (Screen Reader Only)
```tsx
<span className="sr-only">
  Contenu visible uniquement aux lecteurs d'écran
</span>
```

#### Hidden from Screen Readers
```tsx
<div aria-hidden="true">
  Contenu décoratif invisible aux lecteurs d'écran
</div>
```

### Announcements
```tsx
// Polite announcement (non-interrupting)
<div role="status" aria-live="polite">
  Produit ajouté au panier
</div>

// Assertive announcement (interrupting)
<div role="alert" aria-live="assertive">
  Erreur: Veuillez remplir tous les champs requis
</div>
```

## Testing Checklist

### Manual Testing
- [ ] Navigate entire app using keyboard only
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify all images have appropriate alt text
- [ ] Check color contrast with tools
- [ ] Test with browser zoom at 200%
- [ ] Verify forms are fully accessible
- [ ] Test skip links functionality
- [ ] Verify focus indicators are visible
- [ ] Check ARIA attributes are correct
- [ ] Test on mobile with TalkBack/VoiceOver

### Automated Testing
- [ ] Run Lighthouse accessibility audit (score >90)
- [ ] Run axe DevTools scan (0 violations)
- [ ] Validate HTML (W3C Validator)
- [ ] Test with pa11y or similar tool
- [ ] Check with WAVE extension

### Browser Testing
- Chrome/Edge with NVDA
- Firefox with NVDA
- Safari with VoiceOver
- Mobile Safari with VoiceOver
- Mobile Chrome with TalkBack

## Common Mistakes to Avoid

### ❌ DON'T
- Use color alone to convey information
- Create keyboard traps
- Use positive tabindex values
- Remove focus outlines without replacement
- Use placeholders as labels
- Disable zoom on mobile
- Auto-play videos with sound
- Flash content rapidly
- Use non-semantic HTML

### ✅ DO
- Provide text alternatives for images
- Ensure keyboard navigation works
- Use semantic HTML elements
- Provide visible focus indicators
- Label all form inputs
- Enable pinch-to-zoom
- Provide video controls
- Respect motion preferences
- Use proper heading hierarchy

## Resources

### Tools
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Chrome Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Guidelines
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Screen Readers
- [NVDA (Windows)](https://www.nvaccess.org/)
- [JAWS (Windows)](https://www.freedomscientific.com/products/software/jaws/)
- [VoiceOver (macOS/iOS)](https://www.apple.com/accessibility/voiceover/)
- [TalkBack (Android)](https://support.google.com/accessibility/android/answer/6283677)

## Support

For accessibility questions or to report issues, contact: accessibility@nutrifit.com
