import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, SortAsc, Bed, Armchair, Home, Package } from "lucide-react";
import heroImage from "@/assets/hero-dormitor-new.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const DormitorPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("toate");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleFilter = () => {
    toast({
      title: "Filtre",
      description: "Sistemul de filtrare va fi implementat în curând.",
    });
  };

  const handleSort = () => {
    toast({
      title: "Sortare",
      description: "Opțiunile de sortare vor fi disponibile în curând.",
    });
  };

  // Fetch bedroom products from database
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Get dormitor category ID first
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', 'dormitor')
          .single();

        if (categoryError) {
          console.error('Error fetching category:', categoryError);
          return;
        }

        // Then fetch products with that category_id
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            categories (
              name,
              slug
            )
          `)
          .eq('category_id', categoryData.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
        } else {
          console.log('Fetched dormitor products:', data?.length || 0);
          setProducts(data || []);
          setFilteredProducts(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected category
  useEffect(() => {
    if (selectedCategory === "toate") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => {
        const name = product.name.toLowerCase();
        switch (selectedCategory) {
          case "paturi":
            return name.includes("pat");
          case "comode":
            return name.includes("comoda");
          case "noptiere":
            return name.includes("noptiere");
          case "premium":
            return product.price >= 1500;
          default:
            return true;
        }
      });
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const categories = [
    { id: "toate", name: "Toate Produsele", icon: Home },
    { id: "paturi", name: "Paturi", icon: Bed },
    { id: "comode", name: "Comode", icon: Armchair },
    { id: "noptiere", name: "Noptiere", icon: Package },
    { id: "premium", name: "Premium", icon: Bed },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20 bg-hero-gradient relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark/40 via-luxury-navy/30 to-luxury-dark/40"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-20 animate-liquid-flow"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10 hover:border-luxury-gold/70"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Înapoi la Home
              </Button>
              
              <h1 className="text-3xl lg:text-4xl font-bold font-playfair text-luxury-cream">
                Dormitor
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Button
                onClick={handleFilter}
                variant="outline" 
                className="border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10 hover:border-luxury-gold/70"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtre
              </Button>
              
              <Button
                onClick={handleSort}
                variant="outline"
                className="border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10 hover:border-luxury-gold/70"
              >
                <SortAsc className="h-4 w-4 mr-2" />
                Sortare
              </Button>
            </div>
          </div>
          
          <div className="text-center mb-16">
            <p className="text-lg text-luxury-cream/90 max-w-3xl mx-auto font-inter leading-relaxed">
              Creează-ți dormitorul perfect cu mobilierul nostru premium. Paturi confortabile, 
              dulapuri spațioase și saltele de înaltă calitate pentru un somn odihnitor.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2 bg-glass-gradient backdrop-blur-lg border-luxury-gold/30 text-luxury-cream hover:border-luxury-gold/50"
                >
                  <IconComponent className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="aspect-square rounded-lg bg-white/10" />
                  <Skeleton className="h-4 w-3/4 bg-white/10" />
                  <Skeleton className="h-4 w-1/2 bg-white/10" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image_url}
                  rating={4.5}
                  reviews={Math.floor(Math.random() * 80) + 20}
                  isNew={new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-luxury-cream/70 text-lg">
                Nu au fost găsite produse pentru categoria selectată
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DormitorPage;