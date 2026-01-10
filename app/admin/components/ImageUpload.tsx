"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
}

export function ImageUpload({ 
  value, 
  onChange, 
  bucket = "images",
  folder = "uploads"
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError(null);

    const supabase = createClient();

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    try {
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      onChange(publicUrl);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image");
    }

    setIsUploading(false);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    // Extract the file path from the URL
    const urlParts = value.split(`/${bucket}/`);
    if (urlParts.length < 2) {
      onChange("");
      return;
    }

    const filePath = urlParts[1];
    const supabase = createClient();

    try {
      await supabase.storage.from(bucket).remove([filePath]);
    } catch (err) {
      console.error("Error removing file:", err);
    }

    onChange("");
  };

  return (
    <div className="space-y-3">
      {/* Preview */}
      {value ? (
        <div className="relative group">
          <div className="relative aspect-video bg-charcoal-800 rounded-xl overflow-hidden">
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="aspect-video bg-charcoal-800 border-2 border-dashed border-charcoal-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-electric transition-colors"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-electric animate-spin mb-2" />
              <p className="text-sm text-charcoal-400">Uploading...</p>
            </>
          ) : (
            <>
              <ImageIcon className="w-8 h-8 text-charcoal-500 mb-2" />
              <p className="text-sm text-charcoal-400 mb-1">Click to upload image</p>
              <p className="text-xs text-charcoal-500">PNG, JPG, WEBP up to 5MB</p>
            </>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload button (alternative) */}
      {!value && !isUploading && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Image
        </Button>
      )}
    </div>
  );
}

