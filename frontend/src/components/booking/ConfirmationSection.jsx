import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Ticket, CreditCard, ChevronDown, AlertCircle, ArrowRight, MapPin, Star, Shield, Lock, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import './ConfirmationSection.css';

// --- Validation helpers ---
const isValidCardNumber = (v) => /^\d{13,19}$/.test(v.replace(/\s/g, ''));
const isValidExpiry = (v) => {
  const match = v.match(/^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/);
  if (!match) return false;
  const now = new Date();
  const year = 2000 + parseInt(match[2], 10);
  const month = parseInt(match[1], 10);
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
};
const isValidCVV = (v) => /^\d{3,4}$/.test(v.trim());
const isNotEmpty = (v) => v.trim().length >= 2;
const isValidPostal = (v) => /^[a-zA-Z0-9\s\-]{4,10}$/.test(v.trim());

const ConfirmationSection = ({ onBack, onFinish, bookingData }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('online'); // 'online' or 'local'

  const { selectedDate, adults, children, activity, name, email, phone, activeTime } = bookingData || {
    selectedDate: new Date(), adults: 2, children: 0, activity: null
  };
  const totalTickets = adults + children;

  // Format date: "15 May, 2026"
  const formattedDate = selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const adultPrice = Number(activity?.adult_price || 0);
  const childPrice = Number(activity?.child_price || 0);

  // --- Payment form state ---
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  // --- Billing form state ---
  const [billName, setBillName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');

  const [touched, setTouched] = useState({});
  const touch = (field) => setTouched((p) => ({ ...p, [field]: true }));

  const errors = useMemo(() => ({
    cardNumber: (paymentMethod === 'online' && !isValidCardNumber(cardNumber)) ? 'Enter a valid card number (13–19 digits).' : '',
    expiry: (paymentMethod === 'online' && !isValidExpiry(expiry)) ? 'Enter a valid expiry date (MM/YY).' : '',
    cvv: (paymentMethod === 'online' && !isValidCVV(cvv)) ? 'CVV must be 3 or 4 digits.' : '',
    billName: !isNotEmpty(billName) ? 'Full name is required.' : '',
    street: !isNotEmpty(street) ? 'Street address is required.' : '',
    city: !isNotEmpty(city) ? 'City is required.' : '',
    postal: !isValidPostal(postal) ? 'Enter a valid postal code.' : '',
  }), [cardNumber, expiry, cvv, billName, street, city, postal, paymentMethod]);

  const isFormValid = Object.values(errors).every((e) => e === '');

  // Card number auto-formatter: groups of 4
  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 19);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  // Expiry auto-formatter: MM/YY
  const handleExpiryChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) raw = raw.slice(0, 2) + '/' + raw.slice(2);
    setExpiry(raw);
  };

  const handleSubmit = async () => {
    const allFields = { billName: true, street: true, city: true, postal: true };
    if (paymentMethod === 'online') {
      allFields.cardNumber = true;
      allFields.expiry = true;
      allFields.cvv = true;
    }
    setTouched(allFields);
    if (!isFormValid) return;

    setLoading(true);
    setError('');

    const finalData = {
      name,
      email,
      phone,
      selectedDate: new Date(selectedDate).toISOString().split('T')[0],
      activeTime,
      adults,
      children,
      activity_id: activity?.id,
      street,
      city,
      postal_code: postal,
      payment_method: paymentMethod
    };

    try {
      const response = await axios.post('http://localhost/Funzone-park/backend/public/api/bookings', finalData);
      if (response.data.success) {
        setIsSuccess(true);
      }
    } catch (err) {
      console.error("Final booking error:", err);
      setError('Something went wrong during confirmation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="confirmation-section" style={{ padding: '8rem 2rem', textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            padding: '4rem 3rem',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            backdropFilter: 'blur(10px)',
            maxWidth: '600px',
            width: '100%'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle size={80} color="#1b5e40" style={{ marginBottom: '1.5rem', display: 'inline-block' }} />
          </motion.div>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: '#1b5e40', margin: '0 0 1rem 0' }}>
            Booking Confirmed!
          </h2>

          <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6', marginBottom: '2.5rem' }}>
            Thank you for choosing Funzone Park. Your adventure awaits! We have sent a confirmation email with your booking details and mobile passes.
          </p>

          <button
            onClick={() => onFinish ? onFinish() : window.location.reload()}
            style={{
              padding: '1rem 2.5rem',
              background: '#1b5e40',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
              boxShadow: '0 4px 15px rgba(27, 94, 64, 0.2)'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#144630'}
            onMouseOut={(e) => e.currentTarget.style.background = '#1b5e40'}
          >
            Book Another Adventure
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="confirmation-section">
      <div className="checkout-header">
        <a href="#" className="back-link" onClick={(e) => { e.preventDefault(); onBack(); }}>
          <ArrowLeft size={14} /> Back to attractions
        </a>
        <h1 className="checkout-title">Confirm your reservation</h1>
      </div>

      <div className="checkout-grid">
        {/* Left Column */}
        <div className="checkout-left">

          {/* Booking Summary Card */}
          <div className="checkout-card">
            <h3 className="checkout-card-title">Booking Summary</h3>
            <div className="booking-summary-row">
              <div className="booking-summary-item">
                <Calendar className="booking-summary-icon" size={20} />
                <div className="booking-summary-text">
                  <label>Check-in Date</label>
                  <span>{formattedDate}</span>
                </div>
                <button className="edit-btn" onClick={(e) => { e.preventDefault(); onBack(); }}>Edit</button>
              </div>
              <div className="booking-summary-item">
                <Ticket className="booking-summary-icon" size={20} />
                <div className="booking-summary-text">
                  <label>Number of Tickets</label>
                  <span>{totalTickets} Ticket{totalTickets > 1 ? 's' : ''}</span>
                </div>
                <button className="edit-btn" onClick={(e) => { e.preventDefault(); onBack(); }}>Edit</button>
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="checkout-card">
            <h3 className="checkout-card-title">Payment Method</h3>
            <div className="form-row">
              <div>
                <label className="form-label">How would you like to pay?</label>
                <div className="form-select-wrapper">
                  <select
                    className="form-input form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="online">Pay Online</option>
                    <option value="local">Pay at the Park </option>
                  </select>
                  <ChevronDown className="select-chevron" size={16} />
                </div>
              </div>
            </div>

            {paymentMethod === 'online' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div className="form-row" style={{ marginTop: '1rem' }}>
                  <div>
                    <label className="form-label" htmlFor="card-number">Card Number <span className="required-star">*</span></label>
                    <input
                      id="card-number"
                      type="text"
                      inputMode="numeric"
                      className={`form-input ${touched.cardNumber && errors.cardNumber ? 'input-error' : touched.cardNumber && !errors.cardNumber ? 'input-valid' : ''}`}
                      placeholder="**** **** **** ****"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      onBlur={() => touch('cardNumber')}
                    />
                    {touched.cardNumber && errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <label className="form-label" htmlFor="card-expiry">Expiration Date (MM/YY) <span className="required-star">*</span></label>
                    <input
                      id="card-expiry"
                      type="text"
                      inputMode="numeric"
                      className={`form-input ${touched.expiry && errors.expiry ? 'input-error' : touched.expiry && !errors.expiry ? 'input-valid' : ''}`}
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={handleExpiryChange}
                      onBlur={() => touch('expiry')}
                    />
                    {touched.expiry && errors.expiry && <span className="field-error">{errors.expiry}</span>}
                  </div>
                  <div>
                    <label className="form-label" htmlFor="card-cvv">CVV <span className="required-star">*</span></label>
                    <input
                      id="card-cvv"
                      type="text"
                      inputMode="numeric"
                      className={`form-input ${touched.cvv && errors.cvv ? 'input-error' : touched.cvv && !errors.cvv ? 'input-valid' : ''}`}
                      placeholder="***"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      onBlur={() => touch('cvv')}
                    />
                    {touched.cvv && errors.cvv && <span className="field-error">{errors.cvv}</span>}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Billing Address Card */}
          <div className="checkout-card">
            <h3 className="checkout-card-title">Billing Address</h3>
            <div className="form-row">
              <div>
                <label className="form-label" htmlFor="bill-name">Full Name <span className="required-star">*</span></label>
                <input
                  id="bill-name"
                  type="text"
                  className={`form-input ${touched.billName && errors.billName ? 'input-error' : touched.billName && !errors.billName ? 'input-valid' : ''}`}
                  placeholder="Enter your full name"
                  value={billName}
                  onChange={(e) => setBillName(e.target.value)}
                  onBlur={() => touch('billName')}
                />
                {touched.billName && errors.billName && <span className="field-error">{errors.billName}</span>}
              </div>
            </div>
            <div className="form-row">
              <div>
                <label className="form-label" htmlFor="bill-street">Street Address <span className="required-star">*</span></label>
                <input
                  id="bill-street"
                  type="text"
                  className={`form-input ${touched.street && errors.street ? 'input-error' : touched.street && !errors.street ? 'input-valid' : ''}`}
                  placeholder="Enter your home address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  onBlur={() => touch('street')}
                />
                {touched.street && errors.street && <span className="field-error">{errors.street}</span>}
              </div>
            </div>
            <div className="form-row">
              <div>
                <label className="form-label" htmlFor="bill-city">City <span className="required-star">*</span></label>
                <input
                  id="bill-city"
                  type="text"
                  className={`form-input ${touched.city && errors.city ? 'input-error' : touched.city && !errors.city ? 'input-valid' : ''}`}
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onBlur={() => touch('city')}
                />
                {touched.city && errors.city && <span className="field-error">{errors.city}</span>}
              </div>
              <div>
                <label className="form-label" htmlFor="bill-postal">Postal Code <span className="required-star">*</span></label>
                <input
                  id="bill-postal"
                  type="text"
                  className={`form-input ${touched.postal && errors.postal ? 'input-error' : touched.postal && !errors.postal ? 'input-valid' : ''}`}
                  placeholder="Zip Code"
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                  onBlur={() => touch('postal')}
                />
                {touched.postal && errors.postal && <span className="field-error">{errors.postal}</span>}
              </div>
            </div>
          </div>

          {/* Alert Box */}
          <div className="alert-box">
            <AlertCircle className="alert-icon" size={24} />
            <div>
              <div className="alert-title">Cancellation Policy</div>
              <div className="alert-desc">
                Free cancellation up to 48 hours before the scheduled check-in time. Any cancellations made after this window may be subject to a partial fee of 20%.
              </div>
            </div>
          </div>

          {error && <div style={{ color: '#e53e3e', marginBottom: '1rem', fontWeight: '600' }}>{error}</div>}

          {/* Action Button */}
          <button
            className={`checkout-action-btn ${!isFormValid || loading ? 'checkout-action-btn-disabled' : ''}`}
            onClick={handleSubmit}
            disabled={loading}
            aria-disabled={!isFormValid || loading}
            title={!isFormValid ? 'Please complete all required fields.' : undefined}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={18} /> Processing...
              </span>
            ) : (
              <>Confirm and Book <ArrowRight size={18} /></>
            )}
          </button>
          <div className="terms-text">
            By clicking "Confirm and Book", you agree to FunZone<br />
            Terms of Service and Privacy Policy.
          </div>

        </div>

        {/* Right Column */}
        <div className="checkout-right">
          <div className="right-summary-card">
            <div className="summary-img-wrapper">
              <img src={activity?.image || "/camping.png"} alt={activity?.title || "Campground"} />
            </div>
            <div className="summary-content">
              <div className="summary-park-title">{activity?.title || "Funzone – Full Day Access"}</div>
              <div className="summary-meta">
                <div className="summary-meta-item">
                  <MapPin size={14} /> Tangier, Morocco
                </div>
                <div className="summary-meta-item">
                  <Star size={14} className="summary-rating-star" /> <span className="summary-rating">4.8</span>
                </div>
              </div>

              <div className="summary-price-row">
                <span>Adult ({adultPrice}dh x {adults})</span>
                <span>{adultPrice * adults}DH</span>
              </div>
              {children > 0 && (
                <div className="summary-price-row">
                  <span>Child ({childPrice}dh x {children})</span>
                  <span>{childPrice * children}DH</span>
                </div>
              )}
              <div className="summary-price-row total">
                <span>Total</span>
                <span className="total-price-green">{adultPrice * adults + childPrice * children}DH</span>
              </div>
            </div>
          </div>

          <div className="promo-box">
            <div className="promo-title">PROMOTIONAL CODE</div>
            <div className="promo-input-group">
              <input type="text" className="promo-input" placeholder="Apply discount code here" />
              <button className="promo-btn">Redeem code</button>
            </div>
          </div>

          <div className="security-icons">
            <Shield size={24} />
            <Lock size={24} />
            <CreditCard size={24} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationSection;
