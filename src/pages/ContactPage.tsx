import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send, User, MessageSquare, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Câmpuri incomplete",
        description: "Vă rugăm să completați toate câmpurile obligatorii.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Mesaj trimis cu succes!",
      description: "Vă vom contacta în cel mai scurt timp. Mulțumim!",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      subject: ""
    });
    setIsSubmitting(false);
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-glass-gradient backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-liquid-gradient opacity-10 animate-liquid-flow"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gradient rounded-full mb-4 shadow-xl">
                      <MessageSquare className="h-8 w-8 text-luxury-dark" />
                    </div>
                    <h2 className="text-3xl font-bold font-playfair text-luxury-cream mb-2">
                      Să vorbim despre casa ta de vis
                    </h2>
                    <p className="text-luxury-cream/80 font-inter">
                      Completează formularul și te vom contacta în 24 de ore
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <div className="absolute left-4 top-4 text-luxury-gold/80 group-focus-within:text-luxury-gold transition-colors">
                          <User className="h-5 w-5" />
                        </div>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Numele tău complet *"
                          className="pl-12 h-14 bg-glass-gradient backdrop-blur-lg border border-white/20 text-luxury-cream placeholder:text-luxury-cream/60 focus:border-luxury-gold/50 focus:ring-2 focus:ring-luxury-gold/30 rounded-xl text-base shadow-lg font-inter transition-all duration-300"
                          required
                        />
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute left-4 top-4 text-luxury-gold/80 group-focus-within:text-luxury-gold transition-colors">
                          <Mail className="h-5 w-5" />
                        </div>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email-ul tău *"
                          className="pl-12 h-14 bg-glass-gradient backdrop-blur-lg border border-white/20 text-luxury-cream placeholder:text-luxury-cream/60 focus:border-luxury-gold/50 focus:ring-2 focus:ring-luxury-gold/30 rounded-xl text-base shadow-lg font-inter transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <div className="absolute left-4 top-4 text-luxury-gold/80 group-focus-within:text-luxury-gold transition-colors">
                          <Phone className="h-5 w-5" />
                        </div>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Numărul de telefon"
                          className="pl-12 h-14 bg-glass-gradient backdrop-blur-lg border border-white/20 text-luxury-cream placeholder:text-luxury-cream/60 focus:border-luxury-gold/50 focus:ring-2 focus:ring-luxury-gold/30 rounded-xl text-base shadow-lg font-inter transition-all duration-300"
                        />
                      </div>
                      
                      <div className="relative">
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Subiectul mesajului"
                          className="h-14 bg-glass-gradient backdrop-blur-lg border border-white/20 text-luxury-cream placeholder:text-luxury-cream/60 focus:border-luxury-gold/50 focus:ring-2 focus:ring-luxury-gold/30 rounded-xl text-base shadow-lg font-inter transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Spune-ne despre proiectul tău... Ce cameră vrei să amenajezi? Ce stil preferi? *"
                        rows={6}
                        className="bg-glass-gradient backdrop-blur-lg border border-white/20 text-luxury-cream placeholder:text-luxury-cream/60 focus:border-luxury-gold/50 focus:ring-2 focus:ring-luxury-gold/30 rounded-xl text-base shadow-lg font-inter transition-all duration-300 resize-none"
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 bg-luxury-gradient text-luxury-dark px-8 text-lg font-bold hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] rounded-xl relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10 flex items-center justify-center space-x-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-6 h-6 border-2 border-luxury-dark/30 border-t-luxury-dark rounded-full animate-spin"></div>
                            <span>Se trimite...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-6 w-6" />
                            <span>Trimite Mesajul</span>
                          </>
                        )}
                      </div>
                    </Button>
                  </form>
                  
                  <div className="mt-8 p-6 bg-glass-gradient backdrop-blur-lg border border-white/10 rounded-2xl">
                    <div className="flex items-center space-x-3 text-luxury-cream/90">
                      <div className="w-2 h-2 bg-luxury-gold rounded-full animate-pulse"></div>
                      <p className="text-sm font-inter">
                        <span className="font-semibold text-luxury-gold">Răspuns garantat în 24h</span> - Echipa noastră de consultanți te va contacta pentru o discuție personalizată despre proiectul tău.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Information - Takes 1 column */}
            <div className="lg:col-span-1 space-y-8">
              <Card className="bg-glass-gradient backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-liquid-gradient opacity-10 animate-liquid-flow"></div>
                <CardHeader className="relative z-10">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-luxury-gradient rounded-full mb-3 shadow-lg">
                      <Phone className="h-6 w-6 text-luxury-dark" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-luxury-cream">
                      Informații Contact
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-glass-gradient backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/5 transition-all duration-300 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center group-hover:bg-luxury-gold/30 transition-colors">
                        <Phone className="h-6 w-6 text-luxury-gold" />
                      </div>
                      <div>
                        <p className="text-luxury-cream font-semibold">Telefon Premium</p>
                        <p className="text-luxury-cream/80 font-mono">0800 LUXURY (589879)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-glass-gradient backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/5 transition-all duration-300 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center group-hover:bg-luxury-gold/30 transition-colors">
                        <Mail className="h-6 w-6 text-luxury-gold" />
                      </div>
                      <div>
                        <p className="text-luxury-cream font-semibold">Email</p>
                        <p className="text-luxury-cream/80 font-mono">contact@furnilux.ro</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-glass-gradient backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/5 transition-all duration-300 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center group-hover:bg-luxury-gold/30 transition-colors">
                        <MapPin className="h-6 w-6 text-luxury-gold" />
                      </div>
                      <div>
                        <p className="text-luxury-cream font-semibold">Showroom</p>
                        <p className="text-luxury-cream/80">Showroom Herăstrău, București</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-glass-gradient backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/5 transition-all duration-300 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center group-hover:bg-luxury-gold/30 transition-colors">
                        <Clock className="h-6 w-6 text-luxury-gold" />
                      </div>
                      <div>
                        <p className="text-luxury-cream font-semibold">Program</p>
                        <p className="text-luxury-cream/80 text-sm">Luni - Vineri: 10:00 - 20:00</p>
                        <p className="text-luxury-cream/80 text-sm">Sâmbătă - Duminică: 10:00 - 18:00</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-glass-gradient backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-liquid-gradient opacity-10 animate-liquid-flow"></div>
                <CardHeader className="relative z-10">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-luxury-gradient rounded-full mb-3 shadow-lg">
                      <Star className="h-6 w-6 text-luxury-dark" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-luxury-cream">
                      Servicii VIP
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div className="space-y-3">
                    <div className="p-4 bg-glass-gradient backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/5 transition-all duration-300">
                      <p className="font-semibold text-luxury-gold flex items-center space-x-2">
                        <span className="w-2 h-2 bg-luxury-gold rounded-full"></span>
                        <span>Consultanță Design Gratuită</span>
                      </p>
                      <p className="text-sm text-luxury-cream/70 mt-1">Specialiști în design interior la dispoziția ta</p>
                    </div>
                    
                    <div className="p-4 bg-glass-gradient backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/5 transition-all duration-300">
                      <p className="font-semibold text-luxury-gold flex items-center space-x-2">
                        <span className="w-2 h-2 bg-luxury-gold rounded-full"></span>
                        <span>Măsurători la Domiciliu</span>
                      </p>
                      <p className="text-sm text-luxury-cream/70 mt-1">Măsurători precise pentru mobilierul perfect</p>
                    </div>
                    
                    <div className="p-4 bg-glass-gradient backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/5 transition-all duration-300">
                      <p className="font-semibold text-luxury-gold flex items-center space-x-2">
                        <span className="w-2 h-2 bg-luxury-gold rounded-full"></span>
                        <span>Livrare Premium</span>
                      </p>
                      <p className="text-sm text-luxury-cream/70 mt-1">Livrare gratuită și instalare profesională</p>
                    </div>
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