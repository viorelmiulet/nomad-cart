import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ProductReviews } from "@/components/ProductReviews";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Share, 
  Truck,
  Shield,
  RotateCcw
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/components/ui/use-toast";
import { useDiscount } from "@/hooks/useDiscount";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  created_at: string;
}

interface ProductImage {
  id: string;
  image_url: string;
  image_name: string;
  is_primary: boolean;
  display_order: number;
}

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const { discountPercentage } = useDiscount();

  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [averageRating, setAverageRating] = useState(4.5);
  const [reviewCount, setReviewCount] = useState(23);

  useEffect(() => {
    if (!id) return;
    
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        // Fetch product details
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (productError) {
          console.error('Error fetching product:', productError);
          toast({
            title: "Eroare",
            description: "Nu s-a putut încărca produsul",
            variant: "destructive",
          });
          return;
        }

        setProduct(productData);
        setSelectedImage(productData.image_url);

        // Fetch additional product images
        const { data: imagesData, error: imagesError } = await supabase
          .from('product_images')
          .select('*')
          .eq('product_id', id)
          .order('display_order', { ascending: true });

        if (imagesError) {
          console.error('Error fetching images:', imagesError);
        } else {
          setImages(imagesData || []);
          if (imagesData && imagesData.length > 0) {
            const primaryImage = imagesData.find(img => img.is_primary) || imagesData[0];
            setSelectedImage(primaryImage.image_url);
          }
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Eroare",
          description: "A apărut o eroare la încărcarea produsului",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, toast]);

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: selectedImage
      });
    }

    toast({
      title: "Adăugat în coș",
      description: `${quantity} x ${product.name} a fost adăugat în coș`,
    });
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedImage
    });

    toast({
      title: isInWishlist(product.id) ? "Eliminat din favorite" : "Adăugat la favorite",
      description: isInWishlist(product.id) 
        ? "Produsul a fost eliminat din lista de favorite"
        : "Produsul a fost adăugat la favorite",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: `Descoperă ${product?.name} la un preț excelent!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiat",
        description: "Link-ul produsului a fost copiat în clipboard",
      });
    }
  };

  const allImages = [
    ...(product?.image_url ? [{ url: product.image_url, id: 'main' }] : []),
    ...images.map(img => ({ url: img.image_url, id: img.id }))
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
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
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produsul nu a fost găsit</h1>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Înapoi
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isNew = new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  // Extract dimensions from product name or description
  const extractDimensions = (text: string) => {
    // Try multiple patterns for dimensions
    const patterns = [
      /(\d+)\s*[x×]\s*(\d+)(?:\s*[x×]\s*(\d+))?\s*cm/gi,
      /(\d+)\s*x\s*(\d+)\s*cm/gi,
      /dimensiuni[:\s]*(\d+)\s*[x×]\s*(\d+)(?:\s*[x×]\s*(\d+))?\s*cm/gi,
      /L(\d+)\s*[x×]\s*B(\d+)(?:\s*[x×]\s*H(\d+))?\s*cm/gi,
      /pat.*?(\d+)\s*[x×]\s*(\d+)\s*cm/gi
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        // Extract numbers from the match
        const numbers = match[0].match(/\d+/g);
        if (numbers && numbers.length >= 2) {
          if (numbers.length >= 3) {
            return `${numbers[0]} x ${numbers[1]} x ${numbers[2]} cm`;
          }
          return `${numbers[0]} x ${numbers[1]} cm`;
        }
      }
    }
    
    // If no specific dimensions found, add standard dormitor dimensions
    if (text.toLowerCase().includes('dormitor')) {
      return 'Pat: 160 x 200 cm (standard)';
    }
    
    return null;
  };

  const dimensions = extractDimensions(product.name) || extractDimensions(product.description || '') || 'Pat: 160 x 200 cm (standard)';

  // Extract color from product name
  const extractColor = (text: string) => {
    const colorRegex = /culoare\s+([^,]+?)(?:,|$)/i;
    const match = text.match(colorRegex);
    return match ? match[1].trim() : null;
  };

  const color = extractColor(product.name) || extractColor(product.description || '');

  const handleReviewsLoaded = (reviews: any[], avgRating: number) => {
    setReviewCount(reviews.length);
    if (reviews.length > 0) {
      setAverageRating(avgRating);
    }
  };

  // Product Schema Markup for SEO and Rich Snippets
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `${product.name} - mobilier de calitate superioară`,
    "image": [selectedImage, ...images.map(img => img.image_url)],
    "sku": product.id.slice(0, 8).toUpperCase(),
    "brand": {
      "@type": "Brand",
      "name": "Mobila Nomad"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "RON",
      "lowPrice": (product.price * (1 - discountPercentage / 100)).toFixed(0),
      "highPrice": product.price.toFixed(0),
      "offerCount": "2",
      "offers": [
        {
          "@type": "Offer",
          "price": product.price.toFixed(0),
          "priceCurrency": "RON",
          "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "itemCondition": "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "name": "Mobila Nomad"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "RON",
            "price": product.price.toFixed(0),
            "name": "Preț cash"
          }
        },
        {
          "@type": "Offer",
          "price": (product.price * (1 - discountPercentage / 100)).toFixed(0),
          "priceCurrency": "RON",
          "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "itemCondition": "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "name": "Mobila Nomad"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "RON",
            "price": (product.price * (1 - discountPercentage / 100)).toFixed(0),
            "name": "Preț card (discount " + discountPercentage + "%)"
          }
        }
      ]
    },
    "aggregateRating": reviewCount > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    } : undefined
  };

  const discountedPrice = (product.price * (1 - discountPercentage / 100)).toFixed(0);
  const metaDescription = `${product.name} - Preț: ${discountedPrice} Lei (card) / ${product.price} Lei (cash). ${product.stock > 0 ? 'În stoc' : 'Stoc epuizat'}. Livrare gratuită în România. Garanție 2 ani.`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={product.name}
        description={metaDescription}
        canonical={`https://mobilanomad.ro/product/${product.id}`}
        ogImage={selectedImage}
        keywords={`${product.name}, mobilier ${product.name.toLowerCase()}, cumpara ${product.name.toLowerCase()}, mobila dormitor, mobilier online, mobilier romania`}
        type="product"
        jsonLd={productSchema}
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="p-0 h-auto font-normal hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImage === image.url 
                        ? 'border-primary' 
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {isNew && (
                <Badge className="bg-brand-gold text-brand-dark">
                  Nou
                </Badge>
              )}
              {product.stock > 0 && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  În stoc
                </Badge>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-playfair">
              {product.name}
            </h1>

            {/* Rating */}
            {reviewCount > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(averageRating) ? "text-brand-gold fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({averageRating.toFixed(1)}/5 • {reviewCount} {reviewCount === 1 ? 'recenzie' : 'recenzii'})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="space-y-2">
              {/* Preț cash */}
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-foreground font-playfair">
                  {product.price.toLocaleString('ro-RO')} Lei
                </span>
                <span className="text-sm text-muted-foreground font-inter">
                  (cash)
                </span>
              </div>
              
              {/* Preț card - discount dinamic */}
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-brand-gold font-playfair">
                  {(product.price * (1 - discountPercentage / 100)).toLocaleString('ro-RO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} Lei
                </span>
                <Badge variant="secondary" className="bg-brand-gold/20 text-brand-gold border-brand-gold/30 font-semibold">
                  -{discountPercentage}% card
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground font-inter italic">
                *Preț special pentru plata cu cardul bancar
              </p>
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "Descriere completă disponibilă în curând."}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold">Cantitate:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-semibold h-12"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.stock > 0 ? 'Adaugă în Coș' : 'Stoc epuizat'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleToggleWishlist}
                className={`h-12 ${isInWishlist(product.id) ? 'text-red-500 border-red-500' : ''}`}
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
              </Button>

              <Button
                variant="outline"
                onClick={handleShare}
                className="h-12"
              >
                <Share className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Livrare gratuită</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>Garanție 2 ani</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>Returnare 30 zile</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Specificații</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimensiuni:</span>
                  <span className="font-medium">{dimensions}</span>
                </div>
                {color && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Culoare:</span>
                    <span className="font-medium">{color}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Material:</span>
                  <span>MDF/PAL laminat</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fabricat în:</span>
                  <span>România</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Garanție:</span>
                  <span>24 luni</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cod produs:</span>
                  <span>{product.id.slice(0, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Categorie:</span>
                  <span>Dormitoare Complete</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Livrare & Returnare</h3>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Livrare gratuită</strong> în toată România pentru comenzi peste 500 Lei.
                </p>
                <p>
                  <strong>Termen de livrare:</strong> 3-5 zile lucrătoare
                </p>
                <p>
                  <strong>Returnare:</strong> 30 de zile pentru returnarea produsului
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Reviews Section */}
        <div className="mt-16">
          <ProductReviews 
            productId={product.id} 
            onReviewsLoaded={handleReviewsLoaded}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;