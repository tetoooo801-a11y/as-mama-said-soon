"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ComingSoon.module.css";

// Target launch date set to 3 days remaining (September 30, 2026)
const LAUNCH_DATE = new Date("2026-09-30T01:00:00+03:00");

export default function ComingSoon() {
  const videoRef = useRef(null);
  const revealRef = useRef(null);
  const [unlocked, setUnlocked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    mins: "00",
    secs: "00",
  });

  const unlock = () => {
    setUnlocked(true);
    document.documentElement.classList.remove("locked");
  };

  const handleSkip = (e) => {
    e?.preventDefault();
    unlock();
    revealRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleScrollCue = () => {
    revealRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Video and Unlock Management
  useEffect(() => {
    document.documentElement.classList.add("locked");

    const video = videoRef.current;
    if (video) {
      const onEnded = () => unlock();
      const onError = () => unlock();

      video.addEventListener("ended", onEnded);
      video.addEventListener("error", onError);

      video.play().catch(() => {
        unlock();
      });

      const timer = setTimeout(() => {
        unlock();
      }, 13000);

      return () => {
        video.removeEventListener("ended", onEnded);
        video.removeEventListener("error", onError);
        clearTimeout(timer);
        document.documentElement.classList.remove("locked");
      };
    } else {
      unlock();
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

    const tick = () => {
      const diff = LAUNCH_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: "00", hours: "00", mins: "00", secs: "00" });
        return;
      }
      const totalSec = Math.floor(diff / 1000);
      const d = Math.floor(totalSec / 86400);
      const h = Math.floor((totalSec % 86400) / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;

      setTimeLeft({
        days: pad(d),
        hours: pad(h),
        mins: pad(m),
        secs: pad(s),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.wrapper} ${!unlocked ? styles.locked : ""}`}>
      {/* Video Background Layer */}
      <div className={styles.videoLayer}>
        <video
          ref={videoRef}
          id="introVideo"
          playsInline
          muted
          autoPlay
          preload="auto"
          src="/assets/videos/coming-soon-intro.mp4"
        />
      </div>

      {/* Floating Sound Toggle */}
      <button
        type="button"
        className={styles.soundBtn}
        onClick={toggleSound}
        aria-label="Toggle sound"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {/* Floating Skip Button */}
      <button
        type="button"
        className={styles.skipBtn}
        onClick={handleSkip}
      >
        Skip ↓
      </button>

      {/* Stage 1: Video Hero View with Scroll Cue */}
      <section className={styles.stage1} id="stage1">
        <button
          type="button"
          className={`${styles.scrollCue} ${unlocked ? styles.scrollCueShow : ""}`}
          onClick={handleScrollCue}
          aria-label="Scroll to details"
        >
          <span>Scroll</span>
          <span className={styles.chevron} />
        </button>
      </section>

      {/* Reveal Section */}
      <section className={styles.reveal} id="reveal" ref={revealRef}>
        <div className={styles.revealInner}>
          <h1 className={styles.headline}>
            <span>Mama said it.</span>
            <span>
              We made it<span className={styles.accent}>.</span>
            </span>
          </h1>

          <div className={styles.coming}>Coming soon</div>

          {/* Countdown Clock */}
          <div className={styles.countdown} id="countdown">
            <div className={styles.cdUnit}>
              <div className={styles.cdNum}>{timeLeft.days}</div>
              <div className={styles.cdLabel}>Days</div>
            </div>
            <div className={styles.cdUnit}>
              <div className={styles.cdNum}>{timeLeft.hours}</div>
              <div className={styles.cdLabel}>Hours</div>
            </div>
            <div className={styles.cdUnit}>
              <div className={styles.cdNum}>{timeLeft.mins}</div>
              <div className={styles.cdLabel}>Mins</div>
            </div>
            <div className={styles.cdUnit}>
              <div className={styles.cdNum}>{timeLeft.secs}</div>
              <div className={styles.cdLabel}>Secs</div>
            </div>
          </div>

          <div className={styles.footNote}>
            Well said, well made —{" "}
            <a
              href="https://www.instagram.com/as.mama.said"
              target="_blank"
              rel="noopener noreferrer"
            >
              @as.mama.said
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
