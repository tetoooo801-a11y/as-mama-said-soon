"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <span className="logo small">
              AS MAMA SAID<span className="dot-inline"></span>
            </span>
            <p>{t.footer.desc}</p>
          </div>
          <div className="foot-col">
            <h4>{t.footer.site}</h4>
            <a href="#hero-pin">{t.nav.home}</a>
            <a href="#services">{t.nav.services}</a>
            <a href="#results">{t.nav.results}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
          <div className="foot-col">
            <h4>{t.footer.social}</h4>
            <a
              href="https://www.instagram.com/as.mama.said"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              TikTok
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
          <div className="foot-col">
            <h4>{t.footer.contact}</h4>
            <a href="mailto:hello@asmamasaid.com">hello@asmamasaid.com</a>
            <a href="#">{t.footer.location}</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {currentYear} {t.footer.rights}</span>
          <span>{t.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
