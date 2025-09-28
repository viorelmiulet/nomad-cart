-- Add the actual Bella kitchen products from casaneciu.ro with correct image paths
-- First, check if we have Bella products, if not, add them

-- Delete any existing Bella products to avoid duplicates
DELETE FROM products 
WHERE category_id = (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1)
AND name LIKE '%Bella%';

-- Insert Bella kitchen products with the correct local image paths
INSERT INTO products (name, description, price, stock, category_id, image_url, status) VALUES
('Bucătărie Bella 120 cm, culoare gri antracit', 'Bucătărie completă Bella 120 cm cu finisaj gri antracit. Include blat termic rezistent la căldură și pete. Design modern cu mânere integrate. Perfectă pentru spații mici.', 1000.00, 15, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-120cm.webp', 'active'),

('Bucătărie Bella 160 cm, culoare gri antracit', 'Bucătărie completă Bella 160 cm cu finisaj gri antracit. Include blat termic și spațiu optim de depozitare. Design funcțional și elegant pentru bucătării medii.', 1140.00, 12, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-160cm.webp', 'active'),

('Bucătărie Bella 180 cm, culoare gri antracit', 'Bucătărie completă Bella 180 cm cu finisaj gri antracit. Configurație standard cu blat termic. Soluție perfectă pentru bucătării moderne cu spațiu generos.', 1190.00, 10, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-180cm.webp', 'active'),

('Bucătărie Bella 200 cm, culoare gri antracit', 'Bucătărie completă Bella 200 cm cu finisaj gri antracit. Include blat termic și configurație extinsă. Design premium pentru bucătării spațioase.', 1610.00, 8, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-200cm.webp', 'active'),

('Bucătărie Bella 240 cm, culoare gri antracit, corp hotă, dulap cuptor incorporabil', 'Bucătărie completă Bella 240 cm cu finisaj gri antracit. Include corp hotă și dulap pentru cuptor incorporabil. Soluție completă pentru bucătarii mari.', 1820.00, 6, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-240cm.webp', 'active'),

('Bucătărie Bella cu soldat 180 cm, culoare gri antracit', 'Bucătărie Bella cu soldat 180 cm, finisaj gri antracit. Configurație în L cu blat termic. Optimizează spațiul de lucru și depozitare.', 1740.00, 5, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-180cm-soldat.webp', 'active'),

('Bucătărie Bella cu soldat 240 cm, culoare gri antracit', 'Bucătărie Bella cu soldat 240 cm, finisaj gri antracit. Configurație în L extinsă cu blat termic. Pentru bucătării mari cu nevoi complexe de depozitare.', 1930.00, 4, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-240cm-soldat.webp', 'active'),

('Bucătărie Bella cu soldat 260 cm, culoare gri antracit', 'Bucătărie Bella cu soldat 260 cm, finisaj gri antracit. Configurație premium în L cu blat termic extins. Soluție luxoasă pentru bucătarii foarte mari.', 2350.00, 3, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-260cm-soldat.webp', 'active'),

('Bucătărie Bella cu soldat 300 cm, culoare gri antracit, corp hotă, dulap cuptor incorporabil', 'Bucătărie Bella cu soldat 300 cm, finisaj gri antracit. Include corp hotă și dulap cuptor. Configurație completă pentru bucătării profesionale.', 2560.00, 2, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-300cm-soldat.webp', 'active'),

('Bucătărie Bella 120 cm, culoare alb', 'Bucătărie completă Bella 120 cm cu finisaj alb. Include blat termic și design clasic. Perfectă pentru spații mici cu stil curat și modern.', 1000.00, 10, (SELECT id FROM categories WHERE slug = 'bucatarie' LIMIT 1), '/images/kitchen/bucatarie-bella-120cm-alb.webp', 'active');