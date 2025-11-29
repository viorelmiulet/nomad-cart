import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShopifyProductGrid } from "@/components/ShopifyProductGrid";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import heroImage from "@/assets/hero-dormitor-new.jpg";
import { useNavigate } from "react-router-dom";

const DormitorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Mobilier Dormitor - Paturi, Dulapuri și Comode"
        description="Creează-ți dormitorul perfect cu mobilierul nostru de înaltă calitate. Paturi confortabile, dulapuri spațioase și saltele premium pentru un somn odihnitor. Livrare gratuită."
        canonical="https://mobilanomad.ro/dormitor"
        keywords="mobilier dormitor, paturi, dulapuri dormitor, comode, noptiere, dormitor complet, pat dublu, pat tapițat, mobilier dormitor modern"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Dormitor - Mobila Nomad",
          "description": "Mobilier de calitate pentru dormitorul tău: paturi, dulapuri, comode și noptiere",
          "url": "https://mobilanomad.ro/dormitor"
        }}
      />
      <Header />
      
      <main className="py-20 bg-hero-gradient relative overflow-hidden" aria-labelledby="dormitor-heading">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Mobilier dormitor de calitate - paturi, dulapuri și comode"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark/40 via-luxury-navy/30 to-luxury-dark/40" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-20 animate-liquid-flow" aria-hidden="true"></div>
        
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
            
            <h1 id="dormitor-heading" className="text-3xl lg:text-4xl font-bold font-playfair text-luxury-cream">
              Dormitor
            </h1>
          </header>
          
          <div className="text-center mb-16">
            <p className="text-lg text-luxury-cream/90 max-w-3xl mx-auto font-inter leading-relaxed">
              Creează-ți dormitorul perfect cu mobilierul nostru de înaltă calitate. Paturi confortabile, 
              dulapuri spațioase și saltele de înaltă calitate pentru un somn odihnitor.
            </p>
          </div>
          
          <ShopifyProductGrid />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DormitorPage;