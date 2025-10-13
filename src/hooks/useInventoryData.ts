import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useInventoryData = () => {
  return useQuery({
    queryKey: ['inventory-data'],
    queryFn: async () => {
      const { data: ingredients, error } = await supabase
        .from('ingredients')
        .select('*')
        .eq('active', true)
        .order('name');

      if (error) throw error;

      const inventory = ingredients?.map(ingredient => {
        const quantity = ingredient.current_stock || 0;
        const minLevel = ingredient.reorder_point || 0;
        
        let status = 'En stock';
        if (quantity === 0) {
          status = 'Stock critique';
        } else if (quantity <= minLevel) {
          status = 'Stock faible';
        }

        return {
          name: ingredient.name,
          quantity,
          unit: ingredient.unit_of_measurement || 'g',
          status,
          minLevel
        };
      }) || [];

      const activeIngredients = ingredients?.length || 0;

      return {
        inventory,
        activeIngredients
      };
    }
  });
};
