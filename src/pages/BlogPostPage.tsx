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
      author: "Design Team FurniLux",
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