// fileService.ts

export const fileService = {
    
  // 1. Upload file

  upload: async (file: File, folder: string) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }
      return data; // { filename: "...", url: "...", ... }
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
      throw new Error("Upload failed");
    }
  },
  uploadMultiple: async (files: File[], folder: string) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images[]", file);
      });

      if (folder) {
        formData.append("folder", folder);
      }

      const res = await fetch("/api/upload-multiple-files", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }
      return data; // { filename: "...", url: "...", ... }
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
      throw new Error("Upload failed");
    }
  },
  // 2. Get file (proxy to Laravel)

  get: async (filename: string) => {
    try {
      if (!filename) throw new Error("Filename is required");

      const res = await fetch(`/api/get-file?file=${encodeURIComponent(filename)}`);

      if (!res.ok) {
        throw new Error("File not found");
      }

      // return the final URL so UI can use it
      return `/api/get-file?file=${encodeURIComponent(filename)}`;
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Get file failed");
    }
  }
};
