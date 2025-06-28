
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
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-emerald-100/50 group">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={meal.image} 
            alt={meal.name}
            className="w-full h-48 lg:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {meal.badge && (
            <div 
              className="absolute top-3 lg:top-4 left-3 lg:left-4 px-3 py-1.5 rounded-full text-white text-xs font-semibold backdrop-blur-sm shadow-lg"
              style={{ backgroundColor: getCategoryColor(meal.category) }}
            >
              {meal.badge}
            </div>
          )}
          {meal.premium && (
            <div className="absolute top-3 lg:top-4 right-3 lg:right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              Premium
            </div>
          )}
        </div>
        <div className="p-4 lg:p-6">
          <h3 className="font-semibold text-slate-800 text-base lg:text-lg leading-tight group-hover:text-emerald-700 transition-colors duration-300">
            {meal.name}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;
