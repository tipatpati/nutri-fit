# NutiFit Typography & Color System

## Overview
NutiFit uses Material Design 3 typography scale with built-in semantic colors. All typography classes now include appropriate text colors by default, eliminating the need for manual color specifications.

## Typography Hierarchy & Colors

### Display (Primary Text)
Used for: Main page headings, hero titles
Default color: `hsl(var(--md-sys-color-on-surface))` - High contrast primary text

```tsx
<h1 className="md-display-large">Main Heading</h1>
<h2 className="md-display-medium">Sub Heading</h2>
<h3 className="md-display-small">Small Heading</h3>
```

**Specifications:**
- `md-display-large`: 57px / 64px line / -0.25px tracking / on-surface color
- `md-display-medium`: 45px / 52px line / on-surface color
- `md-display-small`: 36px / 44px line / on-surface color

### Headline (Section Headings)
Used for: Section titles, card headers
Default color: `hsl(var(--md-sys-color-on-surface))` - Primary text

```tsx
<h2 className="md-headline-large">Section Title</h2>
<h3 className="md-headline-medium">Card Header</h3>
<h4 className="md-headline-small">Subsection</h4>
```

**Specifications:**
- `md-headline-large`: 32px / 40px line / on-surface color
- `md-headline-medium`: 28px / 36px line / on-surface color
- `md-headline-small`: 24px / 32px line / on-surface color

### Title (Emphasis Text)
Used for: Card titles, list items, subheadings
Default color: `hsl(var(--md-sys-color-on-surface))` - Primary text

```tsx
<h4 className="md-title-large">Card Title</h4>
<h5 className="md-title-medium">List Header</h5>
<h6 className="md-title-small">Small Title</h6>
```

**Specifications:**
- `md-title-large`: 22px / 28px line / medium weight / on-surface color
- `md-title-medium`: 16px / 24px line / medium weight / 0.1px tracking / on-surface color
- `md-title-small`: 14px / 20px line / medium weight / 0.1px tracking / on-surface color

### Label (UI Elements)
Used for: Buttons, badges, tabs, important UI elements
Default color: `hsl(var(--md-sys-color-on-surface))` for large/medium, `hsl(var(--md-sys-color-on-surface-variant))` for small

```tsx
<Button className="md-label-large">Click Me</Button>
<Badge className="md-label-medium">New</Badge>
<span className="md-label-small">Helper text</span>
```

**Specifications:**
- `md-label-large`: 14px / 20px line / medium weight / 0.1px tracking / on-surface color
- `md-label-medium`: 12px / 16px line / medium weight / 0.5px tracking / on-surface color
- `md-label-small`: 11px / 16px line / medium weight / 0.5px tracking / on-surface-variant color

### Body (Content Text)
Used for: Paragraphs, descriptions, supporting text
Default color: `hsl(var(--md-sys-color-on-surface-variant))` - Secondary text (slightly muted)

```tsx
<p className="md-body-large">Main description text</p>
<p className="md-body-medium">Regular paragraph text</p>
<p className="md-body-small">Small supporting text</p>
```

**Specifications:**
- `md-body-large`: 16px / 24px line / 0.5px tracking / on-surface-variant color
- `md-body-medium`: 14px / 20px line / 0.25px tracking / on-surface-variant color
- `md-body-small`: 12px / 16px line / 0.4px tracking / on-surface-variant color

## Text Color Utilities

### Primary Text Colors
```tsx
.text-primary     // on-surface (highest contrast - headings)
.text-secondary   // on-surface-variant (body text)
.text-tertiary    // on-surface-variant + 70% opacity (de-emphasized text)
```

### Accent Colors
```tsx
.text-accent          // secondary color (Orange #FF4D00)
.text-accent-tertiary // tertiary color (Gold #D4B961)
```

### On-Color Text (for colored backgrounds)
```tsx
.text-on-primary    // White text on primary (Dark Teal) background
.text-on-secondary  // White text on secondary (Orange) background
.text-on-tertiary   // Dark text on tertiary (Gold) background
```

## Usage Examples

### ❌ DON'T - Manual color specification (redundant)
```tsx
<h2 className="md-display-large text-[hsl(var(--md-sys-color-on-surface))]">
  Title
</h2>
<p className="md-body-medium text-[hsl(var(--md-sys-color-on-surface-variant))]">
  Description
</p>
```

