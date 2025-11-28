import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Banknote, Tag, X, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDiscount } from "@/hooks/useDiscount";
import { supabase } from "@/integrations/supabase/client";

const CartDrawer = () => {
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice, clearCart, isOpen, setIsOpen, appliedDiscount, setAppliedDiscount } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [discountCode, setDiscountCode] = useState('');
  const [checkingCode, setCheckingCode] = useState(false);
  const { discountPercentage } = useDiscount();
  const navigate = useNavigate();

  const applyDiscountCode = async () => {
    if (!discountCode.trim()) {
      toast({
        title: "Eroare",
        description: "Introduceți un cod de reducere.",
        variant: "destructive"
      });
      return;
    }

    setCheckingCode(true);

    try {
      const { data, error } = await supabase
        .from('discount_codes')
        .select('*')
        .eq('code', discountCode.toUpperCase())
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast({
          title: "Cod invalid",
          description: "Codul introdus nu este valid sau nu este activ.",
          variant: "destructive"
        });
        return;
      }

      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        toast({
          title: "Cod expirat",
          description: "Acest cod de reducere a expirat.",
          variant: "destructive"
        });
        return;
      }

      if (data.max_uses !== null && data.current_uses >= data.max_uses) {
        toast({
          title: "Cod indisponibil",
          description: "Acest cod de reducere a fost folosit de numărul maxim de ori.",
          variant: "destructive"
        });
        return;
      }

      setAppliedDiscount({
        id: data.id,
        code: data.code,
        type: data.discount_type as 'percentage' | 'fixed',
        value: data.discount_value
      });

      const discountText = data.discount_type === 'percentage' 
        ? `${data.discount_value}%` 
        : `${data.discount_value} RON`;
      
      toast({
        title: "Cod aplicat!",
        description: `Reducere de ${discountText} aplicată.`,
      });
    } catch (error) {
      console.error("Error applying discount code:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut aplica codul de reducere.",
        variant: "destructive"
      });
    } finally {
      setCheckingCode(false);
    }
  };

  const removeDiscountCode = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    toast({
      title: "Cod eliminat",
      description: "Codul de reducere a fost eliminat.",
    });
  };

  const getDiscountedPrice = () => {
    let total = getTotalPrice();
    
    // Apply discount code first
    if (appliedDiscount) {
      if (appliedDiscount.type === 'percentage') {
        total = total * (1 - appliedDiscount.value / 100);
      } else {
        total = Math.max(0, total - appliedDiscount.value);
      }
    }
    
    // Then apply card payment discount
    if (paymentMethod === 'card') {
      total = total * (1 - discountPercentage / 100);
    }
    
    return total;
  };

  const getCardDiscount = () => {
    if (paymentMethod === 'card') {
      let baseTotal = getTotalPrice();
      if (appliedDiscount) {
        if (appliedDiscount.type === 'percentage') {
          baseTotal = baseTotal * (1 - appliedDiscount.value / 100);
        } else {
          baseTotal = Math.max(0, baseTotal - appliedDiscount.value);
        }
      }
      return baseTotal * (discountPercentage / 100);
    }
    return 0;
  };

  const getCodeDiscount = () => {
    if (appliedDiscount) {
      if (appliedDiscount.type === 'percentage') {
        return getTotalPrice() * (appliedDiscount.value / 100);
      } else {
        return Math.min(appliedDiscount.value, getTotalPrice());
      }
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

  const handleWhatsAppOrder = () => {
    if (items.length === 0) {
      toast({
        title: "Coșul este gol",
        description: "Adaugă produse în coș pentru a comanda prin WhatsApp.",
        variant: "destructive"
      });
      return;
    }

    const phoneNumber = "40758433114";
    let message = "Salut! Doresc să comand următoarele produse:\n\n";
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Cantitate: ${item.quantity} buc\n`;
      message += `   Preț: ${item.price.toLocaleString('ro-RO')} Lei\n`;
      message += `   Subtotal: ${(item.price * item.quantity).toLocaleString('ro-RO')} Lei\n\n`;
    });
    
    const discountedPrice = getDiscountedPrice();
    message += `*Subtotal: ${getTotalPrice().toLocaleString('ro-RO')} Lei*\n`;
    
    if (appliedDiscount) {
      const discountText = appliedDiscount.type === 'percentage' 
        ? `${appliedDiscount.value}%` 
        : `${appliedDiscount.value} Lei`;
      message += `Cod reducere (${discountText}): -${getCodeDiscount().toLocaleString('ro-RO')} Lei\n`;
    }
    
    if (paymentMethod === 'card') {
      message += `Discount card (${discountPercentage}%): -${getCardDiscount().toLocaleString('ro-RO')} Lei\n`;
    }
    
    message += `\n*TOTAL COMANDĂ: ${discountedPrice.toLocaleString('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Lei*\n`;
    message += `\nMetodă plată: ${paymentMethod === 'card' ? 'Card Bancar' : 'Numerar'}\n`;
    message += "\nAștept confirmarea comenzii. Mulțumesc!";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setIsOpen(false);
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
      <SheetContent className="w-full sm:max-w-md md:max-w-lg bg-brand-dark/95 backdrop-blur-xl border-l border-brand-gold/30 shadow-2xl overflow-y-auto">
        <SheetHeader className="pb-4 border-b border-brand-gold/20">
          <SheetTitle className="text-brand-gold font-playfair text-xl md:text-2xl drop-shadow-lg">
            Coșul de cumpărături
          </SheetTitle>
          <SheetDescription className="text-brand-cream/70 text-sm">
            {getTotalItems() > 0 ? `${getTotalItems()} ${getTotalItems() === 1 ? 'produs' : 'produse'} în coș` : 'Coșul tău este gol'}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4 flex flex-col h-[calc(100vh-120px)]">
          {items.length === 0 ? (
            <div className="text-center py-12 md:py-16">
              <ShoppingCart className="h-16 w-16 md:h-20 md:w-20 text-brand-gold/60 mx-auto mb-4 drop-shadow-lg" />
              <p className="text-brand-cream/90 font-inter font-medium text-base md:text-lg">Coșul tău este gol</p>
              <p className="text-brand-cream/70 text-sm md:text-base mt-2">Adaugă produse pentru a continua</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 md:space-y-4 flex-1 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 md:p-4 bg-brand-gold/10 rounded-lg md:rounded-xl border border-brand-gold/20 shadow-md">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-brand-cream text-sm md:text-base mb-1">{item.name}</h4>
                      <p className="text-brand-gold font-semibold drop-shadow-sm text-sm md:text-base">{item.price.toLocaleString('ro-RO')} Lei</p>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 md:h-10 md:w-10 text-brand-cream/80 hover:text-brand-gold hover:bg-brand-gold/10 rounded-md transition-all duration-200 touch-manipulation"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-brand-cream font-medium w-8 md:w-10 text-center text-sm md:text-base">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 md:h-10 md:w-10 text-brand-cream/80 hover:text-brand-gold hover:bg-brand-gold/10 rounded-md transition-all duration-200 touch-manipulation"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 md:h-10 md:w-10 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-all duration-200 touch-manipulation"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-brand-gold/30 pt-4 space-y-4 pb-4">
                {/* Discount Code Section */}
                <div className="space-y-2">
                  <Label className="text-brand-cream font-medium text-sm flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Cod de reducere
                  </Label>
                  {appliedDiscount ? (
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-green-400 text-sm">
                          {appliedDiscount.code}
                        </span>
                        <span className="text-xs text-green-400">
                          ({appliedDiscount.type === 'percentage' 
                            ? `-${appliedDiscount.value}%` 
                            : `-${appliedDiscount.value} RON`})
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeDiscountCode}
                        className="text-red-400 hover:text-red-300 h-7"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Introdu codul"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                        onKeyPress={(e) => e.key === 'Enter' && applyDiscountCode()}
                        className="uppercase bg-brand-dark/50 border-brand-gold/30 text-brand-cream placeholder:text-brand-cream/50"
                      />
                      <Button
                        variant="outline"
                        onClick={applyDiscountCode}
                        disabled={checkingCode || !discountCode.trim()}
                        className="border-brand-gold/50 text-brand-cream hover:bg-brand-gold/10"
                      >
                        {checkingCode ? "..." : "Aplică"}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-2">
                  <Label className="font-semibold text-brand-cream font-playfair text-sm">Metoda de plată:</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('card')}
                      className={`h-11 md:h-12 flex items-center gap-2 text-sm md:text-base ${
                        paymentMethod === 'card' 
                          ? 'bg-brand-gradient text-brand-dark' 
                          : 'border-brand-gold/50 text-brand-cream hover:bg-brand-gold/10'
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                      Card
                      {paymentMethod === 'card' && (
                        <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">-{discountPercentage}%</span>
                      )}
                    </Button>
                    <Button
                      variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('cash')}
                      className={`h-11 md:h-12 flex items-center gap-2 text-sm md:text-base ${
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
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-sm md:text-base">
                    <span className="text-brand-cream/80">Subtotal:</span>
                    <span className="text-brand-cream">
                      {getTotalPrice().toLocaleString('ro-RO')} Lei
                    </span>
                  </div>
                  
                  {appliedDiscount && (
                    <div className="flex justify-between items-center text-sm md:text-base">
                      <span className="text-green-400">
                        Cod reducere ({appliedDiscount.type === 'percentage' 
                          ? `${appliedDiscount.value}%` 
                          : `${appliedDiscount.value} RON`}):
                      </span>
                      <span className="text-green-400">
                        -{getCodeDiscount().toLocaleString('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Lei
                      </span>
                    </div>
                  )}
                  
                  {paymentMethod === 'card' && (
                    <div className="flex justify-between items-center text-sm md:text-base">
                      <span className="text-green-400">Discount card ({discountPercentage}%):</span>
                      <span className="text-green-400">
                        -{getCardDiscount().toLocaleString('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Lei
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center border-t border-brand-gold/30 pt-2">
                    <span className="font-semibold text-brand-cream font-playfair text-base md:text-lg">Total:</span>
                    <span className="font-bold text-brand-gold text-xl md:text-2xl font-playfair drop-shadow-lg">
                      {getDiscountedPrice().toLocaleString('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Lei
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-brand-gradient hover:opacity-90 text-brand-dark font-semibold h-12 md:h-14 text-sm md:text-base shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                  >
                    Finalizează Comanda
                  </Button>
                  <Button 
                    onClick={handleWhatsAppOrder}
                    variant="outline"
                    className="w-full border-2 border-green-500/50 bg-glass-gradient text-brand-cream hover:bg-green-500/10 hover:border-green-400/70 transition-all duration-300 h-12 md:h-14 text-sm md:text-base flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Comandă pe WhatsApp
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={clearCart}
                    className="w-full border-brand-gold/50 text-brand-cream hover:bg-brand-gold/10 hover:border-brand-gold/70 transition-all duration-300 h-10 md:h-11 text-sm md:text-base"
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