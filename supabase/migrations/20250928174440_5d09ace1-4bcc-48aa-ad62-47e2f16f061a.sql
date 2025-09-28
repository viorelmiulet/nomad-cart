-- Inserează produsele din linkul indicat în categoria "camera-de-zi"
WITH cat AS (
  SELECT id FROM public.categories WHERE slug = 'camera-de-zi'
)
INSERT INTO public.products (name, price, image_url, description, category_id, status)
VALUES
  ('Canapea extensibila Cairo 230 x 90 cm, crem', 1990, 'https://casaneciu.ro/wp-content/uploads/2025/07/116D091E-A5A4-4531-B0E2-731B09F725D3-scaled-300x300.jpeg', NULL, (SELECT id FROM cat), 'active'),
  ('Coltar extensibil Dynamic, culoare gri/crem, 262 x 82 x 86 cm', 3330, 'https://casaneciu.ro/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-12-at-17.20.09_928b9f5b-300x300.jpg', NULL, (SELECT id FROM cat), 'active'),
  ('Coltar extensibil Acelya, culoare albastru, 262 x 82 x 86 cm', 2600, 'https://casaneciu.ro/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-12-at-17.20.08_c8bfaba1-300x300.jpg', NULL, (SELECT id FROM cat), 'active'),
  ('Coltar extensibil Seren, culoare albastru, 262 x 82 x 86 cm', 2600, 'https://casaneciu.ro/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-12-at-17.21.40_1b2817b9-300x300.jpg', NULL, (SELECT id FROM cat), 'active'),
  ('Canapea extensibila Andreea 1, culoare crem / maro, 220 x 90 cm', 1850, 'https://casaneciu.ro/wp-content/uploads/2023/10/a1-crem-maro-300x300.jpg', NULL, (SELECT id FROM cat), 'active'),
  ('Canapea extensibila Andreea 1, culoare maro / crem, 220 x 90 cm', 1850, 'https://casaneciu.ro/wp-content/uploads/2023/10/a1-maro-crem-300x300.jpg', NULL, (SELECT id FROM cat), 'active'),
  ('Canapea extensibila Andreea 1, culoare negru / alb, 220 x 90 cm', 1850, 'https://casaneciu.ro/wp-content/uploads/2023/10/a1-negru-300x300.jpg', NULL, (SELECT id FROM cat), 'active'),
  ('Canapea extensibila Andreea 1, culoare rosu / negru, 220 x 90 cm', 1850, 'https://casaneciu.ro/wp-content/uploads/2023/10/a1-rosu-300x300.jpg', NULL, (SELECT id FROM cat), 'active'),
  ('Canapea extensibila Andreea 2, culoare rosu / negru, 220 x 90 cm', 1950, 'https://casaneciu.ro/wp-content/uploads/2023/10/f32aa1_051c4231f66448418aa42e1a4b2afdf9mv2-300x300.jpeg', NULL, (SELECT id FROM cat), 'active'),
  ('Canapea extensibila Andreea 2, culoare roz / crem, 220 x 90 cm', 1950, 'https://casaneciu.ro/wp-content/uploads/2023/10/f32aa1_9d45ba6789fc4148ac0ac637a061c0e2mv2-1-300x300.jpeg', NULL, (SELECT id FROM cat), 'active');