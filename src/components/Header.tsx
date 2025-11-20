import { ShoppingCart, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartDrawer from "./CartDrawer";
import SearchDialog from "./SearchDialog";
import MobileMenu from "./MobileMenu";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
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

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Deconectat",
      description: "V-ați deconectat cu succes.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm">
      <div className="container flex h-16 md:h-20 items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200 touch-manipulation min-w-[44px] min-h-[44px]"
          aria-label="Acasă"
        >
          <img 
            src={logoMobilaNomad} 
            alt="Mobila Nomad Logo"
            className="h-8 md:h-10 w-auto"
            loading="eager"
          />
        </Link>

        <div className="hidden lg:flex flex-1 max-w-xl mx-8">
          <SearchDialog />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="lg:hidden">
            <SearchDialog />
          </div>
          
          {!isAdminPage && (
            <>
              <CartDrawer />
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="mobile-icon"
                      className="min-h-[44px] min-w-[44px]"
                      aria-label="Contul meu"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover z-[100]">
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      Admin Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Deconectare
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}

              <ThemeToggle />
              <MobileMenu onNavClick={handleNavClick} />
            </>
          )}
        </div>
      </div>

      <nav className="bg-primary text-primary-foreground py-3 hidden md:block" aria-label="Navigare principală">
        <div className="container px-4">
          <ul className="flex items-center justify-center gap-8" role="list">
            {["Acasă", "Dormitor", "Camera de zi", "Bucătării", "Dormitoare Complete", "Blog"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleNavClick(item)}
                  className="text-sm font-medium hover:opacity-80 transition-opacity duration-200"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
