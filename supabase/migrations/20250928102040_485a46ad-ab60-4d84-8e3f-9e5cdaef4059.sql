-- Update the existing "Hol" category to "Dormitor Complet"
UPDATE public.categories 
SET 
  name = 'Dormitor Complet',
  slug = 'dormitor-complet',
  description = 'Mobilier complet pentru dormitor - paturi, dulapuri, comode și accesorii'
WHERE slug = 'hol';