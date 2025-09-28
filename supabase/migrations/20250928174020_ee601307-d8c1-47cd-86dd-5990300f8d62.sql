-- Creez categoria Camera de zi
INSERT INTO categories (id, name, slug, description, created_at, updated_at)
VALUES (
  'c8f3a2b1-9d4e-4c5f-b6a7-1e2d3c4b5a69',
  'Camera de zi',
  'camera-de-zi',
  'Mobilier și accesorii pentru camera de zi - canapele, fotolii, mese de cafea și alte piese pentru spațiul de relaxare',
  now(),
  now()
) ON CONFLICT (slug) DO NOTHING;

-- Actualizez produsele existente să fie în categoria camera-de-zi
UPDATE products SET category_id = 'c8f3a2b1-9d4e-4c5f-b6a7-1e2d3c4b5a69'
WHERE name ILIKE '%canapea%' AND name ILIKE '%colțar%';