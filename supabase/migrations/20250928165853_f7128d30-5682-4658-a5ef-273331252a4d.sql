-- Insert mobilier de bucătărie products from Casa Neciu style
INSERT INTO products (name, description, price, image_url, category_id, status, stock) VALUES

-- Bucătării complete
('Bucătărie Olivia, culoare alb lucios, 240 cm', 'Bucătărie completă Olivia cu fronturi albe lucioase, blat de lucru inclus. Design modern și funcțional cu sistem soft-close. Dimensiuni: 240 cm lățime.', 2890, 'https://casaneciu.ro/wp-content/uploads/2024/03/bucatarie-alb-lucios-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 8),

('Bucătărie Elena, culoare stejar sonoma, 280 cm', 'Bucătărie completă Elena cu finisaj stejar sonoma și accente negre. Include blat de lucru, chiuvetă încorporată. Design contemporan cu spațiu de depozitare maxim.', 3150, 'https://casaneciu.ro/wp-content/uploads/2024/05/bucatarie-stejar-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 6),

('Bucătărie Maya, culoare gri antracit, 320 cm', 'Bucătărie premium Maya cu fronturi gri antracit și blat Egger. Design minimalist cu sertare cu amortizor. Include iluminare LED sub corpurile superioare.', 4200, 'https://casaneciu.ro/wp-content/uploads/2024/06/bucatarie-gri-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 5),

('Bucătărie Diana, culoare alb mat, 200 cm', 'Bucătărie compactă Diana perfectă pentru spații mici. Finisaj alb mat cu mânere integrate. Include toate electrocasnicele necesare într-un design elegant.', 2350, 'https://casaneciu.ro/wp-content/uploads/2024/04/bucatarie-alb-mat-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 10),

-- Corpuri bucătărie individuale  
('Corp inferior cu chiuvetă 80 cm, alb', 'Corp inferior pentru chiuvetă cu ușă dublă și sistem de organizare pentru detergenți. Finisaj alb rezistent la umiditate. Dimensiuni: 80 x 60 x 85 cm.', 320, 'https://casaneciu.ro/wp-content/uploads/2024/02/corp-inferior-chiuveta-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 15),

('Corp inferior 4 sertare, stejar sonoma', 'Corp inferior cu 4 sertare cu amortizor Blum. Finisaj stejar sonoma cu mânere cromate. Perfect pentru organizarea ustensilor. Dimensiuni: 60 x 60 x 85 cm.', 450, 'https://casaneciu.ro/wp-content/uploads/2024/03/corp-4-sertare-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 12),

('Corp superior cu uși și raft, 80 cm', 'Corp superior cu 2 uși și raft reglabil intern. Sistem soft-close și mânere moderne. Finisaj alb lucios rezistent la abur. Dimensiuni: 80 x 32 x 72 cm.', 280, 'https://casaneciu.ro/wp-content/uploads/2024/02/corp-superior-80-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 18),

('Corp colțar inferior, culoare gri', 'Corp colțar inferior cu sistem rotativ pentru optimizarea spațiului. Finisaj gri mat cu acces facil în colț. Dimensiuni: 90 x 90 x 85 cm.', 580, 'https://casaneciu.ro/wp-content/uploads/2024/04/corp-coltar-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 8),

-- Blat bucătărie
('Blat bucătărie Egger, 38mm stejar halifax', 'Blat de bucătărie din PAL melaminat Egger, grosime 38mm. Culoare stejar halifax cu textură naturală. Rezistent la zgârieturi și umiditate. Se vinde la metru liniar.', 85, 'https://casaneciu.ro/wp-content/uploads/2024/05/blat-stejar-halifax-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 25),

('Blat bucătărie HPL alb, 39mm', 'Blat bucătărie HPL (High Pressure Laminate) alb, grosime 39mm. Foarte rezistent la căldură și pete. Chant ABS pe 4 laturi. Calitate premium pentru uz intensiv.', 120, 'https://casaneciu.ro/wp-content/uploads/2024/03/blat-hpl-alb-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 20),

-- Accesorii bucătărie
('Set organizatoare sertare bucătărie', 'Set complet de organizatoare pentru sertare bucătărie. Include organizator pentru tacâmuri, condimente și ustensile. Material plastic de calitate, ajustabil.', 95, 'https://casaneciu.ro/wp-content/uploads/2024/02/organizatoare-sertare-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 30),

('Coș retractabil 2 nivele, 40 cm', 'Coș retractabil pe glisiere cu amortizor pentru corp de 40 cm. 2 nivele pentru sticle și conserve. Cromat, capacitate 20 kg pe nivel. Montare ușoară.', 180, 'https://casaneciu.ro/wp-content/uploads/2024/04/cos-retractabil-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 15),

('Sistem ridicare uși superioare, Aventos HK-S', 'Sistem Blum Aventos HK-S pentru ridicarea ușilor superioare. Include amortizoare și mecanisme de calitate. Pentru uși până la 5.5 kg. Garanție 5 ani.', 145, 'https://casaneciu.ro/wp-content/uploads/2024/03/aventos-hks-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 12),

-- Electrocasnice incorporate
('Plită incorporabilă 4 arzătoare, gaz', 'Plită gaz incorporabilă cu 4 arzătoare de diferite puteri. Suprafață inox, grătare fontă. Aprindere electrică și siguranță gaz. Dimensiuni: 60 x 60 cm.', 380, 'https://casaneciu.ro/wp-content/uploads/2024/05/plita-gaz-incorporabila-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 10),

('Cuptor electric incorporabil, 65L', 'Cuptor electric incorporabil cu ventilație, 65L. 8 funcții de gătit, timer programabil. Ușă cu geam triplu pentru izolare termică. Clasa energetică A.', 890, 'https://casaneciu.ro/wp-content/uploads/2024/04/cuptor-incorporabil-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 8),

('Hotă incorporabilă 60 cm, inox', 'Hotă incorporabilă cu 3 viteze de aspirație. Filtru anti-grăsimi lavabil, iluminare LED. Nivel zgomot redus. Debit aer: 650 mc/h. Finisaj inox.', 320, 'https://casaneciu.ro/wp-content/uploads/2024/06/hota-incorporabila-300x300.webp', 'b67bd8fb-b610-4d18-ad4b-6d48db363935', 'active', 12);