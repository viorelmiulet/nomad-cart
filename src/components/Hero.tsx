import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useParallaxMulti } from "@/hooks/useParallax";
import { useCart } from "@/contexts/CartContext";

import heroCozyCpollection from "@/assets/hero-cozy-collection.jpg";

const Hero = () => {
  const [offset1, offset2, offset3] = useParallaxMulti([0.2, 0.4, 0.6]);
  const { items, getTotalPrice } = useCart();

  const handleWhatsAppContact = () => {
    const phoneNumber = "0758433114";
    
    let message = "Salut! ";
    
    if (items.length > 0) {
      message += "Doresc să comand următoarele produse:\n\n";
      
      items.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Cantitate: ${item.quantity} buc\n`;
        message += `   Preț: ${item.price.toLocaleString('ro-RO')} Lei\n`;
        message += `   Subtotal: ${(item.price * item.quantity).toLocaleString('ro-RO')} Lei\n\n`;
      });
      
      message += `*TOTAL COMANDĂ: ${getTotalPrice().toLocaleString('ro-RO')} Lei*\n\n`;
      message += "Aștept confirmarea comenzii. Mulțumesc!";
    } else {
      message += "Sunt interesat de mobilierul de calitate la prețuri accesibile.";
    }
    
    const whatsappUrl = `https://wa.me/4${phoneNumber.substring(1)}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-hero-gradient min-h-[80vh] md:min-h-[90vh] flex items-center" aria-label="Prezentare principală">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-navy/70 to-brand-dark/95" aria-hidden="true"></div>
      
      {/* Liquid Glass Elements - optimized for mobile with parallax */}
      <div 
        className="absolute top-10 left-5 w-64 h-64 md:top-20 md:left-10 md:w-96 md:h-96 bg-glass-gradient backdrop-blur-3xl rounded-full opacity-30 animate-liquid-flow"
        style={{ transform: `translateY(${offset1}px)` }}
      ></div>
      <div 
        className="absolute bottom-16 right-10 w-48 h-48 md:bottom-32 md:right-20 md:w-80 md:h-80 bg-liquid-gradient backdrop-blur-2xl rounded-full opacity-40 animate-glass-float"
        style={{ transform: `translateY(${-offset2}px)` }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-glass-gradient backdrop-blur-xl rounded-full opacity-20 animate-liquid-flow delay-1000"
        style={{ transform: `translateY(${offset3}px)` }}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-20 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          <div 
            className="text-luxury-dark text-center lg:text-left"
            style={{ transform: `translateY(${offset1 * 0.3}px)` }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6 md:mb-8 font-playfair text-luxury-dark">
              Mii de piese de mobilier
              <span className="block bg-brand-gradient bg-clip-text text-transparent">
                cu livrare gratuită
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-luxury-dark/80 mb-6 sm:mb-8 md:mb-10 leading-relaxed font-inter max-w-xl mx-auto lg:mx-0">
              Descoperă colecția noastră vastă de mobilier pentru toate camerele din casă. 
              Calitate superioară, prețuri accesibile și livrare gratuită.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center lg:justify-start">
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleWhatsAppContact}
                className="border-2 border-green-500/50 bg-glass-gradient backdrop-blur-lg text-white hover:bg-green-500/20 hover:border-green-400/70 transition-all duration-300 px-5 sm:px-6 md:px-8 py-3 md:py-4 h-12 sm:h-13 md:h-14 text-sm sm:text-base md:text-lg font-semibold shadow-xl w-full sm:w-auto min-h-[44px] touch-manipulation"
              >
                <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Contactează-ne pe WhatsApp
              </Button>
            </div>
          </div>
          
          
          <div 
            className="relative mt-6 sm:mt-8 lg:mt-0"
            style={{ transform: `translateY(${-offset2 * 0.3}px)` }}
          >
            <div className="absolute inset-0 bg-glass-gradient backdrop-blur-3xl rounded-xl sm:rounded-2xl md:rounded-3xl opacity-40 animate-liquid-flow"></div>
            <div className="relative bg-glass-gradient backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-8 lg:p-10 border border-white/20 shadow-2xl group hover:shadow-brand-gold/20 transition-all duration-500">
              <div className="absolute inset-0 bg-liquid-gradient opacity-20 rounded-xl sm:rounded-2xl md:rounded-3xl group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center h-40 sm:h-48 md:h-64 lg:h-80 xl:h-96 relative z-10">
                <img 
                  src={heroCozyCpollection} 
                  alt="Colecții speciale de mobilier Mobila Nomad - canapele confortabile, paturi elegante și mese moderne pentru casa ta" 
                  className="w-full h-full object-cover rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl"
                  loading="eager"
                />
              </div>
              <div className="text-center mt-3 sm:mt-4 md:mt-6 relative z-10">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-brand-cream mb-1 sm:mb-2 font-playfair drop-shadow-lg">Colecții Speciale</h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-brand-cream/80 font-inter drop-shadow">Disponibile pentru comandă</p>
              </div>
              
              {/* Glass reflection effect */}
              <div className="absolute top-2 left-2 md:top-4 md:left-4 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-white/10 rounded-full blur-xl opacity-60"></div>
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 w-4 h-4 sm:w-6 sm:h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-brand-gold/20 rounded-full blur-lg opacity-40"></div>
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