### ✅ DO - Use typography classes alone
```tsx
<h2 className="md-display-large">
  Title
</h2>
<p className="md-body-medium">
  Description
</p>
```

### Section Header Pattern
```tsx
<div className="text-center mb-12 animate-fade-in">
  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--md-sys-color-surface-container-highest))] rounded-[var(--md-sys-shape-corner-full)] md-label-medium border border-[hsl(var(--md-sys-color-outline-variant))] mb-4">
    <Icon className="w-4 h-4 text-[hsl(var(--md-sys-color-secondary))]" />
    Badge Text
  </div>
  <h2 className="md-display-large mb-4">
    Main Section Title
  </h2>
  <p className="md-body-large max-w-2xl mx-auto">
    Section description with proper secondary text color
  </p>
</div>
```

### Card Pattern
```tsx
<Card className="bg-[hsl(var(--md-sys-color-surface))]">
  <CardContent>
    <h3 className="md-headline-medium mb-4">
      Card Title (primary text)
    </h3>
    <p className="md-body-medium mb-2">
      Card description (secondary text)
    </p>
    <span className="md-label-small">
      Helper text (tertiary)
    </span>
  </CardContent>
</Card>
```

### Button Pattern
```tsx
// Primary button with proper contrast
<Button className="bg-[hsl(var(--md-sys-color-primary))] text-on-primary">
  <span className="md-label-large">Button Text</span>
</Button>

// Secondary button
<Button className="bg-[hsl(var(--md-sys-color-secondary))] text-on-secondary">
  <span className="md-label-large">Button Text</span>
</Button>
```

## Color Contrast Rules

### High Contrast (Headings & Important UI)
- **Display, Headline, Title, Label (large/medium)**: Use `on-surface` color
- Ensures maximum readability for critical information

### Medium Contrast (Body Text)
- **Body text, descriptions**: Use `on-surface-variant` color
- Provides visual hierarchy while maintaining readability

### Low Contrast (Supporting Info)
- **Label small, timestamps, metadata**: Use `on-surface-variant` with reduced opacity
- De-emphasizes less critical information

## Typography Decision Tree

```
Is this text the main focus?
├─ YES → Use Display or Headline
│   └─ Very important? → md-display-large
│   └─ Section title? → md-headline-medium
│
└─ NO → Is it interactive or emphasized?
    ├─ YES → Use Title or Label
    │   └─ Button/Badge? → md-label-large
    │   └─ Card title? → md-title-medium
    │
    └─ NO → Use Body
        └─ Main content? → md-body-large
        └─ Supporting? → md-body-medium
        └─ Metadata? → md-body-small
```

## Accessibility Guidelines

1. **Contrast Ratios**:
   - Primary text (on-surface): 4.5:1 minimum
   - Secondary text (on-surface-variant): 4.5:1 minimum
   - Tertiary text: 3:1 minimum (for large text only)

2. **Font Sizes**:
   - Never go below 11px (md-label-small)
   - Body text should be 14px+ for optimal readability

3. **Line Height**:
   - Display: 1.12x font size
   - Body: 1.5x font size
   - Adequate spacing for comfortable reading

4. **Responsive Considerations**:
   - Display sizes may need adjustment on mobile
   - Consider using `sm:`, `md:`, `lg:` breakpoint prefixes

## Integration Checklist

- [ ] All headings use Display or Headline classes
- [ ] All buttons use Label-large class
- [ ] All body content uses Body classes
- [ ] No manual color specifications on typography
- [ ] Proper contrast maintained in all themes
- [ ] Icons paired with appropriate accent colors
- [ ] Cards maintain surface/on-surface color relationships

## Quick Reference

| Use Case | Class | Color |
|----------|-------|-------|
| Hero title | `md-display-large` | on-surface |
| Section heading | `md-headline-medium` | on-surface |
| Card title | `md-title-medium` | on-surface |
| Button text | `md-label-large` | on-surface |
| Paragraph | `md-body-medium` | on-surface-variant |
| Caption/metadata | `md-body-small` | on-surface-variant |
| Badge text | `md-label-medium` | on-surface |

---

**Remember**: Typography classes now include colors by default. Only override colors when using text on colored backgrounds (use `.text-on-*` utilities).
