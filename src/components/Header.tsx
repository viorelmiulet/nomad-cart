import { ShoppingCart, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartDrawer from "./CartDrawer";
import SearchDialog from "./SearchDialog";
import MobileMenu from "./MobileMenu";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import logoMobilaNomad from "@/assets/logo-mobila-nomad.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const isAdminPage = location.pathname === '/admin';

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
      toast({
        title: `Navigare către ${section}`,
        description: `Secțiunea ${section} se va deschide în curând.`,
      });
    }
  };


  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Deconectat",
      description: "V-ați deconectat cu succes.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-hero-gradient backdrop-blur-xl border-b border-brand-gold/20 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-navy/70 to-brand-dark/95"></div>
      <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
      <div className="container flex h-12 md:h-14 lg:h-16 items-center justify-between relative z-10 px-4">
        <Link
          to="/"
          className="flex items-center space-x-2 md:space-x-3 relative z-10 hover:scale-105 transition-transform duration-200 touch-manipulation"
          aria-label="Acasă"
        >
          <div className="relative bg-glass-gradient backdrop-blur-xl border border-white/20 rounded-lg md:rounded-xl p-1.5 md:p-2 shadow-xl animate-glass-float">
            <img 
              src={logoMobilaNomad} 
              alt="Mobila Nomad Logo"
              className="h-6 w-auto md:h-8 lg:h-10 drop-shadow-xl transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg md:rounded-xl pointer-events-none"></div>
          </div>
        </Link>
        
        
        {!isAdminPage && (
          <nav className="hidden md:flex items-center space-x-3 lg:space-x-6 xl:space-x-8 text-sm lg:text-base font-medium font-inter relative z-10 mx-4">
            <button onClick={handleHomeClick} className="text-white/90 hover:text-brand-gold transition-all duration-300 relative group whitespace-nowrap">
              Acasă
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            </button>
            <button onClick={() => handleNavClick("Camera de zi")} className="text-white/90 hover:text-brand-gold transition-all duration-300 relative group whitespace-nowrap">
              Camera de zi
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            </button>
            <button onClick={() => handleNavClick("Dormitor")} className="text-white/90 hover:text-brand-gold transition-all duration-300 relative group whitespace-nowrap">
              Dormitor
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            </button>
            <button onClick={() => handleNavClick("Bucătărie")} className="text-white/90 hover:text-brand-gold transition-all duration-300 relative group whitespace-nowrap">
              Bucătărie
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            </button>
            <button onClick={() => handleNavClick("Hol")} className="text-white/90 hover:text-brand-gold transition-all duration-300 relative group whitespace-nowrap">
              Hol
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            </button>
            <button onClick={() => handleNavClick("Inspirații")} className="text-white/90 hover:text-brand-gold transition-all duration-300 relative group whitespace-nowrap">
              Inspirații
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            </button>
            <button onClick={() => handleNavClick("Blog")} className="text-white/90 hover:text-brand-gold transition-all duration-300 relative group whitespace-nowrap">
              Blog
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            </button>
          </nav>
        )}

        {isAdminPage && (
          <div className="hidden md:flex items-center space-x-4 text-sm lg:text-base font-medium font-inter relative z-10 mx-4">
            <span className="text-white/90 font-semibold">Panou Administrator</span>
          </div>
        )}

        <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-4 relative z-10">
          {!isAdminPage && <SearchDialog />}
          
          {!isAdminPage && <CartDrawer />}
          
          {!isAdminPage && <MobileMenu onNavClick={handleNavClick} />}
        </div>
      </div>
    </header>
  );
};

export default Header;