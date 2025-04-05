import React from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Team from './pages/Team';
import Insights from './pages/Insights';
import { Market } from './pages/Market';
import Charts from './pages/Charts';
import Portfolio from './pages/Portfolio';
import PortfolioDetails from './pages/PortfolioDetails';

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-dark text-light"
    >
      <Hero />
      <Features />
      <HowItWorks />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </motion.div>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const hideNavbarRoutes = [
    '/market',
    '/charts',
    '/portfolio',
    '/portfolio/details',
    '/team', 
    '/insights',
    '/login',
    '/signup',

  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      {children}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/team" element={<Team />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/market" element={<Market />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/details" element={<PortfolioDetails />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;









