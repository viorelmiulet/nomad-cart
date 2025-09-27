import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface MobileMenuProps {
  onNavClick: (section: string) => void;
}

const MobileMenu = ({ onNavClick }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleNavClick = (section: string) => {
    const routes: { [key: string]: string } = {
      "Acasă": "/",
      "Camera de zi": "/camera-de-zi",
      "Dormitor": "/dormitor",
      "Bucătărie": "/bucatarie",
      "Hol": "/hol",
      "Inspirații": "/inspiratii",
      "Blog": "/blog"
    };
    
    const route = routes[section];
    if (route) {
      navigate(route);
    } else {
      onNavClick(section);
    }
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    toast({
      title: "Deconectat",
      description: "V-ați deconectat cu succes.",
    });
  };

  const menuItems = [
    "Acasă",
    "Camera de zi",
    "Dormitor",
    "Bucătărie",
    "Hol",
    "Inspirații",
    "Blog"
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          size="icon" 
          variant="ghost" 
          className="md:hidden h-10 w-10 bg-glass-gradient backdrop-blur-lg border border-white/20 rounded-lg text-white/80 hover:text-brand-gold hover:bg-white/10 transition-all duration-300 shadow-lg"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-80 bg-hero-gradient backdrop-blur-xl border-r border-brand-gold/30 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-navy/70 to-brand-dark/95"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
        
        <SheetHeader className="relative z-10 pb-8">
          <SheetTitle className="text-2xl font-bold font-playfair bg-brand-gradient bg-clip-text text-transparent">
            Mobila Nomad Menu
          </SheetTitle>
        </SheetHeader>
        
        <nav className="relative z-10 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="w-full text-left p-4 bg-glass-gradient backdrop-blur-lg border border-white/10 hover:bg-white/10 rounded-xl transition-all duration-300 group shadow-lg text-brand-cream hover:text-brand-gold font-inter relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-liquid-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative z-10 font-medium">{item}</span>
            </button>
          ))}
          
          <div className="pt-8 space-y-4">
            {user ? (
              <>
                <div className="p-4 bg-glass-gradient backdrop-blur-lg border border-white/10 rounded-xl text-brand-cream">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Conectat ca:</span>
                  </div>
                  <p className="text-xs text-brand-cream/80 truncate">{user.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full p-4 bg-red-600/80 backdrop-blur-lg border border-red-500/30 text-white rounded-xl transition-all duration-300 font-semibold shadow-xl hover:bg-red-600 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Deconectare</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate("/auth");
                  setIsOpen(false);
                }}
                className="w-full p-4 bg-glass-gradient backdrop-blur-lg border border-white/10 hover:bg-white/10 text-brand-cream rounded-xl transition-all duration-300 font-semibold shadow-xl hover:text-brand-gold transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Conectare / Creare cont</span>
              </button>
            )}
            
            <button
              onClick={() => {
                navigate("/contact");
                setIsOpen(false);
              }}
              className="w-full p-4 bg-brand-gradient text-brand-dark rounded-xl transition-all duration-300 font-semibold shadow-xl hover:opacity-90 transform hover:scale-[1.02]"
            >
              Contact
            </button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;