"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    let lenis;
    try {
      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      window.__lenis = lenis;

      return () => {
        gsap.ticker.remove(tickerCallback);
        lenis.destroy();
        delete window.__lenis;
      };
    } catch (e) {
      console.warn("Lenis initialization error:", e);
    }
  }, []);

  return null;
}
