import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MealCategory } from "@/shared/data/mealCategories";
import { SampleMealItem } from "./SampleMealItem";
import { StepBadge } from "@/presentation/components/atoms/Badge/StepBadge";
import { getCategoryColor } from "@/shared/design-system";

interface CategoryCardProps {
  category: MealCategory;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const categoryColor = getCategoryColor(category.name);
  
  return (
    <Card className="group overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:shadow-lg bg-white">
      <CardContent className="p-0">
        {/* Header with gradient */}
        <div 
          className="h-36 flex items-center justify-center text-white text-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd)` }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 space-y-3">
            <div className="text-5xl font-bold opacity-20">{category.step}</div>
            <h4 className="text-xl font-bold text-white drop-shadow-sm">{category.name}</h4>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 lg:p-8 space-y-6">
          <p className="text-slate-600 leading-relaxed">
            {category.description}
          </p>
          
          <div className="space-y-3">
            {category.meals.map((meal, idx) => (
              <SampleMealItem key={idx} meal={meal} />
            ))}
          </div>
          
          <Link to="/menu">
            <Button 
              className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-6 rounded-xl transition-all duration-200"
            >
              Découvrir le programme
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
