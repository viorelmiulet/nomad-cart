-- Update existing products with correct images and add missing products from Casa Neciu
-- First, update the existing products with their actual images and enhanced descriptions

-- Update Dormitor Star image and description  
UPDATE public.products 
SET 
  image_url = 'https://casaneciu.ro/wp-content/uploads/2025/04/Dormitor-7-Star-Alb-1-1-scaled-300x300.webp',
  description = 'Set dormitor de lux Star în culoare alb cu detalii aurii. Include pat matrimonial 160x200 cm, dulap spațios cu 3 uși, 2 noptiere elegante și comodă cu oglindă. Fabricat în România cu finisaje premium pentru un dormitor elegant și luxos. Livrare gratuită în 3-5 zile lucrătoare.'
WHERE name = 'Dormitor Star, culoare alb/auriu';

-- Update Dormitor Zen 
UPDATE public.products 
SET 
  image_url = 'https://casaneciu.ro/wp-content/uploads/2024/08/image00020-scaled-300x300.webp',
  description = 'Set dormitor minimalist Zen în culoare gri elegantă. Design simplu și modern cu pat matrimonial, dulap funcțional și noptiere practice. Perfect pentru cei care apreciază stilul scandinav și liniile curate. Fabricat în România cu materiale de calitate.'
WHERE name = 'Dormitor Zen, gri';

-- Update Dormitor Jasmin 
UPDATE public.products 
SET 
  image_url = 'https://casaneciu.ro/wp-content/uploads/2024/09/jasmin-300x300.webp',
  description = 'Set dormitor romantic Jasmin în nuanțe delicate de alb și crem. Design clasic cu accente feminine, ideal pentru un dormitor cald și prietenos. Include toate piesele necesare pentru un dormitor complet și armonios.'
WHERE name = 'Dormitor Jasmin, alb/crem';

-- Update Dormitor Harmony 
UPDATE public.products 
SET 
  image_url = 'https://casaneciu.ro/wp-content/uploads/2024/08/harmony-300x300.webp',
  description = 'Set dormitor armonios Harmony combinând perfect gri cu crem. Design echilibrat care creează o atmosferă relaxantă și confortabilă. Mobilier functional cu spații de depozitare optimizate pentru confortul zilnic.'
WHERE name = 'Dormitor Harmony, gri/crem';

-- Update Dormitor Luna 
UPDATE public.products 
SET 
  image_url = 'https://casaneciu.ro/wp-content/uploads/2024/08/luna-scaled-300x300.webp',
  description = 'Set dormitor modern Luna în culoare gri contemporană. Design cu linii geometrice clean, perfect pentru dormitoare moderne și funcționale. Include pat matrimonial, dulap generos și noptiere practice.'
WHERE name = 'Dormitor Luna, gri';

-- Add new products that were missing
INSERT INTO public.products (name, description, price, image_url, category_id, stock, status) VALUES
('Dormitor Serenity, crem/maro', 'Set dormitor elegant Serenity în nuanțe calde de crem și maro. Design sofisticat cu finisaje naturale care creează o atmosferă liniștitoare. Include pat matrimonial 160x200 cm, dulap spațios și noptiere elegante. Fabricat în România cu livrare gratuită.', 3190, 'https://casaneciu.ro/wp-content/uploads/2024/08/image00026-1-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 5, 'active'),

('Dormitor Kenzo, gri/bej', 'Set dormitor modern Kenzo combinând gri cu bej pentru un look contemporan. Design minimalist cu accente naturale, perfect pentru dormitoare moderne. Include toate piesele necesare pentru un dormitor complet și functional.', 3190, 'https://casaneciu.ro/wp-content/uploads/2024/09/kenzo-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 4, 'active'),

('Dormitor Ayza, bej/auriu', 'Set dormitor luxos Ayza în culori bej și auriu. Design premium cu finisaje deosebite, evaluat cu 5 stele de clienți. Include pat matrimonial 160x200 cm, dulap elegant și accesorii complete pentru un dormitor de lux.', 3190, 'https://casaneciu.ro/wp-content/uploads/2023/11/ayza-2-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 3, 'active'),

('Dormitor Babylon, gri', 'Set dormitor urban Babylon în culoare gri moderă. Design industrial-chic perfect pentru apartamentele contemporane. Pat matrimonial 160x200 cm cu dulap generos și noptiere funcționale. Livrare gratuită în 3-5 zile.', 3190, 'https://casaneciu.ro/wp-content/uploads/2024/04/babylon-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 6, 'active'),

('Dormitor Flor, stejar/gri', 'Set dormitor natural Flor combinând stejar cu gri pentru un aspect organic. Design cu elemente din lemn natural, evaluat cu 5 stele. Include pat matrimonial 160x200 cm și mobilier complet. Disponibil și în varianta alb/auriu.', 3190, 'https://casaneciu.ro/wp-content/uploads/2023/11/WhatsApp-Image-2024-04-16-at-15.11.18_b90a2f69-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 4, 'active'),

('Dormitor Sara Standard, alb/argintiu', 'Set dormitor Sara cu pat standard 160×200 cm, dulap 123 cm și 2 noptiere în culoare alb/argintiu. Design elegant cu accente metalice, evaluat cu 5 stele de clienți. Soluție completă pentru dormitoare moderne.', 1850, 'https://casaneciu.ro/wp-content/uploads/2024/04/Dormitor-5-argintiu-fara-comoda-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 7, 'active'),

('Dormitor Sara Complet, alb/argintiu', 'Set dormitor Sara complet cu pat standard 160×200 cm, dulap 123 cm, comodă și 2 noptiere în culoare alb/argintiu. Include toate piesele necesare pentru un dormitor functional și elegant.', 2130, 'https://casaneciu.ro/wp-content/uploads/2024/04/Dormitor-5-argintiu-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 5, 'active'),

('Dormitor Sara Standard, alb/auriu', 'Set dormitor Sara cu pat standard 160×200 cm, dulap 123 cm și 2 noptiere în culoare alb/auriu. Design clasic cu accente aurii pentru un dormitor elegant și luminos.', 1850, 'https://casaneciu.ro/wp-content/uploads/2024/04/Dormitor-5-fara-comoda-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 6, 'active'),

('Dormitor Sara Complet, alb/auriu', 'Set dormitor Sara complet cu pat standard 160×200 cm, dulap 123 cm, comodă și 2 noptiere în culoare alb/auriu. Set complet cu toate accesoriile pentru un dormitor luxos și functional.', 2130, 'https://casaneciu.ro/wp-content/uploads/2024/04/Dormitor-5-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 4, 'active'),

('Dormitor Luiza 3U4P, alb', 'Set dormitor Luiza cu pat standard 160×200 cm, dulap cu 3 uși și 2 noptiere în culoare alb. Design functional cu spații de depozitare generoase. Evaluat cu 4 stele, perfect pentru familii. Disponibil în multiple variante de culoare.', 1300, 'https://casaneciu.ro/wp-content/uploads/2023/11/Dormitor-Luiza-fara-comoda-alb-scaled-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 8, 'active'),

('Dormitor Luiza 3U4P, gri antracit', 'Set dormitor Luiza NOU în culoare gri antracit. Pat standard cu dulap cu 3 uși și noptiere moderne. Design contemporan perfect pentru apartamentele moderne. Fabricat în România cu materiale de calitate superioară.', 1350, 'https://casaneciu.ro/wp-content/uploads/2025/04/3u4p-300x300.webp', (SELECT id FROM categories WHERE slug = 'dormitor-complet'), 5, 'active');