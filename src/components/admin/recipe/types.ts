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