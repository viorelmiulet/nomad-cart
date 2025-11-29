-- Create shipment_tracking table for manual tracking entry
CREATE TABLE IF NOT EXISTS public.shipment_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  tracking_number TEXT NOT NULL,
  carrier TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT valid_carrier CHECK (carrier IN ('FedEx', 'UPS', 'DHL', 'USPS', 'Other')),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'exception'))
);

-- Enable RLS
ALTER TABLE public.shipment_tracking ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view tracking info
CREATE POLICY "Anyone can view tracking info"
ON public.shipment_tracking
FOR SELECT
USING (true);

-- Allow authenticated users to manage tracking
CREATE POLICY "Authenticated users can manage tracking"
ON public.shipment_tracking
FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Create index for faster lookups
CREATE INDEX idx_shipment_tracking_order_id ON public.shipment_tracking(order_id);
CREATE INDEX idx_shipment_tracking_tracking_number ON public.shipment_tracking(tracking_number);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_shipment_tracking_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_shipment_tracking_updated_at
BEFORE UPDATE ON public.shipment_tracking
FOR EACH ROW
EXECUTE FUNCTION public.update_shipment_tracking_updated_at();