import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Filter, SortAsc, ChefHat, Utensils, CookingPot, Refrigerator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import categoryKitchen from "@/assets/category-kitchen.jpg";

const BucatariePage = () => {
  const navigate = useNavigate();
  const [selectedSubcategory, setSelectedSubcategory] = useState("toate");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const subcategories = [
    { id: "toate", name: "Toate Produsele", icon: ChefHat },
    { id: "bucatarii-complete", name: "Bucătării Complete", icon: CookingPot },
    { id: "corpuri", name: "Corpuri Individuale", icon: Utensils },
    { id: "accesorii", name: "Accesorii", icon: Refrigerator },
  ];

  useEffect(() => {
    fetchKitchenProducts();
  }, []);

  const fetchKitchenProducts = async () => {
    try {
      setLoading(true);
      
      // Get bucatarie category ID first
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', 'bucatarie')
        .single();

      if (categoryError) {
        console.error('Error fetching category:', categoryError);
        return;
      }

      // Then fetch products with that category_id
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, image_url, description')
        .eq('category_id', categoryData.id)
        .eq('status', 'active')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching kitchen products:', error);
        return;
      }

      console.log('Fetched kitchen products:', data?.length || 0, 'products');
      setProducts(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = (products: any[], subcategory: string) => {
    if (subcategory === "toate") return products;
    
    switch (subcategory) {
      case "bucatarii-complete":
        return products.filter(p => 
          p.name.toLowerCase().includes("bucătărie") &&
          (p.name.toLowerCase().includes("completă") || p.name.toLowerCase().includes("cm"))
        );
      case "corpuri":
        return products.filter(p => 
          p.name.toLowerCase().includes("corp") ||
          p.name.toLowerCase().includes("blat")
        );
      case "accesorii":
        return products.filter(p => 
          p.name.toLowerCase().includes("organizator") ||
          p.name.toLowerCase().includes("coș") ||
          p.name.toLowerCase().includes("sistem") ||
          p.name.toLowerCase().includes("set")
        );
      default:
        return products;
    }
  };

  const filteredProducts = filterProducts(products, selectedSubcategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${categoryKitchen})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-brand-cream font-playfair">
              Bucătărie
            </h1>
            <p className="text-lg md:text-xl text-brand-cream/90 mb-6 font-inter">
              Mobilier și electrocasnice pentru bucătăria ta de vis. Design funcțional și calitate superioară.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Înapoi
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories Filter */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {subcategories.map((subcat) => {
              const IconComponent = subcat.icon;
              return (
                <Button
                  key={subcat.id}
                  variant={selectedSubcategory === subcat.id ? "default" : "outline"}
                  onClick={() => setSelectedSubcategory(subcat.id)}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="h-4 w-4" />
                  {subcat.name}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground font-playfair">
              De ce să alegi bucătăriile noastre?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calitate superioară și design funcțional pentru bucătăria perfectă
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Design Funcțional</h3>
              <p className="text-muted-foreground">
                Spații optimizate și soluții inteligente pentru toate nevoile tale culinare.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CookingPot className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calitate Premium</h3>
              <p className="text-muted-foreground">
                Materiale rezistente și finisaje de calitate pentru o durabilitate maximă.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalizare</h3>
              <p className="text-muted-foreground">
                Soluții la comandă adaptate perfect spațiului și stilului tău.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground font-playfair">
              Mobilier pentru Bucătărie
            </h2>
            <p className="text-muted-foreground">
              Descoperă colecția noastră de {filteredProducts.length} produse pentru bucătăria ta
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="aspect-square rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image_url || '/placeholder.svg'}
                  rating={4.5}
                  reviews={Math.floor(Math.random() * 50) + 10}
                  isNew={new Date(product.created_at || Date.now()) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nu s-au găsit produse pentru categoria selectată.
              </p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BucatariePage;