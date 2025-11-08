import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LogoShowcaseSection.css';
import fullLogo from '../../../assets/images/Logo/full-logo.png';

const LogoShowcaseSection = () => {
  const navigate = useNavigate();
  return (
    <section className="logo-showcase">
      <div className="logo-showcase__container">
        {/* Left Side - Large Logo */}
        <div className="logo-showcase__logo-side">
          <img 
            src={fullLogo} 
            alt="ALG Data Guard Logo" 
            className="logo-showcase__logo-image"
          />
        </div>

        {/* Right Side - Content */}
        <div className="logo-showcase__content-side">
          <h2 className="logo-showcase__title">
            Wide breadth. Precision focus.
          </h2>
          <p className="logo-showcase__description">
            Our expertise runs the gamut of mission-critical services. We keep a watchful eye on the broad and complex landscape of your unique business needs, always deploying the right tactics at the right times for the most effective outcome.
          </p>
          <button className="logo-showcase__cta" onClick={() => navigate('/services')}>
            OUR SERVICES
            <span className="logo-showcase__cta-arrow">▶</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LogoShowcaseSection;
