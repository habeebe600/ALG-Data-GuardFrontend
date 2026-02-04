import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AIAutomationServices.css";
import AIAndAutomationAutomateTask from "../../assets/images/services/AIAndAutomation/AIAndAutomation- AutomateTask.png";
import AIAndAutomationAutomationWork from "../../assets/images/services/AIAndAutomation/AIAndAutomation-AutomationWork.png";
import WhatisAIAutomation from "../../assets/images/services/AIAndAutomation/WhatisAIAutomation.avif";
import AIReadinessAssessment from "../../assets/images/services/AIAndAutomation/AIReadinessAssessment.png";
import DataSecurityForAIEnablement from "../../assets/images/services/AIAndAutomation/DataSecurityForAIEnablement.png";
import IdentifyingTheRightAI from "../../assets/images/services/AIAndAutomation/IdentifyingTheRightAI.png";
import PrecursorActivitiesForAIIntegration from "../../assets/images/services/AIAndAutomation/PrecursorActivitiesForAIIntegration.jpg";
import MicrosoftCopilotCentric from "../../assets/images/services/AIAndAutomation/MicrosoftCopilotCentric.png";
import IndustriesThatBenefit from "../../assets/images/services/AIAndAutomation/IndustriesThatBenefit.png";

const AIAutomationServices = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const els = document.querySelectorAll(".ai-observe");
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

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section ai-observe">
        <div className="hero-left">
          <div className="dd-serviceLabel">
            <span>AI AND AUTOMATION</span>
          </div>

          <h1 className="hc-hero__title" >
            Automate tasks. <br />
            Amplify results.
          </h1>

          <p className="hc-hero__lead" >
            Is your organization ready for AI? Future-proof your business processes with our AI and Automation Services and ensure your company is prepared to take the next step in automation. At ALG Data Guard we’ll guide you through the essential groundwork to adopt AI solutions securely and effectively.
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
              src={AIAndAutomationAutomateTask}
              alt="AI AND AUTOMATION"
            />
          </div>
        </div>
      </section>

      {/* SECTION 1 (image slides Left -> Right) */}
      <section className="ai-split-wrap ai-alt ai-observe">
        <div className="ai-split-container">
          <div className="ai-split-content">
            <h2 className="ai-split-title">
              What is AI Automation and <br /> how can your business benefit from it?
            </h2>

            <h3 className="ai-split-subtitle">
              Unlocking the Power of Intelligent Automation for Modern Businesses
            </h3>

            <p className="ai-split-text">
              AI automation is rapidly transforming business processes by combining the
              strengths of artificial intelligence, machine learning, and advanced
              automation technologies. With intelligent automation, organizations can
              automate repetitive tasks, accelerate data analysis, and empower smarter
              decision making across all levels of the business.
            </p>

            <p className="ai-split-text">
              By deploying AI-powered automation tools, companies streamline workflows,
              reduce manual intervention, and free up valuable resources for more strategic
              initiatives. This not only increases operational efficiency but also enables
              businesses to adapt quickly to changing market demands and drive continuous
              innovation.
            </p>
          </div>

          <div className="ai-split-media ai-slide-from-left">
            <img
              className="ai-split-img"
              src={WhatisAIAutomation}
              alt="AI automation"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 (image slides Right -> Left) */}
      <section className="ai-split-wrap ai-observe">
        <div className="ai-split-container ai-split-reverse">
          <div className="ai-split-media ai-slide-from-right">
            <img
              className="ai-split-img"
              src={AIReadinessAssessment}
              alt="AI readiness"
            />
          </div>

          <div className="ai-split-content">
            <h2 className="ai-split-title">AI Readiness Assessment</h2>
            <h3 className="ai-split-subtitle">
              Understand Where You Stand Before You Scale with AI
            </h3>

            <p className="ai-split-text">
              At ALG Data Guard we know adopting artificial intelligence isn’t just about
              plugging in new tools, it’s about organizational alignment, strategic intent,
              and digital maturity. Our AI Readiness Assessment service offers a 360-degree
              evaluation of your organization’s preparedness for successful AI integration.
            </p>

            <p className="ai-split-text ai-strong">We’ll assess:</p>

            <ul className="ai-split-list">
              <li>
                <b>Digital Maturity:</b> Are your existing systems and processes modern and
                agile enough to support automation and AI tools?
              </li>
              <li>
                <b>Data Infrastructure:</b> Do you have accessible, clean, and organized
                data that AI can effectively use?
              </li>
              <li>
                <b>Team Readiness:</b> Are your people equipped with the mindset and skills
                to adopt AI-driven processes?
              </li>
              <li>
                <b>AI Opportunity Mapping:</b> Where can AI deliver the fastest ROI across
                your business units?
              </li>
            </ul>

            <p className="ai-split-text">
              Make smarter AI investments with clarity and confidence with ALG Data Guard.
            </p>

            <button className="ai-split-btn" type="button" onClick={() => navigate("/contact")}>
              Take Your Readiness Assessment
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="ai-split-wrap ai-observe">
        <div className="ai-split-container">
          <div className="ai-split-content">
            <h2 className="ai-split-title">Data Security for AI Enablement</h2>
            <h3 className="ai-split-subtitle">Build a Secure Foundation for Smart Automation</h3>

            <p className="ai-split-text">
              Before you automate or implement any AI-driven solutions, you need rock-solid
              data security. AI tools rely on data, often sensitive and business-critical,
              so protecting it is not optional; it’s essential.
            </p>

            <p className="ai-split-text ai-strong">Our data security services include:</p>

            <ul className="ai-split-list">
              <li>
                <b>Security Audits:</b> We evaluate your data storage, access controls, and
                encryption protocols.
              </li>
              <li>
                <b>Compliance Check:</b> Ensure your organization meets regulatory and
                compliance standards such as GDPR, HIPAA, or SOC 2.
              </li>
              <li>
                <b>Secure Architecture Design:</b> Create a security-first infrastructure
                designed for scalability and AI workloads.
              </li>
              <li>
                <b>Zero Trust Implementation:</b> Apply modern security frameworks that
                assume no device, user, or application is trustworthy by default.
              </li>
            </ul>

            <p className="ai-split-text">
              Ensure privacy, mitigate risk, and build AI on a secure and trusted foundation
              with ALG Data Guard.
            </p>
          </div>

          <div className="ai-split-media ai-slide-from-left">
            <img
              className="ai-split-img"
              src={DataSecurityForAIEnablement}
              alt="Data security"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="ai-split-wrap ai-observe">
        <div className="ai-split-container ai-split-reverse">
          <div className="ai-split-media ai-slide-from-right">
            <img
              className="ai-split-img"
              src={IdentifyingTheRightAI}
              alt="AI tools"
            />
          </div>

          <div className="ai-split-content">
            <h2 className="ai-split-title">
              Identifying the Right AI & Intelligent Automation Tools
            </h2>

            <h3 className="ai-split-subtitle">
              Find and Implement Tools That Actually Solve Your Problems
            </h3>

            <p className="ai-split-text">
              There are thousands of AI tools available, but not all are right for your needs.
              We help you cut through the noise and focus on tools that automate what matters most.
            </p>

            <p className="ai-split-text ai-strong">
              Our tool selection and deployment service includes:
            </p>

            <ul className="ai-split-list">
              <li><b>Workflow Analysis:</b> Understand where manual tasks are costing you time and money.</li>
              <li><b>Tool Matching:</b> Identify best-fit AI solutions for automation.</li>
              <li><b>Integration Support:</b> Ensure seamless implementation into existing systems.</li>
              <li><b>Adoption Planning:</b> Provide training, change management, and governance plans.</li>
            </ul>

            <p className="ai-split-text">
              Do Intelligent Automation: deploy AI that fits your business, not the other way around
              with ALG Data Guard.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className="ai-split-wrap ai-observe">
        <div className="ai-split-container">
          <div className="ai-split-content">
            <h2 className="ai-split-title">Precursor Activities for AI Integration</h2>
            <h3 className="ai-split-subtitle">
              Don’t Implement AI Until Your Infrastructure is Audit-Ready
            </h3>

            <p className="ai-split-text">
              Successful AI integration begins with the right groundwork. Our precursor activities
              make sure your organization’s environment is prepared for sophisticated tools like
              Microsoft Copilot and enterprise-grade AI.
            </p>

            <p className="ai-split-text ai-strong">We conduct:</p>

            <ul className="ai-split-list">
              <li><b>Network & Endpoint Audits:</b> Assess your infrastructure for gaps.</li>
              <li><b>Identity & Access Reviews:</b> Evaluate roles, access levels, MFA/SSO.</li>
              <li><b>Data Governance Verification:</b> Ensure data is structured for ML usage.</li>
              <li><b>Device and Software Inventory:</b> Identify outdated systems.</li>
            </ul>

            <p className="ai-split-text">
              Reduce deployment delays and protect your investment with a clean, secure, AI-ready
              environment with ALG Data Guard.
            </p>
          </div>

          <div className="ai-split-media ai-slide-from-left">
            <img
              className="ai-split-img"
              src={PrecursorActivitiesForAIIntegration}
              alt="AI integration"
            />
          </div>
        </div>
      </section>

      {/* SECTION 6 */}
      <section className="ai-split-wrap ai-observe">
        <div className="ai-split-container ai-split-reverse">
          <div className="ai-split-media ai-slide-from-right">
            <img
              className="ai-split-img"
              src={MicrosoftCopilotCentric}
              alt="Copilot"
            />
          </div>

          <div className="ai-split-content">
            <h2 className="ai-split-title">Microsoft Copilot-Centric Deployment</h2>
            <h3 className="ai-split-subtitle">Native AI, Built into the Tools You Already Use</h3>

            <p className="ai-split-text ai-strong">
              We specialize in deploying foundational AI services within the Microsoft Copilot ecosystem, ensuring:
            </p>

            <ul className="ai-split-list">
              <li><b>Native Integration:</b> Work within Microsoft 365 apps without third-party platforms.</li>
              <li><b>Data Residency & Compliance:</b> Keep data in Microsoft’s trusted environment.</li>
              <li><b>Enterprise-Grade AI Models:</b> Use GPT-class AI with governance and control.</li>
              <li><b>Ongoing Optimization:</b> Tune adoption across teams to drive ROI.</li>
            </ul>

            <p className="ai-split-text">
              Get enterprise AI, secure, intuitive, and deeply integrated into daily operations with
              ALG Data Guard.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7 */}
      <section className="ai-split-wrap ai-observe">
        <div className="ai-split-container">
          <div className="ai-split-content">
            <h2 className="ai-split-title">Industries that Benefit from AI Automation</h2>
            <h3 className="ai-split-subtitle">Tailored Solutions for Your Sector’s Unique Challenges</h3>

            <p className="ai-split-text">
              AI automation delivers significant value across a wide range of industries by addressing
              sector-specific challenges and streamlining critical business processes. In healthcare,
              AI-powered automation simplifies data entry, enhances patient record analysis, and
              optimizes billing. Financial institutions leverage automation for risk management,
              compliance, and portfolio insights. In manufacturing, AI improves supply chain
              management, enables predictive maintenance, and supports quality control.
            </p>
          </div>

          <div className="ai-split-media ai-slide-from-left">
            <img
              className="ai-split-img"
              src={IndustriesThatBenefit}
              alt="Industries"
            />
          </div>
        </div>
      </section>

      {/* SECTION 8 */}
      <section className="ai-split-wrap ai-observe">
        <div className="ai-split-container ai-split-reverse">
          <div className="ai-split-media ai-slide-from-right">
            <img
              className="ai-split-img"
              src={AIAndAutomationAutomationWork}
              alt="AI agents"
            />
          </div>

          <div className="ai-split-content">
            <h2 className="ai-split-title">Automation Work and AI Agents</h2>
            <h3 className="ai-split-subtitle">
              How Digital Workers and AI Agents Transform Your Operations
            </h3>

            <p className="ai-split-text">
              Automation work is evolving with the rise of AI agents—digital workers capable of
              performing both routine tasks and more complex processes with minimal human
              intervention. These AI agents can execute a wide range of activities, from repetitive
              data entry to analyzing large datasets and supporting decision making. By integrating
              AI agents into operations, companies streamline workflows, reduce human error, and
              boost productivity while unlocking actionable insights from unstructured data.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AIAutomationServices;
