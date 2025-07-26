
import { Card, CardContent } from "@/components/ui/card";

interface MealCardProps {
  meal: {
    id: number;
    name: string;
    image: string;
    category: string;
    premium: boolean;
    badge?: string;
  };
  getCategoryColor: (category: string) => string;
}

const MealCard = ({ meal, getCategoryColor }: MealCardProps) => {
  return (
    <Card className="overflow-hidden group w-full cursor-pointer md-state-layer relative hover:md-elevation-3 transition-all duration-md-medium4 ease-md-emphasized">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={meal.image} 
            alt={meal.name}
            className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-transform duration-md-medium4 ease-md-emphasized group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-md-short4 ease-md-standard" />
          {meal.badge && (
            <div 
              className="absolute top-md-2 left-md-2 px-md-2 py-md-1 rounded-md-full md-label-small text-white backdrop-blur-sm md-elevation-1"
              style={{ backgroundColor: getCategoryColor(meal.category) }}
            >
              {meal.badge}
            </div>
          )}
          {meal.premium && (
            <div className="absolute top-md-2 right-md-2 bg-md-tertiary text-md-tertiary-on px-md-2 py-md-1 rounded-md-full md-label-small md-elevation-1">
              Premium
            </div>
          )}
        </div>
        <div className="p-md-3">
          <h3 className="md-title-medium text-md-surface-on-surface group-hover:text-md-primary transition-colors duration-md-short4 ease-md-standard line-clamp-2">
            {meal.name}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;
