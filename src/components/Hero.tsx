import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

import heroCozyCpollection from "@/assets/hero-cozy-collection.jpg";

const Hero = () => {

  const handleWhatsAppContact = () => {
    const phoneNumber = "0758433114";
    const message = "Salut! Sunt interesat de mobilierul de calitate la prețuri accesibile.";
    const whatsappUrl = `https://wa.me/4${phoneNumber.substring(1)}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-background min-h-[500px] md:min-h-[600px] flex items-center py-12" aria-label="Prezentare principală">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
              Mii de piese de mobilier
              <span className="block text-primary mt-2">
                cu livrare gratuită
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Descoperă colecția noastră vastă de mobilier pentru toate camerele din casă. 
              Calitate superioară, prețuri accesibile și livrare gratuită.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                onClick={handleWhatsAppContact}
                className="bg-green-500 text-white hover:bg-green-600 px-8 py-3 h-12 text-base font-semibold w-full sm:w-auto"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contactează-ne pe WhatsApp
              </Button>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src={heroCozyCpollection} 
                alt="Colecții speciale de mobilier Mobila Nomad - canapele confortabile, paturi elegante și mese moderne pentru casa ta" 
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;