-- Fix authentication and role-based security

-- First, ensure we have proper user roles system
-- Update user_roles table to have proper constraints and indexes
ALTER TABLE public.user_roles ADD CONSTRAINT unique_user_role UNIQUE (user_id, role);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_active ON public.user_roles(active) WHERE active = true;

-- Create profiles table with proper RLS
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  avatar_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (is_admin_or_owner(auth.uid()));

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fix overly permissive policies on meals table
DROP POLICY IF EXISTS "Authenticated users can delete meals" ON public.meals;
DROP POLICY IF EXISTS "Authenticated users can insert meals" ON public.meals;
DROP POLICY IF EXISTS "Authenticated users can update meals" ON public.meals;

-- Create proper restrictive policies for meals
CREATE POLICY "Only cooks and admins can manage meals" ON public.meals
  FOR ALL USING (has_role(auth.uid(), 'cook'::user_role) OR is_admin_or_owner(auth.uid()));

-- Fix meal ingredients policies
DROP POLICY IF EXISTS "Authenticated users can manage meal ingredients" ON public.meal_ingredients;
CREATE POLICY "Only cooks and admins can manage meal ingredients" ON public.meal_ingredients
  FOR ALL USING (has_role(auth.uid(), 'cook'::user_role) OR is_admin_or_owner(auth.uid()));

-- Fix meal categories policies  
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON public.meal_categories;
CREATE POLICY "Only cooks and admins can manage categories" ON public.meal_categories
  FOR ALL USING (has_role(auth.uid(), 'cook'::user_role) OR is_admin_or_owner(auth.uid()));

-- Fix meal tag assignments policies
DROP POLICY IF EXISTS "Authenticated users can manage tag assignments" ON public.meal_tag_assignments;
CREATE POLICY "Only cooks and admins can manage tag assignments" ON public.meal_tag_assignments
  FOR ALL USING (has_role(auth.uid(), 'cook'::user_role) OR is_admin_or_owner(auth.uid()));

-- Fix meal tags policies
DROP POLICY IF EXISTS "Authenticated users can manage tags" ON public.meal_tags;
CREATE POLICY "Only cooks and admins can manage tags" ON public.meal_tags
  FOR ALL USING (has_role(auth.uid(), 'cook'::user_role) OR is_admin_or_owner(auth.uid()));

-- Fix ingredients policies
DROP POLICY IF EXISTS "Authenticated users can manage ingredients" ON public.ingredients;
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

-- Add updated_at triggers where missing
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();