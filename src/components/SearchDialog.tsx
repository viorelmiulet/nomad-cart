import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useDiscount } from "@/hooks/useDiscount";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface SearchDialogProps {
  onOpenChange?: (isOpen: boolean) => void;
}

const SearchDialog = ({ onOpenChange }: SearchDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { discountPercentage } = useDiscount();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Notify parent when search dialog opens/closes
  useEffect(() => {
    onOpenChange?.(!isOpen);
  }, [isOpen, onOpenChange]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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

  const handleProductClick = (productId: string) => {
    setIsOpen(false);
    setSearchTerm("");
    navigate(`/produs/${productId}`);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && debouncedSearch && (
        <div 
          className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[9998]"
          onClick={handleClose}
        />
      )}
      
      <div ref={searchRef} className="relative z-[9999]">
        {!isOpen ? (
        <Button 
          size="icon" 
          variant="ghost"
          onClick={() => setIsOpen(true)}
          className="min-w-[36px] min-h-[36px] bg-glass-gradient backdrop-blur-lg border border-white/20 rounded-lg text-white/80 hover:text-brand-gold hover:bg-white/10 transition-all duration-300 shadow-lg group relative overflow-hidden active:scale-95 touch-manipulation"
        >
          <Search className="h-4 w-4 relative z-10 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <span className="sr-only">Deschide căutarea</span>
        </Button>
      ) : (
        <div className="relative flex items-center gap-1.5 max-w-md">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-gold/80 pointer-events-none z-10" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Caută produse..."
              className="relative z-20 pl-8 pr-3 h-8 bg-glass-gradient backdrop-blur-lg border border-white/20 text-brand-cream placeholder:text-brand-cream/60 focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/30 rounded-lg text-xs shadow-xl font-inter"
              autoFocus
            />
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleClose}
            className="min-w-[32px] min-h-[32px] h-8 w-8 bg-glass-gradient backdrop-blur-lg border border-white/20 rounded-lg text-white/80 hover:text-brand-gold hover:bg-white/10 transition-all duration-300 flex-shrink-0"
          >
            <X className="h-3.5 w-3.5" />
          </Button>

          {/* Search Results Dropdown */}
          {debouncedSearch && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-glass-gradient backdrop-blur-lg border-2 border-brand-gold/30 rounded-lg p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] max-h-[60vh] overflow-y-auto custom-scrollbar z-[9999] animate-fade-in ring-1 ring-brand-gold/10">
              {isLoading ? (
                <div className="text-center py-4">
                  <Loader2 className="h-8 w-8 text-brand-gold mx-auto mb-2 animate-spin" />
                  <p className="text-brand-cream/60 text-xs">Căutare produse...</p>
                </div>
              ) : products.length > 0 ? (
                <div className="space-y-1.5">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full text-left p-2 bg-glass-gradient backdrop-blur-lg border border-white/20 hover:border-brand-gold/40 hover:bg-white/10 rounded-lg transition-all duration-300 group shadow-lg hover:shadow-2xl hover:shadow-brand-gold/20 relative overflow-hidden active:scale-[0.98]"
                    >
                      <div className="flex items-center space-x-2 relative z-10">
                        <div className="relative flex-shrink-0">
                          {product.image_url ? (
                            <img 
                              src={product.image_url} 
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-md shadow-lg"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-brand-gold/20 to-brand-navy/20 rounded-md shadow-lg flex items-center justify-center">
                              <Search className="h-5 w-5 text-brand-gold/50" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-brand-cream group-hover:text-brand-gold transition-colors font-playfair text-sm truncate">{product.name}</h4>
                              {product.description && (
                                <p className="text-xs text-brand-cream/60 mt-0.5 line-clamp-1">{product.description}</p>
                              )}
                            </div>
                            <div className="text-right flex-shrink-0 space-y-0.5">
                              <div className="text-xs text-brand-cream/50 line-through">
                                {product.price.toLocaleString("ro-RO")} Lei
                              </div>
                              <div className="flex items-center gap-1 justify-end">
                                <span className="text-sm font-bold text-brand-gold font-inter">
                                  {(product.price * (1 - discountPercentage / 100)).toLocaleString("ro-RO", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} Lei
                                </span>
                                <Badge variant="secondary" className="bg-brand-gold/20 text-brand-gold border-brand-gold/30 text-[10px] px-1 py-0">
                                  -{discountPercentage}%
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Search className="h-10 w-10 text-brand-cream/30 mx-auto mb-2" />
                  <h4 className="text-brand-cream font-bold text-sm mb-1 font-playfair">
                    Niciun rezultat găsit
                  </h4>
                  <p className="text-brand-cream/60 font-inter text-xs">
                    Nu s-au găsit produse pentru "<span className="text-brand-gold font-semibold">{debouncedSearch}</span>"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      </div>
    </>
  );
};

export default SearchDialog;