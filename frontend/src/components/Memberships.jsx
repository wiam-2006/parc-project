import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, UsersRound, ThumbsUp, Footprints, CheckCircle2, Sprout, TreePine, Wind } from 'lucide-react';
import './Home/Home.css'


const stats = [
  { icon: Leaf, value: '50K+', label: 'Protected Acres' },
  { icon: UsersRound, value: '15K+', label: 'Happy members' },
  { icon: ThumbsUp, value: '98%', label: 'Satisfaction Rate' },
  { icon: Footprints, value: '250k+', label: 'Adventure Seekers' }
];


export default function Memberships({ setCurrentPage }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null); // null | 'success' | 'error' | 'duplicate' | 'submitting'

  const [isFlowOpen, setIsFlowOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    cin: '',
    phone: '',
    email: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [stepErrors, setStepErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [paymentError, setPaymentError] = useState(null);

  const packageOptions = [
    {
      label: '3 months',
      price: '180 DH',
      description: 'A short-term adventure package for seasonal explorers.',
      value: 180,
    },
    {
      label: '6 months',
      price: '340 DH',
      description: 'A half-year plan for regular nature visits.',
      value: 340,
    },
    {
      label: '1 year',
      price: '620 DH',
      description: 'A full annual membership with the best value.',
      value: 620,
    },
  ];

  const stepLabels = ['Choose Plan', 'Personal Information', 'Payment', 'Confirmation'];

  const openMembershipFlow = () => {
    setIsFlowOpen(true);
    setActiveStep(1);
    setSelectedPackage(null);
    setPersonalInfo({ firstName: '', lastName: '', cin: '', phone: '', email: '' });
    setPaymentInfo({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
    setStepErrors({});
    setConfirmation(null);
    setPaymentError(null);
  };

  const closeMembershipFlow = () => {
    setIsFlowOpen(false);
    setActiveStep(1);
  };

  const handleSelectPackage = (option) => {
    setSelectedPackage(option);
    setStepErrors((prev) => ({ ...prev, package: null }));
  };

  const handlePersonalChange = (event) => {
    const { name, value } = event.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    setStepErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handlePaymentChange = (event) => {
    const { name, value } = event.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
    setStepErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateStep = () => {
    const errors = {};
    if (activeStep === 1) {
      if (!selectedPackage) {
        errors.package = 'Please select a package to continue.';
      }
    }

    if (activeStep === 2) {
      if (!personalInfo.firstName.trim()) {
        errors.firstName = 'First name is required.';
      }
      if (!personalInfo.lastName.trim()) {
        errors.lastName = 'Last name is required.';
      }
      if (!personalInfo.cin.trim()) {
        errors.cin = 'CIN is required.';
      }
      if (!personalInfo.phone.trim()) {
        errors.phone = 'Phone number is required.';
      }
      if (!personalInfo.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
        errors.email = 'A valid email address is required.';
      }
    }

    if (activeStep === 3) {
      if (!paymentInfo.cardName.trim()) {
        errors.cardName = 'Card holder name is required.';
      }
      if (!paymentInfo.cardNumber.trim() || paymentInfo.cardNumber.replace(/\D/g, '').length < 12) {
        errors.cardNumber = 'Please enter a valid card number.';
      }
      if (!paymentInfo.expiry.trim() || !/^\d{2}\/\d{2}$/.test(paymentInfo.expiry)) {
        errors.expiry = 'Use MM/YY format.';
      }
      if (!paymentInfo.cvv.trim() || paymentInfo.cvv.length < 3) {
        errors.cvv = 'Please enter a valid CVV.';
      }
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep()) {
      return;
    }

    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
      return;
    }

    if (activeStep === 3) {
      setIsSubmitting(true);
      setPaymentError(null);

      try {
        const response = await fetch('http://localhost/funzone_parc/backend/public/api/memberships', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            package: selectedPackage.label,
            firstName: personalInfo.firstName,
            lastName: personalInfo.lastName,
            cin: personalInfo.cin,
            phone: personalInfo.phone,
            email: personalInfo.email,
            cardName: paymentInfo.cardName,
            cardNumber: paymentInfo.cardNumber,
            expiry: paymentInfo.expiry,
            cvv: paymentInfo.cvv,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Payment could not be completed.');
        }

        setConfirmation(data.data);
        setActiveStep(4);
      } catch (error) {
        setPaymentError(error.message || 'Unable to process payment. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const totalPrice = selectedPackage ? selectedPackage.price : '$0';

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterStatus('submitting');
    fetch('http://localhost/funzone_parc/backend/public/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newsletterEmail })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNewsletterStatus('success');
          setNewsletterEmail('');
        } else {
          setNewsletterStatus('duplicate');
        }
      })
      .catch(() => setNewsletterStatus('error'));
  };

  useEffect(() => {
    fetch('http://localhost/funzone_parc/backend/public/api/membership-plans')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPlans(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching membership plans:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full min-h-screen font-sans pb-50">

      {/* Hero Section */}
      <section className="px-6 pt-32 pb-16 w-full flex justify-center relative">
        <div className="relative w-full max-w-[1200px] h-[580px] rounded-[60px] shadow-2xl z-10 "
          style={{ marginTop: '82px' }}>

          {/* Background Image Container */}
          <div className="absolute inset-0 rounded-[60px] overflow-hidden">
            <img
              src="/premium_photo-1683133798886-86e6d9bc11dc.avif"
              alt="Nature landscape"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center z-20 pb-16">
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 drop-shadow-lg">
              Reconnect With Nature
            </h2>
            <p className="text-lg md:text-xl max-w-3xl drop-shadow-md mb-10 leading-relaxed font-medium">
              Experience the perfect harmony of wilderness and luxury. Join our exclusive membership for unlimited access to pristine nature reserves and world-class eco-amenities
            </p>
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '15px 30px',
                backgroundColor: '#2D5A27',
                color: 'white',
                borderRadius: '9999px',
                fontWeight: '700',
                fontSize: '1.125rem',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                transition: 'background-color 0.3s',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={e => e.target.style.backgroundColor = '#1f3f1b'}
              onMouseLeave={e => e.target.style.backgroundColor = '#2D5A27'}
            >
              Explore membership
            </button>
          </div>

          {/* Stats Bar */}
          <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[90%] max-w-[950px] h-[240px] bg-[#ffffff] rounded-[60px] shadow-xl flex justify-between items-center px-6 md:px-16 z-30 border border-[#e8f1e8]">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div className="w-[70px] h-[70px] bg-[#8ccb8c] rounded-full flex items-center justify-center shadow-sm mb-3">
                  <stat.icon size={30} className="text-[#1b4332]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="font-bold text-[18px] text-[#1b4332] leading-tight">
                    {stat.value}
                  </span>
                  <span className="font-medium text-[15px] text-[#2d7a4f] leading-tight">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Adjusted Spacer between Hero and Pricing to avoid overlap */}
      <div className="w-full h-[250px] md:h-[300px]" aria-hidden="true"></div>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 pb-20 w-full max-w-[1600px] mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-5 md:mb-28 relative w-full px-4"
          style={{ marginBottom: '75px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ fontFamily: 'Dancing Script', fontSize: '4rem', color: '#1a503a', marginBottom: '0.5rem', fontWeight: 700 }}
          >
            <span className="why-leaf" aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
            Choose your Experience
            <span className="why-leaf why-leaf--flip" aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#2D5A27] font-bold max-w-2xl mx-auto text-[20px] text-center leading-relaxed"
          >
            Select the perfect membership plan and immerse yourself in nature's sanctuary
          </motion.p>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 max-w-[1150px] mx-auto">
          {loading ? (
            <div className="col-span-3 text-center text-[#2D5A27] text-lg py-16">Loading plans...</div>
          ) : plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.2, duration: 0.5, ease: "easeOut" }}
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: plan.is_popular ? "0 25px 50px rgba(140,203,140,0.6)" : "0 25px 50px rgba(45,90,39,0.15)"
              }}
              className={`rounded-[40px] flex flex-col items-center transition-all duration-300 border-[1.5px] flex-1 w-full max-w-[380px] min-h-[600px] ${plan.is_popular
                ? 'bg-[#98cf98] border-[#98cf98] py-14 px-8 shadow-[0_15px_40px_rgba(45,90,39,0.25)]'
                : 'bg-[#fbfdfb] border-[#c4dbc4] py-14 px-8 shadow-xl'
                }`}
            >
              <div className="text-center mb-10">
                <h3 className="text-[30px] font-bold mb-3 text-[#1b4332] leading-tight">{plan.name}</h3>
                <div className="text-[18px] font-semibold whitespace-pre-line leading-relaxed text-[#1b4332]">
                  {plan.price}
                </div>
              </div>

              {/* Centered list block but left-aligned text */}
              <div className="flex-1 flex flex-col justify-center items-center w-full mb-12">
                <ul className="space-y-5 text-left">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <CheckCircle2 size={24} className="shrink-0" fill="#8ccb8c" color="white" strokeWidth={2.5} />
                      <span className="text-[17px] font-semibold text-[#1b4332]">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 🌿 Nature Button */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  boxShadow: '0 12px 30px rgba(45,90,39,0.25), 0 0 0 2px rgba(140,203,140,0.3)'
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden w-[80%] max-w-[340px] py-[22px] rounded-full font-bold text-[19px] tracking-wider flex items-center justify-center gap-[12px] text-[#1b4332]"
                style={{
                  background: 'linear-gradient(145deg, #f0f7ee 0%, #dcecd8 100%)',
                  boxShadow: '0 4px 16px rgba(45,90,39,0.18), inset 0 1px 0 rgba(255,255,255,0.8)',
                  border: '1.5px solid rgba(45,122,79,0.45)',
                  padding: '15px',
                  marginBottom: '35px'
                }}
              >
                {/* forest-light shimmer */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.15) 80%, transparent 80%)',
                  }}
                />
                {/* leaf icon */}
                <motion.span
                  className="relative z-10 flex items-center"
                  whileHover={{ rotate: -15, scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Sprout size={18} strokeWidth={1.8} className="text-[#2D7A4F]" />
                </motion.span>
                <span className="relative z-10">{plan.btn_text}</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Spacer between Pricing cards and CTA */}
      <div className="w-full h-16 md:h-24" aria-hidden="true" />

      {/* CTA / Journey Section */}
      <section className="px-6 pb-32 w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-[1200px] h-[480px] rounded-[60px] shadow-2xl overflow-hidden"
        >
          {/* Background Image */}
          <img
            src="/premium_photo-1710846919368-91fb1945e6db.avif"
            alt="Nature forest"
            className="absolute inset-0 w-full h-full object-cover scale-105"
            style={{ filter: 'brightness(0.72)' }}
          />
          {/* Subtle green gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/55" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-serif font-bold mb-5 drop-shadow-lg leading-tight max-w-2xl"
            >
              Your Nature Journey Starts Here
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
              className="text-base md:text-lg max-w-xl drop-shadow-md mb-10 leading-relaxed font-medium text-white/90"
            >
              Join our community of nature lovers and experience the perfect blend of wilderness and luxury. Limited memberships available.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              {/* 🍃 Frosted Leaf — "Start your memberships" */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  boxShadow: '0 10px 36px rgba(255,255,255,0.25), 0 0 0 2px rgba(255,255,255,0.5)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={openMembershipFlow}
                className="group relative overflow-hidden flex items-center gap-3 rounded-full text-white font-semibold text-[17px] tracking-wide"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1.5px solid rgba(255,255,255,0.55)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.25)',
                  padding: '15px',
                  marginBottom: '35px',
                  marginTop: '30px'
                }}
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.18) 0%, transparent 70%)' }}
                />
                <motion.span
                  className="relative z-10"
                  animate={{ rotate: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Leaf size={17} strokeWidth={1.8} className="text-[#8ccb8c]" />
                </motion.span>
                <span className="relative z-10">Start your memberships</span>
                <motion.span
                  className="relative z-10 text-[#8ccb8c] font-bold text-lg leading-none"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >›</motion.span>
              </motion.button>

              {/* 🌲 Forest Glow — "Contact us now" */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  boxShadow: '0 14px 40px rgba(27,67,50,0.7), 0 0 0 3px rgba(140,203,140,0.45)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => {
                  setCurrentPage?.('Contact Us');
                  setTimeout(() => {
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="group relative overflow-hidden flex items-center gap-3 px-10 py-[18px] rounded-full font-semibold text-[17px] tracking-wide text-white cursor-pointer"
                style={{
                  background: 'linear-gradient(145deg, #2D7A4F 0%, #1b4332 55%, #0f2920 100%)',
                  boxShadow: '0 6px 24px rgba(27,67,50,0.5), inset 0 1px 0 rgba(255,255,255,0.12)',
                  padding: '15px',
                  marginBottom: '35px',
                  marginTop: '30px'
                }}
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.12) 50%, transparent 80%)' }}
                />
                <motion.span
                  className="relative z-10"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Wind size={17} strokeWidth={1.8} className="text-[#8ccb8c]" />
                </motion.span>
                <span className="relative z-10">Contact us now</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {isFlowOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-10 py-14 bg-black/60">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[1320px] bg-white rounded-[40px] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-6 bg-[#f5fbf4]">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#2d7a4f]">Membership Checkout</p>
                <h3 className="text-3xl font-bold text-[#1b4332]">Complete your membership</h3>
              </div>
              <button
                type="button"
                onClick={closeMembershipFlow}
                className="text-[#1b4332] hover:text-[#2d7a4f] text-xl font-bold"
                aria-label="Close membership flow"
              >
                ✕
              </button>
            </div>

            <div className="border-b border-slate-200 bg-white px-10 py-6">
              <div className="grid grid-cols-4 gap-8 text-center text-sm sm:text-base">
                {stepLabels.map((label, index) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${activeStep === index + 1 ? 'bg-[#2d7a4f] text-white' : 'bg-[#e8f6ea] text-[#2d7a4f]'}`}>
                      {index + 1}
                    </div>
                    <span className="text-[#2d7a4f] font-semibold">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-[#f8fdf6]">
              {activeStep === 1 && (
                <div className="space-y-5">
                  <p className="text-[#1b4332] text-lg font-medium">Select a package that fits your membership goal.</p>
                  <div className="grid gap-4 md:grid-cols-3">
                    {packageOptions.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => handleSelectPackage(option)}
                        className={`rounded-[32px] border p-7 text-left transition-all duration-200 min-h-[280px] shadow-sm ${selectedPackage?.label === option.label ? 'border-[#2d7a4f] bg-[#eaf6eb]' : 'border-[#d5e8d4] bg-white hover:border-[#2d7a4f]/70'}`}
                      >
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-[#1b4332]">{option.label}</h4>
                            <p className="text-sm text-[#4f7942]">{option.description}</p>
                          </div>
                          <span className="rounded-full bg-[#2d7a4f] px-5 py-2 text-sm font-semibold text-white">{option.price}</span>
                        </div>
                        <p className="text-sm text-[#456d44]">Included: Full park access, walking trails, and member news.</p>
                      </button>
                    ))}
                  </div>
                  {stepErrors.package && <p className="text-sm text-red-600">{stepErrors.package}</p>}
                </div>
              )}

              {activeStep === 2 && (
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { name: 'firstName', label: 'First Name', type: 'text' },
                    { name: 'lastName', label: 'Last Name', type: 'text' },
                    { name: 'cin', label: 'CIN', type: 'text' },
                    { name: 'phone', label: 'Phone Number', type: 'text' },
                    { name: 'email', label: 'Email Address', type: 'email' },
                  ].map((field) => (
                    <label key={field.name} className="flex flex-col gap-2 text-[#1b4332] font-medium">
                      <span>{field.label}</span>
                      <input
                        type={field.type}
                        name={field.name}
                        value={personalInfo[field.name]}
                        onChange={handlePersonalChange}
                        className="rounded-3xl border border-[#c4dbc4] bg-white px-4 py-3 text-sm text-[#1f3f1b] outline-none focus:border-[#2d7a4f] focus:ring-2 focus:ring-[#dff2d9]"
                      />
                      {stepErrors[field.name] && <span className="text-sm text-red-600">{stepErrors[field.name]}</span>}
                    </label>
                  ))}
                </div>
              )}

              {activeStep === 3 && (
                <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                  <div className="space-y-5">
                    <div className="rounded-[34px] border border-[#d7e8d5] bg-white p-8 shadow-sm">
                      <h4 className="text-xl font-bold text-[#1b4332] mb-4">Payment details</h4>
                      {[
                        { name: 'cardName', label: 'Card Holder Name', placeholder: 'Full name as on card' },
                        { name: 'cardNumber', label: 'Card Number', placeholder: '1234 5678 9012 3456' },
                        { name: 'expiry', label: 'Expiration Date', placeholder: 'MM/YY' },
                        { name: 'cvv', label: 'CVV', placeholder: '123' },
                      ].map((field) => (
                        <label key={field.name} className="flex flex-col gap-2 text-[#1b4332] font-medium">
                          <span>{field.label}</span>
                          <input
                            type={field.name === 'cvv' ? 'password' : 'text'}
                            name={field.name}
                            value={paymentInfo[field.name]}
                            onChange={handlePaymentChange}
                            placeholder={field.placeholder}
                            className="rounded-3xl border border-[#c4dbc4] bg-[#f8fff4] px-4 py-3 text-sm text-[#1f3f1b] outline-none focus:border-[#2d7a4f] focus:ring-2 focus:ring-[#dff2d9]"
                          />
                          {stepErrors[field.name] && <span className="text-sm text-red-600">{stepErrors[field.name]}</span>}
                        </label>
                      ))}
                    </div>

                    {paymentError && <div className="rounded-3xl bg-[#fee2e2] p-4 text-sm text-red-700">{paymentError}</div>}
                  </div>

                  <div className="rounded-[34px] border border-[#d7e8d5] bg-white p-8 shadow-sm">
                    <h4 className="text-xl font-bold text-[#1b4332] mb-4">Membership summary</h4>
                    <div className="space-y-4 text-sm text-[#2b5134]">
                      <div className="flex items-center justify-between">
                        <span>Package selected</span>
                        <strong>{selectedPackage?.label}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Member name</span>
                        <strong>{personalInfo.firstName || 'First Name'} {personalInfo.lastName || 'Last Name'}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Duration</span>
                        <strong>{selectedPackage?.label}</strong>
                      </div>
                      <div className="border-t border-[#d5e8d4] pt-4 flex items-center justify-between text-lg font-bold text-[#1b4332]">
                        <span>Total</span>
                        <span>{selectedPackage?.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 4 && confirmation && (
                <div className="rounded-[30px] border border-[#d7e8d5] bg-white p-8 text-[#1b4332] shadow-sm">
                  <div className="mb-8 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-[#2d7a4f]">Success</p>
                    <h4 className="mt-3 text-3xl font-bold">Membership created</h4>
                    <p className="mt-2 text-sm text-[#4f6a53]">Your membership is active and ready to use.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: 'Full Name', value: confirmation.full_name },
                      { label: 'Membership ID', value: confirmation.membership_id },
                      { label: 'Selected Package', value: confirmation.package },
                      { label: 'Start Date', value: confirmation.start_date },
                      { label: 'Expiration Date', value: confirmation.expiration_date },
                      { label: 'Payment Status', value: confirmation.payment_status },
                    ].map((item) => (
                      <div key={item.label} className="rounded-3xl bg-[#f6fdee] p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#4f7942]">{item.label}</p>
                        <p className="mt-2 text-base font-semibold text-[#1b4332]">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-200 bg-white px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={activeStep === 1 || isSubmitting}
                className="w-full sm:w-auto min-w-[160px] rounded-full border border-[#c4dbc4] bg-white px-8 py-4 text-base font-semibold text-[#1b4332] transition hover:bg-[#f2fbf4] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Back
              </button>
              {activeStep !== 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-[220px] rounded-full bg-[#2d7a4f] px-10 py-4 text-base font-semibold text-white shadow-[0_14px_30px_rgba(45,118,56,0.24)] transition hover:bg-[#225c34] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {activeStep === 3 ? (isSubmitting ? 'Processing...' : 'Complete Payment') : 'Next'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={closeMembershipFlow}
                  className="rounded-full bg-[#2d7a4f] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#225c34]"
                >
                  Close
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Balanced Spacer between CTA and Newsletter */}
      <div className="w-full h-32 md:h-48" aria-hidden="true" />

      {/* Newsletter Banner Section - Centered between CTA and Footer */}
      <section className="px-6 pb-32 md:pb-48 w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[800px] bg-[#dcedd9] rounded-[30px] p-5 md:p-16 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(27,67,50,0.12)] border border-[#c4dbc4]"
          style={{ paddingBottom: '30px' }}
        >
          {/* 🌿 Nature Icon */}
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 bg-white/60 rounded-full flex items-center justify-center mb-8 shadow-sm"
          >
            <Sprout size={40} className="text-[#2D7A4F]" />
          </motion.div>

          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1b4332] mb-12 max-w-lg leading-tight tracking-tight">
            Subscribe To Our Newsletter & Grab 30% OFF
          </h2>

          <form className="nl-form" onSubmit={handleNewsletterSubmit} style={{ margin: '25px' }}>
            <input
              type="email"
              className="nl-input"
              placeholder="Enter Your Email"
              aria-label="Email Address"
              style={{ width: '800px' }}
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              disabled={newsletterStatus === 'submitting' || newsletterStatus === 'success'}
            />
            <button
              type="submit"
              className="nl-submit"
              disabled={newsletterStatus === 'submitting' || newsletterStatus === 'success'}
            >
              {newsletterStatus === 'submitting' ? 'Subscribing...' : newsletterStatus === 'success' ? '✓ Subscribed!' : 'Subscribe'}
            </button>
          </form>
          {newsletterStatus === 'success' && (
            <p style={{ color: '#1b4332', fontWeight: 700, marginTop: '12px' }}>🎉 You're subscribed! Your 30% OFF is on its way.</p>
          )}
          {newsletterStatus === 'duplicate' && (
            <p style={{ color: '#b45309', fontWeight: 600, marginTop: '12px' }}>This email is already subscribed.</p>
          )}
          {newsletterStatus === 'error' && (
            <p style={{ color: '#dc2626', fontWeight: 600, marginTop: '12px' }}>Something went wrong. Please try again.</p>
          )}
        </motion.div>
      </section>

      {/* Footer Spacer */}
      <div className="w-full h-24 md:h-24" aria-hidden="true" />
    </div>
  );
}
