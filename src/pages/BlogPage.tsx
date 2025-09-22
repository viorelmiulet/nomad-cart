import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Eye, Heart, Share2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const BlogPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const handlePostClick = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  const blogPosts = [
    {
      id: 1,
      title: "10 Tendințe în Design Interior pentru 2025",
      excerpt: "De la culorile calde și naturale la texturile organice, descoperă cum să îți transformi casa cu cele mai noi tendințe: mobilier durabil din lemn masiv, accesorii handmade, spații multifuncționale și iluminat LED personalizabil. Află cum să creezi un echilibru perfect între confort modern și eleganță tradițională.",
      author: "Design Team FurniLux",
      date: "15 Martie 2025",
      readTime: "5 min",
      image: "/api/placeholder/600/400",
      category: "Design",
      likes: 245,
      views: 3420
    },
    {
      id: 2,
      title: "Cum să Alegi Mobilierul Perfect pentru Camera de Zi",
      excerpt: "Ghid pas cu pas pentru selectarea mobilierului de living: de la măsurarea corectă a spațiului și alegerea canapelei ideale, la combinarea meselor de cafea cu fotoliile și crearea unei zone de conversație perfecte. Includiu sfaturi despre culori, materiale și proporții pentru un living de vis.",
      author: "Alexandra Popescu",
      date: "12 Martie 2025",
      readTime: "8 min",
      image: "/api/placeholder/600/400",
      category: "Mobilier",
      likes: 189,
      views: 2840
    },
    {
      id: 3,
      title: "Dormitorul de Lux: Secretele unui Somn Odihnitor",
      excerpt: "Creează sanctuarul perfect pentru odihnă cu paturile noastre din lemn masiv, saltelele premium din spumă cu memorie și lenjeria din bumbac egyptian. Descoperă importanța culorilor calmante, a iluminatului indirect și a mobilierului ergonomic pentru cel mai bun somn din viața ta.",
      author: "Mihai Georgescu",
      date: "10 Martie 2025",
      readTime: "6 min", 
      image: "/api/placeholder/600/400",
      category: "Dormitor",
      likes: 156,
      views: 2100
    },
    {
      id: 4,
      title: "Materialele Premium: Calitate și Durabilitate",
      excerpt: "Explorează lumea materialelor de lux: lemnul de stejar american vârsta de 50+ ani, pielea italiană full-grain, marmura Carrara și țesăturile belgiene hand-woven. Afli cum să identifici calitatea adevărată și de ce investiția în materiale premium se reflectă în durata de viață de peste 20 de ani.",
      author: "Design Team FurniLux",
      date: "8 Martie 2025",
      readTime: "7 min",
      image: "/api/placeholder/600/400", 
      category: "Materiale",
      likes: 134,
      views: 1890
    },
    {
      id: 5,
      title: "Bucătăria Modernă: Funcționalitate și Eleganță",
      excerpt: "Designul bucătăriei moderne combină ergonomia cu estetica: blat-uri din cuarț, corpuri cu închidere soft-close, electrocasnice integrate și sisteme de organizare inteligente. Descoperă cum să maximizezi spațiul de depozitare și să creezi un triunghi de lucru eficient pentru gătitul zilnic.",
      author: "Elena Ionescu",
      date: "5 Martie 2025",
      readTime: "9 min",
      image: "/api/placeholder/600/400",
      category: "Bucătărie", 
      likes: 167,
      views: 2340
    },
    {
      id: 6,
      title: "Iluminatul în Design Interior: Creează Atmosfera Perfectă",
      excerpt: "Masterizează arta iluminatului cu combinații de lumină ambientală, task și accent. De la lustre statement și aplice decorative la benzi LED ascunse și lampade de podea reglabile - află cum să creezi scenic-uri diferite pentru fiecare moment al zilei cu sisteme smart controlabile prin telefon.",
      author: "Andrei Radu",
      date: "3 Martie 2025",
      readTime: "6 min",
      image: "/api/placeholder/600/400",
      category: "Iluminat",
      likes: 198,
      views: 2890
    },
    {
      id: 7,
      title: "Spațiile Mici: Trucuri pentru Maximizarea Funcționalității",
      excerpt: "Transformă apartamentele mici în locuințe spațioase cu mobilier multifuncțional: canapele extensibile cu lăzi de depozitare, mese pliabile, dulap-uri suspendate și separatori transparenți. Descoperă cum oglinzile strategice și culorile deschise pot dubla senzația de spațiu.",
      author: "Cristina Munteanu",
      date: "28 Februarie 2025",
      readTime: "7 min",
      image: "/api/placeholder/600/400",
      category: "Design",
      likes: 221,
      views: 3150
    },
    {
      id: 8,
      title: "Mobilierul Handmade: Artă și Tradiție în Casa Ta",
      excerpt: "Povestea din spatele fiecărei piese handmade: de la meșterul care sculptează cu mâna fiecare detaliu la lemnul selectat special pentru venitura și rezistența sa. Afla despre tehnicile tradiționale de îmbinare, finisajele naturale și de ce fiecare piesă handmade este unică și de neuitat.",
      author: "Master Craftsman Ioan",
      date: "25 Februarie 2025",
      readTime: "10 min",
      image: "/api/placeholder/600/400",
      category: "Craftsmanship",
      likes: 312,
      views: 4200
    },
    {
      id: 9,
      title: "Feng Shui și Mobilierul: Energia Pozitivă în Casa Ta",
      excerpt: "Aplică principiile Feng Shui în amenajarea cu mobilier: poziționarea patului pentru somn liniștit, biroul orientat spre vest pentru productivitate, plantele în zona de est pentru sănătate și cristalele în colțul bogăției. Crează un flux energetic armonios în fiecare cameră.",
      author: "Dr. Li Wei Chen",
      date: "22 Februarie 2025",
      readTime: "8 min",
      image: "/api/placeholder/600/400",
      category: "Lifestyle",
      likes: 187,
      views: 2650
    },
    {
      id: 10,
      title: "Investiția în Mobilier de Calitate: Ghid Financiar",
      excerpt: "Analiza cost-beneficiu: cum mobilierul premium se amortizează în timp prin durabilitate, menținerea valorii și satisfacția zilnică. Compară costul pe an de utilizare dintre mobilierul de calitate și alternativele ieftine, plus sfaturi despre perioade promoționale și finanțare.",
      author: "Economic Analyst Maria Pop",
      date: "20 Februarie 2025",
      readTime: "6 min",
      image: "/api/placeholder/600/400",
      category: "Investiție",
      likes: 156,
      views: 2240
    },
    {
      id: 11,
      title: "Tendințe Color în Mobilier: Paleete 2024",
      excerpt: "Explorează paletele cromatice ale anului: earth tones cu accente de emerald green, warm neutrals cu touches de terracotta și classic navy combinat cu soft beige. Vezi cum să integrezi aceste culori în mobilierul existent și ce accesorii să alegi pentru refresh-ul perfect.",
      author: "Color Expert Diana Vlad",
      date: "18 Februarie 2025",
      readTime: "5 min",
      image: "/api/placeholder/600/400",
      category: "Design",
      likes: 203,
      views: 2980
    },
    {
      id: 12,
      title: "Mobilierul pentru Copii: Siguranță și Creativitate",
      excerpt: "Ghid complet pentru mobilierul copiilor: de la paturile cu bariere de siguranță și colțuri rotunjite la sistemele modulare care cresc odată cu copilul. Materiale non-toxice, vopsele pe bază de apă și design-uri care stimulează creativitatea și independența celor mici.",
      author: "Pediatru Designer Ana Stoica",
      date: "15 Februarie 2025",
      readTime: "9 min",
      image: "/api/placeholder/600/400",
      category: "Familie",
      likes: 278,
      views: 3890
    },
    {
      id: 13,
      title: "Mobilierul din Lemn Masiv: Alegerea Românilor în 2025",
      excerpt: "Lemnul masiv continuă să domine preferințele românilor în 2025, îmbinând tradiția cu inovația. De la stejar maramureșean la fag carpatic, descoperă de ce mobilierul din lemn solid este investiția perfectă: durabilitate de generații, frumusețe naturală și sustenabilitate. Explorează beneficiile producției locale și impactul asupra economiei românești.",
      author: "Maestru Dulgher Ioan Creț",
      date: "18 Ianuarie 2025",
      readTime: "8 min",
      image: "/api/placeholder/600/400",
      category: "Sustenabilitate",
      likes: 342,
      views: 4850
    },
    {
      id: 14,
      title: "8 Tendințe în Mobilierul din Lemn pentru 2025",
      excerpt: "Anul 2025 aduce noi perspective asupra mobilierului din lemn: finisaje naturale mate, combinații de esențe, mobilier multifuncțional și design bioflic. Descoperă cum granulele naturale și tonurile calde ale lemnului creează conexiuni autentice cu natura în casa ta. De la live-edge la mobilier modular sustenabil.",
      author: "Design Expert Maria Georgescu",
      date: "12 Ianuarie 2025", 
      readTime: "7 min",
      image: "/api/placeholder/600/400",
      category: "Tendințe 2025",
      likes: 298,
      views: 4120
    },
    {
      id: 15,
      title: "Sustenabilitatea în Design Interior: Viitorul Mobilierului",
      excerpt: "Designul sustenabil nu mai este o tendință, ci o necesitate. Mobilierul eco-friendly din materiale reciclate, lemnul certificat FSC, finisajele naturale și producția locală redefinesc industria. Afla cum să creezi spații responsabile fără compromisuri de stil și de ce investiția în mobilier durabil protejează planeta și portofelul.",
      author: "Eco-Designer Carmen Popescu",
      date: "8 Ianuarie 2025",
      readTime: "9 min",
      image: "/api/placeholder/600/400",
      category: "Eco-Design",
      likes: 421,
      views: 5230
    },
    {
      id: 16,
      title: "Confort, Versatilitate și Durabilitate: Tendințele Mobilierului 2025",
      excerpt: "Revoluglia mobilierului 2025 se concentrează pe trei piloni: confortul maxim prin materiale premium, versatilitatea spațiilor multifuncționale și durabilitatea ca investiție pe termen lung. De la fotoliile ergonomice cu memorie foam la mesele extensibile pentru familiile moderne - mobilierul se adaptează stilului de viață dinamic.",
      author: "Furniture Trends Analyst Alex Radu",
      date: "5 Ianuarie 2025",
      readTime: "10 min",
      image: "/api/placeholder/600/400",
      category: "Tendințe 2025",
      likes: 356,
      views: 4680
    },
    {
      id: 17,
      title: "Mobilier Meștesugit Românesc: Artă și Tradiție Bucovinană",
      excerpt: "În inima Bucovinei, meșterii păstrează tradițiile seculare ale prelucrării lemnului masiv. Fiecare piesă poartă amprenta uniquă a artizanului - de la sculpturile tradiționale moldovenești la tehnicile de îmbinare fără cuie. Descoperă povestea mobilierului meștesugit care transformă lemnul în artă vie, dedicat celor care prețuiesc autenticitatea.",
      author: "Maestru Artisan Vasile Munteanu",
      date: "2 Ianuarie 2025",
      readTime: "12 min",
      image: "/api/placeholder/600/400",
      category: "Tradiție",
      likes: 467,
      views: 5890
    },
    {
      id: 18,
      title: "Culori și Texturi 2025: Paleta Mobilierului Modern",
      excerpt: "Anul 2025 introduce paleta 'Warm Minimalism': nuanțe de latte și caramel, verdeturi profunde de pădure și albastre ocean. Explorează cum aceste culori naturale se îmbină cu texturile organice - ratanul împletit manual, lemnul cu venele aparente și țesăturile din fibre naturale pentru un decor care respiră liniște și eleganță contemporană.",
      author: "Color Specialist Diana Mihalache",
      date: "28 Decembrie 2024",
      readTime: "6 min",
      image: "/api/placeholder/600/400",
      category: "Design",
      likes: 298,
      views: 3940
    },
    {
      id: 19,
      title: "Investiția Inteligentă: De Ce Mobilierul de Calitate Se Plătește Singur",
      excerpt: "Analiza economică demonstrează că mobilierul premium se amortizează în 5-7 ani față de alternativele ieftine care necesită înlocuire la 2-3 ani. Cost per zi de utilizare, menținerea valorii la revânzare, impactul asupra sănătății și satisfacția zilnică fac din mobilierul de calitate cea mai inteligentă investiție pentru casa ta.",
      author: "Financial Advisor Bogdan Stoica",
      date: "25 Decembrie 2024",
      readTime: "8 min",
      image: "/api/placeholder/600/400",
      category: "Investiție",
      likes: 234,
      views: 3250
    },
    {
      id: 20,
      title: "Design Biofil și Conectivitatea cu Natura în Casă",
      excerpt: "Designul biofil revolutionează spațiile interioare prin integrarea elementelor naturale: mobilier din lemn cu ecorcea păstrată, ghivece integrate în rafturi, ferestre panoramice și materiale organice. Studiile demonstrează că aceste elemente reduc stresul cu 15% și îmbunătățesc productivitatea. Creează sanctuarul tău natural urban.",
      author: "Biophilic Designer Laura Nițu",
      date: "22 Decembrie 2024",
      readTime: "7 min",
      image: "/api/placeholder/600/400",
      category: "Wellness",
      likes: 389,
      views: 4720
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark/90 via-luxury-navy/70 to-luxury-dark/95"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center space-x-4 mb-16">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10 hover:border-luxury-gold/70"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Înapoi la Home
            </Button>
            
            <h1 className="text-3xl lg:text-4xl font-bold font-playfair text-luxury-cream">
              Blog FurniLux
            </h1>
          </div>
          
          <div className="text-center mb-16">
            <p className="text-lg text-luxury-cream/90 max-w-3xl mx-auto font-inter leading-relaxed">
              Inspirație, sfaturi și tendințe în design interior. Descoperă cum să îți transformi 
              casa într-un spațiu de vis cu ajutorul experților noștri.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card 
                key={post.id}
                className="bg-glass-gradient backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-luxury-gold/20 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group"
                onClick={() => handlePostClick(post.id)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="w-full h-48 bg-gradient-to-br from-luxury-gold/20 to-luxury-burgundy/20 flex items-center justify-center">
                    <div className="text-6xl text-luxury-gold/30">📝</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-luxury-gradient text-luxury-dark px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 text-luxury-cream/60 text-sm mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-luxury-cream mb-3 font-playfair group-hover:text-luxury-gold transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-luxury-cream/80 font-inter mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-luxury-gold" />
                      <span className="text-luxury-cream/80 text-sm">{post.author}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-luxury-cream/60">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">{post.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-luxury-cream/60 hover:text-luxury-gold"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast({
                          title: "Articol partajat",
                          description: "Link-ul a fost copiat în clipboard.",
                        });
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;