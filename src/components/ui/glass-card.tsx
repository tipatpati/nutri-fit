import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  variant?: "default" | "elevated" | "primary";
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, elevated = false, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "glass-card",
      elevated: "glass-surface-elevated",
      primary: "glass-primary",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--md-sys-shape-corner-medium)] md-elevation-1 transition-standard",
          "hover:md-elevation-3 hover:scale-[1.02]",
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);
GlassCard.displayName = "GlassCard";

const GlassCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-[8px] p-[24px]", className)}
      {...props}
    />
  )
);
GlassCardHeader.displayName = "GlassCardHeader";

const GlassCardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("md-title-large text-on-surface", className)}
      {...props}
    />
  )
);
GlassCardTitle.displayName = "GlassCardTitle";

const GlassCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("md-body-medium text-on-surface-variant", className)}
      {...props}
    />
  )
);
GlassCardDescription.displayName = "GlassCardDescription";

const GlassCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-[24px] pt-0", className)} {...props} />
  )
);
GlassCardContent.displayName = "GlassCardContent";

const GlassCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-[24px] pt-0", className)}
      {...props}
    />
  )
);
GlassCardFooter.displayName = "GlassCardFooter";

export { 
  GlassCard, 
  GlassCardHeader, 
  GlassCardFooter, 
  GlassCardTitle, 
  GlassCardDescription, 
  GlassCardContent 
};
