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
    <Card className="group overflow-hidden border-0 bg-card-gradient shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        <div className="absolute top-4 left-4 flex gap-2">
          {isNew && (
            <Badge className="bg-accent-cyan text-white border-0">
              Nou
            </Badge>
          )}
          {isOnSale && (
            <Badge className="bg-destructive text-white border-0">
              Ofertă
            </Badge>
          )}
        </div>
        
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-tech-blue transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({reviews})</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-tech-blue">
              {price.toLocaleString('ro-RO')} Lei
            </span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {originalPrice.toLocaleString('ro-RO')} Lei
              </span>
            )}
          </div>
        </div>
        
        <Button className="w-full bg-tech-gradient hover:opacity-90 transition-opacity text-white border-0">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Adaugă în coș
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;