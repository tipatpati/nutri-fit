import { supabase } from '@/integrations/supabase/client';
import { IMealRepository } from '@/core/repositories/IMealRepository';
import { Meal, MealFilters } from '@/core/entities/Meal';

export class SupabaseMealRepository implements IMealRepository {
  async getAll(filters?: MealFilters): Promise<Meal[]> {
    let query = supabase.from('meals').select('*').order('created_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.premium !== undefined) {
      query = query.eq('premium', filters.premium);
    }
    if (filters?.active !== undefined) {
      query = query.eq('active', filters.active);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching meals:', error);
      throw new Error('Failed to fetch meals');
    }

    // Map image_url to image for compatibility
    return (data || []).map(meal => ({
      ...meal,
      image: meal.image_url
    })) as Meal[];
  }

  async getById(id: string): Promise<Meal | null> {
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching meal:', error);
      return null;
    }

    return { ...data, image: data.image_url } as Meal;
  }

  async getByCategory(category: string): Promise<Meal[]> {
    return this.getAll({ category, active: true });
  }
}

// Export singleton instance
export const mealRepository = new SupabaseMealRepository();
