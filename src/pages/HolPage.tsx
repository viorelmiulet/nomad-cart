import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, SortAsc } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const HolPage = () => {
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
                Hol
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
              Mobilier funcțional și elegant pentru hol. Cuiere, pantofare și bănci care oferă 
              primirea perfectă în casa ta.
            </p>
          </div>
          
          <div className="text-center py-20">
            <div className="bg-glass-gradient backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-luxury-cream mb-4 font-playfair">
                Colecția pentru Hol va fi disponibilă în curând
              </h3>
              <p className="text-luxury-cream/80 font-inter mb-8">
                Lucrăm la o selecție specială de mobilier pentru hol. 
                Te vom anunța când va fi gata!
              </p>
              <Button
                onClick={() => {
                  toast({
                    title: "Notificare activată",
                    description: "Te vom anunța când colecția pentru hol va fi disponibilă.",
                  });
                }}
                className="bg-luxury-gradient text-luxury-dark px-8 py-3 h-12 text-base font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Anunță-mă când e gata
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HolPage;