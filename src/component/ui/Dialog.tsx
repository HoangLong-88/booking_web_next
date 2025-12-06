"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/libs/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export function DialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl bg-white p-6 shadow-lg animate-in fade-in-0 zoom-in-95",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({
  children,
  onClose,
  className,
}: {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-2">
      <h2 className={cn("text-xl font-semibold", className)}>{children}</h2>

      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
