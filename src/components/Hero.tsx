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
    <section className="relative overflow-hidden bg-hero-gradient min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-navy/70 to-brand-dark/95"></div>
      
      {/* Liquid Glass Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-glass-gradient backdrop-blur-3xl rounded-full opacity-30 animate-liquid-flow"></div>
      <div className="absolute bottom-32 right-20 w-80 h-80 bg-liquid-gradient backdrop-blur-2xl rounded-full opacity-40 animate-glass-float"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-glass-gradient backdrop-blur-xl rounded-full opacity-20 animate-liquid-flow delay-1000"></div>
      
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-brand-cream">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-8 font-playfair">
              Mii de piese de mobilier
              <span className="block bg-brand-gradient bg-clip-text text-transparent">
                cu livrare gratuită
              </span>
            </h1>
            <p className="text-xl text-brand-cream/90 mb-10 leading-relaxed font-inter max-w-xl">
              Descoperă colecția noastră vastă de mobilier pentru toate camerele din casă. 
              Calitate superioară, prețuri accesibile și livrare gratuită.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleWhatsAppContact}
                className="border-2 border-green-500/50 bg-glass-gradient backdrop-blur-lg text-white hover:bg-green-500/20 hover:border-green-400/70 transition-all duration-300 px-8 py-4 h-14 text-lg font-semibold shadow-xl"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contactează-ne pe WhatsApp
              </Button>
            </div>
          </div>
          
          
          <div className="relative">
            <div className="absolute inset-0 bg-glass-gradient backdrop-blur-3xl rounded-3xl opacity-40 animate-liquid-flow"></div>
            <div className="relative bg-glass-gradient backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl group hover:shadow-brand-gold/20 transition-all duration-500">
              <div className="absolute inset-0 bg-liquid-gradient opacity-20 rounded-3xl group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center h-64 lg:h-80 relative z-10">
                <img 
                  src={heroCozyCpollection} 
                  alt="Colecții de mobilier de calitate" 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
              <div className="text-center mt-6 relative z-10">
                <h3 className="text-2xl font-bold text-brand-cream mb-2 font-playfair drop-shadow-lg">Colecții Speciale</h3>
                <p className="text-brand-cream/80 font-inter drop-shadow">Disponibile în showroom-ul nostru</p>
              </div>
              
              {/* Glass reflection effect */}
              <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl opacity-60"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 bg-brand-gold/20 rounded-full blur-lg opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-brand-burgundy/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-brand-gold/30 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
    </section>
  );
};

export default Hero;