"use client";

import { gsap, useGSAP } from "@/lib";
import { useAppStore } from "@/store";
import { useEffect, useRef } from "react";

export const AboutPageClient = () => {
  const heroRef = useRef<HTMLDivElement>(null),
    tlRef = useRef<gsap.core.Timeline | null>(null);

  const { startPageAnimation } = useAppStore();

  useGSAP(
    () => {
      if (!heroRef.current) return;

      const tl = gsap
        .timeline({
          paused: true,
        })
        .to("h1", {
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power2.out",
        })
        .to(
          "p",
          {
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
          },
          "<"
        );

      tlRef.current = tl;
    },
    {
      scope: heroRef,
    }
  );

  useEffect(() => {
    if (!tlRef.current) return;

    if (startPageAnimation) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [startPageAnimation]);
 
  return (
    <div
      ref={heroRef}
      className="h-[200vh]  flex flex-col items-center justify-center"
    >
      <h1 className="text-9xl   translate-y-75 uppercase font-bold">
        About
      </h1>
      <p className="mt-4 text-lg translate-y-20">
        This is the about page.
      </p>
    </div>
  );
};
