import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/TechnicalRecruiter.css";
import "./styles/Service-pages.css";
import heroBg from "../../assets/images/services/Technical-Recruiter-Hero.png";

const TechnicalRecruiter = () => {
  const navigate = useNavigate();

  // Tabs (same pattern as ITManagedSupportServices)
  const tabs = useMemo(
    () => [
      {
        key: "contract",
        label: "CONTRACT / STAFF AUG",
        title: "Contract & Staff Augmentation",
        desc:
          "Scale fast with vetted technical professionals for short-term and long-term needs. Add engineers, analysts, and specialists without slowing delivery timelines.",
        cta: "Learn More",
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
      },
      {
        key: "permanent",
        label: "PERMANENT HIRING",
        title: "Permanent Technical Hiring",
        desc:
          "Hire the right long-term talent with structured screening, skill validation, and role-fit evaluation—so you reduce churn and improve team performance.",
        cta: "Learn More",
        image:
          "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1400&q=80",
      },
      {
        key: "screening",
        label: "SCREENING & SHORTLIST",
        title: "Screening, Shortlisting & Interview Support",
        desc:
          "Get curated shortlists with technical screening, interview coordination, and feedback loops so hiring managers spend time only on qualified candidates.",
        cta: "Learn More",
        image:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Animate cards (same logic as sample)
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

  // CTA reveal (same logic as sample)
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

  // Benefits reveal (same logic as sample)
  const benefitsRef = useRef(null);
  const [benefitsInView, setBenefitsInView] = useState(false);
  useEffect(() => {
    const el = benefitsRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        (entry.isIntersecting) && setBenefitsInView(true);
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* HERO (same as sample hero-section style) */}
      <section className="tr-hero-section tr-heroBg">
        <div className="hero-left">
          <div className="tr-serviceLabel">
            <span>TECHNICAL RECRUITERS</span>
          </div>

          <h1>
            Accelerate Your Team
            with Specialized IT Talent
          </h1>

          <p>
            Find and onboard high quality technology professionals for your specialized needs using targeted sourcing,
            structured screening, and fast turnaround.
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
            <img className="hero-img" src={heroBg} alt="Technical recruitment" />
          </div>
        </div>
      </section>

      {/* SECTION 1 (same as sample services-section)
          DIFFERENT content style: “how we recruit” bullets + 3 cards */}
      <section className="services-section tr-services">
        <div className="services-left">
          <h2>Hiring made faster, simpler, and more precise</h2>
          <p>
            Technical hiring is hard because role requirements change quickly and resumes don’t tell the full story.
            This service focuses on targeted sourcing, technical screening, and clean shortlists so teams can hire
            confidently without slowing delivery.
          </p>

          {/* Unique mini list (adds variety vs other pages) */}
          <ul className="tr-bullets">
            <li>Role scoping + skill matrix aligned to your stack.</li>
            <li>Screening focused on real-world ability, not keywords.</li>
            <li>Faster shortlists with clear notes and recommendations.</li>
          </ul>
        </div>

        <div className="services-right">
          {[
            {
              t: "Source",
              d: "Targeted outreach to match the role, stack, and seniority you actually need.",
            },
            {
              t: "Validate",
              d: "Technical screening, structured interviews, and role-fit checks to reduce mismatches.",
            },
            {
              t: "Deliver",
              d: "Shortlists with clear feedback and hiring support through offer and onboarding.",
            },
          ].map((x, i) => (
            <div key={x.t} ref={(el) => (cardRefs.current[i] = el)} className="service-item tr-serviceItem">
              <div className="service-icon-IT tr-icon">{x.t[0]}</div>
              <div>
                <h3>{x.t}</h3>
                <p>{x.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2 (same as sample managed-IT-section, but tailored tabs) */}
      <section className="managed-IT-section tr-managed">
        <div className="managed-IT-header">
          <h2>Flexible recruiting support</h2>
          <p>
            Choose the engagement style that fits your needs contract staffing, permanent hiring, or screening-only.
          </p>

          <div className="managed-tabs" role="tablist" aria-label="Recruiting options">
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

      {/* EXTRA SECTION (NEW + unique): Role coverage chips (adds variety)
          If you want to remove it later, delete this block. */}
      <section className="tr-roles">
        <div className="tr-roles__container">
          <h2 className="tr-roles__title">Roles commonly supported</h2>
          <p className="tr-roles__lead">
            Hiring support can be aligned to your stack, timelines, and internal interview process.
          </p>

          <div className="tr-chips">
            {[
              "Frontend (React)",
              "Backend (Node.js)",
              "Full‑stack",
              "QA / Automation",
              "DevOps / Cloud",
              "Network & Security",
              "IT Support",
              "Project / Product",
            ].map((c) => (
              <span key={c} className="tr-chip">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (KEEP: same as sample pattern, only text changes) */}
      <section className="IT-cta-section">
        <div ref={ctaRef} className={`IT-cta-card IT-cta-reveal ${ctaInView ? "in" : ""}`}>
          <div className="IT-cta-left">
            <img
              className="IT-cta-illustration"
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
              alt="Hiring support"
            />
          </div>

          <div className="IT-cta-right">
            <h2>
              Build a stronger team <br />
              with <span>technical talent</span>
            </h2>

            <p>
              From sourcing to screening and onboarding support, get a recruiting process built for speed and quality
              so you can hire the right people without losing momentum.
            </p>

            <button className="IT-cta-btn" type="button" onClick={() => navigate("/contact")}>
              Find My Hiring Solution
            </button>
          </div>
        </div>
      </section>

      {/* BENEFITS (same as sample reveal pattern) */}
      <section className="IT-benefits-section">
        <div className="IT-benefits-wrap" ref={benefitsRef}>
          <div className={`benefits-left ${benefitsInView ? "in" : ""}`}>
            <h2>Why teams use a technical recruiter</h2>
            <div className="benefits-underline" />
            <p>
              Reduce hiring risk and speed up delivery by bringing consistent screening, cleaner shortlists, and an
              organized process that keeps candidates moving.
            </p>
          </div>

          <div className={`benefits-right ${benefitsInView ? "in" : ""}`}>
            <div className="benefit-block">
              <h3>Faster hiring cycles</h3>
              <p>Reduce time spent on unqualified profiles and improve interview efficiency.</p>
            </div>

            <div className="benefit-block">
              <h3>Better role-fit</h3>
              <p>Structured screening helps match skills, seniority, and team environment.</p>
            </div>

            <div className="benefit-block">
              <h3>Less workload on managers</h3>
              <p>Recruiting ops, coordination, and shortlisting handled end-to-end.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TechnicalRecruiter;
