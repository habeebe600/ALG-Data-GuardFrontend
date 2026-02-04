import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/DesignAndDeployment.css";

// your existing hero image
import heroBg from "../../assets/images/services/Design-and-deployment-Hero.png";

const DesignAndDeployment = () => {
  const navigate = useNavigate();

  // Cards pop-in animation (same pattern as your pages)
  const cardRefs = useRef([]);
  useEffect(() => {
    const els = cardRefs.current.filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.2 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // CTA reveal
  const ctaRef = useRef(null);
  const [ctaInView, setCtaInView] = useState(false);
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaInView(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Benefits reveal
  const benefitsRef = useRef(null);
  const [benefitsInView, setBenefitsInView] = useState(false);
  useEffect(() => {
    const el = benefitsRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setBenefitsInView(true);
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  
  return (
    <>
      {/* HERO (same style as new pages, but uses your background image) */}
      <section
        className="hero-section dd-heroBg"
      >
        <div className="hero-left">
          <div className="dd-serviceLabel">
            <span>DESIGN AND DEPLOYMENT</span>
          </div>

          <h1 className="hc-hero__title" >
            Pave the Way for Robust <br />
            Network Infrastructure
          </h1>

          <p className="hc-hero__lead" >
            Unlock reliable performance with customized design and seamless deployment of network
            solutions tailored to your business objectives, security needs, and growth plans.
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

      {/* OVERVIEW (sc-wrap) */}
      <section className="sc-wrap">
        <div className="sc-container">
          <div className="sc-grid">
            <div className="sc-heroLeft">
              <h2 className="sc-title">Build a network foundation that supports growth</h2>

              <p className="sc-text">
                A strong network is the backbone of day‑to‑day operations supporting productivity,
                security, voice/video, cloud services, and future expansion. This service helps
                organizations plan and deploy network infrastructure with fewer surprises and a
                cleaner long‑term support path.
              </p>

              <h3 className="sc-subtitle">What to expect</h3>
              <p className="sc-text">
                Start with requirements and site constraints, then move into design, implementation,
                testing, and handover. The goal is a stable, secure setup that your team can run with
                confidence.
              </p>
            </div>

            <div className="sc-heroRight">
              <div className="sc-imageCard">
                <img
                  className="sc-image"
                  src="https://images.unsplash.com/photo-1551703599-6b3e8379aa8f?auto=format&fit=crop&w=1400&q=80"
                  alt="Network implementation"
                />
              </div>
            </div>

            <div className="sc-below">
              <p className="sc-text sc-textWide">
                Typical outcomes include improved reliability, clearer segmentation and security
                controls, optimized coverage and throughput, and documentation that makes changes and
                troubleshooting significantly faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES (cs-wrap cards) */}
      {/* SECTION: Delivery process */}
      <section className="dd-process">
        <div className="dd-process__container">
          <div className="dd-process__header">
            <h2 className="dd-process__title">How delivery works</h2>
            <p className="dd-process__lead">
              A clear end-to-end workflow requirements, design, implementation, testing, and handover so
              you go live with confidence and predictable operations.
            </p>
          </div>

          <div className="dd-steps">
            {[
              {
                t: "1) Discover & requirements",
                d: "Gather goals, constraints, sites, users, apps, and risk/compliance needs.",
              },
              {
                t: "2) Design & validation",
                d: "Create architecture, IP plan, segmentation, Wi‑Fi model, and redundancy approach.",
              },
              {
                t: "3) Build & configure",
                d: "Configure switching, wireless, firewall/VPN, and security baselines in a controlled plan.",
              },
              {
                t: "4) Deploy & cutover",
                d: "Execute staged deployment with minimal downtime, then validate services end-to-end.",
              },
              {
                t: "5) Document & handover",
                d: "Provide diagrams, runbooks, and admin knowledge transfer for long‑term support.",
              },
            ].map((s, i) => (
              <div
                key={s.t}
                ref={(el) => (cardRefs.current[i] = el)}
                className="dd-step"
              >
                <h3 className="dd-step__title">{s.t}</h3>
                <p className="dd-step__text">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="dd-deliverables">
            <h3 className="dd-deliverables__title">Typical deliverables</h3>
            <ul className="dd-deliverables__list">
              <li>Network diagrams (logical + physical) and inventory.</li>
              <li>IP plan, VLAN/segmentation model, and routing notes.</li>
              <li>Firewall policy baseline + VPN configuration details.</li>
              <li>Wi‑Fi coverage assumptions, SSIDs, and security settings.</li>
              <li>Testing checklist + go‑live validation results.</li>
              <li>Handover pack: runbooks, admin guides, and escalation paths.</li>
            </ul>

            <button className="dd-deliverables__btn" type="button" onClick={() => navigate("/contact")}>
              Get a Deployment Plan
            </button>
          </div>
        </div>
      </section>


      {/* CTA (same structure, unique class prefix) */}
      <section className="dd-cta-section">
        <div ref={ctaRef} className={`dd-cta-card cta-reveal ${ctaInView ? "in" : ""}`}>
          <div className="dd-cta-left">
            <img
              className="dd-cta-illustration"
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
              alt="Deployment support"
            />
          </div>

          <div className="dd-cta-right">
            <h2 className="dd-h2">
              Upgrade your network <br />
              with <span>ALG Data Guard</span>
            </h2>

            <p>
              Get a dependable design and a clean deployment plan—then go live with testing,
              documentation, and support that makes operations easier.
            </p>

            <button className="dd-cta-btn" type="button" onClick={() => navigate("/contact")}>
              Meet Our Experts Today
            </button>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="dd-benefits-section">
        <div className="dd-benefits-wrap" ref={benefitsRef}>
          <div className={`benefits-left ${benefitsInView ? "in" : ""}`}>
            <h2>Why design + deployment matters</h2>
            <div className="benefits-underline" />
            <p>
              A well-designed network reduces downtime, improves user experience, and keeps security
              controls consistent across sites and teams.
            </p>
          </div>

          <div className={`benefits-right ${benefitsInView ? "in" : ""}`}>
            <div className="benefit-block">
              <h3>More reliability</h3>
              <p>Redundancy, validated configs, and clean cutovers reduce outages and instability.</p>
            </div>

            <div className="benefit-block">
              <h3>Better performance</h3>
              <p>Optimized Wi‑Fi and switching design improves throughput for real workloads.</p>
            </div>

            <div className="benefit-block">
              <h3>Cleaner operations</h3>
              <p>Documentation and standards make future changes, audits, and troubleshooting faster.</p>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ's */}
      <section className="dd-faq">
        <div className="dd-faq__container">
          <h2 className="dd-faq__title">FAQ</h2>

          <details className="dd-faqItem">
            <summary>How long does a typical deployment take?</summary>
            <p>
              Timelines depend on sites, hardware readiness, cabling, and cutover constraints; a rollout
              plan is defined after discovery and design.
            </p>
          </details>

          <details className="dd-faqItem">
            <summary>Can deployments be done after business hours?</summary>
            <p>
              Yes cutovers can be scheduled to reduce disruption, with validation and rollback planning.
            </p>
          </details>

          <details className="dd-faqItem">
            <summary>Do you provide documentation?</summary>
            <p>
              Yes diagrams, IP plans, runbooks, and a handover session are included to support operations.
            </p>
          </details>
        </div>
      </section>

    </>
  );
};

export default DesignAndDeployment;
