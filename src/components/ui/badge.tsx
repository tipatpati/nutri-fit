import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Material Design 3 Badge/Chip
  "inline-flex items-center rounded-md-xs border px-md-2 py-md-1 md-label-small font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        // Material Design 3 variants
        filled: "border-transparent bg-md-primary text-md-primary-on-primary hover:bg-md-primary/90",
        "filled-tonal": "border-transparent bg-md-secondary-container text-md-secondary-on-container hover:bg-md-secondary-container/80",
        outlined: "border-md-outline text-md-surface-on-surface bg-transparent hover:bg-md-surface-on-surface/8",
        // Legacy variants for backward compatibility
        default: "border-transparent bg-md-primary text-md-primary-on-primary hover:bg-md-primary/90",
        secondary: "border-transparent bg-md-secondary-container text-md-secondary-on-container hover:bg-md-secondary-container/80",
        destructive: "border-transparent bg-md-error text-md-error-on-error hover:bg-md-error/90",
        outline: "border-md-outline text-md-surface-on-surface bg-transparent",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
