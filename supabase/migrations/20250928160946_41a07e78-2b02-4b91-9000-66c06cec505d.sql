-- Add dormitor category for individual bedroom pieces  
INSERT INTO public.categories (name, slug, description, image_url) 
VALUES ('Dormitor', 'dormitor', 'Mobilier individual pentru dormitor - paturi, dulapuri, comode, noptiere și saltele', 'https://casaneciu.ro/wp-content/uploads/2024/05/image00006-1-scaled-300x300.jpeg')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url;

-- Insert bedroom furniture products from Casa Neciu
INSERT INTO public.products (name, description, price, image_url, category_id, stock, status) VALUES

-- Pat tapitat Lucas series (upholstered beds)
('Pat tapitat Lucas 140x200 cm, albastru', 'Pat tapitat modern Lucas în culoare albastru vibrant. Dimensiuni 140x200 cm, ideal pentru dormitoare moderne. Tapițerie de calitate superioară cu finisaje elegante. Fabricat în România cu garanție și livrare gratuită în 3-5 zile lucrătoare.', 1200, 'https://casaneciu.ro/wp-content/uploads/2024/05/image00006-1-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 8, 'active'),

('Pat tapitat Lucas 140x200 cm, crem', 'Pat tapitat Lucas în culoare crem elegantă. Dimensiuni 140x200 cm perfect pentru cupluri. Design modern cu tapițerie premium și confort maxim pentru un somn odihnitor. Disponibil în 6 culori diferite.', 1200, 'https://casaneciu.ro/wp-content/uploads/2024/05/image00021-1-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 7, 'active'),

('Pat tapitat Lucas 140x200 cm, gri', 'Pat tapitat Lucas în culoare gri contemporană. Dimensiuni compacte 140x200 cm cu design sofisticat. Tapițerie rezistentă și confortabilă, perfectă pentru dormitoare moderne.', 1200, 'https://casaneciu.ro/wp-content/uploads/2024/05/image00061-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 6, 'active'),

('Pat tapitat Lucas 140x200 cm, rosu', 'Pat tapitat Lucas în culoare rosu pasional. Dimensiuni 140x200 cm cu tapițerie de lux. Design îndrăzneț perfect pentru personalități expresive. Calitate premium fabricată în România.', 1200, 'https://casaneciu.ro/wp-content/uploads/2024/05/image00033-1-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 5, 'active'),

('Pat tapitat Lucas 140x200 cm, portocaliu', 'Pat tapitat Lucas în culoare portocaliu energizantă. Dimensiuni 140x200 cm cu design modern și tapițerie premium. Adaugă culoare și personalitate dormitorului tău.', 1200, 'https://casaneciu.ro/wp-content/uploads/2024/05/image00048-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 4, 'active'),

('Pat tapitat Lucas 140x200 cm, verde', 'Pat tapitat Lucas în culoare verde liniștitoare. Dimensiuni 140x200 cm cu tapițerie eco-friendly. Design natural perfect pentru o atmosferă relaxantă în dormitor.', 1200, 'https://casaneciu.ro/wp-content/uploads/2024/05/image00067-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 6, 'active'),

-- Pat tapitat Lucas 180x200 cm series  
('Pat tapitat Lucas 180x200 cm, albastru', 'Pat tapitat Lucas dimensiuni mari 180x200 cm în culoare albastru. Perfect pentru dormitoare spațioase. Tapițerie premium cu design modern și confort superior pentru cupluri.', 1300, 'https://casaneciu.ro/wp-content/uploads/2024/05/image00006-1-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 5, 'active'),

('Pat tapitat Lucas 180x200 cm, crem', 'Pat tapitat Lucas dimensiuni XL 180x200 cm în culoare crem clasică. Spațiu generos pentru un confort maxim. Tapițerie de lux cu finisaje deosebite.', 1300, 'https://casaneciu.ro/wp-content/uploads/2024/05/image00021-1-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 4, 'active'),

-- Comode (Dressers)
('Comoda Serenity, sonoma/alb', 'Comoda elegantă Serenity combinând culoarea sonoma cu alb. Design modern cu sertare spațioase pentru depozitare optimă. Perfectă pentru organizarea hainelor și accesoriilor.', 640, 'https://casaneciu.ro/wp-content/uploads/2024/08/image00029-1-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 10, 'active'),

('Comoda Star, alb', 'Comoda Star în culoare alb pur. Design minimalist cu linii curate și sertare funcționale. Se potrivește perfect cu patul Star pentru un dormitor coerent și elegant.', 640, 'https://casaneciu.ro/wp-content/uploads/2025/05/Dormitor-7-Star-Alb-22-1-scaled-300x300.jpg', (SELECT id FROM categories WHERE slug = 'dormitor'), 8, 'active'),

('Comoda Star, sonoma/gri', 'Comoda Star în combinația sonoma/gri. Design contemporary cu finisaje naturale. Sertare spațioase cu sistem de deschidere smooth pentru o funcționare silențioasă.', 640, 'https://casaneciu.ro/wp-content/uploads/2025/05/Dormitor-7-Star-SonomaGri-22-scaled-300x300.jpg', (SELECT id FROM categories WHERE slug = 'dormitor'), 7, 'active'),

('Comoda Zen, gri antracit', 'Comoda Zen în culoare gri antracit modern. Design minimalist zen cu spații de depozitare generoase. Perfectă pentru dormitoare contemporane cu stil urban.', 640, 'https://casaneciu.ro/wp-content/uploads/2024/08/image00006-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 9, 'active'),

-- Paturi standard (Standard beds)
('Pat standard Luiza 120x200 cm, alb', 'Pat standard Luiza în culoare alb pentru persoane singure sau copii. Dimensiuni 120x200 cm cu design simplu și funcțional. Calitate Premium la preț accesibil.', 500, 'https://casaneciu.ro/wp-content/uploads/2023/11/Dormitor-Luiza-alb-pat-scaled-300x300.jpg', (SELECT id FROM categories WHERE slug = 'dormitor'), 12, 'active'),

('Pat Star 160x200 cm, alb', 'Pat Star pentru cupluri în culoare alb elegant. Dimensiuni matrimoniale 160x200 cm cu design sofisticat. Structură solidă și finisaje premium pentru un dormitor de lux.', 800, 'https://casaneciu.ro/wp-content/uploads/2025/04/Dormitor-7-Star-Alb-8-1-scaled-300x300.jpg', (SELECT id FROM categories WHERE slug = 'dormitor'), 6, 'active'),

('Pat Star 160x200 cm, sonoma/gri', 'Pat Star matrimonial în combinația sonoma/gri. Dimensiuni 160x200 cm cu design natural-modern. Finisaje în lemn sonoma cu accente gri contemporane.', 800, 'https://casaneciu.ro/wp-content/uploads/2025/04/Dormitor-7-Star-SonomaGri-8-1-scaled-300x300.jpg', (SELECT id FROM categories WHERE slug = 'dormitor'), 5, 'active'),

('Pat Zen 160x200 cm, gri antracit', 'Pat Zen matrimonial în gri antracit modern. Dimensiuni 160x200 cm cu design minimalist zen. Liniște și eleganță pentru un dormitor contemporan și relaxant.', 800, 'https://casaneciu.ro/wp-content/uploads/2024/08/image00013-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 7, 'active'),

-- Noptiere (Nightstands sets)
('Set 2 noptiere Serenity, sonoma/alb', 'Set 2 noptiere Serenity în combinația sonoma/alb. Design coordonat cu comodele Serenity. Sertare funcționale și suprafață generoasă pentru ceas, telefon și cărți.', 430, 'https://casaneciu.ro/wp-content/uploads/2024/08/image00008-1-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 15, 'active'),

('Set 2 noptiere Star, alb', 'Set 2 noptiere Star în culoare alb pur. Design elegant care se potrivește perfect cu mobila Star. Funcționalitate și stil pentru un dormitor armonios și organizat.', 430, 'https://casaneciu.ro/wp-content/uploads/2025/05/Dormitor-7-Star-Alb-12-scaled-300x300.jpg', (SELECT id FROM categories WHERE slug = 'dormitor'), 12, 'active'),

('Set 2 noptiere Star, sonoma/gri', 'Set 2 noptiere Star în combinația sonoma/gri. Design natural-contemporan cu finisaje de calitate. Coordonate cu patul și comodele Star pentru un look coerent.', 430, 'https://casaneciu.ro/wp-content/uploads/2025/05/Dormitor-7-Star-SonomaGri-12-scaled-300x300.jpg', (SELECT id FROM categories WHERE slug = 'dormitor'), 10, 'active'),

-- Pat Kasia premium series
('Pat Kasia, gri/argintiu', 'Pat premium Kasia în culoare gri cu accente argintii. Design de lux cu tapițerie superioară și finisaje metalice. Perfect pentru dormitoare elegante și sofisticate.', 1500, 'https://casaneciu.ro/wp-content/uploads/2025/09/6CDD5939-3E80-46B3-BACC-4709FF7559F5-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 4, 'active'),

('Pat Kasia, negru/auriu', 'Pat premium Kasia în combinația luxoasă negru/auriu. Design dramatic cu tapițerie de lux și accente aurii. Statement piece pentru dormitoare rafinate și elegante.', 1500, 'https://casaneciu.ro/wp-content/uploads/2025/05/image00001-2-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 3, 'active'),

('Pat Kasia complet cu saltea, negru/auriu', 'Pat Kasia premium cu 2 noptiere și saltea ortopedică inclusă. Culoare negru/auriu cu design de lux. Set complet pentru un dormitor sofisticat și confortabil.', 2860, 'https://casaneciu.ro/wp-content/uploads/2025/05/image00011-1-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 2, 'active'),

('Pat Riga cu saltea, negru/auriu', 'Pat Riga cu saltea ortopedică inclusă în combinația negru/auriu. Design elegant cu tapițerie premium și saltea de calitate superioară pentru confort maxim.', 2060, 'https://casaneciu.ro/wp-content/uploads/2025/05/image00004-1-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 3, 'active'),

('Pat Riga complet cu noptiere', 'Pat Riga complet cu 2 noptiere și saltea ortopedică. Set premium negru/auriu pentru un dormitor complet. Include toate accesoriile necesare pentru confort total.', 2860, 'https://casaneciu.ro/wp-content/uploads/2025/05/image00006-1-scaled-300x300.jpeg', (SELECT id FROM categories WHERE slug = 'dormitor'), 2, 'active');