/**
 * Spacing System
 * Material Design 3 8dp grid system
 * @module design-system/tokens/spacing
 */

/**
 * Base spacing unit (8px)
 * All spacing should be multiples of this value
 */
export const BASE_UNIT = 8;

/**
 * Spacing scale following 8dp grid
 * Use these values for consistent spacing throughout the app
 */
export const spacing = {
  none: '0',
  px: '1px',       // For borders
  0.5: '4px',      // 0.5 unit
  1: '8px',        // 1 unit
  2: '16px',       // 2 units
  3: '24px',       // 3 units
  4: '32px',       // 4 units
  5: '40px',       // 5 units
  6: '48px',       // 6 units
  7: '56px',       // 7 units
  8: '64px',       // 8 units
  10: '80px',      // 10 units
  12: '96px',      // 12 units
  14: '112px',     // 14 units
  16: '128px',     // 16 units
  20: '160px',     // 20 units
  24: '192px',     // 24 units
  32: '256px',     // 32 units
} as const;

/**
 * Container sizes for consistent layout widths
 */
export const containers = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
} as const;

/**
 * Component-specific spacing
 */
export const componentSpacing = {
  // Button padding
  button: {
    sm: { x: spacing[2], y: spacing[1] },
    md: { x: spacing[3], y: spacing[2] },
    lg: { x: spacing[4], y: spacing[3] },
  },

  // Card padding
  card: {
    sm: spacing[4],
    md: spacing[6],
    lg: spacing[8],
  },

  // Input padding
  input: {
    sm: { x: spacing[2], y: spacing[1] },
    md: { x: spacing[3], y: spacing[2] },
    lg: { x: spacing[4], y: spacing[3] },
  },

  // Section spacing
  section: {
    sm: spacing[8],
    md: spacing[12],
    lg: spacing[16],
  },

  // Grid gaps
  grid: {
    xs: spacing[2],
    sm: spacing[3],
    md: spacing[4],
    lg: spacing[6],
    xl: spacing[8],
  },
} as const;

/**
 * Spacing utilities type
 */
export type SpacingKey = keyof typeof spacing;
export type ContainerKey = keyof typeof containers;

/**
 * Get spacing value
 * @param key - Spacing key
 * @returns Spacing value in pixels
 */
export const getSpacing = (key: SpacingKey): string => {
  return spacing[key];
};

/**
 * Get multiple of base spacing unit
 * @param multiplier - Number of base units
 * @returns Spacing value in pixels
 */
export const getSpacingMultiple = (multiplier: number): string => {
  return `${BASE_UNIT * multiplier}px`;
};

/**
 * Tailwind spacing class mappings
 * Use these for className-based styling
 */
export const spacingClasses = {
  // Padding
  'p-md-1': 'p-[8px]',
  'p-md-2': 'p-[16px]',
  'p-md-3': 'p-[24px]',
  'p-md-4': 'p-[32px]',
  'p-md-6': 'p-[48px]',
  'p-md-8': 'p-[64px]',

  // Margin
  'm-md-1': 'm-[8px]',
  'm-md-2': 'm-[16px]',
  'm-md-3': 'm-[24px]',
  'm-md-4': 'm-[32px]',
  'm-md-6': 'm-[48px]',
  'm-md-8': 'm-[64px]',

  // Gap
  'gap-md-2': 'gap-[16px]',
  'gap-md-3': 'gap-[24px]',
  'gap-md-4': 'gap-[32px]',
  'gap-md-6': 'gap-[48px]',
} as const;
