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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <Calculator className="h-5 w-5" />
            Calculateur Nutritionnel
          </CardTitle>
          <CardDescription>
            Sélectionnez une recette existante pour calculer automatiquement les variantes nutritionnelles
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {meals?.slice(0, 12).map((meal) => (
                <Card key={meal.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    {meal.image_url && (
                      <img 
                        src={meal.image_url} 
                        alt={meal.name}
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                    )}
                    <h3 className="font-semibold text-emerald-800 mb-2">{meal.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <div>🥩 {meal.meat}</div>
                      <div>🥗 {meal.vegetables}</div>
                      <div>🌾 {meal.carbs}</div>
                    </div>
                    {meal.calories_per_serving && (
                      <div className="text-xs text-gray-500 mb-2">
                        {meal.calories_per_serving} cal | {meal.protein_grams}g protéines
                      </div>
                    )}
                    <Button 
                      onClick={() => calculateRecipe(meal)}
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
          )}
        </CardContent>
      </Card>

      {calculatedRecipes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-emerald-800">
              Résultats pour: {selectedMeal}
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