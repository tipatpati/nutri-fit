import { Star } from "lucide-react";
import { MealItem } from "@/shared/data/mealCategories";

interface SampleMealItemProps {
  meal: MealItem;
}

export const SampleMealItem = ({ meal }: SampleMealItemProps) => {
  return (
    <div className="group/meal border-2 border-md-outline-variant rounded-md-lg p-md-3 sm:p-md-4 hover:border-md-outline hover:shadow-md transition-standard bg-md-surface/80 backdrop-blur hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-md-2">
        <h5 className="md-title-small text-md-on-surface group-hover/meal:text-md-on-surface-variant transition-colors">
          {meal.name}
        </h5>
        <div className="flex items-center space-x-md-1">
          <Star className="w-3 h-3 fill-[hsl(var(--md-sys-color-tertiary))] text-md-tertiary" />
          <span className="md-label-small text-md-on-surface-variant">{meal.rating}</span>
        </div>
      </div>
      <div className="flex justify-between gap-md-2">
        <span className="px-md-2 sm:px-md-3 py-md-1 bg-md-surface-container-high rounded-md-xs text-md-on-surface md-label-small">
          {meal.calories}
        </span>
        <span className="px-md-2 sm:px-md-3 py-md-1 bg-md-primary-container text-md-primary-on-container rounded-md-xs md-label-small">
          {meal.protein}
        </span>
      </div>
    </div>
  );
};
