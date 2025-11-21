-- Add discount type support to discount_codes table
ALTER TABLE public.discount_codes
ADD COLUMN discount_type TEXT NOT NULL DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'fixed')),
ADD COLUMN discount_value NUMERIC NOT NULL DEFAULT 0;

-- Migrate existing data (copy percentage to value)
UPDATE public.discount_codes
SET discount_value = discount_percentage;

-- Add check constraint for discount value based on type
-- Percentage: 0-100, Fixed: > 0
CREATE OR REPLACE FUNCTION check_discount_value()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.discount_type = 'percentage' THEN
    IF NEW.discount_value < 0 OR NEW.discount_value > 100 THEN
      RAISE EXCEPTION 'Percentage discount must be between 0 and 100';
    END IF;
  ELSIF NEW.discount_type = 'fixed' THEN
    IF NEW.discount_value < 0 THEN
      RAISE EXCEPTION 'Fixed discount must be greater than or equal to 0';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_discount_value
BEFORE INSERT OR UPDATE ON public.discount_codes
FOR EACH ROW
EXECUTE FUNCTION check_discount_value();