import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

interface ImageUploadProps {
  images: ImageFile[];
  onImagesChange: (images: ImageFile[]) => void;
  maxImages?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  images, 
  onImagesChange, 
  maxImages = 50 
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));

    const updatedImages = [...images, ...newImages].slice(0, maxImages);
    onImagesChange(updatedImages);
  }, [images, onImagesChange, maxImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    maxFiles: maxImages - images.length,
    disabled: images.length >= maxImages
  });

  const removeImage = (imageId: string) => {
    const updatedImages = images.filter(img => img.id !== imageId);
    onImagesChange(updatedImages);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-primary/50'
            }
            ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <div className="text-lg font-medium mb-2">
            {isDragActive ? 'Eliberează imaginile aici...' : 'Drag & drop imagini aici'}
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            sau <span className="text-primary font-medium">click pentru a selecta</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Maxim {maxImages} imagini • PNG, JPG, WEBP până la 10MB fiecare
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {images.length}/{maxImages} imagini încărcate
          </div>
        </div>
      )}

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Imagini produse ({images.length}/{maxImages})</h4>
            <div className="text-xs text-muted-foreground">
              Prima imagine va fi imaginea principală
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative group border rounded-lg overflow-hidden bg-muted"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', index.toString());
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                  moveImage(fromIndex, index);
                }}
              >
                <div className="aspect-square relative">
                  <img
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Primary badge */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      Principală
                    </div>
                  )}
                  
                  {/* Order badge */}
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </div>
                  
                  {/* Remove button */}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute bottom-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  
                  {/* Drag handle */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors cursor-move flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ImageIcon className="h-6 w-6 text-white drop-shadow-lg" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-xs text-muted-foreground">
            💡 Tip: Poți trage și plasa imaginile pentru a le reordona. Prima imagine va fi folosită ca imagine principală.
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;