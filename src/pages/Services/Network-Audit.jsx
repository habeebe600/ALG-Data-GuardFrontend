import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/NetworkAudit.css";
import heroBg from "../../assets/images/services/Network-Audit-Hero.png";

const NetworkAudit = () => {
  const navigate = useNavigate();

  // Findings animation (animate once)
  const findingRefs = useRef([]);
  useEffect(() => {
    const els = findingRefs.current.filter(Boolean);
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

  const auditAreas = useMemo(
    () => [
      {
        t: "Security posture",
        d: "Configuration review for routers, switches, firewalls, and wireless to identify misconfigurations and exposure.",
      },
      {
        t: "Performance & reliability",
        d: "Baseline latency, packet loss, throughput, utilization, and bottlenecks to improve user experience.",
      },
      {
        t: "Inventory & visibility",
        d: "Create/validate device inventory and network mapping so nothing critical is unmanaged.",
      },
      {
        t: "Access & segmentation",
        d: "Review VLANs, routing, remote access, and privilege controls to limit lateral movement and reduce risk.",
      },
      {
        t: "Operational hygiene",
        d: "Check firmware/patch posture, backups, documentation, and monitoring/alerting readiness.",
      },
      {
        t: "Remediation roadmap",
        d: "Deliver prioritized fixes (quick wins + longer-term improvements) with clear owners and effort estimates.",
      },
    ],
    []
  );

  return (
    <>
      {/* HERO (new theme, but uses your local hero image) */}
      <section
        className="hero-section na-heroBg"
        
      >
        <div className="hero-left">


          <div className="na-serviceLabel">

            <span>NETWORK AUDIT</span>
          </div>

          <h1>
            Network Security and Performance
          </h1>

          <p>
            Identify vulnerabilities, optimize configurations, and improve stability with a structured
            audit of your network infrastructure mapped to clear findings and prioritized fixes.
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
              <h2 className="sc-title">Know what’s happening inside your network</h2>

              <p className="sc-text">
                A network audit is a structured assessment of security controls, configurations, and
                performance behavior to find risks and bottlenecks before they become incidents.
              </p>

              <h3 className="sc-subtitle">What you get</h3>
              <p className="sc-text">
                Clear findings, risk-ranked recommendations, and an actionable plan to harden security,
                improve performance, and standardize operations.
              </p>
            </div>

            <div className="sc-heroRight">
              <div className="sc-imageCard">
                <img
                  className="sc-image"
                  src="https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1400&q=80"
                  alt="Network analysis"
                />
              </div>
            </div>

            <div className="sc-below">
              <p className="sc-text sc-textWide">
                The audit typically includes inventory/mapping, configuration review, security checks,
                and performance baselining (latency/packet loss/throughput/utilization), followed by a
                prioritized remediation roadmap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENT SECTION #1: Audit scope grid (not cards like other pages) */}
      <section className="na-scope">
        <div className="na-scope__container">
          <div className="na-scope__header">
            <h2 className="na-scope__title">Audit scope</h2>
            <p className="na-scope__lead">
              Coverage is tailored to your environment, but most audits include the areas below.
            </p>
          </div>

          <div className="na-scope__grid">
            {auditAreas.map((a, i) => (
              <div key={a.t} className="na-scopeCard">
                <h3>{a.t}</h3>
                <p>{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENT SECTION #2: Findings preview (animated tiles + report style) */}
      <section className="na-findings">
        <div className="na-findings__container">
          <div className="na-findings__left">
            <h2 className="na-findings__title">Findings you can act on</h2>
            <p className="na-findings__lead">
              Instead of a “big report that sits in a folder,” findings are grouped and prioritized so
              teams can execute improvements quickly.
            </p>

            <ul className="na-findings__bullets">
              <li>Risk-ranked issues (critical → low) with clear remediation steps.</li>
              <li>Quick wins vs. longer-term roadmap items.</li>
              <li>Configuration and performance baselines for future comparisons.</li>
            </ul>

            <button className="na-outlineBtn" type="button" onClick={() => navigate("/contact")}>
              Request an Audit
            </button>
          </div>

          <div className="na-findings__right">
            {[
              { t: "Critical", d: "High-risk misconfigurations or exposed services that need immediate attention." },
              { t: "High", d: "Security gaps or instability drivers that can impact uptime or increase exposure." },
              { t: "Medium", d: "Hardening and optimization opportunities that reduce risk and improve performance." },
              { t: "Low", d: "Hygiene improvements and standardization items to simplify operations." },
            ].map((x, i) => (
              <div key={x.t} ref={(el) => (findingRefs.current[i] = el)} className="na-pill">
                <div className="na-pill__badge">{x.t}</div>
                <div className="na-pill__text">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (same theme, different prefix) */}
      <section className="na-cta-section">
        <div ref={ctaRef} className={`na-cta-card cta-reveal ${ctaInView ? "in" : ""}`}>
          <div className="na-cta-left">
            <img
              className="na-cta-illustration"
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
              alt="Audit support"
            />
          </div>

          <div className="na-cta-right">
            <h2 className="na-h2">
              Strengthen your network <br />
              with <span>ALG Data Guard</span>
            </h2>

            <p>
              Get visibility into risk and performance—then fix issues with a roadmap your team can
              actually execute.
            </p>

            <button className="na-cta-btn" type="button" onClick={() => navigate("/contact")}>
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>

      {/* BENEFITS (same reveal pattern) */}
      <section className="na-benefits-section">
        <div className="na-benefits-wrap" ref={benefitsRef}>
          <div className={`benefits-left ${benefitsInView ? "in" : ""}`}>
            <h2>Benefits of a network audit</h2>
            <div className="benefits-underline" />
            <p>
              Audits improve reliability and security by detecting misconfigurations, performance
              bottlenecks, and operational gaps early.
            </p>
          </div>

          <div className={`benefits-right ${benefitsInView ? "in" : ""}`}>
            <div className="benefit-block">
              <h3>Reduced risk</h3>
              <p>Identify vulnerabilities and misconfigurations before they become incidents.</p>
            </div>

            <div className="benefit-block">
              <h3>Better performance</h3>
              <p>Baseline key metrics and remove bottlenecks affecting real users and apps.</p>
            </div>

            <div className="benefit-block">
              <h3>Cleaner operations</h3>
              <p>Standardize configs, monitoring, and documentation for simpler ongoing support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="dd-faq">
        <div className="dd-faq__container">
          <h2 className="dd-faq__title">FAQ</h2>

          <details className="dd-faqItem">
            <summary>What does a network audit include?</summary>
            <p>
              Typically: inventory/mapping, configuration review (routers/switches/firewalls/Wi‑Fi), access controls,
              security checks, and performance baselining—followed by a prioritized remediation roadmap.
            </p>
          </details>

          <details className="dd-faqItem">
            <summary>How long does a network audit take?</summary>
            <p>
              It depends on the number of sites/devices and the scope; after discovery, a clear schedule is shared.
            </p>
          </details>

          <details className="dd-faqItem">
            <summary>Do you provide a report and recommendations?</summary>
            <p>
              Yes. You get documented findings, risk priority, and recommended fixes (quick wins + longer-term actions).
            </p>
          </details>

          <details className="dd-faqItem">
            <summary>Will the audit cause downtime?</summary>
            <p>
              The audit is designed to be non-disruptive; any active testing is planned in advance and can be scheduled
              after hours if needed.
            </p>
          </details>

          <details className="dd-faqItem">
            <summary>Can you also help implement the fixes?</summary>
            <p>
              Yes—remediation can be handled as a follow-on engagement (hardening, optimization, and validation).
            </p>
          </details>
        </div>
      </section>


    </>
  );
};

export default NetworkAudit;
