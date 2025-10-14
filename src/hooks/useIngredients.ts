import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Ingredient {
  id: string;
  name: string;
  type: string;
  primary_nutrient: 'protein' | 'carbs' | 'vegetables' | 'fat' | 'condiment';
  unit_of_measurement: string;
  nutritional_info: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
  } | null;
  current_stock: number;
  reorder_point: number;
  minimum_stock: number;
  active: boolean;
}

export const useIngredients = (filters?: { 
  primary_nutrient?: string;
  active?: boolean;
}) => {
  return useQuery({
    queryKey: ['ingredients', filters],
    queryFn: async () => {
      let query = supabase
        .from('ingredients')
        .select('*')
        .order('name');

      if (filters?.primary_nutrient) {
        query = query.eq('primary_nutrient', filters.primary_nutrient);
      }

      if (filters?.active !== undefined) {
        query = query.eq('active', filters.active);
      }

      const { data, error } = await query;

      if (error) throw error;
      return (data || []) as unknown as Ingredient[];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useIngredient = (id: string) => {
  return useQuery({
    queryKey: ['ingredient', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as unknown as Ingredient;
    },
    enabled: !!id,
  });
};
