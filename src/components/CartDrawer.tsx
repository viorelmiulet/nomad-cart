import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    items, 
    isLoading, 
    updateQuantity, 
    removeItem, 
    createCheckout,
    clearCart 
  } = useCartStore();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const currencyCode = items[0]?.price.currencyCode || 'RON';

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Coșul este gol",
        description: "Adaugă produse în coș pentru a continua.",
        variant: "destructive"
      });
      return;
    }

    try {
      await createCheckout();
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
        toast({
          title: "Redirecționare către checkout",
          description: "Te-am redirecționat către pagina de finalizare comandă.",
        });
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut crea checkout-ul. Te rugăm să încerci din nou.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          size="icon" 
          variant="ghost" 
          className="relative h-10 w-10 md:h-12 md:w-12 bg-brand-gold/20 backdrop-blur-lg border-2 border-brand-gold/50 hover:bg-brand-gold/30 hover:border-brand-gold/70 rounded-lg md:rounded-xl group shadow-lg touch-manipulation"
        >
          <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 text-brand-gold group-hover:text-brand-cream transition-colors drop-shadow-sm" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 bg-brand-gradient text-xs font-bold rounded-full flex items-center justify-center text-brand-dark shadow-lg border border-brand-gold/50 animate-pulse">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg bg-brand-dark/95 backdrop-blur-xl border-l border-brand-gold/30 shadow-2xl flex flex-col h-full">
        <SheetHeader className="pb-4 border-b border-brand-gold/20 flex-shrink-0">
          <SheetTitle className="text-brand-gold font-playfair text-xl md:text-2xl drop-shadow-lg">
            Coșul de cumpărături
          </SheetTitle>
          <SheetDescription className="text-brand-cream/70 text-sm">
            {totalItems === 0 ? "Coșul tău este gol" : `${totalItems} ${totalItems === 1 ? 'produs' : 'produse'} în coș`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-16 w-16 md:h-20 md:w-20 text-brand-gold/60 mx-auto mb-4 drop-shadow-lg" />
                <p className="text-brand-cream/90 font-inter font-medium text-base md:text-lg">Coșul tău este gol</p>
                <p className="text-brand-cream/70 text-sm md:text-base mt-2">Adaugă produse pentru a continua</p>
              </div>
            </div>
          ) : (
            <>
              {/* Scrollable items area */}
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-3 md:space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex items-center space-x-3 p-3 md:p-4 bg-brand-gold/10 rounded-lg md:rounded-xl border border-brand-gold/20 shadow-md">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-dark rounded-lg overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-brand-cream text-sm md:text-base mb-1 truncate">
                          {item.product.node.title}
                        </h4>
                        {item.selectedOptions.length > 0 && (
                          <p className="text-xs text-brand-cream/70">
                            {item.selectedOptions.map(option => option.value).join(' • ')}
                          </p>
                        )}
                        <p className="text-brand-gold font-semibold drop-shadow-sm text-sm md:text-base">
                          {parseFloat(item.price.amount).toFixed(2)} {item.price.currencyCode}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-all duration-200 touch-manipulation"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 text-brand-cream/80 hover:text-brand-gold hover:bg-brand-gold/10 rounded-md transition-all duration-200 touch-manipulation"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm text-brand-cream">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 text-brand-cream/80 hover:text-brand-gold hover:bg-brand-gold/10 rounded-md transition-all duration-200 touch-manipulation"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Fixed checkout section */}
              <div className="flex-shrink-0 space-y-4 pt-4 border-t border-brand-gold/30 bg-brand-dark/95 pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-brand-cream font-playfair">Total</span>
                  <span className="text-xl md:text-2xl font-bold text-brand-gold font-playfair drop-shadow-lg">
                    {totalPrice.toFixed(2)} {currencyCode}
                  </span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-brand-gradient hover:opacity-90 text-brand-dark font-bold h-11 md:h-12 text-sm md:text-base" 
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Se creează checkout...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Finalizează comanda
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-brand-gold/50 text-brand-cream hover:bg-brand-gold/10 h-10 md:h-11 text-sm"
                  onClick={() => {
                    clearCart();
                    toast({
                      title: "Coș golit",
                      description: "Toate produsele au fost eliminate din coș.",
                    });
                  }}
                >
                  Golește coșul
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
