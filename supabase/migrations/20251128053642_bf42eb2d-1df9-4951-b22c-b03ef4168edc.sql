-- Add 'cancelled' status to orders status check constraint
-- First, drop the existing constraint
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- Add the new constraint with 'cancelled' included
ALTER TABLE orders ADD CONSTRAINT orders_status_check 
  CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'completed', 'cancelled'));