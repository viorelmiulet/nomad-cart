import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ProductGrid = () => {
  const navigate = useNavigate();
  
  const handleViewAllProducts = () => {
    toast({
      title: "Toate Produsele",
      description: "Vei fi redirecționat către pagina cu toate produsele.",
    });
    setTimeout(() => {
      navigate("/products");
    }, 1000);
  };

  // No products to display - removed test products
  const products: any[] = [];

  return (
    <section id="products-section" className="py-12 sm:py-16 md:py-20 bg-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-navy/70 to-brand-dark/95"></div>
      <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 font-playfair text-brand-cream">
            Produse Populare
          </h2>
          <p className="text-base sm:text-lg text-brand-cream/90 max-w-2xl mx-auto font-inter leading-relaxed px-4">
            Cele mai apreciate piese de mobilier de către clienții noștri
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          <div className="col-span-full text-center py-8 sm:py-12">
            <p className="text-brand-cream/70 text-base sm:text-lg">
              Produsele vor fi afișate în curând
            </p>
          </div>
        </div>
        
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <Button 
            onClick={handleViewAllProducts}
            className="bg-brand-gradient text-brand-dark px-6 sm:px-8 py-2.5 sm:py-3 h-11 sm:h-12 text-sm sm:text-base font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 touch-manipulation active:scale-95 min-h-[44px]"
          >
            Vezi Toate Produsele
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;