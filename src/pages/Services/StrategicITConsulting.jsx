import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./styles/StrategicITConsulting.css";
import HeroBg from "../../assets/images/services/STRATEGIC-IT-CONSULTING-Hero.png"

const StrategicITConsulting = () => {
  const navigate = useNavigate();

  const cards = useMemo(
    () => [
      {
        title: "IT Advisory",
        desc:
          "Align your IT roadmap, optimize resources, and move your business forward with expert strategic guidance.",
      },
      {
        title: "Project Implementation",
        desc:
          "Deploy new technology smoothly and execute projects with confidence to support long-term continuity.",
      },
      {
        title: "License Management",
        desc:
          "Reduce waste and increase ROI with audits, cost optimization, and expert support across your software licenses.",
      },
      {
        title: "Procurement Consulting",
        desc:
          "Choose the right tools at the right cost with procurement support that simplifies sourcing and strengthens IT decisions.",
      },
    ],
    []
  );

  // observe each card (one-by-one)
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
      { threshold: 0.25 }
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
            {/* HERO SECTION */}
            <section className="hero-section">
          <div className="hero-left">
          <div className="dd-serviceLabel">
            <span>STRATEGIC IT CONSULTING</span>
          </div>

          <h1 className="hc-hero__title" >
            Future-ready IT strategy, <br />
            built for growth.
          </h1>

          <p className="hc-hero__lead" >
            ALG Data Guard helps align your technology roadmap with business priorities by evaluating your current environment, 
            identifying risks and opportunities, and guiding the right investments, architecture choices, and 
            implementation plan so IT supports long-term growth efficiently.
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
                            alt="Network Solutions"
                        />
                    </div>
                </div>

            </section>

            {/* NETWORK PERFORMANCE SECTION */}
            <section classname="sc-wrap">
                <div className="sc-container">
                    <header className="sc-header">
                        <h2 className="sc-title">
                            Simplify Your IT Environment With a Strategic Technology Plan
                        </h2>
                        <p className="sc-sub">
                            As technology continues to evolve at a rapid pace, your IT ecosystem becomes increasingly complex and messy. 
                            This can make it challenging to make informed decisions and can even cause your technology investments to 
                            become unaligned with your overall business objectives. Fortunately, ALG Data Guard is here to simplify 
                            things for you. With decades of experience under our belts, we deliver strategic IT consulting solutions 
                            to help you create an actionable plan that adds value to your business and drives ongoing success.
                        </p>
                    </header>

                    <div className="sc-grid">
                        <article className="sc-block">
                            <h3 className="sc-h3">On-Demand Fractional CTO Solutions</h3>
                            <p className="sc-p">
                                As part of our <span className="sc-accent">fully managed IT services</span>, we provide on-demand fractional 
                                CTO solutions that allow you to make high-level IT decisions with confidence. Gone are the days of confusion 
                                and messy infrastructure—our fractional CTOs leverage deep industry knowledge and expertise to provide strategic 
                                insights and recommendations that align your technology investments with your business goals.
                            </p>
                        </article>

                        <article className="sc-block">
                            <h3 className="sc-h3">Ongoing IT Strategic Planning</h3>
                            <p className="sc-p">
                                We understand the importance of continuous strategic IT planning. That’s why we provide 
                                regular Quarterly Business Reviews and in-person meetings to ensure you stay on track with 
                                your strategic technology plan. By regularly assessing your technology needs, such as 
                                your <span className="sc-accent">cybersecurity</span> requirements 
                                or <span className="sc-accent">backup and disaster recovery plan</span>, we help you stay ahead 
                                of the curve and maximize your ROI.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Explore strategy cards */}
            <section className="st-wrap">
      <div className="st-container">
        <header className="st-header">
          <h2 className="st-title">
            Explore Our Full Range of Strategic IT Consulting Services
          </h2>

          <p className="st-sub">
            At ALG Data Guard, people come first in every engagement. Technology 
            should empower teams—not complicate their work—so we take time to understand 
            your goals, challenges, and user needs. With that insight, we deliver 
            tailored solutions that boost productivity, simplify operations, and improve 
            user experiences, ensuring your technology supports your vision.
          </p>
        </header>

        <div className="st-grid">
          {cards.map((c, idx) => (
            <article
              key={c.title}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="st-card"
              style={{ transitionDelay: `${idx * 140}ms` }} // stagger
            >
              <h3 className="st-cardTitle">{c.title}</h3>
              <p className="st-cardText">{c.desc}</p>
              <button className="st-btn" type="button"
              onClick={() => navigate("/contact")}>
                Learn More
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>

            {/* CTA BANNER */}
            <section className="sc-cta-section">
                <div
                    ref={ctaRef}
                    className={`sc-cta-card cta-reveal ${ctaInView ? "in" : ""}`}
                >                    <div className="sc-cta-left">
                        <img
                            className="sc-cta-illustration"
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
                            alt="Strategic IT illustration"
                        />
                    </div>

                    <div className="sc-cta-right">
                        <h2 className="sc-h2">
                            Speak to an Expert About IT Strategic Planning Today
                        </h2>

                        <p>
                            Ready to take your IT strategy to the next level? Contact Keeran Networks today and let our experienced
                             team guide you toward a technology roadmap that aligns with your business objectives.
                        </p>

                        <button className="sc-cta-btn" type="button"
                        onClick={() => navigate("/contact")}>
                            Connect With Our Experts
                        </button>
                    </div>
                </div>
            </section>
            {/* SECTION 5: IT benefits (scroll reveal) */}
            <section className="IT-benefits-section">
                <div className="IT-benefits-wrap" ref={benefitsRef}>
                    <div className={`benefits-left ${benefitsInView ? "in" : ""}`}>
                        <h2>Let’s Discuss Your Next Strategic Technology Plan</h2>
                        <div className="benefits-underline" />
                        <p>
                           Connect With ALG Data Guard and let our experts design a cutting-edge IT 
                           solution tailored to your business. We’re here to help you navigate the 
                           ever-changing technology landscape.
                        </p>
                    </div>
                </div>
            </section>

        </>
    );
};

export default StrategicITConsulting;
