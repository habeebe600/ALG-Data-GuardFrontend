import React, { useEffect,useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CybersecurityServices.css";

const CybersecurityServices = () => {
    const navigate = useNavigate();
    const cards = [
        {
            title: "Security Audits",
            desc:
                "We assess your network and physical infrastructure, identifying flaws that could be exploited during a cyberattack. From there, we provide an actionable remediation plan.",
        },
        {
            title: "Cyber Attack Prevention",
            desc:
                "By integrating robust safeguards and empowering your team through cybersecurity training, ALG Data Guard helps you bolster your defense and mitigate the threat of data breaches.",
        },
        {
            title: "Incident Response",
            desc:
                "ALG Data Guard helps you develop and implement a strategy that allows you to swiftly and decisively respond to security incidents. This helps you protect sensitive data and mitigate cybersecurity risks.",
        },
        {
            title: "Compliance Consulting",
            desc:
                "Through our deep understanding of cybersecurity compliance requirements, we guide you toward solutions that solidify your defenses and start you on the path to compliance.",
        },
    ];

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
            <span>CYBERSECURITY</span>
          </div>

          <h1 className="hc-hero__title" >
            Secure systems, data, and networks.
          </h1>

          <p className="hc-hero__lead" >
            Safeguard every layer of your organization with comprehensive, managed security services by
ALG Data Guard.
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
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80"
                            alt="Cybersecurity"
                        />
                    </div>
                </div>
            </section>

            {/* Security Consulting SECTION*/}
            <section className="sc-wrap">
                <div className="sc-container">
                    <div className="sc-grid">
                        {/* Row 1 - Left */}
                        <div className="sc-heroLeft">
                            <h1 className="sc-title">
                                A Strategy–First Approach to IT Security Consulting
                            </h1>

                            <p className="sc-text">
                                Every business has its own unique security needs and vulnerabilities.
                                ALG Data Guard takes a strategy-first approach to IT security consulting
                                so you can keep pace with the ever-evolving cybersecurity landscape. As{" "}
                                your trusted provider of
                                managed cybersecurity services, we gain a deep understanding of your
                                operations, systems, and overarching security goals.
                            </p>
                        </div>

                        {/* Row 1 - Right */}
                        <div className="sc-heroRight">
                            <div className="sc-imageCard">
                                <img
                                    className="hero-img"
                                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80"
                                    alt="Cybersecurity"
                                />            </div>
                        </div>

                        {/* Row 2 - Full width (this is the key) */}
                        <div className="sc-below">
                            <h2 className="sc-subtitle">
                                Alleviate IT-Related Stress With Fully Managed Cybersecurity Services
                            </h2>

                            <p className="sc-text sc-textWide">
                                We understand that managing your cybersecurity can be overwhelming and
                                time consuming. That’s why we offer fully managed cybersecurity solutions
                                as part of our complete suite of IT services.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* cards SECTION*/}
            <section className="cs-wrap">
                <div className="cs-container">
                    <div className="cs-grid">
                        {/* Left content */}
                        <div className="cs-left">
                            <h2 className="cs-title">
                                Explore Our <br />
                                Complete Business <br />
                                Cybersecurity <br />
                                Solutions
                            </h2>

                            <p className="cs-lead">
                                We provide a full suite of cybersecurity solutions that help you protect
                                your sensitive information and avoid data breaches. We simplify the process
                                so you can focus on your core business operations.
                            </p>
                        </div>

                        {/* Right cards */}
                        <div className="cs-right">
                            <div className="cs-cards">
                                {cards.map((c, idx) => (
                                    <article
                                        className="cs-card"
                                        key={c.title}
                                        ref={(el) => (cardRefs.current[idx] = el)}
                                        style={{ animationDelay: `${idx * 120}ms` }}
                                    >
                                        <h3 className="cs-cardTitle">{c.title}</h3>
                                        <p className="cs-cardText">{c.desc}</p>
                                        <button className="cs-cardBtn" type="button"
                                            onClick={() => navigate("/contact")}>
                                            Learn More
                                        </button>
                                    </article>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: CTA BANNER */}
            <section className="cyber-cta-section">
                <div
                    ref={ctaRef}
                    className={`cyber-cta-card cta-reveal ${ctaInView ? "in" : ""}`}
                >                    <div className="cyber-cta-left">
                        <img
                            className="cyber-cta-illustration"
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
                            alt="Support illustration"
                        />
                    </div>

                    <div className="cyber-cta-right">
                        <h2 className="cyber-h2">
                            Enhance Your Business Cybersecurity Today
                        </h2>

                        <p>
                            Start building up your business cybersecurity today.
                            Reach out to ALG Data Guard to safeguard your valuable assets,
                            minimize risks, and protect your business.
                        </p>

                        <button className="cyber-cta-btn" type="button"
                            onClick={() => navigate("/contact")}>
                            Find My Cybersecurity Solution
                        </button>
                    </div>
                </div>
            </section>

            {/* SECTION 5: Cloud benefits (scroll reveal) */}
            <section className="cyber-benefits-section">
                <div className="cyber-benefits-wrap" ref={benefitsRef}>
                    <div className={`benefits-left ${benefitsInView ? "in" : ""}`}>
                        <h2>Our Cybersecurity Solutions Keep Your Business Protected and Resilient</h2>
                        <div className="benefits-underline" />
                        <p>
                            Strong security depends on continuous visibility, fast response, and clear controls.
                            Our services help reduce risk, limit downtime, and keep your organization aligned with security
                            and compliance requirements.
                        </p>
                    </div>

                    <div className={`benefits-right ${benefitsInView ? "in" : ""}`}>
                        <div className="benefit-block">
                            <h3>Proactive Threat Monitoring</h3>
                            <p>24/7 monitoring helps detect suspicious activity early and stop threats before they spread.</p>
                        </div>

                        <div className="benefit-block">
                            <h3>Rapid Incident Response Support</h3>
                            <p>Get expert help to contain, investigate, and recover from security incidents with minimal disruption.</p>
                        </div>

                        <div className="benefit-block">
                            <h3>Compliance & Risk Management</h3>
                            <p>Strengthen governance and meet regulatory expectations with the right policies, controls, and reporting.</p>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
};

export default CybersecurityServices;
