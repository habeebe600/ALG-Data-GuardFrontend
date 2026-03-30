import React from 'react';
import HeroSection from '../../components/sections/Hero/HeroSection';
import ServicesSection from '../../components/sections/Services/ServicesSection';
import LogoShowcaseSection from '../../components/sections/LogoShowcase/LogoShowcaseSection';
import CTASection from '../../components/sections/CTA/CTASection';
import HomeBlogsSection from "../Blogs/HomeBlogsSection";
import './styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <HeroSection />
      <ServicesSection />
      <LogoShowcaseSection />
      <HomeBlogsSection />
      <CTASection />
    </div>
  );
};

export default Home;
