"use client";

import { useAppStore, useLenisStore } from "@/store";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  thumbHeight: number;
  thumbColor: string;
};

export function VirtualScrollBar({ thumbHeight, thumbColor }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [hasScroll, setHasScroll] = useState(false);

  const scrollbarThumbRef = useRef<HTMLDivElement>(null);
  const scrollBarContainerRef = useRef<HTMLDivElement>(null);

  const { lenis, scrollPercentage, limit } = useLenisStore();
  const { startPageAnimation, openNavMenu, setIsTouchDevice, isTouchDevice } =
    useAppStore();

  const pathname = usePathname();

 

  useEffect(() => {
    setHasScroll(document.body.scrollHeight > window.innerHeight);
  }, [scrollHeight, pathname]);

  // ✅ useEffect para window operations
  useEffect(() => {
    setScrollHeight(window.innerHeight);
    const updateScrollHeight = () => {
      setScrollHeight(window.innerHeight);
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };

    window.addEventListener("resize", updateScrollHeight);

    return () => {
      window.removeEventListener("resize", updateScrollHeight);
    };
  }, [setIsTouchDevice]);

  // ✅ useEffect para drag handlers
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY;
      const maxScroll = scrollHeight - thumbHeight;
      const scrollRatio = deltaY / maxScroll;

      lenis?.scrollTo(scrollTop + scrollRatio * (limit || 0));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startY, scrollTop, scrollHeight, thumbHeight, lenis, limit]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
      setStartY(e.clientY);
      setScrollTop(lenis?.scroll || 0);
    },
    [lenis]
  );

  // ✅ Calcular visibilidad: mostrar solo si hay scroll Y no hay animación/menú abierto
  const shouldShow =
    hasScroll && startPageAnimation && !openNavMenu && !isTouchDevice;

  useEffect(() => {
    console.log(
      "Shouldshow: " +
        shouldShow +
        " = hasScroll " +
        hasScroll +
        " - startPageAnimation: " +
        startPageAnimation +
        " - openNavMenu " +
        openNavMenu +
        " - isTouchDevice: " +
        isTouchDevice
    );
  }, [hasScroll, startPageAnimation, openNavMenu, shouldShow, isTouchDevice]);

  // Early return si no hay scroll disponible
  if (!hasScroll) return null;

  return (
    <div
      ref={scrollBarContainerRef}
      style={{
        opacity: shouldShow ? "1" : "0",
        pointerEvents: shouldShow ? "auto" : "none",
        transition: "opacity 0.3s ease-out",
      }}
      className="fixed z-60 top-0 right-0 w-1.5 mr-1 h-full"
    >
      <div
        ref={scrollbarThumbRef}
        onMouseDown={handleMouseDown}
        style={{
          transform: `translateY(${
            scrollPercentage * (scrollHeight - thumbHeight)
          }px)`,
          height: `${thumbHeight}px`,
          backgroundColor: thumbColor,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        className="absolute top-0 right-0 w-1.5 mx-auto rounded-lg transition-all ease-out duration-300"
      />
    </div>
  );
}
