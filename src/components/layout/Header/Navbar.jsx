import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DropdownMenu from './DropdownMenu';
import MobileMenu from './MobileMenu';
import './styles/Navbar.css';
import logoImageWhite from '../../../assets/images/Logo/White-Logo.png';
import logoImageGreen from '../../../assets/images/Logo/Green-Logo.png';
import { useAuth } from '../../../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesItems = {
    managedServices: [
      { label: 'Cloud IT Solutions', href: '/services/Cloud-IT-Solutions' },
      { label: 'AI & Automation', href: '/services/AI-Automation-Services' },
      { label: 'Cyber Security', href: '/services/Cybersecurity-Services' },
      { label: 'IT Support Services', href: '/services/IT-Managed-Support-Services' },
      { label: 'Support & Training', href: '/services/Support-Training' },
    ],
    infrastructureServices: [
      { label: 'Design and Deployment', href: '/services/Design-and-Deployment' },
      {
        label: 'Configuration Services Deployment',
        href: '/services/Configuration-Services-Deployment',
      },
      { label: 'Network Audit', href: '/services/Network-Audit' },
      { label: 'Network Solutions', href: '/services/Managed-Network-Solutions' },
      {
        label: 'Data Center Colocation',
        href: '/services/Data-Center-Colocation-Services',
      },
      {
        label: 'Help finding Ideal Colocation',
        href: '/services/Help-finding-Ideal-Colocation',
      },
    ],
    ITConsultingAndProfessionalServices: [
      { label: 'Strategic IT Consulting', href: '/services/Strategic-IT-Consulting' },
      { label: 'Business Strategy', href: '/services/Business-Strategy' },
      { label: 'Cloud Consulting', href: '/services/Cloud-Consulting' },
      { label: 'Cybersecurity Consulting', href: '/services/Cybersecurity-Consulting' },
      { label: 'Infrastructure Consulting', href: '/services/Infrastructure-Consulting' },
      { label: 'Digital Transformation', href: '/services/Digital-Transformation' },
      { label: 'Implementation Services', href: '/services/Implementation-Services' },
    ],
    TalentServices: [
      { label: 'Technical Recruiters', href: '/services/Technical-Recruiters' },
    ],
  };

  const isAdmin = user?.role === 'ADMIN';
  const isMember = user?.role === 'MEMBER';

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__container">
        <Link to="/" className="navbar__logo">
          <img
            src={isScrolled ? logoImageGreen : logoImageWhite}
            className="navbar__logo-img"
            alt="ALG Data Guard"
          />
          <p className="logo-name">ALG Data Guard</p>
        </Link>

        <div className="navbar__menu">

                      <Link to="/" className="navbar__link">Home</Link>

          <DropdownMenu title="Services" items={servicesItems} />

          <Link to="/Partners" className="navbar__link">
            Partners
          </Link>

          <Link to="/About" className="navbar__link">
            About
          </Link>

          <Link to="/blogs" className="navbar__link">
            Blogs & Resources
          </Link>
        </div>

        <div className="navbar__actions">
          {!user ? (
            <div className="navbar__auth-cta">
              <button
                type="button"
                className="navbar__auth-btn navbar__auth-btn--ghost"
                onClick={() => navigate('/login')}
              >
                Login
              </button>

              <button
                type="button"
                className="navbar__auth-btn navbar__auth-btn--solid"
                onClick={() => navigate('/register')}
              >
                Sign up
              </button>
            </div>
          ) : (
            <div className="navbar__auth-cta">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="navbar__cta-btn"
                onClick={() => navigate('/contact')}
              >
                LET&apos;S MEET
              </motion.button>

              <div className="navbar__user">
                <button className="navbar__user-btn" aria-label="User menu">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="navbar__icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>

                <div className="navbar__user-dropdown">
                  {isAdmin && <Link to="/admin">Admin Panel</Link>}

                  {isAdmin && <Link to="/admin/blogs/questions">Manage Q&A</Link>}

                  {isMember && <Link to="/member/blogs">Manage My Blogs</Link>}
                  {isMember && <Link to="/member/blogs/questions">Manage Q&A</Link>}


                  <Link
                    to={isAdmin ? '/admin/knowledge-base' : '/knowledge-base'}
                  >
                    Knowledge Base
                  </Link>

                  <Link to="/settings">Account settings</Link>
                  <Link to="/tickets">Support Tickets</Link>

                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            className="navbar__mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="navbar__icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={() => setIsMobileMenuOpen(false)}
            servicesItems={servicesItems}
            user={user}
            handleLogout={handleLogout}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;