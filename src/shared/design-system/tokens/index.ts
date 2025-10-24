/**
 * Design System Tokens
 * Unified export for all design tokens
 * @module design-system/tokens
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './motion';

// Re-export commonly used tokens for convenience
export {
  colorTokens,
  getColor,
  type ColorPath,
  type ColorCategory,
} from './colors';

export {
  typeScale,
  getTypography,
  getTypographyClass,
  fontFamilies,
  fontWeights,
  type TypeCategory,
  type TypeSize,
  type TypePath,
} from './typography';

export {
  spacing,
  containers,
  componentSpacing,
  getSpacing,
  getSpacingMultiple,
  BASE_UNIT,
  type SpacingKey,
  type ContainerKey,
} from './spacing';

export {
  easing,
  duration,
  spring,
  presets as motionPresets,
  interactions as motionInteractions,
  stagger,
  pageTransitions,
  loadingAnimations,
  buildTransition,
  getStaggerDelay,
} from './motion';
