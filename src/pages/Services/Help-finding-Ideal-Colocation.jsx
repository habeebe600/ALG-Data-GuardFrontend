import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/HelpFindingIdealColocation.css";
import "./styles/Service-pages.css"
import heroBg from "../../assets/images/services/Help-finding-ideal-colocation-page.jpg";

const HelpFindingIdealColocation = () => {
  const navigate = useNavigate();

  // Simple “requirements builder” (keeps the page unique without heavy UI)
  const [req, setReq] = useState({
    racks: "1 rack",
    power: "3–5 kW per rack",
    connectivity: "2+ carriers",
    security: "24/7 security + mantrap",
    compliance: "SOC 2 / ISO 27001 (if required)",
  });

  const scorecard = useMemo(
    () => [
      { k: "Location & latency", v: "Close to users / cloud on ramps; low latency requirements." },
      { k: "Power & redundancy", v: "UPS/generators and redundant paths (N+1 / 2N depending on needs)." },
      { k: "Connectivity", v: "Multiple carriers, diverse fiber routes, cross-connect options." },
      { k: "Physical security", v: "Access control, surveillance, cages/cabinets, visitor policies." },
      { k: "Compliance", v: "SOC/ISO/industry requirements and audit evidence support." },
      { k: "Support model", v: "Remote hands availability, response time, clear escalation." },
      { k: "Scalability", v: "Room to grow racks/power/bandwidth without major redesign." },
      { k: "Contract & SLA", v: "Transparent SLAs, maintenance windows, service credits." },
    ],
    []
  );

  return (
    <>
      {/* HERO (keep your existing hero design, but can align with theme) */}
      <section
        className="hero-section dd-heroBg"
        
      >
        <div className="hero-left">
        
          <div className="dd-serviceLabel">
           
            <span>HELP FINDING IDEAL COLOCATION</span>
          </div>

          <p className="hc-hero__title">
           Expert guidance for smarter colocation
          </p>

          <p className="hc-hero__lead">
            Make smart decisions about your infrastructure with expert recommendations for colocation
            facilities optimized for scalability, security, and the way your business actually operates.
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
            <img className="hero-img" src={heroBg} alt="Network audit" />
          </div>
        </div>
      </section>

      {/* UNIQUE SECTION #1: Requirements builder (replaces the typical “overview image” section) */}
      <section className="hc-req">
        <div className="hc-req__container">
          <div className="hc-req__left">
            <h2 className="hc-h2">Define what “ideal” means</h2>
            <p className="hc-muted">
              Colocation selection gets easier when requirements are explicit: racks, power density,
              connectivity, compliance, and support expectations.
            </p>

            <div className="hc-req__form">
              <label className="hc-label">
                Rack space
                <select
                  className="hc-select"
                  value={req.racks}
                  onChange={(e) => setReq((s) => ({ ...s, racks: e.target.value }))}
                >
                  <option>1/2 rack</option>
                  <option>1 rack</option>
                  <option>2–4 racks</option>
                  <option>Private cage</option>
                  <option>Private suite</option>
                </select>
              </label>

              <label className="hc-label">
                Power density
                <select
                  className="hc-select"
                  value={req.power}
                  onChange={(e) => setReq((s) => ({ ...s, power: e.target.value }))}
                >
                  <option>1–2 kW per rack</option>
                  <option>3–5 kW per rack</option>
                  <option>6–10 kW per rack</option>
                  <option>10+ kW per rack</option>
                </select>
              </label>

              <label className="hc-label">
                Connectivity
                <select
                  className="hc-select"
                  value={req.connectivity}
                  onChange={(e) => setReq((s) => ({ ...s, connectivity: e.target.value }))}
                >
                  <option>Single carrier OK</option>
                  <option>2+ carriers</option>
                  <option>Carrier-neutral (preferred)</option>
                  <option>Direct cloud connectivity required</option>
                </select>
              </label>

              <label className="hc-label">
                Security
                <select
                  className="hc-select"
                  value={req.security}
                  onChange={(e) => setReq((s) => ({ ...s, security: e.target.value }))}
                >
                  <option>Standard secure facility</option>
                  <option>24/7 security + surveillance</option>
                  <option>24/7 security + mantrap</option>
                  <option>Private cage / locked cabinet</option>
                </select>
              </label>

              <label className="hc-label">
                Compliance
                <select
                  className="hc-select"
                  value={req.compliance}
                  onChange={(e) => setReq((s) => ({ ...s, compliance: e.target.value }))}
                >
                  <option>Not required</option>
                  <option>SOC 2 / ISO 27001 (if required)</option>
                  <option>PCI / HIPAA (if applicable)</option>
                </select>
              </label>
            </div>
          </div>

          <div className="hc-req__right">
            <div className="hc-reqCard">
              <h3 className="hc-h3">Your baseline requirements</h3>
              <ul className="hc-reqList">
                <li><b>Space:</b> {req.racks}</li>
                <li><b>Power:</b> {req.power}</li>
                <li><b>Connectivity:</b> {req.connectivity}</li>
                <li><b>Security:</b> {req.security}</li>
                <li><b>Compliance:</b> {req.compliance}</li>
              </ul>

              <button className="hc-outlineBtn" type="button" onClick={() => navigate("/contact")}>
                Get Facility Recommendations
              </button>

              <p className="hc-note">
                These are planning defaults; final requirements are confirmed during discovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UNIQUE SECTION #2: Provider scorecard (table layout so it looks different) */}
      <section className="hc-scorecard">
        <div className="hc-scorecard__container">
          <div className="hc-scorecard__header">
            <h2 className="hc-h2">Provider scorecard</h2>
            <p className="hc-muted">
              Evaluate facilities consistently across power, connectivity, security, compliance, SLAs,
              and growth options—then pick the best overall fit.
            </p>
          </div>

          <div className="hc-tableWrap">
            <table className="hc-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>What to verify</th>
                </tr>
              </thead>
              <tbody>
                {scorecard.map((r) => (
                  <tr key={r.k}>
                    <td className="hc-tdKey">{r.k}</td>
                    <td className="hc-tdVal">{r.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="hc-miniCtas">
            <div className="hc-miniCard">
              <h3 className="hc-h3">Shortlist vendors</h3>
              <p className="hc-muted">
                Create a shortlist based on requirements, region, and budget before scheduling site tours.
              </p>
            </div>
            <div className="hc-miniCard">
              <h3 className="hc-h3">Site visit questions</h3>
              <p className="hc-muted">
                Ask about redundancy, maintenance windows, remote hands, and escalation.
              </p>
            </div>
            <div className="hc-miniCard">
              <h3 className="hc-h3">Contract review</h3>
              <p className="hc-muted">
                Validate SLA terms, service credits, and upgrade paths before signing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OPTIONAL: FAQ using your existing dd-faq CSS (reused globally) */}
      <section className="dd-faq">
        <div className="dd-faq__container">
          <h2 className="dd-faq__title">FAQ</h2>

          <details className="dd-faqItem">
            <summary>What is colocation, in simple terms?</summary>
            <p>
              Colocation is renting space (cabinet/cage/suite) in a shared data center while you own
              and manage your servers, with the facility providing power, cooling, and physical security.
            </p>
          </details>

          <details className="dd-faqItem">
            <summary>What usually drives colocation cost?</summary>
            <p>
              The biggest drivers are space (rack/cage), power, bandwidth/cross-connects, and support
              services like remote hands.
            </p>
          </details>

          <details className="dd-faqItem">
            <summary>How do we choose the right facility location?</summary>
            <p>
              Balance latency to users, connectivity options, geographic risk, and expansion plans.
            </p>
          </details>

          <details className="dd-faqItem">
            <summary>What should be checked for reliability?</summary>
            <p>
              Review power redundancy, cooling design, maintenance process, and SLA terms.
            </p>
          </details>

          <details className="dd-faqItem">
            <summary>Can you help migrate into the chosen colo?</summary>
            <p>
              Yes—planning, cutover coordination, and post-move validation can be provided as a follow-on service.
            </p>
          </details>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="hc-finalCta">
        <div className="hc-finalCta__inner">
          <h2 className="hc-finalCta__title">Want a vendor-neutral recommendation?</h2>
          <p className="hc-finalCta__text">
            Share your requirements and constraints, and receive a shortlist + evaluation guidance aligned to your needs.
          </p>
          <button className="hc-primaryBtn" type="button" onClick={() => navigate("/contact")}>
            Talk to an Expert
          </button>
        </div>
      </section>
    </>
  );
};

export default HelpFindingIdealColocation;
