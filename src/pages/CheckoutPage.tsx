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
import { CreditCard, Banknote } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    county: '',
    city: '',
    street: '',
    number: '',
    bloc: '',
    floor: '',
    apartment: '',
    otherDetails: ''
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
    const fullName = `${customerData.firstName} ${customerData.lastName}`.trim();
    const addressParts = [
      `${customerData.street} ${customerData.number}`,
      customerData.bloc && `Bloc ${customerData.bloc}`,
      customerData.floor && `Etaj ${customerData.floor}`,
      customerData.apartment && `Ap. ${customerData.apartment}`,
      customerData.city,
      customerData.county,
      customerData.otherDetails && `(${customerData.otherDetails})`
    ].filter(Boolean);
    
    const fullAddress = addressParts.join(', ');
    
    if (!customerData.firstName || !customerData.lastName || !customerData.email || 
        !customerData.phone || !customerData.county || !customerData.city || 
        !customerData.street || !customerData.number) {
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
          customer_name: fullName,
          customer_email: customerData.email,
          customer_phone: customerData.phone,
          customer_address: fullAddress,
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
          customer_name: fullName,
          customer_email: customerData.email,
          customer_phone: customerData.phone,
          customer_address: fullAddress,
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nume *</Label>
                  <Input
                    id="firstName"
                    value={customerData.firstName}
                    onChange={(e) => setCustomerData({...customerData, firstName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Prenume *</Label>
                  <Input
                    id="lastName"
                    value={customerData.lastName}
                    onChange={(e) => setCustomerData({...customerData, lastName: e.target.value})}
                    required
                  />
                </div>
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
                <Label htmlFor="phone">Telefon *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="county">Județ *</Label>
                  <Input
                    id="county"
                    value={customerData.county}
                    onChange={(e) => setCustomerData({...customerData, county: e.target.value})}
                    placeholder="ex: București"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">Localitate *</Label>
                  <Input
                    id="city"
                    value={customerData.city}
                    onChange={(e) => setCustomerData({...customerData, city: e.target.value})}
                    placeholder="ex: Sectorul 1"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="street">Strada *</Label>
                  <Input
                    id="street"
                    value={customerData.street}
                    onChange={(e) => setCustomerData({...customerData, street: e.target.value})}
                    placeholder="ex: Calea Victoriei"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="number">Număr *</Label>
                  <Input
                    id="number"
                    value={customerData.number}
                    onChange={(e) => setCustomerData({...customerData, number: e.target.value})}
                    placeholder="ex: 15"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bloc">Bloc</Label>
                  <Input
                    id="bloc"
                    value={customerData.bloc}
                    onChange={(e) => setCustomerData({...customerData, bloc: e.target.value})}
                    placeholder="ex: A, B1, C2"
                  />
                </div>
                <div>
                  <Label htmlFor="floor">Etaj</Label>
                  <Input
                    id="floor"
                    value={customerData.floor}
                    onChange={(e) => setCustomerData({...customerData, floor: e.target.value})}
                    placeholder="ex: 3, Parter"
                  />
                </div>
                <div>
                  <Label htmlFor="apartment">Apartament</Label>
                  <Input
                    id="apartment"
                    value={customerData.apartment}
                    onChange={(e) => setCustomerData({...customerData, apartment: e.target.value})}
                    placeholder="ex: 15, A3"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="otherDetails">Alte detalii</Label>
                <Input
                  id="otherDetails"
                  value={customerData.otherDetails}
                  onChange={(e) => setCustomerData({...customerData, otherDetails: e.target.value})}
                  placeholder="ex: lângă intersecția cu strada X, interfon defect"
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