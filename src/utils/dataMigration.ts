import { supabase } from '@/integrations/supabase/client';
import { calculateIngredientQuantities } from './recipeQuantityCalculator';

/**
 * Data Migration Utility for Syncing Existing Recipes with Inventory System
 * 
 * This migrates existing meals (with text-based ingredients) to the new
 * meal_ingredients table with calculated quantities per nutritional category
 */

interface IngredientMatch {
  ingredientId: string;
  name: string;
  nutrientType: 'protein' | 'carbs' | 'vegetables';
  nutritionalInfo: any;
}

/**
 * Match meal text fields to actual ingredients in the database
 */
export async function matchMealToIngredients(meal: {
  meat: string;
  carbs: string;
  vegetables: string;
}): Promise<IngredientMatch[]> {
  const matches: IngredientMatch[] = [];

  // Fetch all active ingredients
  const { data: ingredients, error } = await supabase
    .from('ingredients')
    .select('*')
    .eq('active', true);

  if (error || !ingredients) {
    console.error('Error fetching ingredients:', error);
    return matches;
  }

  // Match protein (meat)
  const proteinMatch = ingredients.find(ing => 
    ing.primary_nutrient === 'protein' && 
    (meal.meat.toLowerCase().includes(ing.name.toLowerCase()) ||
     ing.name.toLowerCase().includes(meal.meat.toLowerCase().split(' ')[0]))
  );

  if (proteinMatch) {
    matches.push({
      ingredientId: proteinMatch.id,
      name: proteinMatch.name,
      nutrientType: 'protein',
      nutritionalInfo: proteinMatch.nutritional_info,
    });
  } else {
    // Default to chicken if no match
    const defaultProtein = ingredients.find(ing => 
      ing.primary_nutrient === 'protein' && 
      ing.name.toLowerCase().includes('poulet')
    );
    if (defaultProtein) {
      matches.push({
        ingredientId: defaultProtein.id,
        name: defaultProtein.name,
        nutrientType: 'protein',
        nutritionalInfo: defaultProtein.nutritional_info,
      });
    }
  }

  // Match carbs
  const carbsMatch = ingredients.find(ing => 
    ing.primary_nutrient === 'carbs' && 
    (meal.carbs.toLowerCase().includes(ing.name.toLowerCase()) ||
     ing.name.toLowerCase().includes(meal.carbs.toLowerCase().split(' ')[0]))
  );

  if (carbsMatch) {
    matches.push({
      ingredientId: carbsMatch.id,
      name: carbsMatch.name,
      nutrientType: 'carbs',
      nutritionalInfo: carbsMatch.nutritional_info,
    });
  } else {
    // Default to rice if no match
    const defaultCarbs = ingredients.find(ing => 
      ing.primary_nutrient === 'carbs' && 
      ing.name.toLowerCase().includes('riz')
    );
    if (defaultCarbs) {
      matches.push({
        ingredientId: defaultCarbs.id,
        name: defaultCarbs.name,
        nutrientType: 'carbs',
        nutritionalInfo: defaultCarbs.nutritional_info,
      });
    }
  }

  // Match vegetables
  const vegetablesMatch = ingredients.find(ing => 
    ing.primary_nutrient === 'vegetables' && 
    (meal.vegetables.toLowerCase().includes(ing.name.toLowerCase()) ||
     ing.name.toLowerCase().includes(meal.vegetables.toLowerCase().split(' ')[0]))
  );

  if (vegetablesMatch) {
    matches.push({
      ingredientId: vegetablesMatch.id,
      name: vegetablesMatch.name,
      nutrientType: 'vegetables',
      nutritionalInfo: vegetablesMatch.nutritional_info,
    });
  } else {
    // Default to mixed vegetables if no match
    const defaultVegetables = ingredients.find(ing => 
      ing.primary_nutrient === 'vegetables'
    );
    if (defaultVegetables) {
      matches.push({
        ingredientId: defaultVegetables.id,
        name: defaultVegetables.name,
        nutrientType: 'vegetables',
        nutritionalInfo: defaultVegetables.nutritional_info,
      });
    }
  }

  return matches;
}

/**
 * Migrate a single meal to the new ingredient system
 */
export async function migrateMeal(mealId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Fetch the meal
    const { data: meal, error: mealError } = await supabase
      .from('meals')
      .select('*')
      .eq('id', mealId)
      .single();

    if (mealError || !meal) {
      return { success: false, error: 'Meal not found' };
    }

    // Check if already migrated
    const { data: existing } = await supabase
      .from('meal_ingredients')
      .select('id')
      .eq('meal_id', mealId)
      .limit(1);

    if (existing && existing.length > 0) {
      return { success: true, error: 'Already migrated' };
    }

    // Match ingredients
    const matches = await matchMealToIngredients({
      meat: meal.meat,
      carbs: meal.carbs,
      vegetables: meal.vegetables,
    });

    if (matches.length === 0) {
      return { success: false, error: 'No ingredient matches found' };
    }

    // Create meal_ingredients with calculated quantities
    const mealIngredients = matches.map(match => {
      const quantities = calculateIngredientQuantities(
        match.nutrientType,
        match.nutritionalInfo || { calories: 0, protein: 0, carbs: 0, fat: 0 }
      );

      return {
        meal_id: mealId,
        ingredient_id: match.ingredientId,
        nutrient_type: match.nutrientType,
        ...quantities,
        is_primary: true,
      };
    });

    const { error: insertError } = await supabase
      .from('meal_ingredients')
      .insert(mealIngredients);

    if (insertError) {
      return { success: false, error: insertError.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Migration error:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Migrate all meals in the database
 */
export async function migrateAllMeals(): Promise<{
  total: number;
  migrated: number;
  skipped: number;
  failed: number;
  errors: string[];
}> {
  const results = {
    total: 0,
    migrated: 0,
    skipped: 0,
    failed: 0,
    errors: [] as string[],
  };

  try {
    // Fetch all active meals
    const { data: meals, error } = await supabase
      .from('meals')
      .select('id, name')
      .eq('active', true);

    if (error || !meals) {
      results.errors.push('Failed to fetch meals');
      return results;
    }

    results.total = meals.length;

    // Migrate each meal
    for (const meal of meals) {
      const result = await migrateMeal(meal.id);
      
      if (result.success) {
        if (result.error === 'Already migrated') {
          results.skipped++;
        } else {
          results.migrated++;
        }
      } else {
        results.failed++;
        results.errors.push(`${meal.name}: ${result.error}`);
      }
    }

    return results;
  } catch (error) {
    results.errors.push(String(error));
    return results;
  }
}
