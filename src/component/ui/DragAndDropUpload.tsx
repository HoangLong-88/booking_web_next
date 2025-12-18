"use client";

import React, { useState, useRef, useCallback, useId } from "react";
import { cn } from "@/libs/utils";
import { Input } from "@/component/ui/input";

interface Props {
  preview?: string | string[] | null;
  onUpload?: (file: File) => void;
  onUploadMultiple?: (files: File[]) => void;
  accept?: string;
  fileName?: string | null;
  variant?: "avatar" | "location";
  className?: string;
  havingImagePreview?: boolean;
  multiple?: boolean;
}

export default function DragAndDropUpload({
  preview,
  onUpload,
  onUploadMultiple,
  accept,
  fileName,
  variant = "location",
  className,
  havingImagePreview = true,
  multiple = false,
}: Props) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputId = useId();

  const handleFileSelect = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      if (multiple && onUploadMultiple) {
        onUploadMultiple(Array.from(files));
      } else if (onUpload) {
        onUpload(files[0]);
      }
    },
    [multiple, onUpload, onUploadMultiple]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    if (multiple && onUploadMultiple) {
      onUploadMultiple(Array.from(files));
    } else if (onUpload) {
      onUpload(files[0]);
    }
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
      {havingImagePreview ? (
      <>
          {/* SINGLE */}
          {typeof preview === "string" && (
            <img
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
            />
          )}

          {/* MULTIPLE */}
          {Array.isArray(preview) && preview.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {preview.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`preview-${idx}`}
                  className="w-full h-24 object-cover rounded-md border"
                />
              ))}
            </div>
          )}
        </>
      ) : null}

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
