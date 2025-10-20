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
    <Card className="group overflow-hidden border border-[#E5E2D9] hover:border-[#DE6E27] transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] bg-white/80 backdrop-blur-sm animate-scale-in">
      <CardContent className="p-0">
        {/* Header with gradient */}
        <div 
          className="h-36 flex items-center justify-center text-white text-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${categoryColor.hex}, ${categoryColor.hex}dd)` }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 space-y-2">
            <div className="text-5xl font-bold opacity-20">{category.step}</div>
            <h4 className="text-xl font-bold text-white drop-shadow-lg">{category.name}</h4>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-base text-[#505631] leading-relaxed">
            {category.description}
          </p>
          
          <div className="space-y-3">
            {category.meals.map((meal, idx) => (
              <SampleMealItem key={idx} meal={meal} />
            ))}
          </div>
          
          <Link to="/menu">
            <Button 
              variant="filled"
              size="lg"
              className="w-full mt-4 bg-[#DE6E27] hover:bg-[#DE6E27]/90 text-white font-bold py-6 rounded-xl hover:-translate-y-1 transition-all duration-300"
            >
              Découvrir le programme
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
