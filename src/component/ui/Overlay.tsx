import React from "react";

interface OverlayProps {
    onClick?: () => void;
  className?: string;
  show?: boolean;
}
const Overlay:React.FC<OverlayProps> = ({ onClick , className = "", show = true }) => {
    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 h-[100dvh] bg-black/50 backdrop-blur-sm z-40 ${className}`}
            onClick={onClick}
            aria-hidden="true"
        />
    );
}
export { Overlay };