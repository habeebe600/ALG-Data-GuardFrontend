import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext'; // adjust path if needed
import './styles/MobileMenu.css';

const MobileMenu = ({ onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'tween', duration: 0.3 } },
    exit: { x: '100%', transition: { type: 'tween', duration: 0.3 } }
  };

  const go = (path) => {
    onClose?.();
    navigate(path);
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
          {/* Main links */}
          <Link to="/services" className="mobile-menu__section-title" onClick={onClose}>
            Services
          </Link>

          <Link to="/partners" className="mobile-menu__section-title" onClick={onClose}>
            Partners
          </Link>

          <Link to="/about" className="mobile-menu__section-title" onClick={onClose}>
            About
          </Link>

        
          {/* Auth/CTA logic */}
          {!user ? (
            <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="mobile-menu__cta-btn"
                onClick={() => go('/login')}
              >
                Login
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                className="mobile-menu__cta-btn"
                onClick={() => go('/register')}
              >
                Sign up
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mobile-menu__cta-btn"
              onClick={() => go('/contact')}
            >
              LET&apos;S MEET
            </motion.button>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default MobileMenu;
