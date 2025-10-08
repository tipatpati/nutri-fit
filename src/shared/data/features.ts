export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: '🍽️',
    title: 'Frais, jamais congelé',
    description: 'Tous nos repas sont préparés frais quotidiennement avec des ingrédients de première qualité sourced localement'
  },
  {
    icon: '🚴',
    title: 'Spécialement pour les athlètes',
    description: 'Repas conçus par des nutritionnistes sportifs certifiés pour optimiser vos performances et atteindre vos objectifs'
  },
  {
    icon: '⏱️',
    title: 'Prêt en 2 minutes',
    description: 'Réchauffez et savourez. Pas de préparation, pas de vaisselle, plus de temps pour vous'
  },
  {
    icon: '🌱',
    title: 'Ingrédients de qualité',
    description: 'Nous utilisons uniquement des ingrédients frais, locaux et biologiques certifiés'
  }
];

export interface Testimonial {
  author: string;
  role: string;
  tenure: string;
  rating: number;
  content: string;
  initial: string;
}

export const testimonial: Testimonial = {
  author: 'Laura Benali',
  role: 'Coach sportive',
  tenure: 'Cliente depuis 2 ans',
  rating: 5.0,
  content: 'Les repas sont délicieux et m\'aident vraiment à atteindre mes objectifs de fitness. La livraison est toujours à l\'heure et la qualité constante. Le service client est exceptionnel !',
  initial: 'L'
};

export interface Stats {
  overall: {
    rating: number;
    reviews: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
}

export const stats: Stats = {
  overall: {
    rating: 4.8,
    reviews: '2,847'
  },
  metrics: [
    { label: 'Clients satisfaits', value: '10K+' },
    { label: 'Taux de satisfaction', value: '98%' },
    { label: 'Repas livrés', value: '2M+' }
  ]
};
