-- Point kitchen products to public image paths
UPDATE products 
SET image_url = CASE 
  WHEN name LIKE '%Bucătărie Bella 120 cm%' AND description ILIKE '%gri antracit%' THEN '/images/kitchen/bucatarie-bella-120cm.webp'
  WHEN name LIKE '%Bucătărie Bella 160 cm%' AND description ILIKE '%gri antracit%' THEN '/images/kitchen/bucatarie-bella-160cm.webp'
  WHEN name LIKE '%Bucătărie Bella 180 cm%' AND description ILIKE '%gri antracit%' AND description NOT ILIKE '%soldat%' THEN '/images/kitchen/bucatarie-bella-180cm.webp'
  WHEN name LIKE '%Bucătărie Bella 200 cm%' AND description ILIKE '%gri antracit%' THEN '/images/kitchen/bucatarie-bella-200cm.webp'
  WHEN name LIKE '%Bucătărie Bella 240 cm%' AND description ILIKE '%gri antracit%' AND description NOT ILIKE '%soldat%' THEN '/images/kitchen/bucatarie-bella-240cm.webp'
  WHEN name LIKE '%Bucătărie Bella cu soldat 180 cm%' THEN '/images/kitchen/bucatarie-bella-180cm-soldat.webp'
  WHEN name LIKE '%Bucătărie Bella cu soldat 240 cm%' THEN '/images/kitchen/bucatarie-bella-240cm-soldat.webp'
  WHEN name LIKE '%Bucătărie Bella cu soldat 260 cm%' THEN '/images/kitchen/bucatarie-bella-260cm-soldat.webp'
  WHEN name LIKE '%Bucătărie Bella cu soldat 300 cm%' THEN '/images/kitchen/bucatarie-bella-300cm-soldat.webp'
  WHEN name LIKE '%Bucătărie Bella 120 cm%' AND description ILIKE '%alb%' THEN '/images/kitchen/bucatarie-bella-120cm-alb.webp'
  ELSE image_url
END
WHERE category_id = (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1);