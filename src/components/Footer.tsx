import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const handleSocialClick = (platform: string) => {
    toast({
      title: `Conectare ${platform}`,
      description: `Vei fi redirecționat către pagina noastră de ${platform}.`,
    });
  };

  const handleCategoryClick = (category: string) => {
    toast({
      title: `Categorie ${category}`,
      description: `Navigare către secțiunea ${category}.`,
    });
  };

  const handleServiceClick = (service: string) => {
    toast({
      title: `Serviciu ${service}`,
      description: `Informații despre ${service} vor fi afișate.`,
    });
  };

  const handleContactClick = (method: string, value: string) => {
    toast({
      title: `Contact ${method}`,
      description: `${method}: ${value}`,
    });
  };

  return (
    <footer className="bg-brand-dark border-t border-brand-gold/20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4 md:space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-brand-gradient flex items-center justify-center shadow-lg">
                <span className="text-brand-dark font-bold text-base md:text-lg font-playfair">M</span>
              </div>
              <span className="text-xl md:text-2xl font-bold font-playfair bg-brand-gradient bg-clip-text text-transparent">
                Mobila Nomad
              </span>
            </div>
            <p className="text-brand-cream/80 font-inter leading-relaxed text-sm md:text-base">
              Magazin de mobilier de calitate pentru casa ta. 
              Produse durabile și design modern la prețuri accesibile.
            </p>
            <div className="flex space-x-4">
              <Facebook 
                className="h-5 w-5 md:h-6 md:w-6 text-brand-cream/60 hover:text-brand-gold cursor-pointer transition-colors duration-300 touch-manipulation" 
                onClick={() => handleSocialClick("Facebook")}
              />
              <Instagram 
                className="h-5 w-5 md:h-6 md:w-6 text-brand-cream/60 hover:text-brand-gold cursor-pointer transition-colors duration-300 touch-manipulation" 
                onClick={() => handleSocialClick("Instagram")}
              />
              <Twitter 
                className="h-5 w-5 md:h-6 md:w-6 text-brand-cream/60 hover:text-brand-gold cursor-pointer transition-colors duration-300 touch-manipulation" 
                onClick={() => handleSocialClick("Twitter")}
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 md:mb-6 text-brand-cream font-playfair text-base md:text-lg">Colecții</h3>
            <ul className="space-y-2 md:space-y-3 text-brand-cream/70 font-inter text-sm md:text-base">
              <li><button onClick={() => handleCategoryClick("Living Confortabil")} className="hover:text-brand-gold transition-colors duration-300 text-left touch-manipulation py-1">Living Confortabil</button></li>
              <li><button onClick={() => handleCategoryClick("Dormitor Cozy")} className="hover:text-brand-gold transition-colors duration-300 text-left touch-manipulation py-1">Dormitor Cozy</button></li>
              <li><button onClick={() => handleCategoryClick("Bucătărie Modernă")} className="hover:text-brand-gold transition-colors duration-300 text-left touch-manipulation py-1">Bucătărie Modernă</button></li>
              <li><button onClick={() => handleCategoryClick("Birou Funcțional")} className="hover:text-brand-gold transition-colors duration-300 text-left touch-manipulation py-1">Birou Funcțional</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 md:mb-6 text-brand-cream font-playfair text-base md:text-lg">Servicii</h3>
            <ul className="space-y-2 md:space-y-3 text-brand-cream/70 font-inter text-sm md:text-base">
              <li><button onClick={() => handleServiceClick("Consultanță Design")} className="hover:text-brand-gold transition-colors duration-300 text-left touch-manipulation py-1">Consultanță Design</button></li>
              <li><button onClick={() => handleServiceClick("Măsurători la Domiciliu")} className="hover:text-brand-gold transition-colors duration-300 text-left touch-manipulation py-1">Măsurători la Domiciliu</button></li>
              <li><button onClick={() => handleServiceClick("Livrare Gratuită")} className="hover:text-brand-gold transition-colors duration-300 text-left touch-manipulation py-1">Livrare Gratuită</button></li>
              <li><button onClick={() => handleServiceClick("Garanție Extinsă")} className="hover:text-brand-gold transition-colors duration-300 text-left touch-manipulation py-1">Garanție Extinsă</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 md:mb-6 text-brand-cream font-playfair text-base md:text-lg">Contact</h3>
            <ul className="space-y-2 md:space-y-3 text-brand-cream/70 font-inter text-sm md:text-base">
              <li className="flex items-center space-x-2 md:space-x-3">
                <Phone className="h-4 w-4 md:h-5 md:w-5 text-brand-gold flex-shrink-0" />
                <button 
                  onClick={() => handleContactClick("Telefon", "0758 433 114")}
                  className="hover:text-brand-gold transition-colors duration-300 touch-manipulation py-1"
                >
                  0758 433 114
                </button>
              </li>
              <li className="flex items-center space-x-2 md:space-x-3">
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-brand-gold flex-shrink-0" />
                <button 
                  onClick={() => handleContactClick("Email", "contact@mobilanomad.ro")}
                  className="hover:text-brand-gold transition-colors duration-300 touch-manipulation py-1 break-all"
                >
                  contact@mobilanomad.ro
                </button>
              </li>
              <li className="flex items-center space-x-2 md:space-x-3">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-brand-gold flex-shrink-0" />
                <button 
                  onClick={() => handleContactClick("Adresă", "București")}
                  className="hover:text-brand-gold transition-colors duration-300 touch-manipulation py-1"
                >
                  București
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-gold/20 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
          <p className="text-brand-cream/60 font-inter text-xs md:text-sm">&copy; 2024 Mobila Nomad. Toate drepturile rezervate. | Mobilier de calitate pentru casa ta.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;