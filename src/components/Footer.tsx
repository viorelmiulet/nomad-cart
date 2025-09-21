import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
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
                FurniLux
              </span>
            </div>
            <p className="text-luxury-cream/80 font-inter leading-relaxed">
              Cel mai exclusivist magazin de mobilier de lux din România. 
              Artizanat de excepție și design inconfundabil pentru casa ta.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-luxury-cream/60 hover:text-luxury-gold cursor-pointer transition-colors duration-300" />
              <Instagram className="h-6 w-6 text-luxury-cream/60 hover:text-luxury-gold cursor-pointer transition-colors duration-300" />
              <Twitter className="h-6 w-6 text-luxury-cream/60 hover:text-luxury-gold cursor-pointer transition-colors duration-300" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-luxury-cream font-playfair text-lg">Colecții Premium</h3>
            <ul className="space-y-3 text-luxury-cream/70 font-inter">
              <li><a href="#" className="hover:text-luxury-gold transition-colors duration-300">Living de Lux</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors duration-300">Dormitor Royal</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors duration-300">Bucătărie Premium</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors duration-300">Birou Executive</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-luxury-cream font-playfair text-lg">Servicii VIP</h3>
            <ul className="space-y-3 text-luxury-cream/70 font-inter">
              <li><a href="#" className="hover:text-luxury-gold transition-colors duration-300">Consultanță Design</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors duration-300">Măsurători la Domiciliu</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors duration-300">Livrare Premium</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors duration-300">Garanție Extinsă</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-luxury-cream font-playfair text-lg">Contact Premium</h3>
            <ul className="space-y-3 text-luxury-cream/70 font-inter">
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-luxury-gold" />
                <span>0800 LUXURY (589879)</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-luxury-gold" />
                <span>contact@furnilux.ro</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-luxury-gold" />
                <span>Showroom Herăstrău, București</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-luxury-gold/20 mt-12 pt-8 text-center">
          <p className="text-luxury-cream/60 font-inter">&copy; 2024 FurniLux. Toate drepturile rezervate. | Design de lux pentru casa ta.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;