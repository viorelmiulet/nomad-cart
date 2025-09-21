import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-6 flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-tech-gradient flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-bold bg-tech-gradient bg-clip-text text-transparent">
            MobileMart
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
            Telefoane
          </a>
          <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
            Accesorii
          </a>
          <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
            Oferte
          </a>
          <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-2 w-96">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Caută telefoane..."
                className="pl-8"
              />
            </div>
          </div>
          
          <Button size="icon" variant="ghost" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent-cyan text-xs font-bold rounded-full flex items-center justify-center text-white">
              0
            </span>
          </Button>
          
          <Button size="icon" variant="ghost" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;