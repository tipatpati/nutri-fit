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
    <Card className="group overflow-hidden border border-md-outline-variant hover:border-md-outline transition-standard hover:shadow-lg md-elevation-1 hover:md-elevation-3 hover:scale-[1.02] bg-md-surface animate-scale-in">
      <CardContent className="p-0">
        {/* Header with gradient */}
        <div 
          className="h-32 flex items-center justify-center text-white text-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd)` }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 space-y-2">
            <div className="text-4xl font-bold opacity-20">{category.step}</div>
            <h4 className="text-lg font-bold text-white drop-shadow-sm">{category.name}</h4>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="md-body-medium text-md-on-surface-variant leading-relaxed">
            {category.description}
          </p>
          
          <div className="space-y-2.5">
            {category.meals.map((meal, idx) => (
              <SampleMealItem key={idx} meal={meal} />
            ))}
          </div>
          
          <Link to="/menu">
            <Button 
              variant="filled"
              size="lg"
              className="w-full mt-2"
            >
              Découvrir le programme
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-fast" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
