import React from 'react';
import './styles/Services.css';


// Import your service icons
import designIcon from '../../assets/images/services/Design-and-Deployment.jpg';
import auditIcon from '../../assets/images/services/Network-Audit.jpg';
import strategyIcon from '../../assets/images/services/Business-Strategy.jpg';
import recruiterIcon from '../../assets/images/services/Technical-recruiter.jpg';
import supportIcon from '../../assets/images/services/Support-Training.jpg';
import colocationIcon from '../../assets/images/services/Help-finding-ideal-colocation.jpg';

const serviceList = [
  {
    title: "Design and Deployment",
    description: "Complete network infrastructure design and seamless deployment services tailored to your business needs",
    icon: designIcon,
    link: "#",
    linkLabel: "Explore Design and Deployment"
  },
  {
    title: "Network Audit",
    description: "Comprehensive security and performance audits for your network infrastructure to ensure optimal operation",
    icon: auditIcon,
    link: "#",
    linkLabel: "Explore Network Audit"
  },
  {
    title: "Business Strategy",
    description: "Strategic IT consulting to align technology with your business goals and drive digital transformation",
    icon: strategyIcon,
    link: "#",
    linkLabel: "Explore Business Strategy"
  },
  {
    title: "Technical Recruiters",
    description: "Find and hire top IT talent for your specialized technology needs with our expert recruitment services",
    icon: recruiterIcon,
    link: "#",
    linkLabel: "Explore Technical Recruiters"
  },
  {
    title: "Support & Training",
    description: "Ongoing technical support and comprehensive training programs to empower your team and ensure success",
    icon: supportIcon,
    link: "#",
    linkLabel: "Explore Support & Training"
  },
  {
    title: "Help finding Ideal Colocation",
    description: "Expert guidance in selecting the perfect colocation facility for your infrastructure and business requirements",
    icon: colocationIcon,
    link: "#",
    linkLabel: "Explore Help finding Ideal Colocation"
  },
];

const Services = () => (
  <section className="services">
    <div className="services__hero"><h1>Services</h1></div>
    <div className="services__lead">
      <p>
        Our team combines deep expertise and attentive insight to deliver solutions that address your business’s critical challenges. We proactively navigate a dynamic business environment, applying precise strategies and proven methods at key moments to ensure lasting results and help your organization achieve its goals.
      </p>
    </div>
    <div className="services__grid">
      {serviceList.map((service, idx) => (
        <div key={idx} className="services__card">
          {service.icon && String(service.icon).includes('jpg') || String(service.icon).startsWith('data:image') ? (
            <img src={service.icon} alt={service.title} className="services__icon-img" />
          ) : (
            <span className="services__icon">{service.icon}</span>
          )}


          <h2>{service.title}</h2>
          <p>{service.description}</p>
          <a className="services__link" href={service.link}>{service.linkLabel}</a>
        </div>
      ))}
    </div>
  </section>
);

export default Services;
