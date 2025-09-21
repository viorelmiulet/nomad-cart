import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
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
        
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium font-inter relative z-10">
          <a href="#" className="text-white/80 hover:text-luxury-gold transition-all duration-300 relative group">
            Living
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
          </a>
          <a href="#" className="text-white/80 hover:text-luxury-gold transition-all duration-300 relative group">
            Dormitor
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
          </a>
          <a href="#" className="text-white/80 hover:text-luxury-gold transition-all duration-300 relative group">
            Bucătărie
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
          </a>
          <a href="#" className="text-white/80 hover:text-luxury-gold transition-all duration-300 relative group">
            Colecții Premium
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
          </a>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4 relative z-10">
          <div className="hidden md:flex items-center space-x-2 w-96">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-3 h-4 w-4 text-white/60 z-10" />
              <Input
                placeholder="Caută mobilier de lux..."
                className="pl-10 h-12 bg-glass-gradient backdrop-blur-lg border border-white/20 text-white placeholder:text-white/60 focus:border-luxury-gold/50 focus:ring-1 focus:ring-luxury-gold/30 rounded-xl"
              />
              <div className="absolute inset-0 bg-liquid-gradient opacity-20 rounded-xl group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
          </div>
          
          <Button size="icon" variant="ghost" className="relative h-12 w-12 bg-glass-gradient backdrop-blur-lg border border-white/20 hover:bg-white/10 rounded-xl group">
            <ShoppingCart className="h-5 w-5 text-white/80 group-hover:text-luxury-gold transition-colors" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-luxury-gradient text-xs font-bold rounded-full flex items-center justify-center text-luxury-dark shadow-lg border border-white/30">
              0
            </span>
          </Button>
          
          <Button size="icon" variant="ghost" className="md:hidden h-12 w-12 bg-glass-gradient backdrop-blur-lg border border-white/20 rounded-xl">
            <Menu className="h-5 w-5 text-white/80" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;