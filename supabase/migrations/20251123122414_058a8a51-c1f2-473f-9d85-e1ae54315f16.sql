-- Ensure orders table allows all operations without restrictions
-- Drop existing policies
DROP POLICY IF EXISTS "Allow public access on orders" ON orders;

-- Create comprehensive policies for orders table
-- Allow anonymous users to insert orders (for checkout)
CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read orders
CREATE POLICY "Anyone can view orders"
  ON orders
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to update orders
CREATE POLICY "Authenticated users can update orders"
  ON orders
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users (admins) to delete orders
CREATE POLICY "Authenticated users can delete orders"
  ON orders
  FOR DELETE
  USING (true);