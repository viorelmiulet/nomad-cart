-- Fix function search path for security
DROP FUNCTION IF EXISTS public.update_shipment_tracking_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION public.update_shipment_tracking_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger
DROP TRIGGER IF EXISTS update_shipment_tracking_updated_at ON public.shipment_tracking;

CREATE TRIGGER update_shipment_tracking_updated_at
BEFORE UPDATE ON public.shipment_tracking
FOR EACH ROW
EXECUTE FUNCTION public.update_shipment_tracking_updated_at();