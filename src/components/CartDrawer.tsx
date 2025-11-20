import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Banknote } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice, clearCart, isOpen, setIsOpen } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const navigate = useNavigate();

  const getDiscountedPrice = () => {
    const total = getTotalPrice();
    if (paymentMethod === 'card') {
      return total * 0.9; // 10% discount for card payments
    }
    return total;
  };

  const getDiscount = () => {
    if (paymentMethod === 'card') {
      return getTotalPrice() * 0.1; // 10% discount
    }
    return 0;
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Coșul este gol",
        description: "Adaugă produse în coș pentru a continua.",
        variant: "destructive"
      });
      return;
    }
    
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="relative h-10 w-10 md:h-12 md:w-12 bg-brand-gold/20 backdrop-blur-lg border-2 border-brand-gold/50 hover:bg-brand-gold/30 hover:border-brand-gold/70 rounded-lg md:rounded-xl group shadow-lg touch-manipulation">
          <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 text-brand-gold group-hover:text-brand-cream transition-colors drop-shadow-sm" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 bg-brand-gradient text-xs font-bold rounded-full flex items-center justify-center text-brand-dark shadow-lg border border-brand-gold/50 animate-pulse">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-sm md:w-96 bg-brand-dark/95 backdrop-blur-xl border-l border-brand-gold/30 shadow-2xl">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-brand-gold font-playfair text-lg md:text-xl drop-shadow-lg">
            Coșul de cumpărături
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-4 space-y-4 h-full overflow-hidden flex flex-col">
          {items.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <ShoppingCart className="h-12 w-12 md:h-16 md:w-16 text-brand-gold/60 mx-auto mb-3 md:mb-4 drop-shadow-lg" />
              <p className="text-brand-cream/90 font-inter font-medium text-sm md:text-base">Coșul tău este gol</p>
              <p className="text-brand-cream/70 text-xs md:text-sm mt-2">Adaugă produse pentru a continua</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 md:space-y-4 flex-1 overflow-y-auto max-h-96 md:max-h-none">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 bg-brand-gold/10 rounded-lg md:rounded-xl border border-brand-gold/20 shadow-md">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md md:rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-brand-cream text-xs md:text-sm truncate">{item.name}</h4>
                      <p className="text-brand-gold font-semibold drop-shadow-sm text-xs md:text-sm">{item.price.toLocaleString('ro-RO')} Lei</p>
                    </div>
                    <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 md:h-8 md:w-8 text-brand-cream/80 hover:text-brand-gold hover:bg-brand-gold/10 rounded-md transition-all duration-200 touch-manipulation"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                      <span className="text-brand-cream font-medium w-6 md:w-8 text-center text-xs md:text-sm">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 md:h-8 md:w-8 text-brand-cream/80 hover:text-brand-gold hover:bg-brand-gold/10 rounded-md transition-all duration-200 touch-manipulation"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 md:h-8 md:w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-all duration-200 touch-manipulation"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-brand-gold/30 pt-4 space-y-4">
                {/* Payment Method Selection */}
                <div className="space-y-3">
                  <span className="font-semibold text-brand-cream font-playfair text-sm">Metoda de plată:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('card')}
                      className={`h-12 flex items-center gap-2 ${
                        paymentMethod === 'card' 
                          ? 'bg-brand-gradient text-brand-dark' 
                          : 'border-brand-gold/50 text-brand-cream hover:bg-brand-gold/10'
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                      Card
                      {paymentMethod === 'card' && (
                        <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">-5%</span>
                      )}
                    </Button>
                    <Button
                      variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('cash')}
                      className={`h-12 flex items-center gap-2 ${
                        paymentMethod === 'cash' 
                          ? 'bg-brand-gradient text-brand-dark' 
                          : 'border-brand-gold/50 text-brand-cream hover:bg-brand-gold/10'
                      }`}
                    >
                      <Banknote className="h-4 w-4" />
                      Numerar
                    </Button>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-brand-cream/80">Subtotal:</span>
                    <span className="text-brand-cream">
                      {getTotalPrice().toLocaleString('ro-RO')} Lei
                    </span>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="flex justify-between items-center">
                      <span className="text-green-400">Discount card (10%):</span>
                      <span className="text-green-400">
                        -{getDiscount().toLocaleString('ro-RO')} Lei
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center border-t border-brand-gold/30 pt-2">
                    <span className="font-semibold text-brand-cream font-playfair text-lg">Total final:</span>
                    <span className="font-bold text-brand-gold text-xl font-playfair drop-shadow-lg">
                      {getDiscountedPrice().toLocaleString('ro-RO')} Lei
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-brand-gradient hover:opacity-90 text-brand-dark font-semibold h-12 shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                  >
                    Finalizează Comanda
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={clearCart}
                    className="w-full border-brand-gold/50 text-brand-cream hover:bg-brand-gold/10 hover:border-brand-gold/70 transition-all duration-300"
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