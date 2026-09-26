"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Results() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [flickering, setFlickering] = useState(false);

  const projects = t.results.projects;
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

  const handleSlide = (dir) => {
    setFlickering(true);
    setTimeout(() => {
      setIndex((prev) => (prev + dir + projects.length) % projects.length);
    }, 90);
    setTimeout(() => {
      setFlickering(false);
    }, 320);
  };

  const current = projects[index] || projects[0];

  return (
    <section id="results">
      <div className="wrap">
        <div className="head">
          <h2>{t.results.headTitle}</h2>
          <p>{t.results.headDesc}</p>
        </div>
        <div className="results-tv">
          <div>
            <div className="tv-shell">
              <div
                className={`screen2 ${flickering ? "flicker" : ""}`}
                id="projScreen"
              >
                <div className="proj-tag" id="projTag">
                  {current.tag}
                </div>
                <div className="proj-title" id="projTitle">
                  {current.title}
                </div>
                <div className="proj-desc" id="projDesc">
                  {current.desc}
                </div>
              </div>
            </div>
            <div className="tv-controls">
              <button
                className="tv-arrow"
                id="prevBtn"
                aria-label="Previous project"
                onClick={() => handleSlide(-1)}
              >
                &#8592;
              </button>
              <button
                className="tv-arrow"
                id="nextBtn"
                aria-label="Next project"
                onClick={() => handleSlide(1)}
              >
                &#8594;
              </button>
              <span className="tv-count" id="tvCount">
                {pad(index + 1)} / {pad(projects.length)}
              </span>
            </div>
          </div>
          <div className="results-side">
            <div className="kicker">{t.results.kicker}</div>
            <p>{t.results.sideDesc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
