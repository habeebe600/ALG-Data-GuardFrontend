import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ConfigurationServicesDeployment.css";

const ConfigurationServicesDeployment = () => {
  const navigate = useNavigate();

  // Cards (pop-in animation)
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

  const cards = useMemo(
    () => [
      {
        title: "Device & Endpoint Deployment",
        desc: "Roll out laptops/desktops with standardized builds, policies, and security baselines for consistency.",
      },
      {
        title: "Microsoft 365 / Google Workspace Setup",
        desc: "Configure tenants, domains, email, collaboration apps, and security controls with a clean rollout plan.",
      },
      {
        title: "Network Configuration & Rollouts",
        desc: "Implement reliable switching, Wi‑Fi, VLANs, and firewall policies with documentation and testing.",
      },
      {
        title: "Identity, Access & MFA",
        desc: "Set up users, roles, conditional access, and MFA to reduce risk and improve access control.",
      },
      {
        title: "Software Packaging & Automation",
        desc: "Standardize app installs, updates, and device policies using modern deployment and management tools.",
      },
      {
        title: "Go‑Live Support & Handover",
        desc: "Validate deployments, provide runbooks, and support cutover so teams can adopt new systems smoothly.",
      },
    ],
    []
  );

  return (
    <>
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-left">
          <div className="dd-serviceLabel">
            <span>Configuration Services & Technology Deployment</span>
          </div>

          <h1 className="hc-hero__title" >
            Streamlined configuration for <br />
            seamless deployments.
          </h1>

          <p className="hc-hero__lead" >
            Deploy new technology confidently with consistent configuration, security-first policies, and rollout support. Reduce setup time, prevent misconfigurations, and deliver a smoother experience for end users.
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
            <img
              className="hero-img"
              src="https://images.unsplash.com/photo-1581091870622-2c1e0a9c45b1?auto=format&fit=crop&w=1400&q=80"
              alt="Technology deployment"
            />
          </div>
        </div>
      </section>

      {/* CONSULTING / OVERVIEW (sc-wrap) */}
      <section className="sc-wrap">
        <div className="sc-container">
          <div className="sc-grid">
            <div className="sc-heroLeft">
              <h2 className="sc-title">
                Standardized deployments that reduce risk and speed up delivery
              </h2>

              <p className="sc-text">
                Configuration mistakes are one of the fastest ways to create downtime, security gaps,
                and user frustration. A repeatable deployment approach—built on baselines, testing,
                and documentation—keeps rollouts consistent across teams and locations.
              </p>

              <h3 className="sc-subtitle">What this service includes</h3>
              <p className="sc-text">
                From endpoint and productivity suites to network and identity, deployments are planned,
                configured, validated, and handed over with clear runbooks and support.
              </p>
            </div>

            <div className="sc-heroRight">
              <div className="sc-imageCard">
                <img
                  className="sc-image"
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
                  alt="Configuration planning"
                />
              </div>
            </div>

            <div className="sc-below">
              <p className="sc-text sc-textWide">
                Whether onboarding new employees, opening a new site, upgrading infrastructure, or
                standardizing security policies, structured configuration and deployment keeps your
                environment stable and easier to manage long term.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CARDS (cs-wrap) */}
      <section className="cs-wrap">
        <div className="cs-container">
          <div className="cs-grid">
            <div>
              <h2 className="cs-title">Deployment capabilities</h2>
              <p className="cs-lead">
                A clear rollout model that covers planning, configuration, validation, and support—so
                technology works on day one and stays consistent across teams.
              </p>
            </div>

            <div className="cs-cards">
              {cards.map((c, i) => (
                <div
                  key={c.title}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="cs-card"
                >
                  <h3 className="cs-cardTitle">{c.title}</h3>
                  <p className="cs-cardText">{c.desc}</p>
                  <button className="cs-cardBtn" type="button" onClick={() => navigate("/contact")}>
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="deploy-cta-section">
        <div ref={ctaRef} className={`deploy-cta-card cta-reveal ${ctaInView ? "in" : ""}`}>
          <div className="deploy-cta-left">
            <img
              className="deploy-cta-illustration"
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
              alt="Deployment support"
            />
          </div>

          <div className="deploy-cta-right">
            <h2 className="deploy-h2">
              Deploy with confidence <br />
              with <span>ALG Data Guard</span>
            </h2>

            <p>
              Get a reliable rollout plan, secure configurations, and practical cutover support so
              teams stay productive while technology changes.
            </p>

            <button className="deploy-cta-btn" type="button" onClick={() => navigate("/contact")}>
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="deploy-benefits-section">
        <div className="deploy-benefits-wrap" ref={benefitsRef}>
          <div className={`benefits-left ${benefitsInView ? "in" : ""}`}>
            <h2>Benefits of structured deployments</h2>
            <div className="benefits-underline" />
            <p>
              Consistent configuration improves security posture, reduces troubleshooting time, and
              helps teams scale without chaos.
            </p>
          </div>

          <div className={`benefits-right ${benefitsInView ? "in" : ""}`}>
            <div className="benefit-block">
              <h3>Faster rollout</h3>
              <p>Repeatable baselines and checklists reduce setup time and errors.</p>
            </div>

            <div className="benefit-block">
              <h3>Improved security</h3>
              <p>Policies, MFA, and access controls are implemented consistently across users and devices.</p>
            </div>

            <div className="benefit-block">
              <h3>Cleaner operations</h3>
              <p>Documentation and handover make future support simpler and more predictable.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConfigurationServicesDeployment;
