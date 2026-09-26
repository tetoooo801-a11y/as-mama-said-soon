"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [activeCat, setActiveCat] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleCategorySelect = (cat) => {
    setActiveCat(cat);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const currentConfig = activeCat
    ? t.contact.configs[activeCat]
    : t.contact.configs.marketing;

  return (
    <section id="contact">
      <div className="wrap">
        <h2>{t.contact.title}</h2>
        <p className="sub">{t.contact.sub}</p>

        <div className="socials">
          <a
            className="social-chip glass"
            href="https://www.instagram.com/as.mama.said"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            className="social-chip glass"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok
          </a>
          <a
            className="social-chip glass"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>

        <div className="cats" id="cats">
          <button
            type="button"
            className={`cat-btn glass ${activeCat === "marketing" ? "active" : ""}`}
            onClick={() => handleCategorySelect("marketing")}
          >
            {t.contact.cats.marketing}
          </button>
          <button
            type="button"
            className={`cat-btn glass ${activeCat === "tech" ? "active" : ""}`}
            onClick={() => handleCategorySelect("tech")}
          >
            {t.contact.cats.tech}
          </button>
          <button
            type="button"
            className={`cat-btn glass ${activeCat === "business" ? "active" : ""}`}
            onClick={() => handleCategorySelect("business")}
          >
            {t.contact.cats.business}
          </button>
        </div>

        <div
          className={`contact-form ${activeCat ? "open" : ""}`}
          id="contactForm"
        >
          <div className="inner glass">
            <div className="form-note" id="formNote">
              {submitted ? t.contact.successNote : currentConfig.note}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>{t.contact.name}</label>
                <input
                  type="text"
                  placeholder={t.contact.namePlaceholder}
                  required
                />
              </div>
              <div className="field">
                <label>{t.contact.company}</label>
                <input
                  type="text"
                  placeholder={t.contact.companyPlaceholder}
                />
              </div>
              <div className="field" id="extraField">
                <label>{currentConfig.label}</label>
                <input type="text" placeholder={currentConfig.placeholder} />
              </div>
              <div className="field">
                <label>{t.contact.tellUs}</label>
                <textarea
                  placeholder={t.contact.tellUsPlaceholder}
                ></textarea>
              </div>
              <button className="btn btn-primary submit-btn" type="submit">
                {t.contact.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
