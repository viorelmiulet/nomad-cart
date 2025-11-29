import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ShoppingCart, 
  ArrowLeft, 
  Plus, 
  Minus,
  Loader2
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "@/hooks/use-toast";
import { ShopifyProduct, storefrontApiRequest } from "@/lib/shopify";

const ShopifyProductDetailsPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);

  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!handle) return;
    
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const query = `
          query GetProductByHandle($handle: String!) {
            product(handle: $handle) {
              id
              title
              description
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 10) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 20) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    availableForSale
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              options {
                name
                values
              }
            }
          }
        `;

        const data = await storefrontApiRequest(query, { handle });
        
        if (data?.data?.product) {
          const productData = {
            node: data.data.product
          };
          setProduct(productData);
          
          const firstImage = data.data.product.images.edges[0]?.node.url;
          if (firstImage) {
            setSelectedImage(firstImage);
          }
          
          const firstVariant = data.data.product.variants.edges[0]?.node;
          if (firstVariant) {
            setSelectedVariant(firstVariant);
            const initialOptions: Record<string, string> = {};
            firstVariant.selectedOptions.forEach((opt: any) => {
              initialOptions[opt.name] = opt.value;
            });
            setSelectedOptions(initialOptions);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Eroare",
          description: "Nu s-a putut încărca produsul",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);
    
    const variant = product?.node.variants.edges.find(({ node }: any) => {
      return node.selectedOptions.every((opt: any) => 
        newOptions[opt.name] === opt.value
      );
    });
    
    if (variant) {
      setSelectedVariant(variant.node);
    }
  };

  const handleImageChange = (url: string) => {
    setImageLoaded(false);
    setSelectedImage(url);
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) {
      toast({
        title: "Eroare",
        description: "Te rugăm să selectezi toate opțiunile",
        variant: "destructive",
      });
      return;
    }

    const cartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions
    };
    
    addItem(cartItem);
    
    toast({
      title: "Adăugat în coș!",
      description: `${quantity}x ${product.node.title} a fost adăugat în coș.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="aspect-square" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-dark">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-brand-cream">Produsul nu a fost găsit</h1>
            <Button onClick={() => navigate(-1)} className="bg-brand-gradient">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Înapoi
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const allImages = product.node.images.edges.map(({ node }) => node);

  return (
    <div className="min-h-screen bg-brand-dark">
      <SEO
        title={product.node.title}
        description={product.node.description || `${product.node.title} - Comandă online`}
        ogImage={selectedImage}
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-brand-cream hover:text-brand-gold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-brand-dark border border-brand-gold/20 relative">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full animate-pulse bg-gradient-to-br from-brand-gold/10 via-brand-gold/5 to-transparent" />
                </div>
              )}
              <img
                src={selectedImage}
                alt={product.node.title}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-500 hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(image.url)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors relative ${
                      selectedImage === image.url 
                        ? 'border-brand-gold' 
                        : 'border-brand-gold/20 hover:border-brand-gold/50'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.altText || `${product.node.title} ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-cream font-playfair">
              {product.node.title}
            </h1>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-brand-gold font-playfair">
                  {parseFloat(selectedVariant?.price.amount || product.node.priceRange.minVariantPrice.amount).toFixed(2)} {selectedVariant?.price.currencyCode || product.node.priceRange.minVariantPrice.currencyCode}
                </span>
                {selectedVariant && !selectedVariant.availableForSale && (
                  <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                    Stoc epuizat
                  </Badge>
                )}
              </div>
            </div>

            {product.node.description && (
              <div className="prose prose-sm max-w-none">
                <p className="text-brand-cream/80 leading-relaxed">
                  {product.node.description}
                </p>
              </div>
            )}

            {/* Options */}
            {product.node.options.map((option) => (
              <div key={option.name} className="space-y-2">
                <label className="font-semibold text-brand-cream">{option.name}:</label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => (
                    <Button
                      key={value}
                      variant={selectedOptions[option.name] === value ? "default" : "outline"}
                      className={selectedOptions[option.name] === value 
                        ? "bg-brand-gradient text-brand-dark" 
                        : "border-brand-gold/50 text-brand-cream hover:bg-brand-gold/10"
                      }
                      onClick={() => handleOptionChange(option.name, value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-brand-cream">Cantitate:</span>
              <div className="flex items-center border border-brand-gold/30 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="text-brand-cream hover:text-brand-gold"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center text-brand-cream">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-brand-cream hover:text-brand-gold"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full bg-brand-gradient hover:opacity-90 text-brand-dark font-bold"
              disabled={!selectedVariant?.availableForSale}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {selectedVariant?.availableForSale ? 'Adaugă în coș' : 'Stoc epuizat'}
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShopifyProductDetailsPage;
