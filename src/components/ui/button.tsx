import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium relative overflow-hidden transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-38 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 md-state-layer",
  {
    variants: {
      variant: {
        // Material Design 3 Filled Button
        filled: "bg-[hsl(var(--md-sys-color-primary))] text-[hsl(var(--md-sys-color-on-primary))] hover:shadow-md md-elevation-1 hover:md-elevation-2 rounded-[20px] px-md-3 py-md-2 md-label-large",
        // Material Design 3 Filled Tonal Button
        "filled-tonal": "bg-[hsl(var(--md-sys-color-secondary-container))] text-[hsl(var(--md-sys-color-on-secondary-container))] hover:shadow-md md-elevation-1 hover:md-elevation-2 rounded-[20px] px-md-3 py-md-2 md-label-large",
        // Material Design 3 Outlined Button
        outlined: "border border-[hsl(var(--md-sys-color-outline))] text-[hsl(var(--md-sys-color-primary))] bg-transparent hover:bg-[hsl(var(--md-sys-color-primary)/0.08)] focus:bg-[hsl(var(--md-sys-color-primary)/0.12)] active:bg-[hsl(var(--md-sys-color-primary)/0.16)] rounded-[20px] px-md-3 py-md-2 md-label-large",
        // Material Design 3 Text Button
        text: "text-[hsl(var(--md-sys-color-primary))] bg-transparent hover:bg-[hsl(var(--md-sys-color-primary)/0.08)] focus:bg-[hsl(var(--md-sys-color-primary)/0.12)] active:bg-[hsl(var(--md-sys-color-primary)/0.16)] rounded-[20px] px-md-3 py-md-2 md-label-large",
        // Material Design 3 Elevated Button
        elevated: "bg-[hsl(var(--md-sys-color-surface-container-low))] text-[hsl(var(--md-sys-color-primary))] shadow-md hover:shadow-lg md-elevation-1 hover:md-elevation-2 rounded-[20px] px-md-3 py-md-2 md-label-large",
        // Legacy variants for backward compatibility
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2",
        destructive: "bg-[hsl(var(--md-sys-color-error))] text-[hsl(var(--md-sys-color-on-error))] hover:shadow-md md-elevation-1 hover:md-elevation-2 rounded-[20px] px-md-3 py-md-2 md-label-large",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2",
        link: "text-primary underline-offset-4 hover:underline rounded-md px-4 py-2",
        // Backward compatibility alias
        outline: "border border-[hsl(var(--md-sys-color-outline))] text-[hsl(var(--md-sys-color-primary))] bg-transparent hover:bg-[hsl(var(--md-sys-color-primary)/0.08)] focus:bg-[hsl(var(--md-sys-color-primary)/0.12)] active:bg-[hsl(var(--md-sys-color-primary)/0.16)] rounded-[20px] px-md-3 py-md-2 md-label-large",
      },
      size: {
        // Material Design 3 sizes
        default: "h-[40px] px-md-3",
        sm: "h-[32px] px-md-2 text-xs",
        lg: "h-[48px] px-md-4 text-base",
        icon: "h-[40px] w-[40px] p-0 rounded-full",
        "icon-sm": "h-[32px] w-[32px] p-0 rounded-full",
        "icon-lg": "h-[48px] w-[48px] p-0 rounded-full",
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
