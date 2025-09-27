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
    <footer className="bg-luxury-dark border-t border-luxury-gold/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-luxury-gradient flex items-center justify-center shadow-lg">
                <span className="text-luxury-dark font-bold text-lg font-playfair">F</span>
              </div>
              <span className="text-2xl font-bold font-playfair bg-luxury-gradient bg-clip-text text-transparent">
                Mobila Nomad
              </span>
            </div>
            <p className="text-luxury-cream/80 font-inter leading-relaxed">
              Cel mai exclusivist magazin de mobilier de lux din România. 
              Artizanat de excepție și design inconfundabil pentru casa ta.
            </p>
            <div className="flex space-x-4">
              <Facebook 
                className="h-6 w-6 text-luxury-cream/60 hover:text-luxury-gold cursor-pointer transition-colors duration-300" 
                onClick={() => handleSocialClick("Facebook")}
              />
              <Instagram 
                className="h-6 w-6 text-luxury-cream/60 hover:text-luxury-gold cursor-pointer transition-colors duration-300" 
                onClick={() => handleSocialClick("Instagram")}
              />
              <Twitter 
                className="h-6 w-6 text-luxury-cream/60 hover:text-luxury-gold cursor-pointer transition-colors duration-300" 
                onClick={() => handleSocialClick("Twitter")}
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-luxury-cream font-playfair text-lg">Colecții Premium</h3>
            <ul className="space-y-3 text-luxury-cream/70 font-inter">
              <li><button onClick={() => handleCategoryClick("Living de Lux")} className="hover:text-luxury-gold transition-colors duration-300 text-left">Living de Lux</button></li>
              <li><button onClick={() => handleCategoryClick("Dormitor Royal")} className="hover:text-luxury-gold transition-colors duration-300 text-left">Dormitor Royal</button></li>
              <li><button onClick={() => handleCategoryClick("Bucătărie Premium")} className="hover:text-luxury-gold transition-colors duration-300 text-left">Bucătărie Premium</button></li>
              <li><button onClick={() => handleCategoryClick("Birou Executive")} className="hover:text-luxury-gold transition-colors duration-300 text-left">Birou Executive</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-luxury-cream font-playfair text-lg">Servicii VIP</h3>
            <ul className="space-y-3 text-luxury-cream/70 font-inter">
              <li><button onClick={() => handleServiceClick("Consultanță Design")} className="hover:text-luxury-gold transition-colors duration-300 text-left">Consultanță Design</button></li>
              <li><button onClick={() => handleServiceClick("Măsurători la Domiciliu")} className="hover:text-luxury-gold transition-colors duration-300 text-left">Măsurători la Domiciliu</button></li>
              <li><button onClick={() => handleServiceClick("Livrare Premium")} className="hover:text-luxury-gold transition-colors duration-300 text-left">Livrare Premium</button></li>
              <li><button onClick={() => handleServiceClick("Garanție Extinsă")} className="hover:text-luxury-gold transition-colors duration-300 text-left">Garanție Extinsă</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-luxury-cream font-playfair text-lg">Contact Premium</h3>
            <ul className="space-y-3 text-luxury-cream/70 font-inter">
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-luxury-gold" />
                <button 
                  onClick={() => handleContactClick("Telefon", "0800 LUXURY (589879)")}
                  className="hover:text-luxury-gold transition-colors duration-300"
                >
                  0800 LUXURY (589879)
                </button>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-luxury-gold" />
                <button 
                  onClick={() => handleContactClick("Email", "contact@mobilanomad.ro")}
                  className="hover:text-luxury-gold transition-colors duration-300"
                >
                  contact@mobilanomad.ro
                </button>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-luxury-gold" />
                <button 
                  onClick={() => handleContactClick("Adresă", "Showroom Herăstrău, București")}
                  className="hover:text-luxury-gold transition-colors duration-300"
                >
                  Showroom Herăstrău, București
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-luxury-gold/20 mt-12 pt-8 text-center">
          <p className="text-luxury-cream/60 font-inter">&copy; 2024 Mobila Nomad. Toate drepturile rezervate. | Design de lux pentru casa ta.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;