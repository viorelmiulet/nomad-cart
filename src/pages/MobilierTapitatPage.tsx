import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, SortAsc } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Import product images
import sofaImage from "@/assets/product-sofa-modern.jpg";
import armchairsImage from "@/assets/product-armchairs.jpg";
import mattressImage from "@/assets/product-mattress.jpg";

const MobilierTapitatPage = () => {
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

  const mobilierTapitatProducts = [
    {
      id: "mt1",
      name: "Canapea Modernă 3 Locuri",
      price: 2999,
      originalPrice: 3499,
      image: sofaImage,
      rating: 5,
      reviews: 128,
      isNew: true,
      isOnSale: true
    },
    {
      id: "mt2",
      name: "Set Fotolii Piele Naturală",
      price: 2399,
      image: armchairsImage, 
      rating: 4,
      reviews: 45,
      isNew: true
    },
    {
      id: "mt3",
      name: "Saltea Memory Foam Premium",
      price: 1299,
      originalPrice: 1599,
      image: mattressImage,
      rating: 4, 
      reviews: 34,
      isOnSale: true
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
                Mobilier Tapițat
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
              Mobilierul tapițat premium cu țesături de lux și design ergonomic. Confort maxim și eleganță 
              pentru orice spațiu din casa ta.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {mobilierTapitatProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MobilierTapitatPage;