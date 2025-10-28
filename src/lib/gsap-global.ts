"use client";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registrar plugins una sola vez para toda la aplicación
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Configuración global opcional
gsap.defaults({
  ease: "power2.out",
  duration: 1
});

export { gsap, ScrollTrigger, SplitText, useGSAP };
