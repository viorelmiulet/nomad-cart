import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/hooks/useWishlist";
import { Link } from "react-router-dom";

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
    <Link to={`/product/${id}`} className="block">
      <Card className="group overflow-hidden border-0 bg-glass-gradient backdrop-blur-xl shadow-2xl hover:shadow-brand-gold/20 transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] rounded-2xl border border-white/10 relative cursor-pointer">
        <div className="absolute inset-0 bg-liquid-gradient opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl"></div>
        <div className="relative overflow-hidden rounded-t-2xl z-10">
          <img 
            src={image} 
            alt={`${name} - mobilier de calitate Mobila Nomad`}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          <div className="absolute top-4 left-4 flex gap-2 z-20">
            {isOnSale && (
              <Badge className="bg-brand-burgundy/80 backdrop-blur-lg text-brand-cream border border-white/20 font-semibold px-3 py-1 shadow-lg">
                Ofertă Exclusivă
              </Badge>
            )}
          </div>
          
          <Button
            size="icon"
            variant="secondary"
            onClick={handleToggleWishlist}
            className={`absolute top-4 right-4 transition-all duration-300 bg-glass-gradient backdrop-blur-lg border border-white/20 hover:bg-white/20 z-20 shadow-lg`}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(id) ? 'fill-current text-red-500' : 'text-black'}`} />
          </Button>
          
          {/* Glass reflection */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <CardContent className="p-8 relative z-10 bg-glass-gradient backdrop-blur-sm">
          <h3 className="font-semibold text-xl mb-3 group-hover:text-brand-gold transition-colors font-playfair">
            {name}
          </h3>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating ? "text-brand-gold fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground font-inter">({reviews} recenzii)</span>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-brand-gold font-playfair">
                {price.toLocaleString('ro-RO')} Lei
              </span>
              {originalPrice && (
                <span className="text-lg text-muted-foreground line-through font-inter">
                  {originalPrice.toLocaleString('ro-RO')} Lei
                </span>
              )}
            </div>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-glass-gradient backdrop-blur-lg border border-white/20 hover:bg-white/10 transition-all duration-300 text-brand-gold font-semibold py-3 h-12 text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
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