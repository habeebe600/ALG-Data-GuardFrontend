import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CloudConsultingPage.css";

export default function CloudConsultingPage() {
      const navigate = useNavigate();

  useEffect(() => {
    const revealEls = document.querySelectorAll(".cc-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const services = [
    {
      title: "Cloud Strategy & Roadmap",
      text: "Define the right cloud direction with clear goals, timelines, risk review, and platform selection aligned to your business priorities.",
    },
    {
      title: "Cloud Readiness Assessment",
      text: "Evaluate applications, infrastructure, dependencies, and compliance requirements before migration begins.",
    },
    {
      title: "Cloud Architecture Design",
      text: "Build secure, scalable cloud architectures for public, private, hybrid, or multi cloud environments.",
    },
    {
      title: "Cloud Migration Planning",
      text: "Create a phased migration plan with workload prioritization, scheduling, backup strategy, and rollback planning.",
    },
    {
      title: "Cloud Migration Execution",
      text: "Move applications, data, and services with minimal downtime and a controlled transition path.",
    },
    {
      title: "Cloud Security & Compliance",
      text: "Strengthen identity, access, encryption, monitoring, and governance to support secure cloud adoption.",
    },
    {
      title: "Cloud Cost Optimization",
      text: "Reduce waste, right size resources, and improve cloud spend visibility without hurting performance.",
    },
    {
      title: "Managed Cloud Support",
      text: "Keep cloud environments healthy with monitoring, optimization, and ongoing operational support.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Assess",
      text: "Review your current environment, business goals, and constraints to define the right cloud approach.",
    },
    {
      step: "02",
      title: "Plan",
      text: "Create a migration roadmap, architecture blueprint, and risk managed execution plan.",
    },
    {
      step: "03",
      title: "Migrate",
      text: "Move workloads in controlled phases with testing, validation, and minimal business disruption.",
    },
    {
      step: "04",
      title: "Optimize",
      text: "Tune performance, security, and cloud spend after migration to maximize long term value.",
    },
  ];

  const faqs = [
    {
      q: "What does cloud consulting include?",
      a: "Cloud consulting usually covers strategy, readiness assessment, architecture, migration planning, implementation, security, cost optimization, and ongoing support.",
    },
    {
      q: "Do you support hybrid and multi cloud setups?",
      a: "Yes. The page is positioned to support public cloud, private cloud, hybrid, and multi cloud environments based on business needs.",
    },
    {
      q: "Can you help with cloud migration security?",
      a: "Yes. Security is part of the consulting flow through access controls, encryption, monitoring, governance, and compliance planning.",
    },
    {
      q: "Do you provide post migration support?",
      a: "Yes. The service includes optimization, monitoring, and managed support after migration is complete.",
    },
  ];

  return (
    <main className="cc-page">
      <section className="cc-hero">
        <div className="cc-container cc-hero__grid">
          <div className="cc-hero__left cc-reveal">
            <div className="cc-breadcrumbRow">
              <span className="cc-serviceLabel">CLOUD CONSULTING</span>
            </div>
            <h1>Cloud strategy, migration, and support built around your business.</h1>
            <p>
              ALG DataGuard helps organizations plan, move, secure, and optimize cloud environments with a clear
              roadmap and hands on execution.
            </p>
            <button className="btn-orange" type="button" onClick={() => navigate("/contact")}>
            <span className="btn-text">Meet Our Experts Today</span>
            <span className="btn-arrow" aria-hidden="true">
              ›
            </span>
          </button>
    
          </div>

          <div className="cc-hero__right cc-reveal">
            <div className="cc-heroCard">
              <div className="cc-heroCard__top">
                <span>Cloud outcomes</span>
                <strong>Secure. Scalable. Cost aware.</strong>
              </div>
              <div className="cc-heroCard__stats">
                <div>
                  <h3>Strategy</h3>
                  <p>Roadmap and platform fit</p>
                </div>
                <div>
                  <h3>Migration</h3>
                  <p>Phased, low risk execution</p>
                </div>
                <div>
                  <h3>Security</h3>
                  <p>Identity, governance, compliance</p>
                </div>
                <div>
                  <h3>Optimization</h3>
                  <p>Performance and cost tuning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cc-intro">
        <div className="cc-container cc-intro__grid">
          <div className="cc-intro__content cc-reveal">
            <h2>What we do</h2>
            <p>
              Cloud consulting is more than moving workloads. It starts with understanding your current environment,
              then building a cloud approach that improves flexibility, security, resilience, and cost efficiency.
            </p>
            <p>
              We help teams move from uncertainty to a practical cloud plan with clear priorities, technical direction,
              and measurable outcomes.
            </p>
          </div>

          <div className="cc-intro__panel cc-reveal">
            <h3>Core focus areas</h3>
            <ul>
              <li>Cloud strategy and roadmap.</li>
              <li>Architecture and landing zone design.</li>
              <li>Migration planning and execution.</li>
              <li>Security, compliance, and governance.</li>
              <li>Monitoring, optimization, and support.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cc-services">
        <div className="cc-container">
          <div className="cc-sectionHead cc-reveal">
            <h2>Cloud consulting services</h2>
            <p>Choose the service mix that fits your cloud journey, from first assessment to long term optimization.</p>
          </div>

          <div className="cc-services__grid">
            {services.map((item) => (
              <article className="cc-card cc-reveal" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cc-process">
        <div className="cc-container">
          <div className="cc-sectionHead cc-reveal">
            <h2>How the engagement works</h2>
            <p>A simple phased approach keeps the project controlled, visible, and low risk.</p>
          </div>

          <div className="cc-process__grid">
            {process.map((item) => (
              <article className="cc-step cc-reveal" key={item.step}>
                <span className="cc-step__index">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cc-cta">
        <div className="cc-container">
          <div className="cc-cta__card cc-reveal">
            <div>
              <h2>Plan your cloud move with confidence.</h2>
              <p>
                Get a roadmap that balances speed, security, compliance, and cost so your cloud transition supports
                real business growth.
              </p>
            </div>
            <button className="cc-primaryBtn">Start cloud consulting</button>
          </div>
        </div>
      </section>

      <section className="cc-faq">
        <div className="cc-container cc-faq__grid">
          <div className="cc-sectionHead cc-reveal">
            <h2>Frequently asked questions</h2>
          </div>

          <div className="cc-faq__list">
            {faqs.map((item) => (
              <details className="cc-faqItem cc-reveal" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}