import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ImplementationServicesPage.css";

export default function ImplementationServicesPage() {
        const navigate = useNavigate();

  const tabs = useMemo(
    () => [
      {
        key: "planning",
        label: "Deployment Planning",
        title: "Plan the rollout before anything reaches production.",
        desc: "We define scope, timeline, dependencies, ownership, and success criteria so the implementation starts with clarity.",
        items: [
          "Project scope and milestone planning.",
          "Resource and dependency mapping.",
          "Rollout sequencing.",
          "Readiness checklists.",
        ],
      },
      {
        key: "integration",
        label: "System Integration",
        title: "Make connected systems behave like one environment.",
        desc: "We connect platforms, services, and workflows so data and operations move reliably across tools.",
        items: [
          "API and middleware integration.",
          "Third party system coordination.",
          "Workflow alignment.",
          "Integration validation.",
        ],
      },
      {
        key: "migration",
        label: "Data Migration",
        title: "Move data safely and validate it before go live.",
        desc: "We help migrate, reconcile, and verify data so the new system launches with trustworthy information.",
        items: [
          "Data mapping and preparation.",
          "Migration rehearsal and validation.",
          "Reconciliation and cleanup.",
          "Cutover support.",
        ],
      },
      {
        key: "enablement",
        label: "User Enablement",
        title: "Get teams ready to use the new system confidently.",
        desc: "We support training, role based guidance, and knowledge transfer so users can adopt the solution smoothly.",
        items: [
          "Role based training.",
          "Process walkthroughs.",
          "Documentation and handover.",
          "Change communication support.",
        ],
      },
      {
        key: "testing",
        label: "Testing & Validation",
        title: "Prove the solution works before you rely on it.",
        desc: "We run functional, integration, and user acceptance checks to uncover issues before launch.",
        items: [
          "Functional testing.",
          "Integration testing.",
          "UAT coordination.",
          "Issue tracking and resolution.",
        ],
      },
      {
        key: "golive",
        label: "Go Live Support",
        title: "Stay close during launch with hands on support.",
        desc: "We help teams during cutover, stabilize the environment, and handle early issues quickly after launch.",
        items: [
          "Cutover support.",
          "Hypercare coverage.",
          "Issue triage and escalation.",
          "Post launch stabilization.",
        ],
      },
    ],
    []
  );

  const phases = [
    {
      step: "01",
      title: "Prepare",
      text: "Confirm scope, schedule, dependencies, and implementation readiness.",
    },
    {
      step: "02",
      title: "Build",
      text: "Configure systems, connect tools, and prepare data and workflows.",
    },
    {
      step: "03",
      title: "Validate",
      text: "Test the solution, resolve issues, and verify go live readiness.",
    },
    {
      step: "04",
      title: "Launch",
      text: "Move into production with support, monitoring, and stabilization.",
    },
  ];

  const metrics = [
    { value: "0 guesswork", label: "Clear rollout planning" },
    { value: "Fewer delays", label: "Better coordination" },
    { value: "Safer cutover", label: "Structured go live support" },
    { value: "Faster adoption", label: "Training and enablement" },
  ];

  const support = [
    "Project management and delivery coordination.",
    "Integration and configuration execution.",
    "Data migration validation.",
    "Training, documentation, and knowledge transfer.",
    "Hypercare and post go live stabilization.",
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    const revealEls = document.querySelectorAll(".is-reveal");
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

  return (
    <main className="im-page">
      <section className="im-hero">
        <div className="im-container im-hero__grid">
          <div className="im-hero__left is-reveal">
            <span className="im-kicker">IMPLEMENTATION SERVICES</span>
            <h1>Deliver new systems with less risk and more control.</h1>
            <p>
              ALG DataGuard helps teams plan, deploy, validate, and support implementations so the transition to
              production is structured and predictable.
            </p>
             <button className="btn-orange" type="button" onClick={() => navigate("/contact")}>
            <span className="btn-text">Meet Our Experts Today</span>
            <span className="btn-arrow" aria-hidden="true">
              ›
            </span>
          </button>
          </div>

          <div className="im-hero__right is-reveal">
            <div className="im-heroArt">
              <div className="im-heroArt__circle im-heroArt__circle--dark" />
              <div className="im-heroArt__circle im-heroArt__circle--orange" />
              <div className="im-heroImageWrap">
                <img
                  src="https://pplx-res.cloudinary.com/image/upload/pplx_search_images/688d07921d32b6646480f768dc43512aa308f4f3.jpg"
                  alt="Engineers in a high tech control room with large monitors displaying data and maps"
                  className="im-heroImage"
                  loading="lazy"
                  width="1024"
                  height="576"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="im-metrics">
        <div className="im-container">
          <div className="im-metrics__grid is-reveal">
            {metrics.map((item) => (
              <article className="im-metric" key={item.label}>
                <strong>{item.value}</strong>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="im-intro">
        <div className="im-container im-intro__grid">
          <div className="im-intro__content is-reveal">
            <h2>What implementation services cover</h2>
            <p>
              Implementation services turn a plan into a working system. That means coordinating configuration,
              integration, migration, testing, training, cutover, and support so the project reaches production cleanly.
            </p>
            <p>
              The goal is to reduce friction at launch and make sure the new solution is usable, stable, and ready for
              real business operations.
            </p>
          </div>

          <aside className="im-intro__panel is-reveal">
            <h3>Typical support areas</h3>
            <ul>
              {support.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="im-tabsSection">
        <div className="im-container">
          <div className="im-sectionHead is-reveal">
            <h2>Implementation tracks</h2>
            <p>Switch between tracks to see how the delivery work is organized.</p>
          </div>

          <div className="im-tabs" role="tablist" aria-label="Implementation service tracks">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab.key === tab.key}
                className={`im-tab ${activeTab.key === tab.key ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="im-tabPanel is-reveal">
            <div className="im-tabPanel__copy">
              <span className="im-tabPanel__eyebrow">Delivery focus</span>
              <h3>{activeTab.title}</h3>
              <p>{activeTab.desc}</p>
            </div>

            <ul className="im-tabPanel__list">
              {activeTab.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="im-phases">
        <div className="im-container">
          <div className="im-sectionHead is-reveal">
            <h2>Execution phases</h2>
            <p>A simple four step model keeps the implementation moving in a controlled sequence.</p>
          </div>

          <div className="im-phases__grid">
            {phases.map((item) => (
              <article className="im-phase is-reveal" key={item.step}>
                <span className="im-phase__index">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="im-cta">
        <div className="im-container">
          <div className="im-cta__card is-reveal">
            <div>
              <h2>Launch with a team that stays involved after build day.</h2>
              <p>
                Get support for rollout, validation, and hypercare so your implementation stays stable when it matters
                most.
              </p>
            </div>
            <button className="im-primaryBtn">Request implementation support</button>
          </div>
        </div>
      </section>

      <section className="im-faq">
        <div className="im-container im-faq__grid">
          <div className="im-sectionHead is-reveal">
            <h2>Frequently asked questions</h2>
          </div>

          <div className="im-faq__list">
            {[
              {
                q: "What do implementation services include?",
                a: "They usually include planning, configuration, integration, data migration, testing, user enablement, go live, and hypercare support.",
              },
              {
                q: "Do you help with go live support?",
                a: "Yes. Go live support is included so the launch has hands on assistance and quick issue resolution.",
              },
              {
                q: "Can you handle migration and validation?",
                a: "Yes. Data migration and validation are core parts of the implementation track.",
              },
              {
                q: "Is training part of the service?",
                a: "Yes. User enablement and handover are included to help adoption after launch.",
              },
            ].map((item) => (
              <details className="im-faqItem is-reveal" key={item.q}>
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