import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Footer.css';
import logoImage from '../../../assets/images/Logo/Green-Logo.png';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 300px
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__container">
          {/* Column 1 - Company Info & Contact */}
          <div className="footer__column footer__column--company">
            <Link to="/" className="footer__logo">
              <img src={logoImage} alt="ALG Data Guard" className="footer__logo-img" />
              <span className="footer__logo-text">ALG Data Guard</span>
            </Link>
            <address className="footer__address">
              <p>16, 7171 Torbram Road,</p>
              <p>Mississauga, ON L4T 3W4</p>
            </address>
            <Link to="/contact" className="footer__contact-btn">
              CONTACT US
              <span className="footer__arrow">▶</span>
            </Link>
            <p className="footer__tagline">
              Get in Touch for a Customized IT Strategy Today!
            </p>
            <div className="footer__contact-info">
              <a href="mailto:sales@algdataguard.com" className="footer__contact-link">
                📧 sales@algdataguard.com
              </a>
              <a href="tel:+14452849083" className="footer__contact-link">
                📞 +14452849083
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="footer__column">
            <h3 className="footer__column-title">QUICKLINKS</h3>
            <nav className="footer__nav">
              <Link to="/solutions" className="footer__link">Solutions By Need</Link>
              <Link to="/solutions" className="footer__link">Solutions By Industry</Link>
              <Link to="/solutions" className="footer__link">Solutions By Function</Link>
              <Link to="/services" className="footer__link">Services</Link>
              <Link to="/resources" className="footer__link">Knowledge Center</Link>
              <Link to="/events" className="footer__link">Events</Link>
              <Link to="/login" className="footer__link">Login</Link>
            </nav>
          </div>

          {/* Column 3 - About */}
          <div className="footer__column">
            <h3 className="footer__column-title">ABOUT</h3>
            <nav className="footer__nav">
              <Link to="/about/who-we-are" className="footer__link">Who We Are</Link>
              <Link to="/resources/news" className="footer__link">News</Link>
              <Link to="/blog" className="footer__link">Blog</Link>
              <Link to="/partners" className="footer__link">Partners</Link>
              <Link to="/about/leadership" className="footer__link">Leadership</Link>
              <Link to="/about/careers" className="footer__link">Careers</Link>
              <Link to="/about/press-kit" className="footer__link">Press Kit</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-container">
          <div className="footer__bottom-left">
            <p className="footer__copyright">
              © ALG Data Guard 2025. All Rights Reserved
            </p>
            <div className="footer__legal-links">
              <Link to="/terms" className="footer__legal-link">Terms & Conditions</Link>
              <Link to="/privacy" className="footer__legal-link">Privacy Policy</Link>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="footer__social">
            <a 
              href="https://linkedin.com/in/alg-dataguard-48838a37a" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer__social-link"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="footer__social-icon">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://x.com/ALGDataguard" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer__social-link"
              aria-label="Twitter"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="footer__social-icon">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="https://youtube.com/@algdataguard" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer__social-link"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="footer__social-icon">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Tagline */}
        <div className="footer__tagline-bottom">
          <p>We look forward to partnering with you and supporting the growth of your business. Let's achieve success together!</p>
        </div>
      </div>

      {/* Scroll to Top Button - Only visible when scrolled */}
      <button 
        onClick={scrollToTop}
        className={`footer__scroll-top ${showScrollTop ? 'footer__scroll-top--visible' : ''}`}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;
