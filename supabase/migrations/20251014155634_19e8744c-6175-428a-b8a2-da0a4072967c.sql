-- Fix security warning: Drop trigger, recreate function with search_path, recreate trigger
DROP TRIGGER IF EXISTS update_pack_total_price ON subscription_plans;
DROP FUNCTION IF EXISTS calculate_pack_total_price();

CREATE OR REPLACE FUNCTION calculate_pack_total_price()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.total_price := NEW.meals_quantity * NEW.price_per_meal;
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_pack_total_price
BEFORE INSERT OR UPDATE OF meals_quantity, price_per_meal
ON subscription_plans
FOR EACH ROW
EXECUTE FUNCTION calculate_pack_total_price();