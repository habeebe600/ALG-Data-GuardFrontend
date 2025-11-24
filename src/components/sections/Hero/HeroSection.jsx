import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './styles/HeroSection.css';
import heroImage from '../../../assets/images/hero-section/Design-and-Deployment-home.png';
import recruiterImg from '../../../assets/images/hero-section/Technical-recruiter-home.png';
import colocationImg from '../../../assets/images/hero-section/Help-finding-ideal-colocation-home.png';
import auditImg from '../../../assets/images/hero-section/Network-Audit-home.png';
import supportImg from '../../../assets/images/hero-section/Technical-recruiter-home.png';
import strategyImg from '../../../assets/images/hero-section/Business-Strategy-home.png';



const TYPING_TEXTS = ['Consulting Partner', 'Cloud Expert', 'Security Specialist'];

const TYPING_SPEED = 70;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPING = 1200;
const PAUSE_AFTER_DELETING = 500;

const HeroSection = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [typing, setTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  

  useEffect(() => {
    let timeout;
    setShowCursor(true);

    if (typing) {
      // Typing forwards
      if (typed.length < TYPING_TEXTS[index].length) {
        timeout = setTimeout(() => {
          setTyped(TYPING_TEXTS[index].slice(0, typed.length + 1));
        }, TYPING_SPEED);
      } else {
        // Pause, then start deleting after full word is typed
        timeout = setTimeout(() => setTyping(false), PAUSE_AFTER_TYPING);
      }
    } else {
      // Deleting backwards
      if (typed.length > 0) {
        timeout = setTimeout(() => {
          setTyped(TYPING_TEXTS[index].slice(0, typed.length - 1));
        }, DELETING_SPEED);
      } else {
        // Pause, then move to next word and start typing again
        timeout = setTimeout(() => {
          setIndex((idx) => (idx + 1) % TYPING_TEXTS.length);
          setTyping(true);
        }, PAUSE_AFTER_DELETING);
      }
    }

    return () => clearTimeout(timeout);
  }, [typed, typing, index]);

  // Optional: hide cursor after a loop
  useEffect(() => {
    let cursorTimeout;
    if (!typing && typed.length === 0) {
      cursorTimeout = setTimeout(() => setShowCursor(false), 100);
    }
    return () => clearTimeout(cursorTimeout);
  }, [typed, typing]);

  return (
    <div className="hero">
      <div className="hero__background"></div>
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero__text"
        >
        <h1>
          <span className='hero__title'>Your Trusted IT</span>
          <br />
          <span className="hero__title--highlight">
            {typed}
            {showCursor && <span className="hero__typing-cursor">|</span>}
          </span>
        </h1>
        <p>
          Your One-Stop IT Consulting Partner for Leading Technologies.<br />
          Expert Services for Networking, Cloud, Security, and IT Infrastructure
        </p>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero__cta-btn"
            onClick={() => navigate('/contact')}
          >
            GET STARTED
          </motion.button>
        </motion.div>
        
    <div className="hero-image-jumble">
      <img src={heroImage} alt="Hero Visual" className="jumble-img ji-1"/>
  <img src={recruiterImg} alt="Recruiter" className="jumble-img ji-2" />
  <img src={colocationImg} alt="Colocation" className="jumble-img ji-3" />
  <img src={auditImg} alt="Audit" className="jumble-img ji-4" />
  <img src={supportImg} alt="Support" className="jumble-img ji-5" />
  <img src={strategyImg} alt="Strategy" className="jumble-img ji-6" />
</div>

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
      </div>
    
  );
};

export default HeroSection;
