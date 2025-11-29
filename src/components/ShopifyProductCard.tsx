import { ShopifyProduct } from '@/lib/shopify';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface ShopifyProductCardProps {
  product: ShopifyProduct;
}

export const ShopifyProductCard = ({ product }: ShopifyProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;

  const handleAddToCart = () => {
    const variant = node.variants.edges[0]?.node;
    
    if (!variant) {
      toast({
        title: "Eroare",
        description: "Acest produs nu are variante disponibile.",
        variant: "destructive",
      });
      return;
    }

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions
    };
    
    addItem(cartItem);
    
    toast({
      title: "Adăugat în coș!",
      description: `${node.title} a fost adăugat în coșul tău.`,
    });
  };

  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const imageUrl = node.images.edges[0]?.node.url;

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group bg-brand-dark/50 backdrop-blur-sm rounded-xl overflow-hidden border border-brand-gold/20 hover:border-brand-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/20"
    >
      <div className="aspect-square overflow-hidden bg-brand-dark">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-gold/10">
            <ShoppingCart className="h-16 w-16 text-brand-gold/30" />
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="font-playfair text-brand-cream text-lg font-semibold line-clamp-2 group-hover:text-brand-gold transition-colors">
          {node.title}
        </h3>
        
        {node.description && (
          <p className="text-brand-cream/70 text-sm line-clamp-2">
            {node.description}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-brand-gold font-bold text-xl font-playfair">
            {price.toFixed(2)} {node.priceRange.minVariantPrice.currencyCode}
          </span>
          
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            size="sm"
            className="bg-brand-gradient hover:opacity-90 text-brand-dark font-semibold"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Adaugă
          </Button>
        </div>
      </div>
    </Link>
  );
};
