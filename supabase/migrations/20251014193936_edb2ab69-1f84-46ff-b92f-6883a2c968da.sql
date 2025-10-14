-- Phase 1: Database Schema Updates for Recipe-Inventory Sync System

-- 1. Add primary_nutrient classification to ingredients
ALTER TABLE public.ingredients 
ADD COLUMN IF NOT EXISTS primary_nutrient TEXT CHECK (primary_nutrient IN ('protein', 'carbs', 'vegetables', 'fat', 'condiment'));

-- 2. Enhance meal_ingredients with category-specific quantities and nutrient type
ALTER TABLE public.meal_ingredients
ADD COLUMN IF NOT EXISTS quantity_equilibre NUMERIC,
ADD COLUMN IF NOT EXISTS quantity_perte_poids NUMERIC,
ADD COLUMN IF NOT EXISTS quantity_prise_masse NUMERIC,
ADD COLUMN IF NOT EXISTS nutrient_type TEXT CHECK (nutrient_type IN ('protein', 'carbs', 'vegetables', 'fat', 'condiment'));

-- 3. Create helper function to get ingredient nutritional data per quantity
CREATE OR REPLACE FUNCTION public.calculate_nutrition_for_quantity(
  ingredient_nutritional_info JSONB,
  quantity_grams NUMERIC
)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  result JSONB;
  multiplier NUMERIC;
BEGIN
  IF ingredient_nutritional_info IS NULL OR quantity_grams IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- Calculate multiplier (nutritional info is per 100g)
  multiplier := quantity_grams / 100.0;
  
  -- Calculate scaled nutritional values
  result := jsonb_build_object(
    'calories', COALESCE((ingredient_nutritional_info->>'calories')::NUMERIC * multiplier, 0),
    'protein', COALESCE((ingredient_nutritional_info->>'protein')::NUMERIC * multiplier, 0),
    'carbs', COALESCE((ingredient_nutritional_info->>'carbs')::NUMERIC * multiplier, 0),
    'fat', COALESCE((ingredient_nutritional_info->>'fat')::NUMERIC * multiplier, 0),
    'fiber', COALESCE((ingredient_nutritional_info->>'fiber')::NUMERIC * multiplier, 0),
    'sugar', COALESCE((ingredient_nutritional_info->>'sugar')::NUMERIC * multiplier, 0),
    'sodium', COALESCE((ingredient_nutritional_info->>'sodium')::NUMERIC * multiplier, 0)
  );
  
  RETURN result;
END;
$$;

-- 4. Create function to auto-classify ingredients by primary nutrient
CREATE OR REPLACE FUNCTION public.auto_classify_ingredient_nutrient()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Auto-classify based on type field if primary_nutrient is not set
  IF NEW.primary_nutrient IS NULL THEN
    CASE 
      WHEN NEW.type IN ('meat', 'poultry', 'fish', 'seafood', 'eggs', 'dairy') THEN
        NEW.primary_nutrient := 'protein';
      WHEN NEW.type IN ('grain', 'legume', 'starch') THEN
        NEW.primary_nutrient := 'carbs';
      WHEN NEW.type IN ('vegetable', 'fruit', 'leafy_green') THEN
        NEW.primary_nutrient := 'vegetables';
      WHEN NEW.type IN ('oil', 'butter', 'nut') THEN
        NEW.primary_nutrient := 'fat';
      ELSE
        NEW.primary_nutrient := 'condiment';
    END CASE;
  END IF;
  
  RETURN NEW;
END;
$$;

-- 5. Create trigger to auto-classify ingredients
DROP TRIGGER IF EXISTS trigger_auto_classify_ingredient ON public.ingredients;
CREATE TRIGGER trigger_auto_classify_ingredient
  BEFORE INSERT OR UPDATE ON public.ingredients
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_classify_ingredient_nutrient();

-- 6. Update existing ingredients with primary_nutrient classification
UPDATE public.ingredients
SET primary_nutrient = CASE 
  WHEN type IN ('meat', 'poultry', 'fish', 'seafood', 'eggs', 'dairy') THEN 'protein'
  WHEN type IN ('grain', 'legume', 'starch') THEN 'carbs'
  WHEN type IN ('vegetable', 'fruit', 'leafy_green') THEN 'vegetables'
  WHEN type IN ('oil', 'butter', 'nut') THEN 'fat'
  ELSE 'condiment'
