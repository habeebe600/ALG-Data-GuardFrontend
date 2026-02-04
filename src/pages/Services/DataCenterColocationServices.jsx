import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/DataCenterColocationServices.css";
import HeroBg from "../../assets/images/services/DataCentreandColocation/DataCentreandColocationHero.png"

const DataCenterColocationServices = () => {
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
            obs.unobserve(entry.target);
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
        title: "Site Selection & Vendor Matching",
        desc: "Identify the best-fit colocation facility based on location, latency, compliance needs, and budget.",
      },
      {
        title: "Connectivity & Carrier Strategy",
        desc: "Plan diverse connectivity options (ISPs/carriers) for uptime, performance, and cost control.",
      },
      {
        title: "Rack, Power & Space Planning",
        desc: "Right-size cabinets, kW, and growth capacity so you don’t overpay now or run out of room later.",
      },
      {
        title: "Security & Compliance Alignment",
        desc: "Map physical security, access controls, and audit requirements to your industry standards.",
      },
      {
        title: "Migration & Cutover Support",
        desc: "Execute staged moves, minimize downtime, and validate systems post-migration.",
      },
      {
        title: "Ongoing Operations & Optimization",
        desc: "Establish monitoring, escalation paths, and documentation for stable long-term colocation operations.",
      },
    ],
    []
  );

  return (
    <>
      {/* HERO (same theme as your other pages) */}
      <section className="hero-section">
        <div className="hero-left">
          <div className="dd-serviceLabel">
            <span>DATA CENTER COLOCATION</span>
          </div>

          <h1 className="hc-hero__title" >
            Secure, scalable data center colocation.
          </h1>

          <p className="hc-hero__lead" >
            Place critical infrastructure in secure, resilient data centers while keeping flexibility and control. Get practical guidance from choosing the right facility to planning connectivity, migration, and ongoing operations.
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
              src={HeroBg}
              alt="Data center colocation"
            />
          </div>
        </div>
      </section>

      {/* Colocation Consulting (matches sc-wrap structure) */}
      <section className="sc-wrap">
        <div className="sc-container">
          <div className="sc-grid">
            <div className="sc-heroLeft">
              <h2 className="sc-title">
                Colocation strategy that fits your uptime, performance, and growth goals
              </h2>

              <p className="sc-text">
                Colocation is more than “renting racks.” It’s a long-term infrastructure
                decision that affects latency, availability, security posture, and operating
                costs. The right facility, connectivity design, and migration plan reduce risk
                and prevent expensive rework later.
              </p>

              <h3 className="sc-subtitle">What this service helps with</h3>
              <p className="sc-text">
                Get a clear approach to selecting a data center, planning power and space,
                establishing connectivity options, and moving workloads with minimal disruption.
              </p>
            </div>

            <div className="sc-heroRight">
              <div className="sc-imageCard">
                <img
                  className="sc-image"
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
                  alt="Colocation planning"
                />
              </div>
            </div>

            <div className="sc-below">
              <p className="sc-text sc-textWide">
                Whether moving from on prem to colocation or consolidating multiple server rooms,
                colocation gives stronger physical security, predictable power/cooling, and access
                to carriers while allowing you to keep ownership of your hardware and architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cards section (same as cs-wrap cards style + pop animation) */}
      <section className="cs-wrap">
        <div className="cs-container">
          <div className="cs-grid">
            <div>
              <h2 className="cs-title">Colocation capabilities</h2>
              <p className="cs-lead">
                Build a reliable colocation setup with the right choices upfront—then operate it
                smoothly with documentation, monitoring, and a practical support model.
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

      {/* CTA banner (same structure as other pages) */}
      <section className="colo-cta-section">
        <div ref={ctaRef} className={`colo-cta-card cta-reveal ${ctaInView ? "in" : ""}`}>
          <div className="colo-cta-left">
            <img
              className="colo-cta-illustration"
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
              alt="Colocation support"
            />
          </div>

          <div className="colo-cta-right">
            <h2 className="colo-h2">
              Plan your colocation <br />
              with <span>ALG Data Guard</span>
            </h2>

            <p>
              Get help selecting the right facility, designing connectivity, planning migration,
              and keeping operations stable after go live.
            </p>

            <button className="colo-cta-btn" type="button" onClick={() => navigate("/contact")}>
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>

      {/* Benefits (same reveal pattern as your pages) */}
      <section className="colo-benefits-section">
        <div className="colo-benefits-wrap" ref={benefitsRef}>
          <div className={`benefits-left ${benefitsInView ? "in" : ""}`}>
            <h2>Why colocation works for modern IT</h2>
            <div className="benefits-underline" />
            <p>
              Colocation strengthens resiliency and physical security while improving connectivity
              options and keeping infrastructure scalable as demand grows.
            </p>
          </div>

          <div className={`benefits-right ${benefitsInView ? "in" : ""}`}>
            <div className="benefit-block">
              <h3>Higher availability</h3>
              <p>Redundant power, cooling, and facility controls reduce outage risk.</p>
            </div>

            <div className="benefit-block">
              <h3>Better connectivity</h3>
              <p>Access multiple carriers and network paths for performance and redundancy.</p>
            </div>

            <div className="benefit-block">
              <h3>Stronger physical security</h3>
              <p>Controlled access, monitoring, and facility safeguards protect critical assets.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DataCenterColocationServices;
