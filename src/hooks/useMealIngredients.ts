import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface MealIngredient {
  id: string;
  meal_id: string;
  ingredient_id: string;
  nutrient_type: 'protein' | 'carbs' | 'vegetables' | 'fat' | 'condiment';
  quantity_equilibre: number;
  quantity_perte_poids: number;
  quantity_prise_masse: number;
  is_primary: boolean;
}

export interface MealIngredientWithDetails extends MealIngredient {
  ingredient: {
    name: string;
    type: string;
    primary_nutrient: string;
    unit_of_measurement: string;
    nutritional_info: any;
  };
}

export const useMealIngredients = (mealId: string) => {
  return useQuery({
    queryKey: ['meal-ingredients', mealId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meal_ingredients')
        .select(`
          *,
          ingredient:ingredients(*)
        `)
        .eq('meal_id', mealId);

      if (error) throw error;
      return data as MealIngredientWithDetails[];
    },
    enabled: !!mealId,
  });
};

export const useCreateMealIngredients = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ingredients: Omit<MealIngredient, 'id'>[]) => {
      const { data, error } = await supabase
        .from('meal_ingredients')
        .insert(ingredients)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['meal-ingredients', variables[0]?.meal_id] });
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      toast.success('Ingrédients ajoutés à la recette');
    },
    onError: (error) => {
      console.error('Error creating meal ingredients:', error);
      toast.error('Erreur lors de l\'ajout des ingrédients');
    },
  });
};

export const useDeleteMealIngredients = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mealId: string) => {
      const { error } = await supabase
        .from('meal_ingredients')
        .delete()
        .eq('meal_id', mealId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-ingredients'] });
      queryClient.invalidateQueries({ queryKey: ['meals'] });
    },
    onError: (error) => {
      console.error('Error deleting meal ingredients:', error);
      toast.error('Erreur lors de la suppression des ingrédients');
    },
  });
};
