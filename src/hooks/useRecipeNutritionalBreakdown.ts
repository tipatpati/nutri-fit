import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface RecipeNutritionalBreakdown {
  meal_id: string;
  name: string;
  category: string;
  base_recipe: boolean;
  equilibre_calories: number;
  equilibre_protein: number;
  equilibre_carbs: number;
  equilibre_fat: number;
  perte_poids_calories: number;
  perte_poids_protein: number;
  perte_poids_carbs: number;
  perte_poids_fat: number;
  prise_masse_calories: number;
  prise_masse_protein: number;
  prise_masse_carbs: number;
  prise_masse_fat: number;
}

export const useRecipeNutritionalBreakdown = (mealId?: string) => {
  return useQuery({
    queryKey: ['recipe-nutritional-breakdown', mealId],
    queryFn: async () => {
      let query = supabase
        .from('meals_nutritional_breakdown')
        .select('*');

      if (mealId) {
        query = query.eq('meal_id', mealId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as RecipeNutritionalBreakdown[];
    },
    enabled: !!mealId || mealId === undefined,
  });
};
