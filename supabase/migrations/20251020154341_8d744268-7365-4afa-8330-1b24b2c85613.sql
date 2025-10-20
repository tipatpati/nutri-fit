-- Create meal-images storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'meal-images',
  'meal-images',
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view meal images" ON storage.objects;
DROP POLICY IF EXISTS "Cooks and admins can upload meal images" ON storage.objects;
DROP POLICY IF EXISTS "Cooks and admins can update meal images" ON storage.objects;
DROP POLICY IF EXISTS "Cooks and admins can delete meal images" ON storage.objects;

-- Create storage policies for meal-images bucket
CREATE POLICY "Anyone can view meal images"
ON storage.objects FOR SELECT
USING (bucket_id = 'meal-images');

CREATE POLICY "Cooks and admins can upload meal images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'meal-images' 
  AND (has_role(auth.uid(), 'cook'::user_role) OR is_admin_or_owner(auth.uid()))
);

CREATE POLICY "Cooks and admins can update meal images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'meal-images' 
  AND (has_role(auth.uid(), 'cook'::user_role) OR is_admin_or_owner(auth.uid()))
);

CREATE POLICY "Cooks and admins can delete meal images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'meal-images' 
  AND (has_role(auth.uid(), 'cook'::user_role) OR is_admin_or_owner(auth.uid()))
);