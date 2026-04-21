import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ManagedServices.css";

import cardIcon1 from "../../assets/images/services/Talent services/card1.png";
import cardIcon2 from "../../assets/images/services/Talent services/card2.png";
import cardIcon3 from "../../assets/images/services/Talent services/card3.png";

const TalentServices = () => {
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
      iconAlt: "Talent sourcing",
      text:
        "Connecting businesses with top talent to build strong, skilled, and future-ready teams.",
    },
    {
      iconImg: cardIcon2,
      iconAlt: "Hiring support",
      text:
        "Streamline your hiring process with support that helps you identify, evaluate, and place the right candidates faster.",
    },
    {
      iconImg: cardIcon3,
      iconAlt: "Future ready teams",
      text:
        "Build reliable teams with the skills, structure, and support needed to grow with your business.",
    },
  ];

  const workCards = [
    {
      title: "Permanent Hiring",
      text:
        "Find long-term team members who fit your culture, goals, and technical needs with a structured hiring process.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
      alt: "Permanent hiring",
    },
    {
      title: "Contract Staffing",
      text:
        "Fill urgent or project-based needs with flexible staffing support that keeps work moving without delay.",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
      alt: "Contract staffing",
    },
  ];

  const suiteCards = [
    {
      title: "Technical Recruiters",
      text:
        "Work with recruiters who understand technology roles and can identify candidates with the right skills and experience.",
      to: "/services/Technical-Recruiters",
    },
    
  ];

  return (
    <>
      <section className="hero-section ms-hero">
        <div className="hero-left ms-heroLeft">
          <h1 className="ms-title">
            Talent Services <br />
            That Build Strong Teams
          </h1>

          <p className="ms-lead">
            Connecting businesses with top talent to build strong, skilled, and future-ready teams.
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
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
              alt="Talent services"
            />
          </div>
        </div>
      </section>

      <section className="ms-why" ref={whyRef}>
        <div className="ms-why__container">
          <div className="ms-why__heading">
            <h2 className="ms-why__title">Why Talent Services Matter</h2>
            <p className="ms-why__sub">
              The right people help your business move faster, adapt better, and grow with confidence.
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
            <h2 className="ms-work__title">How We Support Hiring</h2>
            <p className="ms-work__sub">
              Whether you need a single hire or ongoing staffing support, we help you find the right people for the job.
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
            <h2 className="ms-suite__title">Explore Our Talent Services</h2>
            <p className="ms-suite__sub">
              From recruiter support to workforce planning, build the hiring structure your business needs.
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
                Let’s Build Your <br />
                Next Great Team
              </h2>

              <p className="ms-greenCta__text">
                Connect with ALG Data Guard and find talent support tailored to your hiring needs.
                Get clear next steps for sourcing, screening, and team growth.
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
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
                alt="Talent consultation"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TalentServices;