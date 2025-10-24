/**
 * Enhanced Typography System
 * Material Design 3 type scale with responsive sizing
 * @module design-system/tokens/typography
 */

/**
 * Font family configuration
 */
export const fontFamilies = {
  heading: 'var(--font-heading)',  // Outfit
  body: 'var(--font-body)',        // Inter
  script: 'var(--font-script)',    // Caveat
  mono: 'var(--font-mono)',        // JetBrains Mono
} as const;

/**
 * Font weights
 */
export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Material Design 3 Type Scale
 * Includes responsive sizing for mobile
 */
export const typeScale = {
  // Display - Large, expressive headlines
  display: {
    large: {
      fontSize: '57px',
      lineHeight: '64px',
      letterSpacing: '-0.25px',
      fontWeight: fontWeights.regular,
      fontFamily: fontFamilies.heading,
      mobile: {
        fontSize: '36px',
        lineHeight: '40px',
      },
    },
    medium: {
      fontSize: '45px',
      lineHeight: '52px',
      letterSpacing: '0px',
      fontWeight: fontWeights.regular,
      fontFamily: fontFamilies.heading,
      mobile: {
        fontSize: '32px',
        lineHeight: '36px',
      },
    },
    small: {
      fontSize: '36px',
      lineHeight: '44px',
      letterSpacing: '0px',
      fontWeight: fontWeights.regular,
      fontFamily: fontFamilies.heading,
      mobile: {
        fontSize: '28px',
        lineHeight: '32px',
      },
    },
  },

  // Headline - High-emphasis text
  headline: {
    large: {
      fontSize: '32px',
      lineHeight: '40px',
      letterSpacing: '0px',
      fontWeight: fontWeights.medium,
      fontFamily: fontFamilies.heading,
      mobile: {
        fontSize: '28px',
        lineHeight: '36px',
      },
    },
    medium: {
      fontSize: '28px',
      lineHeight: '36px',
      letterSpacing: '0px',
      fontWeight: fontWeights.medium,
      fontFamily: fontFamilies.heading,
      mobile: {
        fontSize: '24px',
        lineHeight: '32px',
      },
    },
    small: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '0px',
      fontWeight: fontWeights.medium,
      fontFamily: fontFamilies.heading,
      mobile: {
        fontSize: '20px',
        lineHeight: '28px',
      },
    },
  },

  // Title - Medium-emphasis text
  title: {
    large: {
      fontSize: '22px',
      lineHeight: '28px',
      letterSpacing: '0px',
      fontWeight: fontWeights.semibold,
      fontFamily: fontFamilies.body,
    },
    medium: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      fontWeight: fontWeights.semibold,
      fontFamily: fontFamilies.body,
    },
    small: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.1px',
      fontWeight: fontWeights.semibold,
      fontFamily: fontFamilies.body,
    },
  },

  // Label - UI labels
  label: {
    large: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.1px',
      fontWeight: fontWeights.medium,
      fontFamily: fontFamilies.body,
    },
    medium: {
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0.5px',
      fontWeight: fontWeights.medium,
      fontFamily: fontFamilies.body,
    },
    small: {
      fontSize: '11px',
      lineHeight: '16px',
      letterSpacing: '0.5px',
      fontWeight: fontWeights.medium,
      fontFamily: fontFamilies.body,
    },
  },

  // Body - Content text
  body: {
    large: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.5px',
      fontWeight: fontWeights.regular,
      fontFamily: fontFamilies.body,
    },
    medium: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.25px',
      fontWeight: fontWeights.regular,
      fontFamily: fontFamilies.body,
    },
    small: {
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0.4px',
      fontWeight: fontWeights.regular,
      fontFamily: fontFamilies.body,
    },
  },
} as const;

/**
 * Font feature settings for better rendering
 */
export const fontFeatures = {
  heading: {
    fontFeatureSettings: `'liga' 1, 'kern' 1`,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    textRendering: 'optimizeLegibility',
  },
  body: {
    fontFeatureSettings: `'liga' 1, 'kern' 1`,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  script: {
    fontFeatureSettings: `'liga' 1, 'kern' 1, 'swsh' 1`,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  mono: {
    fontFeatureSettings: `'liga' 0, 'calt' 0`,
    WebkitFontSmoothing: 'subpixel-antialiased',
  },
} as const;

/**
 * Typography type definitions
 */
export type TypeCategory = keyof typeof typeScale;
export type TypeSize = 'large' | 'medium' | 'small';
export type TypePath = `${TypeCategory}.${TypeSize}`;

/**
 * Get typography styles by path
 * @param category - Type category (display, headline, title, etc.)
 * @param size - Size variant (large, medium, small)
 * @returns Typography style object
 */
export const getTypography = (category: TypeCategory, size: TypeSize) => {
  return typeScale[category][size];
};

/**
 * Generate CSS class name for typography
 * @param category - Type category
 * @param size - Size variant
 * @returns CSS class name
 */
export const getTypographyClass = (category: TypeCategory, size: TypeSize): string => {
  return `md-${category}-${size}`;
};

/**
 * Typography utility classes mapping
 */
export const typographyClasses = {
  // Display
  'display-large': 'md-display-large',
  'display-medium': 'md-display-medium',
  'display-small': 'md-display-small',

  // Headline
  'headline-large': 'md-headline-large',
  'headline-medium': 'md-headline-medium',
  'headline-small': 'md-headline-small',

  // Title
  'title-large': 'md-title-large',
  'title-medium': 'md-title-medium',
  'title-small': 'md-title-small',

  // Label
  'label-large': 'md-label-large',
  'label-medium': 'md-label-medium',
  'label-small': 'md-label-small',

  // Body
  'body-large': 'md-body-large',
  'body-medium': 'md-body-medium',
  'body-small': 'md-body-small',
} as const;

/**
 * Responsive typography utility
 * Automatically adjusts font size based on viewport
 */
export const getResponsiveType = (category: TypeCategory, size: TypeSize) => {
  const styles = typeScale[category][size];

  return {
    fontSize: styles.mobile?.fontSize || styles.fontSize,
    lineHeight: styles.mobile?.lineHeight || styles.lineHeight,
    letterSpacing: styles.letterSpacing,
    fontWeight: styles.fontWeight,
    fontFamily: styles.fontFamily,
    '@media (min-width: 768px)': {
      fontSize: styles.fontSize,
      lineHeight: styles.lineHeight,
    },
  };
};
