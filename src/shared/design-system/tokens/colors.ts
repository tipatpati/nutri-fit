/**
 * Enhanced Color Token System
 * Centralized color management with semantic naming
 * @module design-system/tokens/colors
 */

/**
 * Primary brand colors
 * Deep Olive (#2B3210) - Natural, earthy, trustworthy
 */
export const brandPrimary = {
  main: 'hsl(var(--brand-primary))',
  light: 'hsl(var(--brand-primary-light))',
  dark: 'hsl(var(--brand-primary-dark))',
  contrast: 'hsl(var(--brand-primary-contrast))',
} as const;

/**
 * Secondary brand colors
 * Burnt Orange (#DE6E27) - Energetic, warm, appetite-stimulating
 */
export const brandSecondary = {
  main: 'hsl(var(--brand-secondary))',
  light: 'hsl(var(--brand-secondary-light))',
  dark: 'hsl(var(--brand-secondary-dark))',
  contrast: 'hsl(var(--brand-secondary-contrast))',
} as const;

/**
 * Accent colors
 * Sage Green (#505631) - Natural, balanced, healthy
 */
export const brandAccent = {
  main: 'hsl(var(--brand-accent))',
  light: 'hsl(var(--brand-accent-light))',
  dark: 'hsl(var(--brand-accent-dark))',
  contrast: 'hsl(var(--brand-accent-contrast))',
} as const;

/**
 * Functional status colors
 */
export const functional = {
  success: {
    main: 'hsl(var(--color-success))',
    light: 'hsl(var(--color-success-light))',
    dark: 'hsl(var(--color-success-dark))',
    contrast: 'hsl(var(--color-success-contrast))',
  },
  warning: {
    main: 'hsl(var(--color-warning))',
    light: 'hsl(var(--color-warning-light))',
    dark: 'hsl(var(--color-warning-dark))',
    contrast: 'hsl(var(--color-warning-contrast))',
  },
  error: {
    main: 'hsl(var(--color-error))',
    light: 'hsl(var(--color-error-light))',
    dark: 'hsl(var(--color-error-dark))',
    contrast: 'hsl(var(--color-error-contrast))',
  },
  info: {
    main: 'hsl(var(--color-info))',
    light: 'hsl(var(--color-info-light))',
    dark: 'hsl(var(--color-info-dark))',
    contrast: 'hsl(var(--color-info-contrast))',
  },
} as const;

/**
 * Nutritional category colors (semantic)
 * Used for meal categorization and visual differentiation
 */
export const nutrition = {
  balanced: {
    main: 'hsl(46 56% 61%)',        // Gold - Balanced nutrition
    light: 'hsl(46 56% 75%)',
    dark: 'hsl(46 56% 45%)',
    contrast: 'hsl(46 56% 20%)',
  },
  weightLoss: {
    main: 'hsl(177 55% 15%)',       // Teal - Weight management
    light: 'hsl(177 55% 30%)',
    dark: 'hsl(177 55% 10%)',
    contrast: 'hsl(177 55% 92%)',
  },
  muscleGain: {
    main: 'hsl(18 100% 50%)',       // Orange - Energy/muscle
    light: 'hsl(18 100% 65%)',
    dark: 'hsl(18 100% 35%)',
    contrast: 'hsl(0 0% 100%)',
  },
} as const;

/**
 * Interaction state colors
 * Applied as overlays on interactive elements
 */
export const state = {
  hover: 'hsla(var(--state-hover))',
  active: 'hsla(var(--state-active))',
  focus: 'hsla(var(--state-focus))',
  disabled: 'hsla(var(--state-disabled))',
} as const;

/**
 * Material Design 3 Surface colors
 * For background layering and elevation
 */
export const surface = {
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
} as const;

/**
 * Outline colors for borders and dividers
 */
export const outline = {
  main: 'hsl(var(--md-sys-color-outline))',
  variant: 'hsl(var(--md-sys-color-outline-variant))',
} as const;

/**
 * Complete color token system
 * Single source of truth for all application colors
 */
export const colorTokens = {
  brand: {
    primary: brandPrimary,
    secondary: brandSecondary,
    accent: brandAccent,
  },
  functional,
  nutrition,
  state,
  surface,
  outline,
} as const;

/**
 * Type-safe color paths
 */
export type ColorCategory = keyof typeof colorTokens;
export type ColorPath =
  | 'brand.primary.main' | 'brand.primary.light' | 'brand.primary.dark' | 'brand.primary.contrast'
  | 'brand.secondary.main' | 'brand.secondary.light' | 'brand.secondary.dark' | 'brand.secondary.contrast'
  | 'brand.accent.main' | 'brand.accent.light' | 'brand.accent.dark' | 'brand.accent.contrast'
  | 'functional.success.main' | 'functional.warning.main' | 'functional.error.main' | 'functional.info.main'
  | 'nutrition.balanced.main' | 'nutrition.weightLoss.main' | 'nutrition.muscleGain.main'
  | 'surface.main' | 'surface.container' | 'surface.containerHigh'
  | 'outline.main' | 'outline.variant';

/**
 * Get color value by path
 * @param path - Dot notation path to color value
 * @returns Color value as CSS variable reference
 * @example
 * getColor('brand.primary.main') // returns 'hsl(var(--brand-primary))'
 */
export const getColor = (path: ColorPath): string => {
  const parts = path.split('.');
  let current: any = colorTokens;

  for (const part of parts) {
    current = current[part];
    if (!current) {
      console.warn(`Color path "${path}" not found, falling back to brand.primary.main`);
      return brandPrimary.main;
    }
  }

  return current;
};

/**
 * Tailwind CSS class mappings for colors
 * Use these for className-based styling
 */
export const colorClasses = {
  // Primary
  'bg-brand-primary': 'bg-[hsl(var(--brand-primary))]',
  'text-brand-primary': 'text-[hsl(var(--brand-primary))]',
  'border-brand-primary': 'border-[hsl(var(--brand-primary))]',

  // Secondary
  'bg-brand-secondary': 'bg-[hsl(var(--brand-secondary))]',
  'text-brand-secondary': 'text-[hsl(var(--brand-secondary))]',
  'border-brand-secondary': 'border-[hsl(var(--brand-secondary))]',

  // Surface
  'bg-surface': 'bg-md-surface',
  'bg-surface-container': 'bg-md-surface-container',
  'text-on-surface': 'text-md-on-surface',
} as const;
