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
      return total * 0.95; // 5% discount for card payments
    }
    return total;
  };

  const getDiscount = () => {
    if (paymentMethod === 'card') {
      return getTotalPrice() * 0.05;
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
        <Button size="icon" variant="ghost" className="relative h-12 w-12 bg-luxury-gold/20 backdrop-blur-lg border-2 border-luxury-gold/50 hover:bg-luxury-gold/30 hover:border-luxury-gold/70 rounded-xl group shadow-lg">
          <ShoppingCart className="h-5 w-5 text-luxury-gold group-hover:text-luxury-cream transition-colors drop-shadow-sm" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-luxury-gradient text-xs font-bold rounded-full flex items-center justify-center text-luxury-dark shadow-lg border border-luxury-gold/50 animate-pulse">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96 bg-luxury-dark/95 backdrop-blur-xl border-l border-luxury-gold/30 shadow-2xl">
        <SheetHeader>
          <SheetTitle className="text-luxury-gold font-playfair text-xl drop-shadow-lg">
            Coșul de cumpărături
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-luxury-gold/60 mx-auto mb-4 drop-shadow-lg" />
              <p className="text-luxury-cream/90 font-inter font-medium">Coșul tău este gol</p>
              <p className="text-luxury-cream/70 text-sm mt-2">Adaugă produse pentru a continua</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-luxury-gold/10 rounded-xl border border-luxury-gold/20 shadow-md">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-luxury-cream text-sm">{item.name}</h4>
                      <p className="text-luxury-gold font-semibold drop-shadow-sm">{item.price.toLocaleString('ro-RO')} Lei</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-luxury-cream/80 hover:text-luxury-gold hover:bg-luxury-gold/10 rounded-md transition-all duration-200"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-luxury-cream font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-luxury-cream/80 hover:text-luxury-gold hover:bg-luxury-gold/10 rounded-md transition-all duration-200"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-all duration-200"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-luxury-gold/30 pt-4 space-y-4">
                {/* Payment Method Selection */}
                <div className="space-y-3">
                  <span className="font-semibold text-luxury-cream font-playfair text-sm">Metoda de plată:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('card')}
                      className={`h-12 flex items-center gap-2 ${
                        paymentMethod === 'card' 
                          ? 'bg-luxury-gradient text-luxury-dark' 
                          : 'border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10'
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
                          ? 'bg-luxury-gradient text-luxury-dark' 
                          : 'border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10'
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
                    <span className="text-luxury-cream/80">Subtotal:</span>
                    <span className="text-luxury-cream">
                      {getTotalPrice().toLocaleString('ro-RO')} Lei
                    </span>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="flex justify-between items-center">
                      <span className="text-green-400">Discount card (5%):</span>
                      <span className="text-green-400">
                        -{getDiscount().toLocaleString('ro-RO')} Lei
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center border-t border-luxury-gold/30 pt-2">
                    <span className="font-semibold text-luxury-cream font-playfair text-lg">Total final:</span>
                    <span className="font-bold text-luxury-gold text-xl font-playfair drop-shadow-lg">
                      {getDiscountedPrice().toLocaleString('ro-RO')} Lei
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-luxury-gradient hover:opacity-90 text-luxury-dark font-semibold h-12 shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                  >
                    Finalizează Comanda
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={clearCart}
                    className="w-full border-luxury-gold/50 text-luxury-cream hover:bg-luxury-gold/10 hover:border-luxury-gold/70 transition-all duration-300"
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