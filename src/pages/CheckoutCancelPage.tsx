import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";

const CheckoutCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl text-red-600">
                Plată Anulată
              </CardTitle>
              <CardDescription>
                Plata a fost anulată. Coșul tău de cumpărături a fost păstrat.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-4 bg-yellow-50/50">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 text-yellow-600" />
                  <div>
                    <h3 className="font-semibold text-yellow-900">Produsele tale sunt în siguranță</h3>
                    <p className="text-sm text-yellow-700">
                      Toate produsele din coșul tău au fost păstrate. Poți continua cumpărăturile sau încerca din nou plata.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => navigate('/checkout')}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Încearcă Din Nou
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  Continuă Cumpărăturile
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

export default CheckoutCancelPage;