import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    const verifyPayment = async () => {
      if (!sessionId) {
        toast({
          title: "Eroare",
          description: "Nu s-a găsit ID-ul sesiunii de plată.",
          variant: "destructive"
        });
        navigate('/');
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { session_id: sessionId }
        });

        if (error) throw error;

        if (data.success) {
          setOrderDetails(data);
          clearCart();
          toast({
            title: "Plată reușită!",
            description: "Comanda ta a fost procesată cu succes.",
          });
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        toast({
          title: "Eroare",
          description: "A apărut o eroare la verificarea plății.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate, toast, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Verificare plată...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">
                Plată Reușită!
              </CardTitle>
              <CardDescription>
                Comanda ta a fost procesată cu succes și va fi procesată în curând.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {orderDetails && (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <h3 className="font-semibold mb-2">Detalii Comandă</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>ID Comandă:</span>
                        <span className="font-mono">{orderDetails.order_id?.slice(0, 8).toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Metoda de plată:</span>
                        <span>{orderDetails.payment_method === 'card' ? 'Card bancar' : 'Numerar'}</span>
                      </div>
                      {orderDetails.discount_applied && orderDetails.discount_applied !== '0%' && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount aplicat:</span>
                          <span>{orderDetails.discount_applied}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-blue-50/50">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-blue-900">Ce urmează?</h3>
                        <p className="text-sm text-blue-700">
                          Vei primi un email de confirmare și vei fi contactat pentru programarea livrării.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  Continuă Cumpărăturile
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/orders')}
                  className="flex-1"
                >
                  Vezi Comenzile Mele
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutSuccessPage;