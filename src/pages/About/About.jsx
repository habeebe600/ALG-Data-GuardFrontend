import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/About.css";

const About = () => {
  const navigate = useNavigate();

  const pillars = [
    {
      title: "Networking & Infrastructure",
      text:
        "Architect and deploy reliable networks for modern workplaces built to scale, easy to manage, and resilient under pressure.",
    },
    {
      title: "Cloud Enablement",
      text:
        "Modernize infrastructure with practical cloud strategies that improve flexibility while keeping cost and security in check.",
    },
    {
      title: "Cybersecurity Services",
      text:
        "Strengthen your security posture with proactive controls, risk reduction, and incident ready practices designed for real environments.",
    },
  ];

  const values = [
    {
      title: "Customer first delivery",
      text:
        "Clear communication, clean documentation, and solutions that fit your business not one size fits all setups.",
    },
    {
      title: "Deep technical expertise",
      text:
        "Experience across enterprise technologies to design secure, scalable, and high-performing IT environments.",
    },
    {
      title: "Future proof thinking",
      text:
        "Infrastructure decisions made with growth, reliability, and long-term maintainability in mind.",
    },
  ];

  const audiences = [
    "Enterprises running mission critical environments.",
    "Public sector organizations with high reliability and security expectations.",
    "Teams managing complex, multi vendor infrastructure and cloud ecosystems.",
  ];

  return (
    <>
      {/* HERO */}
      <section className="aboutHero">
        <div className="aboutHero__container">
          <div className="aboutHero__left">
            <p className="aboutHero__kicker">About ALG DataGuard</p>

            <h1 className="aboutHero__title">
              Secure IT. Strong Networks.
              <br />
              Confident Growth.
            </h1>

            <p className="aboutHero__lead">
              ALG DataGuard is an IT consulting and cybersecurity services company focused on
              networking, cloud, security, and IT infrastructure supporting organizations that
              need reliability, scale, and a stronger security posture.
            </p>

            <div className="aboutHero__ctaRow">
              <button
                className="aboutBtn aboutBtn--primary"
                type="button"
                onClick={() => navigate("/contact")}
              >
                Talk to an Expert
              </button>
              <button
                className="aboutBtn aboutBtn--ghost"
                type="button"
                onClick={() => navigate("/services")}
              >
                Explore Services
              </button>
            </div>

            <div className="aboutHero__miniStats">
              <div className="aboutStat">
                <div className="aboutStat__num">Networking</div>
                <div className="aboutStat__text">Design, deployment, and optimization.</div>
              </div>
              <div className="aboutStat">
                <div className="aboutStat__num">Cloud</div>
                <div className="aboutStat__text">Modernize without disrupting operations.</div>
              </div>
              <div className="aboutStat">
                <div className="aboutStat__num">Security</div>
                <div className="aboutStat__text">Practical protection for real threats.</div>
              </div>
            </div>
          </div>

          <div className="aboutHero__right">
            <div className="aboutHero__visual">
              <div className="aboutHero__accent aboutHero__accent--a" />
              <div className="aboutHero__accent aboutHero__accent--b" />
              <div className="aboutHero__card">
                <h3 className="aboutHero__cardTitle">One-stop IT consulting partner</h3>
                <p className="aboutHero__cardText">
                  Expertise across leading technologies in networking, cloud, security, and IT
                  infrastructure.
                </p>
              </div>
              <div className="aboutHero__badge">Richmond Hill, Ontario</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="aboutSection aboutSection--white">
        <div className="aboutContainer">
          <h2 className="aboutH2">Who we are</h2>
          <p className="aboutP">
            ALG DataGuard positions itself as a “one-stop IT consulting partner” with a focus on
            secure, scalable solutions for modern organizations.
          </p>
          <p className="aboutP">
            The work centers on building reliable IT foundations networking, cloud, and security
            infrastructure so teams can operate with confidence and reduce technology related risk.
          </p>
        </div>
      </section>

      {/* PILLARS */}
      <section className="aboutSection aboutSection--muted">
        <div className="aboutContainer">
          <h2 className="aboutH2">What we focus on</h2>

          <div className="aboutGrid3">
            {pillars.map((p) => (
              <article key={p.title} className="aboutCard">
                <h3 className="aboutCard__title">{p.title}</h3>
                <p className="aboutCard__text">{p.text}</p>
              </article>
            ))}
          </div>

          <div className="aboutHighlight">
            <div className="aboutHighlight__bar" />
            <p className="aboutHighlight__text">
              Built for environments where uptime, performance, and security can’t be optional.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES + AUDIENCE */}
      <section className="aboutSection aboutSection--white">
        <div className="aboutContainer">
          <div className="aboutSplit">
            <div>
              <h2 className="aboutH2">How we work</h2>
              <div className="aboutGrid2">
                {values.map((v) => (
                  <article key={v.title} className="aboutCard aboutCard--tight">
                    <h3 className="aboutCard__title">{v.title}</h3>
                    <p className="aboutCard__text">{v.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h2 className="aboutH2">Who we help</h2>
              <p className="aboutP">
                ALG DataGuard’s positioning aligns with organizations that need mission critical
                reliability and strong security practices.
              </p>
              <ul className="aboutList">
                {audiences.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>

              <div className="aboutNote">
                <span className="aboutNote__dot" />
                <p className="aboutNote__text">
                  Engagements can start with assessment and planning, then move into deployment
                  and ongoing improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="aboutCta">
        <div className="aboutCta__container">
          <div className="aboutCta__left">
            <h2 className="aboutCta__title">
              Ready to strengthen your IT foundation?
            </h2>
            <p className="aboutCta__text">
              Start with a conversation. Get practical guidance on networking, cloud, and cybersecurity
              priorities without the noise.
            </p>

            <div className="aboutCta__buttons">
              <button
                className="aboutBtn aboutBtn--primary"
                type="button"
                onClick={() => navigate("/contact")}
              >
                Book a Consultation
              </button>
              <button
                className="aboutBtn aboutBtn--ghostOnDark"
                type="button"
                onClick={() => navigate("/services")}
              >
                View Services
              </button>
            </div>
          </div>

          <div className="aboutCta__right">
            <div className="aboutCta__panel">
              <h3 className="aboutCta__panelTitle">What you can expect</h3>
              <ul className="aboutCta__panelList">
                <li>Clear scope and outcomes.</li>
                <li>Security minded architecture decisions.</li>
                <li>Documentation you can actually use.</li>
                <li>Support that scales with your needs.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
