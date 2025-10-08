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
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-md-long1 border-2 border-md-outline-variant hover:scale-[1.02] bg-md-surface-container-low">
      <CardContent className="p-0">
        <div 
          className="h-32 sm:h-40 flex items-center justify-center text-white text-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd)` }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <StepBadge step={category.step} />
            <h4 className="md-headline-small font-bold text-white drop-shadow-md">{category.name}</h4>
          </div>
        </div>
        
        <div className="p-md-4 sm:p-md-6 lg:p-md-8 space-y-md-4 sm:space-y-md-6">
          <p className="md-body-medium text-md-on-surface-variant leading-relaxed">
            {category.description}
          </p>
          
          <div className="space-y-md-3 sm:space-y-md-4">
            {category.meals.map((meal, idx) => (
              <SampleMealItem key={idx} meal={meal} />
            ))}
          </div>
          
          <Link to="/menu">
            <Button 
              className="w-full mt-md-4 sm:mt-md-6 bg-md-primary text-md-primary-on-container hover:bg-md-primary/90 font-semibold py-md-3 rounded-md-lg transition-all duration-md-medium2 group-hover:scale-[1.02]"
            >
              Découvrir le programme
              <ArrowRight className="ml-md-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
