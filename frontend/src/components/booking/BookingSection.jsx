import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, PlusCircle, MinusCircle, User, HeadphonesIcon, Loader2 } from 'lucide-react';
import axios from 'axios'; // 1. استيراد اكسيوس
import './Booking.css';

// --- Validation helpers ---
const isValidName = (v) => v.trim().length >= 2;
const isValidPhone = (v) => /^[+]?[\d\s\-().]{8,20}$/.test(v.trim());
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const BookingSection = ({ onConfirm, selectedActivity }) => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTime, setActiveTime] = useState('09:00');

  // Controlled form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // 2. States للتحكم في حالة الطلب والرسائل
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' });

  // Track which fields have been touched (blurred) for error display
  const [touched, setTouched] = useState({ name: false, phone: false, email: false });

  const errors = useMemo(() => ({
    name: !isValidName(name) ? 'Please enter your full name (at least 2 characters).' : '',
    phone: !isValidPhone(phone) ? 'Please enter a valid phone number.' : '',
    email: !isValidEmail(email) ? 'Please enter a valid email address.' : '',
  }), [name, phone, email]);

  const isFormValid = !errors.name && !errors.phone && !errors.email;

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  // 3. دالة إرسال البيانات للـ Laravel API
  const handleConfirm = () => {
    setTouched({ name: true, phone: true, email: true });
    if (!isFormValid) return;

    // تجميع البيانات لإرسالها بالشكل الصحيح لي كيتوقعو الباكند
    const bookingData = {
      name,
      email,
      phone,
      selectedDate,
      activeTime,
      adults,
      children
    };

    if (onConfirm) {
      onConfirm(bookingData);
    }
  };

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
  };

  const isSelected = (day) => {
    return day === selectedDate.getDate() && currentDate.getMonth() === selectedDate.getMonth() && currentDate.getFullYear() === selectedDate.getFullYear();
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const handleTimeClick = (time) => {
    setActiveTime(time);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Monday as first day

  const calendarDays = [];
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  for (let i = 0; i < startDay; i++) {
    calendarDays.push({ val: daysInPrevMonth - startDay + i + 1, inactive: true });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ val: i, inactive: false, isToday: isToday(i), isSelected: isSelected(i) });
  }

  const times = ['09:00', '11:30', '14:00', '16:30'];

  return (
    <section
      className="booking-section"
      id="abonnement"
      style={{
        borderRadius: '24px',
        margin: '2rem auto'
      }}
    >
      <div className="booking-left">
        <div className="booking-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="booking-title"
          >
            Book your adventure
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="booking-subtitle"
          >
            Dive into the epic. Choose your dates and get ready to experience the Emerald Odyssey at the heart of our legendary facilities.
          </motion.p>
        </div>

        {/* Step 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="step-container"
        >
          <div className="step-header">
            <div className="step-number">1</div>
            <h3 className="step-title">Choose a date</h3>
          </div>
          <div className="calendar-card">
            <div className="calendar-header">
              <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
              <div className="calendar-nav">
                <ChevronLeft size={20} onClick={prevMonth} style={{ cursor: 'pointer' }} />
                <ChevronRight size={20} onClick={nextMonth} style={{ cursor: 'pointer' }} />
              </div>
            </div>
            <div className="calendar-grid">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                <div key={day} className="calendar-day-name">{day}</div>
              ))}
              {calendarDays.map((dayObj, index) => (
                <div
                  key={index}
                  className={`calendar-day ${dayObj.inactive ? 'inactive' : ''} ${dayObj.isSelected ? 'active' : ''} ${dayObj.isToday && !dayObj.isSelected ? 'highlight' : ''}`}
                  onClick={() => !dayObj.inactive && handleDateClick(dayObj.val)}
                >
                  {dayObj.val}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="step-container"
        >
          <div className="step-header">
            <div className="step-number">2</div>
            <h3 className="step-title">Select time</h3>
          </div>
          <div className="time-grid">
            {times.map(time => (
              <button
                key={time}
                className={`time-btn ${activeTime === time ? 'active' : ''}`}
                onClick={() => handleTimeClick(time)}
                disabled={loading}
              >
                {activeTime === time && <Clock size={18} />} {time}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="step-container"
        >
          <div className="step-header">
            <div className="step-number">3</div>
            <h3 className="step-title">Number of people</h3>
          </div>
          <div className="counter-grid">
            <div className="counter-card">
              <div className="counter-info">
                <div className="counter-icon">
                  <User size={20} />
                </div>
                <div>
                  <div className="counter-title">Adults</div>
                  <div className="counter-price">{Number(selectedActivity?.adult_price || 0)}DH / person</div>
                </div>
              </div>
              <div className="counter-controls">
                <button
                  className={`counter-btn ${adults <= 1 ? 'disabled' : ''}`}
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  disabled={adults <= 1 || loading}
                >
                  <MinusCircle size={20} />
                </button>
                <span className="counter-value">{adults}</span>
                <button className="counter-btn" onClick={() => setAdults(adults + 1)} disabled={loading}>
                  <PlusCircle size={20} />
                </button>
              </div>
            </div>

            <div className="counter-card">
              <div className="counter-info">
                <div className="counter-icon" style={{ backgroundColor: '#bcebcf' }}>
                  <User size={20} />
                </div>
                <div>
                  <div className="counter-title">Children</div>
                  <div className="counter-price">{Number(selectedActivity?.child_price || 0)}DH / person</div>
                </div>
              </div>
              <div className="counter-controls">
                <button
                  className={`counter-btn ${children <= 0 ? 'disabled' : ''}`}
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  disabled={children <= 0 || loading}
                >
                  <MinusCircle size={20} />
                </button>
                <span className="counter-value">{children}</span>
                <button className="counter-btn" onClick={() => setChildren(children + 1)} disabled={loading}>
                  <PlusCircle size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="step-container"
        >
          <div className="step-header">
            <div className="step-number">4</div>
            <h3 className="step-title">Your Information</h3>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="booking-name">Full Name <span className="required-star">*</span></label>
              <input
                id="booking-name"
                type="text"
                disabled={loading}
                className={`form-input ${touched.name && errors.name ? 'input-error' : touched.name && !errors.name ? 'input-valid' : ''}`}
                placeholder="Funzone Park Junior"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur('name')}
              />
              {touched.name && errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="booking-phone">Phone <span className="required-star">*</span></label>
              <input
                id="booking-phone"
                type="tel"
                disabled={loading}
                className={`form-input ${touched.phone && errors.phone ? 'input-error' : touched.phone && !errors.phone ? 'input-valid' : ''}`}
                placeholder="+212 6 00 00 00 00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => handleBlur('phone')}
              />
              {touched.phone && errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
            <div className="form-group full">
              <label className="form-label" htmlFor="booking-email">Email <span className="required-star">*</span></label>
              <input
                id="booking-email"
                type="email"
                disabled={loading}
                className={`form-input ${touched.email && errors.email ? 'input-error' : touched.email && !errors.email ? 'input-valid' : ''}`}
                placeholder="funzone@park.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
              />
              {touched.email && errors.email && <span className="field-error">{errors.email}</span>}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="booking-right"
      >
        <div className="summary-container">
          <div className="summary-card">
            <img 
              src={selectedActivity?.image || "/camping.png"} 
              alt={selectedActivity?.title || "Camping at Funzone"} 
              className="summary-img" 
            />
            <div className="summary-content">
              {selectedActivity?.badge && <span className="tag">{selectedActivity.badge}</span>}
              <h3 className="summary-title">{selectedActivity?.title || "Standard Entry"}</h3>
              <div className="stars">
                ★★★★★ <span className="reviews">4.9 (1,200 reviews)</span>
              </div>
              <p className="summary-desc">
                {selectedActivity?.description || "Experience the magic of Funzone Park with this curated adventure designed for all ages."}
              </p>

              <div className="price-breakdown">
                {/* 1. Ticket Calculation & Display logic update */}
                <div className="price-row">
                  <span>Adult Tickets ({adults} x {Number(selectedActivity?.adult_price || 0)}DH)</span>
                  <span style={{ fontWeight: 600 }}>{adults * Number(selectedActivity?.adult_price || 0)}DH</span>
                </div>
                <div className="price-row">
                  <span>Child Tickets ({children} x {Number(selectedActivity?.child_price || 0)}DH)</span>
                  <span style={{ fontWeight: 600 }}>{children * Number(selectedActivity?.child_price || 0)}DH</span>
                </div>
                <div className="price-row total" style={{ marginTop: '1.5rem', borderTop: '2px solid #eee', paddingTop: '1rem' }}>
                  <span>Grand Total</span>
                  <span className="total-price" style={{ color: '#1b5e40', fontSize: '1.5rem' }}>
                    {(adults * Number(selectedActivity?.adult_price || 0)) + (children * Number(selectedActivity?.child_price || 0))}DH
                  </span>
                </div>
              </div>

              {/* 4. عرض رسائل النجاح أو الفشل فوق الزر */}
              {serverMessage.text && (
                <div className={`server-message ${serverMessage.type}`}>
                  {serverMessage.text}
                </div>
              )}

              <button
                className={`confirm-btn ${!isFormValid || loading ? 'confirm-btn-disabled' : ''}`}
                onClick={handleConfirm}
                disabled={loading}
                aria-disabled={!isFormValid || loading}
                title={!isFormValid ? 'Please fill in all required fields correctly.' : undefined}
              >
                {/* تغيير شكل الزر أثناء التحميل */}
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                    <Loader2 className="animate-spin" size={18} /> Processing...
                  </span>
                ) : (
                  'Confirm the booking'
                )}
              </button>
              <div className="secure-payment">
                100% SECURE PAYMENT
              </div>
            </div>
          </div>

          <div className="help-card">
            <h4 className="help-title">Need help?</h4>
            <p className="help-desc">Our team is here to assist you with your reservation.</p>
            <a href="#contact" className="help-link">
              <HeadphonesIcon size={18} /> Contact support
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BookingSection;