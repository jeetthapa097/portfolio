import React, { useState, useRef } from 'react';
import Header from './Header';
import './App.css';

const CONFERENCES = [
  {
    name: 'PINO Conference 2026',
    tag: 'Polymer Initiative of Northeast Ohio',
    link: 'https://www.pinoconference.org/',
    image: `${process.env.PUBLIC_URL}/conference_pino.jpg`,
    description:
      'Characterized the strain-rate-dependent compressive behavior of SLS-printed PA12 and PA12-GF across 7 build orientations and 4 loading rates (0.01–5 s⁻¹), combining mechanical testing with XRD microstructural analysis and SEM fractography. Diagonal PA12 builds exhibited extreme rate sensitivity — yield stress increasing nearly 175% from quasi-static to dynamic loading — while glass fiber reinforcement in PA12-GF suppressed this variability and raised baseline stiffness by 18–20%. XRD confirmed a full α-to-γ phase transformation during SLS processing, directly linking crystallographic structure to enhanced mechanical performance.',
  },
  {
    name: 'MS&T 2025',
    tag: 'Materials Science & Technology · Columbus, Ohio',
    link: 'https://www.matscitech.org/MST25',
    image: `${process.env.PUBLIC_URL}/conference_mst25.jpg`,
    description:
      'Presented at MS&T 2025 (Sep 28–Oct 1, Columbus, OH), this study characterizes how environmental exposure degrades the mechanical integrity of SLS-printed PA12-GF composites across four distinct build orientations. Moisture was confirmed as the dominant degradation mechanism, inducing up to a 36% loss in stiffness and a 25% reduction in yield strength — effects that heat treatment and glass fiber reinforcement could not offset. These findings directly inform durability standards for additively manufactured structural polymer components in service environments.',
  },
  {
    name: 'Dayton Engineering Sciences Symposium 2025',
    tag: 'ASME Dayton Section · DESS',
    link: 'https://www.asmedayton.org/DESS/DESS.php',
    image: `${process.env.PUBLIC_URL}/conference_dess.jpg`,
    description:
      'Investigated the combined effects of moisture exposure, heat treatment, and build orientation on the mechanical performance of SLS-printed PA12-GF composites, using four orientations (V, D, H, H2) and three conditioning regimes. Moisture dominated mechanical behavior, causing a 30–36% drop in tensile modulus and a 20–25% reduction in yield stress regardless of heat treatment or fiber reinforcement, while dramatically increasing fracture strain by up to 74.8%. This work provides critical design guidance for real-world deployment of additive-manufactured polymer composites in humid or thermally variable environments.',
  },
  {
    name: 'Research Celebration Event 2026',
    tag: '🏆 Excellence in Research Poster Presentation Award — Wright State University',
    link: 'https://www.wright.edu/events/wsu-celebration-of-research-scholarship-and-creative-activities',
    image: null,
    wsuCard: true,
    award: true,
    description:
      '🏆 Excellence in Research Poster Presentation Award — Awarded by the Office of Research and Sponsored Programs, Wright State University, in recognition of outstanding scholarship in designing and presenting a research poster.\n\nThis poster reveals a counterintuitive paradox in glass-fiber-reinforced SLS composites: while PA12-GF achieves 18–20% greater compressive stiffness than pure PA12, its yield stress is consistently lower — unbonded glass bead interfaces act as compressive stress concentrators, a behavior fundamentally distinct from tensile loading. Strain-rate hardening was confirmed across all 7 build orientations, with yield stress increasing up to 175% from quasi-static to dynamic loading in pure PA12 diagonal builds. Microstructural analysis via XRD and SEM linked a full α-to-γ crystallographic phase transformation during SLS processing to the improved mechanical baseline of printed parts.',
  },
];

