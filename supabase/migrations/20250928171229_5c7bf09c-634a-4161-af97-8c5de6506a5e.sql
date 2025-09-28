-- Delete all Bella products and recreate them with correct information from casaneciu.ro
DELETE FROM products 
WHERE category_id = (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1)
AND name LIKE '%Bella%';

-- Insert correct Bella products with exact details from casaneciu.ro
INSERT INTO products (name, description, price, stock, category_id, image_url, status) VALUES

-- Standard Bella kitchens
('Bucătărie Bella 120 cm, culoare gri antracit', 'Bucătărie completă Bella 120 cm cu blat termic. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Disponibilă și în culori: Alb, Sonoma/Alb, Wenge/Alb.', 1000.00, 15, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-120cm.webp', 'active'),

('Bucătărie Bella 160 cm, culoare gri antracit', 'Bucătărie completă Bella 160 cm cu blat termic. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Model nou 2025.', 1140.00, 12, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-160cm.webp', 'active'),

('Bucătărie Bella 180 cm, culoare gri antracit', 'Bucătărie completă Bella 180 cm cu blat termic. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Configurație standard.', 1190.00, 10, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-180cm.webp', 'active'),

('Bucătărie Bella 180 cm A, culoare gri antracit, corp hotă, corp cuptor incorporabil', 'Bucătărie completă Bella 180 cm A cu blat termic, corp hotă și corp cuptor incorporabil. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Model nou 2025.', 1410.00, 8, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-180cm.webp', 'active'),

('Bucătărie Bella 200 cm, culoare gri antracit', 'Bucătărie completă Bella 200 cm cu blat termic. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Model nou 2025.', 1610.00, 8, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-200cm.webp', 'active'),

('Bucătărie Bella 220 cm, culoare gri antracit', 'Bucătărie completă Bella 220 cm cu blat termic. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Model nou 2025.', 1620.00, 6, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-220cm.webp', 'active'),

('Bucătărie Bella 240 cm, culoare gri antracit, corp hotă, dulap cuptor incorporabil', 'Bucătărie completă Bella 240 cm cu blat termic, corp hotă și dulap cuptor incorporabil. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Model nou 2025.', 1820.00, 5, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-240cm.webp', 'active'),

-- Bella with corner (cu soldat) kitchens
('Bucătărie Bella cu soldat 180 cm, culoare gri antracit', 'Bucătărie completă Bella cu soldat 180 cm cu blat termic. Configurație în L. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Model nou 2025.', 1740.00, 5, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-180cm-soldat.webp', 'active'),

('Bucătărie Bella cu soldat 220 cm, culoare gri antracit', 'Bucătărie completă Bella cu soldat 220 cm cu blat termic. Configurație în L. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Model nou 2025.', 1880.00, 4, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-240cm-soldat.webp', 'active'),

('Bucătărie Bella cu soldat 240 cm A, culoare gri antracit, corp hotă, corp cuptor incorporabil', 'Bucătărie completă Bella cu soldat 240 cm A cu blat termic, corp hotă și corp cuptor incorporabil. Configurație în L premium. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Model nou 2025.', 2160.00, 3, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-240cm-soldat.webp', 'active'),

('Bucătărie Bella cu soldat 240 cm, culoare gri antracit', 'Bucătărie completă Bella cu soldat 240 cm cu blat termic. Configurație în L. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Model nou 2025.', 1930.00, 3, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-240cm-soldat.webp', 'active'),

('Bucătărie Bella cu soldat 260 cm, culoare gri antracit', 'Bucătărie completă Bella cu soldat 260 cm cu blat termic. Configurație în L extinsă. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Model nou 2025.', 2350.00, 2, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-260cm-soldat.webp', 'active'),

('Bucătărie Bella cu soldat 280 cm, culoare gri antracit', 'Bucătărie completă Bella cu soldat 280 cm cu blat termic. Configurație în L mare. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Model nou 2025.', 2360.00, 2, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-260cm-soldat.webp', 'active'),

('Bucătărie Bella cu soldat 300 cm, culoare gri antracit, corp hotă, dulap cuptor incorporabil', 'Bucătărie completă Bella cu soldat 300 cm cu blat termic, corp hotă și dulap cuptor incorporabil. Configurație în L premium mare. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Model nou 2025.', 2560.00, 2, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-300cm-soldat.webp', 'active'),

('Bucătărie Bella cu soldat 320 cm, culoare gri antracit', 'Bucătărie completă Bella cu soldat 320 cm cu blat termic. Configurație în L foarte mare. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Model nou 2025.', 2690.00, 1, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-300cm-soldat.webp', 'active'),

('Bucătărie Bella cu soldat 380 cm, culoare gri antracit', 'Bucătărie completă Bella cu soldat 380 cm cu blat termic. Configurație în L extra mare. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Model nou 2025.', 3280.00, 1, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-300cm-soldat.webp', 'active'),

-- White version
('Bucătărie Bella 120 cm, culoare alb', 'Bucătărie completă Bella 120 cm cu blat termic, culoare alb. Fabricat în România. Livrare gratuită. În stoc: livrare în 3-5 zile lucrătoare. Disponibilă și în culori: Sonoma/Alb, Wenge/Alb.', 1000.00, 10, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-120cm-alb.webp', 'active');