"use client";
import { gsap, useGSAP } from "@/lib";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useAppStore } from "@/store";

export const TransitionWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const content = useRef<HTMLDivElement>(null),
    layer = useRef<HTMLDivElement>(null),
    container = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const { setStartPageAnimation } = useAppStore();

  useGSAP(
    () => {
      if (!layer.current || !content.current) return;

      gsap
        .timeline({
          onStart: () => {
            setStartPageAnimation(false);
          }
        })
        .to(layer.current, {
          scaleY: 1,
          duration: 1,
          transformOrigin: "bottom",
          ease: "power2.in",
        })
        .to(layer.current, {
          scaleY: 0,
          transformOrigin: "top",
          duration: 1,
          ease: "power2.out",
        })
        .to(content.current, {
          opacity: 1,
          delay: -1,
          duration: 1,
          ease: "power2.out",
          onStart: () => {
            setStartPageAnimation(true);
          },
        });
    },
    {
      dependencies: [pathname],
      revertOnUpdate: true,
    }
  );

  return (
    <div ref={container} className="relative overflow-hidden">
      <div
        ref={layer}
        className="layer scale-y-0   fixed top-0 left-0 w-full h-screen bg-foreground z-50 flex items-center justify-center will-change-transform"
      />

      <div ref={content} className="content opacity-0 will-change-transform">
        {children}
      </div>
    </div>
  );
};
