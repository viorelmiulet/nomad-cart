import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShopifyProductGrid } from "@/components/ShopifyProductGrid";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllProductsPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Toate Produsele - Catalog Complet de Mobilier"
        description="Descoperă catalogul nostru complet de mobilier pentru toate camerele: dormitoare, camere de zi, bucătării și mobilier divers. Peste 500 de produse cu livrare gratuită în România."
        canonical="https://mobilanomad.ro/toate-produsele"
        keywords="catalog mobilier, toate produsele mobilier, magazine mobilier online, mobilier dormitor, mobilier living, mobilier bucătărie, mobilier complet casă"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Toate Produsele - Mobila Nomad",
          "description": "Catalog complet de mobilier pentru casa ta",
          "url": "https://mobilanomad.ro/toate-produsele"
        }}
      />
      <Header />
      
      <main className="py-20 bg-hero-gradient relative overflow-hidden" aria-labelledby="all-products-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark/90 via-luxury-navy/70 to-luxury-dark/95" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow" aria-hidden="true"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <header className="flex items-center space-x-4 mb-16">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10 hover:border-luxury-gold/70"
              aria-label="Înapoi la pagina principală"
            >
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              Înapoi la Home
            </Button>
            
            <h1 id="all-products-heading" className="text-3xl lg:text-4xl font-bold font-playfair text-luxury-cream">
              Toate Produsele
            </h1>
          </header>
          
          <ShopifyProductGrid />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllProductsPage;