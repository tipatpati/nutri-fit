-- Restrict visibility of suppliers to ONLY admin and cook roles
-- Keep management restricted to admins (existing policy), but tighten SELECT to exclude owners

-- Ensure RLS is enabled (safe if already enabled)
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;

-- Drop the previous broad SELECT policy
DROP POLICY IF EXISTS "Only staff can view suppliers" ON public.suppliers;

-- Create a precise SELECT policy: only admin and cook roles may read suppliers
CREATE POLICY "Only admin and cook can view suppliers"
ON public.suppliers
FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin'::user_role)
  OR public.has_role(auth.uid(), 'cook'::user_role)
);
