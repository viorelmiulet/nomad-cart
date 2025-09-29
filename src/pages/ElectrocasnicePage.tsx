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
      name: "Combina frigorifica Samsung RB38C775CB1/EF",
      price: 4199,
      originalPrice: null,
      image: "/images/electrocasnice/samsung-rb38c775cb1-ef-real.webp",
      rating: 5,
      features: ["No Frost", "387L", "H 203cm", "Clasa E", "SpaceMax"],
      description: "Combină frigorifică Samsung premium cu tehnologie SpaceMax și AI Energy Mode"
    },
    {
      id: 2,
      name: "Combina frigorifica Beko RCNA406E40ZXBRN",
      price: 2899,
      originalPrice: 3199,
      image: "/images/electrocasnice/beko-rcna406e40zxbrn-real.webp",
      rating: 4,
      features: ["NeoFrost", "386L", "H 203cm", "Clasa E", "Argintiu"],
      description: "Combină frigorifică Beko cu tehnologie NeoFrost și capacitate mare"
    },
    {
      id: 3,
      name: "Combina frigorifica LG GBB92STBAP",
      price: 3699,
      originalPrice: null,
      image: "/images/electrocasnice/lg-gbb92stbap-real.webp",
      rating: 5,
      features: ["Total No Frost", "384L", "H 203cm", "Clasa A", "Door Cooling"],
      description: "Combină frigorifică LG cu tehnologie Door Cooling și eficiență energetică clasa A"
    },
    {
      id: 4,
      name: "Combina frigorifica Arctic AK60366M40MT",
      price: 1899,
      originalPrice: 2299,
      image: "/images/electrocasnice/arctic-ak60366m40mt-real.webp",
      rating: 4,
      features: ["Multi Air Flow", "362L", "H 185cm", "Clasa E", "Alb"],
      description: "Combină frigorifică Arctic cu sistem Multi Air Flow și design modern"
    },
    {
      id: 5,
      name: "Combina frigorifica Heinner HC-V336XA+",
      price: 1599,
      originalPrice: 1899,
      image: "/images/electrocasnice/heinner-hc-v336xa-real.webp",
      rating: 4,
      features: ["No Frost", "336L", "H 185cm", "Clasa E", "Inox"],
      description: "Combină frigorifică Heinner cu sistem No Frost și finisaj inox elegant"
    },
    {
      id: 6,
      name: "Combina frigorifica Whirlpool W7X 93A OX",
      price: 4899,
      originalPrice: null,
      image: "/images/electrocasnice/whirlpool-w7x-93a-ox-real.webp",
      rating: 5,
      features: ["6th Sense", "368L", "H 195cm", "Clasa E", "Supreme No Frost"],
      description: "Combină frigorifică Whirlpool premium cu tehnologie 6th Sense"
    },
    {
      id: 7,
      name: "Combina frigorifica Liebherr CNPel 4813",
      price: 7299,
      originalPrice: null,
      image: "/images/electrocasnice/liebherr-cnpel-4813-real.webp",
      rating: 5,
      features: ["BioFresh", "344L", "H 201cm", "Clasa C", "Premium"],
      description: "Combină frigorifică Liebherr premium cu tehnologie BioFresh și calitate germană"
    },
    {
      id: 8,
      name: "Combina frigorifica Gorenje NRK6192AXL4",
      price: 2199,
      originalPrice: 2599,
      image: "/images/electrocasnice/lg-gbb72pzefn.webp",
      rating: 4,
      features: ["No Frost Plus", "307L", "H 185cm", "Clasa E", "Argintiu"],
      description: "Combină frigorifică Gorenje cu sistem No Frost Plus și design elegant"
    },
    {
      id: 9,
      name: "Combina frigorifica Electrolux LNT5MF36U0",
      price: 3899,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-alb-modern.webp",
      rating: 5,
      features: ["No Frost", "360L", "H 201cm", "Clasa E", "TwinTech"],
      description: "Combină frigorifică Electrolux cu tehnologie TwinTech și design scandinav"
    },
    {
      id: 10,
      name: "Combina frigorifica Candy CCBS 6182XH",
      price: 1699,
      originalPrice: 1999,
      image: "/images/electrocasnice/frigider-alb-candy.webp",
      rating: 4,
      features: ["No Frost", "307L", "H 185cm", "Clasa E", "Inox"],
      description: "Combină frigorifică Candy cu sistem No Frost și raport calitate-preț excelent"
    },
    {
      id: 11,
      name: "Combina frigorifica Bosch KGN39VLEB",
      price: 3299,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-alb-modern.webp",
      rating: 5,
      features: ["No Frost", "366L", "H 203cm", "Clasa E", "VitaFresh"],
      description: "Combină frigorifică Bosch cu sistem VitaFresh și tehnologie germană"
    },
    {
      id: 12,
      name: "Combina frigorifica Hotpoint HAFC8 TO32SX",
      price: 2299,
      originalPrice: 2699,
      image: "/images/electrocasnice/frigider-argintiu-modern.webp",
      rating: 4,
      features: ["No Frost", "335L", "H 189cm", "Clasa E", "Active Oxygen"],
      description: "Combină frigorifică Hotpoint cu tehnologie Active Oxygen pentru prospețime optimă"
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