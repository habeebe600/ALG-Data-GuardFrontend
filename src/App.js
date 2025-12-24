import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Header/Navbar';
import './App.css';

// Import pages
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Footer from './components/layout/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import DesignAndDeployment from './pages/Services/Design-and-Deployment'
import BusinessStrategy from './pages/Services/Business-Strategy'
import NetworkAudit from './pages/Services/Network-Audit'
import HelpFindingIdealColocation from './pages/Services/Help-finding-Ideal-Colocation'
import SupportTraining from './pages/Services/Support-Training'
import TechnicalRecruiters from './pages/Services/Technical-Recruiters'
import CloudSolutionsPage from './pages/Services/CloudSolutionsPage';
import CybersecurityServices from './pages/Services/CybersecurityServices'

function App() {
  
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar />
        
        {/* Main content area */}
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/Design-and-Deployment" element={<DesignAndDeployment />} />
            <Route path="/services/Business-Strategy" element={<BusinessStrategy />} />
            <Route path="/services/Network-Audit" element={<NetworkAudit />} />
            <Route path="/services/Help-finding-Ideal-Colocation" element={<HelpFindingIdealColocation />} />
            <Route path="/services/Support-Training" element={<SupportTraining />} />
            <Route path="/services/Technical-Recruiters" element={<TechnicalRecruiters />} />
            <Route path="/services/Cloud-IT-Solutions" element={<CloudSolutionsPage />} />
            <Route path="/services/Cybersecurity-Services" element={<CybersecurityServices />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about/*" element={<About />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
