-- Step 1: Rename meals_per_week to meals_quantity
ALTER TABLE subscription_plans 
  RENAME COLUMN meals_per_week TO meals_quantity;

-- Step 2: Rename price_per_week to total_price for clarity
ALTER TABLE subscription_plans 
  RENAME COLUMN price_per_week TO total_price;

-- Step 3: Update total_price calculation to be based on meals_quantity * price_per_meal
-- We'll keep this as a regular column that gets updated via trigger or manually
-- (GENERATED columns with multiplication work but for flexibility we'll use a trigger)

-- Step 4: Create function to auto-calculate total_price
CREATE OR REPLACE FUNCTION calculate_pack_total_price()
RETURNS TRIGGER AS $$
BEGIN
  NEW.total_price := NEW.meals_quantity * NEW.price_per_meal;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 5: Create trigger to auto-calculate total_price on insert/update
CREATE TRIGGER update_pack_total_price
BEFORE INSERT OR UPDATE OF meals_quantity, price_per_meal
ON subscription_plans
FOR EACH ROW
EXECUTE FUNCTION calculate_pack_total_price();

-- Step 6: Update existing data to ensure total_price is correctly calculated
UPDATE subscription_plans 
SET total_price = meals_quantity * price_per_meal;

-- Step 7: Update comments for clarity
COMMENT ON COLUMN subscription_plans.meals_quantity IS 'Number of meals in this one-time pack';
COMMENT ON COLUMN subscription_plans.total_price IS 'Total price for the pack (calculated: meals_quantity * price_per_meal)';
COMMENT ON TABLE subscription_plans IS 'One-time meal packs available for purchase';