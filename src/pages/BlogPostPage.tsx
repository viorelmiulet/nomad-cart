import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Clock, Heart, Share2, Eye } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const BlogPostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGoBack = () => {
    navigate("/blog");
  };

  const blogPosts = [
    {
      id: 1,
      title: "10 Tendințe în Design Interior pentru 2025",
      content: `<h2>Culorile Anului 2025</h2>
      <p>Anul 2025 aduce o paletă cromatică bogată și diversă, dominată de tonuri calde și naturale. De la earth tones sofisticate la accentele vibrante de emerald green, designerii se îndreaptă către culori care reflectă o conexiune profundă cu natura.</p>
      
      <h3>1. Warm Neutrals cu Accente Naturale</h3>
      <p>Baza designului modern o constituie acum warm neutrals - beige-uri calde, gri-uri soft și crem-uri sofisticate. Acestea sunt complementate de accente în terracotta, sage green și deep navy, creând o atmosferă echilibrată și relaxantă.</p>
      
      <h3>2. Mobilier Durabil din Lemn Masiv</h3>
      <p>Investiția în mobilier de calitate devine prioritate. Piesele din lemn masiv, preferabil din surse durabile, nu doar că arată magnific, dar sunt și o alegere responsabilă pentru mediu. Stejar american, nuc european și frasinul sunt materialele vedete ale anului.</p>
      
      <h3>3. Texturile Organice și Handmade</h3>
      <p>Țesăturile naturale precum lânul, bumbacul organic și in-ul câștigă popularitate. Covorașele țesute manual, pernele din fibre naturale și draperiile din materiale organice adaugă căldură și autenticitate spațiului.</p>
      
      <h3>4. Spații Multifuncționale</h3>
      <p>Cu schimbarea modului de lucru și viață, casele trebuie să se adapteze. Mobilierul modular, birourile pliabile și zonele de stocare ingenioase devin esențiale. Un living care se transformă în birou, iar dormitorul include o zonă de lectură - flexibilitatea este cheia.</p>
      
      <h3>5. Iluminat LED Personalizabil</h3>
      <p>Tehnologia LED permite acum controlul complet asupra atmosferei. Sistemele smart de iluminat cu temperatura culorii reglabilă și intensitate variabilă se integrează perfect în designul modern, oferind scenarii diferite pentru fiecare moment al zilei.</p>`,
      author: "Design Team Mobila Nomad",
      date: "15 Martie 2025",
      readTime: "5 min",
      category: "Design",
      likes: 245,
      views: 3420
    },
    {
      id: 2,
      title: "Cum să Alegi Mobilierul Perfect pentru Camera de Zi",
      content: `<h2>Ghidul Complet pentru Living-ul Perfect</h2>
      <p>Camera de zi este inima casei, locul unde familia se reunește și unde primim oaspeții. Alegerea mobilierului potrivit poate transforma complet atmosfera și funcționalitatea acestui spațiu vital.</p>
      
      <h3>Pas 1: Măsurarea și Planificarea Spațiului</h3>
      <p>Înainte de orice achiziție, măsurați cu atenție dimensiunile camerei. Luați în considerare circulația în cameră - lăsați cel puțin 60cm între piese de mobilier pentru o circulație confortabilă. Desenați un plan al camerei și marcați ușile, ferestrele și prizele.</p>
      
      <h3>Pas 2: Canapea - Centrul de Greutate</h3>
      <p>Canapea reprezintă piesa centrală a living-ului. Pentru o cameră de dimensiuni medii (4x4m), o canapea cu 3 locuri (lungime 200-220cm) este ideală. Dacă spațiul permite, un set L-shaped oferă mai multe locuri de șezut și definește zonele în cameră.</p>
      
      <h3>Pas 3: Masa de Cafea - Funcționalitate și Stil</h3>
      <p>Masa de cafea trebuie să fie proporțională cu canapea. Regula generală: lungimea mesei = 2/3 din lungimea canapelei. Înălțimea ideală este la același nivel cu pernele canapelei sau cu 5cm mai jos. Modelele cu spațiu de depozitare sunt perfecte pentru spații mici.</p>
      
      <h3>Pas 4: Fotoliile și Scaunele Accent</h3>
      <p>Fotoliile completează zona de conversație. Poziționați-le perpendicular pe canapea pentru a crea un U natural care încurajează interacțiunea. Alegeți modele cu tapițerie în culori complementare sau texturi contrastante.</p>
      
      <h3>Pas 5: Sistemul de Stocare</h3>
      <p>Un living organizat necesită spațiu de depozitare inteligent. Biblioteca modulară, comodele suspendate și mobilierul media integrat mențin ordinea fără să sacrifice stilul. Optați pentru piese cu uși pentru a ascunde obiectele mai puțin estetice.</p>`,
      author: "Alexandra Popescu",
      date: "12 Martie 2025",
      readTime: "8 min",
      category: "Mobilier",
      likes: 189,
      views: 2840
    },
    {
      id: 3,
      title: "Dormitorul de Lux: Secretele unui Somn Odihnitor",
      content: `<h2>Creează Sanctuarul Perfect pentru Odihnă</h2>
      <p>Dormitorul nu este doar un spațiu pentru somn - este sanctuarul personal unde ne regenerăm energia pentru o nouă zi. Un dormitor bine amenajat poate îmbunătăți semnificativ calitatea somnului și nivelul general de bunăstare.</p>
      
      <h3>Patul: Inima Dormitorului</h3>
      <p>Investiția în un pat de calitate din lemn masiv nu este doar o alegere estetică. Structura solidă garantează stabilitatea pe termen lung, în timp ce lemnul natural ajută la reglarea umidității din cameră. Modelele cu tăblie înaltă creează o senzație de protecție și intimitate.</p>
      
      <h3>Saltele Premium: Baza unui Somn Profund</h3>
      <p>Saltelele din spumă cu memorie se adaptează perfect conturului corpului, reducând punctele de presiune. Tehnologia memory foam de ultimă generație asigură susținere optimă pentru coloana vertebrală, în timp ce stratul de gel termo-reglator menține temperatura ideală toată noaptea.</p>
      
      <h3>Lenjeria din Bumbac Egyptian</h3>
      <p>Fibrele lungi ale bumbacului egyptian creează o țesătură excepțional de moale și durabilă. Thread count-ul de 600+ oferă o senzație luxoasă, în timp ce proprietățile naturale de absorbție mențin pielea uscată și confortabilă.</p>
      
      <h3>Culorile Calmante și Psihologia Somnului</h3>
      <p>Albastrul profund stimulează producția de melatonină, hormonul somnului. Tonurile de lavandă au efecte dovedite anti-stress, iar beige-ul cald creează o atmosferă cocoon care favoriza relaxarea. Evită roșul și portocaliul în dormitor - acestea sunt culori stimulante.</p>
      
      <h3>Iluminatul Stratificat pentru Relaxare</h3>
      <p>Utilizează three-layer lighting: luminile ambientale cu dimmer pentru atmosferă generală, task lighting pentru lectură și accent lighting pentru decorare. Temperările calde (2700K-3000K) seara ajută la prepararea creierului pentru somn.</p>`,
      author: "Mihai Georgescu",
      date: "10 Martie 2025",
      readTime: "6 min",
      category: "Dormitor",
      likes: 156,
      views: 2100
    },
    {
      id: 4,
      title: "Materialele Premium: Calitate și Durabilitate",
      content: `<h2>Investiția în Excelență: Materialele Care Definesc Luxul</h2>
      <p>În lumea mobilierului premium, materialele fac diferența între o piesă obișnuită și o moștenire care se transmite din generație în generație. Să explorăm materialele care definesc adevărata calitate.</p>
      
      <h3>Lemnul de Stejar American - 50+ Ani de Maturitate</h3>
      <p>Stejarul american vârstă de peste 50 de ani dezvoltă o densitate și stabilitate excepționale. Veinele complexe și culorile bogate de miere și caramel fac din fiecare piesă o operă de artă unică. Duritatea sa naturală rezistă la zgârieturi și impacturi, făcându-l ideal pentru mobilierul de familie.</p>
      
      <h3>Pielea Italiană Full-Grain: Luxul Autentic</h3>
      <p>Pielea full-grain păstrează structura naturală completă a pielii animalului, oferind cea mai mare durabilitate și aspectul cel mai frumos. Procesul de tăbăcire tradițional italian, care durează 3-6 luni, creează o piele care se îmbunătățește cu timpul, dezvoltând o patină unică și elegantă.</p>
      
      <h3>Marmura Carrara: Eleganța Milenară</h3>
      <p>Extrasă din Alpii Apuani încă din perioada romană, marmura Carrara se caracterizează prin albeața purității și veinele fine gri-albastre. Structura sa cristalină compactă o face rezistentă la uzură, în timp ce luciul natural reflectă lumina în mod spectaculos.</p>
      
      <h3>Țesăturile Belgiene Hand-Woven</h3>
      <p>Artizanii belgieni perpetuează tradițiile textile seculare, creând țesături dense și durabile pe războaie de țesut manuale. Fibrele naturale - lână virginală, mătase și in - sunt țesute în modele complexe care pot rezista decenii întregi păstrându-și textura și culorile.</p>
      
      <h3>De Ce Materialele Premium Valorează Investiția</h3>
      <p>Un fotoliu din piele italiană full-grain pe structură de stejar masiv poate dura peste 20 de ani cu îngrijire minimă. Calculul economic: 200€/an pentru un fotoliu de 4000€ versus 150€/an pentru înlocuirea unui fotoliu de 600€ la fiecare 4 ani. Calitatea nu costă - ea se amortizează.</p>`,
      author: "Design Team Mobila Nomad",
      date: "8 Martie 2025",
      readTime: "7 min",
      category: "Materiale",
      likes: 134,
      views: 1890
    },
    {
      id: 5,
      title: "Bucătăria Modernă: Funcționalitate și Eleganță",
      content: `<h2>Designul Bucătăriei Moderne: Unde Arta Întâlnește Funcționalitatea</h2>
      <p>Bucătăria contemporană este laboratorul culinar al casei moderne, unde tehnologia de vârf se îmbină armonios cu design-ul elegant pentru a crea un spațiu atât funcțional, cât și spectaculos.</p>
      
      <h3>Blat-urile din Cuarț: Durabilitate și Eleganță</h3>
      <p>Cuarțul ingineresc combină 90% cuarț natural cu rășini pentru a crea suprafețe non-poroase, rezistente la pete și zgârieturi. Spre deosebire de granitul natural, cuarțul nu necesită sigilare anuală și oferă consistență cromatică perfectă pe suprafețe mari.</p>
      
      <h3>Corpurile cu Închidere Soft-Close: Lux în Detalii</h3>
      <p>Sistemele de glisare cu amortizare hidraulică elimină zgomotul și protejează corpurile de impact. Glisierele full-extension permit acces complet la conținut, în timp ce mecanismele push-to-open oferă o estetică minimalistă fără mânere vizibile.</p>
      
      <h3>Electrocasnicele Integrate: Estetica Seamless</h3>
      <p>Integrea completă a electrocasnicelor menține linii curate și continue. Frigiderele panel-ready primesc aceleași fețe ca și corpurile, în timp ce cuptoarele și mașinile de spălat vase se ascund complet în mobilier, creând un look unitar și sofisticat.</p>
      
      <h3>Sisteme de Organizare Inteligente</h3>
      <p>Coșurile pull-out maximizează utilizarea spațiului din colțuri, sertarele cu compartimentare variabilă se adaptează la diferite ustensile, iar sistemele de ridicare verticală pentru electronice mici păstrează blat-ul curat și organizat.</p>
      
      <h3>Triunghiul de Lucru Eficient</h3>
      <p>Distanța optimă între chiuvetă, aragaz și frigider trebuie să fie 1,2-2,7m pentru fiecare latură. Această configurație minimizează mișcarea în timpul gătitului și maximizează eficiența workflow-ului culinar, esențială pentru bucătăriile moderne active.</p>`,
      author: "Elena Ionescu",
      date: "5 Martie 2025",
      readTime: "9 min",
      category: "Bucătărie",
      likes: 167,
      views: 2340
    },
    {
      id: 6,
      title: "Iluminatul în Design Interior: Creează Atmosfera Perfectă",
      content: `<h2>Masterizarea Artei Iluminatului: Trei Straturi de Lumină Perfectă</h2>
      <p>Iluminatul este arhitectura invizibilă a spațiului - poate face o cameră să pară mai mare, mai intimă, mai dramatică sau mai relaxantă. Să explorăm cum să creezi scenic-uri de lumină memorabile.</p>
      
      <h3>Stratul 1: Lumina Ambientală - Baza Oricărui Spațiu</h3>
      <p>Lumina ambientală oferă iluminarea generală uniformă. Lustre statement cu cristale boeme reflectă și fracturează lumina creând jocuri spectaculoase pe pereți. Pentru tavane înalte, lustre cu lanțuri multiple adaugă drama verticală, în timp ce aplice indirecte lavă pereții în lumină moale.</p>
      
      <h3>Stratul 2: Task Lighting - Funcționalitatea Precisă</h3>
      <p>Zona de lectură necesită 400-500 lux pentru confort vizual optim. Lampade de podea reglabile cu brațe articulate permit poziționarea precisă a luminii. Pentru birou, monitor bar-urile eliminează reflexiile pe ecran, în timp ce lampade suspendate asimetrice adaugă caracter industrial chic.</p>
      
      <h3>Stratul 3: Accent Lighting - Drama și Caracter</h3>
      <p>Benzi LED ascunse în profile de gips conturează arhitectura spațiului. Spot-uri orientabile evidențiază operele de artă cu lumină caldă (2700K) pentru a sublinia textura și culorile. Wall grazing cu LED-uri lineare creează efecte dramatice pe suprafețe texturate.</p>
      
      <h3>Sistemele Smart: Controlul Total</h3>
      <p>Dimmer-ele inteligente permit crearea de scenic-uri pre-programate: "Dimineață energizantă" (6500K, 100%), "Seară romantică" (2200K, 30%), "Petrecere" (culori variabile). Senzorii de prezență și programarea automată optimizează consumul energetic.</p>
      
      <h3>Psihologia Culorilor în Iluminat</h3>
      <p>2700K creează intimitate și relaxare - perfect pentru dormitoare și living-uri seara. 4000K oferă energia necesară productivității - ideal pentru bucătării și birouri. 6500K stimulează alertnea matinală și concentrarea pentru studiu.</p>`,
      author: "Andrei Radu",
      date: "3 Martie 2025",
      readTime: "6 min",
      category: "Iluminat",
      likes: 198,
      views: 2890
    },
    {
      id: 7,
      title: "Spațiile Mici: Trucuri pentru Maximizarea Funcționalității",
      content: `<h2>Transformă Spațiile Mici în Oaze de Funcționalitate</h2>
      <p>În era apartamentelor urbane compacte, maximizarea spațiului nu înseamnă compromisuri de stil. Să descoperim cum mobilierul inteligent poate dubla capacitatea de stocare și confort.</p>
      
      <h3>Mobilierul Multifuncțional: Dubla Valoare</h3>
      <p>Canapelele extensibile cu lăzi integrate oferă loc de dormit pentru oaspeți și 400L spațiu de depozitare pentru lenjerie și pături. Mesele de cafea cu rafturi și sertare ascunse păstrează reviste, telecomenzi și laptop-uri la îndemână dar organizate.</p>
      
      <h3>Soluții Verticale: Gândește în Înălțime</h3>
      <p>Dulap-urile suspendate până la tavan utilizează fiecare centimetru vertical disponibil. Rafturile modulare asymmetrice creează dinamism vizual în timp ce oferă spațiu pentru cărți, decorațiuni și sisteme de stocare. Bibliotecile cu scară integrată transformă înălțimea în avantaj.</p>
      
      <h3>Mobilierul Pliabil: Flexibilitatea Maximă</h3>
      <p>Mesele de dining pliabile se retrag complet pe perete când nu sunt folosite. Scaunele stackable dispar în dulap, în timp ce birourile drop-down se transformă dintr-o simplă consolă într-un workspace complet echipat în 30 de secunde.</p>
      
      <h3>Separatori Transparenți: Definerea Spațiului fără Blocaj</h3>
      <p>Biblioteche open-back delimitează zonele menținând fluxul vizual. Panouri de sticlă securizată sau acrilic creează separare fără a bloca lumina naturală. Perdelele suspenddate de la tavan oferă privacitate variabilă și flexibilitate de reconfigurare.</p>
      
      <h3>Psihologia Spațiului: Oglinzi și Culori</h3>
      <p>O oglindă mare poziționată perpendicular pe fereastra principală dublează virtual spațiul și multiplică lumina naturală. Culorile deschise - alb pur, gri perla, beige-uri calde - reflectă lumina și amplifică senzația de spațiozitate. Accent-uri în cuori închise folosite punctual adaugă profunzime fără să comprime spațiul.</p>`,
      author: "Cristina Munteanu",
      date: "28 Februarie 2025",
      readTime: "7 min",
      category: "Design",
      likes: 221,
      views: 3150
    },
    {
      id: 8,
      title: "Mobilierul Handmade: Artă și Tradiție în Casa Ta",
      content: `<h2>Povestea din Spatele Fiecărei Piese Handmade</h2>
      <p>În era producției în masă, mobilierul handmade revenește ca un statement de autenticitate și calitate superioară. Fiecare piesă artizanală poartă amprenta unică a meșterului și povestea materialelor folosite.</p>
      
      <h3>Selecția Lemnului: Primul Pas către Perfecțiune</h3>
      <p>Meșterii examinează fiecare buștenă pentru densitatea fibrelor, umiditatea optimă și absența defectelor. Lemnul se usucă natural 2-3 ani pentru a elimina tensiunile interne. Doar 30% din material ajunge să fie utilizat - restul este dedicat altor proiecte sau reciclat responsabil.</p>
      
      <h3>Tehnicile Tradiționale de Îmbinare</h3>
      <p>Îmbinările cozii de rândunică rezistă seculelor fără cuie sau vișuruburi metalice. Mortise și tenon joints distribuie greutatea uniform pe structură. Dovetail joints la sertare asigură deschiderea perfectă după decenii de utilizare intensivă - semnul adevăratului craftsmanship.</p>
      
      <h3>Sculptarea Manuală: Arta în Detalii</h3>
      <p>Fiecare ornament este sculptat manual cu daltă și ciocan de precisie. Motifele tradiționale românești - rozete, împletituri, simboluri geometrice - sunt interpretate contemporan păstrând esența culturală. Un singur ornament complex poate necesita 8-12 ore de lucru meticulost.</p>
      
      <h3>Finisajele Naturale: Protecție și Frumusețe</h3>
      <p>Uleiul de tung pătrunde adânc în fibrele lemnului oferind protecție de durată fără a bloca respirația materialului. Ceara de carnauba aplicată în straturi fine creează un luciu cald și natural. Politura cu șellac tradițională oferă cea mai frumoasă adâncime cromatică pentru lemn.</p>
      
      <h3>De Ce Fiecare Piesă Este Unică</h3>
      <p>Variațiile naturale ale lemnului - veinele, nodurile, nuanțele - fac imposibilă reproducerea exactă. Urmele dalții meșterului, subtilele asimetrii care adaugă caracter și patina care se dezvoltă în timp creează o poveste unică pentru fiecare mobilă handmade.</p>`,
      author: "Master Craftsman Ioan",
      date: "25 Februarie 2025",
      readTime: "10 min",
      category: "Craftsmanship",
      likes: 312,
      views: 4200
    },
    // Add more blog posts here with full content
  ];

  const post = blogPosts.find(p => p.id === parseInt(id || "0"));

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Articol negăsit</h1>
            <Button onClick={handleGoBack}>Înapoi la Blog</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center space-x-4 mb-8">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="border-luxury-gold/50 text-luxury-dark hover:bg-luxury-gold/10 hover:border-luxury-gold/70"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Înapoi la Blog
            </Button>
          </div>
          
          <article className="bg-card rounded-xl p-8 shadow-lg">
            <div className="mb-6">
              <div className="flex items-center space-x-4 text-muted-foreground text-sm mb-4">
                <div className="bg-luxury-gradient text-luxury-dark px-3 py-1 rounded-full text-sm font-semibold">
                  {post.category}
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold font-playfair text-foreground mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-luxury-gold" />
                  <span className="text-muted-foreground">{post.author}</span>
                </div>
                
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">{post.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{post.likes}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-muted-foreground hover:text-luxury-gold"
                    onClick={() => {
                      toast({
                        title: "Articol partajat",
                        description: "Link-ul a fost copiat în clipboard.",
                      });
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div 
              className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Mulțumim!",
                        description: "Aprecierea ta a fost înregistrată.",
                      });
                    }}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Like ({post.likes})
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Articol partajat",
                        description: "Link-ul a fost copiat în clipboard.",
                      });
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Partajează
                  </Button>
                </div>
                
                <Button onClick={handleGoBack}>
                  Vezi Alte Articole
                </Button>
              </div>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;