-- Add bedroom products from Casa Neciu
-- First, get the category ID for 'dormitor-complet' or create it if needed
INSERT INTO public.categories (name, slug, description, image_url) 
VALUES ('Dormitor Complet', 'dormitor-complet', 'Seturi complete de mobilier pentru dormitor cu pat, dulap, noptiere și comodă', 'https://casaneciu.ro/wp-content/uploads/2025/03/image00001-9-scaled-300x300.webp')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url;

-- Insert bedroom products with real data from Casa Neciu
INSERT INTO public.products (name, description, price, image_url, category_id, stock, status) VALUES
('Dormitor Riga, culoare negru / alb, 160 x 200 cm', 'Set dormitor complet Riga în culoare negru/alb, include pat 160x200 cm, dulap și noptiere. Fabricat în România cu livrare gratuită.', 3900, 'https://casaneciu.ro/wp-content/uploads/2025/03/image00001-10-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 5, 'active'),

('Dormitor Onix/Cristal, culoare alb/gri taupe', 'Set dormitor modern Onix/Cristal în nuanțe de alb și gri taupe. Design contemporan cu finisaje de calitate superioară. Include toate piesele necesare pentru un dormitor complet.', 3800, 'https://casaneciu.ro/wp-content/uploads/2025/03/image00001-9-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 4, 'active'),

('Dormitor Onix/Erika, culoare sonoma/gri taupe', 'Set dormitor elegant Onix/Erika combinând culoarea sonoma cu gri taupe. Design modern perfect pentru dormitoare contemporane.', 3600, 'https://casaneciu.ro/wp-content/uploads/2025/03/image00001-6-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 3, 'active'),

('Dormitor Star, culoare alb/auriu', 'Set dormitor de lux Star în culoare alb cu detalii aurii. Design sofisticat cu finisaje premium pentru un dormitor elegant și luxos.', 3190, 'https://casaneciu.ro/wp-content/uploads/2025/04/Dormitor-7-Star-Alb-1-1-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 6, 'active'),

('Dormitor Zen, gri', 'Set dormitor minimalist Zen în culoare gri. Design simplu și modern, perfect pentru cei care apreciază stilul scandinav și liniile curate.', 3190, 'https://casaneciu.ro/wp-content/uploads/2024/08/image00020-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 4, 'active'),

('Dormitor Jasmin, alb/crem', 'Set dormitor romantic Jasmin în nuanțe de alb și crem. Design clasic cu accente delicate, ideal pentru un dormitor cald și prietenos.', 3190, 'https://casaneciu.ro/wp-content/uploads/2024/09/jasmin-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 5, 'active'),

('Dormitor Harmony, gri/crem', 'Set dormitor armonios Harmony combinând gri cu crem. Design echilibrat care creează o atmosferă relaxantă și confortabilă.', 3190, 'https://casaneciu.ro/wp-content/uploads/2024/08/harmony-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 3, 'active'),

('Dormitor Luna, gri', 'Set dormitor modern Luna în culoare gri. Design contemporan cu linii geometrice, perfect pentru dormitoare moderne și funcționale.', 3190, 'https://casaneciu.ro/wp-content/uploads/2024/08/luna-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 4, 'active'),

('Dormitor Diana Standard, alb/argintiu', 'Set dormitor Diana cu pat standard 160×200 cm, dulap 123 cm și 2 noptiere în culoare alb/argintiu. Soluție completă și elegantă pentru dormitor.', 1850, 'https://casaneciu.ro/wp-content/uploads/2024/04/Dormitor-6-argintiu-fara-comoda-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 8, 'active'),

('Dormitor Diana Complet, alb/argintiu', 'Set dormitor Diana complet cu pat standard 160×200 cm, dulap 123 cm, comodă și 2 noptiere în culoare alb/argintiu. Include toate piesele necesare.', 2130, 'https://casaneciu.ro/wp-content/uploads/2024/04/Dormitor-6-argintiu-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 6, 'active'),

('Dormitor Diana Standard, alb/auriu', 'Set dormitor Diana cu pat standard 160×200 cm, dulap 123 cm și 2 noptiere în culoare alb/auriu. Design elegant cu accente aurii.', 1850, 'https://casaneciu.ro/wp-content/uploads/2024/04/Dormitor-6-fara-comoda-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 7, 'active'),

('Dormitor Diana Complet, alb/auriu', 'Set dormitor Diana complet cu pat standard 160×200 cm, dulap 123 cm, comodă și 2 noptiere în culoare alb/auriu. Set complet cu toate accesoriile.', 2130, 'https://casaneciu.ro/wp-content/uploads/2024/04/Dormitor-6-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 5, 'active'),

('Dormitor Robert, alb', 'Set dormitor Robert cu pat standard 140×200 cm, 2 dulapuri și corp suspendat în culoare alb. Design functional și modern pentru spații mai mici.', 1300, 'https://casaneciu.ro/wp-content/uploads/2024/03/Dormitor-4-Robert-alb-1-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 10, 'active'),

('Dormitor Robert, sonoma', 'Set dormitor Robert cu pat standard 140×200 cm, 2 dulapuri și corp suspendat în culoare sonoma. Finish în lemn natural pentru un aspect călduros.', 1300, 'https://casaneciu.ro/wp-content/uploads/2024/01/Dormitor-4-Robert-sonoma-1-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 8, 'active'),

('Dormitor Robert, wenge', 'Set dormitor Robert cu pat standard 140×200 cm, 2 dulapuri și corp suspendat în culoare wenge. Finish întunecat elegant pentru un aspect modern.', 1300, 'https://casaneciu.ro/wp-content/uploads/2024/01/Dormitor-4-Robert-wenge-1-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 6, 'active');