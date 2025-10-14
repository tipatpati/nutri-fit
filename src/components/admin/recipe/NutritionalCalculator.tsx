import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, ChefHat, Target, Loader2 } from "lucide-react";
import { RecipeCalculator, RecipeIngredient, CalculatedRecipe } from "@/utils/recipeCalculator";
import { INGREDIENT_NUTRITIONAL_VALUES, nutritionalCalculations } from "@/constants/nutritionalValues";
import { NUTRITIONAL_CATEGORIES } from "@/constants/nutritionalCategories";
import { useMeals } from "@/presentation/hooks/useMeals";
import { Meal } from "@/core/entities/Meal";

const NutritionalCalculator = () => {
  const [calculatedRecipes, setCalculatedRecipes] = useState<CalculatedRecipe[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<string>("");
  
  // Fetch real meals from database
  const { data: meals, isLoading } = useMeals({ active: true });

  // Map meal text to ingredient keys (basic mapping for demonstration)
  const mapMealToIngredients = (meal: Meal): Omit<RecipeIngredient, 'quantity'>[] => {
    const ingredients: Omit<RecipeIngredient, 'quantity'>[] = [];
    
    // Map protein (meat)
    const meatLower = meal.meat?.toLowerCase() || '';
    if (meatLower.includes('poulet') || meatLower.includes('chicken')) {
      ingredients.push({ key: 'chicken_breast', name: meal.meat, type: 'protein', priority: 1 });
    } else if (meatLower.includes('saumon') || meatLower.includes('salmon')) {
      ingredients.push({ key: 'salmon', name: meal.meat, type: 'protein', priority: 1 });
    } else if (meatLower.includes('boeuf') || meatLower.includes('beef')) {
      ingredients.push({ key: 'beef_lean', name: meal.meat, type: 'protein', priority: 1 });
    } else if (meal.meat) {
      // Default to chicken if protein not recognized
      ingredients.push({ key: 'chicken_breast', name: meal.meat, type: 'protein', priority: 1 });
    }
    
    // Map carbs
    const carbsLower = meal.carbs?.toLowerCase() || '';
    if (carbsLower.includes('riz') || carbsLower.includes('rice')) {
      ingredients.push({ key: 'rice_basmati', name: meal.carbs, type: 'carbs', priority: 1 });
    } else if (carbsLower.includes('quinoa')) {
      ingredients.push({ key: 'quinoa', name: meal.carbs, type: 'carbs', priority: 1 });
    } else if (carbsLower.includes('patate') || carbsLower.includes('potato')) {
      ingredients.push({ key: 'sweet_potato', name: meal.carbs, type: 'carbs', priority: 1 });
    } else if (meal.carbs) {
      // Default to rice
      ingredients.push({ key: 'rice_basmati', name: meal.carbs, type: 'carbs', priority: 1 });
    }
    
    // Map vegetables
    const vegLower = meal.vegetables?.toLowerCase() || '';
    if (vegLower.includes('broccoli') || vegLower.includes('brocoli')) {
      ingredients.push({ key: 'broccoli', name: 'Brocoli', type: 'vegetables', priority: 2 });
    }
    if (vegLower.includes('épinard') || vegLower.includes('spinach')) {
      ingredients.push({ key: 'spinach', name: 'Épinards', type: 'vegetables', priority: 2 });
    }
    if (vegLower.includes('carrot') || vegLower.includes('carotte')) {
      ingredients.push({ key: 'carrots', name: 'Carottes', type: 'vegetables', priority: 3 });
    }
    if (vegLower.includes('poivron') || vegLower.includes('pepper')) {
      ingredients.push({ key: 'bell_pepper', name: 'Poivrons', type: 'vegetables', priority: 3 });
    }
    
    // Add default vegetables if none matched
    if (!ingredients.some(i => i.type === 'vegetables')) {
      ingredients.push({ key: 'mixed_vegetables', name: meal.vegetables || 'Légumes variés', type: 'vegetables', priority: 2 });
    }
    
    // Add healthy fats
    ingredients.push({ key: 'olive_oil', name: "Huile d'olive", type: 'fat', priority: 1 });
    
    return ingredients;
  };

  const calculateRecipe = (meal: Meal) => {
    const baseIngredients = mapMealToIngredients(meal);
    
    // Generate basic cooking instructions based on meal description
    const cookingInstructions = [
      `Préparer les ingrédients: ${meal.meat}, ${meal.vegetables}, ${meal.carbs}`,
      "Cuire les protéines selon la méthode appropriée (grill, poêle, four)",
      "Préparer les féculents selon les instructions",
      "Cuire ou préparer les légumes",
      "Assembler dans l'assiette et assaisonner"
    ];

    const variants = RecipeCalculator.generateRecipeVariants(
      baseIngredients,
      cookingInstructions,
      30, // Default preparation time
      'medium' // Default difficulty
    );

    setCalculatedRecipes(variants);
    setSelectedMeal(meal.name);
  };

  const getNutritionColor = (nutrition: any, target: any, key: string) => {
    const deviation = Math.abs((nutrition[key] - target[key]) / target[key]);
    if (deviation <= 0.05) return "text-green-600";
    if (deviation <= 0.15) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader className="space-y-3">
          <CardTitle className="flex items-center gap-3 text-2xl text-emerald-800">
            <Calculator className="h-6 w-6" />
            Calculateur Nutritionnel
          </CardTitle>
          <CardDescription className="text-base">
            Sélectionnez une recette existante pour calculer automatiquement les variantes nutritionnelles
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {meals?.slice(0, 12).map((meal) => (
                <Card key={meal.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <CardContent className="p-5">
                    {meal.image_url && (
                      <img 
                        src={meal.image_url} 
                        alt={meal.name}
                        className="w-full h-40 object-cover rounded-lg mb-4 shadow-sm"
                      />
                    )}
                    <h3 className="font-semibold text-emerald-800 mb-3 text-lg line-clamp-2">{meal.name}</h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-start gap-2">
                        <span className="text-base">🥩</span>
                        <span className="line-clamp-1">{meal.meat}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-base">🥗</span>
                        <span className="line-clamp-1">{meal.vegetables}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-base">🌾</span>
                        <span className="line-clamp-1">{meal.carbs}</span>
                      </div>
                    </div>
                    {meal.calories_per_serving && (
                      <div className="text-xs text-gray-500 mb-4 py-2 px-3 bg-gray-50 rounded-md">
                        <span className="font-medium">{meal.calories_per_serving} cal</span>
                        <span className="mx-2">•</span>
                        <span className="font-medium">{meal.protein_grams}g protéines</span>
                      </div>
                    )}
                    <Button 
                      onClick={() => calculateRecipe(meal)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors"
                      size="sm"
                    >
                      <ChefHat className="h-4 w-4 mr-2" />
                      Calculer les variantes
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {calculatedRecipes.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl text-emerald-800">
              Résultats pour: {selectedMeal}
            </CardTitle>
            <CardDescription className="text-base">
              Quantités automatiquement calculées pour chaque catégorie nutritionnelle
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {calculatedRecipes.map((recipe, index) => {
                const category = NUTRITIONAL_CATEGORIES.find(cat => cat.name === recipe.category);
                const validation = RecipeCalculator.validateRecipe(recipe);
                const targets = category?.nutritional_profile;

                return (
                  <Card key={index} className="border-2 hover:shadow-lg transition-shadow" style={{ borderColor: category?.color }}>
                    <CardHeader className="pb-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl" style={{ color: category?.color }}>
                          {recipe.category}
                        </CardTitle>
                        <Badge variant={validation.valid ? "default" : "destructive"} className="text-xs px-3 py-1">
                          {validation.valid ? "✓ Valide" : "⚠ À ajuster"}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 leading-relaxed">
                        {category?.description}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      {/* Nutritional Overview */}
                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Valeurs Nutritionnelles
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className={`${getNutritionColor(recipe.nutrition, targets, 'calories_per_serving')} font-medium`}>
                            <div className="text-xs text-gray-500 mb-1">Calories</div>
                            <div>{recipe.nutrition.calories} <span className="text-gray-400 text-xs">/ {targets?.calories_per_serving}</span></div>
                          </div>
                          <div className={`${getNutritionColor(recipe.nutrition, targets, 'protein_grams')} font-medium`}>
                            <div className="text-xs text-gray-500 mb-1">Protéines</div>
                            <div>{recipe.nutrition.protein}g <span className="text-gray-400 text-xs">/ {targets?.protein_grams}g</span></div>
                          </div>
                          <div className={`${getNutritionColor(recipe.nutrition, targets, 'carbs_grams')} font-medium`}>
                            <div className="text-xs text-gray-500 mb-1">Glucides</div>
                            <div>{recipe.nutrition.carbs}g <span className="text-gray-400 text-xs">/ {targets?.carbs_grams}g</span></div>
                          </div>
                          <div className={`${getNutritionColor(recipe.nutrition, targets, 'fat_grams')} font-medium`}>
                            <div className="text-xs text-gray-500 mb-1">Lipides</div>
                            <div>{recipe.nutrition.fat}g <span className="text-gray-400 text-xs">/ {targets?.fat_grams}g</span></div>
                          </div>
                        </div>
                      </div>

                      {/* Ingredients */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Ingrédients</h4>
                        <div className="space-y-2">
                          {recipe.ingredients.map((ing, ingIndex) => (
                            <div key={ingIndex} className="flex justify-between text-sm py-2 px-3 bg-gray-50 rounded">
                              <span className="text-gray-700">{ing.name}</span>
                              <span className="font-semibold text-emerald-700">{ing.quantity}g</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cooking Instructions Preview */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Instructions</h4>
                        <div className="text-sm space-y-2 max-h-32 overflow-y-auto pr-2">
                          {recipe.cookingInstructions.slice(0, 3).map((instruction, instIndex) => (
                            <div key={instIndex} className="text-gray-600 leading-relaxed">
                              {instruction}
                            </div>
                          ))}
                          {recipe.cookingInstructions.length > 3 && (
                            <div className="text-gray-400 italic text-xs">
                              +{recipe.cookingInstructions.length - 3} étapes supplémentaires...
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Recipe Info */}
                      <div className="flex justify-between text-sm text-gray-500 pt-3 border-t">
                        <span className="flex items-center gap-1">⏱ {recipe.preparationTime}min</span>
                        <span className="flex items-center gap-1">👨‍🍳 {recipe.difficulty}</span>
                        <span className="flex items-center gap-1">🍽️ {recipe.portionSize}g</span>
                      </div>

                      {/* Validation Issues */}
                      {!validation.valid && validation.issues.length > 0 && (
                        <div className="bg-red-50 p-3 rounded-lg text-sm space-y-2">
                          <div className="font-semibold text-red-800">Ajustements nécessaires:</div>
                          {validation.issues.slice(0, 2).map((issue, issueIndex) => (
                            <div key={issueIndex} className="text-red-600 text-xs leading-relaxed">• {issue}</div>
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
      <Card className="shadow-sm">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl text-emerald-800">Base de Données Nutritionnelle</CardTitle>
          <CardDescription className="text-base">
            {Object.keys(INGREDIENT_NUTRITIONAL_VALUES).length} ingrédients avec valeurs nutritionnelles complètes
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {Object.keys(INGREDIENT_NUTRITIONAL_VALUES).slice(0, 24).map((key) => (
              <Badge key={key} variant="outline" className="text-xs py-2 px-3 justify-center">
                {key.replace(/_/g, ' ')}
              </Badge>
            ))}
            {Object.keys(INGREDIENT_NUTRITIONAL_VALUES).length > 24 && (
              <Badge variant="secondary" className="text-xs py-2 px-3 justify-center">
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