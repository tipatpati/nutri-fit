import { Skeleton } from "@/components/ui/skeleton";

export const FeatureCardSkeleton = () => {
  return (
    <div className="text-center space-y-md-6 p-md-8 bg-md-surface rounded-md-3xl md-elevation-2 border border-md-outline-variant">
      <Skeleton className="w-20 h-20 mx-auto rounded-md-2xl bg-md-surface-variant" />
      <Skeleton className="h-6 w-3/4 mx-auto bg-md-surface-variant rounded-md-xs" />
      <div className="space-y-md-2">
        <Skeleton className="h-4 w-full bg-md-surface-variant rounded-md-xs" />
        <Skeleton className="h-4 w-5/6 mx-auto bg-md-surface-variant rounded-md-xs" />
      </div>
    </div>
  );
};
