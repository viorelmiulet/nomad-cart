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
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-lg">
                <span className="text-brand-dark font-bold text-lg font-playfair">M</span>
              </div>
              <span className="text-2xl font-bold font-playfair bg-brand-gradient bg-clip-text text-transparent">
                Mobila Nomad
              </span>
            </div>
            <p className="text-brand-cream/80 font-inter leading-relaxed">
              Magazin de mobilier de calitate pentru casa ta. 
              Produse durabile și design modern la prețuri accesibile.
            </p>
            <div className="flex space-x-4">
              <Facebook 
                className="h-6 w-6 text-brand-cream/60 hover:text-brand-gold cursor-pointer transition-colors duration-300" 
                onClick={() => handleSocialClick("Facebook")}
              />
              <Instagram 
                className="h-6 w-6 text-brand-cream/60 hover:text-brand-gold cursor-pointer transition-colors duration-300" 
                onClick={() => handleSocialClick("Instagram")}
              />
              <Twitter 
                className="h-6 w-6 text-brand-cream/60 hover:text-brand-gold cursor-pointer transition-colors duration-300" 
                onClick={() => handleSocialClick("Twitter")}
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-brand-cream font-playfair text-lg">Colecții</h3>
            <ul className="space-y-3 text-brand-cream/70 font-inter">
              <li><button onClick={() => handleCategoryClick("Living Confortabil")} className="hover:text-brand-gold transition-colors duration-300 text-left">Living Confortabil</button></li>
              <li><button onClick={() => handleCategoryClick("Dormitor Cozy")} className="hover:text-brand-gold transition-colors duration-300 text-left">Dormitor Cozy</button></li>
              <li><button onClick={() => handleCategoryClick("Bucătărie Modernă")} className="hover:text-brand-gold transition-colors duration-300 text-left">Bucătărie Modernă</button></li>
              <li><button onClick={() => handleCategoryClick("Birou Funcțional")} className="hover:text-brand-gold transition-colors duration-300 text-left">Birou Funcțional</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-brand-cream font-playfair text-lg">Servicii</h3>
            <ul className="space-y-3 text-brand-cream/70 font-inter">
              <li><button onClick={() => handleServiceClick("Consultanță Design")} className="hover:text-brand-gold transition-colors duration-300 text-left">Consultanță Design</button></li>
              <li><button onClick={() => handleServiceClick("Măsurători la Domiciliu")} className="hover:text-brand-gold transition-colors duration-300 text-left">Măsurători la Domiciliu</button></li>
              <li><button onClick={() => handleServiceClick("Livrare Gratuită")} className="hover:text-brand-gold transition-colors duration-300 text-left">Livrare Gratuită</button></li>
              <li><button onClick={() => handleServiceClick("Garanție Extinsă")} className="hover:text-brand-gold transition-colors duration-300 text-left">Garanție Extinsă</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-brand-cream font-playfair text-lg">Contact</h3>
            <ul className="space-y-3 text-brand-cream/70 font-inter">
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-brand-gold" />
                <button 
                  onClick={() => handleContactClick("Telefon", "0758 433 114")}
                  className="hover:text-brand-gold transition-colors duration-300"
                >
                  0758 433 114
                </button>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-brand-gold" />
                <button 
                  onClick={() => handleContactClick("Email", "contact@mobilanomad.ro")}
                  className="hover:text-brand-gold transition-colors duration-300"
                >
                  contact@mobilanomad.ro
                </button>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-brand-gold" />
                <button 
                  onClick={() => handleContactClick("Adresă", "Showroom București")}
                  className="hover:text-brand-gold transition-colors duration-300"
                >
                  Showroom București
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-gold/20 mt-12 pt-8 text-center">
          <p className="text-brand-cream/60 font-inter">&copy; 2024 Mobila Nomad. Toate drepturile rezervate. | Mobilier de calitate pentru casa ta.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;