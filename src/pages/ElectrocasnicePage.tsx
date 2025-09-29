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
      name: "Combina frigorifica Heinner HC-HM260BKWDE++",
      price: 1149,
      originalPrice: null,
      image: "/images/electrocasnice/heinner-hc-hm260bkwde.webp",
      rating: 4,
      features: ["Clasa E", "260L", "Dozator apa", "LED", "Usi reversibile"],
      description: "Combină frigorifică cu dozator de apă și iluminare LED, înălțime 180cm, culoare negru"
    },
    {
      id: 2,
      name: "Combina frigorifica Heinner HC-HS269SE++",
      price: 1099,
      originalPrice: null,
      image: "/images/electrocasnice/heinner-hc-hs269se.webp",
      rating: 4,
      features: ["Clasa E", "269L", "LED", "Usi reversibile", "Argintiu"],
      description: "Combină frigorifică cu design elegant argintiu și iluminare LED, înălțime 180cm"
    },
    {
      id: 3,
      name: "Combina frigorifica Heinner HC-HS268WDE++",
      price: 1145,
      originalPrice: null,
      image: "/images/electrocasnice/heinner-hc-hs268wde.webp",
      rating: 4,
      features: ["Clasa E", "268L", "Dozator apa", "LED", "Alb"],
      description: "Combină frigorifică albă cu dozator de apă și iluminare LED, înălțime 180cm"
    },
    {
      id: 4,
      name: "Combina frigorifica Beko RCSA406K40DWN",
      price: 1899,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-alb.webp",
      rating: 4,
      features: ["Clasa E", "386L", "Dozator apa", "Alb"],
      description: "Combină frigorifică Beko cu capacitate mare de 386L și dozator de apă"
    },
    {
      id: 5,
      name: "Combina frigorifica Electrolux LNT7ME36G2",
      price: 3896,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-modern-1.webp",
      rating: 5,
      features: ["No Frost", "Clasa E", "366L", "Multi Flow", "LED"],
      description: "Combină frigorifică Electrolux cu sistem No Frost și control electronic"
    },
    {
      id: 6,
      name: "Combina frigorifica Candy CCE3T618EW",
      price: 1599,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-modern-2.webp",
      rating: 4,
      features: ["No Frost", "Clasa E", "341L", "Alb"],
      description: "Combină frigorifică Candy cu sistem No Frost și design modern alb"
    },
    {
      id: 7,
      name: "Bosch Combina frigorifica Serie 6 KGE36AWCA",
      price: 3171,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-inox.webp",
      rating: 5,
      features: ["Low Frost", "Clasa C", "302L", "VitaFresh", "LED"],
      description: "Combină frigorifică Bosch cu tehnologie VitaFresh și BigBox"
    },
    {
      id: 8,
      name: "Combina frigorifica Liebherr CUele231-26",
      price: 2399,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-3.webp",
      rating: 5,
      features: ["Clasa E", "210L", "VarioSpace", "SmartFrost", "Inox"],
      description: "Combină frigorifică Liebherr cu tehnologie SmartFrost și design compact"
    },
    {
      id: 9,
      name: "Combina frigorifica Heinner HC-HS269E++",
      price: 1339,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-5.webp",
      rating: 4,
      features: ["Clasa E", "269L", "Control mecanic", "LED", "Alb"],
      description: "Combină frigorifică cu control mecanic și iluminare LED, înălțime 180cm"
    },
    {
      id: 10,
      name: "Combina frigorifica Heinner HC-HM262BKE++",
      price: 1099,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-6.webp",
      rating: 4,
      features: ["Clasa E", "262L", "LED", "Usi reversibile", "Negru"],
      description: "Combină frigorifică neagră cu iluminare LED și uși reversibile"
    },
    {
      id: 11,
      name: "Combina frigorifica Candy CCT3L517EB",
      price: 1522,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-modern-1.webp",
      rating: 4,
      features: ["Low Frost", "Clasa E", "260L", "Negru"],
      description: "Combină frigorifică Candy cu sistem Low Frost și design negru elegant"
    },
    {
      id: 12,
      name: "Samus Combina frigorifica Albatros CF333E",
      price: 1369,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-alb.webp",
      rating: 4,
      features: ["Clasa E", "248L", "LED", "Usi reversibile", "Alb"],
      description: "Combină frigorifică cu termostat reglabil și picioare reglabile"
    },
    {
      id: 13,
      name: "Combina frigorifica Arctic AK54305M40S",
      price: 1397,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-inox.webp",
      rating: 4,
      features: ["Clasa E", "291L", "Garden Fresh", "Mix Zone", "Argintiu"],
      description: "Combină frigorifică Arctic cu tehnologie Garden Fresh și Mix Zone"
    },
    {
      id: 14,
      name: "Combina Frigorifica Samus SCX357NFDE",
      price: 1493,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-inox.webp",
      rating: 4,
      features: ["Full No-Frost", "Clasa E", "251L", "Dozator apa", "Inox"],
      description: "Combină frigorifică cu sistem Full No-Frost și dozator de apă"
    },
    {
      id: 15,
      name: "Combina frigorifica Arctic AK54305M40W",
      price: 1364,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-alb.webp",
      rating: 4,
      features: ["Clasa E", "291L", "Garden Fresh", "Mix Zone", "Alb"],
      description: "Combină frigorifică Arctic albă cu tehnologie Garden Fresh"
    },
    {
      id: 16,
      name: "Combina frigorifica Beko RCSA406K40DXBN",
      price: 2032,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-inox.webp",
      rating: 4,
      features: ["Clasa A++", "386L", "Dozator apa", "Argintiu"],
      description: "Combină frigorifică Beko premium cu clasa energetică A++"
    },
    {
      id: 17,
      name: "Combina Frigorifica Samus SCX338E",
      price: 1299,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-alb.webp",
      rating: 4,
      features: ["Clasa E", "248L", "Termostat reglabil", "4 sertare", "Alb"],
      description: "Combină frigorifică cu dezghețare automată frigider și 4 sertare congelator"
    },
    {
      id: 18,
      name: "Combina frigorifica Albalux AXCFS350E",
      price: 1162,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-inox.webp",
      rating: 4,
      features: ["Clasa E", "262L", "LED", "Usi reversibile", "Inox"],
      description: "Combină frigorifică cu iluminare LED și uși reversibile"
    },
    {
      id: 19,
      name: "Heinner Combina frigorifica Fram FC-VRL2681RDE++",
      price: 1632,
      originalPrice: null,
      image: "/images/electrocasnice/frigider-modern-2.webp",
      rating: 4,
      features: ["Less Frost", "Clasa E", "268L", "LED", "Rosu"],
      description: "Combină frigorifică cu design unic roșu și sistem Less Frost"
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