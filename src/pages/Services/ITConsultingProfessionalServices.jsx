import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ManagedServices.css";

import cardIcon1 from "../../assets/images/services/ITConsultingProfessionalServices/card1.png";
import cardIcon2 from "../../assets/images/services/ITConsultingProfessionalServices/card2.png";
import cardIcon3 from "../../assets/images/services/ITConsultingProfessionalServices/card3.png";

const ITConsultingProfessionalServices = () => {
  const navigate = useNavigate();

  const whyRef = useRef(null);
  const [whyInView, setWhyInView] = useState(false);

  const whyCardRefs = useRef([]);

  useEffect(() => {
    const el = whyRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWhyInView(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const whyCards = [
    {
      iconImg: cardIcon1,
      iconAlt: "Strategic consulting",
      text:
        "Align technology decisions with business goals through practical guidance, clear priorities, and long-term planning.",
    },
    {
      iconImg: cardIcon2,
      iconAlt: "Business strategy",
      text:
        "Strengthen decision-making with consulting support that connects systems, operations, and growth objectives.",
    },
    {
      iconImg: cardIcon3,
      iconAlt: "Cloud and transformation",
      text:
        "Modernize your environment with cloud, security, and transformation planning built around your needs.",
    },
  ];

  const workCards = [
    {
      title: "Cybersecurity Consulting",
      text:
        "Improve risk visibility, strengthen protections, and build a more resilient security posture across your environment.",
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
      alt: "Cybersecurity consulting",
    },
    {
      title: "Infrastructure Consulting",
      text:
        "Plan better infrastructure decisions with support for architecture, systems, and operational reliability.",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
      alt: "Infrastructure consulting",
    },
  ];

  const suiteCards = [
    { title: "Strategic IT Consulting", 
      text: "Plan, implement, and manage IT projects with expert guidance and smart procurement. Simplify your environment and support long-term success.",
    to: "/services/Strategic-IT-Consulting" },
    {
      title: "Business Strategy",
      text:
        "Strategic IT consulting to align technology with your business goals and drive digital transformation.",
      to: "/services/Business-Strategy",
    },
    {
      title: "Cloud Consulting",
      text:
        "Evaluate cloud options, migration paths, and platform direction based on your current environment and future needs.",
      to: "/services/Cloud-Consulting",
    },
    {
      title: "Cybersecurity Consulting",
      text:
        "Protect systems, reduce risk, and strengthen your security posture.",
      to: "/services/Cybersecurity-Consulting",
    },
    {
      title: "Infrastructure Consulting",
      text:
        "Build infrastructure that is easier to run, scale, and recover.",
      to: "/services/Infrastructure-Consulting",
    },
    {
      title: "Digital Transformation",
      text:
        "Modernize the way your business works, delivers, and grows.",
      to: "/services/Digital-Transformation",
    },
    {
      title: "Implementation Services",
      text:
        "Deliver new systems with less risk and more control.",
      to: "/services/Implementation-Services",
    },
  ];

  return (
    <>
      <section className="hero-section ms-hero">
        <div className="hero-left ms-heroLeft">
          <h1 className="ms-title">
            IT Consulting &amp; <br />
            Professional Services
          </h1>

          <p className="ms-lead">
            Build a reliable direction for your technology, operations, and growth with consulting support that simplifies decisions and improves execution.
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

        <div className="hero-right ms-heroRight">
          <div className="hero-image-container ms-imageContainer">
            <div className="ms-circleBg" />
            <div className="ms-accentLine ms-accentLine--a" />
            <div className="ms-accentLine ms-accentLine--b" />
            <div className="ms-dot ms-dot--a" />
            <div className="ms-dot ms-dot--b" />

            <img
              className="ms-heroImg"
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
              alt="IT consulting services"
            />
          </div>
        </div>
      </section>

      <section className="ms-why" ref={whyRef}>
        <div className="ms-why__container">
          <div className="ms-why__heading">
            <h2 className="ms-why__title">Why IT Consulting Matters</h2>
            <p className="ms-why__sub">
              Strong guidance helps you avoid guesswork and move forward with a clearer plan.
            </p>
          </div>

          <div className="ms-why__grid">
            {whyCards.map((c, idx) => (
              <article
                key={idx}
                ref={(node) => (whyCardRefs.current[idx] = node)}
                className={[
                  "ms-whyCard",
                  idx === 0 ? "from-left" : "",
                  idx === 2 ? "from-right" : "",
                  whyInView ? "in" : "",
                ].join(" ")}
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

      <section className="ms-work">
        <div className="ms-work__container">
          <header className="ms-work__head">
            <h2 className="ms-work__title">How We Support Your Business</h2>
            <p className="ms-work__sub">
              We help you evaluate priorities, align teams, and move forward with confidence.
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

      <section className="ms-suite">
        <div className="ms-suite__container">
          <header className="ms-suite__head">
            <h2 className="ms-suite__title">Explore Our Consulting Services</h2>
            <p className="ms-suite__sub">
              From strategy to execution, choose the consulting support that fits your goals.
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

      <section className="ms-greenCta">
        <div className="ms-greenCta__container">
          <div className="ms-greenCta__card">
            <div className="ms-greenCta__left">
              <h2 className="ms-greenCta__title">
                Let’s Talk About Your <br />
                IT Needs Today
              </h2>

              <p className="ms-greenCta__text">
                Connect with ALG Data Guard and get a consulting plan tailored to your environment.
                Get clear next steps for strategy, implementation, and long-term improvement.
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
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80"
                alt="Consultation"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ITConsultingProfessionalServices;