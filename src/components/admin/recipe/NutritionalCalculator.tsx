import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, ChefHat, Target } from "lucide-react";
import { RecipeCalculator, RecipeIngredient, CalculatedRecipe } from "@/utils/recipeCalculator";
import { INGREDIENT_NUTRITIONAL_VALUES, nutritionalCalculations } from "@/constants/nutritionalValues";
import { NUTRITIONAL_CATEGORIES } from "@/constants/nutritionalCategories";

const NutritionalCalculator = () => {
  const [calculatedRecipes, setCalculatedRecipes] = useState<CalculatedRecipe[]>([]);
  const [selectedExample, setSelectedExample] = useState<string>("");

  // Example recipe templates
  const exampleRecipes = {
    "chicken_rice": {
      name: "Chicken Boost - Riz Énergie",
      baseIngredients: [
        { key: "chicken_breast", name: "Blanc de poulet", type: "protein" as const, priority: 1 },
        { key: "rice_basmati", name: "Riz basmati", type: "carbs" as const, priority: 1 },
        { key: "broccoli", name: "Brocolis vapeur", type: "vegetables" as const, priority: 2 },
        { key: "bell_pepper", name: "Poivrons colorés", type: "vegetables" as const, priority: 3 },
        { key: "olive_oil", name: "Huile d'olive", type: "fat" as const, priority: 1 },
      ],
      cookingInstructions: [
        "Faire cuire le riz selon les instructions du paquet",
        "Assaisonner et faire griller le poulet 6-8 minutes de chaque côté",
        "Cuire les légumes à la vapeur pendant 5-7 minutes",
        "Dresser dans l'assiette et arroser d'huile d'olive"
      ]
    },
    "salmon_quinoa": {
      name: "Saumon Oméga - Quinoa Complet",
      baseIngredients: [
        { key: "salmon", name: "Filet de saumon", type: "protein" as const, priority: 1 },
        { key: "quinoa", name: "Quinoa", type: "carbs" as const, priority: 1 },
        { key: "spinach", name: "Épinards frais", type: "vegetables" as const, priority: 2 },
        { key: "avocado", name: "Avocat", type: "fat" as const, priority: 1 },
        { key: "carrots", name: "Carottes", type: "vegetables" as const, priority: 3 },
      ],
      cookingInstructions: [
        "Rincer et cuire le quinoa dans un bouillon de légumes",
        "Cuire le saumon à la poêle ou au four",
        "Faire revenir brièvement les épinards",
        "Couper l'avocat en lamelles",
        "Assembler tous les éléments dans l'assiette"
      ]
    }
  };

  const calculateRecipe = (recipeKey: string) => {
    const recipe = exampleRecipes[recipeKey as keyof typeof exampleRecipes];
    if (!recipe) return;

    const variants = RecipeCalculator.generateRecipeVariants(
      recipe.baseIngredients,
      recipe.cookingInstructions,
      25, // 25 minutes preparation time
      'medium'
    );

    setCalculatedRecipes(variants);
    setSelectedExample(recipe.name);
  };

  const getNutritionColor = (nutrition: any, target: any, key: string) => {
    const deviation = Math.abs((nutrition[key] - target[key]) / target[key]);
    if (deviation <= 0.05) return "text-green-600";
    if (deviation <= 0.15) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <Calculator className="h-5 w-5" />
            Calculateur Nutritionnel
          </CardTitle>
          <CardDescription>
            Testez le système de calcul automatique des quantités d'ingrédients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {Object.entries(exampleRecipes).map(([key, recipe]) => (
              <Card key={key} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-emerald-800 mb-2">{recipe.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    {recipe.baseIngredients.map((ing, idx) => (
                      <div key={idx}>• {ing.name}</div>
                    ))}
                  </div>
                  <Button 
                    onClick={() => calculateRecipe(key)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="sm"
                  >
                    <ChefHat className="h-4 w-4 mr-2" />
                    Calculer les variantes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {calculatedRecipes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-emerald-800">
              Résultats pour: {selectedExample}
            </CardTitle>
            <CardDescription>
              Quantités automatiquement calculées pour chaque catégorie nutritionnelle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {calculatedRecipes.map((recipe, index) => {
                const category = NUTRITIONAL_CATEGORIES.find(cat => cat.name === recipe.category);
                const validation = RecipeCalculator.validateRecipe(recipe);
                const targets = category?.nutritional_profile;

                return (
                  <Card key={index} className="border-2" style={{ borderColor: category?.color }}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg" style={{ color: category?.color }}>
                          {recipe.category}
                        </CardTitle>
                        <Badge variant={validation.valid ? "default" : "destructive"}>
                          {validation.valid ? "✓ Valide" : "⚠ À ajuster"}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {category?.description}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Nutritional Overview */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          Valeurs Nutritionnelles
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className={getNutritionColor(recipe.nutrition, targets, 'calories_per_serving')}>
                            Calories: {recipe.nutrition.calories} 
                            <span className="text-gray-500">/{targets?.calories_per_serving}</span>
                          </div>
                          <div className={getNutritionColor(recipe.nutrition, targets, 'protein_grams')}>
                            Protéines: {recipe.nutrition.protein}g
                            <span className="text-gray-500">/{targets?.protein_grams}g</span>
                          </div>
                          <div className={getNutritionColor(recipe.nutrition, targets, 'carbs_grams')}>
                            Glucides: {recipe.nutrition.carbs}g
                            <span className="text-gray-500">/{targets?.carbs_grams}g</span>
                          </div>
                          <div className={getNutritionColor(recipe.nutrition, targets, 'fat_grams')}>
                            Lipides: {recipe.nutrition.fat}g
                            <span className="text-gray-500">/{targets?.fat_grams}g</span>
                          </div>
                        </div>
                      </div>

                      {/* Ingredients */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Ingrédients</h4>
                        <div className="space-y-1">
                          {recipe.ingredients.map((ing, ingIndex) => (
                            <div key={ingIndex} className="flex justify-between text-xs">
                              <span>{ing.name}</span>
                              <span className="font-medium">{ing.quantity}g</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cooking Instructions Preview */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Instructions</h4>
                        <div className="text-xs space-y-1 max-h-24 overflow-y-auto">
                          {recipe.cookingInstructions.slice(0, 3).map((instruction, instIndex) => (
                            <div key={instIndex} className="text-gray-600">
                              {instruction}
                            </div>
                          ))}
                          {recipe.cookingInstructions.length > 3 && (
                            <div className="text-gray-400 italic">
                              +{recipe.cookingInstructions.length - 3} étapes supplémentaires...
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Recipe Info */}
                      <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                        <span>⏱ {recipe.preparationTime}min</span>
                        <span>👨‍🍳 {recipe.difficulty}</span>
                        <span>🍽️ {recipe.portionSize}g</span>
                      </div>

                      {/* Validation Issues */}
                      {!validation.valid && validation.issues.length > 0 && (
                        <div className="bg-red-50 p-2 rounded text-xs">
                          <div className="font-semibold text-red-800 mb-1">Ajustements nécessaires:</div>
                          {validation.issues.slice(0, 2).map((issue, issueIndex) => (
                            <div key={issueIndex} className="text-red-600">• {issue}</div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ingredient Database Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-emerald-800">Base de Données Nutritionnelle</CardTitle>
          <CardDescription>
            {Object.keys(INGREDIENT_NUTRITIONAL_VALUES).length} ingrédients avec valeurs nutritionnelles complètes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {Object.keys(INGREDIENT_NUTRITIONAL_VALUES).slice(0, 24).map((key) => (
              <Badge key={key} variant="outline" className="text-xs">
                {key.replace(/_/g, ' ')}
              </Badge>
            ))}
            {Object.keys(INGREDIENT_NUTRITIONAL_VALUES).length > 24 && (
              <Badge variant="secondary" className="text-xs">
                +{Object.keys(INGREDIENT_NUTRITIONAL_VALUES).length - 24} autres...
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionalCalculator;