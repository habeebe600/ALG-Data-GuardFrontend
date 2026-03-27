import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Services.css";
import "./styles/Service-pages.css";

// Import service icons
import CloudITSolutions from "../../assets/images/services/Cloud-IT-Solutions.png";
import AIandAutomation from "../../assets/images/services/AI-and-Automation.png";
import CyberSecurity from "../../assets/images/services/Cyber-Security.png";
import StrategicITConsulting from "../../assets/images/services/Strategic-IT-Consulting.png";
import NetworkSolutions from "../../assets/images/services/Network-Solutions.png";
import ITSupportService from "../../assets/images/services/IT-Support-Service.png"
import designIcon from "../../assets/images/services/Design-and-Deployment.png";
import auditIcon from "../../assets/images/services/Network-Audit.png";
import strategyIcon from "../../assets/images/services/Business-Strategy.png";
import recruiterIcon from "../../assets/images/services/Technical-recruiter.png";
import supportIcon from "../../assets/images/services/Support-Training.jpg";
import colocationIcon from "../../assets/images/services/Help-finding-ideal-colocation.jpg";
import DataCenterColocationServices from "../../assets/images/services/Data-Center-Colocation-Services.png";
import ConfigurationServicesDeployment from "../../assets/images/services/Configuration-Services-Deployment.png"

const Services = () => {
  const tabs = useMemo(
    () => [
      { key: "managed", label: "MANAGED SERVICES" },
      { key: "infra", label: "INFRASTRUCTURE SERVICES" },
      { key: "other", label: "OTHER SERVICES" },
    ],
    []
  );

  // Add `category` to each service
  const serviceList = useMemo(
    () => [
      // INFRASTRUCTURE SERVICES
      {
        category: "infra",
        title: "Design and Deployment",
        description:
          "Complete network infrastructure design and seamless deployment services tailored to your business needs",
        icon: designIcon,
        link: "/services/design-and-deployment",
        linkLabel: "Explore Design and Deployment",
      },
      {
        category: "infra",
        title: "Configuration Services Deployment",
        description:
          "Deploy new technology confidently with consistent configuration, security-first policies, and rollout support. Reduce setup time, prevent misconfigurations, and deliver a smoother experience for end users.",
        icon: ConfigurationServicesDeployment,
        link: "/services/Configuration-Services-Deployment",
        linkLabel: "Explore Configuration Services Deployment",
      },
      {
        category: "infra",
        title: "Network Audit",
        description:
          "Comprehensive security and performance audits for your network infrastructure to ensure optimal operation",
        icon: auditIcon,
        link: "/services/Network-Audit",
        linkLabel: "Explore Network Audit",
      },
      {
        category: "infra",
        title: "Data Center Colocation",
        description:
          "Colocation strategy that fits your uptime, performance, and growth goals",
        icon: DataCenterColocationServices,
        link: "/services/Data-Center-Colocation-services",
        linkLabel: "Explore Data Center Colocation",
      },
      {
        category: "infra",
        title: "Help finding Ideal Colocation",
        description:
          "Expert guidance in selecting the perfect colocation facility for your infrastructure and business requirements",
        icon: colocationIcon,
        link: "/services/Help-finding-Ideal-Colocation",
        linkLabel: "Explore Help finding Ideal Colocation",
      },

      // MANAGED SERVICES
      {
        category: "managed",
        title: "Cloud IT Solutions",
        description:
          "Get secure cloud backups, smooth migrations, and reliable ongoing support to keep your business connected. Maximize productivity and stay ahead with modern cloud computing.",
        icon: CloudITSolutions,
        link: "/services/cloud-IT-solutions",
        linkLabel: "Explore Cloud IT Solutions",
      },
      {
        category: "managed",
        title: "AI & Automation",
        description: "Boost efficiency with secure AI and automation tools that reduce manual work and improve decision-making. Stay competitive and streamline operations in the digital landscape.",
        icon: AIandAutomation,
        link: "/services/AI-Automation-Services",
        linkLabel: "Explore AI & Automation",
      },
      {
        category: "managed",
        title: "Cyber Security",
      description: "Protect your organization with audits, compliance consulting, incident response, and layered security. Build strong defenses against evolving cyber threats.",
        icon: CyberSecurity,
      link: "/services/Cybersecurity-Services",
        linkLabel: "Explore Cyber Security",
      },
      {
        category: "managed",
        title: "Strategic IT Consulting",
      description: "Plan, implement, and manage IT projects with expert guidance and smart procurement. Simplify your environment and support long-term success.",
        icon: StrategicITConsulting,
      link: "/services/Strategic-IT-Consulting",
        linkLabel: "Explore Strategic IT Consulting",
      },
      {
        category: "managed",
        title: "Network Solutions",
      description: "Enjoy 24/7 network monitoring and routine assessments to identify and fix issues early. Keep your devices secure and running seamlessly.",
        icon: NetworkSolutions,
      link: "/services/Managed-Network-Solutions",
        linkLabel: "Explore Network Solutions",
      },
      {
        category: "managed",
        title: "IT Support Services",
      description: "We minimize downtime with 24/7 helpdesk support and proactive device management. Rely on us for efficient, dependable IT assistance.",
        icon: ITSupportService,
      link: "/services/IT-Managed-Support-Services",
        linkLabel: "Explore IT Support Services",
      },
      {
        category: "managed",
        title: "Support & Training",
        description:
          "Ongoing technical support and comprehensive training programs to empower your team and ensure success",
        icon: supportIcon,
        link: "/services/Support-Training",
        linkLabel: "Explore Support & Training",
      },

      // OTHER SERVICES
      {
        category: "other",
        title: "Business Strategy",
        description:
          "Strategic IT consulting to align technology with your business goals and drive digital transformation",
        icon: strategyIcon,
        link: "/services/Business-Strategy",
        linkLabel: "Explore Business Strategy",
      },
      {
        category: "other",
        title: "Technical Recruiters",
        description:
          "Find and hire top IT talent for your specialized technology needs with our expert recruitment services",
        icon: recruiterIcon,
        link: "/services/Technical-Recruiters",
        linkLabel: "Explore Technical Recruiters",
      },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const filteredServices = useMemo(
    () => serviceList.filter((s) => s.category === activeTab),
    [serviceList, activeTab]
  );

  return (
    <section className="services">
      <div className="services__hero">
        <h1>Services</h1>
      </div>

      <div className="services__lead">
        <p>
          Our team combines deep expertise and attentive insight to deliver solutions
          that address your business’s critical challenges. We proactively navigate a
          dynamic business environment, applying precise strategies and proven methods
          at key moments to ensure lasting results and help your organization achieve
          its goals.
        </p>
      </div>

      {/* TABS (like image 1) */}
      <div className="servicesTabs">
        <div className="servicesTabs__inner">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`servicesTabs__tab ${
                activeTab === t.key ? "active" : ""
              }`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* GRID (filtered by tab) */}
      <div className="services__grid">
        {filteredServices.map((service, idx) => {
          const iconStr = String(service.icon || "");
          const isImg =
            iconStr.includes(".jpg") ||
            iconStr.includes(".jpeg") ||
            iconStr.includes(".png") ||
            iconStr.startsWith("data:image") ||
            iconStr.startsWith("blob:");

          return (
            <div key={idx} className="services__card">
              {isImg ? (
                <img
                  src={service.icon}
                  alt={service.title}
                  className="services__icon-img"
                />
              ) : (
                <span className="services__icon">{service.icon}</span>
              )}

              <h2>{service.title}</h2>
              <p>{service.description}</p>

              <Link to={service.link} className="services__link">
                {service.linkLabel}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
