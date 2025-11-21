# Configurare Google Analytics și Search Console

## Google Analytics 4 (GA4)

### Pași de configurare:

1. **Creează proprietate GA4:**
   - Accesează https://analytics.google.com
   - Creează o proprietate nouă pentru `mobilanomad.ro`
   - Obține Measurement ID (format: `G-XXXXXXXXXX`)

2. **Actualizează ID-ul în cod:**
   - Deschide fișierul `index.html`
   - Găsește `G-XXXXXXXXXX` (apare de 2 ori)
   - Înlocuiește cu ID-ul tău real

3. **Publică modificările:**
   - Apasă butonul "Publish" în Lovable
   - Click pe "Update" pentru a publica modificările

### Eventi urmăriți automat:
- ✅ Page views pentru toate paginile
- ✅ Organic search traffic (Google, Bing, Yahoo, etc.)
- ✅ Landing pages din căutări organice
- ✅ Referrer-uri pentru fiecare vizită

---

## Google Search Console

### Metoda 1: Verificare prin fișier HTML (Simplă)

1. Accesează https://search.google.com/search-console
2. Adaugă proprietatea `mobilanomad.ro`
3. Alege metoda "Fișier HTML"
4. Descarcă fișierul de verificare
5. Înlocuiește `public/google-site-verification.html` cu fișierul descărcat
6. Publică site-ul
7. Click "Verifică" în Search Console

### Metoda 2: Verificare prin Meta Tag (Recomandată)

1. Accesează https://search.google.com/search-console
2. Adaugă proprietatea `mobilanomad.ro`
3. Alege metoda "Tag HTML"
4. Copiază tag-ul meta primit
5. Adaugă tag-ul în `index.html` în secțiunea `<head>`
6. Publică site-ul
7. Click "Verifică" în Search Console

### Metoda 3: Verificare prin DNS (Cea mai sigură)

1. Accesează https://search.google.com/search-console
2. Alege metoda "Înregistrare DNS"
3. Adaugă înregistrarea TXT la domain provider-ul tău
4. Așteaptă propagarea DNS (max 48h)
5. Click "Verifică" în Search Console

---

## Funcționalități Analytics implementate:

### Tracking automat:
- **Page Views**: Toate paginile sunt urmărite automat
- **User Sessions**: Sesiuni unice per vizitator
- **Device Type**: Desktop, Mobile, Tablet
- **Browser**: Chrome, Firefox, Safari, Edge
- **Referrer**: De unde vin vizitatorii
- **Organic Search**: Detectare automată Google, Bing, Yahoo, etc.

### Dashboard Analytics:
- Acces prin `/admin` → Tab "Analytics"
- Statistici în timp real
- Grafice pentru vizualizare date
- Export date disponibil

---

## Verificare funcționare:

1. **Test Google Analytics:**
   - Deschide site-ul în incognito
   - Navighează prin câteva pagini
   - Verifică în GA4 → Reports → Realtime
   - Ar trebui să vezi activitatea ta live

2. **Test Organic Search Tracking:**
   - Caută "mobilanomad.ro" pe Google
   - Click pe rezultat
   - Verifică în GA4 → Reports → Realtime → Events
   - Caută event-ul "organic_search_visit"

3. **Test Search Console:**
   - După verificare, așteaptă 24-48h
   - Verifică în Performance → Search Results
   - Vei vedea impresii, click-uri, CTR, poziție medie

---

## Integrări recomandate viitoare:

- [ ] Conversion tracking pentru comenzi
- [ ] Enhanced ecommerce tracking
- [ ] Goal tracking pentru formulare de contact
- [ ] Event tracking pentru butoane importante
- [ ] User ID tracking pentru clienți autentificați
