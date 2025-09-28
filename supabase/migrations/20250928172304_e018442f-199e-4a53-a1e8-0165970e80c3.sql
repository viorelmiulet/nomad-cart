-- Șterg produsele din categoria bucătărie care au imagini locale inexistente
-- Păstrez doar produsele Bella care au imagini în public/images/kitchen/

DELETE FROM products 
WHERE category_id = (SELECT id FROM categories WHERE slug = 'bucatarie')
AND image_url LIKE '/images/kitchen/%'
AND image_url NOT IN (
  '/images/kitchen/bucatarie-bella-120cm-alb.webp',
  '/images/kitchen/bucatarie-bella-120cm.webp',
  '/images/kitchen/bucatarie-bella-160cm.webp',
  '/images/kitchen/bucatarie-bella-180cm.webp',
  '/images/kitchen/bucatarie-bella-200cm.webp',
  '/images/kitchen/bucatarie-bella-240cm.webp',
  '/images/kitchen/bucatarie-bella-180cm-soldat.webp',
  '/images/kitchen/bucatarie-bella-240cm-soldat.webp',
  '/images/kitchen/bucatarie-bella-260cm-soldat.webp',
  '/images/kitchen/bucatarie-bella-300cm-soldat.webp'
);