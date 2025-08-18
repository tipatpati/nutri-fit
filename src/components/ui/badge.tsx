import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Material Design 3 Badge/Chip
  "inline-flex items-center rounded-[8px] border px-3 py-1 md-label-small font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        // Material Design 3 variants
        filled: "border-transparent bg-[hsl(var(--md-sys-color-primary))] text-[hsl(var(--md-sys-color-on-primary))] hover:bg-[hsl(var(--md-sys-color-primary))]/90",
        "filled-tonal": "border-transparent bg-[hsl(var(--md-sys-color-secondary-container))] text-[hsl(var(--md-sys-color-on-secondary-container))] hover:bg-[hsl(var(--md-sys-color-secondary-container))]/80",
        outlined: "border-[hsl(var(--md-sys-color-outline))] text-[hsl(var(--md-sys-color-on-surface))] bg-transparent hover:bg-[hsl(var(--md-sys-color-on-surface))]/8",
        // Legacy variants for backward compatibility
        default: "border-transparent bg-[hsl(var(--md-sys-color-primary))] text-[hsl(var(--md-sys-color-on-primary))] hover:bg-[hsl(var(--md-sys-color-primary))]/90",
        secondary: "border-transparent bg-[hsl(var(--md-sys-color-secondary-container))] text-[hsl(var(--md-sys-color-on-secondary-container))] hover:bg-[hsl(var(--md-sys-color-secondary-container))]/80",
        destructive: "border-transparent bg-[hsl(var(--md-sys-color-error))] text-[hsl(var(--md-sys-color-on-error))] hover:bg-[hsl(var(--md-sys-color-error))]/90",
        outline: "border-[hsl(var(--md-sys-color-outline))] text-[hsl(var(--md-sys-color-on-surface))] bg-transparent",
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
