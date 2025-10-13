import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useCookRecipes = () => {
  return useQuery({
    queryKey: ['cook-recipes'],
    queryFn: async () => {
      const { data: meals, error } = await supabase
        .from('meals')
        .select(`
          *,
          meal_ingredients(
            quantity,
            ingredients(
              name,
              unit_of_measurement
            )
          )
        `)
        .eq('active', true)
        .order('name');

      if (error) throw error;

      return meals?.map(meal => ({
        id: meal.id,
        name: meal.name,
        category: meal.category,
        prepTime: meal.preparation_time_minutes || 30,
        servings: 0, // Will be calculated based on orders
        ingredients: meal.meal_ingredients?.map((mi: any) => 
          `${mi.quantity} ${mi.ingredients?.name || ''}`
        ).join(', ') || '',
      })) || [];
    },
  });
};
