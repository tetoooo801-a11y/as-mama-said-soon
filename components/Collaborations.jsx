"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Handshake, ArrowUpRight } from "lucide-react";

export default function Collaborations() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="collab" className="collab-section">
      <div className="wrap">
        <div className="collab-header">
          <span className="collab-badge">
            <Handshake size={15} className="shrink-0" />
            {t.collab.kicker}
          </span>
          <h2 className="collab-title">{t.collab.title}</h2>
          <p className="collab-sub">{t.collab.sub}</p>
        </div>

        {/* Key Metrics / Stats */}
        <div className="collab-stats-grid">
          {t.collab.stats?.map((stat, idx) => (
            <div key={idx} className="collab-stat-card">
              <span className="collab-stat-val">{stat.value}</span>
              <span className="collab-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Featured Partners / Brand Collaborations */}
        <div className="collab-partners-grid">
          {t.collab.partners?.map((partner, idx) => (
            <div key={idx} className="collab-partner-chip">
              <span className="collab-partner-dot"></span>
              <div className="collab-partner-info">
                <span className="collab-partner-name">{partner.name}</span>
                <span className="collab-partner-cat">{partner.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Signature Brand Statement & Quote */}
        <div className="collab-quote-card">
          <div className="logo collab-big-logo">
            AS MAMA SAID<span className="dot-inline"></span>
          </div>
          <p className="collab-quote-text">
            “{t.collab.quote}”
          </p>
          <div className="collab-action-row">
            <span className="collab-action-text">{t.collab.ctaText}</span>
            <a href="#contact" className="collab-cta-btn">
              <span>{t.collab.ctaBtn}</span>
              <ArrowUpRight size={16} className={isRTL ? "rotate-180" : ""} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
