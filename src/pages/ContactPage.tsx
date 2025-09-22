import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleGoBack = () => {
    navigate("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Câmpuri incomplete",
        description: "Vă rugăm să completați toate câmpurile obligatorii.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Mesaj trimis cu succes!",
      description: "Vă vom contacta în cel mai scurt timp. Mulțumim!",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark/90 via-luxury-navy/70 to-luxury-dark/95"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center space-x-4 mb-16">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10 hover:border-luxury-gold/70"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Înapoi la Home
            </Button>
            
            <h1 className="text-3xl lg:text-4xl font-bold font-playfair text-luxury-cream">
              Contact Premium
            </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-glass-gradient backdrop-blur-xl border border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair text-luxury-cream">
                  Trimite-ne un mesaj
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Numele tău *"
                      className="bg-glass-gradient backdrop-blur-lg border border-white/20 text-luxury-cream placeholder:text-luxury-cream/60"
                      required
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email-ul tău *"
                      className="bg-glass-gradient backdrop-blur-lg border border-white/20 text-luxury-cream placeholder:text-luxury-cream/60"
                      required
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Numărul de telefon"
                      className="bg-glass-gradient backdrop-blur-lg border border-white/20 text-luxury-cream placeholder:text-luxury-cream/60"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Mesajul tău *"
                      rows={5}
                      className="bg-glass-gradient backdrop-blur-lg border border-white/20 text-luxury-cream placeholder:text-luxury-cream/60"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-luxury-gradient text-luxury-dark px-8 py-3 h-12 text-base font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Trimite Mesajul
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-glass-gradient backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair text-luxury-cream">
                    Informații Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-luxury-gold" />
                    <div>
                      <p className="text-luxury-cream font-semibold">Telefon Premium</p>
                      <p className="text-luxury-cream/80">0800 LUXURY (589879)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-luxury-gold" />
                    <div>
                      <p className="text-luxury-cream font-semibold">Email</p>
                      <p className="text-luxury-cream/80">contact@furnilux.ro</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-luxury-gold" />
                    <div>
                      <p className="text-luxury-cream font-semibold">Showroom</p>
                      <p className="text-luxury-cream/80">Showroom Herăstrău, București</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Clock className="h-6 w-6 text-luxury-gold" />
                    <div>
                      <p className="text-luxury-cream font-semibold">Program</p>
                      <p className="text-luxury-cream/80">Luni - Vineri: 10:00 - 20:00</p>
                      <p className="text-luxury-cream/80">Sâmbătă - Duminică: 10:00 - 18:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-glass-gradient backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair text-luxury-cream">
                    Servicii VIP
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-luxury-cream/90">
                    <p className="font-semibold text-luxury-gold">✓ Consultanță Design Gratuită</p>
                    <p className="text-sm text-luxury-cream/70">Specialiști în design interior la dispoziția ta</p>
                  </div>
                  
                  <div className="text-luxury-cream/90">
                    <p className="font-semibold text-luxury-gold">✓ Măsurători la Domiciliu</p>
                    <p className="text-sm text-luxury-cream/70">Măsurători precise pentru mobilierul perfect</p>
                  </div>
                  
                  <div className="text-luxury-cream/90">
                    <p className="font-semibold text-luxury-gold">✓ Livrare Premium</p>
                    <p className="text-sm text-luxury-cream/70">Livrare gratuită și instalare profesională</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;