/**
 * Motion System
 * Material Design 3 animation tokens and utilities
 * @module design-system/tokens/motion
 */

import type { Transition, Variants } from 'framer-motion';

/**
 * Material Design 3 Easing Functions
 * Use these for consistent, purposeful motion
 */
export const easing = {
  // Standard easing for most transitions
  standard: 'cubic-bezier(0.2, 0, 0, 1)',

  // Emphasized easing for important transitions
  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',

  // Decelerate - Elements exiting/appearing
  decelerated: 'cubic-bezier(0.05, 0.7, 0.1, 1)',

  // Accelerate - Elements disappearing
  accelerated: 'cubic-bezier(0.3, 0, 0.8, 0.15)',

  // Linear - Continuous animations
  linear: 'linear',
} as const;

/**
 * Duration tokens
 * Based on Material Design 3 motion guidelines
 */
export const duration = {
  instant: 50,      // Immediate feedback
  quick: 100,       // Quick transitions
  fast: 150,        // Fast interactions
  normal: 200,      // Standard transitions
  moderate: 250,    // Moderate emphasis
  slow: 300,        // Emphasized transitions
  slower: 400,      // Major changes
  slowest: 500,     // Dramatic changes
} as const;

/**
 * Spring configurations for Framer Motion
 * Natural, physics-based animations
 */
export const spring = {
  // Gentle spring - Subtle animations
  gentle: {
    type: 'spring' as const,
    stiffness: 120,
    damping: 14,
    mass: 0.8,
  },

  // Bouncy spring - Playful animations
  bouncy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
    mass: 0.8,
  },

  // Snappy spring - Quick, responsive
  snappy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
    mass: 1,
  },

  // Smooth spring - Smooth, fluid
  smooth: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
    mass: 1,
  },
} as const;

/**
 * Animation presets for common patterns
 */
export const presets = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration.normal / 1000 },
  } as Variants,

  fadeOut: {
    initial: { opacity: 1 },
    animate: { opacity: 0 },
    exit: { opacity: 1 },
    transition: { duration: duration.normal / 1000 },
  } as Variants,

  // Slide animations
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: spring.snappy,
  } as Variants,

  slideDown: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
    transition: spring.snappy,
  } as Variants,

  slideRight: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
    transition: spring.snappy,
  } as Variants,

  slideLeft: {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
    transition: spring.snappy,
  } as Variants,

  // Scale animations
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: spring.bouncy,
  } as Variants,

  scaleOut: {
    initial: { scale: 1, opacity: 1 },
    animate: { scale: 0.9, opacity: 0 },
    exit: { scale: 1, opacity: 1 },
    transition: spring.snappy,
  } as Variants,

  // Combined animations
  fadeScaleIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: spring.smooth,
  } as Variants,

  // Pop animation (scale with bounce)
  pop: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
    transition: spring.bouncy,
  } as Variants,
} as const;

/**
 * Hover and tap interactions
 */
export const interactions = {
  // Button press
  buttonPress: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: duration.quick / 1000 },
  },

  // Card hover
  cardHover: {
    whileHover: {
      y: -4,
      scale: 1.01,
      transition: spring.gentle,
    },
  },

  // Lift effect
  lift: {
    whileHover: {
      y: -8,
      transition: spring.gentle,
    },
  },

  // Subtle scale
  subtleScale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: spring.snappy,
  },

  // Glow effect (for use with CSS)
  glow: {
    whileHover: {
      boxShadow: '0 0 20px rgba(222, 110, 39, 0.3)',
      transition: { duration: duration.normal / 1000 },
    },
  },
} as const;

/**
 * Stagger configurations for list animations
 */
export const stagger = {
  // Quick stagger
  quick: {
    delayChildren: 0.05,
    staggerChildren: 0.02,
  },

  // Normal stagger
  normal: {
    delayChildren: 0.1,
    staggerChildren: 0.05,
  },

  // Slow stagger
  slow: {
    delayChildren: 0.2,
    staggerChildren: 0.1,
  },
} as const;

/**
 * Page transition variants
 */
export const pageTransitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration.slow / 1000 },
  } as Variants,

  slide: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: spring.smooth,
  } as Variants,

  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: spring.smooth,
  } as Variants,
} as const;

/**
 * Loading animation variants
 */
export const loadingAnimations = {
  pulse: {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: easing.standard,
      },
    },
  },

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

  bounce: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: easing.emphasized,
      },
    },
  },
} as const;

/**
 * Build custom transition
 * @param durationMs - Duration in milliseconds
 * @param easingFunc - Easing function
 * @returns Transition object
 */
export const buildTransition = (
  durationMs: number = duration.normal,
  easingFunc: string = easing.standard
): Transition => ({
  duration: durationMs / 1000,
  ease: easingFunc,
});

/**
 * Get stagger delay for item
 * @param index - Item index
 * @param baseDelay - Base delay in ms
 * @returns Delay in seconds
 */
export const getStaggerDelay = (index: number, baseDelay: number = 50): number => {
  return (index * baseDelay) / 1000;
};
