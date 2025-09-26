import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Upload, Image as ImageIcon, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProductImage {
  id: string;
  image_url: string;
  image_name: string;
  display_order: number;
  is_primary: boolean;
}

interface ImageUploadZoneProps {
  productId?: string;
  onImagesChange: (images: ProductImage[]) => void;
  initialImages?: ProductImage[];
  maxImages?: number;
}

const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({
  productId,
  onImagesChange,
  initialImages = [],
  maxImages = 50,
}) => {
  const [images, setImages] = useState<ProductImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > maxImages) {
      toast({
        title: "Prea multe imagini",
        description: `Poți încărca maximum ${maxImages} imagini pe produs.`,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    const newImages: ProductImage[] = [];

    try {
      for (const file of acceptedFiles) {
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        const newImage: ProductImage = {
          id: Math.random().toString(36).substring(2),
          image_url: publicUrl,
          image_name: file.name,
          display_order: images.length + newImages.length,
          is_primary: images.length === 0 && newImages.length === 0,
        };

        newImages.push(newImage);

        // If productId exists, save to database
        if (productId) {
          const { error: dbError } = await supabase
            .from('product_images')
            .insert({
              product_id: productId,
              image_url: publicUrl,
              image_name: file.name,
              display_order: newImage.display_order,
              is_primary: newImage.is_primary,
            });

          if (dbError) {
            console.error('Error saving image to database:', dbError);
          }
        }
      }

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onImagesChange(updatedImages);

      toast({
        title: "Succes",
        description: `${newImages.length} imagini au fost încărcate cu succes!`,
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca imaginile.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, [images, maxImages, productId, onImagesChange, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    multiple: true,
    disabled: uploading || images.length >= maxImages,
  });

  const removeImage = async (imageIndex: number) => {
    const imageToRemove = images[imageIndex];
    
    try {
      // Extract file path from URL
      const urlParts = imageToRemove.image_url.split('/');
      const filePath = `products/${urlParts[urlParts.length - 1]}`;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('product-images')
        .remove([filePath]);

      if (storageError) {
        console.error('Error deleting from storage:', storageError);
      }

      // Delete from database if productId exists
      if (productId) {
        const { error: dbError } = await supabase
          .from('product_images')
          .delete()
          .eq('product_id', productId)
          .eq('image_url', imageToRemove.image_url);

        if (dbError) {
          console.error('Error deleting from database:', dbError);
        }
      }

      const updatedImages = images.filter((_, index) => index !== imageIndex);
      
      // Reassign display orders and primary image
      const reorderedImages = updatedImages.map((img, index) => ({
        ...img,
        display_order: index,
        is_primary: index === 0,
      }));

      setImages(reorderedImages);
      onImagesChange(reorderedImages);

      toast({
        title: "Succes",
        description: "Imaginea a fost ștearsă cu succes!",
      });
    } catch (error) {
      console.error('Error removing image:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge imaginea.",
        variant: "destructive",
      });
    }
  };

  const setPrimaryImage = async (imageIndex: number) => {
    const updatedImages = images.map((img, index) => ({
      ...img,
      is_primary: index === imageIndex,
    }));

    setImages(updatedImages);
    onImagesChange(updatedImages);

    // Update in database if productId exists
    if (productId) {
      try {
        // First, remove primary flag from all images
        await supabase
          .from('product_images')
          .update({ is_primary: false })
          .eq('product_id', productId);

        // Then set the new primary image
        await supabase
          .from('product_images')
          .update({ is_primary: true })
          .eq('product_id', productId)
          .eq('image_url', images[imageIndex].image_url);

        toast({
          title: "Succes",
          description: "Imaginea principală a fost actualizată!",
        });
      } catch (error) {
        console.error('Error updating primary image:', error);
        toast({
          title: "Eroare",
          description: "Nu s-a putut actualiza imaginea principală.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      {images.length < maxImages && (
        <Card>
          <CardContent className="p-6">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-300 hover:border-primary'
              } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              {isDragActive ? (
                <p className="text-lg font-medium">Eliberează pentru a încărca imaginile...</p>
              ) : (
                <div>
                  <p className="text-lg font-medium mb-2">
                    Drag & drop imagini aici sau click pentru a selecta
                  </p>
                  <p className="text-sm text-gray-500">
                    Poți încărca până la {maxImages} imagini ({images.length}/{maxImages} încărcate)
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Formate acceptate: JPG, PNG, WEBP, GIF
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Card key={image.id} className="relative group">
              <CardContent className="p-2">
                <div className="relative aspect-square">
                  <img
                    src={image.image_url}
                    alt={image.image_name}
                    className="w-full h-full object-cover rounded-md"
                  />
                  
                  {/* Primary image indicator */}
                  {image.is_primary && (
                    <div className="absolute top-2 left-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    </div>
                  )}

                  {/* Image controls */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center space-x-2">
                    {!image.is_primary && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setPrimaryImage(index)}
                        className="text-xs"
                      >
                        <Star className="h-3 w-3 mr-1" />
                        Principală
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {image.image_name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {uploading && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">Se încarcă imaginile...</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadZone;