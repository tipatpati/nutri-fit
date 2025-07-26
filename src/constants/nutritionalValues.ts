// Base nutritional values per 100g for common ingredients
export interface NutritionalData {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber: number; // grams
  sugar: number; // grams
  sodium: number; // mg
  density?: number; // g/ml for liquids
}

// Comprehensive ingredient nutritional database
export const INGREDIENT_NUTRITIONAL_VALUES: Record<string, NutritionalData> = {
  // Proteins / Meat
  "chicken_breast": { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0, sodium: 74 },
  "chicken_thigh": { calories: 209, protein: 26, carbs: 0, fat: 10.9, fiber: 0, sugar: 0, sodium: 84 },
  "beef_lean": { calories: 250, protein: 26, carbs: 0, fat: 15, fiber: 0, sugar: 0, sodium: 72 },
  "salmon": { calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, sugar: 0, sodium: 75 },
  "tuna": { calories: 132, protein: 28, carbs: 0, fat: 1, fiber: 0, sugar: 0, sodium: 39 },
  "eggs": { calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, sugar: 1.1, sodium: 124 },
  "tofu": { calories: 76, protein: 8, carbs: 1.9, fat: 4.8, fiber: 0.3, sugar: 0.6, sodium: 7 },
  "lentils": { calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 7.9, sugar: 1.8, sodium: 2 },

  // Carbohydrates
  "rice_basmati": { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, sugar: 0, sodium: 1 },
  "rice_brown": { calories: 123, protein: 2.6, carbs: 25, fat: 0.9, fiber: 1.6, sugar: 0.4, sodium: 1 },
  "quinoa": { calories: 120, protein: 4.4, carbs: 22, fat: 1.9, fiber: 2.8, sugar: 0.9, sodium: 5 },
  "pasta_whole_wheat": { calories: 124, protein: 5, carbs: 25, fat: 0.6, fiber: 3.2, sugar: 0.8, sodium: 3 },
  "sweet_potato": { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, sugar: 4.2, sodium: 5 },
  "oats": { calories: 389, protein: 16.9, carbs: 66, fat: 6.9, fiber: 10.6, sugar: 0.99, sodium: 2 },

  // Vegetables
  "broccoli": { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, sugar: 1.5, sodium: 33 },
  "spinach": { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, sugar: 0.4, sodium: 79 },
  "carrots": { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, sugar: 4.7, sodium: 69 },
  "bell_pepper": { calories: 31, protein: 1, carbs: 7, fat: 0.3, fiber: 2.5, sugar: 4.2, sodium: 4 },
  "zucchini": { calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, fiber: 1, sugar: 2.5, sodium: 8 },
  "tomatoes": { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, sugar: 2.6, sodium: 5 },
  "cucumber": { calories: 16, protein: 0.7, carbs: 4, fat: 0.1, fiber: 0.5, sugar: 1.7, sodium: 2 },
  "asparagus": { calories: 20, protein: 2.2, carbs: 3.9, fat: 0.1, fiber: 2.1, sugar: 1.9, sodium: 2 },

  // Fats/Oils
  "olive_oil": { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, sugar: 0, sodium: 2, density: 0.91 },
  "avocado": { calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, sugar: 0.7, sodium: 7 },
  "nuts_almonds": { calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 12, sugar: 4.4, sodium: 1 },
  "nuts_walnuts": { calories: 654, protein: 15, carbs: 14, fat: 65, fiber: 6.7, sugar: 2.6, sodium: 2 },

  // Dairy alternatives
  "almond_milk": { calories: 17, protein: 0.6, carbs: 1.5, fat: 1.1, fiber: 0.3, sugar: 1.3, sodium: 63, density: 1.03 },
  "coconut_milk": { calories: 230, protein: 2.3, carbs: 6, fat: 24, fiber: 0, sugar: 3.3, sodium: 15, density: 0.97 },
};

