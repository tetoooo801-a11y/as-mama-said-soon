"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, Sparkles, Award, User, Handshake, Send } from "lucide-react";
import { GlassmorphismNavBar } from "@/components/ui/glassmorphism-navbar";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const navRef = useRef(null);
  const { language, toggleLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", name: t.nav.home, url: "#hero-pin", icon: Home },
    { id: "services", name: t.nav.services, url: "#services", icon: Sparkles },
    { id: "results", name: t.nav.results, url: "#results", icon: Award },
    { id: "about", name: t.nav.about, url: "#about", icon: User },
    { id: "collab", name: t.nav.collab, url: "#collab", icon: Handshake },
    { id: "contact", name: t.nav.contact, url: "#contact", icon: Send },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#hero-pin",
        start: "top top+=1",
        end: "bottom top",
        onEnter: () => {
          if (navRef.current) navRef.current.classList.add("show");
        },
        onLeaveBack: () => {
          if (navRef.current) navRef.current.classList.remove("show");
        },
      });

      // Synchronize home when inside hero section
      ScrollTrigger.create({
        trigger: "#hero-pin",
        start: "top top",
        end: "bottom 60%",
        onEnter: () => setActiveSection("home"),
        onEnterBack: () => setActiveSection("home"),
      });

      // Synchronize active nav item with page scroll position
      [
        { id: "services", url: "#services" },
        { id: "results", url: "#results" },
        { id: "about", url: "#about" },
        { id: "collab", url: "#collab" },
        { id: "contact", url: "#contact" },
      ].forEach((item) => {
        const el = document.querySelector(item.url);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            end: "bottom 60%",
            onEnter: () => setActiveSection(item.id),
            onEnterBack: () => setActiveSection(item.id),
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header className="site-nav" id="siteNav" ref={navRef}>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (window.__lenis) {
            window.__lenis.scrollTo(0, { duration: 1.5 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          setActiveSection("home");
        }}
        className="logo small"
        style={{ textDecoration: "none" }}
      >
        AS MAMA SAID<span className="dot-inline"></span>
      </a>

      <GlassmorphismNavBar
        items={navItems}
        defaultTheme="light"
        activeItem={activeSection}
        onItemSelect={(item) => setActiveSection(item.id || item.name)}
        language={language}
        onLanguageToggle={toggleLanguage}
      />

      <a href="#contact" className="nav-cta hidden sm:inline-flex">
        {t.nav.cta}
      </a>
    </header>
  );
}
