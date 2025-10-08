import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CardSkeletonProps {
  hasImage?: boolean;
  className?: string;
}

export const CardSkeleton = ({ hasImage = true, className = "" }: CardSkeletonProps) => {
  return (
    <Card className={`overflow-hidden bg-md-surface ${className}`}>
      <CardContent className="p-0">
        {hasImage && (
          <Skeleton className="h-48 w-full bg-md-surface-variant" />
        )}
        <div className="p-md-4 space-y-md-3">
          <Skeleton className="h-6 w-3/4 bg-md-surface-variant" />
          <Skeleton className="h-4 w-full bg-md-surface-variant" />
          <Skeleton className="h-4 w-5/6 bg-md-surface-variant" />
        </div>
      </CardContent>
    </Card>
  );
};
