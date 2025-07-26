import { 
  INGREDIENT_NUTRITIONAL_VALUES, 
  CALCULATION_CONSTANTS, 
  nutritionalCalculations,
  NutritionalData 
} from "@/constants/nutritionalValues";
import { NUTRITIONAL_CATEGORIES } from "@/constants/nutritionalCategories";

export interface RecipeIngredient {
  key: string;
  name: string;
  type: 'protein' | 'carbs' | 'vegetables' | 'fat' | 'condiment';
  quantity: number; // in grams
  priority: number; // 1 = highest priority
}

export interface CalculatedRecipe {
  category: string;
  ingredients: RecipeIngredient[];
  nutrition: NutritionalData;
  cookingInstructions: string[];
  portionSize: number;
  preparationTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export class RecipeCalculator {
  /**
   * Generate optimized recipe variants for all nutritional categories
   */
  static generateRecipeVariants(
    baseIngredients: Omit<RecipeIngredient, 'quantity'>[],
    baseCookingInstructions: string[],
    basePreparationTime: number = 30,
    baseDifficulty: 'easy' | 'medium' | 'hard' = 'medium'
  ): CalculatedRecipe[] {
    const variants: CalculatedRecipe[] = [];

    for (const category of NUTRITIONAL_CATEGORIES) {
      const categoryKey = category.id as 'equilibre' | 'perte_poids' | 'prise_masse';
      
      // Calculate optimized quantities for this category
      const optimizedQuantities = nutritionalCalculations.optimizeRecipeQuantities(
        baseIngredients.map(ing => ({ 
          key: ing.key, 
          type: ing.type, 
          priority: ing.priority 
        })),
        categoryKey
      );

      // Create full ingredient list with calculated quantities
      const ingredients: RecipeIngredient[] = baseIngredients.map(baseIng => {
        const optimized = optimizedQuantities.find(opt => opt.key === baseIng.key);
        return {
          ...baseIng,
          quantity: optimized?.quantity || CALCULATION_CONSTANTS.STANDARD_SERVING_SIZES[baseIng.type] || 100
        };
      });

      // Calculate total nutrition
      const nutrition = nutritionalCalculations.calculateTotalNutrition(
        ingredients.map(ing => ({ key: ing.key, quantity: ing.quantity }))
      );

      // Generate category-specific cooking instructions
      const cookingInstructions = this.generateCategorySpecificInstructions(
        baseCookingInstructions,
        categoryKey,
        ingredients
      );

      variants.push({
        category: category.name,
        ingredients,
        nutrition,
        cookingInstructions,
        portionSize: this.calculatePortionSize(ingredients),
        preparationTime: this.adjustPreparationTime(basePreparationTime, categoryKey),
        difficulty: baseDifficulty
      });
    }

    return variants;
  }

  /**
   * Calculate ingredient quantities for a specific nutritional target
   */
  static calculateForTarget(
    ingredients: Omit<RecipeIngredient, 'quantity'>[],
    targetNutrition: { calories: number; protein: number; carbs: number; fat: number },
    activityLevel: keyof typeof CALCULATION_CONSTANTS.ACTIVITY_MULTIPLIERS = 'moderate'
  ): RecipeIngredient[] {
    // First pass: calculate base quantities
    let remainingCalories = targetNutrition.calories;
    let remainingProtein = targetNutrition.protein;
    let remainingCarbs = targetNutrition.carbs;
    let remainingFat = targetNutrition.fat;

    const result: RecipeIngredient[] = [];

    // Sort by priority
    const sortedIngredients = [...ingredients].sort((a, b) => a.priority - b.priority);

    // Allocate main macronutrients first
    for (const ingredient of sortedIngredients) {
      const nutritionData = INGREDIENT_NUTRITIONAL_VALUES[ingredient.key];
      if (!nutritionData) continue;

      let quantity = 0;

      switch (ingredient.type) {
        case 'protein':
          if (remainingProtein > 0) {
            // Allocate 70-80% of remaining protein to this ingredient
            const targetProteinForThis = remainingProtein * 0.75;
            quantity = nutritionalCalculations.calculateProteinQuantity(ingredient.key, targetProteinForThis);
            
            const actualNutrition = nutritionalCalculations.calculateNutritionForQuantity(ingredient.key, quantity);
            remainingProtein -= actualNutrition.protein;
            remainingCalories -= actualNutrition.calories;
            remainingFat -= actualNutrition.fat;
          }
          break;

        case 'carbs':
          if (remainingCarbs > 0) {
            // Allocate 70-80% of remaining carbs to this ingredient
            const targetCarbsForThis = remainingCarbs * 0.75;
            quantity = nutritionalCalculations.calculateCarbQuantity(ingredient.key, targetCarbsForThis);
            
            const actualNutrition = nutritionalCalculations.calculateNutritionForQuantity(ingredient.key, quantity);
            remainingCarbs -= actualNutrition.carbs;
            remainingCalories -= actualNutrition.calories;
            remainingProtein -= actualNutrition.protein;
          }
          break;

        case 'vegetables':
          // Standard vegetable portion
          quantity = CALCULATION_CONSTANTS.STANDARD_SERVING_SIZES.vegetables;
          const vegNutrition = nutritionalCalculations.calculateNutritionForQuantity(ingredient.key, quantity);
          remainingCalories -= vegNutrition.calories;
          remainingCarbs -= vegNutrition.carbs;
          remainingProtein -= vegNutrition.protein;
          break;

        case 'fat':
          if (remainingFat > 0) {
            // Calculate quantity needed to meet fat target
            const targetFatForThis = Math.min(remainingFat, nutritionData.fat * 0.2); // Max 20g of this fat source
            quantity = Math.round((targetFatForThis / nutritionData.fat) * 100);
            
            const fatNutrition = nutritionalCalculations.calculateNutritionForQuantity(ingredient.key, quantity);
            remainingFat -= fatNutrition.fat;
            remainingCalories -= fatNutrition.calories;
          }
          break;

        case 'condiment':
          quantity = CALCULATION_CONSTANTS.STANDARD_SERVING_SIZES.condiment;
          break;
      }

      if (quantity > 0) {
        result.push({
          ...ingredient,
          quantity: Math.max(5, quantity) // Minimum 5g for any ingredient
        });
      }
    }

    // Adjust for activity level
    return nutritionalCalculations.adjustForActivityLevel(result, activityLevel).map(adjusted => {
      const original = result.find(r => r.key === adjusted.key);
      return original ? { ...original, quantity: adjusted.quantity } : original!;
    }).filter(Boolean);
  }

  /**
   * Generate cooking instructions specific to nutritional category
   */
  private static generateCategorySpecificInstructions(
    baseInstructions: string[],
    category: 'equilibre' | 'perte_poids' | 'prise_masse',
    ingredients: RecipeIngredient[]
  ): string[] {
    const instructions = [...baseInstructions];
    
    // Add category-specific cooking tips
    switch (category) {
      case 'perte_poids':
        instructions.unshift('💡 Version Perte de poids: Utilisez des méthodes de cuisson sans matière grasse (vapeur, grill, papillote)');
        instructions.push('🔥 Astuce: Assaisonnez généreusement avec des herbes et épices pour plus de saveur sans calories');
        break;
        
      case 'prise_masse':
        instructions.unshift('💪 Version Prise de masse: Portions généreuses pour maximiser l\'apport énergétique');
        instructions.push('🥑 Astuce: N\'hésitez pas à ajouter des sources de bonnes graisses (avocat, noix, huile d\'olive)');
        break;
        
      case 'equilibre':
        instructions.unshift('⚖️ Version Équilibrée: Portions modérées pour un apport nutritionnel optimal');
        instructions.push('🌟 Astuce: Variez les légumes selon les saisons pour plus de nutriments');
        break;
    }

    // Add ingredient-specific instructions
    const proteinIngredients = ingredients.filter(ing => ing.type === 'protein');
    const carbIngredients = ingredients.filter(ing => ing.type === 'carbs');

    if (proteinIngredients.length > 0) {
      const totalProteinQuantity = proteinIngredients.reduce((sum, ing) => sum + ing.quantity, 0);
      instructions.push(`🥩 Préparez ${totalProteinQuantity}g de protéines au total`);
    }

    if (carbIngredients.length > 0) {
      const totalCarbQuantity = carbIngredients.reduce((sum, ing) => sum + ing.quantity, 0);
      instructions.push(`🌾 Préparez ${totalCarbQuantity}g de glucides au total`);
    }

    return instructions;
  }

  /**
   * Calculate total portion size
   */
  private static calculatePortionSize(ingredients: RecipeIngredient[]): number {
    return ingredients.reduce((total, ing) => total + ing.quantity, 0);
  }

  /**
   * Adjust preparation time based on category complexity
   */
  private static adjustPreparationTime(baseTime: number, category: 'equilibre' | 'perte_poids' | 'prise_masse'): number {
    switch (category) {
      case 'perte_poids':
        return baseTime + 5; // Extra time for careful portion control and low-fat cooking
      case 'prise_masse':
        return baseTime + 10; // Extra time for larger portions and additional ingredients
      default:
        return baseTime;
    }
  }

  /**
   * Validate recipe against nutritional targets
   */
  static validateRecipe(recipe: CalculatedRecipe): {
    valid: boolean;
    issues: string[];
    suggestions: string[];
  } {
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Find matching category
    const category = NUTRITIONAL_CATEGORIES.find(cat => cat.name === recipe.category);
    if (!category) {
      issues.push('Catégorie nutritionnelle non reconnue');
      return { valid: false, issues, suggestions };
    }

    const categoryKey = category.id as 'equilibre' | 'perte_poids' | 'prise_masse';
    const validation = nutritionalCalculations.validateNutritionalTargets(recipe.nutrition, categoryKey);

    if (!validation.valid) {
      // Check specific deviations
      Object.entries(validation.deviations).forEach(([nutrient, deviation]) => {
        const percentage = Math.abs(deviation * 100);
        if (percentage > 5) {
          const direction = deviation > 0 ? 'trop élevé' : 'trop faible';
          issues.push(`${nutrient}: ${direction} de ${percentage.toFixed(1)}%`);
          
          if (nutrient === 'protein' && deviation < 0) {
            suggestions.push('Augmentez la quantité de protéines ou ajoutez une source protéique');
          } else if (nutrient === 'carbs' && deviation < 0) {
            suggestions.push('Augmentez la quantité de glucides complexes');
          } else if (nutrient === 'calories' && deviation > 0) {
            suggestions.push('Réduisez les portions ou remplacez par des aliments moins caloriques');
          }
        }
      });
    }

    // Check ingredient balance
    const proteinIngredients = recipe.ingredients.filter(ing => ing.type === 'protein');
    const vegIngredients = recipe.ingredients.filter(ing => ing.type === 'vegetables');

    if (proteinIngredients.length === 0) {
      issues.push('Aucune source de protéines détectée');
      suggestions.push('Ajoutez une source de protéines (viande, poisson, légumineuses, œufs)');
    }

    if (vegIngredients.length === 0) {
      issues.push('Aucun légume détecté');
      suggestions.push('Ajoutez des légumes pour les fibres et micronutriments');
    }

    return {
      valid: validation.valid && issues.length === 0,
      issues,
      suggestions
    };
  }

  /**
   * Generate shopping list with quantities
   */
  static generateShoppingList(recipes: CalculatedRecipe[], servings: number = 1): {
    ingredient: string;
    totalQuantity: number;
    unit: string;
    category: string;
  }[] {
    const aggregated = new Map<string, { quantity: number; type: string }>();

    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const key = ingredient.key;
        const existing = aggregated.get(key) || { quantity: 0, type: ingredient.type };
        existing.quantity += ingredient.quantity * servings;
        aggregated.set(key, existing);
      });
    });

    return Array.from(aggregated.entries()).map(([key, data]) => ({
      ingredient: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      totalQuantity: Math.round(data.quantity),
      unit: 'g',
      category: this.getIngredientCategory(data.type)
    })).sort((a, b) => a.category.localeCompare(b.category));
  }

  private static getIngredientCategory(type: string): string {
    switch (type) {
      case 'protein': return 'Protéines';
      case 'carbs': return 'Féculents';
      case 'vegetables': return 'Légumes';
      case 'fat': return 'Matières grasses';
      case 'condiment': return 'Condiments';
      default: return 'Autres';
    }
  }
}