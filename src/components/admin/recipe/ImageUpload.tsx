import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageChange: (url: string) => void;
}

const ImageUpload = ({ currentImageUrl, onImageChange }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateFile = (file: File): string | null => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return "Format d'image non valide. Utilisez JPG, PNG ou WebP.";
    }

    if (file.size > maxSize) {
      return "L'image est trop grande. Taille maximale : 5MB.";
    }

    return null;
  };

  const handleUpload = async (file: File) => {
    const error = validateFile(file);
    if (error) {
      toast({
        title: "Erreur",
        description: error,
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `meal-images/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('meal-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('meal-images')
        .getPublicUrl(filePath);

      onImageChange(publicUrl);

      toast({
        title: "Succès",
        description: "Image téléchargée avec succès"
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Erreur",
        description: "Impossible de télécharger l'image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onImageChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (currentImageUrl) {
    return (
      <div className="relative glass rounded-2xl overflow-hidden group">
        <img
          src={currentImageUrl}
          alt="Recipe preview"
          className="w-full h-64 object-cover"
        />
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-olive-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="glass-strong border-2 border-cream text-cream hover:bg-cream hover:text-olive-dark"
          >
            <Upload className="mr-2 h-4 w-4" />
            Changer l'image
          </Button>
          
          <Button
            type="button"
            onClick={handleRemove}
            variant="destructive"
            className="glass-strong"
          >
            <X className="mr-2 h-4 w-4" />
            Supprimer
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`
        glass rounded-2xl p-12 border-2 border-dashed transition-all duration-300
        ${dragActive 
          ? 'border-orange-primary bg-orange-primary/5 scale-[1.02]' 
          : 'border-orange-primary/30 hover:border-orange-primary hover:bg-orange-primary/5'
        }
        ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={() => !uploading && fileInputRef.current?.click()}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        {uploading ? (
          <>
            <Loader2 className="h-12 w-12 text-orange-primary animate-spin" />
            <p className="text-olive-muted font-medium">Téléchargement en cours...</p>
          </>
        ) : (
          <>
            <div className="glass-strong rounded-full p-6 border border-orange-primary/20">
              <ImageIcon className="h-12 w-12 text-orange-primary" />
            </div>
            
            <div className="text-center space-y-2">
              <p className="font-heading text-xl font-bold text-olive-dark">
                Glissez-déposez votre image ici
              </p>
              <p className="text-olive-muted text-sm">
                ou cliquez pour sélectionner un fichier
              </p>
              <p className="text-olive-muted text-xs">
                JPG, PNG ou WebP (max. 5MB)
              </p>
            </div>

            <Button
              type="button"
              className="bg-gradient-to-br from-orange-primary to-orange-light text-white font-semibold px-8 py-3 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <Upload className="mr-2 h-4 w-4" />
              Choisir une image
            </Button>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />
    </div>
  );
};

export default ImageUpload;
