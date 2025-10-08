export interface Meal {
  id: string;
  name: string;
  description: string;
  meat: string;
  vegetables: string;
  carbs: string;
  category: string;
  badge?: string;
  image_url?: string;
  image?: string; // Alias for image_url for compatibility
  premium: boolean;
  active: boolean;
  calories_per_serving?: number;
  protein_grams?: number;
  carbs_grams?: number;
  fat_grams?: number;
  serving_size?: string;
  allergens?: string[];
  dietary_restrictions?: string[];
  created_at: string;
  updated_at: string;
}

export interface MealFilters {
  category?: string;
  premium?: boolean;
  active?: boolean;
}
