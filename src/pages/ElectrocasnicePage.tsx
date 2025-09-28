import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, SortAsc, Zap, Refrigerator, Microwave, WashingMachine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const ElectrocasnicePage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const handleFilter = () => {
    toast({
      title: "Filtre",
      description: "Sistemul de filtrare va fi implementat în curând.",
    });
  };

  const handleSort = () => {
    toast({
      title: "Sortare",
      description: "Opțiunile de sortare vor fi disponibile în curând.",
    });
  };

  // No products to display - removed test products
  const applianceProducts: any[] = [];

  const categories = [
    {
      name: "Frigidere",
      icon: Refrigerator,
      description: "Frigidere și combine frigorifice moderne"
    },
    {
      name: "Cuptoare cu microunde",
      icon: Microwave,
      description: "Cuptoare cu microunde și echipamente de gătit"
    },
    {
      name: "Mașini de spălat",
      icon: WashingMachine,
      description: "Mașini de spălat rufe și uscătoare"
    },
    {
      name: "Electrocasnice mici",
      icon: Zap,
      description: "Aspiratoare, cafetiere și alte aparate"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark/90 via-luxury-navy/70 to-luxury-dark/95"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10 hover:border-luxury-gold/70"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Înapoi la Home
              </Button>
              
              <h1 className="text-3xl lg:text-4xl font-bold font-playfair text-luxury-cream">
                Electrocasnice
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Button
                onClick={handleFilter}
                variant="outline" 
                className="border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10 hover:border-luxury-gold/70"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtre
              </Button>
              
              <Button
                onClick={handleSort}
                variant="outline"
                className="border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10 hover:border-luxury-gold/70"
              >
                <SortAsc className="h-4 w-4 mr-2" />
                Sortare
              </Button>
            </div>
          </div>
          
          <div className="text-center mb-16">
            <p className="text-lg text-luxury-cream/90 max-w-3xl mx-auto font-inter leading-relaxed">
              Electrocasnice moderne și eficiente pentru casa ta. De la frigidere energy-efficient 
              la aparate de gătit de înaltă performanță - totul pentru o casă inteligentă.
            </p>
          </div>

          {/* Categories Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-luxury-cream mb-8 text-center font-playfair">
              Categorii Electrocasnice
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div 
                    key={category.name}
                    className="bg-glass-gradient backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center hover:border-luxury-gold/50 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-luxury-gold/30 transition-colors">
                      <IconComponent className="h-8 w-8 text-luxury-gold" />
                    </div>
                    <h3 className="text-lg font-semibold text-luxury-cream mb-2">
                      {category.name}
                    </h3>
                    <p className="text-luxury-cream/70 text-sm">
                      {category.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="col-span-full text-center py-12">
              <p className="text-luxury-cream/70 text-lg">
                Electrocasnicele vor fi afișate în curând
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ElectrocasnicePage;