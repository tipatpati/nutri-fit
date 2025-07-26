-- Add base_recipe column to meals table
ALTER TABLE public.meals ADD COLUMN base_recipe BOOLEAN DEFAULT false;

-- Create index for base_recipe for better query performance
CREATE INDEX idx_meals_base_recipe ON public.meals(base_recipe);

-- Update existing meals to mark them as non-base recipes (they are category variants)
UPDATE public.meals SET base_recipe = false WHERE base_recipe IS NULL;