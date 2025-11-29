import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShopifyProductGrid } from "@/components/ShopifyProductGrid";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChefHat, Utensils, CookingPot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import categoryKitchen from "@/assets/category-kitchen.jpg";

const BucatariePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Bucătării Complete și Mobilier pentru Bucătărie"
        description="Descoperă colecția noastră de bucătării moderne și funcționale. Corpuri individuale, accesorii și electrocasnice pentru bucătăria ta de vis. Livrare gratuită în România."
        canonical="https://mobilanomad.ro/bucatarie"
        keywords="bucătării complete, mobilier bucătărie, corpuri bucătărie, blat bucătărie, bucătărie modernă, bucătărie la comandă, bucătărie ieftină"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Bucătării - Mobila Nomad",
          "description": "Mobilier și electrocasnice pentru bucătăria ta de vis. Design funcțional și calitate superioară.",
          "url": "https://mobilanomad.ro/bucatarie"
        }}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden" aria-labelledby="bucatarie-hero">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${categoryKitchen})` }}
          role="img"
          aria-label="Mobilier bucătărie modernă și funcțională cu electrocasnice"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/60 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow" aria-hidden="true" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <header className="max-w-2xl">
            <h1 id="bucatarie-hero" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-brand-cream font-playfair">
              Bucătării
            </h1>
            <p className="text-lg md:text-xl text-brand-cream/90 mb-6 font-inter">
              Mobilier și electrocasnice pentru bucătăria ta de vis. Design funcțional și calitate superioară.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                aria-label="Înapoi la pagina principală"
              >
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                Înapoi
              </Button>
            </div>
          </header>
        </div>
      </section>


      {/* Benefits Section */}
      <section className="py-12 bg-background" aria-labelledby="benefits-kitchen-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-8">
            <h2 id="benefits-kitchen-heading" className="text-2xl md:text-3xl font-bold mb-4 text-foreground font-playfair">
              De ce să alegi bucătăriile noastre?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calitate superioară și design funcțional pentru bucătăria perfectă
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Design Funcțional</h3>
              <p className="text-muted-foreground">
                Spații optimizate și soluții inteligente pentru toate nevoile tale culinare.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CookingPot className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calitate Superioară</h3>
              <p className="text-muted-foreground">
                Materiale rezistente și finisaje de calitate pentru o durabilitate maximă.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalizare</h3>
              <p className="text-muted-foreground">
                Soluții la comandă adaptate perfect spațiului și stilului tău.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12" aria-labelledby="products-kitchen-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-8">
            <h2 id="products-kitchen-heading" className="text-2xl md:text-3xl font-bold mb-4 text-foreground font-playfair">
              Mobilier pentru Bucătării
            </h2>
            <p className="text-muted-foreground">
              Descoperă colecția noastră de produse pentru bucătăria ta
            </p>
          </header>
          
          <ShopifyProductGrid />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BucatariePage;