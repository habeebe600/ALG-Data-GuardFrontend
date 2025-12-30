import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import './styles/MobileMenu.css';

const MobileMenu = ({
  onClose,
}) => {
  const navigate = useNavigate();

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'tween', duration: 0.3 } },
    exit: { x: '100%', transition: { type: 'tween', duration: 0.3 } }
  };

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="mobile-menu__overlay"
        onClick={onClose}
      />

      {/* Mobile Menu */}
      <motion.div
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="mobile-menu"
      >
        <div className="mobile-menu__content">
          
          

          {/* Services */}
          <Link 
            to="/Services" 
            className="mobile-menu__section-title"
            onClick={onClose}
          >
            Services
          </Link>
          {/* Partners */}
          <Link 
            to="/partners" 
            className="mobile-menu__section-title"
            onClick={onClose}
          >
            Partners
          </Link>
          {/* Partners */}
          <Link 
            to="/About" 
            className="mobile-menu__section-title"
            onClick={onClose}
          >
            About
          </Link>

          {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mobile-menu__cta-btn"
                      onClick={() => navigate('/contact')}
                    >
                      LET'S MEET
                    </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default MobileMenu;
