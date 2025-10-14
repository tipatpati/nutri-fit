import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMealIngredients } from "@/hooks/useMealIngredients";
import { Flame, Activity, Wheat, Droplet } from "lucide-react";

interface MealNutritionalInfoProps {
  mealId: string;
  mealName: string;
}

const NUTRIENT_ICONS = {
  protein: '🥩',
  carbs: '🌾',
  vegetables: '🥗',
  fat: '🥑',
  condiment: '🧂',
};

const MealNutritionalInfo = ({ mealId, mealName }: MealNutritionalInfoProps) => {
  const { data: mealIngredients = [] } = useMealIngredients(mealId);

  const calculateNutrition = (category: 'equilibre' | 'perte_poids' | 'prise_masse') => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    mealIngredients.forEach(mi => {
      const quantity = category === 'equilibre' 
        ? mi.quantity_equilibre 
        : category === 'perte_poids' 
        ? mi.quantity_perte_poids 
        : mi.quantity_prise_masse;

      if (mi.ingredient.nutritional_info && quantity) {
        const nutrition = mi.ingredient.nutritional_info as any;
        const multiplier = quantity / 100;
        totalCalories += (nutrition.calories || 0) * multiplier;
        totalProtein += (nutrition.protein || 0) * multiplier;
        totalCarbs += (nutrition.carbs || 0) * multiplier;
        totalFat += (nutrition.fat || 0) * multiplier;
      }
    });

    return {
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein * 10) / 10,
      carbs: Math.round(totalCarbs * 10) / 10,
      fat: Math.round(totalFat * 10) / 10,
    };
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'equilibre': return 'Équilibré';
      case 'perte_poids': return 'Perte de poids';
      case 'prise_masse': return 'Prise de masse';
      default: return category;
    }
  };

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Informations nutritionnelles - {mealName}</h3>
      
      <Tabs defaultValue="equilibre" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="equilibre">Équilibré</TabsTrigger>
          <TabsTrigger value="perte_poids">Perte de poids</TabsTrigger>
          <TabsTrigger value="prise_masse">Prise de masse</TabsTrigger>
        </TabsList>

        {(['equilibre', 'perte_poids', 'prise_masse'] as const).map(category => {
          const nutrition = calculateNutrition(category);
          
          return (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-xs text-muted-foreground">Calories</span>
                  </div>
                  <p className="text-xl font-bold">{nutrition.calories}</p>
                  <p className="text-xs text-muted-foreground">kcal</p>
                </Card>

                <Card className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="h-4 w-4 text-red-500" />
                    <span className="text-xs text-muted-foreground">Protéines</span>
                  </div>
                  <p className="text-xl font-bold">{nutrition.protein}</p>
                  <p className="text-xs text-muted-foreground">g</p>
                </Card>

                <Card className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Wheat className="h-4 w-4 text-amber-500" />
                    <span className="text-xs text-muted-foreground">Glucides</span>
                  </div>
                  <p className="text-xl font-bold">{nutrition.carbs}</p>
                  <p className="text-xs text-muted-foreground">g</p>
                </Card>

                <Card className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplet className="h-4 w-4 text-blue-500" />
                    <span className="text-xs text-muted-foreground">Lipides</span>
                  </div>
                  <p className="text-xl font-bold">{nutrition.fat}</p>
                  <p className="text-xs text-muted-foreground">g</p>
                </Card>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Composition</h4>
                <div className="space-y-2">
                  {mealIngredients.map(mi => {
                    const quantity = category === 'equilibre' 
                      ? mi.quantity_equilibre 
                      : category === 'perte_poids' 
                      ? mi.quantity_perte_poids 
                      : mi.quantity_prise_masse;

                    return (
                      <div key={mi.id} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span>{NUTRIENT_ICONS[mi.nutrient_type as keyof typeof NUTRIENT_ICONS]}</span>
                          <span>{mi.ingredient.name}</span>
                        </span>
                        <Badge variant="secondary">
                          {quantity}g
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </Card>
  );
};

export default MealNutritionalInfo;
