"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  id?: string;
  name: string;
  url: string;
  icon: React.ElementType;
}

export interface GlassmorphismNavBarProps {
  items?: NavItem[];
  className?: string;
  defaultTheme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
  activeItem?: string;
  onItemSelect?: (item: NavItem) => void;
  language?: "en" | "ar";
  onLanguageToggle?: () => void;
}

export function GlassmorphismNavBar({
  items = [],
  className,
  defaultTheme = "light",
  onThemeChange,
  activeItem,
  onItemSelect,
  language = "en",
  onLanguageToggle,
}: GlassmorphismNavBarProps) {
  const [activeTab, setActiveTab] = useState(activeItem || items[0]?.name || "");
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);
  const [isThemeHovered, setIsThemeHovered] = useState(false);
  const [isLangHovered, setIsLangHovered] = useState(false);

  useEffect(() => {
    if (activeItem) {
      setActiveTab(activeItem);
    }
  }, [activeItem]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("theme");
        if (saved === "dark" || saved === "light") {
          setTheme(saved);
          if (saved === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      } catch (e) {}
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof document !== "undefined") {
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      try {
        localStorage.setItem("theme", newTheme);
      } catch (e) {}
    }
    onThemeChange?.(newTheme);
  };

  const handleItemClick = (item: NavItem) => {
    setActiveTab(item.name);
    if (onItemSelect) {
      onItemSelect(item);
    }
    if (item.url === "#hero-pin" || item.url === "#" || item.url === "#top") {
      if (typeof window !== "undefined") {
        const win = window as any;
        if (win.__lenis) {
          win.__lenis.scrollTo(0, { duration: 1.5 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    } else if (item.url && item.url.startsWith("#")) {
      const target = document.querySelector(item.url);
      if (target) {
        const win = window as any;
        if (win.__lenis) {
          win.__lenis.scrollTo(target, { duration: 1.4 });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div
        className={cn(
          "flex items-center gap-1 sm:gap-2 py-1 px-1.5 rounded-full shadow-2xl transition-all duration-300",
          theme === "dark"
            ? "bg-[#061516]/85 border border-[#F2E6DC]/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-[#FAF6F0]/90 border border-black/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        )}
        style={{
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
        }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name || activeTab === item.id;

          return (
            <button
              key={item.name}
              onClick={() => handleItemClick(item)}
              className={cn(
                "relative cursor-pointer text-xs sm:text-sm font-semibold px-2.5 sm:px-4 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5",
                theme === "dark"
                  ? "text-[#F2E6DC]/75 hover:text-[#D2392A]"
                  : "text-[#15100C]/80 hover:text-[#D2392A]",
                isActive &&
                  (theme === "dark"
                    ? "bg-white/10 text-[#D2392A] font-bold"
                    : "bg-black/5 text-[#D2392A] font-bold")
              )}
            >
              <Icon size={15} strokeWidth={2.3} className="shrink-0" />
              <span className="hidden sm:inline">{item.name}</span>

              {isActive && (
                <motion.div
                  layoutId="glass-lamp"
                  className="absolute inset-0 w-full rounded-full -z-10 bg-[#D2392A]/15"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full bg-[#D2392A]">
                    <div className="absolute w-12 h-5 rounded-full blur-md -top-2 -left-2 bg-[#D2392A]/40" />
                    <div className="absolute w-8 h-4 rounded-full blur-sm -top-1 bg-[#D2392A]/50" />
                  </div>
                </motion.div>
              )}
            </button>
          );
        })}

        <div className="w-px h-5 bg-border/40 mx-0.5 sm:mx-1" />

        {/* Language Switcher */}
        {onLanguageToggle && (
          <button
            onClick={onLanguageToggle}
            onMouseEnter={() => setIsLangHovered(true)}
            onMouseLeave={() => setIsLangHovered(false)}
            className={cn(
              "relative cursor-pointer px-2 py-1 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1",
              theme === "dark"
                ? "text-[#F2E6DC]/80 hover:text-[#D2392A] hover:bg-white/10"
                : "text-[#15100C]/80 hover:text-[#D2392A] hover:bg-black/5"
            )}
            title={language === "en" ? "تغيير إلى العربية" : "Switch to English"}
            aria-label="Toggle language"
          >
            <Globe size={14} strokeWidth={2.2} />
            <span>{language === "en" ? "AR" : "EN"}</span>
          </button>
        )}

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          onMouseEnter={() => setIsThemeHovered(true)}
          onMouseLeave={() => setIsThemeHovered(false)}
          className={cn(
            "relative cursor-pointer p-1.5 sm:p-2 rounded-full transition-all duration-300",
            theme === "dark"
              ? "text-[#F2E6DC]/75 hover:text-[#D2392A] hover:bg-white/10"
              : "text-[#15100C]/80 hover:text-[#D2392A] hover:bg-black/5"
          )}
          aria-label={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
          title={theme === "light" ? "Dark Mode" : "Light Mode"}
        >
          <motion.div
            initial={false}
            animate={{
              scale: isThemeHovered ? 1.15 : 1,
              rotate: theme === "dark" ? 180 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 15,
            }}
          >
            {theme === "light" ? (
              <Moon size={15} strokeWidth={2.4} />
            ) : (
              <Sun size={15} strokeWidth={2.4} />
            )}
          </motion.div>
        </button>
      </div>
    </div>
  );
}

export default GlassmorphismNavBar;
