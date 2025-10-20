import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE6E27] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        // Primary Brand Button
        filled: "bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white hover:shadow-lg hover:shadow-[#DE6E27]/30 hover:scale-[1.02] rounded-xl px-6 py-3 font-semibold",
        // Glass Tonal Button
        "filled-tonal": "glass-surface-light text-[#2B3210] hover:shadow-md border border-[#DE6E27]/20 rounded-xl px-6 py-3 font-semibold",
        // Outlined Button
        outlined: "border-2 border-[#DE6E27] text-[#DE6E27] bg-transparent hover:bg-[#DE6E27]/10 rounded-xl px-6 py-3 font-semibold",
        // Text Button
        text: "text-[#DE6E27] bg-transparent hover:bg-[#DE6E27]/10 rounded-xl px-6 py-3 font-semibold",
        // Glass Elevated Button
        elevated: "glass-card text-[#2B3210] shadow-md hover:shadow-lg rounded-xl px-6 py-3 font-semibold",
        // Legacy variants for backward compatibility
        default: "bg-[#2B3210] text-[#FBF8EF] hover:bg-[#505631] rounded-xl px-4 py-2",
        destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg rounded-xl px-6 py-3 font-semibold",
        secondary: "bg-[#E5E2D9] text-[#2B3210] hover:bg-[#E5E2D9]/80 rounded-xl px-4 py-2",
        ghost: "hover:bg-[#E5E2D9]/50 hover:text-[#2B3210] rounded-xl px-4 py-2",
        link: "text-[#DE6E27] underline-offset-4 hover:underline rounded-xl px-4 py-2",
        // Backward compatibility alias
        outline: "border-2 border-[#DE6E27] text-[#DE6E27] bg-transparent hover:bg-[#DE6E27]/10 rounded-xl px-6 py-3 font-semibold",
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
