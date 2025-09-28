-- Actualizez produsele din Camera de zi cu imaginile generate
UPDATE products 
SET image_url = CASE 
  WHEN name LIKE '%Andreea%' THEN '/images/living/canapea-coltare-andreea-gri.webp'
  WHEN name LIKE '%Marina%' THEN '/images/living/canapea-coltare-marina-albastru.webp'
  WHEN name LIKE '%Sofia%' THEN '/images/living/canapea-coltare-sofia-maro.webp'
  WHEN name LIKE '%Diana%' THEN '/images/living/canapea-coltare-diana-bej.webp'
  WHEN name LIKE '%Valentina%' THEN '/images/living/canapea-coltare-valentina-verde.webp'
  WHEN name LIKE '%Roberto%' THEN '/images/living/canapea-coltare-roberto-negru.webp'
  WHEN name LIKE '%Elena%' THEN '/images/living/canapea-coltare-elena-gri-inchis.webp'
  WHEN name LIKE '%Carmen%' THEN '/images/living/canapea-coltare-carmen-roz.webp'
END
WHERE category_id = (SELECT id FROM categories WHERE slug = 'camera-de-zi')
  AND image_url = '/placeholder.svg';