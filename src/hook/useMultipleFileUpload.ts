import { useState, useRef, useEffect } from "react";
import { fileService } from "@/services/fileService";
import type { UploadedFile } from "@/types/upload";

interface UseMultipleFileUploadOptions {
  initialUrls?: string[];
  onUploaded?: (files: {
    path: string;
    url: string;
    stored_name: string;
  }[]) => Promise<void> | void;
}

export interface UseMultipleFileUpload {
  previews: string[];
  files: File[];
  createPreviews: (files: File[]) => void;
  handleUpload: (folder: string) => Promise<UploadedFile[]>;
  loading: boolean;
  error: string | null;
  clear: () => void;
}
export function useMultipleFileUpload({
  initialUrls = [],
  onUploaded,
}: UseMultipleFileUploadOptions): UseMultipleFileUpload {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(initialUrls);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const prevUrlsRef = useRef<string[]>([]);

  // cleanup
  useEffect(() => {
    return () => {
      prevUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const createPreviews = (newFiles: File[]) => {
    const urls = newFiles.map(file => URL.createObjectURL(file));

    prevUrlsRef.current.push(...urls);

    setFiles(prev => [...prev, ...newFiles]);
    setPreviews(prev => [...prev, ...urls]);
  };


  const handleUpload = async (folder: string): Promise<UploadedFile[]> => {
    if (files.length === 0) return [];

    setLoading(true);
    setError(null);

    try {
      const res = await fileService.uploadMultiple(files, folder)
      const uploaded = res.files as UploadedFile[]

      const serverUrls = uploaded.map((f) => f.url);
      setPreviews(prev => [...prev.slice(0, prev.length - serverUrls.length), ...serverUrls]);

      if (onUploaded) {
        await onUploaded(uploaded);
      }
      return uploaded;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Upload failed");
      }
      return [];
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    prevUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    prevUrlsRef.current = [];
    setFiles([]);
    setPreviews([]);
  };

  return {
    previews,
    files,
    createPreviews,
    handleUpload,
    loading,
    error,
    clear,
  };
}
