import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md-xs bg-md-surface-variant", className)}
      {...props}
    />
  )
}

export { Skeleton }
