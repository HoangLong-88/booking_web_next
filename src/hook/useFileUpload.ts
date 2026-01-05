import { useState, useEffect, useRef } from "react";
import { fileService } from "@/services/fileService";

interface UseFileUploadOptions {
  initialUrl?: string | null;
  onUploaded?: (file: {
    path: string;
    url: string;
    stored_name: string;
  }) => Promise<void> | void;
}

export interface UseFileUpload {
  preview: string | null;
  createPreview: (file: File) => string;
  handleUpload: (file: File, folder: string) => Promise<void>;
  fileName: string | null;
  loading: boolean;
  error: string | null;
}

export function useFileUpload({
  initialUrl = null,
  onUploaded,
}: UseFileUploadOptions): UseFileUpload {
  const [preview, setPreview] = useState<string | null>(initialUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const prevUrlRef = useRef<string | null>(null);

  // Cleanup
  useEffect(() => {
    return () => {
      if (prevUrlRef.current) {
        URL.revokeObjectURL(prevUrlRef.current);
        prevUrlRef.current = null;
      }
    };
  }, []);

  const createPreview = (file: File) => {
    if (prevUrlRef.current) {
      URL.revokeObjectURL(prevUrlRef.current);
    }

    const url = URL.createObjectURL(file);
    prevUrlRef.current = url;

    setPreview(url);
    setFileName(file.name);

    return url;
  };

  const handleUpload = async (file: File, folder: string) => {
    setError(null);
    setLoading(true);

    try {
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);
    
      const uploaded = await fileService.upload(file, folder);

      setPreview(uploaded.url);
      setFileName(uploaded.stored_name);

      // callback update DB
      if (onUploaded) {
        await onUploaded(uploaded);
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Upload failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return { preview, createPreview, handleUpload, fileName, loading, error };
}
