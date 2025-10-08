import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CategoryCardSkeleton = () => {
  return (
    <Card className="overflow-hidden bg-md-surface md-elevation-2">
      <CardContent className="p-0">
        <Skeleton className="h-32 sm:h-40 w-full bg-md-surface-variant" />
        <div className="p-md-4 sm:p-md-6 lg:p-md-8 space-y-md-4">
          <Skeleton className="h-5 w-full bg-md-surface-variant rounded-md-xs" />
          <div className="space-y-md-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-2 border-md-outline-variant rounded-md-lg p-md-3">
                <Skeleton className="h-4 w-3/4 bg-md-surface-variant rounded-md-xs mb-md-2" />
                <div className="flex justify-between gap-md-2">
                  <Skeleton className="h-6 w-20 bg-md-surface-variant rounded-md-xs" />
                  <Skeleton className="h-6 w-24 bg-md-surface-variant rounded-md-xs" />
                </div>
              </div>
            ))}
          </div>
          <Skeleton className="h-12 w-full bg-md-surface-variant rounded-md-lg" />
        </div>
      </CardContent>
    </Card>
  );
};
