import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartDrawer from "./CartDrawer";
import SearchDialog from "./SearchDialog";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleNavClick = (section: string) => {
    toast({
      title: `Navigare către ${section}`,
      description: `Secțiunea ${section} se va deschide în curând.`,
    });
  };

  const handleMobileMenu = () => {
    toast({
      title: "Meniu mobil",
      description: "Meniul mobil se va deschide în curând.",
    });
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-hero-gradient backdrop-blur-xl border-b border-luxury-gold/20 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark/90 via-luxury-navy/70 to-luxury-dark/95"></div>
      <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
      <div className="container flex h-14 md:h-16 items-center justify-between relative z-10 px-4">
        <button 
          onClick={handleHomeClick}
          className="flex items-center space-x-2 md:space-x-3 relative z-10 hover:scale-105 transition-transform duration-200"
        >
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-glass-gradient backdrop-blur-lg flex items-center justify-center shadow-xl border border-white/20 animate-glass-float">
            <span className="text-luxury-gold font-bold text-base md:text-lg font-playfair drop-shadow-lg">F</span>
          </div>
          <span className="text-xl md:text-2xl font-bold font-playfair text-luxury-gold drop-shadow-lg">
            FurniLux
          </span>
        </button>
        
        
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium font-inter relative z-10">
          <button onClick={() => handleNavClick("Mobilier")} className="text-white/80 hover:text-luxury-gold transition-all duration-300 relative group">
            Mobilier
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
          </button>
          <button onClick={() => handleNavClick("Mobilier Tapitat")} className="text-white/80 hover:text-luxury-gold transition-all duration-300 relative group">
            Mobilier Tapitat
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
          </button>
          <button onClick={() => handleNavClick("Camera de zi")} className="text-white/80 hover:text-luxury-gold transition-all duration-300 relative group">
            Camera de zi
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
          </button>
          <button onClick={() => handleNavClick("Dormitor")} className="text-white/80 hover:text-luxury-gold transition-all duration-300 relative group">
            Dormitor
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
          </button>
          <button onClick={() => handleNavClick("Bucătărie")} className="text-white/80 hover:text-luxury-gold transition-all duration-300 relative group">
            Bucătărie
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
          </button>
          <button onClick={() => handleNavClick("Hol")} className="text-white/80 hover:text-luxury-gold transition-all duration-300 relative group">
            Hol
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
          </button>
          <button onClick={() => handleNavClick("Birou de acasă")} className="text-white/80 hover:text-luxury-gold transition-all duration-300 relative group">
            Birou de acasă
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
          </button>
          <button onClick={() => handleNavClick("Inspirații")} className="text-white/80 hover:text-luxury-gold transition-all duration-300 relative group">
            Inspirații
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
          </button>
        </nav>

        <div className="flex items-center space-x-2 md:space-x-4 relative z-10">
          <SearchDialog />
          
          <CartDrawer />
          
          <Button 
            size="icon" 
            variant="ghost" 
            className="md:hidden h-10 w-10 md:h-12 md:w-12 bg-glass-gradient backdrop-blur-lg border border-white/20 rounded-lg md:rounded-xl"
            onClick={handleMobileMenu}
          >
            <Menu className="h-4 w-4 md:h-5 md:w-5 text-white/80" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;