import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Service-pages.css';
import heroBg from '../../assets/images/services/Technical-recruiter-page.jpg'; // update path as per your src

const TechnicalRecruiter = () => {
    const navigate = useNavigate();
    return (
  <section className="dd-hero" style={{ backgroundImage: `url(${heroBg})` }}>
    <div className="dd-hero__overlay">
      <nav className="dd-hero__breadcrumbs">
        <button className="logo-showcase__cta" onClick={() => navigate('/services')}>
            <span className="logo-showcase__cta-arrow">&#x25C0;</span>
            OUR SERVICES
          </button>
      </nav>
      <div className="dd-hero__service-label">
        <span className="dd-hero__icon">👩‍💻</span>
        <span>TECHNICAL RECRUITERS</span>
      </div>
      <h1 className="dd-hero__title">Accelerate Your Team<br />with Specialized IT Talent</h1>
      <p className="dd-hero__lead">
Find and onboard top-tier technology professionals to support your specialized needs, leveraging targeted recruitment and industry expertise.      </p>
      <button className="dd-hero__btn" onClick={() => navigate('/contact')} >MEET OUR EXPERTS TODAY</button>
    </div>
  </section>
    );
};

export default TechnicalRecruiter;
