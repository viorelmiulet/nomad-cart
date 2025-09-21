import Header from "@/components/Header";
import BenefitsBar from "@/components/BenefitsBar";
import Hero from "@/components/Hero";
import RoomsSection from "@/components/RoomsSection";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <BenefitsBar />
      <Header />
      <Hero />
      <RoomsSection />
      <ProductGrid />
      <Footer />
    </div>
  );
};

export default Index;
