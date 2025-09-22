import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Eye, Heart, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Import category images
import categoryLiving from "@/assets/category-living.jpg";
import categoryBedroom from "@/assets/category-bedroom.jpg";
import categoryKitchen from "@/assets/category-kitchen.jpg";

const InspiratiiPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const handleInspirationClick = (title: string) => {
    toast({
      title: "Inspirație selectată",
      description: `Vizualizezi: ${title}`,
    });
  };

  const inspirations = [
    {
      id: 1,
      title: "Living Modern Elegant",
      description: "Combinația perfectă între confort și eleganță. Tonuri neutre cu accente de aur.",
      image: categoryLiving,
      category: "Camera de zi",
      likes: 124,
      views: 2840
    },
    {
      id: 2,
      title: "Dormitor de Lux",
      description: "Spațiu intim și luxos cu mobilier premium și iluminare ambientală.",
      image: categoryBedroom,
      category: "Dormitor", 
      likes: 98,
      views: 1950
    },
    {
      id: 3,
      title: "Bucătărie Premium",
      description: "Design funcțional cu finisaje de înaltă calitate și electrodomestice integrate.",
      image: categoryKitchen,
      category: "Bucătărie",
      likes: 87,
      views: 1650
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark/90 via-luxury-navy/70 to-luxury-dark/95"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center space-x-4 mb-16">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10 hover:border-luxury-gold/70"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Înapoi la Home
            </Button>
            
            <h1 className="text-3xl lg:text-4xl font-bold font-playfair text-luxury-cream">
              Inspirații Design
            </h1>
          </div>
          
          <div className="text-center mb-16">
            <p className="text-lg text-luxury-cream/90 max-w-3xl mx-auto font-inter leading-relaxed">
              Descoperă idei și tendințe în designul interior. Inspiră-te din proiectele noastre 
              și creează-ți casa de vis cu mobilierul premium FurniLux.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inspirations.map((inspiration) => (
              <Card 
                key={inspiration.id}
                className="bg-glass-gradient backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-luxury-gold/20 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group"
                onClick={() => handleInspirationClick(inspiration.title)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={inspiration.image} 
                    alt={inspiration.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-luxury-gradient text-luxury-dark px-3 py-1 rounded-full text-sm font-semibold">
                    {inspiration.category}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-luxury-cream mb-3 font-playfair group-hover:text-luxury-gold transition-colors">
                    {inspiration.title}
                  </h3>
                  <p className="text-luxury-cream/80 font-inter mb-4 leading-relaxed">
                    {inspiration.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-luxury-cream/60">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">{inspiration.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{inspiration.likes}</span>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-luxury-cream/60 hover:text-luxury-gold"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast({
                          title: "Inspirație partajată",
                          description: "Link-ul a fost copiat în clipboard.",
                        });
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InspiratiiPage;