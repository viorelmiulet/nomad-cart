import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface RecommendedProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  recommendationReason: string;
  categories?: {
    name: string;
    slug: string;
  };
}

interface ProductRecommendationsProps {
  customerEmail?: string;
  currentProductHandle?: string;
  limit?: number;
  title?: string;
  description?: string;
}

export const ProductRecommendations = ({
  customerEmail,
  currentProductHandle,
  limit = 4,
  title = "Recomandări Pentru Tine",
  description = "Produse selectate special bazate pe preferințele tale"
}: ProductRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    loadRecommendations();
  }, [customerEmail, currentProductHandle]);

  const loadRecommendations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: funcError } = await supabase.functions.invoke('generate-recommendations', {
        body: {
          customerEmail,
          currentProductHandle,
          limit
        }
      });

      if (funcError) {
        throw funcError;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setRecommendations(data.recommendations || []);
    } catch (err: any) {
      console.error('Failed to load recommendations:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product: RecommendedProduct) => {
    // For Shopify products, you'd need to fetch the actual Shopify product
    // For now, this is a simplified version for database products
    toast.success(`${product.name} adăugat în coș`);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle>{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(limit)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || recommendations.length === 0) {
    return null;
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product Image */}
              <div 
                className="relative h-48 bg-muted cursor-pointer overflow-hidden"
                onClick={() => handleProductClick(product.id)}
              >
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
                
                {/* AI Badge */}
                <Badge className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Pick
                </Badge>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div 
                  className="cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  {product.categories && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {product.categories.name}
                    </p>
                  )}
                  
                  <p className="text-lg font-bold text-primary mt-2">
                    {product.price.toFixed(2)} RON
                  </p>
                </div>

                {/* AI Recommendation Reason */}
                <div className="bg-primary/5 rounded-md p-2 border border-primary/10">
                  <p className="text-xs text-muted-foreground italic line-clamp-2">
                    💡 {product.recommendationReason}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleProductClick(product.id)}
                  >
                    Vezi Detalii
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Refresh Button */}
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={loadRecommendations}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Actualizează Recomandările
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
