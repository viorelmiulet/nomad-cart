import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SearchDialog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const mockResults = [
    { id: "1", name: "Canapea Modernă 3 Locuri", price: 2999, rating: 5 },
    { id: "2", name: "Masă de Dining Extensibilă", price: 1899, rating: 5 },
    { id: "3", name: "Dulap Dormitor cu Oglinzi", price: 3299, rating: 4 },
    { id: "4", name: "Set Fotolii Living x2", price: 2399, rating: 4 },
    { id: "5", name: "Bibliotecă Modulară", price: 1699, rating: 4 },
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
        <div className="hidden md:flex items-center space-x-2 w-96">
          <div className="relative w-full group cursor-pointer">
            <Search className="absolute left-3 top-3 h-4 w-4 text-white/60 z-10" />
            <Input
              placeholder="Caută mobilier de lux..."
              className="pl-10 h-12 bg-glass-gradient backdrop-blur-lg border border-white/20 text-white placeholder:text-white/60 focus:border-luxury-gold/50 focus:ring-1 focus:ring-luxury-gold/30 rounded-xl cursor-pointer"
              readOnly
            />
            <div className="absolute inset-0 bg-liquid-gradient opacity-20 rounded-xl group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-glass-gradient backdrop-blur-xl border border-white/20 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-luxury-gold font-playfair text-xl">
            Căutare Mobilier Premium
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-white/60" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Caută canapele, mese, paturi..."
              className="pl-10 h-12 bg-white/5 border border-white/20 text-white placeholder:text-white/60 focus:border-luxury-gold/50"
              autoFocus
            />
          </div>
          
          <Button type="submit" className="w-full bg-luxury-gradient hover:opacity-90 text-luxury-dark font-semibold">
            <Search className="mr-2 h-4 w-4" />
            Caută Produse
          </Button>
        </form>
        
        {searchTerm && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-white/70 mb-3">
              Rezultate pentru "{searchTerm}"
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredResults.length > 0 ? (
                filteredResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-white">{product.name}</h4>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < product.rating ? "text-luxury-gold fill-current" : "text-gray-500"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-luxury-gold font-semibold">
                        {product.price.toLocaleString('ro-RO')} Lei
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-white/50 text-center py-4">
                  Nu s-au găsit produse pentru "{searchTerm}"
                </p>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;