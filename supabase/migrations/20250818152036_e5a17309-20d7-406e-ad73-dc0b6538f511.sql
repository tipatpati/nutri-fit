-- Fix linter ERROR 0010: Security Definer View
-- Set views to run with the privileges of the querying user (security_invoker = on)
-- This ensures RLS and permissions of the invoker are respected.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_views 
    WHERE schemaname = 'public' AND viewname = 'meals_with_details'
  ) THEN
    EXECUTE 'ALTER VIEW public.meals_with_details SET (security_invoker = on)';
  END IF;
END $$;