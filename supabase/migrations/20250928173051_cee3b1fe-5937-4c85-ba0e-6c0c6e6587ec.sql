-- Adaug produse pentru Camera de zi - canapele colțare extensibile
-- Obțin ID-ul categoriei Camera de zi
INSERT INTO products (name, description, price, image_url, category_id, stock, status)
SELECT 
  v.name,
  v.description, 
  v.price,
  v.image_url,
  c.id as category_id,
  v.stock,
  'active'
FROM categories c
CROSS JOIN (
  VALUES 
    (
      'Canapea colțar extensibilă Andreea, tapițerie textil, gri',
      'Canapea colțar extensibilă cu funcție de dormit și spațiu de depozitare. Tapițerie din textil rezistent, culoare gri modern. Dimensiuni: 245x165 cm. Saltea din spumă poliuretanică de înaltă calitate. Perfect pentru livingul modern.',
      2890.00,
      '/placeholder.svg',
      15
    ),
    (
      'Canapea colțar extensibilă Marina, tapițerie catifea, albastru',
      'Canapea colțar de lux cu tapițerie din catifea premium, culoare albastru închis. Funcție sleep și compartiment depozitare. Dimensiuni generoase: 260x180 cm. Cadru din lemn masiv și arcuri Bonell pentru confort maxim.',
      3450.00,
      '/placeholder.svg',
      18
    ),
    (
      'Canapea colțar extensibilă Sofia, piele ecologică, maro',
      'Canapea colțar elegantă cu tapițerie din piele ecologică maro. Sistem de extensie rapid și ușor. Dimensiuni: 235x155 cm. Perne decorative incluse. Ideală pentru familii cu copii datorită materialului rezistent la pete.',
      2650.00,
      '/placeholder.svg',
      12
    ),
    (
      'Canapea colțar extensibilă Diana, textil, bej',
      'Canapea colțar clasică în nuanțe neutre de bej. Tapițerie textil anti-pată cu tratament special. Dimensiuni compacte: 220x140 cm. Perfectă pentru spații mici. Include saltea ortopedică pentru un somn confortabil.',
      2290.00,
      '/placeholder.svg',
      20
    ),
    (
      'Canapea colțar extensibilă Valentina, catifea, verde smarald',
      'Canapea colțar statement în verde smarald vibrant. Tapițerie catifea de lux cu finisaj anti-scame. Dimensiuni: 250x170 cm. Picioare metalice aurii. Compartiment depozitare generős pentru pături și perne.',
      3890.00,
      '/placeholder.svg',
      8
    ),
    (
      'Canapea colțar extensibilă Roberto, piele naturală, negru',
      'Canapea colțar premium din piele naturală neagră. Finisaje de lux și cusături decorative. Dimensiuni: 280x190 cm. Sistem de extensie italian cu garanție 5 ani. Pentru cei care apreciază calitatea superioară.',
      4650.00,
      '/placeholder.svg',
      6
    ),
    (
      'Canapea colțar extensibilă Elena, textil, gri închis',
      'Canapea colțar modernă cu design scandinav. Tapițerie textil gri închis, rezistentă și ușor de întreținut. Dimensiuni: 240x160 cm. Perne lombare ergonomice incluse. Funcție sleep cu saltea HR de 14 cm.',
      2750.00,
      '/placeholder.svg',
      14
    ),
    (
      'Canapea colțar extensibilă Carmen, catifea, roz pudrat',
      'Canapea colțar feminină în roz pudrat delicat. Tapițerie catifea premium cu aspect de mătase. Dimensiuni: 230x150 cm. Design romantic cu perne decorative și nasturi capitonați. Perfectă pentru dormitor sau living.',
      3190.00,
      '/placeholder.svg',
      10
    )
) AS v(name, description, price, image_url, stock)
WHERE c.slug = 'camera-de-zi';