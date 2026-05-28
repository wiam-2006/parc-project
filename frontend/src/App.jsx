import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home/Home';
import Hero from './components/Hero';
import Activities from './components/Activities';
import ContactSection from './components/Contact/ContactSection';
import ActivitiesSection from './components/Contact/ActivitiesSection';
import Footer from './components/Footer';
import Memberships from './components/Memberships';
import BookingSection from './components/booking/BookingSection';
import ConfirmationSection from './components/booking/ConfirmationSection';
import Restaurant from './components/Restaurant';
import Events from './components/Events';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [bookingData, setBookingData] = useState({ selectedDate: new Date(), adults: 2, children: 0 });

  const handleBookNow = (activity) => {
    setSelectedActivity(activity);
    setCurrentPage('Reservation');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home setCurrentPage={setCurrentPage} onBookActivity={handleBookNow} />;
      case 'Memberships':
        return <Memberships setCurrentPage={setCurrentPage} />;
      case 'Restaurant':
        return <Restaurant />;
      case 'Reservation':
        return (
          <BookingSection 
            selectedActivity={selectedActivity} 
            onConfirm={(data) => {
              setBookingData({ ...data, activity: selectedActivity });
              setCurrentPage('Confirmation');
            }} 
          />
        );
      case 'Confirmation':
        return <ConfirmationSection onBack={() => setCurrentPage('Reservation')} onFinish={() => setCurrentPage('Activities')} bookingData={bookingData} />;
      case 'Activities':
        return <Activities setCurrentPage={setCurrentPage} onBookActivity={handleBookNow} />;
      case 'Events':
        return <Events />;
      case 'Contact Us':
        return (
          <>
            <Hero />
            <ActivitiesSection setCurrentPage={setCurrentPage} />
            <ContactSection />
          </>
        );
      default:
        return <Home setCurrentPage={setCurrentPage} onBookActivity={handleBookNow} />;
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