export default function ConferencePage() {
  const [activeConference, setActiveConference] = useState(null);
  const hoverTimeoutRef = useRef(null);

  return (
    <div className="App">
      <Header />
      <main>
        <section className="section projects-section" style={{ paddingTop: '6rem' }}>
          <div className="section-container">
            <h2 className="section-title">Conferences &amp; Seminars</h2>
            <div className="projects-grid">
              {CONFERENCES.map((conf) => (
                <article
                  key={conf.name}
                  className="project-card"
                  onMouseEnter={() => {
                    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                    hoverTimeoutRef.current = setTimeout(() => setActiveConference(conf), 1000);
                  }}
                  onMouseLeave={() => {
                    if (hoverTimeoutRef.current) {
                      clearTimeout(hoverTimeoutRef.current);
                      hoverTimeoutRef.current = null;
                    }
                  }}
                  onClick={() => {
                    if (hoverTimeoutRef.current) {
                      clearTimeout(hoverTimeoutRef.current);
                      hoverTimeoutRef.current = null;
                    }
                    setActiveConference(conf);
                  }}
                >
                  <div
                    className="project-image-wrapper"
                    style={conf.wsuCard ? { background: '#00543C', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '180px' } : {}}
                  >
                    {conf.wsuCard ? (
                      <img
                        src={`${process.env.PUBLIC_URL}/conference_wsu.png`}
                        alt="Wright State University"
                        style={{ width: '60%', maxWidth: '220px', opacity: 0.95 }}
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src={conf.image}
                        alt={conf.name}
                        className="project-image"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <h3 className="project-title">{conf.name}</h3>
                  {conf.award ? (
                    <p className="project-tag" style={{ color: '#f5c518', fontWeight: 700, fontSize: '0.72rem' }}>{conf.tag}</p>
                  ) : (
                    <p className="project-tag">{conf.tag}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {activeConference && (
        <div
          className="project-modal-backdrop"
          onClick={() => setActiveConference(null)}
          role="presentation"
        >
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={() => setActiveConference(null)}
              aria-label="Close"
            >
              ×
            </button>

            {activeConference.wsuCard ? (
              <div className="project-modal-image-wrapper" style={{ background: '#00543C', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '160px' }}>
                <img
                  src={`${process.env.PUBLIC_URL}/conference_wsu.png`}
                  alt="Wright State University"
                  style={{ width: '50%', maxWidth: '200px' }}
                />
              </div>
            ) : activeConference.image ? (
              <div className="project-modal-image-wrapper">
                <img
                  src={activeConference.image}
                  alt={activeConference.name}
                  className="project-modal-image"
                />
              </div>
            ) : null}

            {activeConference.award ? (
              <p style={{ color: '#f5c518', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                {activeConference.tag}
              </p>
            ) : (
              <p className="project-tag project-tag-modal">{activeConference.tag}</p>
            )}
            <h3 className="project-title project-title-modal">{activeConference.name}</h3>
            {activeConference.award ? (
              <div className="project-description-modal">
                <p style={{ background: 'linear-gradient(90deg,#b8860b,#f5c518,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                  🏆 Excellence in Research Poster Presentation Award
                </p>
                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  Awarded by the Office of Research and Sponsored Programs, Wright State University — in recognition of outstanding scholarship in designing and presenting a research poster.
                </p>
                <p style={{ marginTop: '0.75rem' }}>
                  This poster reveals a counterintuitive paradox in glass-fiber-reinforced SLS composites: while PA12-GF achieves 18–20% greater compressive stiffness than pure PA12, its yield stress is consistently lower — unbonded glass bead interfaces act as compressive stress concentrators, a behavior fundamentally distinct from tensile loading. Strain-rate hardening was confirmed across all 7 build orientations, with yield stress increasing up to 175% from quasi-static to dynamic loading in pure PA12 diagonal builds. Microstructural analysis via XRD and SEM linked a full α-to-γ crystallographic phase transformation during SLS processing to the improved mechanical baseline of printed parts.
                </p>
              </div>
            ) : (
              <p className="project-description-modal">{activeConference.description}</p>
            )}

            <a
              href={activeConference.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}
            >
              Visit Conference Site →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
