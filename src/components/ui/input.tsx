import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Material Design 3 Text Field (Outlined)
          "flex h-[56px] w-full rounded-md border border-md-outline bg-md-surface px-md-2 py-md-2 text-base text-md-surface-on-surface",
          "placeholder:text-emerald-800",
          "focus:border-md-primary focus:border-2 focus:outline-none",
          "hover:border-emerald-800",
          "disabled:border-md-outline/38 disabled:bg-md-surface/4 disabled:text-md-surface-on-surface/38 disabled:cursor-not-allowed",
          "transition-colors duration-200 ease-in-out",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-md-surface-on-surface",
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
