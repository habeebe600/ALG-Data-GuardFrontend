import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/cloudSolutionsPage.css";
import HeroBg from "../../assets/images/services/CoudITSolutions/CloutITSolutionsHero.png"
import BackupandDisaster from "../../assets/images/services/CoudITSolutions/BackupandDisaster.png"

const CloudSolutionsPage = () => {
    const navigate = useNavigate();

  const tabs = useMemo(
    () => [
      {
        key: "bdr",
        label: "BACKUP AND DISASTER RECOVERY",
        title: "Backup and Disaster Recovery",
        desc:
          "Protect business critical data with a resilient backup approach and a recovery plan designed for real-world outages. Whether your workloads run in the cloud or on-premises, reduce the risk of data loss and keep operations moving without the panic when something breaks.",
        cta: "Learn More",
        image:
          BackupandDisaster,
      },
      {
        key: "migration",
        label: "CLOUD MIGRATION CONSULTING",
        title: "Cloud Migration Consulting",
        desc:
          "Move to the cloud with clarity and control. From assessment and planning to execution, get a migration roadmap that minimizes downtime, manages risk, and sets up your apps and data for long-term performance.",
        cta: "Learn More",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
      },
      {
        key: "support",
        label: "CLOUD SUPPORT",
        title: "Cloud Support",
        desc:
          "Keep cloud environments stable, secure, and optimized as your business evolves. Get help with monitoring, maintenance, performance tuning, and ongoing improvements so teams stay productive.",
        cta: "Learn More",
        image:
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80",
      },
      {
        key: "m365",
        label: "MICROSOFT 365 CONSULTING",
        title: "Microsoft 365 Consulting",
        desc:
          "Make Microsoft 365 work the way your teams work. From setup and security to collaboration tooling, get practical guidance that improves adoption and reduces day-to-day friction.",
        cta: "Learn More",
        image:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState(tabs[0]);
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


  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section">
       
          <div className="hero-left">
          <div className="dd-serviceLabel">
            <span>CLOUD IT SOLUTIONS</span>
          </div>

          <h1 className="hc-hero__title" >
            Future ready network for <br />
            high-performance cloud.
          </h1>

          <p className="hc-hero__lead" >
            Build a modern, flexible IT foundation with cloud services designed
            for performance, security, and scale.
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
              alt="Cloud data center"
            />
          </div>
        </div>

      </section>

      {/* SERVICES SECTION (your existing section, text rewritten) */}
      <section className="services-section">
        <div className="services-left">
          <h2>Upgrade Your IT With Cloud Consulting</h2>
          <p>
            Cloud platforms help organizations improve storage, strengthen
            security, and enable better collaboration. With the right approach,
            teams gain faster access, smoother operations, and infrastructure
            that can grow with demand.
          </p>
        </div>

        <div className="services-right">
          <div className="service-item">
            <div className="service-icon-cloud">{">"}</div>
            <div>
              <h3>Guide</h3>
              <p>
                Start with your goals, then map a plan that{" "}
                <span>guides</span> you to the right cloud setup for your
                business.
              </p>
            </div>
          </div>

          <div className="service-item">
            <div className="service-icon-cloud">{">"}</div>
            <div>
              <h3>Connect</h3>
              <p>
                Enable secure access and reliable tools that{" "}
                <span>connect</span> users, apps, and data from anywhere.
              </p>
            </div>
          </div>

          <div className="service-item">
            <div className="service-icon-cloud">{">"}</div>
            <div>
              <h3>Protect</h3>
              <p>
                Use layered controls and best practices that{" "}
                <span>protect</span> sensitive data and critical systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: MANAGED CLOUD SERVICES TABS SECTION */}
      <section className="managed-cloud-section">
        <div className="managed-cloud-header">
          <h2>Explore Our Complete Managed Cloud Services</h2>
          <p>
            Choose the support you need backup, migration, ongoing operations,
            or Microsoft 365 then tailor it to your environment.
          </p>

          <div className="managed-tabs">
            {tabs.map((t) => (
              <button
                key={t.key}
                className={`managed-tab ${activeTab.key === t.key ? "active" : ""}`}
                onClick={() => setActiveTab(t)}
                type="button"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="managed-cloud-body tab-enter" key={activeTab.key}>
          <div className="managed-card">
            <div className="managed-imageWrap">
              <img
                className="managed-image"
                src={activeTab.image}
                alt={activeTab.title}
              />
            </div>

            <div className="managed-content">
              <h3>{activeTab.title}</h3>
              <p>{activeTab.desc}</p>
              <button className="CS-managed-cta" type="button" onClick={() => navigate("/contact")}>
                {activeTab.cta}
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 4: CTA BANNER */}
      <section className="cloud-cta-section">
        <div
          ref={ctaRef}
          className={`cloud-cta-card cloud-cta-reveal ${ctaInView ? "in" : ""}`}
        >
          <div className="cloud-cta-left">
            <img
              className="cloud-cta-illustration"
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
              alt="Support illustration"
            />
          </div>

          <div className="cloud-cta-right">
            <h2>
              Discover Your Cloud <br />
              Business Solution With <br />
              <span>ALG Data Guard</span>
            </h2>

            <p>
              Upgrade day-to-day operations with a cloud solution tailored to your
              goals. Reach out to plan a practical cloud strategy that fits your
              team, apps, and budget.
            </p>

            <button className="cloud-cta-btn" type="button" onClick={() => navigate("/contact")}>
              Find My Cloud Solution
            </button>
          </div>
        </div>
      </section>
      {/* SECTION 5: Cloud benefits (scroll reveal) */}
      <section className="cloud-benefits-section">
        <div className="cloud-benefits-wrap" ref={benefitsRef}>
          <div className={`benefits-left ${benefitsInView ? "in" : ""}`}>
            <h2>Our Cloud IT Solutions Keep Your Business Moving Forward</h2>
            <div className="benefits-underline" />
            <p>
              Strong cloud operations depend on visibility, fast support, and the right
              controls. These services help reduce downtime, improve response times,
              and keep your environment aligned with your business requirements.
            </p>
          </div>

          <div className={`benefits-right ${benefitsInView ? "in" : ""}`}>
            <div className="benefit-block">
              <h3>Proactive Network Monitoring</h3>
              <p>Continuous monitoring helps identify issues early and reduce outages.</p>
            </div>

            <div className="benefit-block">
              <h3>Anytime Help Desk Support</h3>
              <p>Get 24/7 help for troubleshooting, guidance, and software issues.</p>
            </div>

            <div className="benefit-block">
              <h3>Data Sovereignty and Compliance</h3>
              <p>Support governance and compliance needs with the right controls.</p>
            </div>
          </div>
        </div>
      </section>


    </>
  );
};

export default CloudSolutionsPage;
