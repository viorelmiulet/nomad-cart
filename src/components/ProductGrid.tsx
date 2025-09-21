import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const ProductGrid = () => {
  const handleViewAllProducts = () => {
    toast({
      title: "Toate Produsele",
      description: "Vei fi redirecționat către pagina cu toate produsele premium.",
    });
  };

  const products = [
    {
      id: "1",
      name: "Canapea Modernă 3 Locuri",
      price: 2999,
      originalPrice: 3499,
      image: "/placeholder.svg",
      rating: 5,
      reviews: 128,
      isNew: true,
      isOnSale: true
    },
    {
      id: "2", 
      name: "Masă de Dining Extensibilă",
      price: 1899,
      image: "/placeholder.svg",
      rating: 5,
      reviews: 95,
      isNew: true
    },
    {
      id: "3",
      name: "Dulap Dormitor cu Oglinzi", 
      price: 3299,
      originalPrice: 3799,
      image: "/placeholder.svg",
      rating: 4,
      reviews: 67,
      isOnSale: true
    },
    {
      id: "4",
      name: "Set Fotolii Living x2",
      price: 2399,
      image: "/placeholder.svg", 
      rating: 4,
      reviews: 45,
      isNew: true
    },
    {
      id: "5",
      name: "Bibliotecă Modulară",
      price: 1699,
      originalPrice: 1999,
      image: "/placeholder.svg",
      rating: 4,
      reviews: 89,
      isOnSale: true
    },
    {
      id: "6",
      name: "Saltea Memory Foam",
      price: 1299,
      image: "/placeholder.svg",
      rating: 4, 
      reviews: 34
    }
  ];

  return (
    <section id="products-section" className="py-20 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-cream/30 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-luxury-gold/10 rounded-full text-luxury-gold text-sm font-medium mb-6 border border-luxury-gold/20">
            ✨ Colecția Premium
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-playfair">
            Mobilier de Lux
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed">
            Descoperă cele mai rafinate piese de mobilier, create cu atenție la detalii și materiale de cea mai înaltă calitate
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button 
            onClick={handleViewAllProducts}
            className="bg-luxury-gradient text-luxury-dark px-10 py-4 h-14 text-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Vezi Toată Colecția Premium
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;