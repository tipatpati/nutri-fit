-- Fix authentication and role-based security (fixed version)

-- Update user_roles table constraints and indexes
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_user_role') THEN
        ALTER TABLE public.user_roles ADD CONSTRAINT unique_user_role UNIQUE (user_id, role);
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_active ON public.user_roles(active) WHERE active = true;

-- Fix overly permissive policies on meals table
DROP POLICY IF EXISTS "Authenticated users can delete meals" ON public.meals;
DROP POLICY IF EXISTS "Authenticated users can insert meals" ON public.meals;
DROP POLICY IF EXISTS "Authenticated users can update meals" ON public.meals;

-- Create proper restrictive policies for meals
DROP POLICY IF EXISTS "Only cooks and admins can manage meals" ON public.meals;
CREATE POLICY "Only cooks and admins can manage meals" ON public.meals
  FOR ALL USING (has_role(auth.uid(), 'cook'::user_role) OR is_admin_or_owner(auth.uid()));

-- Fix meal ingredients policies
DROP POLICY IF EXISTS "Authenticated users can manage meal ingredients" ON public.meal_ingredients;
DROP POLICY IF EXISTS "Only cooks and admins can manage meal ingredients" ON public.meal_ingredients;
CREATE POLICY "Only cooks and admins can manage meal ingredients" ON public.meal_ingredients
  FOR ALL USING (has_role(auth.uid(), 'cook'::user_role) OR is_admin_or_owner(auth.uid()));

-- Fix meal categories policies  
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON public.meal_categories;
DROP POLICY IF EXISTS "Only cooks and admins can manage categories" ON public.meal_categories;
CREATE POLICY "Only cooks and admins can manage categories" ON public.meal_categories
  FOR ALL USING (has_role(auth.uid(), 'cook'::user_role) OR is_admin_or_owner(auth.uid()));

-- Fix meal tag assignments policies
DROP POLICY IF EXISTS "Authenticated users can manage tag assignments" ON public.meal_tag_assignments;
DROP POLICY IF EXISTS "Only cooks and admins can manage tag assignments" ON public.meal_tag_assignments;
CREATE POLICY "Only cooks and admins can manage tag assignments" ON public.meal_tag_assignments
  FOR ALL USING (has_role(auth.uid(), 'cook'::user_role) OR is_admin_or_owner(auth.uid()));

-- Fix meal tags policies
DROP POLICY IF EXISTS "Authenticated users can manage tags" ON public.meal_tags;
DROP POLICY IF EXISTS "Only cooks and admins can manage tags" ON public.meal_tags;
CREATE POLICY "Only cooks and admins can manage tags" ON public.meal_tags
  FOR ALL USING (has_role(auth.uid(), 'cook'::user_role) OR is_admin_or_owner(auth.uid()));

-- Fix ingredients policies
DROP POLICY IF EXISTS "Authenticated users can manage ingredients" ON public.ingredients;
DROP POLICY IF EXISTS "Only cooks and admins can manage ingredients" ON public.ingredients;
CREATE POLICY "Only cooks and admins can manage ingredients" ON public.ingredients
  FOR ALL USING (has_role(auth.uid(), 'cook'::user_role) OR is_admin_or_owner(auth.uid()));

-- Update trigger functions to use proper search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;