import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Service-pages.css';
import heroBg from '../../assets/images/services/Business-Strategy-page.png'; // update path as per your src

const BusinessStrategy = () => {
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
        <span className="dd-hero__icon">📈</span>
        <span>BUSINESS STRATEGY</span>
      </div>
      <h1 className="dd-hero__title">Transform Your Business with<br />Strategic IT Consulting</h1>
      <p className="dd-hero__lead">
Align technology investments with business goals to drive smart digital transformation and sustainable outcomes using data-driven consulting and expert insights.      </p>
      <button className="dd-hero__btn" onClick={() => navigate('/contact')} >MEET OUR EXPERTS TODAY</button>
    </div>
  </section>
    );
};

export default BusinessStrategy;
