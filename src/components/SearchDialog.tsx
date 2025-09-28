import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Import product images
import sofaImage from "@/assets/product-sofa-modern.jpg";
import diningTableImage from "@/assets/product-dining-table.jpg";
import wardrobeImage from "@/assets/product-wardrobe.jpg";
import armchairsImage from "@/assets/product-armchairs.jpg";
import bookshelfImage from "@/assets/product-bookshelf.jpg";
import mattressImage from "@/assets/product-mattress.jpg";

const SearchDialog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const mockResults = [
    { id: "1", name: "Canapea Modernă 3 Locuri", price: 2999, rating: 5, image: sofaImage },
    { id: "2", name: "Masă de Dining Extensibilă", price: 1899, rating: 5, image: diningTableImage },
    { id: "3", name: "Dulap Dormitor cu Oglinzi", price: 3299, rating: 4, image: wardrobeImage },
    { id: "4", name: "Set Fotolii Living x2", price: 2399, rating: 4, image: armchairsImage },
    { id: "5", name: "Bibliotecă Modulară", price: 1699, rating: 4, image: bookshelfImage },
    { id: "6", name: "Saltea Memory Foam", price: 1299, rating: 4, image: mattressImage },
    { id: "7", name: "Fotoliu Piele Naturală", price: 1599, rating: 5, image: armchairsImage },
    { id: "8", name: "Masă de Cafea Design", price: 799, rating: 4, image: diningTableImage },
  ];

  const filteredResults = mockResults.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast({
        title: "Introduceți termenul de căutare",
        description: "Vă rugăm să introduceți un termen pentru căutare.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Căutare efectuată",
      description: `Căutăm produse pentru: "${searchTerm}"`,
    });
  };

  const handleProductClick = (product: any) => {
    toast({
      title: "Vizualizare produs",
      description: `Deschidere pagină pentru ${product.name}`,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-12 w-12 bg-glass-gradient backdrop-blur-lg border border-white/20 rounded-xl text-white/80 hover:text-brand-gold hover:bg-white/10 transition-all duration-300 shadow-lg group relative overflow-hidden"
        >
          <Search className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-hero-gradient backdrop-blur-xl border border-brand-gold/30 text-brand-cream max-w-3xl shadow-2xl relative overflow-hidden mx-4" aria-describedby="search-description">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-navy/70 to-brand-dark/95"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
        
        <DialogHeader className="relative z-10 text-center pb-6">
          <DialogTitle className="text-3xl font-bold font-playfair bg-brand-gradient bg-clip-text text-transparent drop-shadow-lg leading-tight">
            Căutare Mobilier Premium
          </DialogTitle>
          <p id="search-description" className="text-brand-cream/80 font-inter mt-2 text-lg">
            Descoperă mobilierul perfect pentru casa ta
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSearch} className="space-y-8 relative z-10 px-2">
          <div className="relative group">
            <Search className="absolute left-5 top-5 h-6 w-6 text-brand-gold/80 z-10" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Caută canapele, mese, paturi, fotolii..."
              className="pl-14 pr-6 h-16 bg-glass-gradient backdrop-blur-lg border border-white/20 text-brand-cream placeholder:text-brand-cream/60 focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/30 rounded-2xl text-lg shadow-xl font-inter"
              autoFocus
            />
            <div className="absolute inset-0 bg-liquid-gradient opacity-10 group-focus-within:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
          </div>
          
          <Button type="submit" className="w-full h-16 bg-glass-gradient backdrop-blur-lg border border-white/20 hover:bg-white/10 text-brand-gold font-bold px-10 text-xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-brand-gold/20 group relative overflow-hidden rounded-2xl">
            <span className="relative z-10 font-playfair">Caută Produse Premium</span>
            <Search className="ml-3 h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Button>
        </form>
        
        {searchTerm && (
          <div className="mt-10 relative z-10 px-2">
            <div className="bg-glass-gradient backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-brand-cream mb-6 font-playfair text-center">
                Rezultate pentru "<span className="text-brand-gold">{searchTerm}</span>"
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                {filteredResults.length > 0 ? (
                  filteredResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="w-full text-left p-5 bg-glass-gradient backdrop-blur-lg border border-white/20 hover:bg-white/10 rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-2xl relative overflow-hidden transform hover:scale-[1.02]"
                    >
                      <div className="absolute inset-0 bg-liquid-gradient opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="flex items-center space-x-5 relative z-10">
                        <div className="relative flex-shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-2xl shadow-xl"
                          />
                          <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-brand-cream group-hover:text-brand-gold transition-colors font-playfair text-lg truncate">{product.name}</h4>
                              <div className="flex items-center mt-3">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-5 w-5 ${
                                        i < product.rating ? "text-brand-gold fill-current" : "text-brand-cream/30"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <span className="text-2xl font-bold text-brand-gold font-inter">
                                {product.price.toLocaleString("ro-RO")} Lei
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-glass-gradient backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                      <Search className="h-20 w-20 text-brand-cream/30 mx-auto mb-6" />
                      <h4 className="text-brand-cream font-bold text-2xl mb-2 font-playfair">
                        Niciun rezultat găsit
                      </h4>
                      <p className="text-brand-cream/60 font-inter text-lg mb-1">
                        Nu s-au găsit produse pentru "<span className="text-brand-gold font-semibold">{searchTerm}</span>"
                      </p>
                      <p className="text-brand-cream/40 text-base">
                        Încearcă cu un alt termen de căutare
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;