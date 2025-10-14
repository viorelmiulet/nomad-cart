import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Filter, SortAsc, Sofa, Armchair, Home, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import categoryLiving from "@/assets/category-living.jpg";

const CameraDeZiPage = () => {
  const navigate = useNavigate();
  const [selectedSubcategory, setSelectedSubcategory] = useState("toate");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const subcategories = [
    { id: "toate", name: "Toate Produsele", icon: Home },
    { id: "canapele-coltare", name: "Canapele Colțare", icon: Sofa },
    { id: "fotolii", name: "Fotolii", icon: Armchair },
    { id: "accesorii", name: "Accesorii", icon: ShoppingBag },
  ];

  useEffect(() => {
    fetchLivingRoomProducts();
  }, []);

  const fetchLivingRoomProducts = async () => {
    try {
      setLoading(true);
      
      // Get camera-de-zi category ID first
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', 'camera-de-zi')
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
        console.error('Error fetching living room products:', error);
        return;
      }

      console.log('Fetched living room products:', data?.length || 0, 'products');
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
      case "canapele-coltare":
        return products.filter(p => 
          p.name.toLowerCase().includes("canapea") &&
          p.name.toLowerCase().includes("colțar")
        );
      case "fotolii":
        return products.filter(p => 
          p.name.toLowerCase().includes("fotoliu")
        );
      case "accesorii":
        return products.filter(p => 
          p.name.toLowerCase().includes("masă") ||
          p.name.toLowerCase().includes("lampă") ||
          p.name.toLowerCase().includes("covor")
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
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden" aria-labelledby="camera-zi-hero">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${categoryLiving})` }}
          role="img"
          aria-label="Mobilier camera de zi elegant - canapele colțare, fotolii și mese"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/60 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow" aria-hidden="true" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <header className="max-w-2xl">
            <h1 id="camera-zi-hero" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-brand-cream font-playfair">
              Camera de Zi
            </h1>
            <p className="text-lg md:text-xl text-brand-cream/90 mb-6 font-inter">
              Transformă-ți camera de zi într-un spațiu de lux cu mobilierul nostru de înaltă calitate. 
              Canapele confortabile, fotolii elegante și mese de cafea distinctive.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                aria-label="Înapoi la pagina principală"
              >
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                Înapoi
              </Button>
            </div>
          </header>
        </div>
      </section>

      {/* Subcategories Filter */}
      <section className="py-8 bg-muted/30" aria-label="Filtrare produse camera de zi">
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
      <section className="py-12 bg-background" aria-labelledby="benefits-living-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-8">
            <h2 id="benefits-living-heading" className="text-2xl md:text-3xl font-bold mb-4 text-foreground font-playfair">
              De ce să alegi mobilierul nostru pentru camera de zi?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Confort superior și design elegant pentru spațiul tău de relaxare
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sofa className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Confort Maximum</h3>
              <p className="text-muted-foreground">
                Canapele și fotolii ergonomice pentru relaxarea perfectă după o zi lungă.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Design Modern</h3>
              <p className="text-muted-foreground">
                Stiluri contemporane care se adaptează perfect la orice decor modern.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calitate Superioară</h3>
              <p className="text-muted-foreground">
                Materiale de înaltă calitate și finisaje durabile pentru o investiție pe termen lung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12" aria-labelledby="products-living-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-8">
            <h2 id="products-living-heading" className="text-2xl md:text-3xl font-bold mb-4 text-foreground font-playfair">
              Mobilier pentru Camera de Zi
            </h2>
            <p className="text-muted-foreground">
              Descoperă colecția noastră de {filteredProducts.length} produse pentru camera ta de zi
            </p>
          </header>
          
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

export default CameraDeZiPage;