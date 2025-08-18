import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Material Design 3 Text Field (Outlined) - Textarea
          "flex min-h-[80px] w-full rounded-md-xs border border-md-outline bg-md-surface px-md-2 py-md-2 text-base text-md-surface-on-surface",
          "placeholder:text-md-surface-on-surface-variant",
          "focus:border-md-primary focus:border-2 focus:outline-none",
          "hover:border-md-outline-variant",
          "disabled:border-md-outline/38 disabled:bg-md-surface/4 disabled:text-md-surface-on-surface/38 disabled:cursor-not-allowed",
          "transition-colors duration-200 ease-in-out",
          "resize-vertical",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
