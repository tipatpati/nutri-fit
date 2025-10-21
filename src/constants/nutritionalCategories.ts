export interface NutritionalProfile {
  proteins_percentage: number;
  carbs_percentage: number;
  vegetables_percentage: number;
  calories_per_serving: number;
  protein_grams: number;
  carbs_grams: number;
  fat_grams: number;
}

export interface NutritionalCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  nutritional_profile: NutritionalProfile;
}

export const NUTRITIONAL_CATEGORIES: NutritionalCategory[] = [
  {
    id: "equilibre",
    name: "Équilibré",
    description: "Alimentation équilibrée pour maintenir sa forme",
    color: "#D4B961",
    nutritional_profile: {
      proteins_percentage: 30,
      carbs_percentage: 40,
      vegetables_percentage: 30,
      calories_per_serving: 450,
      protein_grams: 35,
      carbs_grams: 45,
      fat_grams: 15
    }
  },
  {
    id: "perte_poids",
    name: "Minceur",
    description: "Faible en calories, riche en protéines",
    color: "#113B39",
    nutritional_profile: {
      proteins_percentage: 45,
      carbs_percentage: 25,
      vegetables_percentage: 30,
      calories_per_serving: 350,
      protein_grams: 40,
      carbs_grams: 22,
      fat_grams: 12
    }
  },
  {
    id: "prise_masse",
    name: "Prise de masse",
    description: "Riche en calories et protéines pour la croissance musculaire",
    color: "#FF4D00",
    nutritional_profile: {
      proteins_percentage: 35,
      carbs_percentage: 45,
      vegetables_percentage: 20,
      calories_per_serving: 650,
      protein_grams: 55,
      carbs_grams: 70,
      fat_grams: 25
    }
  }
];

export const getCategoryById = (id: string): NutritionalCategory | undefined => {
  return NUTRITIONAL_CATEGORIES.find(cat => cat.id === id);
};

export const getCategoryByName = (name: string): NutritionalCategory | undefined => {
  return NUTRITIONAL_CATEGORIES.find(cat => cat.name === name);
};