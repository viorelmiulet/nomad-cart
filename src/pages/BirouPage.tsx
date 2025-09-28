import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Monitor, Armchair, BookOpen, Archive, Briefcase, ArrowRight, Users, Clock, TrendingUp } from "lucide-react";

const BirouPage = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState("toate");

  const subcategories = [
    { id: "toate", name: "Toate Produsele", icon: Briefcase },
    { id: "birouri", name: "Birouri", icon: Monitor },
    { id: "scaune", name: "Scaune Birou", icon: Armchair },
    { id: "biblioteci", name: "Biblioteci", icon: BookOpen },
    { id: "dulapuri", name: "Dulapuri Birou", icon: Archive },
    { id: "accesorii", name: "Accesorii Birou", icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white font-playfair">
              Birou de Acasă
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 font-inter">
              Creează spațiul de lucru perfect pentru productivitate maximă și confort zilnic
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-semibold"
              >
                Explorează Birourile <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Scaune Ergonomice
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
              Munca de acasă în cifre
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              De ce investiția într-un birou de calitate este esențială pentru succesul tău
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-blue-600">+35%</h3>
              <p className="text-muted-foreground">
                Creșterea productivității cu un spațiu de lucru organizat
              </p>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-green-600">8 ore/zi</h3>
              <p className="text-muted-foreground">
                Timpul mediu petrecut la birou - confortul este esențial
              </p>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-purple-600">60%</h3>
              <p className="text-muted-foreground">
                Din români lucrează de acasă cel puțin o parte din timp
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
              De ce să investești într-un birou de calitate?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un spațiu de lucru bine amenajat îți transformă întreaga experiență profesională
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Productivitate</h3>
              <p className="text-muted-foreground">
                Un spațiu organizat îți crește eficiența și concentrarea.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Armchair className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ergonomie</h3>
              <p className="text-muted-foreground">
                Mobilier ergonomic pentru confort pe termen lung și sănătate.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Organizare</h3>
              <p className="text-muted-foreground">
                Sisteme de depozitare inteligente pentru tot ce ai nevoie.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Profesionalism</h3>
              <p className="text-muted-foreground">
                Un decor profesional pentru meetingurile online.
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
              Cum să îți amenajezi biroul perfect
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">1. Alege locația potrivită</h3>
              <p className="text-muted-foreground">
                Preferă o zonă cu lumină naturală, departe de distracții și zgomot.
              </p>
              
              <h3 className="text-xl font-semibold">2. Investește în ergonomie</h3>
              <p className="text-muted-foreground">
                Un scaun bun și un birou la înălțimea corectă sunt esențiale pentru sănătate.
              </p>
              
              <h3 className="text-xl font-semibold">3. Organizează cablurile</h3>
              <p className="text-muted-foreground">
                Folosește soluții de management al cablurilor pentru un aspect curat.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">4. Adaugă depozitare</h3>
              <p className="text-muted-foreground">
                Rafturi, sertare și organizatoare îți mențin spațiul ordonat.
              </p>
              
              <h3 className="text-xl font-semibold">5. Personalizează</h3>
              <p className="text-muted-foreground">
                Adaugă plante, fotografii sau obiecte care te inspiră.
              </p>
              
              <h3 className="text-xl font-semibold">6. Gândește la iluminat</h3>
              <p className="text-muted-foreground">
                O lampă de birou bună reduce oboseala ochilor și crește confortul.
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
              Mobilier pentru Birou de Acasă
            </h2>
            <p className="text-muted-foreground">
              Descoperă colecția noastră de mobilier profesional pentru casa ta
            </p>
          </div>
          <ProductGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BirouPage;