"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const tvFrameRef = useRef(null);
  const tvScreenRef = useRef(null);
  const tvBezelRef = useRef(null);
  const standRef = useRef(null);
  const shadowRef = useRef(null);
  const deskFgRef = useRef(null);
  const overlayRef = useRef(null);
  const scanRef = useRef(null);
  const glowRef = useRef(null);
  const copyRef = useRef(null);
  const cueRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const heroVideo = videoRef.current;
      const tvFrame = tvFrameRef.current;
      const tvScreen = tvScreenRef.current;
      const tvBezel = tvBezelRef.current;
      const stand = standRef.current;
      const baseShadow = shadowRef.current;
      const deskForeground = deskFgRef.current;
      const overlay = overlayRef.current;
      const scan = scanRef.current;
      const glow = glowRef.current;
      const copy = copyRef.current;
      const cue = cueRef.current;
      const container = containerRef.current;
      const stage = stageRef.current;

      if (!container || !stage || !tvFrame) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            pin: stage,
            pinSpacing: false,
            scrub: 0.5,
          },
        });

        tl.to(
          tvFrame,
          {
            width: "25.88%",
            height: "20.97%",
            left: "28.00%",
            top: "49.50%",
            duration: 1.2,
            ease: "power1.inOut",
          },
          0.1
        )
          .to(
            tvScreen,
            {
              left: "1.97%",
              top: "3.66%",
              width: "96.06%",
              height: "92.24%",
              borderRadius: "4px",
              duration: 1.2,
              ease: "power1.inOut",
            },
            0.1
          )
          .to(tvBezel, { opacity: 1, duration: 0.9 }, 0.25)
          .to(deskForeground, { opacity: 1, duration: 0.8 }, 0.25)
          .to(baseShadow, { opacity: 1, duration: 0.8 }, 0.25)
          .to(glow, { opacity: 0.35, duration: 0.5 }, 0.45)
          .to(copy, { opacity: 1, y: 0, duration: 0.6 }, 0.75)
          .to(cue, { opacity: 0, duration: 0.3 }, 0.7);
      });

      if (reduceMotion) {
        gsap.set(tvFrame, {
          width: "25.88%",
          height: "20.97%",
          left: "28.00%",
          top: "49.50%",
        });
        gsap.set(tvScreen, {
          left: "1.97%",
          top: "3.66%",
          width: "96.06%",
          height: "92.24%",
          borderRadius: "4px",
        });
        gsap.set(tvBezel, { opacity: 1 });
        gsap.set(deskForeground, { opacity: 1 });
        gsap.set(baseShadow, { opacity: 1 });
        gsap.set(glow, { opacity: 0.35 });
        gsap.set(copy, { opacity: 1, y: 0 });
      }
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const handleCueClick = () => {
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo("#services", { duration: 1.8 });
    } else {
      const el = document.getElementById("services");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero-pin" ref={containerRef}>
      <div id="hero-stage" ref={stageRef}>
        <div className="studio-stage" id="studioStage">
            <img
              className="studio-bg"
              id="studioBg"
              src="/assets/images/hero-mama-studio.jpg"
              alt="As Mama Said Studio"
            />

            <div
              className="monitor-base-shadow"
              id="monitorBaseShadow"
              ref={shadowRef}
            ></div>

            <img
              className="monitor-stand-overlay"
              id="monitorStand"
              ref={standRef}
              src="/assets/images/monitor-stand.png"
              alt="Monitor Stand"
            />

            <div id="tvFrame" ref={tvFrameRef}>
              <div className="screen" id="tvScreen" ref={tvScreenRef}>
                <video
                  id="heroVideo"
                  ref={videoRef}
                  src="/assets/videos/hero.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                ></video>
                <div className="glow" id="tvGlow" ref={glowRef}></div>
                <div className="scanlines" id="tvScan" ref={scanRef}></div>
              </div>
              <img
                className="tv-bezel-overlay"
                id="tvBezel"
                ref={tvBezelRef}
                src="/assets/images/monitor-panel.png"
                alt="Modern Desktop Monitor"
              />
            </div>

            <img
              className="desk-foreground-overlay"
              id="deskForeground"
              ref={deskFgRef}
              src="/assets/images/hero-desk-foreground.png"
              alt=""
            />
          </div>

          <div className="hero-copy-wrap">
            <div className="hero-copy" id="heroCopy" ref={copyRef}>
              <div className="line1">
                {t.hero.line1_1}
                <br />
                {t.hero.line1_2}
              </div>
              <div className="line2">
                {t.hero.line2}
              </div>
            </div>
          </div>

          <div
            className="scroll-cue"
            id="scrollCue"
            ref={cueRef}
            onClick={handleCueClick}
            style={{ cursor: "pointer" }}
          >
            <span>{t.hero.scroll}</span>
            <span className="wire">
              <i></i>
            </span>
          </div>
      </div>
    </section>
  );
}
