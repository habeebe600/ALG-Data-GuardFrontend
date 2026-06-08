import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import './styles/MobileMenu.css';

const MobileMenu = ({ onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isAdmin = user?.role === 'ADMIN';
  const isMember = user?.role === 'MEMBER';

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'tween', duration: 0.3 } },
    exit: { x: '100%', transition: { type: 'tween', duration: 0.3 } },
  };

  const go = (path) => {
    onClose?.();
    navigate(path);
  };

  const handleLogout = async () => {
    await logout();
    onClose?.();
    navigate('/login');
  };

  return (
    <>
      <div className="mobile-menu__overlay" onClick={onClose} />

      <motion.aside
        className="mobile-menu"
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="mobile-menu__content">
          <div className="mobile-menu__section">
            <Link to="/services" className="mobile-menu__section-title" onClick={onClose}>
              Services
            </Link>
            <div className="mobile-menu__items">
              <Link
                to="/services/Cloud-IT-Solutions"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Cloud IT Solutions
              </Link>
              <Link
                to="/services/AI-Automation-Services"
                className="mobile-menu__item"
                onClick={onClose}
              >
                AI & Automation
              </Link>
              <Link
                to="/services/Cybersecurity-Services"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Cyber Security
              </Link>
              <Link
                to="/services/IT-Managed-Support-Services"
                className="mobile-menu__item"
                onClick={onClose}
              >
                IT Support Services
              </Link>
              <Link
                to="/services/Support-Training"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Support & Training
              </Link>
              <Link
                to="/services/Design-and-Deployment"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Design and Deployment
              </Link>
              <Link
                to="/services/Configuration-Services-Deployment"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Configuration Services Deployment
              </Link>
              <Link
                to="/services/Network-Audit"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Network Audit
              </Link>
              <Link
                to="/services/Managed-Network-Solutions"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Network Solutions
              </Link>
              <Link
                to="/services/Data-Center-Colocation-Services"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Data Center Colocation
              </Link>
              <Link
                to="/services/Help-finding-Ideal-Colocation"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Help finding Ideal Colocation
              </Link>
              <Link
                to="/services/Strategic-IT-Consulting"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Strategic IT Consulting
              </Link>
              <Link
                to="/services/Business-Strategy"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Business Strategy
              </Link>
              <Link
                to="/services/Cloud-Consulting"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Cloud Consulting
              </Link>
              <Link
                to="/services/Cybersecurity-Consulting"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Cybersecurity Consulting
              </Link>
              <Link
                to="/services/Infrastructure-Consulting"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Infrastructure Consulting
              </Link>
              <Link
                to="/services/Digital-Transformation"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Digital Transformation
              </Link>
              <Link
                to="/services/Implementation-Services"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Implementation Services
              </Link>
              <Link
                to="/services/Technical-Recruiters"
                className="mobile-menu__item"
                onClick={onClose}
              >
                Technical Recruiters
              </Link>
            </div>
          </div>

          <div className="mobile-menu__section">
            <Link to="/Partners" className="mobile-menu__section-title" onClick={onClose}>
              Partners
            </Link>
          </div>

          <div className="mobile-menu__section">
            <Link to="/About" className="mobile-menu__section-title" onClick={onClose}>
              About
            </Link>
          </div>

          <div className="mobile-menu__section">
            <Link to="/blogs" className="mobile-menu__section-title" onClick={onClose}>
              Blogs & Resources
            </Link>
          </div>

          {!user ? (
            <div className="mobile-menu__auth">
              <button
                type="button"
                className="mobile-menu__auth-btn mobile-menu__auth-btn--ghost"
                onClick={() => go('/login')}
              >
                Login
              </button>
              <button
                type="button"
                className="mobile-menu__auth-btn mobile-menu__auth-btn--solid"
                onClick={() => go('/register')}
              >
                Sign up
              </button>
            </div>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mobile-menu__cta-btn"
                onClick={() => go('/contact')}
              >
                LET&apos;S MEET
              </motion.button>

              <div className="mobile-menu__section mobile-menu__account">
                {isAdmin && (
                  <Link to="/admin" className="mobile-menu__item" onClick={onClose}>
                    Admin Panel
                  </Link>
                )}

                {isAdmin && (
                  <Link
                    to="/admin/blogs/questions"
                    className="mobile-menu__item"
                    onClick={onClose}
                  >
                    Manage Q&amp;A
                  </Link>
                )}

                {isMember && (
                  <Link to="/member/blogs" className="mobile-menu__item" onClick={onClose}>
                    Manage My Blogs
                  </Link>
                )}

                {isMember && (
                  <Link
                    to="/member/blogs/questions"
                    className="mobile-menu__item"
                    onClick={onClose}
                  >
                    Manage Q&amp;A
                  </Link>
                )}

                <Link
                  to={isAdmin ? '/admin/knowledge-base' : '/knowledge-base'}
                  className="mobile-menu__item"
                  onClick={onClose}
                >
                  Knowledge Base
                </Link>

                <Link to="/settings" className="mobile-menu__item" onClick={onClose}>
                  Settings
                </Link>

                <Link to="/tickets" className="mobile-menu__item" onClick={onClose}>
                  Support Tickets
                </Link>

                <button
                  type="button"
                  className="mobile-menu__logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default MobileMenu;