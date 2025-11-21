-- Fix search_path for check_discount_value function
CREATE OR REPLACE FUNCTION check_discount_value()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;