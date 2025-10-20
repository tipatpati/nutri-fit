import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Glass Input Field
          "flex h-14 w-full rounded-xl glass-surface-light border-2 border-[#DE6E27]/20 bg-transparent px-4 py-3 text-base text-[#2B3210] font-medium",
          "placeholder:text-[#505631]/60",
          "focus:border-[#DE6E27] focus:shadow-lg focus:shadow-[#DE6E27]/20 focus:outline-none",
          "hover:border-[#DE6E27]/40",
          "disabled:border-[#E5E2D9] disabled:bg-[#FBF8EF]/20 disabled:text-[#2B3210]/40 disabled:cursor-not-allowed",
          "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#2B3210]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
