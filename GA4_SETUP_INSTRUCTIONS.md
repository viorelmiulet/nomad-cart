# Configurare Google Analytics 4 API - Date Reale

## Pasul 1: Creează Service Account în Google Cloud

1. **Accesează Google Cloud Console:**
   - Mergi la https://console.cloud.google.com/
   - Selectează sau creează un proiect nou

2. **Activează Google Analytics Data API:**
   - Navighează la "APIs & Services" → "Library"
   - Caută "Google Analytics Data API"
   - Click pe "Enable"

3. **Creează Service Account:**
   - Mergi la "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Nume: `ga4-reporting-service`
   - Click "Create and Continue"
   - Role: Nu e necesar să adaugi rol aici
   - Click "Done"

4. **Generează JSON Key:**
   - Click pe service account-ul creat
   - Tab "Keys"
   - "Add Key" → "Create new key"
   - Tip: JSON
   - Click "Create"
   - **SALVEAZĂ fișierul JSON descărcat - vei avea nevoie de el!**

## Pasul 2: Acordă Acces Service Account în GA4

1. **Obține email-ul Service Account:**
   - Din fișierul JSON, copiază valoarea `client_email`
   - Format: `ga4-reporting-service@project-id.iam.gserviceaccount.com`

2. **Adaugă în GA4:**
   - Accesează Google Analytics: https://analytics.google.com
   - Admin (roată dințată jos stânga)
   - Selectează proprietatea ta (G-C9YE9WJ6LR)
   - "Property Access Management"
   - Click butonul "+" sus dreapta
   - Adaugă email-ul service account-ului
   - Role: **Viewer** (suficient pentru citire date)
   - Click "Add"

## Pasul 3: Obține Property ID

1. **În Google Analytics:**
   - Admin → Property Settings
   - Copiază **Property ID** (format numeric, ex: 123456789)

## Pasul 4: Configurează Secretele în Supabase

Ai nevoie de 2 secrete:

### 1. GA4_PROPERTY_ID
- Valoare: Property ID numeric (ex: `123456789`)

### 2. GA4_SERVICE_ACCOUNT_KEY
- Valoare: **ÎNTREGUL conținut** al fișierului JSON descărcat
- Trebuie să fie un JSON valid pe o singură linie
- Exemplu format:
```json
{"type":"service_account","project_id":"your-project","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\\nMIIE...\\n-----END PRIVATE KEY-----\\n","client_email":"ga4-reporting-service@project.iam.gserviceaccount.com","client_id":"123456","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/..."}
```

### Cum adaugi secretele:

**Opțiunea 1: Prin Supabase Dashboard (Recomandat)**
1. Accesează: https://supabase.com/dashboard/project/shogmmpqpwkljdlmmcbs/settings/functions
2. Secțiunea "Secrets"
3. Adaugă cele 2 secrete

**Opțiunea 2: Prin CLI**
```bash
supabase secrets set GA4_PROPERTY_ID="123456789"
supabase secrets set GA4_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
```

## Pasul 5: Testează Conexiunea

După configurarea secretelor:
1. Publică site-ul (pentru a deploya edge function-ul)
2. Accesează `/admin` → Tab "Analytics"
3. Dashboard-ul ar trebui să încarce date reale din GA4

## Troubleshooting

### Error: "GA4_PROPERTY_ID must be configured"
- Verifică că ai adăugat ambele secrete în Supabase
- Așteaptă 1-2 minute după adăugare pentru propagare
- Republică site-ul

### Error: "403 Forbidden" sau "Permission denied"
- Verifică că ai adăugat service account email în GA4 Property Access
- Asigură-te că ai dat role "Viewer"
- Așteaptă câteva minute pentru propagarea permisiunilor

### Error: "Invalid JWT signature"
- Verifică că JSON-ul service account este valid
- Asigură-te că `private_key` conține `\\n` pentru newlines, nu newline-uri reale
- Copiază din nou întregul conținut din fișierul JSON

### Date lipsă sau incomplete
- Verifică că Property ID este corect
- Asigură-te că proprietatea GA4 are date colectate
- Verifică în GA4 Realtime dacă primești trafic

## Metrici Disponibile în Dashboard

Dashboard-ul va afișa:
- **Organic Traffic**: Sesiuni și utilizatori din motoare de căutare
- **Landing Pages**: Cele mai vizitate pagini din organic search
- **Search Engines**: Distribuția pe Google, Bing, Yahoo, etc.
- **Device Breakdown**: Desktop, Mobile, Tablet
- **Conversions**: Comenzi și venit (din baza de date Supabase)
- **Conversion Rate**: Rata de conversie pentru trafic organic

## Securitate

✅ Service Account Key este stocat securizat în Supabase Secrets
✅ Nu este expus în frontend
✅ Accesibil doar prin edge function autentificat
✅ Edge function-ul rulează pe server-side