END
WHERE primary_nutrient IS NULL;

-- 7. Create view for meals with complete nutritional breakdown by category
CREATE OR REPLACE VIEW public.meals_nutritional_breakdown AS
SELECT 
  m.id as meal_id,
  m.name,
  m.category,
  m.base_recipe,
  
  -- Equilibre category totals
  SUM(CASE 
    WHEN mi.quantity_equilibre IS NOT NULL AND i.nutritional_info IS NOT NULL 
    THEN (i.nutritional_info->>'calories')::NUMERIC * mi.quantity_equilibre / 100.0 
    ELSE 0 
  END) as equilibre_calories,
  SUM(CASE 
    WHEN mi.quantity_equilibre IS NOT NULL AND i.nutritional_info IS NOT NULL 
    THEN (i.nutritional_info->>'protein')::NUMERIC * mi.quantity_equilibre / 100.0 
    ELSE 0 
  END) as equilibre_protein,
  SUM(CASE 
    WHEN mi.quantity_equilibre IS NOT NULL AND i.nutritional_info IS NOT NULL 
    THEN (i.nutritional_info->>'carbs')::NUMERIC * mi.quantity_equilibre / 100.0 
    ELSE 0 
  END) as equilibre_carbs,
  SUM(CASE 
    WHEN mi.quantity_equilibre IS NOT NULL AND i.nutritional_info IS NOT NULL 
    THEN (i.nutritional_info->>'fat')::NUMERIC * mi.quantity_equilibre / 100.0 
    ELSE 0 
  END) as equilibre_fat,
  
  -- Perte de poids category totals
  SUM(CASE 
    WHEN mi.quantity_perte_poids IS NOT NULL AND i.nutritional_info IS NOT NULL 
    THEN (i.nutritional_info->>'calories')::NUMERIC * mi.quantity_perte_poids / 100.0 
    ELSE 0 
  END) as perte_poids_calories,
  SUM(CASE 
    WHEN mi.quantity_perte_poids IS NOT NULL AND i.nutritional_info IS NOT NULL 
    THEN (i.nutritional_info->>'protein')::NUMERIC * mi.quantity_perte_poids / 100.0 
    ELSE 0 
  END) as perte_poids_protein,
  SUM(CASE 
    WHEN mi.quantity_perte_poids IS NOT NULL AND i.nutritional_info IS NOT NULL 
    THEN (i.nutritional_info->>'carbs')::NUMERIC * mi.quantity_perte_poids / 100.0 
    ELSE 0 
  END) as perte_poids_carbs,
  SUM(CASE 
    WHEN mi.quantity_perte_poids IS NOT NULL AND i.nutritional_info IS NOT NULL 
    THEN (i.nutritional_info->>'fat')::NUMERIC * mi.quantity_perte_poids / 100.0 
    ELSE 0 
  END) as perte_poids_fat,
  
  -- Prise de masse category totals
  SUM(CASE 
    WHEN mi.quantity_prise_masse IS NOT NULL AND i.nutritional_info IS NOT NULL 
    THEN (i.nutritional_info->>'calories')::NUMERIC * mi.quantity_prise_masse / 100.0 
    ELSE 0 
  END) as prise_masse_calories,
  SUM(CASE 
    WHEN mi.quantity_prise_masse IS NOT NULL AND i.nutritional_info IS NOT NULL 
    THEN (i.nutritional_info->>'protein')::NUMERIC * mi.quantity_prise_masse / 100.0 
    ELSE 0 
  END) as prise_masse_protein,
  SUM(CASE 
    WHEN mi.quantity_prise_masse IS NOT NULL AND i.nutritional_info IS NOT NULL 
    THEN (i.nutritional_info->>'carbs')::NUMERIC * mi.quantity_prise_masse / 100.0 
    ELSE 0 
  END) as prise_masse_carbs,
  SUM(CASE 
    WHEN mi.quantity_prise_masse IS NOT NULL AND i.nutritional_info IS NOT NULL 
    THEN (i.nutritional_info->>'fat')::NUMERIC * mi.quantity_prise_masse / 100.0 
    ELSE 0 
  END) as prise_masse_fat
  
FROM public.meals m
LEFT JOIN public.meal_ingredients mi ON m.id = mi.meal_id
LEFT JOIN public.ingredients i ON mi.ingredient_id = i.id
GROUP BY m.id, m.name, m.category, m.base_recipe;