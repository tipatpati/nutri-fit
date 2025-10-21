export interface MealItem {
  name: string;
  calories: string;
  protein: string;
  rating: number;
}

export interface MealCategory {
  id: string;
  name: string;
  description: string;
  step: string;
  meals: MealItem[];
}

export const mealCategories: MealCategory[] = [
  {
    id: 'bulking',
    name: 'Prise de masse',
    description: 'Repas riches en protéines et calories pour développer votre masse musculaire de façon optimale',
    step: '01',
    meals: [
      { name: 'Saumon grillé aux légumes', calories: '650 cal', protein: '45g protéines', rating: 4.9 },
      { name: 'Bœuf teriyaki avec riz', calories: '720 cal', protein: '52g protéines', rating: 4.8 },
      { name: 'Poulet aux champignons', calories: '680 cal', protein: '48g protéines', rating: 4.7 }
    ]
  },
  {
    id: 'cutting',
    name: 'Minceur',
    description: 'Repas faibles en calories mais riches en nutriments essentiels pour votre bien-être',
    step: '02',
    meals: [
      { name: 'Salade de quinoa au saumon', calories: '420 cal', protein: '32g protéines', rating: 4.9 },
      { name: 'Poulet grillé aux légumes verts', calories: '380 cal', protein: '35g protéines', rating: 4.8 },
      { name: 'Crevettes à l\'ail et épinards', calories: '350 cal', protein: '28g protéines', rating: 4.6 }
    ]
  },
  {
    id: 'balanced',
    name: 'Équilibré',
    description: 'Repas parfaitement équilibrés pour maintenir votre forme optimale au quotidien',
    step: '03',
    meals: [
      { name: 'Saumon aux légumes rôtis', calories: '550 cal', protein: '38g protéines', rating: 4.8 },
      { name: 'Poulet méditerranéen', calories: '520 cal', protein: '36g protéines', rating: 4.7 },
      { name: 'Bœuf aux légumes asiatiques', calories: '580 cal', protein: '42g protéines', rating: 4.9 }
    ]
  }
];
