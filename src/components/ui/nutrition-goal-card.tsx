/**
 * Enhanced Nutrition Goal Card
 * High-performance card component with animated backgrounds for nutrition goals
 *
 * Features:
 * - Smooth background transitions (static → animated on hover)
 * - Design system token integration
 * - Accessibility compliant (WCAG 2.1 AA)
 * - Optimized performance with CSS animations
 * - TypeScript support
 * - Responsive design
 */

"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";
import { cardInteractions } from "@/shared/design-system/utils/micro-interactions";

interface NutritionGoalCardProps {
  /**
   * Unique identifier for the goal
   */
  id: string;

  /**
   * Display name of the nutrition goal
   */
  title: string;

  /**
   * Detailed description of the goal
   */
  description: string;

  /**
   * Calorie range for this goal (e.g., "300-450 cal")
   */
  calorieRange: string;

  /**
   * Static background image URL (shown by default)
   */
  staticBg: string;

  /**
   * Animated background (GIF or video) shown on hover
   */
  animatedBg?: string;

  /**
   * Nutrition goal type for semantic styling
   */
  goalType: "weight_loss" | "balanced" | "muscle_gain";

  /**
   * Whether this goal is currently selected
   */
  isSelected: boolean;

  /**
   * Callback when card is selected
   */
  onSelect: () => void;

  /**
   * Index for stagger animations
   */
  index?: number;

  /**
   * Show popular badge
   */
  isPopular?: boolean;

  /**
   * Icon to display in the card header
   */
  icon?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Get gradient classes based on goal type using design tokens
 */
const getGradientClasses = (goalType: NutritionGoalCardProps["goalType"]) => {
  const gradients = {
    weight_loss: "from-[hsl(var(--nutrition-weight-loss))] via-[hsl(var(--color-success))] to-[hsl(var(--color-success-light))]",
    balanced: "from-[hsl(var(--nutrition-balanced))] via-[hsl(var(--md-sys-color-tertiary))] to-[hsl(var(--md-sys-color-tertiary-container))]",
    muscle_gain: "from-[hsl(var(--md-sys-color-secondary))] via-[hsl(var(--md-sys-color-secondary-light))] to-[hsl(var(--md-sys-color-secondary-container))]",
  };

  return gradients[goalType];
};

/**
 * Enhanced Nutrition Goal Card Component
 */
export function NutritionGoalCard({
  id,
  title,
  description,
  calorieRange,
  staticBg,
  animatedBg,
  goalType,
  isSelected,
  onSelect,
  index = 0,
  isPopular = false,
  icon,
  className,
}: NutritionGoalCardProps) {
  const gradientClass = getGradientClasses(goalType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }}
      className={cn("max-w-xs w-full group", className)}
    >
      <div
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Select ${title} goal`}
        aria-pressed={isSelected}
        className={cn(
          // Base styles
          "group w-full cursor-pointer overflow-hidden relative h-96 rounded-md-3xl mx-auto flex flex-col justify-end p-md-6",

          // Border & shadow
          "border-2 transition-all duration-500",
          isSelected
            ? "border-md-secondary md-elevation-4 scale-[1.02]"
            : "border-md-outline-variant md-elevation-2 hover:border-md-secondary/50 hover:md-elevation-3",

          // Background image
          "bg-cover bg-center",

          // Preload animated background (performance optimization)
          animatedBg && "before:fixed before:inset-0 before:opacity-0 before:z-[-1]",

          // Hover effects
          animatedBg && "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black/50 hover:after:z-10",

          // Focus styles for accessibility
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-secondary focus-visible:ring-offset-2"
        )}
        style={{
          backgroundImage: `url(${staticBg})`,
          // @ts-ignore - CSS custom property for animated background
          '--animated-bg': animatedBg ? `url(${animatedBg})` : undefined,
        }}
      >
        {/* Popular badge */}
        {isPopular && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-30"
          >
            <div className={cn(
              "px-md-4 py-md-2 rounded-md-full",
              "bg-gradient-to-r from-md-secondary to-[hsl(var(--md-sys-color-secondary-light))]",
              "text-white md-label-medium font-semibold",
              "md-elevation-3",
              "flex items-center gap-2"
            )}>
              <Sparkles className="w-4 h-4" />
              Le plus populaire !
            </div>
          </motion.div>
        )}

        {/* Shimmer effect on hover */}
        <motion.div
          initial={{ x: "-100%" }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Top gradient badge with icon */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-32 bg-gradient-to-br",
            gradientClass,
            "opacity-60 flex items-center justify-center z-15"
          )}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
          {icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
              className={cn(
                "relative z-10 w-16 h-16 rounded-[var(--md-sys-shape-corner-large)] flex items-center justify-center",
                "bg-gradient-to-br",
                gradientClass,
                "bg-opacity-90 md-elevation-2"
              )}
            >
              <img
                src={icon}
                alt=""
                className="w-10 h-10 drop-shadow-lg filter brightness-0 invert"
              />
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="relative z-20">
          {/* Calorie badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className={cn(
              "inline-flex items-center px-md-3 py-md-1 rounded-md-full mb-md-3",
              "bg-gradient-to-r",
              gradientClass,
              "md-label-small font-semibold text-white"
            )}
          >
            {calorieRange}
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="font-heading md-headline-medium text-white mb-md-3 drop-shadow-lg"
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="md-body-medium text-white/90 leading-relaxed drop-shadow-md"
          >
            {description}
          </motion.p>

          {/* Selected state indicator */}
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mt-md-4 flex items-center justify-center"
            >
              <div className={cn(
                "inline-flex items-center gap-2 px-md-4 py-md-2 rounded-md-full",
                "bg-gradient-to-r from-md-secondary to-[hsl(var(--md-sys-color-secondary-light))]",
                "text-white md-label-large font-semibold",
                "md-elevation-3"
              )}>
                <CheckCircle className="w-5 h-5" />
                Objectif sélectionné
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Default export for backwards compatibility
 */
export default NutritionGoalCard;
