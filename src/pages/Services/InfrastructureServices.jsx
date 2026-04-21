import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ManagedServices.css";

// Reuse your existing icon images (replace with your real infra icons if you have)
import cardIcon1 from "../../assets/images/services/infrastructure-services/card1.png";
import cardIcon2 from "../../assets/images/services/infrastructure-services/card2.png";
import cardIcon3 from "../../assets/images/services/infrastructure-services/card3.png";
import ongoingimg from "../../assets/images/services/infra services ongoing.jpg"

const InfrastructureServices = () => {
  const navigate = useNavigate();

  // Same reveal animation pattern as ManagedServices
  const whyRefs = useRef([]);
  useEffect(() => {
    const els = whyRefs.current.filter(Boolean);
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

  const whyCards = [
    {
      iconImg: cardIcon1,
      iconAlt: "Infrastructure planning",
      text:
        "Build an infrastructure foundation that supports growth designed for performance, reliability, and long term scalability.",
    },
    {
      iconImg: cardIcon2,
      iconAlt: "Proactive monitoring",
      text:
        "Reduce outages with proactive monitoring, preventative maintenance, and rapid response when issues appear.",
    },
    {
      iconImg: cardIcon3,
      iconAlt: "Security and resilience",
      text:
        "Improve resilience with stronger network design, segmentation, and backup minded planning across your environment.",
    },
  ];

  const workCards = [
    {
      title: "Project Based Infrastructure",
      text:
        "Ideal for upgrades, refreshes, migrations, and deployments delivered with clear timelines, milestones, and documentation.",
      img:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
      alt: "Project based infrastructure work",
    },
    {
      title: "Ongoing Infrastructure Support",
      text:
        "Continuous monitoring and operational support to keep networks, servers, and connectivity stable as your business evolves.",
      img:
        ongoingimg,
      alt: "Ongoing infrastructure support",
    },
  ];

  const suiteCards = [
    {
      title: "Design & Deployment",
      text:
        "Plan and deploy infrastructure upgrades with minimal disruption switches, Wi‑Fi, routing, and core network services.",
      to: "/services/design and deployment",
    },
    {
      title: "Configuration Services Deployment",
      text:
          "Deploy new technology confidently with consistent configuration, security first policies, and rollout support. Reduce setup time, prevent misconfigurations, and deliver a smoother experience for end users.",
      to: "/services/Configuration Services Deployment",
    },
    {
      title: "Network Audit",
      text:
          "Comprehensive security and performance audits for your network infrastructure to ensure optimal operation",
      to: "/services/Network Audit",
    },
    {
      title: "Network Solutions",
      text:
          "Enjoy 24/7 network monitoring and routine assessments to identify and fix issues early. Keep your devices secure and running seamlessly.",
      to: "/services/Managed-Network-Solutions",
    },
    {
      title: "Data Center Colocation",
      text:
          "Colocation strategy that fits your uptime, performance, and growth goals",
      to: "/services/Data-Center-Colocation-services",
    },
    {
      title: "Help finding Ideal Colocation",
      text:
          "Expert guidance in selecting the perfect colocation facility for your infrastructure and business requirements",
      to: "/services/Help-finding-Ideal-Colocation",
    },
  ];

  return (
    <>
      {/* HERO (same layout, new copy) */}
      <section className="hero-section ms-hero">
        <div className="hero-left ms-heroLeft">
          <h1 className="ms-title">
            Infrastructure <br /> Services
          </h1>

          <p className="ms-lead">
            Build a reliable IT foundation with network design, deployment, audits, and infrastructure support
            that reduces downtime and scales with your business.
          </p>

          <div className="ms-ctaRow">
            <button className="ms-primaryBtn" type="button" onClick={() => navigate("/contact")}>
              Get in Touch
            </button>
            <button className="ms-ghostBtn" type="button" onClick={() => navigate("/services")}>
              Explore Services
            </button>
          </div>

        </div>

        <div className="hero-right">
          <div className="ms-imageContainer">
            <div className="ms-circleBg" />
            <div className="ms-accentLine ms-accentLine--a" />
            <div className="ms-accentLine ms-accentLine--b" />
            <div className="ms-dot ms-dot--a" />
            <div className="ms-dot ms-dot--b" />
            <img
              className="ms-heroImg"
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80"
              alt="Infrastructure services"
            />
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="ms-why">
        <div className="ms-why__container">
          <h2 className="ms-why__title">Why Infrastructure Matters</h2>
          <p className="ms-why__sub">Strong networks and systems reduce downtime and unlock better performance.</p>

          <div className="ms-why__grid">
            {whyCards.map((c, idx) => (
              <article
                key={idx}
                ref={(el) => (whyRefs.current[idx] = el)}
                className={`ms-whyCard ${idx === 0 ? "from-left" : idx === 2 ? "from-right" : ""}`}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="ms-whyCard__iconImgWrap">
                  <img className="ms-whyCard__iconImg" src={c.iconImg} alt={c.iconAlt} />
                </div>
                <p className="ms-whyCard__text">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="ms-work">
        <div className="ms-work__container">
          <header className="ms-work__head">
            <h2 className="ms-work__title">How We Deliver Infrastructure</h2>
            <p className="ms-work__sub">
              Choose a project engagement for upgrades and deployments, or ongoing support to keep infrastructure stable.
            </p>
          </header>

          <div className="ms-work__grid">
            {workCards.map((w) => (
              <article key={w.title} className="ms-workCard">
                <div className="ms-workCard__imgWrap">
                  <img className="ms-workCard__img" src={w.img} alt={w.alt} />
                </div>
                <h3 className="ms-workCard__title">{w.title}</h3>
                <p className="ms-workCard__text">{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SUITE */}
      <section className="ms-suite">
        <div className="ms-suite__container">
          <header className="ms-suite__head">
            <h2 className="ms-suite__title">Explore Our Infrastructure Services</h2>
            <p className="ms-suite__sub">
              From network design to audits and colocation guidance get the building blocks that keep IT reliable.
            </p>
          </header>

          <div className="ms-suite__grid">
            {suiteCards.map((card) => (
              <article key={card.title} className="ms-suiteCard">
                <h3 className="ms-suiteCard__title">{card.title}</h3>
                <p className="ms-suiteCard__text">{card.text}</p>
                <button
                  className="ms-suiteCard__btn"
                  type="button"
                  onClick={() => navigate(card.to)}
                >
                  Learn More
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ms-greenCta">
        <div className="ms-greenCta__container">
          <div className="ms-greenCta__card">
            <div className="ms-greenCta__left">
              <h2 className="ms-greenCta__title">
                Let’s Upgrade Your <br /> Infrastructure
              </h2>

              <p className="ms-greenCta__text">
                Get expert guidance on design, deployment, and ongoing operations so your infrastructure stays fast,
                secure, and resilient.
              </p>

              <div className="ms-greenCta__buttons">
                <button className="ms-greenCta__btnPrimary" type="button" onClick={() => navigate("/contact")}>
                  Get In Touch
                </button>
                
              </div>
            </div>

            <div className="ms-greenCta__right">
              <img
                className="ms-greenCta__img"
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
                alt="Talk to an expert"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfrastructureServices;
