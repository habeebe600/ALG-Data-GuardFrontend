import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CybersecurityConsultingPage.css";

export default function CybersecurityConsultingPage() {
      const navigate = useNavigate();

  useEffect(() => {
    const revealEls = document.querySelectorAll(".cy-reveal");
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
      title: "Security Risk Assessment",
      text: "Identify threats, weak points, and control gaps across your systems, applications, and infrastructure.",
    },
    {
      title: "Vulnerability Management",
      text: "Find, prioritize, and track vulnerabilities before they become incidents or business disruptions.",
    },
    {
      title: "Cloud Security Review",
      text: "Assess cloud environments for identity, access, encryption, governance, and configuration risks.",
    },
    {
      title: "Compliance Advisory",
      text: "Align your security program with regulatory and industry requirements through practical controls.",
    },
    {
      title: "Incident Response Planning",
      text: "Prepare response playbooks, escalation paths, and recovery steps before an incident occurs.",
    },
    {
      title: "Identity & Access Review",
      text: "Strengthen authentication, authorization, privileged access, and account lifecycle controls.",
    },
    {
      title: "Network Security Assessment",
      text: "Review firewalls, segmentation, monitoring, and network policies to reduce attack surface.",
    },
    {
      title: "Security Roadmap",
      text: "Turn findings into a clear prioritized roadmap with quick wins and long term actions.",
    },
  ];

  const approach = [
    {
      step: "01",
      title: "Assess",
      text: "Review your current security posture, business risks, and compliance priorities.",
    },
    {
      step: "02",
      title: "Detect",
      text: "Identify vulnerabilities, misconfigurations, and gaps across cloud, network, and endpoints.",
    },
    {
      step: "03",
      title: "Prioritize",
      text: "Rank remediation based on risk, exposure, impact, and operational urgency.",
    },
    {
      step: "04",
      title: "Improve",
      text: "Implement practical improvements and guide your team through ongoing hardening.",
    },
  ];

  const faqs = [
    {
      q: "What does cybersecurity consulting cover?",
      a: "It usually includes risk assessments, vulnerability management, cloud and network security review, compliance advisory, incident response planning, and remediation guidance.",
    },
    {
      q: "Do you support cloud security?",
      a: "Yes. Cloud security review is included so teams can improve identity, access, configuration, encryption, and governance controls.",
    },
    {
      q: "Is incident response part of this service?",
      a: "Yes. We include incident response planning so your team has a clear playbook before an attack or outage happens.",
    },
    {
      q: "Can you help prioritize findings?",
      a: "Yes. The goal is not just to identify issues but to rank them by risk so you know what to fix first.",
    },
  ];

  return (
    <main className="cy-page">
      <section className="cy-hero">
        <div className="cy-container cy-hero__grid">
          <div className="cy-hero__left cy-reveal">
            <div className="cy-breadcrumbRow">
              <span className="cy-serviceLabel">CYBERSECURITY CONSULTING</span>
            </div>
            <h1>Protect systems, reduce risk, and strengthen your security posture.</h1>
            <p>
              ALG DataGuard helps organizations find vulnerabilities, improve controls, and build a clearer path to
              stronger cybersecurity resilience.
            </p>
             <button className="btn-orange" type="button" onClick={() => navigate("/contact")}>
            <span className="btn-text">Meet Our Experts Today</span>
            <span className="btn-arrow" aria-hidden="true">
              ›
            </span>
          </button>
          </div>

          <div className="cy-hero__right cy-reveal">
  <div className="cy-heroArt">
    <div className="cy-heroArt__circle cy-heroArt__circle--dark" />
    <div className="cy-heroArt__circle cy-heroArt__circle--orange" />

    <div className="cy-heroImageWrap">
      <img
        src="https://pplx-res.cloudinary.com/image/upload/pplx_search_images/a7517a9210882e8bb770300a0ff601e032e42681.jpg"
        alt="Cybersecurity dashboard interface showing security metrics and monitoring panels"
        className="cy-heroImage"
        loading="lazy"
        width="752"
        height="564"
      />
    </div>
  </div>
</div>
        </div>
      </section>

      <section className="cy-intro">
        <div className="cy-container cy-intro__grid">
          <div className="cy-intro__content cy-reveal">
            <h2>What we do</h2>
            <p>
              Cybersecurity consulting focuses on finding risk before attackers do. We help you assess your current
              security posture, identify gaps, and build a practical plan to reduce exposure across people, process,
              and technology.
            </p>
            <p>
              Whether you need a one time assessment or a broader improvement roadmap, the goal is the same: give your
              team clear recommendations that are realistic to implement.
            </p>
          </div>

          <div className="cy-intro__panel cy-reveal">
            <h3>Core focus areas</h3>
            <ul>
              <li>Risk and vulnerability assessment.</li>
              <li>Cloud and network security review.</li>
              <li>Compliance and governance guidance.</li>
              <li>Incident response preparation.</li>
              <li>Prioritized remediation planning.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cy-services">
        <div className="cy-container">
          <div className="cy-sectionHead cy-reveal">
            <h2>Cybersecurity services</h2>
            <p>Use these services to strengthen your security program from assessment through execution.</p>
          </div>

          <div className="cy-services__grid">
            {services.map((item) => (
              <article className="cy-card cy-reveal" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cy-approach">
        <div className="cy-container">
          <div className="cy-sectionHead cy-reveal">
            <h2>How the engagement works</h2>
            <p>A clear sequence keeps the process organized and the recommendations actionable.</p>
          </div>

          <div className="cy-approach__grid">
            {approach.map((item) => (
              <article className="cy-step cy-reveal" key={item.step}>
                <span className="cy-step__index">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cy-cta">
        <div className="cy-container">
          <div className="cy-cta__card cy-reveal">
            <div>
              <h2>Get a practical cybersecurity roadmap.</h2>
              <p>
                Turn security findings into a structured plan that improves resilience without slowing down the
                business.
              </p>
            </div>
            <button className="cy-primaryBtn">Start cybersecurity consulting</button>
          </div>
        </div>
      </section>

      <section className="cy-faq">
        <div className="cy-container cy-faq__grid">
          <div className="cy-sectionHead cy-reveal">
            <h2>Frequently asked questions</h2>
          </div>

          <div className="cy-faq__list">
            {faqs.map((item) => (
              <details className="cy-faqItem cy-reveal" key={item.q}>
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