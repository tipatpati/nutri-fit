/**
 * Design System Index
 * Central export point for all design system utilities
 */

export * from './tokens';
export * from './utils';

// Re-export commonly used utilities
export { colors, spacing, shapes, elevations, motion, typography } from './tokens';
export { 
  getSpacing, 
  getColor, 
  getShape, 
  getElevation, 
  getEasing, 
  getDuration, 
  getTypography,
  buildTransition,
  getCategoryColor 
} from './utils';
