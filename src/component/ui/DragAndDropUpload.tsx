"use client";

import React, { useState, useRef, useCallback, useId } from "react";
import { cn } from "@/libs/utils";
import { Input } from "@/component/ui/input";

interface Props {
  preview?: string | null;
  onUpload: (file: File) => void;
  accept?: string;
  fileName?: string | null;
  variant?: "avatar" | "location";
  className?: string;
  havingImagePreview?: boolean;
}

export default function DragAndDropUpload({
  preview,
  onUpload,
  accept,
  fileName,
  variant = "location",
  className,
  havingImagePreview = true,
}: Props) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputId = useId();

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onUpload(file);
    },
    [onUpload]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
      }}
      onDragLeave={(e) => {
        e.stopPropagation();
        setDragActive(false);
      }}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-xl p-4 flex flex-col items-center gap-3 transition",
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
        className
      )}
    >
      {havingImagePreview ? <img
        src={
          preview ||
          (variant === "avatar" ? "/images/default-avatar.png" : undefined)
        }
        alt="preview"
        className={cn(
          "object-cover border shadow-sm bg-gray-100 dark:bg-slate-900",
          variant === "avatar"
            ? "w-24 h-24 rounded-full"
            : "w-full h-40 rounded-lg"
        )}
      /> : null}

      {!fileName && (
        <label className="text-sm font-medium text-gray-700">
          Drag & Drop or Choose File
        </label>
      )}

      {/* Input file — với ID duy nhất */}
      <Input
        id={inputId}
        name={inputId}
        type="file"
        ref={inputRef}
        accept={accept}
        className="hidden"
        onChange={handleFileSelect}
      />

      <label
        htmlFor={inputId}
        className="block w-full border border-gray-500 text-gray-700 rounded-md p-2 cursor-pointer text-left hover:bg-gray-100"
      >
        {fileName || "Browse..."}
      </label>
    </div>
  );
}
