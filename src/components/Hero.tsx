import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

import heroCozyCpollection from "@/assets/hero-cozy-collection.jpg";

const Hero = () => {

  const handleWhatsAppContact = () => {
    const phoneNumber = "0758433114";
    const message = "Salut! Sunt interesat de mobilierul de calitate la prețuri accesibile.";
    const whatsappUrl = `https://wa.me/4${phoneNumber.substring(1)}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-hero-gradient min-h-[80vh] md:min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-navy/70 to-brand-dark/95"></div>
      
      {/* Liquid Glass Elements - optimized for mobile */}
      <div className="absolute top-10 left-5 w-64 h-64 md:top-20 md:left-10 md:w-96 md:h-96 bg-glass-gradient backdrop-blur-3xl rounded-full opacity-30 animate-liquid-flow"></div>
      <div className="absolute bottom-16 right-10 w-48 h-48 md:bottom-32 md:right-20 md:w-80 md:h-80 bg-liquid-gradient backdrop-blur-2xl rounded-full opacity-40 animate-glass-float"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-glass-gradient backdrop-blur-xl rounded-full opacity-20 animate-liquid-flow delay-1000"></div>
      
      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="text-brand-cream text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight mb-6 md:mb-8 font-playfair">
              Mii de piese de mobilier
              <span className="block bg-brand-gradient bg-clip-text text-transparent">
                cu livrare gratuită
              </span>
            </h1>
            <p className="text-lg md:text-xl text-brand-cream/90 mb-8 md:mb-10 leading-relaxed font-inter max-w-xl mx-auto lg:mx-0">
              Descoperă colecția noastră vastă de mobilier pentru toate camerele din casă. 
              Calitate superioară, prețuri accesibile și livrare gratuită.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleWhatsAppContact}
                className="border-2 border-green-500/50 bg-glass-gradient backdrop-blur-lg text-white hover:bg-green-500/20 hover:border-green-400/70 transition-all duration-300 px-6 md:px-8 py-3 md:py-4 h-12 md:h-14 text-base md:text-lg font-semibold shadow-xl w-full sm:w-auto"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contactează-ne pe WhatsApp
              </Button>
            </div>
          </div>
          
          
          <div className="relative mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-glass-gradient backdrop-blur-3xl rounded-2xl md:rounded-3xl opacity-40 animate-liquid-flow"></div>
            <div className="relative bg-glass-gradient backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8 border border-white/20 shadow-2xl group hover:shadow-brand-gold/20 transition-all duration-500">
              <div className="absolute inset-0 bg-liquid-gradient opacity-20 rounded-2xl md:rounded-3xl group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center h-48 md:h-64 lg:h-80 relative z-10">
                <img 
                  src={heroCozyCpollection} 
                  alt="Colecții de mobilier de calitate" 
                  className="w-full h-full object-cover rounded-xl md:rounded-2xl shadow-2xl"
                />
              </div>
              <div className="text-center mt-4 md:mt-6 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-brand-cream mb-2 font-playfair drop-shadow-lg">Colecții Speciale</h3>
                <p className="text-sm md:text-base text-brand-cream/80 font-inter drop-shadow">Disponibile pentru comandă</p>
              </div>
              
              {/* Glass reflection effect */}
              <div className="absolute top-2 left-2 md:top-4 md:left-4 w-8 h-8 md:w-16 md:h-16 bg-white/10 rounded-full blur-xl opacity-60"></div>
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-6 h-6 md:w-12 md:h-12 bg-brand-gold/20 rounded-full blur-lg opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-5 left-5 w-16 h-16 md:top-10 md:left-10 md:w-32 md:h-32 bg-brand-gold/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 md:bottom-20 md:right-20 md:w-40 md:h-40 bg-brand-burgundy/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 md:w-24 md:h-24 bg-brand-gold/30 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
    </section>
  );
};

export default Hero;