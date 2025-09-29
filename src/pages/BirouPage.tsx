import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { Utensils, Users2, Home, Coffee, Star, ArrowRight, Users, Clock, TrendingUp, ChefHat, Heart, Sparkles } from "lucide-react";
import heroMeseScaune from "@/assets/hero-mese-scaune.jpg";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  description: string | null;
}

const BirouPage = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState("toate");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const subcategories = [
    { id: "toate", name: "Toate Seturile", icon: Utensils },
    { id: "set-masa-6-scaune", name: "Set Masă + 6 Scaune", icon: Users2 },
    { id: "set-extensibil", name: "Mese Extensibile", icon: Home },
    { id: "set-gradina", name: "Seturi Grădină", icon: Coffee },
    { id: "set-luxury", name: "Seturi de Lux", icon: Star },
    { id: "set-modern", name: "Design Modern", icon: Sparkles },
  ];

  useEffect(() => {
    fetchDiningProducts();
  }, []);

  const fetchDiningProducts = async () => {
    try {
      setLoading(true);
      
      // Get birou category ID first
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', 'birou')
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
        console.error('Error fetching office products:', error);
        return;
      }

      console.log('Fetched dining products:', data?.length || 0, 'products');
      setProducts(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = (products: Product[], subcategory: string) => {
    if (subcategory === "toate") return products;
    
    switch (subcategory) {
      case "set-masa-6-scaune":
        return products.filter(p => 
          p.name.toLowerCase().includes("6 scaune") ||
          p.name.toLowerCase().includes("masa si")
        );
      case "set-extensibil":
        return products.filter(p => 
          p.name.toLowerCase().includes("extensibil") ||
          p.name.toLowerCase().includes("130") ||
          p.name.toLowerCase().includes("170")
        );
      case "set-gradina":
        return products.filter(p => 
          p.name.toLowerCase().includes("gradina") ||
          p.name.toLowerCase().includes("terasa") ||
          p.name.toLowerCase().includes("fotolii")
        );
      case "set-luxury":
        return products.filter(p => 
          p.name.toLowerCase().includes("diva") ||
          p.name.toLowerCase().includes("regal") ||
          p.price >= 1700
        );
      case "set-modern":
        return products.filter(p => 
          p.name.toLowerCase().includes("model") ||
          p.name.toLowerCase().includes("modern") ||
          p.name.toLowerCase().includes("negru")
        );
      default:
        return products;
    }
  };

  const filteredProducts = filterProducts(products, selectedSubcategory);

  console.log(`Total products: ${products.length}, Filtered (${selectedSubcategory}): ${filteredProducts.length}`);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroMeseScaune})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-liquid-gradient opacity-20 animate-liquid-flow" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white font-playfair">
              Mese și Scaune
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 font-inter">
              Descoperă seturi complete de mese și scaune pentru mesele perfecte în familie
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-semibold"
              >
                Explorează Seturile <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Mese Extensibile
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

      {/* Statistics Section */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground font-playfair">
              Masa în familie în cifre
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              De ce investiția într-un set de masă și scaune de calitate transformă casa ta
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-blue-600">+50%</h3>
              <p className="text-muted-foreground">
                Mai mult timp petrecut împreună la masa cu un set confortabil
              </p>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-green-600">2-3 ore/zi</h3>
              <p className="text-muted-foreground">
                Timpul mediu petrecut la masă - confortul și designul contează
              </p>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-purple-600">85%</h3>
              <p className="text-muted-foreground">
                Din familii consideră masa comună ca fiind foarte importantă
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground font-playfair">
              De ce să investești într-un set de masă și scaune de calitate?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un set de masă frumos și confortabil transformă momentele în familie în amintiri prețioase
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Confort</h3>
              <p className="text-muted-foreground">
                Scaune confortabile pentru mese lungi și conversații plăcute.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Socializare</h3>
              <p className="text-muted-foreground">
                Spațiu perfect pentru întâlniri în familie și cu prietenii.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Design</h3>
              <p className="text-muted-foreground">
                Seturi elegante care completează perfect decorul casei tale.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Versatilitate</h3>
              <p className="text-muted-foreground">
                De la micul dejun la cina festivă - perfect pentru orice ocazie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground font-playfair">
              Cum să alegi setul perfect de masă și scaune
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">1. Măsoară spațiul disponibil</h3>
              <p className="text-muted-foreground">
                Asigură-te că ai suficient spațiu pentru masă și scaune când sunt scoase.
              </p>
              
              <h3 className="text-xl font-semibold">2. Alege dimensiunea potrivită</h3>
              <p className="text-muted-foreground">
                Pentru 6 persoane, o masă de 160-180cm lungime este ideală.
              </p>
              
              <h3 className="text-xl font-semibold">3. Consideră extensibilitatea</h3>
              <p className="text-muted-foreground">
                Mesele extensibile sunt perfecte pentru ocazii speciale cu mai mulți invitați.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">4. Alege materialele</h3>
              <p className="text-muted-foreground">
                Materialele rezistente la pete și ușor de curățat sunt ideale pentru familie.
              </p>
              
              <h3 className="text-xl font-semibold">5. Testează confortul</h3>
              <p className="text-muted-foreground">
                Scaunele trebuie să fie confortabile pentru mese lungi și conversații.
              </p>
              
              <h3 className="text-xl font-semibold">6. Potrivește cu decorul</h3>
              <p className="text-muted-foreground">
                Alege un stil care se integrează frumos în restul decorului casei tale.
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
              Seturi Complete de Mese și Scaune
            </h2>
            <p className="text-muted-foreground">
              Descoperă colecția noastră de seturi elegante pentru masa perfectă în familie
            </p>
          </div>
          
          {/* Product Count */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} produse găsite
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full" />
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
                  isNew={Math.random() > 0.7}
                  isOnSale={Math.random() > 0.6}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
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

export default BirouPage;