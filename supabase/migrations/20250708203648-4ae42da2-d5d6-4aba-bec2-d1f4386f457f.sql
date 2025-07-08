-- Enterprise-level database schema refactoring
-- This migration normalizes the meals table and creates proper relationships

-- 1. Create ingredients table for normalized ingredient management
CREATE TABLE public.ingredients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('meat', 'vegetable', 'carb')),
  description TEXT,
  nutritional_info JSONB,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Create meal_ingredients junction table for many-to-many relationships
CREATE TABLE public.meal_ingredients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  meal_id UUID NOT NULL,
  ingredient_id UUID NOT NULL,
  quantity TEXT,
  preparation_method TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(meal_id, ingredient_id)
);

-- 3. Create categories table for better category management
CREATE TABLE public.meal_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  color_code TEXT,
  display_order INTEGER,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Create meal_tags table for flexible tagging system
CREATE TABLE public.meal_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Create meal_tag_assignments junction table
CREATE TABLE public.meal_tag_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  meal_id UUID NOT NULL,
  tag_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(meal_id, tag_id)
);

-- 6. Add new columns to meals table and prepare for migration
ALTER TABLE public.meals ADD COLUMN category_id UUID;
ALTER TABLE public.meals ADD COLUMN calories_per_serving INTEGER;
ALTER TABLE public.meals ADD COLUMN protein_grams DECIMAL(5,2);
ALTER TABLE public.meals ADD COLUMN carbs_grams DECIMAL(5,2);
ALTER TABLE public.meals ADD COLUMN fat_grams DECIMAL(5,2);
ALTER TABLE public.meals ADD COLUMN serving_size TEXT;
ALTER TABLE public.meals ADD COLUMN preparation_time_minutes INTEGER;
ALTER TABLE public.meals ADD COLUMN difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5);
ALTER TABLE public.meals ADD COLUMN allergens TEXT[];
ALTER TABLE public.meals ADD COLUMN dietary_restrictions TEXT[];
ALTER TABLE public.meals ADD COLUMN availability_start_date DATE;
ALTER TABLE public.meals ADD COLUMN availability_end_date DATE;
ALTER TABLE public.meals ADD COLUMN active BOOLEAN NOT NULL DEFAULT true;

-- 7. Insert default categories
INSERT INTO public.meal_categories (name, description, color_code, display_order) VALUES
('Équilibré', 'Repas équilibrés pour un mode de vie sain', '#D4B961', 1),
('Perte de poids', 'Repas optimisés pour la perte de poids', '#113B39', 2),
('Prise de masse', 'Repas riches en protéines pour la prise de masse', '#FF4D00', 3);

-- 8. Insert common ingredients from existing meals
INSERT INTO public.ingredients (name, type, description) VALUES
-- Meats
('Blanc de poulet grillé', 'meat', 'Blanc de poulet grillé sans peau'),
('Poulet épicé', 'meat', 'Poulet avec assaisonnement épicé'),
('Émincé de poulet', 'meat', 'Poulet découpé en lamelles'),
('Poulet grillé', 'meat', 'Poulet grillé traditionnel'),

-- Vegetables
('Légumes vapeur', 'vegetable', 'Mélange de légumes cuits à la vapeur'),
('Légumes croquants', 'vegetable', 'Légumes frais et croquants'),
('Légumes fondants', 'vegetable', 'Légumes cuits tendres'),
('Poêlée de légumes', 'vegetable', 'Légumes sautés à la poêle'),

-- Carbs
('Riz basmati', 'carb', 'Riz basmati de qualité premium'),
('Pommes de terre rôties', 'carb', 'Pommes de terre rôties au four'),
('Patate douce rôtie', 'carb', 'Patate douce rôtie au four'),
('Pâtes complètes', 'carb', 'Pâtes complètes riches en fibres');

-- 9. Migrate existing data to new structure
-- Update category_id based on existing category text
UPDATE public.meals 
SET category_id = (SELECT id FROM public.meal_categories WHERE name = meals.category);

-- 10. Create foreign key constraints
ALTER TABLE public.meal_ingredients 
ADD CONSTRAINT fk_meal_ingredients_meal 
FOREIGN KEY (meal_id) REFERENCES public.meals(id) ON DELETE CASCADE;

ALTER TABLE public.meal_ingredients 
ADD CONSTRAINT fk_meal_ingredients_ingredient 
FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id) ON DELETE CASCADE;

ALTER TABLE public.meals 
ADD CONSTRAINT fk_meals_category 
FOREIGN KEY (category_id) REFERENCES public.meal_categories(id);

ALTER TABLE public.meal_tag_assignments 
ADD CONSTRAINT fk_meal_tag_assignments_meal 
FOREIGN KEY (meal_id) REFERENCES public.meals(id) ON DELETE CASCADE;

