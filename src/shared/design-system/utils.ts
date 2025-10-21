/**
 * Design System Utility Helpers
 * Helper functions for working with the design system
 */

import { colors, spacing, shapes, elevations, motion, typography } from './tokens';

/**
 * Get spacing value by key
 */
export const getSpacing = (key: keyof typeof spacing) => spacing[key];

/**
 * Get color value by path
 */
export const getColor = (category: keyof typeof colors, shade: string) => {
  const colorCategory = colors[category];
  return (colorCategory as any)[shade] || colorCategory;
};

/**
 * Get shape/border radius by key
 */
export const getShape = (key: keyof typeof shapes) => shapes[key];

/**
 * Get elevation/shadow by level
 */
export const getElevation = (level: keyof typeof elevations) => elevations[level];

/**
 * Get motion easing by type
 */
export const getEasing = (type: keyof typeof motion.easing) => motion.easing[type];

/**
 * Get motion duration by type
 */
export const getDuration = (type: keyof typeof motion.duration) => motion.duration[type];

/**
 * Get typography class by scale
 */
export const getTypography = (
  category: keyof typeof typography,
  size: 'large' | 'medium' | 'small'
) => typography[category][size];

/**
 * Build transition string with MD3 motion tokens
 */
export const buildTransition = (
  property: string,
  durationType: keyof typeof motion.duration = 'medium2',
  easingType: keyof typeof motion.easing = 'standard'
) => {
  return `${property} ${motion.duration[durationType]} ${motion.easing[easingType]}`;
};

/**
 * Category colors for meals (legacy compatibility)
 */
export const categoryColors = {
  'Prise de masse': '#FF4D00',
  'Minceur': '#113B39',
  'Équilibré': '#D4B961',
} as const;

export const getCategoryColor = (category: string): { bg: string; text: string; hex: string } => {
  const colorMap = {
    'Prise de masse': { bg: 'bg-gradient-to-r from-orange-500 to-red-500', text: 'text-white', hex: '#FF4D00' },
    'Minceur': { bg: 'bg-gradient-to-r from-emerald-600 to-emerald-700', text: 'text-white', hex: '#113B39' },
    'Équilibré': { bg: 'bg-gradient-to-r from-yellow-500 to-amber-500', text: 'text-white', hex: '#D4B961' },
  };
  return colorMap[category as keyof typeof colorMap] || colorMap['Équilibré'];
};
