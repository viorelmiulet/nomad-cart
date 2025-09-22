import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MobileMenuProps {
  onNavClick: (section: string) => void;
}

const MobileMenu = ({ onNavClick }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (section: string) => {
    onNavClick(section);
    setIsOpen(false);
  };

  const menuItems = [
    "Mobilier",
    "Mobilier Tapitat", 
    "Camera de zi",
    "Dormitor",
    "Bucătărie",
    "Hol",
    "Inspirații"
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          size="icon" 
          variant="ghost" 
          className="md:hidden h-10 w-10 bg-glass-gradient backdrop-blur-lg border border-white/20 rounded-lg text-white/80 hover:text-luxury-gold hover:bg-white/10 transition-all duration-300 shadow-lg"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-80 bg-hero-gradient backdrop-blur-xl border-r border-luxury-gold/30 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark/90 via-luxury-navy/70 to-luxury-dark/95"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
        
        <SheetHeader className="relative z-10 pb-8">
          <SheetTitle className="text-2xl font-bold font-playfair bg-luxury-gradient bg-clip-text text-transparent">
            FurniLux Menu
          </SheetTitle>
        </SheetHeader>
        
        <nav className="relative z-10 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="w-full text-left p-4 bg-glass-gradient backdrop-blur-lg border border-white/10 hover:bg-white/10 rounded-xl transition-all duration-300 group shadow-lg text-luxury-cream hover:text-luxury-gold font-inter relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-liquid-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative z-10 font-medium">{item}</span>
            </button>
          ))}
          
          <div className="pt-8 space-y-4">
            <button
              onClick={() => {
                toast({
                  title: "Contact",
                  description: "Suntem disponibili pentru tine 24/7!",
                });
                setIsOpen(false);
              }}
              className="w-full p-4 bg-luxury-gradient text-luxury-dark rounded-xl transition-all duration-300 font-semibold shadow-xl hover:opacity-90 transform hover:scale-[1.02]"
            >
              Contact
            </button>
            
            <button
              onClick={() => {
                toast({
                  title: "Showroom",
                  description: "Vizitează showroom-ul nostru premium din Herăstrău!",
                });
                setIsOpen(false);
              }}
              className="w-full p-4 border-2 border-luxury-gold/50 bg-glass-gradient backdrop-blur-lg text-luxury-cream hover:bg-white/10 hover:border-luxury-gold/70 rounded-xl transition-all duration-300 font-semibold"
            >
              Showroom
            </button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;