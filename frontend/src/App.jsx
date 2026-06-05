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
import EventsPage from './components/EventsPage';
import AboutPage from './components/AboutPage';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState(() =>
    window.location.pathname.startsWith('/admin') ? 'Admin' : 'Home'
  );
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [bookingData, setBookingData] = useState({ selectedDate: new Date(), adults: 2, children: 0 });

  const navigatePage = (page) => {
    if (page === 'Admin') {
      window.history.pushState({}, '', '/admin');
    } else if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState({}, '', '/');
    }
    setCurrentPage(page);
  };

  const handleBookNow = (activity) => {
    setSelectedActivity(activity);
    navigatePage('Reservation');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Admin':
        return <AdminDashboard onExit={() => navigatePage('Home')} />;
      case 'Home':
        return <Home setCurrentPage={navigatePage} onBookActivity={handleBookNow} />;
      case 'Memberships':
        return <Memberships setCurrentPage={navigatePage} />;
      case 'Restaurant':
        return <Restaurant />;
      case 'Reservation':
        return (
          <BookingSection
            selectedActivity={selectedActivity}
            onConfirm={(data) => {
              setBookingData({ ...data, activity: selectedActivity });
              navigatePage('Confirmation');
            }}
          />
        );
      case 'Confirmation':
        return <ConfirmationSection onBack={() => navigatePage('Reservation')} onFinish={() => navigatePage('Activities')} bookingData={bookingData} />;
      case 'Activities':
        return <Activities setCurrentPage={navigatePage} onBookActivity={handleBookNow} />;
      case 'Events':
        return <EventsPage />;
      case 'About Us':
        return <AboutPage />;
      case 'Contact Us':
        return (
          <>
            <Hero />
            <ActivitiesSection setCurrentPage={navigatePage} />
            <ContactSection />
          </>
        );
      default:
        return <Home setCurrentPage={navigatePage} onBookActivity={handleBookNow} />;
    }
  };

  return (
    <div className="app">
      {currentPage !== 'Admin' && <Header currentPage={currentPage} setCurrentPage={navigatePage} />}
      <main>
        {renderPage()}
      </main>
      {currentPage !== 'Home' && currentPage !== 'Admin' && <Footer />}
    </div>
  );
}

export default App;
