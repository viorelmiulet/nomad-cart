import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartDrawer from "./CartDrawer";
import SearchDialog from "./SearchDialog";
import { toast } from "@/hooks/use-toast";

const Header = () => {
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

  return (
    <header className="sticky top-0 z-50 w-full bg-glass-gradient backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="container flex h-20 items-center relative">
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
        <div className="mr-8 flex items-center space-x-3 relative z-10">
          <div className="h-10 w-10 rounded-xl bg-glass-gradient backdrop-blur-lg flex items-center justify-center shadow-xl border border-white/20 animate-glass-float">
            <span className="text-luxury-gold font-bold text-lg font-playfair drop-shadow-lg">F</span>
          </div>
          <span className="text-2xl font-bold font-playfair bg-luxury-gradient bg-clip-text text-transparent drop-shadow-lg">
            FurniLux
          </span>
        </div>
        
        
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

        <div className="flex flex-1 items-center justify-end space-x-4 relative z-10">
          <SearchDialog />
          
          <CartDrawer />
          
          <Button 
            size="icon" 
            variant="ghost" 
            className="md:hidden h-12 w-12 bg-glass-gradient backdrop-blur-lg border border-white/20 rounded-xl"
            onClick={handleMobileMenu}
          >
            <Menu className="h-5 w-5 text-white/80" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;