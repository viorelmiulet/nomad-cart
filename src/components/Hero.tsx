import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Cele mai noi
              <span className="block text-accent-cyan">
                telefoane mobile
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Descoperă gama completă de smartphone-uri cu cele mai avansate tehnologii. 
              Prețuri competitive și livrare rapidă.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-tech-blue hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
              >
                Vezi produsele
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-tech-blue transition-all duration-300"
              >
                Află mai multe
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="flex items-center justify-center h-64 lg:h-80">
                <Smartphone className="h-32 w-32 lg:h-40 lg:w-40 text-white/80" />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-2xl font-bold text-white mb-2">Latest Models</h3>
                <p className="text-white/70">Disponible acum în stoc</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-accent-purple/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent-cyan/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
      </div>
    </section>
  );
};

export default Hero;