import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/InfrastructureConsultingPage.css";

export default function InfrastructureConsultingPage() {
        const navigate = useNavigate();

  const tabs = useMemo(
    () => [
      {
        key: "network",
        label: "Network Infrastructure",
        title: "Design networks that stay fast, secure, and resilient.",
        desc: "Build a stronger foundation with better segmentation, routing, redundancy, and traffic flow across your environment.",
        items: [
          "Network assessments and optimization.",
          "Firewall and segmentation strategy.",
          "WAN / LAN architecture planning.",
          "SD-WAN and connectivity review.",
        ],
      },
      {
        key: "cloud",
        label: "Cloud Infrastructure",
        title: "Connect cloud workloads with the right operating model.",
        desc: "Plan hybrid and multi cloud environments with clear decisions around placement, integration, and scaling.",
        items: [
          "Hybrid cloud planning.",
          "Cloud landing zone design.",
          "Workload migration advisory.",
          "Cloud connectivity and governance.",
        ],
      },
      {
        key: "datacenter",
        label: "Data Center Modernization",
        title: "Modernize aging infrastructure into a more efficient platform.",
        desc: "Assess data center capacity, upgrade paths, and consolidation opportunities to reduce complexity and improve performance.",
        items: [
          "Data center assessment.",
          "Consolidation and refresh roadmap.",
          "Power, cooling, and space planning.",
          "Virtualization and automation strategy.",
        ],
      },
      {
        key: "security",
        label: "Security Architecture",
        title: "Build infrastructure with security designed in from the start.",
        desc: "Strengthen access, hardening, and architecture decisions so protection is built into the environment rather than patched on later.",
        items: [
          "Zero trust planning.",
          "Access control review.",
          "Infrastructure hardening.",
          "Compliance aligned architecture.",
        ],
      },
      {
        key: "resilience",
        label: "Resilience & Recovery",
        title: "Make recovery a plan, not a reaction.",
        desc: "Design backup, failover, and continuity mechanisms that help operations continue when systems or sites fail.",
        items: [
          "Disaster recovery planning.",
          "Backup and restore design.",
          "Failover and redundancy review.",
          "RTO / RPO planning.",
        ],
      },
      {
        key: "ops",
        label: "Monitoring & Optimization",
        title: "Keep infrastructure visible, measurable, and tunable.",
        desc: "Use observability, metrics, and ongoing reviews to keep the environment healthy over time.",
        items: [
          "Monitoring and alerting design.",
          "Capacity and utilization reviews.",
          "Observability and logging strategy.",
          "Continuous optimization roadmap.",
        ],
      },
    ],
    []
  );

  const outcomes = [
    { value: "01", label: "Reduced downtime" },
    { value: "02", label: "Better scalability" },
    { value: "03", label: "Improved resilience" },
    { value: "04", label: "Lower complexity" },
  ];

  const process = [
    {
      step: "01",
      title: "Assess",
      text: "Review the current infrastructure landscape, constraints, dependencies, and risks.",
    },
    {
      step: "02",
      title: "Map",
      text: "Identify what should stay, what should be modernized, and what should be retired.",
    },
    {
      step: "03",
      title: "Plan",
      text: "Create a practical roadmap with priorities, sequencing, and implementation effort.",
    },
    {
      step: "04",
      title: "Improve",
      text: "Guide execution with clear recommendations and measurable technical outcomes.",
    },
  ];

  const faqs = [
    {
      q: "What does infrastructure consulting include?",
      a: "It can cover network design, cloud infrastructure, data center modernization, security architecture, resilience planning, and ongoing optimization.",
    },
    {
      q: "Do you support hybrid environments?",
      a: "Yes. Hybrid and multi cloud planning is part of the service so on prem and cloud systems work together more effectively.",
    },
    {
      q: "Can you help with data center modernization?",
      a: "Yes. The page includes a dedicated section for data center assessment, modernization, and consolidation planning.",
    },
    {
      q: "Is disaster recovery included?",
      a: "Yes. Recovery, failover, backup, and continuity planning are included under resilience and recovery.",
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    const revealEls = document.querySelectorAll(".ic-reveal");
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
    <main className="ic-page">
      <section className="ic-hero">
        <div className="ic-container ic-hero__grid">
          <div className="ic-hero__left ic-reveal">
            <span className="ic-kicker">INFRASTRUCTURE CONSULTING</span>
            <h1>Build infrastructure that is easier to run, scale, and recover.</h1>
            <p>
              ALG DataGuard helps teams assess existing environments, modernize critical systems, and create a stronger
              infrastructure roadmap for growth and resilience.
            </p>
             <button className="btn-orange" type="button" onClick={() => navigate("/contact")}>
            <span className="btn-text">Meet Our Experts Today</span>
            <span className="btn-arrow" aria-hidden="true">
              ›
            </span>
          </button>
          </div>

          <div className="ic-hero__right ic-reveal">
            <div className="ic-heroArt">
              <div className="ic-heroArt__circle ic-heroArt__circle--dark" />
              <div className="ic-heroArt__circle ic-heroArt__circle--orange" />
              <div className="ic-heroImageWrap">
                <img
                  src="https://pplx-res.cloudinary.com/image/upload/pplx_search_images/86ecd93609b3fd899a08a8f437cdfb6ec5f79f4b.jpg"
                  alt="Cybersecurity monitoring dashboard with charts and status panels"
                  className="ic-heroImage"
                  loading="lazy"
                  width="1920"
                  height="1080"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ic-intro">
        <div className="ic-container ic-intro__grid">
          <div className="ic-intro__content ic-reveal">
            <h2>What we help with</h2>
            <p>
              Infrastructure consulting is about making the core stack more dependable. We look at networks, cloud,
              data centers, security architecture, and resilience to find the fastest path to better operations.
            </p>
            <p>
              The goal is not just modernization for its own sake. It is to reduce friction, improve reliability, and
              create an environment that supports the business with less risk.
            </p>
          </div>

          <aside className="ic-outcomes ic-reveal">
            <h3>Expected outcomes</h3>
            <div className="ic-outcomes__grid">
              {outcomes.map((item) => (
                <div className="ic-outcome" key={item.label}>
                  <span>{item.value}</span>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="ic-tabsSection">
        <div className="ic-container">
          <div className="ic-sectionHead ic-reveal">
            <h2>Service areas</h2>
            <p>Select a focus area to see how the infrastructure program can be shaped.</p>
          </div>

          <div className="ic-tabs" role="tablist" aria-label="Infrastructure consulting service areas">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab.key === tab.key}
                className={`ic-tab ${activeTab.key === tab.key ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="ic-tabPanel ic-reveal">
            <div className="ic-tabPanel__copy">
              <span className="ic-tabPanel__eyebrow">Focused advisory</span>
              <h3>{activeTab.title}</h3>
              <p>{activeTab.desc}</p>
            </div>

            <ul className="ic-tabPanel__list">
              {activeTab.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="ic-process">
        <div className="ic-container">
          <div className="ic-sectionHead ic-reveal">
            <h2>Engagement process</h2>
            <p>A simple sequence keeps the work structured and easier to execute.</p>
          </div>

          <div className="ic-process__grid">
            {process.map((item) => (
              <article className="ic-step ic-reveal" key={item.step}>
                <span className="ic-step__index">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ic-cta">
        <div className="ic-container">
          <div className="ic-cta__card ic-reveal">
            <div>
              <h2>Start with an infrastructure assessment.</h2>
              <p>
                Get a clearer picture of what should be modernized, what should be retained, and where the highest
                value improvements are hiding.
              </p>
            </div>
            <button className="ic-primaryBtn">Request assessment</button>
          </div>
        </div>
      </section>

      <section className="ic-faq">
        <div className="ic-container ic-faq__grid">
          <div className="ic-sectionHead ic-reveal">
            <h2>Frequently asked questions</h2>
          </div>

          <div className="ic-faq__list">
            {faqs.map((item) => (
              <details className="ic-faqItem ic-reveal" key={item.q}>
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