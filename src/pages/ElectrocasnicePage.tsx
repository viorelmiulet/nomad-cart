import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, SortAsc, Zap, Refrigerator, Microwave, WashingMachine, Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const ElectrocasnicePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const frigiderProducts = [
    {
      id: 1,
      name: "Frigider Side by Side Samsung RS68N8941SL",
      price: 4299,
      originalPrice: 4999,
      image: "/images/electrocasnice/frigider-modern-1.webp",
      rating: 5,
      features: ["NoFrost", "Clasa A++", "617L", "Inox"],
      description: "Frigider Side by Side cu design modern și tehnologie avansată"
    },
    {
      id: 2,
      name: "Combină frigorifică LG GBB92STAXP",
      price: 3199,
      originalPrice: 3699,
      image: "/images/electrocasnice/frigider-modern-2.webp",
      rating: 4,
      features: ["NoFrost", "Clasa A+++", "384L", "Inox"],
      description: "Combină frigorifică cu eficiență energetică maximă"
    },
    {
      id: 3,
      name: "Frigider Bosch KAD93VIFP Serie 6",
      price: 5499,
      originalPrice: 6199,
      image: "/images/electrocasnice/frigider-inox.webp",
      rating: 5,
      features: ["NoFrost", "Clasa A++", "522L", "VitaFresh"],
      description: "Frigider premium cu sistem VitaFresh pentru păstrarea prospețimii"
    },
    {
      id: 4,
      name: "Combină frigorifică Whirlpool W7 821I W",
      price: 2899,
      originalPrice: 3299,
      image: "/images/electrocasnice/frigider-alb.webp",
      rating: 4,
      features: ["NoFrost", "Clasa A++", "338L", "Alb"],
      description: "Combină frigorifică elegantă cu design clasic alb"
    },
    {
      id: 5,
      name: "Frigider Liebherr CNPel 4813",
      price: 6299,
      originalPrice: 7199,
      image: "/images/electrocasnice/frigider-3.webp",
      rating: 5,
      features: ["BioFresh", "Clasa A+++", "344L", "Premium"],
      description: "Frigider premium cu tehnologie BioFresh pentru păstrarea optimă"
    },
    {
      id: 6,
      name: "Combină frigorifică Gorenje NRK6192AXL4",
      price: 2199,
      originalPrice: 2599,
      image: "/images/electrocasnice/frigider-5.webp",
      rating: 4,
      features: ["NoFrost", "Clasa A++", "302L", "Inox"],
      description: "Combină frigorifică cu raport calitate-preț excelent"
    }
  ];

  const categories = [
    {
      name: "Frigidere",
      icon: Refrigerator,
      description: "Frigidere și combine frigorifice moderne",
      count: frigiderProducts.length
    },
    {
      name: "Cuptoare cu microunde",
      icon: Microwave,
      description: "Cuptoare cu microunde și echipamente de gătit",
      count: 0
    },
    {
      name: "Mașini de spălat",
      icon: WashingMachine,
      description: "Mașini de spălat rufe și uscătoare",
      count: 0
    },
    {
      name: "Electrocasnice mici",
      icon: Zap,
      description: "Aspiratoare, cafetiere și alte aparate",
      count: 0
    }
  ];

  const handleAddToCart = (product: any) => {
    toast({
      title: "Adăugat în coș",
      description: `${product.name} a fost adăugat în coșul de cumpărături.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-navy/70 to-brand-dark/95"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="border-brand-gold/50 text-brand-cream hover:bg-brand-gold/10 hover:border-brand-gold/70"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Înapoi la Home
              </Button>
              
              <h1 className="text-3xl lg:text-4xl font-bold font-playfair text-brand-cream">
                Electrocasnice
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Button
                onClick={handleFilter}
                variant="outline" 
                className="border-brand-gold/50 text-brand-cream hover:bg-brand-gold/10 hover:border-brand-gold/70"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtre
              </Button>
              
              <Button
                onClick={handleSort}
                variant="outline"
                className="border-brand-gold/50 text-brand-cream hover:bg-brand-gold/10 hover:border-brand-gold/70"
              >
                <SortAsc className="h-4 w-4 mr-2" />
                Sortare
              </Button>
            </div>
          </div>
          
          <div className="text-center mb-16">
            <p className="text-lg text-brand-cream/90 max-w-3xl mx-auto font-inter leading-relaxed">
              Electrocasnice moderne și eficiente pentru casa ta. De la frigidere energy-efficient 
              la aparate de gătit de înaltă performanță - totul pentru o casă inteligentă.
            </p>
          </div>

          {/* Categories Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-brand-cream mb-8 text-center font-playfair">
              Categorii Electrocasnice
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isSelected = selectedCategory === category.name;
                return (
                  <div 
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`bg-glass-gradient backdrop-blur-lg border rounded-xl p-6 text-center transition-all duration-300 cursor-pointer group ${
                      isSelected 
                        ? 'border-brand-gold bg-brand-gold/10' 
                        : 'border-white/20 hover:border-brand-gold/50'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${
                      isSelected 
                        ? 'bg-brand-gold/40' 
                        : 'bg-brand-gold/20 group-hover:bg-brand-gold/30'
                    }`}>
                      <IconComponent className="h-8 w-8 text-brand-gold" />
                    </div>
                    <h3 className="text-lg font-semibold text-brand-cream mb-2">
                      {category.name}
                    </h3>
                    <p className="text-brand-cream/70 text-sm mb-2">
                      {category.description}
                    </p>
                    {category.count > 0 && (
                      <span className="inline-block bg-brand-gold/20 text-brand-gold px-2 py-1 rounded-full text-xs">
                        {category.count} produse
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Products Section */}
          {selectedCategory === "Frigidere" ? (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-brand-cream font-playfair">
                  Frigidere și Combine Frigorifice
                </h2>
                <Button
                  onClick={() => setSelectedCategory(null)}
                  variant="outline"
                  className="border-brand-gold/50 text-brand-cream hover:bg-brand-gold/10"
                >
                  Toate categoriile
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {frigiderProducts.map((product) => (
                  <div key={product.id} className="bg-glass-gradient backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden hover:border-brand-gold/50 transition-all duration-300 group shadow-2xl">
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {product.originalPrice > product.price && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-brand-cream mb-2 leading-tight">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < product.rating ? "text-yellow-400 fill-current" : "text-gray-400"
                            }`}
                          />
                        ))}
                        <span className="text-brand-cream/70 text-sm ml-2">({product.rating}/5)</span>
                      </div>
                      
                      <p className="text-brand-cream/80 text-sm mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.features.map((feature, index) => (
                          <span 
                            key={index}
                            className="bg-brand-gold/20 text-brand-gold px-2 py-1 rounded-full text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-brand-gold">
                            {product.price.toLocaleString("ro-RO")} Lei
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-brand-cream/50 line-through text-sm">
                              {product.originalPrice.toLocaleString("ro-RO")} Lei
                            </span>
                          )}
                        </div>
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-semibold px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Cumpără
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="col-span-full text-center py-12">
                <p className="text-brand-cream/70 text-lg">
                  {selectedCategory ?
                    `Produsele pentru categoria "${selectedCategory}" vor fi afișate în curând` :
                    "Selectează o categorie pentru a vedea produsele disponibile"
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ElectrocasnicePage;