"use client";
import { useEffect } from "react";
import { gsap } from "../../../lib";
import "lenis/dist/lenis.css";
import ReactLenis from "lenis/react";
import { useLenisStore } from "@/store";
import { VirtualScrollBar } from "./VirtualScrollBar";

export const SmoothScroll = () => {
  const setLenis = useLenisStore((state) => state.setLenis);
  
  useEffect(() => {
    function update(time: number) {
      const lenis = useLenisStore.getState().lenis;
      if (!lenis) return;
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (<>
  <ReactLenis
    ref={(ref) => {
      if (ref?.lenis) {
        setLenis(ref.lenis);
      }
    }}
    options={{
      lerp: 0.05,
      autoRaf: false,
    }}
    root
  />
  <VirtualScrollBar thumbHeight={80} thumbColor="red" />
  
  </>
  );
};