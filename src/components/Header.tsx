import { ShoppingCart, Search, User, LogOut, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartDrawer from "./CartDrawer";
import SearchDialog from "./SearchDialog";
import MobileMenu from "./MobileMenu";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoMobilaNomad from "@/assets/logo-mobila-nomad-modern.png";
import { useState, useEffect } from "react";

interface HeaderProps {
  onSearchOpenChange?: (isOpen: boolean) => void;
}

const Header = ({ onSearchOpenChange }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const isAdminPage = location.pathname === '/admin';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    const routes: { [key: string]: string } = {
      "Acasă": "/",
      "Camera de zi": "/camera-de-zi",
      "Dormitor": "/dormitor",
      "Bucătării": "/bucatarie",
      "Dormitoare Complete": "/dormitor-complet",
      
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
    <header className={`sticky top-0 z-50 w-full bg-hero-gradient backdrop-blur-xl border-b border-brand-gold/20 shadow-2xl relative transition-all duration-300 ${
      isScrolled ? 'py-1' : 'py-0'
    }`}>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-navy/70 to-brand-dark/95"></div>
      <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
      
      {/* Scroll indicator - subtle glow line */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gradient transition-all duration-500 ${
        isScrolled ? 'opacity-100 shadow-[0_0_20px_rgba(255,215,0,0.6)]' : 'opacity-0'
      }`}></div>
      
      <div className={`container flex items-center justify-between relative z-10 px-3 sm:px-4 md:px-6 lg:px-8 transition-all duration-300 ${
        isScrolled ? 'h-14 sm:h-15 md:h-16 lg:h-18' : 'h-16 sm:h-17 md:h-18 lg:h-20'
      }`}>
        <Link
          to="/"
          className="flex items-center space-x-2 md:space-x-3 relative z-10 hover:scale-105 transition-transform duration-200 touch-manipulation group min-w-[44px] min-h-[44px]"
          aria-label="Acasă"
        >
          <div className={`relative bg-glass-gradient backdrop-blur-2xl border border-white/20 rounded-lg md:rounded-xl lg:rounded-2xl shadow-lg md:shadow-xl lg:shadow-2xl transition-all duration-300 overflow-hidden ${
            isScrolled 
              ? 'p-2 sm:p-2.5 md:p-3 lg:p-3.5 xl:p-4' 
              : 'p-2.5 sm:p-3 md:p-3.5 lg:p-4 xl:p-5'
          }`}>
            {/* Simplified liquid glass background for mobile */}
            <div className="absolute inset-0 bg-liquid-gradient opacity-30 md:opacity-40 group-hover:opacity-50 md:group-hover:opacity-60 transition-opacity duration-300 rounded-lg md:rounded-xl lg:rounded-2xl"></div>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/15 md:from-white/20 to-transparent rounded-t-lg md:rounded-t-xl lg:rounded-t-2xl"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-brand-gold/5 md:from-brand-gold/10 to-transparent rounded-br-lg md:rounded-br-xl lg:rounded-br-2xl"></div>
            
            {/* Reduced glass particles for mobile performance */}
            <div className="hidden md:block absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full blur-sm opacity-70"></div>
            <div className="hidden lg:block absolute top-2 right-2 w-1.5 h-1.5 bg-brand-gold/50 rounded-full blur-sm opacity-60"></div>
            <div className="hidden md:block absolute bottom-1 right-1 w-1 h-1 bg-brand-gold/40 rounded-full blur-sm opacity-50"></div>
            
            <img 
              src={logoMobilaNomad} 
              alt="Mobila Nomad Logo"
              className={`w-auto drop-shadow-lg md:drop-shadow-xl lg:drop-shadow-2xl transition-all duration-300 group-hover:scale-105 md:group-hover:scale-110 relative z-10 ${
                isScrolled 
                  ? 'h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16' 
                  : 'h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20'
              }`}
              loading="eager"
            />
            
            {/* Simplified glass reflection for mobile */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 md:from-white/15 via-transparent to-brand-gold/5 rounded-lg md:rounded-xl lg:rounded-2xl pointer-events-none group-hover:from-white/20 md:group-hover:from-white/25 transition-all duration-200"></div>
          </div>
        </Link>
        
        
        {!isAdminPage && (
          <nav className="hidden md:flex items-center space-x-3 lg:space-x-6 xl:space-x-8 text-sm lg:text-base font-medium font-inter relative z-10 mx-4">
            <button onClick={handleHomeClick} className="text-white/90 hover:text-brand-gold transition-all duration-300 relative group whitespace-nowrap">
              Acasă
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-glass-gradient backdrop-blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            </button>
            <button onClick={() => handleNavClick("Bucătării")} className="text-white/90 hover:text-brand-gold transition-all duration-300 relative group whitespace-nowrap">
              Bucătării
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
            <button onClick={() => handleNavClick("Dormitoare Complete")} className="text-white/90 hover:text-brand-gold transition-all duration-300 relative group whitespace-nowrap">
              Dormitoare Complete
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
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                localStorage.removeItem('admin_authenticated');
                localStorage.removeItem('admin_auth_time');
                window.location.reload();
              }}
              className="text-white/90 hover:text-brand-gold hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Ieșire
            </Button>
          </div>
        )}

        <div className="flex items-center gap-1 sm:gap-2 relative z-10">
          {/* Mobile-first layout with better spacing */}
          {!isAdminPage && (
            <>
              <SearchDialog onOpenChange={onSearchOpenChange} />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/cart')}
                className="text-white/90 hover:text-brand-gold hover:bg-white/10 min-w-[44px] min-h-[44px]"
                aria-label="Vezi coșul"
              >
                <ShoppingBag className="h-5 w-5" />
              </Button>
              <CartDrawer />
            </>
          )}
          
          {/* Hide theme toggle on small screens to save space */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          
          {/* User authentication - simplified for mobile */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white/90 hover:text-brand-gold hover:bg-white/10 min-w-[44px] min-h-[44px] p-2"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline ml-2">{user.user_metadata?.display_name || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="bg-background/95 backdrop-blur-xl border-border/50 w-56"
                sideOffset={5}
              >
                <DropdownMenuItem onClick={() => navigate('/auth')} className="cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Profil
                </DropdownMenuItem>
                {isAdminPage ? (
                  <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Administrare
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Deconectare
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/auth')} 
              className="text-white/90 hover:text-brand-gold hover:bg-white/10 min-w-[44px] min-h-[44px] p-2"
            >
              <User className="h-4 w-4" />
              <span className="hidden md:inline ml-2">Conectare</span>
            </Button>
          )}
          
          {!isAdminPage && <MobileMenu onNavClick={handleNavClick} />}
        </div>
      </div>
    </header>
  );
};

export default Header;