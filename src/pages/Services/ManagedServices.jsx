import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ManagedServices.css";
import heroPerson from "../../assets/images/services/sample-pic.jpg";
import cardIcon1 from "../../assets/images/services/managed-services/card1.png";
import cardIcon2 from "../../assets/images/services/managed-services/card2.png";
import cardIcon3 from "../../assets/images/services/managed-services/card3.png";


const ManagedServices = () => {
  const navigate = useNavigate();

  const whyRef = useRef(null);
const [whyInView, setWhyInView] = useState(false);

const whyCardRefs = useRef([]); // 0,1,2

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
    iconAlt: "Growth and reporting",
    text:
      "Trusted by businesses across Canada, we manage devices and scale support as teams grow without the growing pains.",
  },
  {
    iconImg: cardIcon2,
    iconAlt: "Proactive team",
    text:
      "Support should be proactive, not reactive. With automation, proven processes, and experienced engineers, issues are reduced before they interrupt work.",
  },
  {
    iconImg: cardIcon3,
    iconAlt: "Discovery and clarity",
    text:
      "Before recommending anything, we learn your environment and priorities. That way, the next steps are clear, realistic, and aligned to your goals.",
  },
];

const suiteCards = [
  { title: "Cloud IT Solutions", 
    text: "Get secure cloud backups, smooth migrations, and reliable ongoing support to keep your business connected. Maximize productivity and stay ahead with modern cloud computing.", 
    to: "/services/cloud-IT-solutions" },

  { title: "AI & Automation", 
        text: "Boost efficiency with secure AI and automation tools that reduce manual work and improve decision-making. Stay competitive and streamline operations in the digital landscape.",
    to: "/services/AI-Automation-Services" },

  { title: "Cyber Security", 
      text: "Protect your organization with audits, compliance consulting, incident response, and layered security. Build strong defenses against evolving cyber threats.",
    to: "/services/Cybersecurity-Services" },

  { title: "Strategic IT Consulting", 
      text: "Plan, implement, and manage IT projects with expert guidance and smart procurement. Simplify your environment and support long-term success.",
    to: "/services/Strategic-IT-Consulting" },

  { title: "Network Solutions", 
      text: "Enjoy 24/7 network monitoring and routine assessments to identify and fix issues early. Keep your devices secure and running seamlessly.",
    to: "/services/Managed-Network-Solutions" },

  { title: "IT Support Services", 
    text: "We minimize downtime with 24/7 helpdesk support and proactive device management. Rely on us for efficient, dependable IT assistance.", 
    to: "/services/IT-Managed-Support-Services" },

  { title: "Support & Training", 
    text: "Ongoing technical support and comprehensive training programs to empower your team and ensure success", 
    to: "/services/Support-Training" },
];


  return (
      <>
    <section className="hero-section ms-hero">
      <div className="hero-left ms-heroLeft">
        <h1 className="ms-title">
          Less Downtime. More
          Control. Fully Managed <br />
          IT That Keeps You Ahead
        </h1>

        <p className="ms-lead">
          From daily support to long-term planning, we are the team behind your tech and growth.
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

          <img className="ms-heroImg" src={heroPerson} alt="Managed services team" />
        </div>
      </div>
    </section>

    <section className="ms-why" ref={whyRef}>
      <div className="ms-why__container">
        <div className="ms-why__heading">
          <h2 className="ms-why__title">Why ALG Data Guard?</h2>
          <p className="ms-why__sub">IT Support That Grows With Your Business</p>
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

      {/* section 3 */}
    <section className="ms-work">
  <div className="ms-work__container">
    <header className="ms-work__head">
      <h2 className="ms-work__title">How We Partner With You</h2>
      <p className="ms-work__sub">
        Fully managed or co-managed it’s your choice. Some teams want a 
        complete IT department. Others have internal IT and need extra capacity. Both models work here.
      </p>
    </header>

    <div className="ms-work__grid">
      {/* Card 1 */}
      <article className="ms-workCard">
        <div className="ms-workCard__imgWrap">
          <img
            className="ms-workCard__img"
            src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=80"
            alt="Fully managed IT"
          />
        </div>
        <h3 className="ms-workCard__title">Fully Managed IT</h3>
        <p className="ms-workCard__text">
          End-to-end IT ownership, from daily support to long-term planning. Operations, security, and maintenance 
          are handled so your team can stay focused on the business.
        </p>
      </article>

      {/* Card 2 */}
      <article className="ms-workCard">
        <div className="ms-workCard__imgWrap">
          <img
            className="ms-workCard__img"
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
            alt="Co-managed IT"
          />
        </div>
        <h3 className="ms-workCard__title">Co-Managed IT</h3>
        <p className="ms-workCard__text">
          Keep your in house IT team and add expert backup where it matters. 
          Get additional tools, processes, and hands-on support to close gaps and move faster.
        </p>
      </article>
    </div>
  </div>
</section>

      {/* How We Partner With You */}
<section className="ms-suite">
  <div className="ms-suite__container">
    <header className="ms-suite__head">
      <h2 className="ms-suite__title">Explore Our Complete Suite of Fully Managed IT Services</h2>
      <p className="ms-suite__sub">
        Managed services designed to simplify daily IT, strengthen security, and support long-term growth with
        scalable support and clear outcomes.
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

      {/* SECTION-5 */}

<section className="ms-greenCta">
  <div className="ms-greenCta__container">
    <div className="ms-greenCta__card">
      <div className="ms-greenCta__left">
        <h2 className="ms-greenCta__title">
          Let’s Talk About Your <br />
          IT Needs Today
        </h2>

        <p className="ms-greenCta__text">
          Connect with ALG Data Guard and get a managed services plan tailored to your environment.
          Get clear next steps for support, security, and long-term improvement.
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
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
          alt="Consultation"
        />
      </div>
    </div>
  </div>
</section>


    </>
  );
};

export default ManagedServices;
