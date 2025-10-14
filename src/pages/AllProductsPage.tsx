import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllProducts from "@/components/AllProducts";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, SortAsc } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AllProductsPage = () => {
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
      
      <main className="py-20 bg-hero-gradient relative overflow-hidden" aria-labelledby="all-products-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark/90 via-luxury-navy/70 to-luxury-dark/95" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow" aria-hidden="true"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <header className="flex items-center justify-between mb-16">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10 hover:border-luxury-gold/70"
                aria-label="Înapoi la pagina principală"
              >
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                Înapoi la Home
              </Button>
              
              <h1 id="all-products-heading" className="text-3xl lg:text-4xl font-bold font-playfair text-luxury-cream">
                Toate Produsele
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Button
                onClick={handleFilter}
                variant="outline" 
                className="border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10 hover:border-luxury-gold/70"
                aria-label="Deschide opțiuni de filtrare"
              >
                <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
                Filtre
              </Button>
              
              <Button
                onClick={handleSort}
                variant="outline"
                className="border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10 hover:border-luxury-gold/70"
                aria-label="Deschide opțiuni de sortare"
              >
                <SortAsc className="h-4 w-4 mr-2" aria-hidden="true" />
                Sortare
              </Button>
            </div>
          </header>
          
          <AllProducts />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllProductsPage;