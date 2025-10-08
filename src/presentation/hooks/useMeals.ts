import { useQuery } from '@tanstack/react-query';
import { mealRepository } from '@/infrastructure/repositories/SupabaseMealRepository';
import { MealFilters } from '@/core/entities/Meal';

export const useMeals = (filters?: MealFilters) => {
  return useQuery({
    queryKey: ['meals', filters],
    queryFn: () => mealRepository.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMeal = (id: string) => {
  return useQuery({
    queryKey: ['meal', id],
    queryFn: () => mealRepository.getById(id),
    enabled: !!id,
  });
};

export const useMealsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['meals', 'category', category],
    queryFn: () => mealRepository.getByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};
