import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { ChevronDown, Bed, Armchair, ShoppingBag, ArrowRight } from "lucide-react";
import categoryBedroom from "@/assets/category-bedroom.jpg";

const DormitorCompletPage = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState("toate");

  const subcategories = [
    { id: "toate", name: "Toate Produsele", icon: ShoppingBag },
    { id: "seturi", name: "Seturi Dormitor", icon: Bed },
    { id: "paturi", name: "Paturi Matrimoniale", icon: Bed },
    { id: "dulapuri", name: "Dulapuri XXL", icon: Armchair },
    { id: "comode", name: "Comode cu Oglindă", icon: Armchair },
    { id: "masute", name: "Măsuțe Toaletă", icon: Armchair },
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
              Dormitor Complet
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
              De ce să alegi un dormitor complet?
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
              Mobilier pentru Dormitor Complet
            </h2>
            <p className="text-muted-foreground">
              Descoperă colecția noastră de mobilier pentru un dormitor complet și armonios
            </p>
          </div>
          <ProductGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DormitorCompletPage;