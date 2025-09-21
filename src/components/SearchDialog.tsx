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
          className="h-12 w-12 bg-glass-gradient backdrop-blur-lg border border-white/20 rounded-xl text-white/80 hover:text-luxury-gold hover:bg-white/10 transition-all duration-300 shadow-lg group relative overflow-hidden"
        >
          <Search className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-luxury-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-hero-gradient backdrop-blur-xl border border-luxury-gold/30 text-luxury-cream max-w-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark/90 via-luxury-navy/70 to-luxury-dark/95"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
        
        <DialogHeader className="relative z-10">
          <DialogTitle className="text-2xl font-bold font-playfair bg-luxury-gradient bg-clip-text text-transparent drop-shadow-lg">
            Căutare Mobilier Premium
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSearch} className="space-y-6 relative z-10">
          <div className="relative group">
            <Search className="absolute left-4 top-4 h-5 w-5 text-luxury-gold/80 z-10" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Caută canapele, mese, paturi..."
              className="pl-12 h-14 bg-glass-gradient backdrop-blur-lg border border-white/20 text-luxury-cream placeholder:text-luxury-cream/60 focus:border-luxury-gold/50 focus:ring-1 focus:ring-luxury-gold/30 rounded-xl text-lg shadow-xl"
              autoFocus
            />
            <div className="absolute inset-0 bg-liquid-gradient opacity-10 group-focus-within:opacity-20 transition-opacity duration-300 rounded-xl"></div>
          </div>
          
          <Button type="submit" className="w-full h-14 bg-glass-gradient backdrop-blur-lg border border-white/20 hover:bg-white/10 text-luxury-gold font-semibold px-8 text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-luxury-gold/20 group relative overflow-hidden rounded-xl">
            <span className="relative z-10">Caută Produse</span>
            <Search className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-luxury-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Button>
        </form>
        
        {searchTerm && (
          <div className="mt-8 relative z-10">
            <h3 className="text-lg font-medium text-luxury-cream mb-4 font-playfair">
              Rezultate pentru "<span className="text-luxury-gold">{searchTerm}</span>"
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
              {filteredResults.length > 0 ? (
                filteredResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="w-full text-left p-4 bg-glass-gradient backdrop-blur-lg border border-white/20 hover:bg-white/10 rounded-xl transition-all duration-300 group shadow-lg hover:shadow-xl relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-liquid-gradient opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="flex items-center space-x-4 relative z-10">
                      <div className="relative">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-xl shadow-lg"
                        />
                        <div className="absolute inset-0 bg-luxury-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-luxury-cream group-hover:text-luxury-gold transition-colors font-playfair">{product.name}</h4>
                            <div className="flex items-center mt-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < product.rating ? "text-luxury-gold fill-current" : "text-luxury-cream/30"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xl font-bold text-luxury-gold font-inter">
                            {product.price.toLocaleString('ro-RO')} Lei
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-8">
                  <Search className="h-16 w-16 text-luxury-cream/30 mx-auto mb-4" />
                  <p className="text-luxury-cream/60 font-inter text-lg">
                    Nu s-au găsit produse pentru "<span className="text-luxury-gold">{searchTerm}</span>"
                  </p>
                  <p className="text-luxury-cream/40 text-sm mt-2">
                    Încearcă cu un alt termen de căutare
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;