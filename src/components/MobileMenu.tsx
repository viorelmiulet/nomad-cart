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
      "Bucătării": "/bucatarie",
      "Dormitoare Complete": "/dormitor-complet",
      "Electrocasnice": "/electrocasnice",
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
    "Bucătării",
    "Camera de zi",
    "Dormitor",
    "Dormitoare Complete",
    "Electrocasnice",
    "Blog"
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          size="icon" 
          variant="ghost" 
          className="md:hidden min-w-[44px] min-h-[44px] bg-glass-gradient backdrop-blur-lg border border-white/20 rounded-lg text-white/80 hover:text-brand-gold hover:bg-white/10 transition-all duration-300 shadow-lg active:scale-95 touch-manipulation"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Deschide meniul</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-[85vw] max-w-sm bg-hero-gradient backdrop-blur-xl border-r border-brand-gold/30 shadow-2xl overflow-y-auto p-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-navy/70 to-brand-dark/95"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30"></div>
        
        <div className="p-6">
          <SheetHeader className="relative z-10 pb-6">
            <SheetTitle className="text-xl font-bold font-playfair bg-brand-gradient bg-clip-text text-transparent">
              Mobila Nomad
            </SheetTitle>
          </SheetHeader>
          
          <nav className="relative z-10 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="w-full text-left p-3 bg-glass-gradient backdrop-blur-lg border border-white/10 hover:bg-white/10 rounded-lg transition-all duration-300 group shadow-lg text-brand-cream hover:text-brand-gold font-inter relative overflow-hidden touch-manipulation active:scale-95"
              >
                <div className="absolute inset-0 bg-liquid-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="relative z-10 font-medium text-sm">{item}</span>
              </button>
            ))}
            
            <div className="pt-6 space-y-3">
              {user ? (
                <>
                  <div className="p-3 bg-glass-gradient backdrop-blur-lg border border-white/10 rounded-lg text-brand-cream">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">Conectat ca:</span>
                    </div>
                    <p className="text-xs text-brand-cream/80 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full p-3 bg-red-600/80 backdrop-blur-lg border border-red-500/30 text-white rounded-lg transition-all duration-300 font-semibold shadow-xl hover:bg-red-600 active:scale-95 flex items-center justify-center space-x-2 touch-manipulation"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Deconectare</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate("/auth");
                    setIsOpen(false);
                  }}
                  className="w-full p-3 bg-glass-gradient backdrop-blur-lg border border-white/10 hover:bg-white/10 text-brand-cream rounded-lg transition-all duration-300 font-semibold shadow-xl hover:text-brand-gold active:scale-95 flex items-center justify-center space-x-2 touch-manipulation"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm">Conectare / Creare cont</span>
                </button>
              )}
              
              <button
                onClick={() => {
                  navigate("/contact");
                  setIsOpen(false);
                }}
                className="w-full p-3 bg-brand-gradient text-brand-dark rounded-lg transition-all duration-300 font-semibold shadow-xl hover:opacity-90 active:scale-95 touch-manipulation"
              >
                <span className="text-sm">Contact</span>
              </button>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;