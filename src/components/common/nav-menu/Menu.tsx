"use client";
import React, { useEffect } from "react";
import { gsap, useGSAP } from "@/lib";
import { useAppStore, useLenisStore } from "@/store";

export const Menu = () => {
  const menuRef = React.useRef<HTMLElement>(null),
    tlRef = React.useRef<gsap.core.Timeline | null>(null);
  const { openNavMenu, setOpenNavMenu } = useAppStore();
  const { lenis, scroll } = useLenisStore();

  const toggleMenu = () => {
    setOpenNavMenu(!openNavMenu);
    if (!openNavMenu) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  };

  useGSAP(
    () => {
      if (!menuRef.current) return;
      const tl = gsap.timeline({ paused: true }).to(menuRef.current, {
        scaleY: 1,
        duration: 1,
        transformOrigin: "bottom",
        ease: "power2.out",
      });
      tlRef.current = tl;
    },
    {
      scope: menuRef,
    }
  );

  useEffect(() => {
    if (!menuRef.current) return;

    if (openNavMenu) {
      tlRef.current?.play();
    } else {
      tlRef.current?.reverse();
    }
  }, [openNavMenu]);

  return (
    <>
      <button
        onClick={toggleMenu}
        title="open-menu"
        aria-label="open-menu"
        style={{
          transform: scroll > 5 ? "translateY(0)" : "translateY(80px)",
        }}
        className=" fixed left-1/2 -translate-x-1/2 z-5   bottom-5  flex size-10 items-center justify-center cursor-pointer active:scale-95 transition-all duration-300 bg-foreground mix-blend-difference rounded-lg"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mix-blend-difference"
        >
          <line
            x1="2"
            y1="3"
            x2="22"
            y2="3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="2"
            y1="9"
            x2="22"
            y2="9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="2"
            y1="15"
            x2="22"
            y2="15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <aside
        ref={menuRef}
        className={`fixed bottom-0 left-0 w-full origin-bottom h-full scale-y-0 bg-foreground text-background z-40`}
      >
        <button
          className="absolute top-5 right-5 cursor-pointer"
          onClick={toggleMenu}
        >
          X
        </button>
      </aside>
    </>
  );
};
