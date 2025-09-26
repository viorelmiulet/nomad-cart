import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Banknote, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: user?.user_metadata?.display_name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (items.length === 0) {
      navigate('/');
      return;
    }
  }, [items, navigate]);

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

  const handleCheckout = async () => {
    if (!customerData.name || !customerData.email || !customerData.address) {
      toast({
        title: "Date incomplete",
        description: "Te rugăm să completezi toate câmpurile obligatorii.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      console.log("Starting checkout process with payment method:", paymentMethod);
      console.log("Customer data:", customerData);
      console.log("Cart items:", items);
      
      if (paymentMethod === 'cash') {
        console.log("Processing cash payment...");
        
        // For cash payments, create order directly in database
        const orderData = {
          customer_name: customerData.name,
          customer_email: customerData.email,
          customer_phone: customerData.phone,
          customer_address: customerData.address,
          total: getTotalPrice(),
          status: 'pending'
        };
        
        console.log("Creating order with data:", orderData);
        
        const { data: orderRecord, error: orderError } = await supabase
          .from('orders')
          .insert([orderData])
          .select()
          .single();

        if (orderError) {
          console.error("Order creation error:", orderError);
          throw orderError;
        }
        
        console.log("Order created successfully:", orderRecord);

        // Create order items
        const orderItems = items.map(item => ({
          order_id: orderRecord.id,
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        }));
        
        console.log("Creating order items:", orderItems);

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) {
          console.error("Order items creation error:", itemsError);
          throw itemsError;
        }
        
        console.log("Order items created successfully");

        clearCart();
        toast({
          title: "Comandă plasată",
          description: "Comanda ta a fost plasată cu succes. Vei fi contactat pentru livrare.",
        });
        navigate('/');
      } else {
        // For card payments, redirect to Stripe checkout
        const orderData = {
          customer_name: customerData.name,
          customer_email: customerData.email,
          customer_phone: customerData.phone,
          customer_address: customerData.address,
          total: getTotalPrice(),
          items: items
        };

        const { data, error } = await supabase.functions.invoke('create-payment', {
          body: {
            orderData,
            paymentMethod
          }
        });

        if (error) throw error;

        // Redirect to Stripe checkout
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error details:', error);
      console.error('Error type:', typeof error);
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      
      toast({
        title: "Eroare",
        description: `A apărut o eroare la procesarea comenzii: ${error instanceof Error ? error.message : 'Eroare necunoscută'}. Încearcă din nou.`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la magazin
          </Button>
          <h1 className="text-3xl font-bold">Finalizare Comandă</h1>
          <p className="text-muted-foreground">Completează datele pentru a plasa comanda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informații de Contact</CardTitle>
              <CardDescription>Completează datele de contact pentru comandă</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nume complet *</Label>
                <Input
                  id="name"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="address">Adresa de livrare *</Label>
                <Input
                  id="address"
                  value={customerData.address}
                  onChange={(e) => setCustomerData({...customerData, address: e.target.value})}
                  placeholder="Strada, numărul, orașul, județul"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Sumar Comandă</CardTitle>
              <CardDescription>Verifică produsele și metoda de plată</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Products */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Cantitate: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">{(item.price * item.quantity).toLocaleString('ro-RO')} RON</p>
                  </div>
                ))}
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3 border-t pt-4">
                <Label>Metoda de plată:</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={paymentMethod === 'card' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('card')}
                    className="h-12 flex items-center gap-2"
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
                    className="h-12 flex items-center gap-2"
                  >
                    <Banknote className="h-4 w-4" />
                    Numerar
                  </Button>
                </div>
              </div>

              {/* Price Summary */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{getTotalPrice().toLocaleString('ro-RO')} RON</span>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount card (5%):</span>
                    <span>-{getDiscount().toLocaleString('ro-RO')} RON</span>
                  </div>
                )}
                
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>{getDiscountedPrice().toLocaleString('ro-RO')} RON</span>
                </div>
              </div>

              <Button 
                onClick={handleCheckout}
                disabled={loading}
                className="w-full h-12"
                size="lg"
              >
                {loading ? (
                  "Procesare..."
                ) : paymentMethod === 'card' ? (
                  "Plătește cu Cardul"
                ) : (
                  "Plasează Comanda"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;