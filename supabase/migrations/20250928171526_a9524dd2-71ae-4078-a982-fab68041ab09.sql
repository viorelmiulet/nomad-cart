-- Actualizez produsele care au image_url către imagini inexistente
-- să folosească imaginile disponibile

-- Bucătărie Bella 220 cm folosește imaginea de 240 cm
UPDATE products 
SET image_url = '/images/kitchen/bucatarie-bella-240cm.webp'
WHERE name = 'Bucătărie Bella 220 cm, culoare gri antracit';

-- Pentru produsele care nu au imagine locală corespunzătoare, 
-- le setez pe cele disponibile sau fallback la placeholder
UPDATE products 
SET image_url = CASE 
  WHEN name LIKE '%220 cm%' AND name LIKE '%soldat%' THEN '/images/kitchen/bucatarie-bella-240cm-soldat.webp'
  WHEN name LIKE '%280 cm%' AND name LIKE '%soldat%' THEN '/images/kitchen/bucatarie-bella-300cm-soldat.webp'
  WHEN name LIKE '%320 cm%' AND name LIKE '%soldat%' THEN '/images/kitchen/bucatarie-bella-300cm-soldat.webp'
  WHEN name LIKE '%380 cm%' AND name LIKE '%soldat%' THEN '/images/kitchen/bucatarie-bella-300cm-soldat.webp'
  ELSE image_url
END
WHERE category_id = (SELECT id FROM categories WHERE slug = 'bucatarie')
  AND name LIKE '%Bella%';

-- Verific dacă există produse fără image_url
UPDATE products 
SET image_url = COALESCE(image_url, '/placeholder.svg')
WHERE category_id = (SELECT id FROM categories WHERE slug = 'bucatarie')
  AND (image_url IS NULL OR image_url = '');