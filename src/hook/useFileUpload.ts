import { useState, useEffect, useRef } from "react";
import { fileService } from "@/services/fileService";
import { userService } from "@/services/userService";
import { User } from "@/types/user";

interface UseFileUploadProps {
  user : User
}

interface UseFileUploadReturn {
  preview: string | null;
  createPreview: (file: File) => string;
  handleUpload: (file: File) => Promise<void>;
  fileName: string | null;
  loading: boolean;
  error: string | null;
}

export function useFileUpload({ user }: UseFileUploadProps): UseFileUploadReturn {
  const [preview, setPreview] = useState<string | null>(user?.avatar_url ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const prevUrlRef = useRef<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      // cleanup object URL on unmount
      if (prevUrlRef.current) {
        URL.revokeObjectURL(prevUrlRef.current);
        prevUrlRef.current = null;
      }
    };
  }, []);

  const createPreview = (file: File) => {
    // revoke previous
    if (prevUrlRef.current) {
      URL.revokeObjectURL(prevUrlRef.current);
      prevUrlRef.current = null;
    }
    const url = URL.createObjectURL(file);
    prevUrlRef.current = url;
    setPreview(url);
    setFileName(file.name)
    return url;
  };

  const handleUpload = async (file: File) => {
    setError(null);
    setLoading(true);

    try {
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);

      const uploaded = await fileService.upload(file);

      const path = uploaded.path;
      const url = uploaded.url;

      await userService.updateAvatar(path); // !! update user avatar path on server

      user.avatar_url = url;
      setPreview(url);

      setFileName(uploaded.stored_name);
    } catch (err: unknown) {
      if (err instanceof Error)
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return { preview, handleUpload, fileName, loading, error, createPreview };
}
