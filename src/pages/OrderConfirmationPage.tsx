import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { fetchShopifyProducts, ShopifyProduct } from "@/lib/shopify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Package, ArrowRight, Home } from "lucide-react";
import { ShopifyProductCard } from "@/components/ShopifyProductCard";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const { lastCheckoutItems, clearLastCheckoutItems, clearCart } = useCartStore();
  const [recommendations, setRecommendations] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If no order items, redirect to home
    if (!lastCheckoutItems || lastCheckoutItems.length === 0) {
      navigate('/');
      return;
    }

    // Clear the actual cart since checkout was completed
    clearCart();

    // Fetch recommendations based on purchased items
    const loadRecommendations = async () => {
      try {
        // Get all products and filter out purchased ones
        const allProducts = await fetchShopifyProducts(20);
        const purchasedIds = lastCheckoutItems.map(item => item.product.node.id);
        const recommended = allProducts
          .filter(product => !purchasedIds.includes(product.node.id))
          .slice(0, 4);
        
        setRecommendations(recommended);
      } catch (error) {
        console.error('Failed to load recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendations();
  }, [lastCheckoutItems, navigate, clearCart]);

  const totalAmount = lastCheckoutItems.reduce(
    (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
    0
  );

  const currencyCode = lastCheckoutItems[0]?.price.currencyCode || 'RON';

  return (
    <>
      <SEO 
        title="Comandă Confirmată - Mulțumim pentru Cumpărare!"
        description="Comanda ta a fost plasată cu succes. Vezi detaliile comenzii și produse recomandate."
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          {/* Success Message */}
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="border-2 border-accent">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-3xl mb-2">Comandă Plasată cu Succes!</CardTitle>
                  <CardDescription className="text-base">
                    Vei primi un email de confirmare cu detaliile comenzii în câteva momente.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Details */}
                <div className="bg-secondary/20 rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <Package className="w-5 h-5" />
                    <span>Detalii Comandă</span>
                  </div>
                  
                  <div className="space-y-3">
                    {lastCheckoutItems.map((item) => (
                      <div key={item.variantId} className="flex gap-4">
                        <div className="w-20 h-20 bg-background rounded-md overflow-hidden flex-shrink-0">
                          {item.product.node.images?.edges?.[0]?.node && (
                            <img
                              src={item.product.node.images.edges[0].node.url}
                              alt={item.product.node.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.node.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.selectedOptions.map(opt => opt.value).join(' • ')}
                          </p>
                          <p className="text-sm">
                            Cantitate: {item.quantity} × {currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                          </p>
                        </div>
                        <div className="font-semibold">
                          {currencyCode} {(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-accent">
                      {currencyCode} {totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Tracking Info */}
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                  <p className="text-sm text-center">
                    📦 Vei primi un număr de tracking prin email când comanda ta va fi expediată.
                    Poți verifica statusul comenzii în secțiunea <strong>Comenzile Mele</strong> din contul tău Shopify.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate('/')}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Înapoi la Magazin
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      clearLastCheckoutItems();
                      navigate('/');
                    }}
                  >
                    Continuă Cumpărăturile
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            {!isLoading && recommendations.length > 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">S-ar Putea să-ți Placă Și</h2>
                  <p className="text-muted-foreground">Produse selectate special pentru tine</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recommendations.map((product) => (
                    <ShopifyProductCard key={product.node.id} product={product} />
                  ))}
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

export default OrderConfirmationPage;
