import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useDiscount } from "@/hooks/useDiscount";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const SearchDialog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { discountPercentage } = useDiscount();
  const navigate = useNavigate();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch products from Supabase
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products-search', debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch.trim()) {
        return [];
      }

      const { data, error } = await supabase
        .from('products')
        .select('id, name, description, price, image_url, status')
        .eq('status', 'active')
        .or(`name.ilike.%${debouncedSearch}%,description.ilike.%${debouncedSearch}%`)
        .limit(10);

      if (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Eroare la căutare",
          description: "Nu am putut căuta produse. Încearcă din nou.",
          variant: "destructive"
        });
        return [];
      }

      return data || [];
    },
    enabled: debouncedSearch.length > 0,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast({
        title: "Introduceți termenul de căutare",
        description: "Vă rugăm să introduceți un termen pentru căutare.",
        variant: "destructive"
      });
    }
  };

  const handleProductClick = (productId: string) => {
    setIsOpen(false);
    navigate(`/produs/${productId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="icon" 
          variant="ghost" 
          className="min-w-[44px] min-h-[44px] bg-glass-gradient backdrop-blur-lg border border-white/20 rounded-lg text-white/80 hover:text-brand-gold hover:bg-white/10 transition-all duration-300 shadow-lg group relative overflow-hidden active:scale-95 touch-manipulation"
        >
          <Search className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <span className="sr-only">Deschide căutarea</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-hero-gradient backdrop-blur-xl border border-brand-gold/30 text-brand-cream w-[95vw] max-w-3xl shadow-2xl relative overflow-hidden mx-auto" aria-describedby="search-description">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-navy/70 to-brand-dark/95"></div>
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
        
        <DialogHeader className="relative z-10 text-center pb-4">
          <DialogTitle className="text-2xl md:text-3xl font-bold font-playfair bg-brand-gradient bg-clip-text text-transparent drop-shadow-lg leading-tight">
            Căutare Mobilier
          </DialogTitle>
          <p id="search-description" className="text-brand-cream/80 font-inter mt-2 text-base md:text-lg">
            Descoperă mobilierul perfect pentru casa ta
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSearch} className="space-y-4 md:space-y-8 relative z-10 px-2">
          <div className="relative group">
            <Search className="absolute left-3 md:left-5 top-3 md:top-5 h-5 w-5 md:h-6 md:w-6 text-brand-gold/80 z-10" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Caută canapele, mese, paturi..."
              className="pl-10 md:pl-14 pr-4 md:pr-6 h-12 md:h-16 bg-glass-gradient backdrop-blur-lg border border-white/20 text-brand-cream placeholder:text-brand-cream/60 focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/30 rounded-lg md:rounded-2xl text-base md:text-lg shadow-xl font-inter"
              autoFocus
            />
            <div className="absolute inset-0 bg-liquid-gradient opacity-10 group-focus-within:opacity-20 transition-opacity duration-300 rounded-lg md:rounded-2xl"></div>
          </div>
          
          <div className="flex items-center justify-center text-brand-cream/60 text-sm">
            {isLoading && debouncedSearch && (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Căutare în progres...</span>
              </div>
            )}
            {!searchTerm && (
              <span>Introdu un termen pentru a căuta produse</span>
            )}
          </div>
        </form>
        
        {debouncedSearch && (
          <div className="mt-6 md:mt-10 relative z-10 px-2">
            <div className="bg-glass-gradient backdrop-blur-lg border border-white/10 rounded-lg md:rounded-2xl p-4 md:p-6 shadow-2xl">
              <h3 className="text-lg md:text-xl font-bold text-brand-cream mb-4 md:mb-6 font-playfair text-center">
                Rezultate pentru "<span className="text-brand-gold">{debouncedSearch}</span>"
              </h3>
              <div className="space-y-3 md:space-y-4 max-h-64 md:max-h-96 overflow-y-auto custom-scrollbar pr-2">
                {isLoading ? (
                  <div className="text-center py-8 md:py-12">
                    <Loader2 className="h-12 w-12 md:h-16 md:w-16 text-brand-gold mx-auto mb-4 animate-spin" />
                    <p className="text-brand-cream/60">Căutare produse...</p>
                  </div>
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full text-left p-3 md:p-5 bg-glass-gradient backdrop-blur-lg border border-white/20 hover:bg-white/10 rounded-lg md:rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-2xl relative overflow-hidden active:scale-95 md:hover:scale-[1.02] touch-manipulation"
                    >
                      <div className="flex items-center space-x-3 md:space-x-5 relative z-10">
                        <div className="relative flex-shrink-0">
                          {product.image_url ? (
                            <img 
                              src={product.image_url} 
                              alt={product.name}
                              className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg md:rounded-2xl shadow-xl"
                            />
                          ) : (
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-brand-gold/20 to-brand-navy/20 rounded-lg md:rounded-2xl shadow-xl flex items-center justify-center">
                              <Search className="h-8 w-8 text-brand-gold/50" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg md:rounded-2xl"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2 md:gap-4">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-brand-cream group-hover:text-brand-gold transition-colors font-playfair text-base md:text-lg truncate">{product.name}</h4>
                              {product.description && (
                                <p className="text-xs md:text-sm text-brand-cream/60 mt-1 line-clamp-1">{product.description}</p>
                              )}
                            </div>
                            <div className="text-right flex-shrink-0 space-y-1">
                              <div className="text-sm text-brand-cream/50 line-through">
                                {product.price.toLocaleString("ro-RO")} Lei
                              </div>
                              <div className="flex items-center gap-1 justify-end">
                                <span className="text-lg md:text-xl font-bold text-brand-gold font-inter">
                                  {(product.price * (1 - discountPercentage / 100)).toLocaleString("ro-RO", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} Lei
                                </span>
                                <Badge variant="secondary" className="bg-brand-gold/20 text-brand-gold border-brand-gold/30 text-xs">
                                  -{discountPercentage}%
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 md:py-12">
                    <div className="bg-glass-gradient backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 shadow-xl">
                      <Search className="h-16 w-16 md:h-20 md:w-20 text-brand-cream/30 mx-auto mb-4 md:mb-6" />
                      <h4 className="text-brand-cream font-bold text-xl md:text-2xl mb-2 font-playfair">
                        Niciun rezultat găsit
                      </h4>
                      <p className="text-brand-cream/60 font-inter text-base md:text-lg mb-1">
                        Nu s-au găsit produse pentru "<span className="text-brand-gold font-semibold">{debouncedSearch}</span>"
                      </p>
                      <p className="text-brand-cream/40 text-sm md:text-base">
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