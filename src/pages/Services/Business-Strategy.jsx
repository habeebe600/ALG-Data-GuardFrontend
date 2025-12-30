import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/BusinessStrategy.css";
import "./styles/Service-pages.css";
import heroBg from "../../assets/images/services/Business-Strategy-page.png";

const BusinessStrategy = () => {
  const navigate = useNavigate();

  // Tabs (same pattern as ITManagedSupportServices)
  const tabs = useMemo(
    () => [
      {
        key: "alignment",
        label: "BUSINESS ALIGNMENT",
        title: "Business-Aligned IT Strategy",
        desc:
          "Align technology priorities with business goals so IT spend supports outcomes that matter growth, efficiency, customer experience, and risk reduction.",
        cta: "Learn More",
        image:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
      },
      {
        key: "roadmap",
        label: "ROADMAP & PRIORITIES",
        title: "Roadmap, Prioritization & Execution Plan",
        desc:
          "Turn strategy into an actionable roadmap with milestones, dependencies, and measurable KPIs—so teams can deliver in phases without creating chaos.",
        cta: "Learn More",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
      },
      {
        key: "governance",
        label: "GOVERNANCE & METRICS",
        title: "Governance, Decision Rights & Reporting",
        desc:
          "Establish clear decision making, intake, and reporting so initiatives stay aligned, funded correctly, and measured against real business value.",
        cta: "Learn More",
        image:
          "https://images.unsplash.com/photo-1523952578875-e6bb18b26645?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Animate service items (same logic as sample)
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

  return (
    <>
      {/* HERO (same layout as sample hero-section) */}
      <section className="bs-hero-section bs-heroBg">
        <div className="hero-left">
          <div className="bs-serviceLabel">
            <span>BUSINESS STRATEGY</span>
          </div>

          <h1>
            Transform Your Business with <br />
            Strategic IT Consulting
          </h1>

          <p>
            Align technology investments with business goals to drive smart digital transformation, reduce waste,
            and deliver measurable outcomes.
          </p>

          <button className="btn-orange" type="button" onClick={() => navigate("/contact")}>
            <span className="btn-text">Meet Our Experts Today</span>
            <span className="btn-arrow" aria-hidden="true">›</span>
          </button>
        </div>

        <div className="hero-right">
          <div className="hero-image-container">
            <div className="shape-circle" />
            <div className="shape-green" />
            <img className="hero-img" src={heroBg} alt="Business strategy consulting" />
          </div>
        </div>
      </section>

      {/* SERVICES SECTION (same layout, different content) */}
      <section className="services-section bs-services">
        <div className="services-left">
          <h2>Clarity first. Execution next.</h2>
          <p>
            Strategy fails when it stays in slides. This service turns business goals into a practical IT plan with
            priorities, governance, and tracking so teams ship the right work and can prove impact.
          </p>

          {/* Unique bullets so this page feels different */}
          <ul className="bs-bullets">
            <li>Current-state assessment and gap identification.</li>
            <li>Future-state capabilities and target outcomes.</li>
            <li>Roadmap with phases, owners, and success metrics.</li>
          </ul>
        </div>

        <div className="services-right">
          {[
            { t: "Assess", d: "Understand systems, processes, risks, and what’s blocking progress." },
            { t: "Align", d: "Connect business priorities to technology initiatives and funding." },
            { t: "Execute", d: "Create a phased roadmap with governance and measurable KPIs." },
          ].map((x, i) => (
            <div key={x.t} ref={(el) => (cardRefs.current[i] = el)} className="service-item bs-serviceItem">
              <div className="service-icon-IT bs-icon">{x.t[0]}</div>
              <div>
                <h3>{x.t}</h3>
                <p>{x.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TABS SECTION (same structure as managed-IT-section) */}
      <section className="managed-IT-section bs-managed">
        <div className="managed-IT-header">
          <h2>What we deliver</h2>
          <p>
            Engage for alignment, roadmapping, or governance or combine them into a full transformation plan.
          </p>

          <div className="managed-tabs" role="tablist" aria-label="Business strategy consulting deliverables">
            {tabs.map((t) => (
              <button
                key={t.key}
                className={`managed-tab ${activeTab.key === t.key ? "active" : ""}`}
                type="button"
                onClick={() => setActiveTab(t)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="managed-IT-body tab-enter" key={activeTab.key}>
          <div className="managed-card">
            <div className="managed-imageWrap">
              <img className="managed-image" src={activeTab.image} alt={activeTab.title} />
            </div>

            <div className="managed-content">
              <h3>{activeTab.title}</h3>
              <p>{activeTab.desc}</p>

              <button className="managed-cta" type="button" onClick={() => navigate("/contact")}>
                {activeTab.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* UNIQUE SECTION (optional, makes page feel different): KPI strip */}
      <section className="bs-kpi">
        <div className="bs-kpi__container">
          <h2 className="bs-kpi__title">Track outcomes, not activity</h2>
          <p className="bs-kpi__lead">
            Roadmaps work best when progress is measured with clear KPIs tied to business outcomes.
          </p>

          <div className="bs-kpi__grid">
            <div className="bs-kpiCard">
              <h3>Operational efficiency</h3>
              <p>Cycle time, ticket volume, automation coverage, and service reliability.</p>
            </div>
            <div className="bs-kpiCard">
              <h3>Risk reduction</h3>
              <p>Control coverage, audit readiness, incident trends, and security posture improvements.</p>
            </div>
            <div className="bs-kpiCard">
              <h3>Business value</h3>
              <p>Adoption, customer experience metrics, cost optimization, and measurable ROI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER (keep same IT-cta style like sample) */}
      <section className="IT-cta-section">
        <div ref={ctaRef} className={`IT-cta-card IT-cta-reveal ${ctaInView ? "in" : ""}`}>
          <div className="IT-cta-left">
            <img
              className="IT-cta-illustration"
              src="https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1400&q=80"
              alt="Strategy workshop"
            />
          </div>

          <div className="IT-cta-right">
            <h2>
              Build a practical roadmap <br />
              for <span>IT transformation</span>
            </h2>

            <p>
              Get a clear strategy, prioritized initiatives, and governance that keeps execution aligned to business goals.
              Start with a discovery call to define scope and outcomes.
            </p>

            <button className="IT-cta-btn" type="button" onClick={() => navigate("/contact")}>
              Find My Strategy Plan
            </button>
          </div>
        </div>
      </section>

      {/* BENEFITS (same reveal pattern) */}
      <section className="IT-benefits-section">
        <div className="IT-benefits-wrap" ref={benefitsRef}>
          <div className={`benefits-left ${benefitsInView ? "in" : ""}`}>
            <h2>Business strategy that drives delivery</h2>
            <div className="benefits-underline" />
            <p>
              Strong IT strategy uses governance and measurement to keep execution aligned to priorities so investments
              deliver value instead of noise.
            </p>
          </div>

          <div className={`benefits-right ${benefitsInView ? "in" : ""}`}>
            <div className="benefit-block">
              <h3>Clear priorities</h3>
              <p>Stop competing initiatives and focus teams on the work that matters most.</p>
            </div>

            <div className="benefit-block">
              <h3>Better decisions</h3>
              <p>Improve intake, funding, and decision rights with a consistent governance model.</p>
            </div>

            <div className="benefit-block">
              <h3>Measurable outcomes</h3>
              <p>Track KPIs that show progress and value then iterate the roadmap as needs change.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BusinessStrategy;
