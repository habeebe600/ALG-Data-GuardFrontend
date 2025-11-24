import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Service-pages.css';
import heroBg from '../../assets/images/services/Help-finding-ideal-colocation-page.jpg';

const HelpFindingIdealColocation = () => {
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
        <span className="dd-hero__icon">☁️</span>
        <span>HELP FINDING IDEAL COLOCATION</span>
      </div>
      <h1 className="dd-hero__title">Simplify Infrastructure with<br />Expert Colocation Guidance</h1>
      <p className="dd-hero__lead">
Make smart decisions about your infrastructure with expert recommendations for colocation facilities—ensuring scalability, security, and fit for your evolving business needs.      </p>
      <button className="dd-hero__btn" onClick={() => navigate('/contact')} >MEET OUR EXPERTS TODAY</button>
    </div>
  </section>
    );
};

export default HelpFindingIdealColocation;
