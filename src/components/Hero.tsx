import { Button } from "@/components/ui/button";
import { ArrowRight, Armchair } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-hero-gradient min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark/90 to-luxury-navy/80"></div>
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-luxury-cream">
            <div className="inline-block px-4 py-2 bg-luxury-gold/20 rounded-full text-luxury-gold text-sm font-medium mb-6 border border-luxury-gold/30">
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
                className="bg-luxury-gradient hover:opacity-90 text-luxury-dark font-semibold px-8 py-4 h-14 text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Explorează Colecția
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-300 px-8 py-4 h-14 text-lg font-semibold"
              >
                Programează Consultanță
              </Button>
            </div>
          </div>
          
          
          <div className="relative">
            <div className="absolute inset-0 bg-luxury-gold/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-luxury-cream/10 backdrop-blur-sm rounded-3xl p-8 border border-luxury-gold/30 shadow-2xl">
              <div className="flex items-center justify-center h-64 lg:h-80">
                <Armchair className="h-32 w-32 lg:h-40 lg:w-40 text-luxury-gold" />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-2xl font-bold text-luxury-cream mb-2 font-playfair">Colecții Exclusive</h3>
                <p className="text-luxury-cream/80 font-inter">Disponibile în showroom-ul nostru premium</p>
              </div>
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