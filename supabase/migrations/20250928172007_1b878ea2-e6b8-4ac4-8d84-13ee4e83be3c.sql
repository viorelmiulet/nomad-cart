-- Mapare imagini locale pentru produsele de bucătărie - corectare cu cast explicit
UPDATE products AS p
SET image_url = v.path
FROM (
  VALUES
    ('94482cd9-3dfa-4f07-b8ad-4c51451316df'::uuid,'/images/kitchen/blat-stejar-halifax-300x300.webp'),
    ('331fa315-a5d1-461c-8753-3debaf28699a'::uuid,'/images/kitchen/blat-hpl-alb-300x300.webp'),
    ('502767c0-afe4-4099-9c00-bc6f69cc3d43'::uuid,'/images/kitchen/bucatarie-alb-mat-300x300.webp'),
    ('a53ed1f8-feb0-4597-bc0b-6b393a68efad'::uuid,'/images/kitchen/bucatarie-stejar-300x300.webp'),
    ('d227f0eb-4a6b-4902-adc0-96960be75973'::uuid,'/images/kitchen/bucatarie-gri-300x300.webp'),
    ('72ee7bbd-2ecb-43a5-85cf-83b552d27001'::uuid,'/images/kitchen/bucatarie-alb-lucios-300x300.webp'),
    ('a6dbb207-237f-43c8-842f-b372ccd286ad'::uuid,'/images/kitchen/corp-coltar-300x300.webp'),
    ('8c594505-a341-45f1-a86d-27bc327a1032'::uuid,'/images/kitchen/corp-4-sertare-300x300.webp'),
    ('f39b505d-6a20-4784-a7c5-043c035796e6'::uuid,'/images/kitchen/corp-inferior-chiuveta-300x300.webp'),
    ('d1936499-f456-4a5c-85da-643a0cc6df52'::uuid,'/images/kitchen/corp-superior-80-300x300.webp'),
    ('85106a13-1e4c-429d-a76f-2dad3476a066'::uuid,'/images/kitchen/cos-retractabil-300x300.webp'),
    ('d25e544b-18fc-430e-8c22-64d1b059f54f'::uuid,'/images/kitchen/cuptor-incorporabil-300x300.webp'),
    ('1dd67dc6-b95d-4e74-b5a1-45d29b9ced51'::uuid,'/images/kitchen/hota-incorporabila-300x300.webp'),
    ('4fc01e12-a177-4e26-8c04-d30ea199c6f9'::uuid,'/images/kitchen/plita-gaz-incorporabila-300x300.webp'),
    ('882b9253-25e5-47cc-bba4-edcb05a9747e'::uuid,'/images/kitchen/organizatoare-sertare-300x300.webp'),
    ('e836e998-ee4a-47ff-b671-8fb6bbb6fb4a'::uuid,'/images/kitchen/aventos-hks-300x300.webp')
) AS v(id, path)
WHERE p.id = v.id;