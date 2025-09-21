import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-luxury-gold/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center">
        <div className="mr-8 flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-luxury-gradient flex items-center justify-center shadow-lg">
            <span className="text-luxury-dark font-bold text-lg font-playfair">F</span>
          </div>
          <span className="text-2xl font-bold font-playfair bg-luxury-gradient bg-clip-text text-transparent">
            FurniLux
          </span>
        </div>
        
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium font-inter">
          <a href="#" className="text-foreground/70 hover:text-luxury-gold transition-colors duration-300 relative group">
            Living
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-luxury-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a href="#" className="text-foreground/70 hover:text-luxury-gold transition-colors duration-300 relative group">
            Dormitor
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-luxury-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a href="#" className="text-foreground/70 hover:text-luxury-gold transition-colors duration-300 relative group">
            Bucătărie
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-luxury-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a href="#" className="text-foreground/70 hover:text-luxury-gold transition-colors duration-300 relative group">
            Colecții Premium
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-luxury-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-2 w-96">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Caută mobilier de lux..."
                className="pl-10 h-12 border-luxury-gold/20 focus:border-luxury-gold bg-luxury-cream/50"
              />
            </div>
          </div>
          
          <Button size="icon" variant="ghost" className="relative h-12 w-12 hover:bg-luxury-gold/10">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-luxury-gradient text-xs font-bold rounded-full flex items-center justify-center text-luxury-dark">
              0
            </span>
          </Button>
          
          <Button size="icon" variant="ghost" className="md:hidden h-12 w-12">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;