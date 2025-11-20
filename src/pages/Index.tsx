import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopularProducts from "@/components/PopularProducts";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleViewAllProducts = () => {
    navigate("/toate-produsele");
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <section className="py-16 md:py-20 bg-muted/30" aria-labelledby="popular-products-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h2 id="popular-products-heading" className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Produse Populare
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cele mai apreciate piese de mobilier de către clienții noștri
            </p>
          </header>
          <PopularProducts />
          <div className="text-center mt-12">
            <Button 
              onClick={handleViewAllProducts}
              className="bg-primary text-primary-foreground px-8 py-3 h-12 text-base font-semibold hover:opacity-90 transition-opacity"
              aria-label="Vezi toate produsele din magazin"
            >
              Vezi Toate Produsele
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Index;
