import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CTASection.css';

const CTASection = () => {
    const navigate = useNavigate();

  return (
    <section className="partnersMeet">
        <div className="partnersMeet__overlay" />
        <div className="partnersMeet__content">
          <h1 className="partnersMeet__title">Let’s Meet</h1>
          <p className="partnersMeet__text">
            For more information about working with ALG Data Guard, give us a call or send us an email.
            We’re here to help in any way.
          </p>
          <button className="partnersBtn partnersBtn--orange" onClick={() => navigate("/contact")}>
            ENGAGE WITH AN EXPERT
          </button>
        </div>
      </section>
  );
};

export default CTASection;
