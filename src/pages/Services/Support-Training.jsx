import React, { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/SupportTraining.css";
import "./styles/Service-pages.css";
import heroBg from "../../assets/images/services/Support-Training-page.jpg";

const SupportTraining = () => {
  const navigate = useNavigate();
  const ctaRef = useRef(null);
      const [ctaInView, setCtaInView] = useState(false);
  
      useEffect(() => {
          const el = ctaRef.current;
          if (!el) return;
  
          const obs = new IntersectionObserver(
              ([entry]) => {
                  if (entry.isIntersecting) {
                      setCtaInView(true);
                      obs.unobserve(entry.target); // animate once
                  }
              },
              { threshold: 0.25 }
          );
  
          obs.observe(el);
          return () => obs.disconnect();
      }, []);
  
  

  const tracks = useMemo(
    () => ({
      "Network Operations": {
        title: "Network Operations Training",
        points: [
          "Day-to-day monitoring, troubleshooting, and escalation flow.",
          "Switching/Wi‑Fi basics, backups, and safe change practices.",
          "Incident handling checklist and documentation habits.",
        ],
      },
      "Security Basics": {
        title: "Security Fundamentals Training",
        points: [
          "Least privilege, MFA, password policy, and secure admin routines.",
          "Firewall policy basics and safe rule change approach.",
          "Awareness: phishing patterns, endpoint hygiene, and reporting.",
        ],
      },
      "Deployment Readiness": {
        title: "Deployment Readiness Workshop",
        points: [
          "Cutover planning, rollback thinking, and validation steps.",
          "Change windows, stakeholder communication, and approvals.",
          "Post go‑live monitoring and stabilization routine.",
        ],
      },
    }),
    []
  );

  const trackKeys = Object.keys(tracks);
  const [activeTrack, setActiveTrack] = useState(trackKeys[0]);

  return (
    <>
     {/* HERO (new theme, but uses your local hero image) */}
      <section
        className="na-hero-section na-heroBg"
       
      >
        <div className="hero-left">


          <div className="na-serviceLabel">

            <span>SUPPORT AND TRAINING</span>
          </div>

          <h1>
            Empower Success with Expert Support and Training
          </h1>

          <p>
            Keep your team running smoothly and confidently with ongoing technical support and focused training
            programs tailored for operational excellence.
          </p>

          <button className="btn-orange" type="button" onClick={() => navigate("/contact")}>
            <span className="btn-text">Meet Our Experts Today</span>
            <span className="btn-arrow" aria-hidden="true">
              ›
            </span>
          </button>
        </div>

        <div className="hero-right">
          <div className="hero-image-container">
            <div className="shape-circle" />
            <div className="shape-green" />
            <img className="hero-img" src={heroBg} alt="Network audit" />
          </div>
        </div>
      </section>

      {/* How we help*/}
      <section className="hc-flow">
  <div className="hc-flow__container">
    <div className="hc-flow__header">
      <h2 className="hc-h2">How we help you choose</h2>
      <p className="hc-muted">
        A structured workflow: define requirements, shortlist vendors, validate claims with a site visit, then finalize
        SLA and onboarding.
      </p>
    </div>

    <div className="hc-flow__grid">
      {[
        { t: "1) Discovery", d: "Understand workloads, growth, power density, connectivity and compliance needs." },
        { t: "2) Shortlist", d: "Filter providers by location, budget, carrier options, and support capability." },
        { t: "3) Site visit", d: "Verify physical security, facility upkeep, and operational readiness on-site." },
        { t: "4) Score & select", d: "Use a consistent scorecard to compare vendors fairly across key criteria." },
        { t: "5) Onboarding plan", d: "Finalize cross-connects, access process, and cutover/migration schedule." },
      ].map((s) => (
        <div key={s.t} className="hc-flowCard">
          <h3 className="hc-h3">{s.t}</h3>
          <p className="hc-muted">{s.d}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* SECTION 1 (NEW): Training Tracks (tabs) */}
      <section className="st-tracks">
        <div className="st-tracks__container">
          <div className="st-tracks__header">
            <h2 className="st-h2">Training tracks</h2>
            <p className="st-muted">
              Choose a track based on your team’s role. Sessions can be delivered as workshops and then reinforced
              with practical runbooks and checklists.
            </p>
          </div>

          <div className="st-tabs" role="tablist" aria-label="Training tracks">
            {trackKeys.map((k) => (
              <button
                key={k}
                type="button"
                className={`st-tab ${activeTrack === k ? "active" : ""}`}
                onClick={() => setActiveTrack(k)}
                role="tab"
                aria-selected={activeTrack === k}
              >
                {k}
              </button>
            ))}
          </div>

          <div className="st-trackCard" role="tabpanel">
            <h3 className="st-h3">{tracks[activeTrack].title}</h3>
            <ul className="st-list">
              {tracks[activeTrack].points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <button className="st-outlineBtn" type="button" onClick={() => navigate("/contact")}>
              Request Training
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2 (NEW): Support Model (SLA tiles) */}
      <section className="st-support">
        <div className="st-support__container">
          <div className="st-support__left">
            <h2 className="st-h2">Support model</h2>
            <p className="st-muted">
              Structured support helps teams resolve issues faster, reduce downtime, and keep changes controlled with
              clear escalation and documentation.
            </p>
            <button className="btn-orange" type="button" onClick={() => navigate("/contact")}>
              <span className="btn-text">Talk to Support</span>
              <span className="btn-arrow" aria-hidden="true">
                ›
              </span>
            </button>
          </div>

          <div className="st-support__right">
            {[
              { t: "Remote support", d: "Guided troubleshooting, configuration checks, and change assistance." },
              { t: "Escalation path", d: "Clear priority handling and handoff rules for faster resolution." },
              { t: "Maintenance support", d: "Planned changes, patching guidance, and safe rollbacks." },
              { t: "Documentation updates", d: "Keep diagrams, runbooks, and inventories aligned to reality." },
            ].map((x) => (
              <div key={x.t} className="st-tile">
                <h3 className="st-tile__title">{x.t}</h3>
                <p className="st-tile__text">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* SECTION 4: CTA BANNER */}
            <section className="IT-cta-section">
                <div
                    ref={ctaRef}
                    className={`IT-cta-card IT-cta-reveal ${ctaInView ? "in" : ""}`}
                >
                    <div className="IT-cta-left">
                        <img
                            className="IT-cta-illustration"
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
                            alt="Support illustration"
                        />
                    </div>

                    <div className="IT-cta-right">
                        <h2>
                            Support When You Need It. Training That Sticks.

                        </h2>

                        <p>
                            Solve issues quickly and upskill your team with structured training and ongoing support 
                            designed to reduce downtime and improve day‑to‑day confidence.
                        </p>

                        <button className="IT-cta-btn" type="button">
                            Find My Support & training plan
                        </button>
                    </div>
                </div>
            </section>

      {/* Migration readiness*/}
<section className="hc-move">
  <div className="hc-move__container">
    <h2 className="hc-h2">Migration readiness</h2>
    <p className="hc-muted">
      Once the facility is selected, prepare a clean onboarding plan to reduce risk and downtime during the move.
    </p>

    <div className="hc-move__grid">
      <div className="hc-moveCard">
        <h3 className="hc-h3">Inventory & labeling</h3>
        <p className="hc-muted">Hardware list, ports, cabling map, and ownership tags for faster rack/stack.</p>
      </div>
      <div className="hc-moveCard">
        <h3 className="hc-h3">Connectivity plan</h3>
        <p className="hc-muted">Cross-connect requests, ISP handoff, IP plan, and test/validation steps.</p>
      </div>
      <div className="hc-moveCard">
        <h3 className="hc-h3">Cutover checklist</h3>
        <p className="hc-muted">Rollback plan, maintenance window, monitoring, and post-move stabilization.</p>
      </div>
    </div>
  </div>
</section>
    </>
  );
};

export default SupportTraining;


/*import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Service-pages.css';
import heroBg from '../../assets/images/services/Support-Training-page.jpg'; 

const SupportTraining = () => {
    const navigate = useNavigate();
    return (
  <section className="dd-hero" style={{ backgroundImage: `url(${heroBg})` }}>
    <div className="dd-hero__overlay">
      <nav className="dd-hero__breadcrumbs">
        <button className="logo-showcase__cta" onClick={() => navigate('/services')}>
            <span className="logo-showcase__cta-arrow">&#x25C0;</span>
            OUR SERVICES
          </button>
      </nav>
      <div className="dd-hero__service-label">
        <span className="dd-hero__icon">🛠️</span>
        <span>SUPPORT AND TRAINING</span>
      </div>
      <h1 className="dd-hero__title">Empower Success with<br />Expert Support and Training</h1>
      <p className="dd-hero__lead">
Keep your team running smoothly and confidently with ongoing technical support and intensive training programs tailored for peak performance.      </p>
      <button className="dd-hero__btn" onClick={() => navigate('/contact')} >MEET OUR EXPERTS TODAY</button>
    </div>
  </section>
    );
};

export default SupportTraining;*/
