-- Add role enum and column if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'internal', 'pr');
    END IF;
END $$;

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'internal';

-- Update RLS policies for profiles
DROP POLICY IF EXISTS "Admins can do everything" ON public.profiles;
CREATE POLICY "Admins can do everything" 
ON public.profiles 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Ensure profiles are insertable by the user themselves during signup (if needed)
-- or by admins. The previous policy covers admins.

-- Create a function to handle new user creation from the admin panel would be ideal, 
-- but for now, we'll focus on the UI and the data structure.
