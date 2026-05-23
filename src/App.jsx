import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ContactSection from './components/ContactSection';
import ActivitiesSection from './components/ActivitiesSection';
import Footer from './components/Footer';
import Memberships from './components/Memberships';
import Restaurant from './components/Restaurant';
import Activities from './components/Activities';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return null; // All content removed from Home as requested
      case 'Memberships':
        return <Memberships setCurrentPage={setCurrentPage} />;
      case 'Restaurant':
        return <Restaurant />;
      case 'Activities':
        return <Activities setCurrentPage={setCurrentPage} />;
      case 'Contact Us':
        return (
          <>
            <Hero />
            <ActivitiesSection setCurrentPage={setCurrentPage} />
            <ContactSection />
          </>
        );
      default:
        return (
          <>
            <Hero />
            <ActivitiesSection setCurrentPage={setCurrentPage} />
          </>
        );
    }
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      {currentPage !== 'Home' && <Footer />}
    </div>
  );
}

export default App;
