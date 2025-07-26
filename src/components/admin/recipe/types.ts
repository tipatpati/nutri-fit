import { NutritionalProfile } from "@/constants/nutritionalCategories";

export interface Meal {
  id: string;
  name: string;
  description: string;
  meat: string;
  vegetables: string;
  carbs: string;
  category: string;
  premium: boolean;
  badge?: string;
  image_url?: string;
  base_recipe?: boolean; // Indicates if this is the base recipe or a category variant
  category_variants?: MealCategoryVariant[];
}

export interface MealCategoryVariant {
  category_id: string;
  nutritional_profile: NutritionalProfile;
}

export interface RecipeFormData {
  name: string;
  description: string;
  meat: string;
  vegetables: string;
  carbs: string;
  category: string;
  premium: boolean;
  badge: string;
  image_url: string;
}