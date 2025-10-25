import React from 'react';
import { Link } from 'react-router-dom';
import './styles/CTASection.css';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="cta-section__container">
        <div className="cta-section__card">
          <h2 className="cta-section__title">Engage with an Expert</h2>
          <p className="cta-section__description">
            At the core of everything we do is human contact — just one person talking to another. 
            Give us a call or send an email and let's meet the future together.
          </p>
          <Link to="/contact" className="cta-section__button">
            LET'S MEET
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
