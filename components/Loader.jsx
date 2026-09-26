"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Loader() {
  const loaderRef = useRef(null);
  const dotRef = useRef(null);
  const floodRef = useRef(null);
  const markRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isDone = false;

    if (window.__lenis) {
      window.__lenis.stop();
    }
    document.documentElement.style.overflow = "hidden";

    function unlock() {
      if (isDone) return;
      isDone = true;
      if (loaderRef.current) {
        loaderRef.current.classList.add("hidden");
      }
      document.documentElement.style.overflow = "";
      if (window.__lenis) {
        window.__lenis.start();
      }
      setTimeout(() => {
        if (typeof ScrollTrigger !== "undefined") {
          ScrollTrigger.refresh();
        }
      }, 60);
    }

    const ctx = gsap.context(() => {
      function start() {
        if (isDone) return;
        try {
          const dot = dotRef.current;
          const flood = floodRef.current;
          if (!flood) return;

          const r = dot ? dot.getBoundingClientRect() : null;
          const cx = r && r.width ? r.left + r.width / 2 : window.innerWidth / 2;
          const cy = r && r.height ? r.top + r.height / 2 : window.innerHeight / 2;

          flood.style.left = `${cx}px`;
          flood.style.top = `${cy}px`;
          flood.style.opacity = "1";

          const diag = Math.sqrt(
            window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight
          );
          const scale = (diag / 18) * 1.5;

          const tl = gsap.timeline({
            delay: reduceMotion ? 0 : 0.4,
            onComplete: unlock,
          });

          tl.to(markRef.current, {
            opacity: 0,
            duration: reduceMotion ? 0.01 : 0.35,
            ease: "power1.in",
          }, 0.05)
            .to(flood, {
              scale: scale,
              duration: reduceMotion ? 0.01 : 0.85,
              ease: "power2.in",
            }, 0.15)
            .to(loaderRef.current, {
              opacity: 0,
              duration: reduceMotion ? 0.01 : 0.01,
            }, ">-0.01")
            .to(flood, {
              opacity: 0,
              duration: reduceMotion ? 0.01 : 0.4,
              ease: "power1.out",
            }, ">+0.05");
        } catch (e) {
          unlock();
        }
      }

      if (document.readyState === "complete") {
        start();
      } else {
        window.addEventListener("load", start);
        setTimeout(start, 1500);
      }
    });

    const failsafe = setTimeout(unlock, 3500);

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
      document.documentElement.style.overflow = "";
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, []);

  return (
    <>
      <div id="loader" ref={loaderRef}>
        <div className="loader-mark" ref={markRef}>
          <span className="logo-line logo">
            <span className="l">AS</span>
            <span className="l">MAMA</span>
            <span className="l said">
              SAID<span className="dot-inline" id="loaderDot" ref={dotRef}></span>
            </span>
          </span>
        </div>
      </div>
      <div id="dotFlood" ref={floodRef}></div>
    </>
  );
}
