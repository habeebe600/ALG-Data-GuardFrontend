import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DropdownMenu from './DropdownMenu';
import MobileMenu from './MobileMenu';
import './styles/Navbar.css';
import logoImageWhite from '../../../assets/images/Logo/White-Logo.png';
import logoImageGreen from '../../../assets/images/Logo/Green-Logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navigate = useNavigate();
  const servicesItems = {
  managedServices: [
    { label: "Cloud IT Solutions", href: "/services/cloud-IT-solutions" }, // your new page
    { label: "AI & Automation", href: "/services/AI-Automation-Services" }, // your new page
    { label: "Cyber Security", href: "/services/Cybersecurity-Services" }, // your new page
    { label: "Strategic IT Consulting", href: "/services/Strategic-IT-Consulting" }, // your new page
    { label: "Network Solutions", href: "/services/Managed-Network-Solutions" }, // your new page
    { label: "IT Support Services", href: "/services/IT-Managed-Support-Services" }, // your new page
    { label: "Support & Training", href: "/services/Support-Training" }, // your new page
  ],

  infrastructureServices: [
    { label: "Design and Deployment", href: "/services/Design-and-Deployment" },
    { label: "Configuration Services Deployment", href: "/services/Configuration-Services-Deployment" },
    { label: "Network Audit", href: "/services/Network-Audit" },
    { label: "Data Center Colocation", href: "/services/Data-Center-Colocation-services" },
    { label: "Help finding Ideal Colocation", href: "/services/Help-finding-Ideal-Colocation" },
  ],

  otherServices: [
    { label: "Business Strategy", href: "/services/Business-Strategy" },
    { label: "Technical Recruiters", href: "/services/Technical-Recruiters" },
  ],
};

  /*const solutionsItems = [
    { label: 'Solutions By Need', href: '/solutions/by-need' },
    { label: 'Solutions By Industry', href: '/solutions/by-industry' },
    { label: 'Solutions By Function', href: '/solutions/by-function' },
  ];


  const resourcesItems = [
    { label: 'Knowledge Center', href: '/resources/knowledge-center' },
    { label: 'Events', href: '/resources/events' },
    { label: 'Blog', href: '/resources/blog' },
    { label: 'News', href: '/resources/news' },
  ];

  const aboutItems = [
    { label: 'Who We Are', href: '/about/who-we-are' },
    { label: 'Leadership', href: '/about/leadership' },
    { label: 'Careers', href: '/about/careers' },
    { label: 'Press Kit', href: '/about/press-kit' },
  ];*/

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img 
            src={isScrolled ? logoImageGreen : logoImageWhite}
            className="navbar__logo-img" alt='ALG Data Guard'
          />
          <p className="logo-name"> ALG Data Guard</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar__menu">
          {/*<Link to="/services" className="navbar__link">
            Services
          </Link>
          <DropdownMenu title="Resources" items={resourcesItems} />
          <DropdownMenu title="About" items={aboutItems} />*/}
          <DropdownMenu title="Services" items={servicesItems} />
          <Link to="/Partners" className="navbar__link">
            Partners
          </Link>
          <Link to="/About" className="navbar__link">
            About
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="navbar__actions">
          {/* Search Icon 
          <button className="navbar__search-btn" aria-label="Search">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </button>*/}

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="navbar__cta-btn"
            onClick={() => navigate('/contact')}
          >
            LET'S MEET
          </motion.button>
        
          {/* Mobile Menu Toggle */}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu 
            onClose={() => setIsMobileMenuOpen(false)}
            /*solutionsItems={solutionsItems}
            servicesItems={servicesItems}
            resourcesItems={resourcesItems}
            aboutItems={aboutItems}*/
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
