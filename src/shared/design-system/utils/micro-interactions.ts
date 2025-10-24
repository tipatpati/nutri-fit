/**
 * Micro-interactions Library
 * Pre-defined interaction patterns for common UI elements
 * @module design-system/utils/micro-interactions
 */

import { duration, spring, easing } from '../tokens/motion';
import type { TargetAndTransition, VariantLabels } from 'framer-motion';

/**
 * Button micro-interactions
 */
export const buttonInteractions = {
  // Standard button press
  press: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: {
      duration: duration.quick / 1000,
      ease: easing.emphasized,
    },
  },

  // Filled button with glow
  glowPress: {
    whileHover: {
      scale: 1.02,
      boxShadow: '0 8px 24px rgba(222, 110, 39, 0.3)',
    },
    whileTap: { scale: 0.98 },
    transition: spring.snappy,
  },

  // Icon button
  iconPress: {
    whileHover: { scale: 1.1, rotate: 5 },
    whileTap: { scale: 0.9, rotate: -5 },
    transition: spring.bouncy,
  },

  // Pulse effect (for attention)
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: duration.slower / 1000,
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
  },
} as const;

/**
 * Card micro-interactions
 */
export const cardInteractions = {
  // Hover lift effect
  hover: {
    whileHover: {
      y: -4,
      scale: 1.01,
      transition: spring.gentle,
    },
  },

  // Hover with shadow
  hoverShadow: {
    whileHover: {
      y: -6,
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
      transition: spring.gentle,
    },
  },

  // Interactive card (clickable)
  interactive: {
    whileHover: {
      y: -4,
      scale: 1.01,
      transition: spring.gentle,
    },
    whileTap: {
      scale: 0.99,
      y: 0,
    },
  },

  // Tilt effect on hover
  tilt: {
    whileHover: {
      rotateY: 5,
      rotateX: -5,
      transition: spring.smooth,
    },
  },
} as const;

/**
 * Input field micro-interactions
 */
export const inputInteractions = {
  // Focus animation
  focus: {
    whileFocus: {
      scale: 1.01,
      borderColor: 'hsl(var(--brand-secondary))',
      transition: {
        duration: duration.fast / 1000,
      },
    },
  },

  // Error shake
  errorShake: {
    animate: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: duration.moderate / 1000,
      },
    },
  },

  // Success pulse
  successPulse: {
    animate: {
      borderColor: ['hsl(var(--color-success))', 'hsl(var(--color-success-light))', 'hsl(var(--color-success))'],
      transition: {
        duration: duration.slower / 1000,
      },
    },
  },
} as const;

/**
 * List item micro-interactions
 */
export const listItemInteractions = {
  // Hover highlight
  hover: {
    whileHover: {
      backgroundColor: 'rgba(222, 110, 39, 0.05)',
      paddingLeft: '1rem',
      transition: {
        duration: duration.fast / 1000,
      },
    },
  },

  // Swipe actions
  swipe: {
    drag: 'x' as const,
    dragConstraints: { left: -100, right: 0 },
    dragElastic: 0.2,
  },
} as const;

/**
 * Modal/Dialog micro-interactions
 */
export const modalInteractions = {
  // Backdrop fade
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: duration.normal / 1000,
    },
  },

  // Modal scale up
  scaleUp: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: spring.smooth,
  },

  // Slide from bottom (mobile-friendly)
  slideBottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
    transition: spring.snappy,
  },
} as const;

/**
 * Badge/Chip micro-interactions
 */
export const badgeInteractions = {
  // Pop in
  popIn: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
    transition: spring.bouncy,
  },

  // Remove animation
  removeSlide: {
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        duration: duration.normal / 1000,
      },
    },
  },
} as const;

/**
 * Image micro-interactions
 */
export const imageInteractions = {
  // Zoom on hover
  zoomHover: {
    whileHover: {
      scale: 1.05,
      transition: spring.gentle,
    },
  },

  // Ken Burns effect (slow zoom and pan)
  kenBurns: {
    animate: {
      scale: [1, 1.1],
      x: [0, -20],
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: easing.linear,
      },
    },
  },

  // Fade in on load
  fadeInOnLoad: {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: duration.slow / 1000,
      ease: easing.decelerated,
    },
  },
} as const;

/**
 * Icon micro-interactions
 */
export const iconInteractions = {
  // Rotate on hover
  rotateHover: {
    whileHover: { rotate: 90 },
    transition: spring.snappy,
  },

  // Bounce
  bounce: {
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: duration.moderate / 1000,
        repeat: Infinity,
        ease: easing.emphasized,
      },
    },
  },

  // Spin (for loading)
  spin: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: easing.linear,
      },
    },
  },

  // Pulse scale
  pulseScale: {
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: duration.slower / 1000,
        repeat: Infinity,
        ease: easing.emphasized,
      },
    },
  },
} as const;

/**
 * Notification/Toast micro-interactions
 */
export const notificationInteractions = {
  // Slide from right
  slideRight: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
    transition: spring.snappy,
  },

  // Slide from top
  slideTop: {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
    transition: spring.snappy,
  },

  // Shake (for errors)
  shake: {
    animate: {
      x: [-5, 5, -5, 5, 0],
      transition: {
        duration: duration.moderate / 1000,
      },
    },
  },
} as const;

/**
 * Navigation micro-interactions
 */
export const navInteractions = {
  // Menu item hover
  menuItemHover: {
    whileHover: {
      x: 4,
      backgroundColor: 'rgba(222, 110, 39, 0.05)',
      transition: {
        duration: duration.fast / 1000,
      },
    },
  },

  // Underline animation
  underline: {
    whileHover: {
      scaleX: 1,
      transition: {
        duration: duration.normal / 1000,
      },
    },
    initial: { scaleX: 0 },
  },

  // Tab indicator slide
  tabIndicator: {
    layoutId: 'tabIndicator',
    transition: spring.snappy,
  },
} as const;

/**
 * Combine multiple interactions
 * @param interactions - Array of interaction objects
 * @returns Combined interaction object
 */
export const combineInteractions = (...interactions: any[]) => {
  return interactions.reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

/**
 * Create ripple effect data
 * @param x - Click X position
 * @param y - Click Y position
 * @returns Ripple animation config
 */
export const createRipple = (x: number, y: number) => ({
  initial: {
    scale: 0,
    opacity: 0.5,
    x,
    y,
  },
  animate: {
    scale: 4,
    opacity: 0,
    transition: {
      duration: duration.slower / 1000,
      ease: easing.decelerated,
    },
  },
});