ALTER TABLE public.meal_tag_assignments 
ADD CONSTRAINT fk_meal_tag_assignments_tag 
FOREIGN KEY (tag_id) REFERENCES public.meal_tags(id) ON DELETE CASCADE;

-- 11. Create performance indexes
CREATE INDEX idx_meals_category_id ON public.meals(category_id);
CREATE INDEX idx_meals_premium ON public.meals(premium);
CREATE INDEX idx_meals_active ON public.meals(active);
CREATE INDEX idx_meals_availability ON public.meals(availability_start_date, availability_end_date);
CREATE INDEX idx_meals_created_at ON public.meals(created_at);
CREATE INDEX idx_ingredients_type ON public.ingredients(type);
CREATE INDEX idx_ingredients_active ON public.ingredients(active);
CREATE INDEX idx_meal_ingredients_meal_id ON public.meal_ingredients(meal_id);
CREATE INDEX idx_meal_ingredients_ingredient_id ON public.meal_ingredients(ingredient_id);
CREATE INDEX idx_meal_tag_assignments_meal_id ON public.meal_tag_assignments(meal_id);
CREATE INDEX idx_meal_tag_assignments_tag_id ON public.meal_tag_assignments(tag_id);

-- 12. Enable RLS on new tables
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_tag_assignments ENABLE ROW LEVEL SECURITY;

-- 13. Create RLS policies for new tables
-- Ingredients policies
CREATE POLICY "Ingredients are viewable by everyone" 
ON public.ingredients FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage ingredients" 
ON public.ingredients FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Meal ingredients policies
CREATE POLICY "Meal ingredients are viewable by everyone" 
ON public.meal_ingredients FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage meal ingredients" 
ON public.meal_ingredients FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone" 
ON public.meal_categories FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage categories" 
ON public.meal_categories FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Tags policies
CREATE POLICY "Tags are viewable by everyone" 
ON public.meal_tags FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage tags" 
ON public.meal_tags FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Tag assignments policies
CREATE POLICY "Tag assignments are viewable by everyone" 
ON public.meal_tag_assignments FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage tag assignments" 
ON public.meal_tag_assignments FOR ALL 
USING (auth.uid() IS NOT NULL);

-- 14. Create triggers for updated_at columns
CREATE TRIGGER update_ingredients_updated_at
BEFORE UPDATE ON public.ingredients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_meal_categories_updated_at
BEFORE UPDATE ON public.meal_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 15. Create a view for easy meal querying with all related data
CREATE OR REPLACE VIEW public.meals_with_details AS
SELECT 
  m.*,
  mc.name as category_name,
  mc.color_code as category_color,
  COALESCE(
    JSON_AGG(
      DISTINCT JSONB_BUILD_OBJECT(
        'id', i.id,
        'name', i.name,
        'type', i.type,
        'quantity', mi.quantity,
        'preparation_method', mi.preparation_method,
        'is_primary', mi.is_primary
      )
    ) FILTER (WHERE i.id IS NOT NULL), 
    '[]'::json
  ) as ingredients,
  COALESCE(
    JSON_AGG(
      DISTINCT JSONB_BUILD_OBJECT(
        'id', mt.id,
        'name', mt.name,
        'color', mt.color
      )
    ) FILTER (WHERE mt.id IS NOT NULL), 
    '[]'::json
  ) as tags
FROM public.meals m
LEFT JOIN public.meal_categories mc ON m.category_id = mc.id
LEFT JOIN public.meal_ingredients mi ON m.id = mi.meal_id
LEFT JOIN public.ingredients i ON mi.ingredient_id = i.id
LEFT JOIN public.meal_tag_assignments mta ON m.id = mta.meal_id
LEFT JOIN public.meal_tags mt ON mta.tag_id = mt.id
WHERE m.active = true
GROUP BY m.id, mc.id;

-- 16. Populate meal_ingredients from existing text data
INSERT INTO public.meal_ingredients (meal_id, ingredient_id, is_primary)
SELECT DISTINCT 
  m.id as meal_id,
  i.id as ingredient_id,
  true as is_primary
FROM public.meals m
CROSS JOIN public.ingredients i
WHERE 
  (i.name = m.meat AND i.type = 'meat') OR
  (i.name = m.vegetables AND i.type = 'vegetable') OR
  (i.name = m.carbs AND i.type = 'carb');

-- 17. Create common tags
INSERT INTO public.meal_tags (name, color, description) VALUES
('Riche en protéines', '#FF6B6B', 'Repas riches en protéines'),
('Faible en calories', '#4ECDC4', 'Repas faibles en calories'),
('Sans gluten', '#45B7D1', 'Repas sans gluten'),
('Végétarien', '#96CEB4', 'Repas végétariens'),
('Épicé', '#FFEAA7', 'Repas épicés'),
('Rapide', '#DDA0DD', 'Préparation rapide');

-- Note: The old text columns (meat, vegetables, carbs, category) are kept for backward compatibility
-- They can be removed in a future migration once the application is fully updated