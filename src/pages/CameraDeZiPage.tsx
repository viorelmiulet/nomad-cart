import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShopifyProductGrid } from "@/components/ShopifyProductGrid";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sofa, Home, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import categoryLiving from "@/assets/category-living.jpg";

const CameraDeZiPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Camera de Zi - Canapele Colțare, Fotolii și Mobilier Living"
        description="Transformă-ți camera de zi într-un spațiu de lux cu mobilierul nostru de înaltă calitate. Canapele colțare confortabile, fotolii elegante și mese de cafea distinctive. Livrare gratuită."
        canonical="https://mobilanomad.ro/camera-de-zi"
        keywords="mobilier living, canapele colțare, fotolii, mese de cafea, mobilier camera de zi, canapea extensibilă, living modern, canapea colț, mobilier living room"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Camera de Zi - Mobila Nomad",
          "description": "Mobilier elegant pentru camera de zi: canapele colțare, fotolii și accesorii",
          "url": "https://mobilanomad.ro/camera-de-zi"
        }}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden" aria-labelledby="camera-zi-hero">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${categoryLiving})` }}
          role="img"
          aria-label="Mobilier camera de zi elegant - canapele colțare, fotolii și mese"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/60 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow" aria-hidden="true" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <header className="max-w-2xl">
            <h1 id="camera-zi-hero" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-brand-cream font-playfair">
              Camera de Zi
            </h1>
            <p className="text-lg md:text-xl text-brand-cream/90 mb-6 font-inter">
              Transformă-ți camera de zi într-un spațiu de lux cu mobilierul nostru de înaltă calitate. 
              Canapele confortabile, fotolii elegante și mese de cafea distinctive.
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
      <section className="py-12 bg-background" aria-labelledby="benefits-living-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-8">
            <h2 id="benefits-living-heading" className="text-2xl md:text-3xl font-bold mb-4 text-foreground font-playfair">
              De ce să alegi mobilierul nostru pentru camera de zi?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Confort superior și design elegant pentru spațiul tău de relaxare
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sofa className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Confort Maximum</h3>
              <p className="text-muted-foreground">
                Canapele și fotolii ergonomice pentru relaxarea perfectă după o zi lungă.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Design Modern</h3>
              <p className="text-muted-foreground">
                Stiluri contemporane care se adaptează perfect la orice decor modern.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calitate Superioară</h3>
              <p className="text-muted-foreground">
                Materiale de înaltă calitate și finisaje durabile pentru o investiție pe termen lung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12" aria-labelledby="products-living-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-8">
            <h2 id="products-living-heading" className="text-2xl md:text-3xl font-bold mb-4 text-foreground font-playfair">
              Mobilier pentru Camera de Zi
            </h2>
            <p className="text-muted-foreground">
              Descoperă colecția noastră de produse pentru camera ta de zi
            </p>
          </header>
          
          <ShopifyProductGrid />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CameraDeZiPage;