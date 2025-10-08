import { Skeleton } from "@/components/ui/skeleton";

interface ImageSkeletonProps {
  aspectRatio?: string;
  className?: string;
}

export const ImageSkeleton = ({ aspectRatio = "aspect-video", className = "" }: ImageSkeletonProps) => {
  return (
    <Skeleton className={`w-full ${aspectRatio} bg-md-surface-variant rounded-md-lg ${className}`} />
  );
};
