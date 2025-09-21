import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-tech-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold bg-tech-gradient bg-clip-text text-transparent">
                MobileMart
              </span>
            </div>
            <p className="text-muted-foreground">
              Cel mai mare magazin online de telefoane mobile din România. 
              Prețuri competitive și livrare rapidă.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-tech-blue cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-tech-blue cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-tech-blue cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Produse</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">iPhone</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Samsung</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Google Pixel</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Accesorii</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Suport</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Centrul de ajutor</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Garanție</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Returnări</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Livrare</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>0800 123 456</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@mobilemart.ro</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>București, România</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 MobileMart. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;