export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  avatar_url?: string;
}

export interface UserProfile extends User {
  dietary_preferences?: string[];
  allergens?: string[];
  fitness_goals?: string[];
  activity_level?: string;
}
