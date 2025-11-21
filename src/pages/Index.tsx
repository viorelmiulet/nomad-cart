import Header from "@/components/Header";
import PromoBanner from "@/components/PromoBanner";
import Hero from "@/components/Hero";
import PopularProducts from "@/components/PopularProducts";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  const handleViewAllProducts = () => {
    navigate("/toate-produsele");
  };

  return (
    <main className="min-h-screen bg-background">
      <SEO 
        title="Mobilier de Calitate cu Livrare Gratuită"
        description="⭐ Magazin online de mobilier: canapele, paturi, mese, scaune pentru toate camerele. ✓ Livrare gratuită ✓ Prețuri accesibile ✓ Garanție extinsă. Comenzi WhatsApp: 0758433114"
        canonical="https://mobilanomad.ro/"
        keywords="mobilier online, canapele colt, paturi, mese bucătărie, scaune, dormitor complet, camera de zi, mobilier living, bucătării moderne, magazine mobilier România, mobilier ieftin, livrare gratuită mobilier"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FurnitureStore",
          "name": "Mobila Nomad",
          "description": "Magazin online de mobilier de calitate cu livrare gratuită în România",
          "url": "https://mobilanomad.ro/",
          "telephone": "+40758433114",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "RO"
          }
        }}
      />
      <Header onSearchOpenChange={setShowPromoBanner} />
      {showPromoBanner && <PromoBanner />}
      <Hero />
      <section className="py-12 md:py-24 lg:py-32 bg-hero-gradient relative overflow-hidden" aria-labelledby="popular-products-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-navy/70 to-brand-dark/95" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow" aria-hidden="true"></div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <header className="text-center mb-12 md:mb-20">
            <h2 id="popular-products-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8 font-playfair text-brand-cream">
              Produse Populare
            </h2>
            <p className="text-base md:text-xl text-brand-cream/90 max-w-2xl mx-auto font-inter leading-relaxed">
              Cele mai apreciate piese de mobilier de către clienții noștri
            </p>
          </header>
          <PopularProducts />
          <div className="text-center mt-12 md:mt-20">
            <Button 
              onClick={handleViewAllProducts}
              className="bg-brand-gradient text-brand-dark px-8 md:px-12 py-3 md:py-4 h-12 md:h-16 text-base md:text-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              aria-label="Vezi toate produsele din magazin"
            >
              Vezi Toate Produsele
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Index;
