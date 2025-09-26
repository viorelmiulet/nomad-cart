import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Import product images
import sofaImage from "@/assets/product-sofa-modern.jpg";
import diningTableImage from "@/assets/product-dining-table.jpg";
import wardrobeImage from "@/assets/product-wardrobe.jpg";
import armchairsImage from "@/assets/product-armchairs.jpg";
import bookshelfImage from "@/assets/product-bookshelf.jpg";
import mattressImage from "@/assets/product-mattress.jpg";

const ProductGrid = () => {
  const navigate = useNavigate();
  
  const handleViewAllProducts = () => {
    toast({
      title: "Toate Produsele",
      description: "Vei fi redirecționat către pagina cu toate produsele premium.",
    });
    setTimeout(() => {
      navigate("/products");
    }, 1000);
  };

  const products = [
    {
      id: "68599044-1e21-4809-8057-6a44a058fbee", // Fotoliu Elegant from DB
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
      id: "2a28a172-ad86-4074-9dbc-7290a0bb820e", // Masă Dining from DB
      name: "Masă de Dining Extensibilă",
      price: 1899,
      image: diningTableImage,
      rating: 5,
      reviews: 95,
      isNew: true
    },
    {
      id: "6db8b793-bf63-4fe7-bf61-25106f0a7595", // Dulap Dormitor from DB
      name: "Dulap Dormitor cu Oglinzi", 
      price: 3299,
      originalPrice: 3799,
      image: wardrobeImage,
      rating: 4,
      reviews: 67,
      isOnSale: true
    },
    {
      id: "398478a8-4a0a-4ebb-b737-f6c26364afd6", // Comoda Hol from DB (repurposed as fotolii)
      name: "Set Fotolii Living x2",
      price: 2399,
      image: armchairsImage, 
      rating: 4,
      reviews: 45,
      isNew: true
    },
    {
      id: "68599044-1e21-4809-8057-6a44a058fbee", // Reusing Fotoliu Elegant ID (will update DB later)
      name: "Bibliotecă Modulară",
      price: 1699,
      originalPrice: 1999,
      image: bookshelfImage,
      rating: 4,
      reviews: 89,
      isOnSale: true
    },
    {
      id: "2a28a172-ad86-4074-9dbc-7290a0bb820e", // Reusing Masă Dining ID (will update DB later)
      name: "Saltea Memory Foam",
      price: 1299,
      image: mattressImage,
      rating: 4, 
      reviews: 34
    }
  ];

  return (
    <section id="products-section" className="py-20 bg-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark/90 via-luxury-navy/70 to-luxury-dark/95"></div>
      <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-playfair text-luxury-cream">
            Produse Populare
          </h2>
          <p className="text-lg text-luxury-cream/90 max-w-2xl mx-auto font-inter leading-relaxed">
            Cele mai apreciate piese de mobilier de către clienții noștri
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
            className="bg-luxury-gradient text-luxury-dark px-8 py-3 h-12 text-base font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Vezi Toate Produsele
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;