import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, Bed, Armchair, ShoppingBag, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import categoryBedroom from "@/assets/category-bedroom.jpg";

const DormitorCompletPage = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState("toate");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  // Fetch bedroom products from database
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Get dormitor-complet category ID first
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', 'dormitor-complet')
          .single();

        if (categoryError) {
          console.error('Error fetching category:', categoryError);
          return;
        }

        // Then fetch products with that category_id
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price, image_url, description, created_at')
          .eq('category_id', categoryData.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
        } else {
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

  // Filter products based on selected subcategory
  useEffect(() => {
    if (selectedSubcategory === "toate") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => {
        const name = product.name.toLowerCase();
        switch (selectedSubcategory) {
          case "seturi":
            return name.includes("complet") || name.includes("set");
          case "diana":
            return name.includes("diana");
          case "robert":
            return name.includes("robert");
          case "luxury":
            return product.price >= 3000;
          case "buget":
            return product.price < 2000;
          default:
            return true;
        }
      });
      setFilteredProducts(filtered);
    }
  }, [selectedSubcategory, products]);

  const subcategories = [
    { id: "toate", name: "Toate Produsele", icon: ShoppingBag },
    { id: "luxury", name: "Seturi de Lux", icon: Bed },
    { id: "diana", name: "Colecția Diana", icon: Bed },
    { id: "robert", name: "Colecția Robert", icon: Armchair },
    { id: "buget", name: "Prețuri Mici", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${categoryBedroom})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-brand-cream font-playfair">
              Dormitoare Complete
            </h1>
            <p className="text-lg md:text-xl text-brand-cream/90 mb-6 font-inter">
              Transformă-ți dormitorul într-un sanctuar de relaxare cu mobilierul nostru complet
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-semibold"
              >
                Explorează Seturile <ArrowRight className="ml-2 h-4 w-4" />
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
              De ce să alegi dormitoare complete?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Designul coerent și funcționalitatea perfectă pentru spațiul tău de odihnă
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bed className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Design Coerent</h3>
              <p className="text-muted-foreground">
                Toate piesele se potrivesc perfect, creând o atmosferă armonioasă în dormitor.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Preț Avantajos</h3>
              <p className="text-muted-foreground">
                Economisești prin achiziționarea unui set complet față de piesele individuale.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Armchair className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Funcționalitate</h3>
              <p className="text-muted-foreground">
                Spațiu de depozitare optimizat și ergonomie perfectă pentru confortul zilnic.
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
              Mobilier pentru Dormitoare Complete
            </h2>
            <p className="text-muted-foreground">
              Descoperă colecția noastră de {filteredProducts.length} produse pentru dormitoare complete și armonioase
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
                  image={product.image_url}
                  rating={4.5}
                  reviews={Math.floor(Math.random() * 50) + 10}
                  isNew={new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Nu au fost găsite produse pentru categoria selectată.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DormitorCompletPage;