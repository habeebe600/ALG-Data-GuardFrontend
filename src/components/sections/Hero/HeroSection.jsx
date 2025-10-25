import React from 'react';
import { motion } from 'framer-motion';
import './styles/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      {/* Background Image with Overlay */}
      <div className="hero__background">
        <div className="hero__overlay"></div>
      </div>

      {/* Content */}
      <div className="hero__content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero__text"
        >
          <h1 className="hero__title">
            Your Trusted IT
            <span className="hero__title--highlight"> Consulting Partner</span>
          </h1>
          
          <p className="hero__description">
            Your One-Stop IT Consulting Partner for Leading Technologies.
            Expert Services for Networking, Cloud, Security, and IT Infrastructure
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero__cta-btn"
          >
            GET STARTED
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="hero__scroll-indicator"
      >
        <div className="hero__scroll-line"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
