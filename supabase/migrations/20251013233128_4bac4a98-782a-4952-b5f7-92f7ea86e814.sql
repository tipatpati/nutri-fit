-- Insert the initial subscription plans with correct delivery_frequency values
INSERT INTO public.subscription_plans (name, description, meals_per_week, price_per_week, price_per_meal, delivery_frequency, features, active, promoted, display_order)
VALUES
  (
    'Pack Express',
    'Parfait pour découvrir nos repas',
    4,
    36.00,
    9.00,
    'weekly',
    '["4 repas équilibrés par semaine", "Livraison 1 fois par semaine", "Flexibilité de pause", "Menu personnalisable"]'::jsonb,
    true,
    false,
    1
  ),
  (
    'Pack 3 Day Performance',
    'Idéal pour 3 jours de performance',
    6,
    51.00,
    8.50,
    'bi-weekly',
    '["6 repas équilibrés par semaine", "Livraison 2 fois par semaine", "Flexibilité de pause", "Menu personnalisable", "Support prioritaire"]'::jsonb,
    true,
    false,
    2
  ),
  (
    'Pack Semaine',
    'Notre pack le plus populaire',
    8,
    64.00,
    8.00,
    'bi-weekly',
    '["8 repas équilibrés par semaine", "Livraison 2 fois par semaine", "Flexibilité de pause", "Menu personnalisable", "Support prioritaire"]'::jsonb,
    true,
    true,
    3
  ),
  (
    'Pack Objectif',
    'Pour atteindre vos objectifs',
    10,
    75.00,
    7.50,
    'bi-weekly',
    '["10 repas équilibrés par semaine", "Livraison 2 fois par semaine", "Flexibilité de pause", "Menu personnalisable", "Support prioritaire", "Consultation nutritionniste"]'::jsonb,
    true,
    false,
    4
  )
ON CONFLICT (id) DO NOTHING;