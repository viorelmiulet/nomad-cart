-- First, create the office category
INSERT INTO public.categories (name, slug, description) 
VALUES ('Birou', 'birou', 'Mobilier de birou modern și funcțional pentru un spațiu de lucru confortabil')
ON CONFLICT (slug) DO NOTHING;

-- Get the category ID for office furniture
DO $$
DECLARE
    birou_category_id UUID;
BEGIN
    SELECT id INTO birou_category_id FROM public.categories WHERE slug = 'birou';
    
    -- Insert office furniture products
    INSERT INTO public.products (name, price, image_url, description, category_id, stock, status) VALUES
    -- Office chairs
    ('Scaun de birou Mars-L', 351, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Mars-L, stejar evoc, dimensiuni L70 B43,5 H75 cm', birou_category_id, 10, 'active'),
    ('Scaun de birou Meizar', 558, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Meizar, culoare negru', birou_category_id, 15, 'active'),
    ('Scaun de birou Roten II', 561, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Roten II, culoare gri', birou_category_id, 12, 'active'),
    ('Scaun de birou Elit', 528, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Elit, culoare negru', birou_category_id, 18, 'active'),
    ('Scaun de birou Forni', 743, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Forni, culoare negru', birou_category_id, 8, 'active'),
    ('Scaun de birou Roten', 520, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Roten, culoare gri', birou_category_id, 14, 'active'),
    ('Scaun de birou Vaskon', 514, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Vaskon, culoare negru', birou_category_id, 10, 'active'),
    ('Scaun de birou Storni A', 672, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Storni A, culoare negru', birou_category_id, 9, 'active'),
    ('Scaun de birou Storni B', 746, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Storni B, culoare negru', birou_category_id, 7, 'active'),
    ('Scaun de birou Miler', 473, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Miler, culoare negru + roșu', birou_category_id, 16, 'active'),
    ('Scaun de birou Corlin A', 622, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Corlin A, culoare maro deschis', birou_category_id, 11, 'active'),
    ('Scaun de birou Leto II', 569, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Leto II, culoare albastru', birou_category_id, 13, 'active'),
    ('Scaun de birou Forni A', 343, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Forni A, culoare negru', birou_category_id, 20, 'active'),
    ('Scaun de birou Domek', 555, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Domek, culoare negru', birou_category_id, 12, 'active'),
    ('Scaun de birou Emir II', 600, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Emir II, culoare negru', birou_category_id, 8, 'active'),
    ('Scaun de birou Teimbi', 544, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Teimbi, culoare negru', birou_category_id, 15, 'active'),
    ('Scaun de birou Kindy', 246, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Kindy, culoare negru + roșu', birou_category_id, 25, 'active'),
    ('Scaun de birou Seni', 663, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Seni, culoare negru', birou_category_id, 10, 'active'),
    ('Scaun de birou Avangard', 467, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Avangard, dimensiuni L51 B64 H111/120 cm, culoare negru', birou_category_id, 14, 'active'),
    ('Scaun de birou Corlin', 884, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Corlin, culoare maro deschis', birou_category_id, 6, 'active'),
    ('Scaun de birou Canila', 503, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Canila, culoare negru', birou_category_id, 12, 'active'),
    ('Scaun de birou Marvel', 779, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Marvel, dimensiuni L63 В62 H118/126 cm', birou_category_id, 9, 'active'),
    ('Scaun de birou Marsilio III', 1042, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Marsilio III, dimensiuni L67 В74 H128/121 cm, culoare maro', birou_category_id, 5, 'active'),
    ('Scaun de birou Arais', 641, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Arais, culoare bej', birou_category_id, 11, 'active'),
    ('Scaun de birou Olimp', 674, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Olimp, dimensiuni L64 B64 H110/125 cm, culoare gri + negru', birou_category_id, 8, 'active'),
    ('Scaun de birou Arden', 705, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Arden, culoare negru + roșu', birou_category_id, 10, 'active'),
    ('Scaun de birou Rudi', 649, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Rudi, dimensiuni L63 В68 H111/118 cm, culoare bej deschis', birou_category_id, 12, 'active'),
    ('Scaun de birou Leto', 514, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de birou Leto, culoare albastru', birou_category_id, 15, 'active'),

    -- Gaming chairs
    ('Scaun gaming Visman', 591, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun gaming Visman, dimensiuni L66 В68 H106/114 cm, culoare roșu + negru', birou_category_id, 8, 'active'),
    ('Scaun gaming Ledon', 583, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun gaming Ledon, culoare gri + negru', birou_category_id, 10, 'active'),
    ('Scaun gaming Dakar', 956, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun gaming Dakar, dimensiuni L70 В65 H124/132 cm, culoare roșu + negru', birou_category_id, 6, 'active'),

    -- Visitor chairs
    ('Scaun de vizitator Vista', 484, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Scaun de vizitator Vista, culoare gri', birou_category_id, 20, 'active'),

    -- Storage and organization
    ('Etajera Perie', 1210, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Etajera Perie, culoare antracit + stejar piatra', birou_category_id, 5, 'active'),
    ('Organizer pentru copii Jessie', 196, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Organizer pentru copii Jessie, dimensiuni L82,5 B29,3 H60 cm, culoare natural', birou_category_id, 15, 'active'),

    -- TV stands and furniture
    ('Modul TV Delaro T', 578, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Modul TV Delaro T, dimensiuni L140 B36.5 H66 cm, culoare stejar coniac + casmir', birou_category_id, 8, 'active'),

    -- Armchairs and seating
    ('Fotoliu Arturo II', 575, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Fotoliu Arturo II, dimensiuni L62 B71 H82 cm, culoare gri închis', birou_category_id, 12, 'active'),
    ('Fotoliu Makao', 799, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Fotoliu Makao, culoare mentă', birou_category_id, 10, 'active'),
    ('Recliner Dream', 1487, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Recliner Dream, culoare negru', birou_category_id, 4, 'active'),

    -- Sofas
    ('Canapea cu două locuri Arturo II', 743, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Canapea cu două locuri Arturo II, dimensiuni L105 B71 H82 cm, culoare albastru închis', birou_category_id, 6, 'active'),
    ('Coltar extensibil Ravena', 4872, 'https://velleahome.ro/themes/videnov/css/images/giphy.webp', 'Coltar extensibil Ravena, dimensiuni L280 B203 H94 cm, culoare bej deschis', birou_category_id, 2, 'active');

END $$;