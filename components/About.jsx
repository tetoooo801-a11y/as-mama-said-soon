"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about">
      <div className="wrap">
        <div className="about-grid">
          <div>
            <h2>{t.about.title}</h2>
            <div className="about-copy">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
          </div>
          <div className="team">
            <div className="team-card">
              <div className="role">{t.about.cairoRole}</div>
              <div className="name">{t.about.cairoStudio}</div>
            </div>
            <div className="team-card">
              <div className="role">{t.about.dubaiRole}</div>
              <div className="name">{t.about.dubaiStudio}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
