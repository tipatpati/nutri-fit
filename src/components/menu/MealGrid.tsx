
import MealCard from "./MealCard";

interface Meal {
  id: string;
  name: string;
  image_url: string | null;
  category: string;
  premium: boolean;
  badge?: string;
}

interface MealGridProps {
  meals: Meal[];
  getCategoryColor: (category: string) => { bg: string; text: string; hex: string };
}

const MealGrid = ({ meals, getCategoryColor }: MealGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16 px-2">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} getCategoryColor={getCategoryColor} />
      ))}
    </div>
  );
};

export default MealGrid;
