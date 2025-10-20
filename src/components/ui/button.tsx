import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium relative overflow-hidden transition-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-38 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 md-state-layer active:scale-95",
  {
    variants: {
      variant: {
        // Material Design 3 Filled Button
        filled: "bg-md-primary text-md-primary-on-primary hover:shadow-md md-elevation-1 hover:md-elevation-2 rounded-[20px] px-md-3 py-md-2 md-label-large hover:brightness-110",
        // Material Design 3 Filled Tonal Button
        "filled-tonal": "bg-md-secondary-container text-md-secondary-on-container hover:shadow-md md-elevation-1 hover:md-elevation-2 rounded-[20px] px-md-3 py-md-2 md-label-large hover:brightness-110",
        // Material Design 3 Outlined Button
        outlined: "border-2 border-md-outline text-md-primary bg-transparent hover:bg-md-primary/8 focus:bg-md-primary/12 active:bg-md-primary/16 rounded-[20px] px-md-3 py-md-2 md-label-large",
        // Material Design 3 Text Button
        text: "text-md-primary bg-transparent hover:bg-md-primary/8 focus:bg-md-primary/12 active:bg-md-primary/16 rounded-[20px] px-md-3 py-md-2 md-label-large",
        // Material Design 3 Elevated Button
        elevated: "bg-md-surface-container-low text-md-primary shadow-md hover:shadow-lg md-elevation-1 hover:md-elevation-2 rounded-[20px] px-md-3 py-md-2 md-label-large",
        // Legacy variants for backward compatibility
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2",
        destructive: "bg-md-error text-md-error-on-error hover:shadow-md md-elevation-1 hover:md-elevation-2 rounded-[20px] px-md-3 py-md-2 md-label-large hover:brightness-110",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2",
        link: "text-primary underline-offset-4 hover:underline rounded-md px-4 py-2",
        // Backward compatibility alias
        outline: "border-2 border-md-outline text-md-primary bg-transparent hover:bg-md-primary/8 focus:bg-md-primary/12 active:bg-md-primary/16 rounded-[20px] px-md-3 py-md-2 md-label-large",
      },
      size: {
        // Material Design 3 sizes with proper touch targets
        default: "min-h-[40px] px-md-3",
        sm: "min-h-[36px] px-md-2 text-xs",
        lg: "min-h-[48px] px-md-4 text-base",
        icon: "h-[48px] w-[48px] p-0 rounded-full",
        "icon-sm": "h-[40px] w-[40px] p-0 rounded-full",
        "icon-lg": "h-[56px] w-[56px] p-0 rounded-full",
        // Legacy sizes
        legacy: "h-10 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
