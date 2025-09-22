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
      title: "10 Tendințe în Design Interior pentru 2024",
      excerpt: "De la culorile calde și naturale la texturile organice, descoperă cum să îți transformi casa cu cele mai noi tendințe: mobilier durabil din lemn masiv, accesorii handmade, spații multifuncționale și iluminat LED personalizabil. Află cum să creezi un echilibru perfect între confort modern și eleganță tradițională.",
      author: "Design Team FurniLux",
      date: "15 Martie 2024",
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
      date: "12 Martie 2024", 
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
      date: "10 Martie 2024",
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
      date: "8 Martie 2024",
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
      date: "5 Martie 2024",
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
      date: "3 Martie 2024",
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
      date: "28 Februarie 2024",
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
      date: "25 Februarie 2024",
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
      date: "22 Februarie 2024",
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
      date: "20 Februarie 2024",
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
      date: "18 Februarie 2024",
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
      date: "15 Februarie 2024",
      readTime: "9 min",
      image: "/api/placeholder/600/400",
      category: "Familie",
      likes: 278,
      views: 3890
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
          
          <div className="text-center mt-16">
            <Button
              onClick={() => {
                toast({
                  title: "Mai multe articole",
                  description: "Noi articole vor fi adăugate în curând!",
                });
              }}
              className="bg-luxury-gradient text-luxury-dark px-8 py-3 h-12 text-base font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Vezi Mai Multe Articole
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;