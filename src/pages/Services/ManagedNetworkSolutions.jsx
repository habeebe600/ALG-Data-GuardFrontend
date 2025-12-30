import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./styles/ManagedNetworkSolutions.css";

const ManagedNetworkSolutions = () => {
  const navigate = useNavigate();

    const items = useMemo(
        () => [
            {
                icon: "📄", // replace with SVG/icon if you want
                title: "Network Assessments",
                desc:
                    "We take a deep dive into your network performance, identifying performance issues, dead spots, and other network problems that may hinder your ability to work effectively. We’ll help you resolve them so you can get back to what matters most.",
            },
            {
                icon: "☁️", // cloud icon placeholder
                title: "Cisco Meraki Support",
                desc:
                    "We enable your business with powerful Cisco Meraki tools that simplify the management of your network devices. Through centralized control, you can improve network performance management and your business’s growth potential.",
            },
            {
                icon: "🔍", // search icon placeholder
                title: "24/7 Network Monitoring",
                desc:
                    "Network issues don’t occur within a set timetable. That’s why we monitor your network performance metrics at all hours and address frustrating issues like poor data flow, outages, or packet loss before they can disrupt your day-to-day operations.",
            },
        ],
        []
    );

    const mnRef = useRef(null); // cards section
    const cardRefs = useRef([]);

    const npRef = useRef(null); // 3-column text section

    const [mnInView, setMnInView] = useState(false);
    const [npInView, setNpInView] = useState(false);

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


    useEffect(() => {
        const targets = [
            { el: mnRef.current, set: setMnInView },
            { el: npRef.current, set: setNpInView },
        ].filter(t => t.el);

        if (!targets.length) return;

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const target = targets.find(t => t.el === entry.target);
                    if (target) {
                        target.set(true);
                        obs.unobserve(entry.target); // animate once
                    }
                });
            },
            { threshold: 0.2 }
        );

        targets.forEach(t => obs.observe(t.el));
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

    const cyberCardRef = useRef(null);
    const [cyberCardIn, setCyberCardIn] = useState(false);

    useEffect(() => {
        const el = cyberCardRef.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCyberCardIn(true);
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
            <span>NETWORK SOLUTIONS</span>
          </div>

          <h1 className="hc-hero__title" >
            Secure networks for always-on <br />
             performance.
          </h1>

          <p className="hc-hero__lead" >
            Strengthen your organization with scalable Network Solutions that deliver always-on connectivity, proactive monitoring, and resilient performance across locations, devices, and cloud environments so downtime drops and productivity stays high.
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
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80"
                            alt="Network Solutions"
                        />
                    </div>
                </div>

            </section>

            {/* NETWORK PERFORMANCE SECTION */}
            <section ref={npRef} className={`np-wrap ${npInView ? "in" : ""}`}>
                <div className="np-container">
                    <header className="np-header">
                        <h2 className="np-title">
                            Simplify Network Performance Management With ALG Data Guard
                        </h2>
                        <p className="np-sub">
                            ALG Data Guard makes IT and network performance management as simple as possible
                            for you, providing the resources you need to focus on your business growth.
                        </p>
                    </header>

                    <div className="np-grid">
                        <article className="np-block">
                            <h3 className="np-h3">Your One–Stop Shop for Everything IT</h3>
                            <p className="np-p">
                                We’re proud to be a single-source provider of everything your business needs to
                                maintain a <span className="np-accent">healthy IT environment</span>. Whether you’re
                                looking to improve application performance, <span className="np-accent">eliminate
                                    unsecured network devices</span>, or <span className="np-accent">move to the cloud</span>,
                                we have you covered.
                            </p>
                        </article>

                        <article className="np-block">
                            <h3 className="np-h3">Managed Network Solutions Nationwide</h3>
                            <p className="np-p">
                                With office in {" "}
                                <span className="np-accent">Toronto</span>, we provide managed network solutions to
                                businesses throughout North America. Whether you need{" "}
                                <span className="np-accent">remote or onsite support</span>, we’ll be there to ensure
                                your network performance is conducive to your success.
                            </p>
                        </article>

                        <article className="np-block">
                            <h3 className="np-h3">We Live By Our Core Values</h3>
                            <p className="np-p">
                                <span className="np-accent">Guide. Connect. Protect.</span> That’s our motto, and it
                                means we take the time to provide strategic IT solutions that connect and protect
                                your entire business. Our goal is to build a long-lasting partnership that helps
                                your business grow with effortless scalability.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* MANAGED NETWORK CARDS SECTION */}
            <section ref={mnRef} className={`mn-wrap ${mnInView ? "in" : ""}`}>
                <div className="mn-container">
                    <header className="mn-header">
                        <h2 className="mn-title">
                            Find a Managed Network Solution for Your Unique Business
                        </h2>
                        <p className="mn-sub">
                            At ALG Data Guard, we know that every business faces a unique set of IT challenges.
                            We’re committed to providing customized managed network solutions that improve
                            your connectivity and help you do business better.
                        </p>
                    </header>

                    <div className="mn-grid">
                        {items.map((it, idx) => (
                            <article
                                className="mn-card mn-reveal"
                                key={it.title}
                                ref={(el) => (cardRefs.current[idx] = el)}
                                style={{ transitionDelay: `${idx * 160}ms` }} // controls 1-by-1 timing
                            >                                <div className="mn-iconWrap" aria-hidden="true">
                                    <span className="mn-icon">{it.icon}</span>
                                </div>

                                <h3 className="mn-cardTitle">{it.title}</h3>
                                <p className="mn-cardText">{it.desc}</p>

                                <button className="mn-btn" type="button" onClick={() => navigate("/contact")}>
                                    Learn More
                                </button>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA BANNER */}
            <section className="network-cta-section">
                <div
                    ref={ctaRef}
                    className={`network-cta-card cta-reveal ${ctaInView ? "in" : ""}`}
                >                    <div className="network-cta-left">
                        <img
                            className="network-cta-illustration"
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
                            alt="Support illustration"
                        />
                    </div>

                    <div className="network-cta-right">
                        <h2 className="network-h2">
                            Empower Your Business With Managed Network Solutions
                        </h2>

                        <p>
                            Unlock stronger performance and reliability with ALG Data Guard’s managed network solutions.
                            Reach out today to explore how our specialized IT support can help your business grow with confidence.
                        </p>

                        <button className="network-cta-btn" type="button" onClick={() => navigate("/contact")}>
                            Find My Network Solution
                        </button>
                    </div>
                </div>
            </section>

            {/* Cyber card */}
            <section className="cysec-wrap">
  <div className="cysec-container">
    <article
      ref={cyberCardRef}
      className={`cysec-card ${cyberCardIn ? "in" : ""}`}
    >
      <div className="cysec-iconWrap" aria-hidden="true">
        {/* simple lock icon (SVG) */}
        <svg className="cysec-icon" viewBox="0 0 24 24" fill="none">
          <path
            d="M7.5 10V8.2C7.5 5.9 9.4 4 11.7 4h.6C14.6 4 16.5 5.9 16.5 8.2V10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6.5 10h11c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1h-11c-.6 0-1-.4-1-1v-8c0-.6.4-1 1-1Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M12 14v3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h3 className="cysec-title">Explore Our Cybersecurity Solutions</h3>

      <p className="cysec-text">
        ALG Data Guard delivers a robust suite of security services to protect business‑critical data.
        From <span className="cysec-accent">multi‑layered prevention</span> and{" "}
        <span className="cysec-accent">incident response</span> to{" "}
        <span className="cysec-accent">audits</span> and{" "}
        <span className="cysec-accent">compliance consulting</span>, everything needed to reduce risk
        and stay ahead of threats is covered.
      </p>

<button
  className="cysec-btn"
  type="button"
  onClick={() => navigate("/services/Cybersecurity-Services")}
> 
        <span className="cysec-btn-text">Find My Security Solution</span>
        <span className="cysec-btn-arrow" aria-hidden="true">›</span>

      </button>
      
    </article>
  </div>
</section>

        </>
    );
};

export default ManagedNetworkSolutions;
