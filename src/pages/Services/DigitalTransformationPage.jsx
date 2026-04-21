import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/DigitalTransformationPage.css";

export default function DigitalTransformationPage() {
        const navigate = useNavigate();
  const tabs = useMemo(
    () => [
      {
        key: "strategy",
        label: "Strategy & Maturity",
        title: "Understand where you are and where transformation should take you.",
        desc: "We assess current capabilities, identify gaps, and define the business and technology direction for the transformation.",
        items: [
          "Current state assessment.",
          "Capability gap analysis.",
          "Target operating vision.",
          "Transformation roadmap definition.",
        ],
      },
      {
        key: "automation",
        label: "Process Automation",
        title: "Reduce manual work and remove bottlenecks from critical operations.",
        desc: "We map high friction processes, prioritize automation opportunities, and improve the flow of work across teams.",
        items: [
          "Workflow mapping.",
          "RPA opportunity analysis.",
          "Manual task reduction.",
          "Efficiency and cycle time improvement.",
        ],
      },
      {
        key: "cloud",
        label: "Cloud Modernization",
        title: "Modernize platforms so teams can deliver faster and scale with less friction.",
        desc: "We plan cloud adoption and modernization with a clear view of migration effort, dependencies, and business value.",
        items: [
          "Cloud roadmap planning.",
          "Application and platform modernization.",
          "Migration sequencing.",
          "Integration and governance planning.",
        ],
      },
      {
        key: "data",
        label: "Data & AI",
        title: "Turn data into decisions and AI into practical business value.",
        desc: "We help organizations build the foundations needed for analytics, reporting, AI use cases, and better decision support.",
        items: [
          "Data foundation review.",
          "Analytics and reporting design.",
          "AI use case prioritization.",
          "Governance and readiness planning.",
        ],
      },
      {
        key: "model",
        label: "Operating Model",
        title: "Align teams, governance, and delivery methods with a digital way of working.",
        desc: "We redesign how work gets governed and delivered so digital initiatives do not stall after launch.",
        items: [
          "Cross functional team design.",
          "Governance structure review.",
          "Delivery model alignment.",
          "Decision making and ownership clarity.",
        ],
      },
      {
        key: "change",
        label: "Change Adoption",
        title: "Make the transformation stick through communication and enablement.",
        desc: "We plan how people adopt new tools and processes so the business can realize value after rollout.",
        items: [
          "Training and enablement.",
          "Rollout planning.",
          "Adoption support.",
          "Change communication strategy.",
        ],
      },
    ],
    []
  );

  const roadmap = [
    {
      phase: "01",
      title: "Assess",
      text: "Review the current digital state, business priorities, and capability gaps.",
    },
    {
      phase: "02",
      title: "Design",
      text: "Define the target vision, priorities, roadmap, and success measures.",
    },
    {
      phase: "03",
      title: "Deliver",
      text: "Execute the highest value initiatives with clear sequencing and ownership.",
    },
    {
      phase: "04",
      title: "Adopt",
      text: "Measure adoption, refine workflows, and create continuous improvement loops.",
    },
  ];

  const metrics = [
    { value: "30%", label: "Process efficiency lift" },
    { value: "50%", label: "Faster delivery potential" },
    { value: "4x", label: "Better visibility into work" },
    { value: "1 plan", label: "Clear transformation roadmap" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    const revealEls = document.querySelectorAll(".dt-reveal");
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
    <main className="dt-page">
      <section className="dt-hero">
        <div className="dt-container dt-hero__grid">
          <div className="dt-hero__left dt-reveal">
            <span className="dt-kicker">DIGITAL TRANSFORMATION</span>
            <h1>Modernize the way your business works, delivers, and grows.</h1>
            <p>
              ALG DataGuard helps organizations build a practical transformation roadmap that combines strategy,
              automation, cloud, data, and change adoption into one measurable plan.
            </p>
             <button className="btn-orange" type="button" onClick={() => navigate("/contact")}>
            <span className="btn-text">Meet Our Experts Today</span>
            <span className="btn-arrow" aria-hidden="true">
              ›
            </span>
          </button>
          </div>

          <div className="dt-hero__right dt-reveal">
            <div className="dt-heroArt">
              <div className="dt-heroArt__ring dt-heroArt__ring--dark" />
              <div className="dt-heroArt__ring dt-heroArt__ring--gold" />
              <div className="dt-heroImageWrap">
                <img
                  src="https://pplx-res.cloudinary.com/image/upload/pplx_search_images/37b4596967e3679d8ebb07e7894f264679e417de.jpg"
                  alt="Modern digital transformation landing page design with dark blue gradient background and dashboard elements"
                  className="dt-heroImage"
                  loading="lazy"
                  width="3132"
                  height="1762"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dt-metrics">
        <div className="dt-container">
          <div className="dt-metrics__grid dt-reveal">
            {metrics.map((item) => (
              <article className="dt-metric" key={item.label}>
                <strong>{item.value}</strong>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dt-intro">
        <div className="dt-container dt-intro__grid">
          <div className="dt-intro__content dt-reveal">
            <h2>What digital transformation covers</h2>
            <p>
              Digital transformation is more than adding tools. It means rethinking processes, systems, and operating
              models so the business can move faster and make better decisions.
            </p>
            <p>
              We help define a plan that connects technology changes to real business outcomes instead of isolated
              experiments.
            </p>
          </div>

          <aside className="dt-intro__panel dt-reveal">
            <h3>Common focus areas</h3>
            <ul>
              <li>Automation and process redesign.</li>
              <li>Cloud and platform modernization.</li>
              <li>Data, analytics, and AI adoption.</li>
              <li>Operating model and governance.</li>
              <li>Change management and adoption.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="dt-tabsSection">
        <div className="dt-container">
          <div className="dt-sectionHead dt-reveal">
            <h2>Transformation pillars</h2>
            <p>Select a pillar to see how the transformation can be shaped.</p>
          </div>

          <div className="dt-tabs" role="tablist" aria-label="Digital transformation service areas">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab.key === tab.key}
                className={`dt-tab ${activeTab.key === tab.key ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="dt-tabPanel dt-reveal">
            <div className="dt-tabPanel__copy">
              <span className="dt-tabPanel__eyebrow">Focused advisory</span>
              <h3>{activeTab.title}</h3>
              <p>{activeTab.desc}</p>
            </div>

            <ul className="dt-tabPanel__list">
              {activeTab.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="dt-roadmap">
        <div className="dt-container">
          <div className="dt-sectionHead dt-reveal">
            <h2>Roadmap sequence</h2>
            <p>A structured four phase model keeps the transformation practical and measurable.</p>
          </div>

          <div className="dt-roadmap__grid">
            {roadmap.map((item) => (
              <article className="dt-phase dt-reveal" key={item.phase}>
                <span className="dt-phase__index">{item.phase}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dt-cta">
        <div className="dt-container">
          <div className="dt-cta__card dt-reveal">
            <div>
              <h2>Build a roadmap that leadership can actually execute.</h2>
              <p>
                Turn digital ambition into a phased plan with milestones, accountabilities, and measurable business
                outcomes.
              </p>
            </div>
            <button className="dt-primaryBtn">Request a roadmap session</button>
          </div>
        </div>
      </section>

      <section className="dt-faq">
        <div className="dt-container dt-faq__grid">
          <div className="dt-sectionHead dt-reveal">
            <h2>Frequently asked questions</h2>
          </div>

          <div className="dt-faq__list">
            {[
              {
                q: "What does digital transformation consulting include?",
                a: "It includes strategy, automation, cloud modernization, data and AI planning, operating model design, and change adoption support.",
              },
              {
                q: "Do you create a roadmap?",
                a: "Yes. The roadmap is a core deliverable, with phases, priorities, and measurable targets.",
              },
              {
                q: "Is cloud migration the whole story?",
                a: "No. Cloud is one part of transformation. The page also covers automation, data, operating models, and adoption.",
              },
              {
                q: "How do you make sure adoption sticks?",
                a: "By pairing rollout planning with training, communication, and measurable adoption support.",
              },
            ].map((item) => (
              <details className="dt-faqItem dt-reveal" key={item.q}>
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