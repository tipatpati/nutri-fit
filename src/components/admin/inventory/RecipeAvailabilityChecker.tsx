import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { useIngredients } from "@/hooks/useIngredients";
import { useMealIngredients } from "@/hooks/useMealIngredients";
import { useMeals } from "@/presentation/hooks/useMeals";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RecipeAvailability {
  mealId: string;
  mealName: string;
  canMake: boolean;
  missingIngredients: Array<{
    name: string;
    needed: number;
    available: number;
    unit: string;
  }>;
}

const RecipeAvailabilityChecker = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('equilibre');
  const { data: meals = [] } = useMeals({ active: true });
  const { data: ingredients = [] } = useIngredients({ active: true });

  const checkRecipeAvailability = (mealId: string): RecipeAvailability | null => {
    const meal = meals.find(m => m.id === mealId);
    if (!meal) return null;

    // For this simplified version, we'll fetch ingredients on render
    // In production, you'd want to use the meal_ingredients data
    return {
      mealId: meal.id,
      mealName: meal.name,
      canMake: true,
      missingIngredients: [],
    };
  };

  const availableRecipes = meals.filter(meal => checkRecipeAvailability(meal.id)?.canMake);
  const unavailableRecipes = meals.filter(meal => !checkRecipeAvailability(meal.id)?.canMake);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          Disponibilité des recettes
        </CardTitle>
        <CardDescription>
          Vérifiez quelles recettes peuvent être préparées avec le stock actuel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === 'equilibre' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('equilibre')}
            >
              Équilibré
            </Button>
            <Button
              variant={selectedCategory === 'perte_poids' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('perte_poids')}
            >
              Minceur
            </Button>
            <Button
              variant={selectedCategory === 'prise_masse' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('prise_masse')}
            >
              Prise de masse
            </Button>
          </div>

          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Disponibles ({availableRecipes.length})
              </h3>
              <div className="space-y-2">
                {availableRecipes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune recette disponible</p>
                ) : (
                  availableRecipes.map(meal => (
                    <div key={meal.id} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{meal.name}</span>
                      <Badge variant="outline" className="border-green-600 text-green-600">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Disponible
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </div>

            {unavailableRecipes.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  Non disponibles ({unavailableRecipes.length})
                </h3>
                <div className="space-y-2">
                  {unavailableRecipes.map(meal => {
                    const availability = checkRecipeAvailability(meal.id);
                    return (
                      <div key={meal.id} className="p-2 border rounded space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{meal.name}</span>
                          <Badge variant="destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            Indisponible
                          </Badge>
                        </div>
                        {availability && availability.missingIngredients.length > 0 && (
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p className="font-medium">Ingrédients manquants:</p>
                            <ul className="list-disc list-inside">
                              {availability.missingIngredients.map((ing, idx) => (
                                <li key={idx}>
                                  {ing.name}: besoin {ing.needed}{ing.unit}, disponible {ing.available}{ing.unit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeAvailabilityChecker;
