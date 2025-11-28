import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/hooks/useWishlist";
import { Link } from "react-router-dom";
import { useDiscount } from "@/hooks/useDiscount";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isOnSale?: boolean;
}

const ProductCard = ({ 
  id,
  name, 
  price, 
  originalPrice, 
  image, 
  rating, 
  reviews, 
  isNew, 
  isOnSale 
}: ProductCardProps) => {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { discountPercentage, isActive } = useDiscount();

  const cardPrice = price * (1 - discountPercentage / 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, price, image });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({ id, name, price, image });
  };

  return (
    <Link to={`/produs/${id}`} className="block">
      <Card className="group overflow-hidden border-0 bg-glass-gradient backdrop-blur-xl shadow-2xl hover:shadow-brand-gold/20 transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-3 hover:scale-[1.01] md:hover:scale-[1.02] rounded-xl md:rounded-2xl border border-white/10 relative cursor-pointer touch-manipulation">
        <div className="absolute inset-0 bg-liquid-gradient opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-xl md:rounded-2xl"></div>
        <div className="relative overflow-hidden rounded-t-xl md:rounded-t-2xl z-10">
          <img 
            src={image} 
            alt={`${name} - mobilier de calitate Mobila Nomad`}
            className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          <div className="absolute top-3 md:top-4 left-3 md:left-4 flex gap-2 z-20">
            {isOnSale && (
              <Badge className="bg-brand-burgundy/80 backdrop-blur-lg text-brand-cream border border-white/20 font-semibold px-2 md:px-3 py-0.5 md:py-1 shadow-lg text-xs md:text-sm">
                Ofertă Exclusivă
              </Badge>
            )}
          </div>
          
          <Button
            size="icon"
            variant="secondary"
            onClick={handleToggleWishlist}
            className="absolute top-3 md:top-4 right-3 md:right-4 transition-all duration-300 bg-glass-gradient backdrop-blur-lg border border-white/20 hover:bg-white/20 z-20 shadow-lg min-w-[44px] min-h-[44px] touch-manipulation"
          >
            <Heart className={`h-4 w-4 md:h-5 md:w-5 ${isInWishlist(id) ? 'fill-current text-red-500' : 'text-black'}`} />
          </Button>
          
          {/* Glass reflection */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <CardContent className="p-4 sm:p-6 md:p-8 relative z-10 bg-glass-gradient backdrop-blur-sm">
          <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2 md:mb-3 group-hover:text-brand-gold transition-colors font-playfair line-clamp-2">
            {name}
          </h3>
          
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 sm:h-4 sm:w-4 ${
                    i < rating ? "text-brand-gold fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground font-inter">({reviews})</span>
          </div>
          
          <div className="mb-4 md:mb-6 space-y-1.5 md:space-y-2">
            {/* Preț cash */}
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <span className="text-lg sm:text-xl font-bold text-foreground font-playfair">
                {price.toLocaleString('ro-RO')} Lei
              </span>
              {!isActive && (
                <span className="text-xs sm:text-sm text-muted-foreground font-inter">
                  (cash)
                </span>
              )}
              {originalPrice && (
                <span className="text-sm sm:text-base text-muted-foreground line-through font-inter">
                  {originalPrice.toLocaleString('ro-RO')} Lei
                </span>
              )}
            </div>
            
            {/* Preț card - discount dinamic - afișat doar dacă există reducere activă */}
            {isActive && (
              <>
                <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-bold text-brand-gold font-playfair">
                    {cardPrice.toLocaleString('ro-RO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} Lei
                  </span>
                  <Badge variant="secondary" className="bg-brand-gold/20 text-brand-gold border-brand-gold/30 font-semibold text-xs">
                    -{discountPercentage}% card
                  </Badge>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-inter italic">
                  *Preț special pentru plata cu cardul bancar
                </p>
              </>
            )}
          </div>
          
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-glass-gradient backdrop-blur-lg border border-white/20 hover:bg-white/10 transition-all duration-300 text-brand-gold font-semibold py-2.5 sm:py-3 h-11 sm:h-12 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] group relative overflow-hidden touch-manipulation min-h-[44px]"
          >
            <span className="relative z-10 flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Adaugă în Coș
            </span>
            <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;