// Calculation constants
export const CALCULATION_CONSTANTS = {
  // Standard serving sizes in grams
  STANDARD_SERVING_SIZES: {
    protein_main: 150, // Main protein portion
    protein_side: 75,  // Side protein portion
    carbs_main: 100,   // Main carb portion
    carbs_side: 50,    // Side carb portion
    vegetables: 150,   // Standard vegetable portion
    fat_source: 15,    // Fat/oil portion
    condiment: 10,     // Condiment portion
  },

  // Nutritional targets per category (per serving)
  NUTRITIONAL_TARGETS: {
    equilibre: {
      calories: 450,
      protein: 35,
      carbs: 45,
      fat: 15,
      fiber_min: 8,
    },
    perte_poids: {
      calories: 350,
      protein: 40,
      carbs: 22,
      fat: 12,
      fiber_min: 10,
    },
    prise_masse: {
      calories: 650,
      protein: 55,
      carbs: 70,
      fat: 25,
      fiber_min: 12,
    },
  },

  // Cooking adjustments (weight changes during cooking)
  COOKING_FACTORS: {
    rice_raw_to_cooked: 2.5,
    pasta_raw_to_cooked: 2.2,
    quinoa_raw_to_cooked: 3.0,
    meat_raw_to_cooked: 0.75, // 25% weight loss
    vegetables_raw_to_cooked: 0.85, // 15% weight loss
  },

  // Portion adjustment factors based on activity level
  ACTIVITY_MULTIPLIERS: {
    sedentary: 0.9,
    light: 1.0,
    moderate: 1.1,
    active: 1.2,
    very_active: 1.3,
  },

  // Macro distribution tolerances (±%)
  MACRO_TOLERANCES: {
    protein: 0.1,   // ±10%
    carbs: 0.15,    // ±15%
    fat: 0.2,       // ±20%
    calories: 0.05, // ±5%
  },
};

