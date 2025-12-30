import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./styles/ITManagedSupportServices.css";

const ITManagedSupportServices = () => {
      const navigate = useNavigate();

    const tabs = useMemo(
        () => [
            {
                key: "bdr",
                label: "HELPDESK SUPPORT",
                title: "Helpdesk Support",
                desc:
                    "Our 24/7 helpdesk delivers on-demand IT support whenever you need it. We resolve issues fast so your team can stay productive and focused on the business.",
                cta: "Learn More",
                image:
                    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
            },
            {
                key: "migration",
                label: "ENDPOINT MANAGEMENT",
                title: "Endpoint Management",
                desc:
                    "We manage, update, and secure your essential endpoints like desktops and laptops so your business stays protected, consistent, and running smoothly.",
                cta: "Learn More",
                image:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
            },
            {
                key: "support",
                label: "MOBILE DEVICE MANAGEMENT",
                title: "Mobile Device Management",
                desc:
                    "ALG Data Guard facilitates the management of your mobile devices, allowing your hybrid, remote, or BYOD model to operate seamlessly. We’ll help you manage applications, improve security, and more to help you meet your business goals.",
                cta: "Learn More",
                image:
                    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80",
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
            <span>IT MANAGED SUPPORT</span>
          </div>

          <h1 className="hc-hero__title" >
            Always-on IT support, <br />
            zero downtime.
          </h1>

          <p className="hc-hero__lead" >
            Get proactive, fully managed IT support with 24/7 monitoring, fast helpdesk response, endpoint management, and security-first maintenance to keep your team productive and your systems running smoothly.
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
                            alt="IT support services"
                        />
                    </div>
                </div>

            </section>

            {/* SERVICES SECTION (your existing section, text rewritten) */}
            <section className="services-section">
                <div className="services-left">
                    <h2>Enhance Your Business Operations With a Trusted IT Support Partner</h2>
                    <p>
                        Running a modern IT environment can feel overwhelming—especially as technology becomes more complex.
                        From managing multiple devices to resolving day-to-day technical issues, you need dependable IT support
                        that streamlines operations and gives your team more time to focus on what matters most: your business.
                    </p>
                    <p>
                        Backed by years of experience delivering fully managed IT services, ALG Data Guard helps keep your organization secure,
                        connected, and productive. With a dedicated team and tailored managed support, you get guidance for long-term growth,
                        smoother collaboration across teams, and stronger protection for your critical data—so your business keeps moving forward.
                    </p>
                </div>

                <div className="services-right">
                    <div className="service-item">
                        <div className="service-icon-IT">{">"}</div>
                        <div>
                            <h3>Guide</h3>
                            <p>
                                We act as your trusted partner, delivering value-driven IT solutions tailored to your business.
                                Our team takes time to understand your goals and challenges so you can make smarter decisions
                                and strengthen your IT infrastructure.
                            </p>
                        </div>
                    </div>

                    <div className="service-item">
                        <div className="service-icon-IT">{">"}</div>
                        <div>
                            <h3>Connect</h3>
                            <p>
                                ALG Data Guard provides smooth, reliable connectivity across your devices so your team can collaborate without friction.
                                We help close communication gaps and support more efficient teamwork across the organization.
                            </p>
                        </div>
                    </div>

                    <div className="service-item">
                        <div className="service-icon-IT">{">"}</div>
                        <div>
                            <h3>Protect</h3>
                            <p>
                                We put your security first by implementing strong safeguards such as data backup and disaster recovery,
                                along with proactive network monitoring. This helps keep your critical information secure and gives you
                                confidence as your business grows.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW: MANAGED IT SERVICES TABS SECTION */}
            <section className="managed-IT-section">
                <div className="managed-IT-header">
                    <h2>Complete IT Support for Your Business</h2>
                    <p>
                        ALG Data Guard delivers comprehensive technical IT support and customer
                        service to keep your operations running smoothly and safely.
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

                <div className="managed-IT-body tab-enter" key={activeTab.key}>
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
                            <button className="managed-cta" type="button" onClick={() => navigate("/contact")}>
                                {activeTab.cta}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/* SECTION 4: CTA BANNER */}
            <section className="IT-cta-section">
                <div
                    ref={ctaRef}
                    className={`IT-cta-card IT-cta-reveal ${ctaInView ? "in" : ""}`}
                >
                    <div className="IT-cta-left">
                        <img
                            className="IT-cta-illustration"
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
                            alt="Support illustration"
                        />
                    </div>

                    <div className="IT-cta-right">
                        <h2>
                            Elevate Your Business <br />
                            With Robust <br />
                            <span>IT Managed Support Services</span>
                        </h2>

                        <p>
                            From resolving day-to-day issues to improving and securing your endpoints,
                            ALG Data Guard delivers managed IT support that helps your environment perform at its best.
                            Contact us today to start building a smoother, more scalable IT foundation.
                        </p>

                        <button className="IT-cta-btn" type="button" onClick={() => navigate("/contact")}>
                            Find My Support Solution
                        </button>
                    </div>
                </div>
            </section>
            {/* SECTION 5: IT benefits (scroll reveal) */}
            <section className="IT-benefits-section">
                <div className="IT-benefits-wrap" ref={benefitsRef}>
                    <div className={`benefits-left ${benefitsInView ? "in" : ""}`}>
                        <h2>Get High-Quality Outsourced IT Support You Can Rely On</h2>
                        <div className="benefits-underline" />
                        <p>
                            We deliver expert outsourced IT support for businesses across North America.
                            With teams based in Edmonton and additional locations in Toronto and Vancouver,
                            we help both growing companies and established organizations run more efficiently.
                            Through remote and onsite managed support, we provide the resources you need—wherever you operate.
                        </p>
                    </div>
                </div>
            </section>


        </>
    );
};

export default ITManagedSupportServices;