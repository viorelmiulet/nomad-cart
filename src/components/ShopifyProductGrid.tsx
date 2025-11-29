import { useEffect, useState } from 'react';
import { fetchShopifyProducts, ShopifyProduct } from '@/lib/shopify';
import { ShopifyProductCard } from './ShopifyProductCard';
import { Loader2 } from 'lucide-react';

export const ShopifyProductGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchShopifyProducts(50);
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Nu am putut încărca produsele. Te rugăm să încerci din nou.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-12 w-12 animate-spin text-brand-gold" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-400 mb-4">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-brand-cream/90 text-lg mb-2">Nu există produse momentan</p>
        <p className="text-brand-cream/70 text-sm">
          Produsele vor apărea aici după ce le creezi în Shopify
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ShopifyProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
};
