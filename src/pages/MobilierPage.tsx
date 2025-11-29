import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShopifyProductGrid } from "@/components/ShopifyProductGrid";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobilierPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Mobilier de Lux - Colecție Premium pentru Casă"
        description="Descoperă colecția noastră de mobilier de înaltă calitate. Biblioteci modulare, mese extensibile, dulapuri elegante și fotolii de lux. Design premium pentru casa ta."
        canonical="https://mobilanomad.ro/mobilier"
        keywords="mobilier lux, mobilier premium, mobilier design, biblioteci modulare, mese extensibile, dulapuri elegante, mobilier living premium, mobilier de calitate"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Mobilier de Lux - Mobila Nomad",
          "description": "Colecție premium de mobilier pentru toate camerele",
          "url": "https://mobilanomad.ro/mobilier"
        }}
      />
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
              Mobilier de Lux
            </h1>
          </div>
          
          <div className="text-center mb-16">
            <p className="text-lg text-luxury-cream/90 max-w-3xl mx-auto font-inter leading-relaxed">
              Descoperă colecția noastră de mobilier de înaltă calitate. Fiecare piesă este selectată cu grijă pentru a oferi 
              calitatea și eleganța pe care le meriti în casa ta.
            </p>
          </div>
          
          <ShopifyProductGrid />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MobilierPage;