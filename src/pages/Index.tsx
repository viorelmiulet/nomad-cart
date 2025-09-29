import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopularProducts from "@/components/PopularProducts";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <section className="py-20 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-navy/70 to-brand-dark/95"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-playfair text-brand-cream">
              Produse Populare
            </h2>
            <p className="text-lg text-brand-cream/90 max-w-2xl mx-auto font-inter leading-relaxed">
              Cele mai apreciate piese de mobilier de către clienții noștri
            </p>
          </div>
          <PopularProducts />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
