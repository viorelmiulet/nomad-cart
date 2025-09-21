import { Button } from "@/components/ui/button";
import { ArrowRight, Armchair } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Hero = () => {
  const handleExploreCollection = () => {
    toast({
      title: "Explorare Colecție",
      description: "Vei fi redirecționat către pagina cu produse premium.",
    });
    // Scroll to products section
    const productsSection = document.querySelector('#products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScheduleConsultation = () => {
    toast({
      title: "Programare Consultanță",
      description: "Un consultant de design te va contacta în cel mai scurt timp.",
    });
  };

  return (
    <section className="relative overflow-hidden bg-hero-gradient min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark/90 via-luxury-navy/70 to-luxury-dark/95"></div>
      
      {/* Liquid Glass Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-glass-gradient backdrop-blur-3xl rounded-full opacity-30 animate-liquid-flow"></div>
      <div className="absolute bottom-32 right-20 w-80 h-80 bg-liquid-gradient backdrop-blur-2xl rounded-full opacity-40 animate-glass-float"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-glass-gradient backdrop-blur-xl rounded-full opacity-20 animate-liquid-flow delay-1000"></div>
      
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-luxury-cream">
            <div className="inline-block px-6 py-3 bg-glass-gradient backdrop-blur-lg rounded-full text-luxury-gold text-sm font-medium mb-6 border border-white/20 shadow-xl">
              ✨ Colecție Exclusivă 2024
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8 font-playfair">
              Mobilierul 
              <span className="block bg-luxury-gradient bg-clip-text text-transparent">
                de lux
              </span>
              <span className="text-luxury-cream">pentru casa ta</span>
            </h1>
            <p className="text-xl text-luxury-cream/90 mb-10 leading-relaxed font-inter max-w-lg">
              Descoperă colecția noastră exclusivă de mobilier de lux. 
              Artizanat de excepție, materiale premium și design inconfundabil.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg" 
                onClick={handleExploreCollection}
                className="bg-glass-gradient backdrop-blur-lg border border-white/20 hover:bg-white/10 text-luxury-gold font-semibold px-8 py-4 h-14 text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-luxury-gold/20 group relative overflow-hidden"
              >
                <span className="relative z-10">Explorează Colecția</span>
                <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-luxury-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleScheduleConsultation}
                className="border-2 border-white/30 bg-glass-gradient backdrop-blur-lg text-white hover:bg-white/20 hover:border-luxury-gold/50 transition-all duration-300 px-8 py-4 h-14 text-lg font-semibold shadow-xl"
              >
                Programează Consultanță
              </Button>
            </div>
          </div>
          
          
          <div className="relative">
            <div className="absolute inset-0 bg-glass-gradient backdrop-blur-3xl rounded-3xl opacity-40 animate-liquid-flow"></div>
            <div className="relative bg-glass-gradient backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl group hover:shadow-luxury-gold/20 transition-all duration-500">
              <div className="absolute inset-0 bg-liquid-gradient opacity-20 rounded-3xl group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center h-64 lg:h-80 relative z-10">
                <Armchair className="h-32 w-32 lg:h-40 lg:w-40 text-luxury-gold drop-shadow-2xl animate-glass-float" />
              </div>
              <div className="text-center mt-6 relative z-10">
                <h3 className="text-2xl font-bold text-luxury-cream mb-2 font-playfair drop-shadow-lg">Colecții Exclusive</h3>
                <p className="text-luxury-cream/80 font-inter drop-shadow">Disponibile în showroom-ul nostru premium</p>
              </div>
              
              {/* Glass reflection effect */}
              <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl opacity-60"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 bg-luxury-gold/20 rounded-full blur-lg opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-luxury-gold/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-luxury-burgundy/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-luxury-gold/30 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
    </section>
  );
};

export default Hero;