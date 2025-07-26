import { motion } from 'framer-motion';
import * as React from 'react';

// Base animated icon component that can be used for custom animations
interface AnimatedIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  children: React.ReactNode;
}

export const AnimatedIcon = React.forwardRef<SVGSVGElement, AnimatedIconProps>(
  ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '', children, ...props }, ref) => {
    return (
      <motion.svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.svg>
    );
  }
);

AnimatedIcon.displayName = 'AnimatedIcon';

// Animated Plus Icon
export const AnimatedPlus = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <AnimatedIcon size={size} color={color} strokeWidth={strokeWidth} className={className}>
    <motion.path
      d="M5 12h14"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
    <motion.path
      d="M12 5v14"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
    />
  </AnimatedIcon>
);

// Animated Heart Icon
export const AnimatedHeart = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <AnimatedIcon size={size} color={color} strokeWidth={strokeWidth} className={className}>
    <motion.path
      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"
      initial={{ scale: 0, pathLength: 0 }}
      animate={{ scale: 1, pathLength: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.1,
        fill: color,
        transition: { duration: 0.2 }
      }}
    />
  </AnimatedIcon>
);

// Animated Search Icon
export const AnimatedSearch = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <AnimatedIcon size={size} color={color} strokeWidth={strokeWidth} className={className}>
    <motion.circle
      cx="11"
      cy="11"
      r="8"
      initial={{ scale: 0, pathLength: 0 }}
      animate={{ scale: 1, pathLength: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    />
    <motion.path
      d="m21 21-4.35-4.35"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
    />
  </AnimatedIcon>
);

// Animated Arrow Right Icon
export const AnimatedArrowRight = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <AnimatedIcon size={size} color={color} strokeWidth={strokeWidth} className={className}>
    <motion.path
      d="M5 12h14"
      initial={{ pathLength: 0, x: -10 }}
      animate={{ pathLength: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ x: 3, transition: { duration: 0.2 } }}
    />
    <motion.path
      d="m12 5 7 7-7 7"
      initial={{ pathLength: 0, x: -10 }}
      animate={{ pathLength: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      whileHover={{ x: 3, transition: { duration: 0.2 } }}
    />
  </AnimatedIcon>
);

// Animated Star Icon
export const AnimatedStar = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <AnimatedIcon size={size} color={color} strokeWidth={strokeWidth} className={className}>
    <motion.polygon
      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.1,
        fill: "#fbbf24",
        transition: { duration: 0.2 }
      }}
    />
  </AnimatedIcon>
);

// Animated Menu Icon with hamburger animation
export const AnimatedMenu = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '', isOpen = false }) => (
  <AnimatedIcon size={size} color={color} strokeWidth={strokeWidth} className={className}>
    <motion.path
      d="M3 12h18"
      animate={{ 
        rotate: isOpen ? 45 : 0,
        y: isOpen ? 0 : -6
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
    <motion.path
      d="M3 6h18"
      animate={{ 
        opacity: isOpen ? 0 : 1,
        x: isOpen ? 20 : 0
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
    <motion.path
      d="M3 18h18"
      animate={{ 
        rotate: isOpen ? -45 : 0,
        y: isOpen ? 0 : 6
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  </AnimatedIcon>
);

// Animated Shopping Cart
export const AnimatedShoppingCart = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <AnimatedIcon size={size} color={color} strokeWidth={strokeWidth} className={className}>
    <motion.circle
      cx="8"
      cy="21"
      r="1"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    />
    <motion.circle
      cx="19"
      cy="21"
      r="1"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    />
    <motion.path
      d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        y: -2,
        transition: { duration: 0.2 }
      }}
    />
  </AnimatedIcon>
);

// Animated Check Icon
export const AnimatedCheck = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <AnimatedIcon size={size} color={color} strokeWidth={strokeWidth} className={className}>
    <motion.path
      d="M20 6 9 17l-5-5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
    />
  </AnimatedIcon>
);

// Animated User Icon
export const AnimatedUser = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <AnimatedIcon size={size} color={color} strokeWidth={strokeWidth} className={className}>
    <motion.path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
    />
    <motion.circle
      cx="12"
      cy="7"
      r="4"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  </AnimatedIcon>
);

// Animated Settings Icon
export const AnimatedSettings = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <AnimatedIcon size={size} color={color} strokeWidth={strokeWidth} className={className}>
    <motion.circle
      cx="12"
      cy="12"
      r="3"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
    <motion.path
      d="m12 1 3 6 6 3-6 3-3 6-3-6-6-3 6-3Z"
      initial={{ rotate: -90, scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ 
        rotate: 90,
        transition: { duration: 0.3 }
      }}
    />
  </AnimatedIcon>
);

// Animated Clock Icon
export const AnimatedClock = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <AnimatedIcon size={size} color={color} strokeWidth={strokeWidth} className={className}>
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    />
    <motion.polyline
      points="12,6 12,12 16,14"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
    />
  </AnimatedIcon>
);

// Animated Edit Icon
export const AnimatedEdit = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <AnimatedIcon size={size} color={color} strokeWidth={strokeWidth} className={className}>
    <motion.path
      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    />
    <motion.path
      d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"
      initial={{ pathLength: 0, y: -5 }}
      animate={{ pathLength: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      whileHover={{
        y: -2,
        transition: { duration: 0.2 }
      }}
    />
  </AnimatedIcon>
);

// Animated X (Close) Icon
export const AnimatedX = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <AnimatedIcon size={size} color={color} strokeWidth={strokeWidth} className={className}>
    <motion.path
      d="m18 6-12 12"
      initial={{ pathLength: 0, rotate: -45 }}
      animate={{ pathLength: 1, rotate: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
    <motion.path
      d="m6 6 12 12"
      initial={{ pathLength: 0, rotate: 45 }}
      animate={{ pathLength: 1, rotate: 0 }}
      transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
    />
  </AnimatedIcon>
);

// Animated Trash Icon
export const AnimatedTrash = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <AnimatedIcon size={size} color={color} strokeWidth={strokeWidth} className={className}>
    <motion.path
      d="M3 6h18"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
    <motion.path
      d="m19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      whileHover={{
        y: 2,
        transition: { duration: 0.2 }
      }}
    />
    <motion.path
      d="m8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
    />
    <motion.line
      x1="10"
      x2="10"
      y1="11"
      y2="17"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
    />
    <motion.line
      x1="14"
      x2="14"
      y1="11"
      y2="17"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.2, delay: 0.35, ease: "easeOut" }}
    />
  </AnimatedIcon>
);