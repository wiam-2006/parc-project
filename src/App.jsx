import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home/Home';
import Hero from './components/Hero';
import ContactSection from './components/Contact/ContactSection';
import ActivitiesSection from './components/Contact/ActivitiesSection';
import Footer from './components/Footer';
import Memberships from './components/Memberships';
import BookingSection from './components/booking/BookingSection';
import ConfirmationSection from './components/booking/ConfirmationSection';
import Restaurant from './components/Restaurant';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingData, setBookingData] = useState({ selectedDate: new Date(), adults: 2, children: 0 });

  // ── Home page ──────────────────────────────────────────────────────────────
  if (currentPage === 'Home') {
    return (
      <Home
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home />; // All content removed from Home as requested
      case 'Memberships':
        return <Memberships setCurrentPage={setCurrentPage} />;
      case 'Restaurant':
        return <Restaurant />;
      case 'Reservation':
        return <BookingSection />;
      case 'Confirmation':
        return <ConfirmationSection />;
      case 'Activities':
        return <ActivitiesSection setCurrentPage={setCurrentPage} />;
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
            <Home />
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

  // ── Booking / Confirmation pages ───────────────────────────────────────────
  return (
    <div className="app-container">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Hero />
      {!isConfirmed ? (
        <>
          <SecondarySection />
          <BookingSection onConfirm={(data) => {
            setBookingData(data);
            setIsConfirmed(true);
          }} />
        </>
      ) : (
        <ConfirmationSection
          onBack={() => setIsConfirmed(false)}
          bookingData={bookingData}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
