import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            product_images (
              image_url,
              is_primary
            )
          `)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
          return;
        }

        // Transform data to match Product interface
        const transformedProducts = data?.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          image_url: product.image_url || product.product_images?.find(img => img.is_primary)?.image_url || product.product_images?.[0]?.image_url,
          stock: product.stock,
          category_id: product.category_id,
          status: product.status,
          created_at: product.created_at,
          updated_at: product.updated_at
        })) || [];

        setProducts(transformedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-glass-gradient rounded-xl h-96 mb-4"></div>
            <div className="bg-glass-gradient rounded h-4 mb-2"></div>
            <div className="bg-glass-gradient rounded h-4 w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-brand-cream/70 text-lg">
          Nu există produse disponibile momentan
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image_url || '/placeholder.svg'}
          rating={4}
          reviews={Math.floor(Math.random() * 50) + 5}
          isNew={false}
          isOnSale={false}
        />
      ))}
    </div>
  );
};

export default AllProducts;