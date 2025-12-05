"use client";

import React, { useState } from "react";
import { cn } from "@/libs/utils";
import { Input } from "@/component/ui/input";

interface Props {
  preview?: string | null;
  onUpload: (file: File) => void;
  accept?: string; // e.g., "image/*", "application/pdf"
  fileName?: string | null;
}

export default function DragAndDropUpload({
  preview,
  onUpload,
  accept,
  fileName,
}: Props) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-xl p-4 flex flex-col items-center gap-3 transition",
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      )}
    >
      <img
        src={preview || "images/default-avatar.png"}
        alt="preview"
        className="w-24 h-24 rounded-full object-cover border shadow-sm"
      />

      {!fileName && <label className="text-sm font-medium text-gray-700">
        Drag & Drop or Choose File
      </label>}

      <Input
        id="file"
        name="file"
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
        }}
      />
      <label
        htmlFor="file"
        className="block w-full border border-gray-500 
         text-gray-700
           rounded-md p-2
            cursor-pointer
             text-left
             hover:bg-gray-500"
      >
        {fileName || "Browse..."} {/* <-- custom placeholder */}
      </label>
    </div>
  );
}
