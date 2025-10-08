import { Skeleton } from "@/components/ui/skeleton";

interface TextSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export const TextSkeleton = ({ width = "w-full", height = "h-4", className = "" }: TextSkeletonProps) => {
  return (
    <Skeleton className={`${width} ${height} bg-md-surface-variant ${className}`} />
  );
};
