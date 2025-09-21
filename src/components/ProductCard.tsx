import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";

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
  name, 
  price, 
  originalPrice, 
  image, 
  rating, 
  reviews, 
  isNew, 
  isOnSale 
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 bg-card-gradient shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] rounded-2xl">
      <div className="relative overflow-hidden rounded-t-2xl">
        <img 
          src={image} 
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        <div className="absolute top-4 left-4 flex gap-2">
          {isNew && (
            <Badge className="bg-luxury-gradient text-luxury-dark border-0 font-semibold px-3 py-1">
              Nou
            </Badge>
          )}
          {isOnSale && (
            <Badge className="bg-luxury-burgundy text-luxury-cream border-0 font-semibold px-3 py-1">
              Ofertă Exclusivă
            </Badge>
          )}
        </div>
        
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-luxury-cream/90 hover:bg-luxury-gold hover:text-luxury-dark"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <CardContent className="p-8">
        <h3 className="font-semibold text-xl mb-3 group-hover:text-luxury-gold transition-colors font-playfair">
          {name}
        </h3>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? "text-luxury-gold fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground font-inter">({reviews} recenzii)</span>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-luxury-gold font-playfair">
              {price.toLocaleString('ro-RO')} Lei
            </span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through font-inter">
                {originalPrice.toLocaleString('ro-RO')} Lei
              </span>
            )}
          </div>
        </div>
        
        <Button className="w-full bg-luxury-gradient hover:opacity-90 transition-all duration-300 text-luxury-dark border-0 font-semibold py-3 h-12 text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Adaugă în Coș
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;