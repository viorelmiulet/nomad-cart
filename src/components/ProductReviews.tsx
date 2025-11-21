import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  images: string[] | null;
  is_verified_purchase: boolean;
  created_at: string;
}

interface ProductReviewsProps {
  productId: string;
  onReviewsLoaded?: (reviews: Review[], averageRating: number) => void;
}

export const ProductReviews = ({ productId, onReviewsLoaded }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [reviewImages, setReviewImages] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReviews(data || []);

      // Calculate average rating
      if (data && data.length > 0) {
        const avgRating = data.reduce((acc, review) => acc + review.rating, 0) / data.length;
        onReviewsLoaded?.(data, avgRating);
      } else {
        onReviewsLoaded?.([], 0);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim() || !userName.trim() || !userEmail.trim()) {
      toast({
        title: "Eroare",
        description: "Te rugăm să completezi toate câmpurile obligatorii",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Upload images if any
      let uploadedImageUrls: string[] = [];
      
      if (reviewImages && reviewImages.length > 0) {
        for (let i = 0; i < reviewImages.length; i++) {
          const file = reviewImages[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `reviews/${fileName}`;

          const { error: uploadError, data } = await supabase.storage
            .from('product-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

          uploadedImageUrls.push(publicUrl);
        }
      }

      // Insert review
      const { error } = await supabase
        .from('product_reviews')
        .insert({
          product_id: productId,
          user_id: user?.id || null,
          user_name: userName,
          user_email: userEmail,
          rating,
          comment: comment.trim(),
          images: uploadedImageUrls.length > 0 ? uploadedImageUrls : null,
        });

      if (error) throw error;

      toast({
        title: "Recenzie trimisă",
        description: "Recenzia ta a fost trimisă și va fi publicată după aprobare.",
      });

      // Reset form
      setRating(5);
      setComment("");
      setUserName("");
      setUserEmail("");
      setReviewImages(null);
      setIsDialogOpen(false);
      
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut trimite recenzia. Te rugăm să încerci din nou.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-playfair">Recenzii clienți</h2>
          <div className="flex items-center gap-2 mt-2">
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
              {averageRating.toFixed(1)} din 5 ({reviews.length} {reviews.length === 1 ? 'recenzie' : 'recenzii'})
            </span>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark">
              Scrie o recenzie
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Scrie o recenzie</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <Label>Rating</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= rating ? "text-brand-gold fill-current" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="userName">Nume *</Label>
                <Input
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Numele tău"
                  required
                />
              </div>

              <div>
                <Label htmlFor="userEmail">Email *</Label>
                <Input
                  id="userEmail"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="email@exemplu.ro"
                  required
                />
              </div>

              <div>
                <Label htmlFor="comment">Comentariu *</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Spune-ne părerea ta despre acest produs..."
                  rows={5}
                  required
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {comment.length}/1000 caractere
                </p>
              </div>

              <div>
                <Label htmlFor="images">Imagini (opțional)</Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setReviewImages(e.target.files)}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Poți adăuga până la 5 imagini
                </p>
              </div>

              <Button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-dark"
              >
                {submitting ? "Se trimite..." : "Trimite recenzia"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-8">Se încarcă recenziile...</div>
      ) : reviews.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Nu există recenzii încă. Fii primul care scrie o recenzie!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>{review.user_name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{review.user_name}</span>
                          {review.is_verified_purchase && (
                            <Badge variant="secondary" className="text-xs">
                              Achiziție verificată
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-brand-gold fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.created_at).toLocaleDateString('ro-RO', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{review.comment}</p>

                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {review.images.map((image, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedImages(review.images || [])}
                            className="relative w-20 h-20 rounded-lg overflow-hidden border hover:border-primary transition-colors"
                          >
                            <img
                              src={image}
                              alt={`Recenzie ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Image Viewer Dialog */}
      {selectedImages.length > 0 && (
        <Dialog open={selectedImages.length > 0} onOpenChange={() => setSelectedImages([])}>
          <DialogContent className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedImages.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`Imagine ${idx + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
