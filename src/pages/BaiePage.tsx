import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { 
  Bath, 
  ScanEye, 
  Archive, 
  Droplets, 
  ArrowRight, 
  Lightbulb,
  Wind,
  Shield 
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  description: string | null;
}

const BaiePage = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState("toate");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const subcategories = [
    { id: "toate", name: "Toate Produsele", icon: Bath },
    { id: "mobilier", name: "Mobilier Baie", icon: Archive },
    { id: "oglinzi", name: "Oglinzi", icon: ScanEye },
    { id: "accesorii", name: "Accesorii", icon: Droplets },
  ];

  useEffect(() => {
    // For now, we'll show a placeholder since there are no bathroom products in the database
    // In the future, this would fetch actual bathroom furniture
    setLoading(false);
    setProducts([]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gradient-to-br from-blue-900 via-teal-800 to-blue-900">
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white font-playfair">
              Mobilier pentru Baie
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 font-inter">
              Transformă baia într-un spațiu de relaxare și funcționalitate maximă
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-semibold"
              >
                Explorează Mobilierul <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Oglinzi & Accesorii
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
              De ce să investești în mobilier de baie de calitate?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              O baie bine amenajată îți îmbunătățește rutina zilnică și adaugă valoare casei tale
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rezistență la Apă</h3>
              <p className="text-muted-foreground">
                Materiale special tratate pentru medii umede și căldură.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Archive className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Depozitare Inteligentă</h3>
              <p className="text-muted-foreground">
                Soluții de organizare pentru toate produsele de îngrijire.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Iluminare Optimă</h3>
              <p className="text-muted-foreground">
                Oglinzi cu iluminare LED pentru o vizibilitate perfectă.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wind className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ventilație</h3>
              <p className="text-muted-foreground">
                Design care permite circulația aerului pentru uscare rapidă.
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
              Cum să îți amenajezi baia perfect
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">1. Măsoară spațiul cu atenție</h3>
              <p className="text-muted-foreground">
                Planifică dimensiunile mobilierului în funcție de spațiul disponibil.
              </p>
              
              <h3 className="text-xl font-semibold">2. Alege materiale rezistente</h3>
              <p className="text-muted-foreground">
                Preferă materialele tratate anticorozive și rezistente la umiditate.
              </p>
              
              <h3 className="text-xl font-semibold">3. Organizează vertical</h3>
              <p className="text-muted-foreground">
                Folosește rafturile înalte pentru a maximiza spațiul de depozitare.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">4. Investește în iluminare</h3>
              <p className="text-muted-foreground">
                Oglinzile cu LED oferă o lumină uniformă pentru îngrijirea zilnică.
              </p>
              
              <h3 className="text-xl font-semibold">5. Gândește la siguranță</h3>
              <p className="text-muted-foreground">
                Alege produse cu colțuri rotunjite și suprafețe antiderapante.
              </p>
              
              <h3 className="text-xl font-semibold">6. Coordonează stilul</h3>
              <p className="text-muted-foreground">
                Menține o paletă de culori coerentă cu restul casei.
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
              Mobilier și Accesorii pentru Baie
            </h2>
            <p className="text-muted-foreground">
              În curând vei putea descoperi colecția noastră de mobilier pentru baie
            </p>
          </div>

          {/* Placeholder for products */}
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Bath className="h-12 w-12 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-lg mb-4">
              Colecția de mobilier pentru baie va fi disponibilă în curând!
            </p>
            <p className="text-sm text-muted-foreground">
              Vom adăuga în curând o gamă completă de mobilier pentru baie, oglinzi și accesorii.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BaiePage;