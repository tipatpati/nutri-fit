import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { Ingredient } from './useIngredients';

type IngredientInput = Omit<Ingredient, 'id' | 'active'> & {
  active?: boolean;
};

export const useCreateIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ingredient: IngredientInput) => {
      const { data, error } = await supabase
        .from('ingredients')
        .insert([ingredient])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
      queryClient.invalidateQueries({ queryKey: ['inventory-data'] });
      toast({
        title: 'Ingrédient créé',
        description: 'L\'ingrédient a été ajouté avec succès.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erreur',
        description: `Impossible de créer l'ingrédient: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Ingredient> & { id: string }) => {
      const { data, error } = await supabase
        .from('ingredients')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
      queryClient.invalidateQueries({ queryKey: ['inventory-data'] });
      toast({
        title: 'Ingrédient mis à jour',
        description: 'L\'ingrédient a été modifié avec succès.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erreur',
        description: `Impossible de modifier l'ingrédient: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('ingredients')
        .update({ active: false })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
      queryClient.invalidateQueries({ queryKey: ['inventory-data'] });
      toast({
        title: 'Ingrédient supprimé',
        description: 'L\'ingrédient a été désactivé avec succès.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erreur',
        description: `Impossible de supprimer l'ingrédient: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};
