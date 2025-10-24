/**
 * Enhanced Skeleton Loaders
 * Beautiful loading states for content
 */

import { motion } from 'framer-motion';
import { UtensilsCrossed, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  lines?: number;
  animated?: boolean;
}

/**
 * Base skeleton component
 */
const BaseSkeleton = ({ className, animated = true }: { className?: string; animated?: boolean }) => (
  <div
    className={cn(
      'bg-md-surface-variant rounded-md-sm',
      animated && 'animate-pulse',
      className
    )}
  />
);

/**
 * Text skeleton - For text content
 */
export const TextSkeleton = ({ lines = 1, className }: SkeletonProps) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <BaseSkeleton
        key={i}
        className="h-4"
        style={{ width: `${100 - (i * 10)}%` }}
      />
    ))}
  </div>
);

/**
 * Card skeleton - Generic card placeholder
 */
export const CardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn('glass-card p-md-6 space-y-4', className)}>
    <BaseSkeleton className="h-48 rounded-md-lg" />
    <div className="space-y-2">
      <BaseSkeleton className="h-6 w-3/4" />
      <BaseSkeleton className="h-4 w-1/2" />
    </div>
  </div>
);

/**
 * Meal card skeleton - Specific for meal cards
 */
export const MealCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="glass-card overflow-hidden"
  >
    {/* Image placeholder with icon */}
    <div className="h-56 bg-gradient-to-br from-md-surface-variant to-md-surface-container-high relative overflow-hidden">
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <UtensilsCrossed className="w-16 h-16 text-md-outline-variant/50" />
      </div>
    </div>

    {/* Content */}
    <div className="p-md-6 space-y-4">
      <BaseSkeleton className="h-7 w-4/5" />
      <BaseSkeleton className="h-4 w-2/3" />

      {/* Nutrition badges */}
      <div className="flex gap-2">
        <BaseSkeleton className="h-8 w-20 rounded-md-full" />
        <BaseSkeleton className="h-8 w-20 rounded-md-full" />
        <BaseSkeleton className="h-8 w-20 rounded-md-full" />
      </div>

      {/* Button */}
      <BaseSkeleton className="h-12 rounded-md-lg" />
    </div>
  </motion.div>
);

/**
 * Order card skeleton - For order history
 */
export const OrderCardSkeleton = () => (
  <div className="glass-card p-md-6 space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <BaseSkeleton className="w-12 h-12 rounded-md-full" />
        <div className="space-y-2">
          <BaseSkeleton className="h-5 w-32" />
          <BaseSkeleton className="h-4 w-24" />
        </div>
      </div>
      <BaseSkeleton className="h-8 w-24 rounded-md-full" />
    </div>

    <div className="space-y-2">
      <BaseSkeleton className="h-4 w-full" />
      <BaseSkeleton className="h-4 w-3/4" />
    </div>

    <div className="flex gap-2">
      <BaseSkeleton className="h-10 flex-1 rounded-md-lg" />
      <BaseSkeleton className="h-10 flex-1 rounded-md-lg" />
    </div>
  </div>
);

/**
 * Profile skeleton - For profile pages
 */
export const ProfileSkeleton = () => (
  <div className="space-y-md-6">
    {/* Header */}
    <div className="glass-card p-md-8">
      <div className="flex items-center gap-6">
        <BaseSkeleton className="w-24 h-24 rounded-md-full" />
        <div className="flex-1 space-y-3">
          <BaseSkeleton className="h-8 w-48" />
          <BaseSkeleton className="h-5 w-64" />
          <div className="flex gap-4">
            <BaseSkeleton className="h-10 w-32 rounded-md-lg" />
            <BaseSkeleton className="h-10 w-32 rounded-md-lg" />
          </div>
        </div>
      </div>
    </div>

    {/* Content sections */}
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="glass-card p-md-6 space-y-4">
        <BaseSkeleton className="h-6 w-40" />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, j) => (
            <div key={j} className="space-y-2">
              <BaseSkeleton className="h-4 w-20" />
              <BaseSkeleton className="h-5 w-32" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

/**
 * List skeleton - For lists
 */
export const ListSkeleton = ({ items = 5 }: { items?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="glass-card p-md-4 flex items-center gap-4">
        <BaseSkeleton className="w-12 h-12 rounded-md-md" />
        <div className="flex-1 space-y-2">
          <BaseSkeleton className="h-5 w-3/4" />
          <BaseSkeleton className="h-4 w-1/2" />
        </div>
        <BaseSkeleton className="w-20 h-8 rounded-md-sm" />
      </div>
    ))}
  </div>
);

/**
 * Table skeleton - For data tables
 */
export const TableSkeleton = ({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) => (
  <div className="glass-card overflow-hidden">
    {/* Header */}
    <div className="p-md-4 border-b border-md-outline-variant">
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, i) => (
          <BaseSkeleton key={i} className="h-5 w-24" />
        ))}
      </div>
    </div>

    {/* Rows */}
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="p-md-4 border-b border-md-outline-variant last:border-0">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((_, j) => (
            <BaseSkeleton key={j} className="h-4 w-full" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

/**
 * Page skeleton - Full page loader
 */
export const PageSkeleton = () => (
  <div className="min-h-screen bg-md-surface p-md-6 space-y-md-6">
    {/* Header */}
    <div className="max-w-7xl mx-auto">
      <BaseSkeleton className="h-16 rounded-md-lg mb-md-8" />

      {/* Title section */}
      <div className="mb-md-8">
        <BaseSkeleton className="h-12 w-96 mb-md-4" />
        <BaseSkeleton className="h-6 w-64" />
      </div>

      {/* Grid content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

/**
 * Skeleton namespace for convenient access
 */
export const Skeleton = {
  Text: TextSkeleton,
  Card: CardSkeleton,
  MealCard: MealCardSkeleton,
  OrderCard: OrderCardSkeleton,
  Profile: ProfileSkeleton,
  List: ListSkeleton,
  Table: TableSkeleton,
  Page: PageSkeleton,
};
