import { Meal, MealFilters } from '../entities/Meal';

export interface IMealRepository {
  getAll(filters?: MealFilters): Promise<Meal[]>;
  getById(id: string): Promise<Meal | null>;
  getByCategory(category: string): Promise<Meal[]>;
}
