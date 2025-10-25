import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './styles/MobileMenu.css';

const MobileMenu = ({ 
  onClose, 
  solutionsItems, 
  servicesItems, 
  resourcesItems, 
  aboutItems 
}) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

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
          {/* Solutions */}
          <div className="mobile-menu__section">
            <button 
              className="mobile-menu__section-title"
              onClick={() => toggleMenu('solutions')}
            >
              Solutions
              <svg 
                className={`mobile-menu__arrow ${expandedMenu === 'solutions' ? 'mobile-menu__arrow--open' : ''}`}
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {expandedMenu === 'solutions' && (
              <div className="mobile-menu__items">
                {solutionsItems.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.href} 
                    className="mobile-menu__item"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Services */}
          <div className="mobile-menu__section">
            <button 
              className="mobile-menu__section-title"
              onClick={() => toggleMenu('services')}
            >
              Services
              <svg 
                className={`mobile-menu__arrow ${expandedMenu === 'services' ? 'mobile-menu__arrow--open' : ''}`}
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {expandedMenu === 'services' && (
              <div className="mobile-menu__items">
                {servicesItems.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.href} 
                    className="mobile-menu__item"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Resources */}
          <div className="mobile-menu__section">
            <button 
              className="mobile-menu__section-title"
              onClick={() => toggleMenu('resources')}
            >
              Resources
              <svg 
                className={`mobile-menu__arrow ${expandedMenu === 'resources' ? 'mobile-menu__arrow--open' : ''}`}
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {expandedMenu === 'resources' && (
              <div className="mobile-menu__items">
                {resourcesItems.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.href} 
                    className="mobile-menu__item"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Partners */}
          <Link 
            to="/partners" 
            className="mobile-menu__section-title"
            onClick={onClose}
          >
            Partners
          </Link>

          {/* About */}
          <div className="mobile-menu__section">
            <button 
              className="mobile-menu__section-title"
              onClick={() => toggleMenu('about')}
            >
              About
              <svg 
                className={`mobile-menu__arrow ${expandedMenu === 'about' ? 'mobile-menu__arrow--open' : ''}`}
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {expandedMenu === 'about' && (
              <div className="mobile-menu__items">
                {aboutItems.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.href} 
                    className="mobile-menu__item"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <button className="mobile-menu__cta-btn">
            LET'S MEET
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default MobileMenu;