// Utility functions for nutritional calculations
export const nutritionalCalculations = {
  /**
   * Calculate required ingredient quantity to meet protein target
   */
  calculateProteinQuantity(ingredientKey: string, targetProtein: number): number {
    const ingredient = INGREDIENT_NUTRITIONAL_VALUES[ingredientKey];
    if (!ingredient) return 0;
    
    return Math.round((targetProtein / ingredient.protein) * 100);
  },

  /**
   * Calculate required ingredient quantity to meet carb target
   */
  calculateCarbQuantity(ingredientKey: string, targetCarbs: number): number {
    const ingredient = INGREDIENT_NUTRITIONAL_VALUES[ingredientKey];
    if (!ingredient) return 0;
    
    return Math.round((targetCarbs / ingredient.carbs) * 100);
  },

  /**
   * Calculate nutritional values for a given quantity of ingredient
   */
  calculateNutritionForQuantity(ingredientKey: string, quantity: number): NutritionalData {
    const ingredient = INGREDIENT_NUTRITIONAL_VALUES[ingredientKey];
    if (!ingredient) {
      return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 };
    }

    const factor = quantity / 100;
    return {
      calories: Math.round(ingredient.calories * factor),
      protein: Math.round(ingredient.protein * factor * 10) / 10,
      carbs: Math.round(ingredient.carbs * factor * 10) / 10,
      fat: Math.round(ingredient.fat * factor * 10) / 10,
      fiber: Math.round(ingredient.fiber * factor * 10) / 10,
      sugar: Math.round(ingredient.sugar * factor * 10) / 10,
      sodium: Math.round(ingredient.sodium * factor),
    };
  },

  /**
   * Calculate total nutritional values for multiple ingredients
   */
  calculateTotalNutrition(ingredients: { key: string; quantity: number }[]): NutritionalData {
    return ingredients.reduce((total, { key, quantity }) => {
      const nutrition = this.calculateNutritionForQuantity(key, quantity);
      return {
        calories: total.calories + nutrition.calories,
        protein: Math.round((total.protein + nutrition.protein) * 10) / 10,
        carbs: Math.round((total.carbs + nutrition.carbs) * 10) / 10,
        fat: Math.round((total.fat + nutrition.fat) * 10) / 10,
        fiber: Math.round((total.fiber + nutrition.fiber) * 10) / 10,
        sugar: Math.round((total.sugar + nutrition.sugar) * 10) / 10,
        sodium: total.sodium + nutrition.sodium,
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 });
  },

  /**
   * Optimize ingredient quantities to meet nutritional targets
   */
  optimizeRecipeQuantities(
    ingredients: { key: string; type: 'protein' | 'carbs' | 'vegetables' | 'fat' | 'condiment'; priority: number }[],
    category: 'equilibre' | 'perte_poids' | 'prise_masse'
  ): { key: string; quantity: number }[] {
    const targets = CALCULATION_CONSTANTS.NUTRITIONAL_TARGETS[category];
    const result: { key: string; quantity: number }[] = [];

    // Sort ingredients by priority
    const sortedIngredients = [...ingredients].sort((a, b) => a.priority - b.priority);

    let remainingProtein = targets.protein;
    let remainingCarbs = targets.carbs;
    let remainingCalories = targets.calories;

    // First pass: allocate primary macronutrients
    for (const ingredient of sortedIngredients) {
      const nutritionData = INGREDIENT_NUTRITIONAL_VALUES[ingredient.key];
      if (!nutritionData) continue;

      let quantity = 0;

      switch (ingredient.type) {
        case 'protein':
          if (remainingProtein > 0) {
            quantity = this.calculateProteinQuantity(ingredient.key, remainingProtein * 0.8);
            const nutrition = this.calculateNutritionForQuantity(ingredient.key, quantity);
            remainingProtein -= nutrition.protein;
          }
          break;
        
        case 'carbs':
          if (remainingCarbs > 0) {
            quantity = this.calculateCarbQuantity(ingredient.key, remainingCarbs * 0.8);
            const nutrition = this.calculateNutritionForQuantity(ingredient.key, quantity);
            remainingCarbs -= nutrition.carbs;
          }
          break;
        
        case 'vegetables':
          quantity = CALCULATION_CONSTANTS.STANDARD_SERVING_SIZES.vegetables;
          break;
        
        case 'fat':
          quantity = CALCULATION_CONSTANTS.STANDARD_SERVING_SIZES.fat_source;
          break;
        
        case 'condiment':
          quantity = CALCULATION_CONSTANTS.STANDARD_SERVING_SIZES.condiment;
          break;
      }

      if (quantity > 0) {
        result.push({ key: ingredient.key, quantity });
        const nutrition = this.calculateNutritionForQuantity(ingredient.key, quantity);
        remainingCalories -= nutrition.calories;
      }
    }

    return result;
  },

  /**
   * Validate if recipe meets nutritional targets within tolerance
   */
  validateNutritionalTargets(
    recipeNutrition: NutritionalData,
    category: 'equilibre' | 'perte_poids' | 'prise_masse'
  ): { valid: boolean; deviations: Record<string, number> } {
    const targets = CALCULATION_CONSTANTS.NUTRITIONAL_TARGETS[category];
    const tolerances = CALCULATION_CONSTANTS.MACRO_TOLERANCES;

    const deviations = {
      calories: (recipeNutrition.calories - targets.calories) / targets.calories,
      protein: (recipeNutrition.protein - targets.protein) / targets.protein,
      carbs: (recipeNutrition.carbs - targets.carbs) / targets.carbs,
      fat: (recipeNutrition.fat - targets.fat) / targets.fat,
    };

    const valid = 
      Math.abs(deviations.calories) <= tolerances.calories &&
      Math.abs(deviations.protein) <= tolerances.protein &&
      Math.abs(deviations.carbs) <= tolerances.carbs &&
      Math.abs(deviations.fat) <= tolerances.fat;

    return { valid, deviations };
  },

  /**
   * Adjust recipe quantities based on activity level
   */
  adjustForActivityLevel(
    baseQuantities: { key: string; quantity: number }[],
    activityLevel: keyof typeof CALCULATION_CONSTANTS.ACTIVITY_MULTIPLIERS
  ): { key: string; quantity: number }[] {
    const multiplier = CALCULATION_CONSTANTS.ACTIVITY_MULTIPLIERS[activityLevel];
    
    return baseQuantities.map(({ key, quantity }) => ({
      key,
      quantity: Math.round(quantity * multiplier)
    }));
  },

  /**
   * Convert raw ingredient quantities to cooked quantities
   */
  convertToCookedQuantities(
    rawQuantities: { key: string; quantity: number }[]
  ): { key: string; rawQuantity: number; cookedQuantity: number }[] {
    return rawQuantities.map(({ key, quantity }) => {
      let cookedQuantity = quantity;
      
      // Apply cooking factors based on ingredient type
      if (key.includes('rice')) {
        cookedQuantity = Math.round(quantity * CALCULATION_CONSTANTS.COOKING_FACTORS.rice_raw_to_cooked);
      } else if (key.includes('pasta')) {
        cookedQuantity = Math.round(quantity * CALCULATION_CONSTANTS.COOKING_FACTORS.pasta_raw_to_cooked);
      } else if (key.includes('quinoa')) {
        cookedQuantity = Math.round(quantity * CALCULATION_CONSTANTS.COOKING_FACTORS.quinoa_raw_to_cooked);
      } else if (key.includes('chicken') || key.includes('beef') || key.includes('salmon') || key.includes('tuna')) {
        cookedQuantity = Math.round(quantity * CALCULATION_CONSTANTS.COOKING_FACTORS.meat_raw_to_cooked);
      } else if (INGREDIENT_NUTRITIONAL_VALUES[key] && 
                 ['broccoli', 'spinach', 'carrots', 'bell_pepper', 'zucchini', 'asparagus'].some(veg => key.includes(veg))) {
        cookedQuantity = Math.round(quantity * CALCULATION_CONSTANTS.COOKING_FACTORS.vegetables_raw_to_cooked);
      }

      return {
        key,
        rawQuantity: quantity,
        cookedQuantity
      };
    });
  }
};