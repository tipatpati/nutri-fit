import { CALCULATION_CONSTANTS } from '@/constants/nutritionalValues';

export interface IngredientQuantities {
  quantity_equilibre: number;
  quantity_perte_poids: number;
  quantity_prise_masse: number;
}

export interface NutrientTargets {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface IngredientNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

/**
 * Calculate ingredient quantities for all three nutritional categories
 * based on the ingredient's primary nutrient type and nutritional profile
 */
export const calculateIngredientQuantities = (
  nutrientType: 'protein' | 'carbs' | 'vegetables',
  ingredientNutrition: IngredientNutrition
): IngredientQuantities => {
  const targets = CALCULATION_CONSTANTS.NUTRITIONAL_TARGETS;

  const quantities: IngredientQuantities = {
    quantity_equilibre: 0,
    quantity_perte_poids: 0,
    quantity_prise_masse: 0,
  };

  // Calculate quantities for each category based on nutrient type
  Object.keys(targets).forEach((category) => {
    const categoryKey = category as keyof typeof targets;
    const target = targets[categoryKey];

    let quantity = 0;

    switch (nutrientType) {
      case 'protein':
        // Calculate based on protein target
        if (ingredientNutrition.protein > 0) {
          quantity = (target.protein / ingredientNutrition.protein) * 100;
        }
        break;

      case 'carbs':
        // Calculate based on carbs target
        if (ingredientNutrition.carbs > 0) {
          quantity = (target.carbs / ingredientNutrition.carbs) * 100;
        }
        break;

      case 'vegetables':
        // Vegetables are more about volume and fiber, use a standard portion
        // Adjusted per category: more for muscle gain, less for weight loss
        if (categoryKey === 'perte_poids') {
          quantity = 200; // 200g of vegetables for weight loss
        } else if (categoryKey === 'equilibre') {
          quantity = 150; // 150g for balanced
        } else if (categoryKey === 'prise_masse') {
          quantity = 180; // 180g for muscle gain
        }
        break;
    }

    // Map to correct field name
    const fieldName = `quantity_${categoryKey}` as keyof IngredientQuantities;
    quantities[fieldName] = Math.round(quantity);
  });

  return quantities;
};

/**
 * Calculate total nutrition for a recipe given ingredient quantities and their nutritional profiles
 */
export const calculateRecipeNutrition = (
  ingredients: Array<{
    nutrientType: 'protein' | 'carbs' | 'vegetables';
    quantity: number; // in grams
    nutrition: IngredientNutrition;
  }>
): IngredientNutrition => {
  const totals: IngredientNutrition = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };

  ingredients.forEach(({ quantity, nutrition }) => {
    const multiplier = quantity / 100; // nutrition is per 100g
    totals.calories += nutrition.calories * multiplier;
    totals.protein += nutrition.protein * multiplier;
    totals.carbs += nutrition.carbs * multiplier;
    totals.fat += nutrition.fat * multiplier;
  });

  return {
    calories: Math.round(totals.calories),
    protein: Math.round(totals.protein * 10) / 10,
    carbs: Math.round(totals.carbs * 10) / 10,
    fat: Math.round(totals.fat * 10) / 10,
  };
};

/**
 * Validate if calculated nutrition meets the targets for a category
 */
export const validateNutritionTargets = (
  nutrition: IngredientNutrition,
  category: 'equilibre' | 'perte_poids' | 'prise_masse'
): {
  valid: boolean;
  deviations: {
    protein: number;
    carbs: number;
    calories: number;
  };
} => {
  const target = CALCULATION_CONSTANTS.NUTRITIONAL_TARGETS[category];
  const tolerance = CALCULATION_CONSTANTS.MACRO_TOLERANCES;

  const deviations = {
    protein: ((nutrition.protein - target.protein) / target.protein) * 100,
    carbs: ((nutrition.carbs - target.carbs) / target.carbs) * 100,
    calories: ((nutrition.calories - target.calories) / target.calories) * 100,
  };

  const valid =
    Math.abs(deviations.protein) <= tolerance.protein * 100 &&
    Math.abs(deviations.carbs) <= tolerance.carbs * 100 &&
    Math.abs(deviations.calories) <= tolerance.calories * 100;

  return {
    valid,
    deviations: {
      protein: Math.round(deviations.protein),
      carbs: Math.round(deviations.carbs),
      calories: Math.round(deviations.calories),
    },
  };
};
