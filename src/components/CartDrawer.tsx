import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";

const CartDrawer = () => {
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice, clearCart, isOpen, setIsOpen } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Coșul este gol",
        description: "Adaugă produse în coș pentru a continua.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Redirecționare către checkout",
      description: `Total: ${getTotalPrice().toLocaleString('ro-RO')} Lei pentru ${getTotalItems()} produse.`,
    });
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="relative h-12 w-12 bg-glass-gradient backdrop-blur-lg border border-white/20 hover:bg-white/10 rounded-xl group">
          <ShoppingCart className="h-5 w-5 text-white/80 group-hover:text-luxury-gold transition-colors" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-luxury-gradient text-xs font-bold rounded-full flex items-center justify-center text-luxury-dark shadow-lg border border-white/30">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96 bg-glass-gradient backdrop-blur-xl border-l border-white/20">
        <SheetHeader>
          <SheetTitle className="text-luxury-gold font-playfair text-xl">
            Coșul de cumpărături
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-luxury-gold/50 mx-auto mb-4" />
              <p className="text-white/70 font-inter">Coșul tău este gol</p>
              <p className="text-white/50 text-sm mt-2">Adaugă produse pentru a continua</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm">{item.name}</h4>
                      <p className="text-luxury-gold font-semibold">{item.price.toLocaleString('ro-RO')} Lei</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-white/70 hover:text-luxury-gold"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-white/70 hover:text-luxury-gold"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-400 hover:text-red-300"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-white/20 pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white font-playfair text-lg">Total:</span>
                  <span className="font-bold text-luxury-gold text-xl font-playfair">
                    {getTotalPrice().toLocaleString('ro-RO')} Lei
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-luxury-gradient hover:opacity-90 text-luxury-dark font-semibold h-12"
                  >
                    Finalizează Comanda
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={clearCart}
                    className="w-full border-white/30 text-white hover:bg-white/10"
                  >
                    Golește Coșul
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;