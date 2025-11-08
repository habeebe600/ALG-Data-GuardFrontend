import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Header/Navbar';
import './App.css';

// Import pages (you'll create these later)
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Footer from './components/layout/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';

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
