-- Create meals/recipes table
CREATE TABLE public.meals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  meat TEXT NOT NULL,
  vegetables TEXT NOT NULL,
  carbs TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Équilibré', 'Perte de poids', 'Prise de masse')),
  premium BOOLEAN NOT NULL DEFAULT false,
  badge TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;

-- Create policies - meals are readable by everyone, manageable only by authenticated users
CREATE POLICY "Meals are viewable by everyone" 
ON public.meals 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert meals" 
ON public.meals 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update meals" 
ON public.meals 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete meals" 
ON public.meals 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_meals_updated_at
BEFORE UPDATE ON public.meals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the initial meals data
INSERT INTO public.meals (name, description, meat, vegetables, carbs, category, premium, image_url) VALUES
('Chicken Boost - Riz Énergie', 'Riz basmati, blanc de poulet grillé, légumes vapeur', 'Blanc de poulet grillé', 'Légumes vapeur', 'Riz basmati', 'Prise de masse', false, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center'),
('Iron Fuel - Patate Power', 'Pommes de terre rôties, poulet épicé, légumes croquants', 'Poulet épicé', 'Légumes croquants', 'Pommes de terre rôties', 'Prise de masse', false, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center'),
('Sweet Pump - Patate Douce Fit', 'Patate douce rôtie, émincé de poulet, légumes fondants', 'Émincé de poulet', 'Légumes fondants', 'Patate douce rôtie', 'Équilibré', false, 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&crop=center'),
('Pasta Clean - Poulet & Penne', 'Pâtes complètes, poulet grillé, poêlée de légumes', 'Poulet grillé', 'Poêlée de légumes', 'Pâtes complètes', 'Équilibré', false, 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&crop=center');