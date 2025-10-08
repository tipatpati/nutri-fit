/**
 * Material Design 3 Design Tokens
 * Centralized design system constants for NutriFit
 */

// Color Tokens
export const colors = {
  primary: {
    main: 'hsl(var(--md-sys-color-primary))',
    container: 'hsl(var(--md-sys-color-primary-container))',
    onPrimary: 'hsl(var(--md-sys-color-on-primary))',
    onContainer: 'hsl(var(--md-sys-color-on-primary-container))',
  },
  secondary: {
    main: 'hsl(var(--md-sys-color-secondary))',
    container: 'hsl(var(--md-sys-color-secondary-container))',
    onSecondary: 'hsl(var(--md-sys-color-on-secondary))',
    onContainer: 'hsl(var(--md-sys-color-on-secondary-container))',
  },
  tertiary: {
    main: 'hsl(var(--md-sys-color-tertiary))',
    container: 'hsl(var(--md-sys-color-tertiary-container))',
    onTertiary: 'hsl(var(--md-sys-color-on-tertiary))',
    onContainer: 'hsl(var(--md-sys-color-on-tertiary-container))',
  },
  error: {
    main: 'hsl(var(--md-sys-color-error))',
    container: 'hsl(var(--md-sys-color-error-container))',
    onError: 'hsl(var(--md-sys-color-on-error))',
    onContainer: 'hsl(var(--md-sys-color-on-error-container))',
  },
  surface: {
    main: 'hsl(var(--md-sys-color-surface))',
    dim: 'hsl(var(--md-sys-color-surface-dim))',
    bright: 'hsl(var(--md-sys-color-surface-bright))',
    containerLowest: 'hsl(var(--md-sys-color-surface-container-lowest))',
    containerLow: 'hsl(var(--md-sys-color-surface-container-low))',
    container: 'hsl(var(--md-sys-color-surface-container))',
    containerHigh: 'hsl(var(--md-sys-color-surface-container-high))',
    containerHighest: 'hsl(var(--md-sys-color-surface-container-highest))',
    variant: 'hsl(var(--md-sys-color-surface-variant))',
    onSurface: 'hsl(var(--md-sys-color-on-surface))',
    onVariant: 'hsl(var(--md-sys-color-on-surface-variant))',
  },
  outline: {
    main: 'hsl(var(--md-sys-color-outline))',
    variant: 'hsl(var(--md-sys-color-outline-variant))',
  },
} as const;

// Spacing Tokens (8dp grid)
export const spacing = {
  none: '0',
  xs: '8px',    // 1 unit
  sm: '16px',   // 2 units
  md: '24px',   // 3 units
  lg: '32px',   // 4 units
  xl: '40px',   // 5 units
  '2xl': '48px', // 6 units
  '3xl': '56px', // 7 units
  '4xl': '64px', // 8 units
  '5xl': '80px', // 10 units
  '6xl': '96px', // 12 units
} as const;

// Shape Tokens
export const shapes = {
  none: 'var(--md-sys-shape-corner-none)',
  xs: 'var(--md-sys-shape-corner-extra-small)', // 4px
  sm: 'var(--md-sys-shape-corner-small)',       // 8px
  md: 'var(--md-sys-shape-corner-medium)',      // 12px
  lg: 'var(--md-sys-shape-corner-large)',       // 16px
  xl: 'var(--md-sys-shape-corner-extra-large)', // 28px
  full: 'var(--md-sys-shape-corner-full)',      // 9999px
} as const;

// Elevation Tokens
export const elevations = {
  0: 'var(--md-sys-elevation-level0)',
  1: 'var(--md-sys-elevation-level1)',
  2: 'var(--md-sys-elevation-level2)',
  3: 'var(--md-sys-elevation-level3)',
  4: 'var(--md-sys-elevation-level4)',
  5: 'var(--md-sys-elevation-level5)',
} as const;

// Motion Tokens
export const motion = {
  easing: {
    emphasizedDecelerate: 'var(--md-sys-motion-easing-emphasized-decelerate)',
    emphasizedAccelerate: 'var(--md-sys-motion-easing-emphasized-accelerate)',
    emphasized: 'var(--md-sys-motion-easing-emphasized)',
    standard: 'var(--md-sys-motion-easing-standard)',
  },
  duration: {
    short1: 'var(--md-sys-motion-duration-short1)',   // 50ms
    short2: 'var(--md-sys-motion-duration-short2)',   // 100ms
    short3: 'var(--md-sys-motion-duration-short3)',   // 150ms
    short4: 'var(--md-sys-motion-duration-short4)',   // 200ms
    medium1: 'var(--md-sys-motion-duration-medium1)', // 250ms
    medium2: 'var(--md-sys-motion-duration-medium2)', // 300ms
    medium3: 'var(--md-sys-motion-duration-medium3)', // 350ms
    medium4: 'var(--md-sys-motion-duration-medium4)', // 400ms
    long1: 'var(--md-sys-motion-duration-long1)',     // 450ms
    long2: 'var(--md-sys-motion-duration-long2)',     // 500ms
    long3: 'var(--md-sys-motion-duration-long3)',     // 550ms
    long4: 'var(--md-sys-motion-duration-long4)',     // 600ms
  },
} as const;

// Typography Tokens
export const typography = {
  display: {
    large: 'md-display-large',
    medium: 'md-display-medium',
    small: 'md-display-small',
  },
  headline: {
    large: 'md-headline-large',
    medium: 'md-headline-medium',
    small: 'md-headline-small',
  },
  title: {
    large: 'md-title-large',
    medium: 'md-title-medium',
    small: 'md-title-small',
  },
  label: {
    large: 'md-label-large',
    medium: 'md-label-medium',
    small: 'md-label-small',
  },
  body: {
    large: 'md-body-large',
    medium: 'md-body-medium',
    small: 'md-body-small',
  },
} as const;

// State Layer Opacities
export const stateLayerOpacity = {
  hover: 0.08,
  focus: 0.12,
  press: 0.16,
  drag: 0.16,
} as const;
