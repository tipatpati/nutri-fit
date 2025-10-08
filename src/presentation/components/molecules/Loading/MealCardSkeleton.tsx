import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const MealCardSkeleton = () => {
  return (
    <Card className="overflow-hidden md-elevation-1 bg-md-surface">
      <CardContent className="p-0">
        <Skeleton className="h-40 sm:h-48 w-full bg-md-surface-variant" />
        <div className="p-md-3 sm:p-md-4 space-y-md-3">
          <Skeleton className="h-5 w-3/4 bg-md-surface-variant rounded-md-xs" />
          <Skeleton className="h-4 w-1/2 bg-md-surface-variant rounded-md-xs" />
          <div className="flex items-center justify-between pt-md-2">
            <div className="flex items-center space-x-md-2">
              <Skeleton className="w-8 h-8 rounded-full bg-md-surface-variant" />
              <Skeleton className="w-8 h-6 bg-md-surface-variant rounded-md-xs" />
              <Skeleton className="w-8 h-8 rounded-full bg-md-surface-variant" />
            </div>
            <Skeleton className="w-16 h-6 bg-md-surface-variant rounded-md-xs" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
