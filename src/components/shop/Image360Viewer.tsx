"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { RotateCw, ZoomIn, ZoomOut, Sparkles } from "lucide-react";

export interface Image360ViewerProps {
  images: string[];
  productName: string;
}

export function Image360Viewer({ images, productName }: Image360ViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const startXRef = useRef(0);

  // If only 1 image, duplicate with subtle simulated rotation angle for demonstration
  const frameList = images.length > 1 ? images : [images[0], images[0]];

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isZoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPos({ x, y });
      return;
    }

    if (!isDragging || frameList.length <= 1) return;
    const diff = e.clientX - startXRef.current;
    const sensitivity = 30; // pixels to advance frame

    if (Math.abs(diff) > sensitivity) {
      const direction = diff > 0 ? 1 : -1;
      setCurrentIndex((prev) => {
        const next = prev - direction;
        if (next < 0) return frameList.length - 1;
        if (next >= frameList.length) return 0;
        return next;
      });
      startXRef.current = e.clientX;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div className="relative w-full aspect-square bg-[#FAF8F3] rounded-3xl overflow-hidden border border-[#EFE9E2] select-none group">
      {/* 360 Spin Mode Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#C9A24D]/35 shadow-xs text-[11px] font-semibold text-[#8E6D24]">
        <RotateCw size={12} className="animate-spin text-[#C9A24D] duration-3000" />
        <span>Drag to Inspect (360° Angle)</span>
      </div>

      {/* Zoom Toggle Button */}
      <button
        onClick={() => setIsZoomed(!isZoomed)}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-md border border-[#EFE9E2] text-[#2B1B3D] hover:text-[#7B4FC9] hover:bg-white shadow-xs transition-colors cursor-pointer"
        aria-label={isZoomed ? "Zoom out" : "Zoom in"}
      >
        {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
      </button>

      {/* Interactive Canvas Area */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden ${
          isZoomed ? "cursor-crosshair" : ""
        }`}
      >
        <Image
          src={frameList[currentIndex] || frameList[0]}
          alt={`${productName} view ${currentIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-transform duration-100 ${
            isZoomed ? "scale-225" : "scale-100"
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }
              : undefined
          }
        />
      </div>

      {/* Frame Dots Indicator */}
      {frameList.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[#EFE9E2]">
          {frameList.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === i
                  ? "bg-[#7B4FC9] w-4"
                  : "bg-[#C9A24D]/40 hover:bg-[#C9A24D]"
              }`}
              aria-label={`View photo angle ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
