import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './styles/ServicesSection.css';

// Import your service icons
import designIcon from '../../../assets/images/services/Design-and-Deployment.jpg';
import auditIcon from '../../../assets/images/services/Network-Audit.jpg';
import strategyIcon from '../../../assets/images/services/Business-Strategy.jpg';
import recruiterIcon from '../../../assets/images/services/Technical-recruiter.jpg';
import supportIcon from '../../../assets/images/services/Support-Training.jpg';
import colocationIcon from '../../../assets/images/services/Help-finding-ideal-colocation.jpg';

const ServicesSection = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const services = [
    {
      title: "Design and Deployment",
      description: "Complete network infrastructure design and seamless deployment services tailored to your business needs",
      icon: designIcon
    },
    {
      title: "Network Audit",
      description: "Comprehensive security and performance audits for your network infrastructure to ensure optimal operation",
      icon: auditIcon
    },
    {
      title: "Business Strategy",
      description: "Strategic IT consulting to align technology with your business goals and drive digital transformation",
      icon: strategyIcon
    },
    {
      title: "Technical Recruiters",
      description: "Find and hire top IT talent for your specialized technology needs with our expert recruitment services",
      icon: recruiterIcon
    },
    {
      title: "Support & Training",
      description: "Ongoing technical support and comprehensive training programs to empower your team and ensure success",
      icon: supportIcon
    },
    {
      title: "Help finding Ideal Colocation",
      description: "Expert guidance in selecting the perfect colocation facility for your infrastructure and business requirements",
      icon: colocationIcon
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollHeight = container.scrollHeight - window.innerHeight;
      
      // Check if section is in view
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        // Section is "stuck" - calculate horizontal scroll progress
        const progress = Math.abs(rect.top) / scrollHeight;
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate horizontal translation
  const maxScroll = (services.length * 440) - window.innerWidth + 200;
  const translateX = -scrollProgress * maxScroll;

  return (
    <div ref={containerRef} className="services-wrapper">
      <div className="services-sticky-container">
        <div className="services-header">
          <h2 className="services-title">Our Services</h2>
          <p className="services-subtitle">Comprehensive IT solutions for your business</p>
        </div>
        
        <div className="services-track-wrapper">
          <div 
            className="services-track"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="service-icon-wrapper">
                  <img src={service.icon} alt={service.title} className="service-icon" />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <button className="service-btn">Learn More</button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="scroll-indicator">
          <div 
            className="scroll-progress-bar"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;