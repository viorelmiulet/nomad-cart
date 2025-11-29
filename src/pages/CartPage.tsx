import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Loader2, ExternalLink } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    items, 
    isLoading, 
    updateQuantity, 
    removeItem, 
    clearCart,
    createCheckout 
  } = useCartStore();
  
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  
  const currencyCode = items[0]?.price.currencyCode || 'RON';

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setIsCreatingCheckout(true);
    try {
      await createCheckout();
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
        toast.success("Checkout creat!", {
          description: "Vei fi redirecționat către pagina de plată Shopify."
        });
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error("Eroare la crearea checkout-ului", {
        description: "Te rugăm să încerci din nou."
      });
    } finally {
      setIsCreatingCheckout(false);
    }
  };

  const handleRemoveItem = (variantId: string, productTitle: string) => {
    removeItem(variantId);
    toast.success("Produs eliminat", {
      description: `${productTitle} a fost eliminat din coș.`
    });
  };

  const handleClearCart = () => {
    if (items.length === 0) return;
    clearCart();
    toast.success("Coș golit", {
      description: "Toate produsele au fost eliminate din coș."
    });
  };

  return (
    <>
      <SEO 
        title="Coșul tău de cumpărături - Mobila Nomad"
        description="Revizuiește produsele din coșul tău de cumpărături și finalizează comanda."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Header />
        
        <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header section */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(-1)}
                  className="group"
                >
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Înapoi
                </Button>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Coșul tău
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {totalItems === 0 ? "Coșul tău este gol" : `${totalItems} produs${totalItems !== 1 ? 'e' : ''} în coș`}
                  </p>
                </div>
              </div>
              
              {items.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCart}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Golește coșul
                </Button>
              )}
            </div>

            {items.length === 0 ? (
              <Card className="border-2 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 md:py-24">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Coșul tău este gol</h2>
                  <p className="text-muted-foreground mb-6 text-center max-w-md">
                    Adaugă produse în coș pentru a continua cumpărăturile
                  </p>
                  <Button onClick={() => navigate("/")}>
                    Explorează produsele
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart items */}
                <div className="lg:col-span-2 space-y-4">
                  {items.map((item) => (
                    <Card key={item.variantId} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex gap-4 md:gap-6">
                          {/* Product image */}
                          <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                            {item.product.node.images?.edges?.[0]?.node && (
                              <img
                                src={item.product.node.images.edges[0].node.url}
                                alt={item.product.node.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            )}
                          </div>
                          
                          {/* Product details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-lg truncate mb-1">
                                  {item.product.node.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {item.selectedOptions.map(option => option.value).join(' • ')}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                                onClick={() => handleRemoveItem(item.variantId, item.product.node.title)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              {/* Quantity controls */}
                              <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-12 text-center font-medium">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              {/* Price */}
                              <div className="text-right">
                                <div className="text-lg font-bold">
                                  {currencyCode} {(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                                </div>
                                {item.quantity > 1 && (
                                  <div className="text-xs text-muted-foreground">
                                    {currencyCode} {parseFloat(item.price.amount).toFixed(2)} / buc
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Order summary - sticky on desktop */}
                <div className="lg:col-span-1">
                  <div className="lg:sticky lg:top-24">
                    <Card className="border-2">
                      <CardContent className="p-6 space-y-4">
                        <h2 className="text-xl font-semibold">Sumar comandă</h2>
                        
                        <Separator />
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal ({totalItems} produse)</span>
                            <span className="font-medium">{currencyCode} {subtotal.toFixed(2)}</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Livrare</span>
                            <span className="font-medium">Calculată la checkout</span>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Total</span>
                          <span className="text-2xl font-bold">
                            {currencyCode} {subtotal.toFixed(2)}
                          </span>
                        </div>
                        
                        <Button 
                          onClick={handleCheckout}
                          className="w-full h-12 text-base" 
                          size="lg"
                          disabled={items.length === 0 || isCreatingCheckout}
                        >
                          {isCreatingCheckout ? (
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
                        
                        <p className="text-xs text-muted-foreground text-center">
                          Vei fi redirecționat către Shopify pentru plată securizată
                        </p>
                      </CardContent>
                    </Card>
                    
                    {/* Continue shopping */}
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => navigate("/")}
                    >
                      Continuă cumpărăturile
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CartPage;
