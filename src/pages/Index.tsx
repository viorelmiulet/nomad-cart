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
      <section className="py-20 bg-hero-gradient relative overflow-hidden" aria-labelledby="popular-products-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-navy/70 to-brand-dark/95" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow" aria-hidden="true"></div>
        <div className="container mx-auto px-4 relative z-10">
          <header className="text-center mb-16">
            <h2 id="popular-products-heading" className="text-3xl lg:text-4xl font-bold mb-6 font-playfair text-brand-cream">
              Produse Populare
            </h2>
            <p className="text-lg text-brand-cream/90 max-w-2xl mx-auto font-inter leading-relaxed">
              Cele mai apreciate piese de mobilier de către clienții noștri
            </p>
          </header>
          <PopularProducts />
          <div className="text-center mt-16">
            <Button 
              onClick={handleViewAllProducts}
              className="bg-brand-gradient text-brand-dark px-8 py-3 h-12 text-base font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
