-- Drop the existing foreign key constraint if it exists
ALTER TABLE public.price_history 
DROP CONSTRAINT IF EXISTS price_history_changed_by_fkey;

-- Add foreign key to profiles instead of auth.users
ALTER TABLE public.price_history
ADD CONSTRAINT price_history_changed_by_fkey 
FOREIGN KEY (changed_by) 
REFERENCES public.profiles(user_id) 
ON DELETE SET NULL;