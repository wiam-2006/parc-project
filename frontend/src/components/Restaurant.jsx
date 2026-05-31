import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sun } from 'lucide-react';

export default function Restaurant() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: 1, special_requests: ''
  });
  const [bookingStatus, setBookingStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingStatus('submitting');
    fetch('http://localhost/Funzone-park/backend/public/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      setBookingStatus('success');
      setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: 1, special_requests: '' });
    })
    .catch(err => {
      console.log('Booking Error:', err);
      setBookingStatus('error');
    });
  };

  console.log("RESTAURANT COMPONENT LOADED");
  useEffect(() => {
    console.log("FETCHING MENU...");
    fetch('http://localhost/Funzone-park/backend/public/api/menu-items')
      // fetch('http://localhost/Funzone-park/backend/public/index.php/api/menu-items')
      .then(res => res.json())
      .then(data => {
        console.log("MENU DATA:", data);
        setMenuItems(data.data);
        setLoading(false);
      })
      .catch(err => console.log("FETCH ERROR:", err));
  }, []);

  const categories = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="w-full min-h-screen bg-[#eef5eb] pt-20 pb-20 px-6 flex flex-col items-center">

      {/* Hero Section Container */}
      <section className="relative w-full max-w-[1200px] mt-10" style={{ marginTop: '82px' }}>
        <div className="absolute -bottom-12 -right-12 w-full h-full bg-[#1b4332] rounded-[60px] z-0" />
        <div className="relative w-full h-[450px] rounded-[60px] overflow-hidden shadow-2xl z-10">
          <img
            src="/premium_photo-1663090914375-740c1ed3c0bd.avif"
            alt="Forest Dining Restaurant"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-4"
              style={{ marginBottom: '15px' }}
            >
              <Leaf size={20} className="text-[#8ccb8c] -scale-x-100" strokeWidth={2.5} />
              <span className="text-lg md:text-xl font-medium tracking-wide">Forest Dining</span>
              <Leaf size={20} className="text-[#8ccb8c]" strokeWidth={2.5} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-cursive mb-6 drop-shadow-lg"
              style={{ fontFamily: "'Dancing Script', cursive", marginTop: '15px' }}
            >
              Dine in Nature
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base md:text-lg max-w-xl mb-10 text-white/90 font-medium leading-relaxed"
              style={{ margin: '15px' }}
            >
              Where the whisper of pines meets the warmth of fire-grilled meals
            </motion.p>
            <motion.button
              onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05, backgroundColor: '#327358ff' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-[#2D5A27] text-white rounded-full font-bold text-lg shadow-xl transition-all"
              style={{ padding: '15px 15px', margin: '20px' }}
            >
              Explore our menu
            </motion.button>
          </div>
        </div>
      </section>

      <div className="w-full h-16 md:h-20" aria-hidden="true" />

      {/* Outdoor Dining Details Section */}
      <section className="w-full max-w-[1200px] flex flex-col md:flex-row items-center gap-16 md:gap-24" style={{ margin: '120px' }}>
        <div className="relative w-full md:w-[500px]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[680px] rounded-tr-[120px] rounded-bl-[120px] overflow-hidden shadow-xl"
          >
            <img
              src="/istockphoto-1469750398-612x612.webp"
              alt="Outdoor Dining Table"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute -bottom-16 -right-10 md:-right-20 w-full max-w-[500px] bg-[#1b4332] text-white p-12 md:p-14 rounded-[60px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-20 min-h-[250px] flex flex-col justify-center"
          >
            <h4 className="text-3xl font-bold mb-5" style={{ marginLeft: '120px', marginTop: 0 }}>The Forest Table</h4>
            <p className="text-lg text-white/90 leading-relaxed" style={{ marginLeft: '10px', marginRight: '10px', textAlign: 'center', padding: '15px' }}>
              Hand-crafted cedar tables placed specifically where the light hits the moss just right.
            </p>
          </motion.div>
        </div>

        <div className="flex-1 text-left" style={{ paddingTop: 0, marginTop: 0 }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#2D7A4F] font-bold tracking-widest text-sm mb-4 block"
          >
            OUTDOOR DINING
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#1b4332] mb-8 leading-tight"
          >
            Organic shapes, natural<br />textures.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-[#2D5A27]/80 text-lg mb-12 leading-relaxed"
          >
            Our dining areas are not built on the land, but within it.<br />
            We use the natural topography of the forest floor to create<br />
            intimate pockets of serenity.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-3 text-[#1b4332] font-bold">
                <Leaf size={18} className="text-[#8ccb8c]" />
                <span>Native Wood</span>
              </div>
              <p className="text-sm text-[#2D5A27]/70">Tables carved from fallen park timber.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-3 text-[#1b4332] font-bold">
                <div className="w-2 h-2 rounded-full bg-[#8ccb8c]" />
                <span>Dappled Light</span>
              </div>
              <p className="text-sm text-[#2D5A27]/70">Strategically oriented for morning warmth.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="w-full h-16 md:h-20" aria-hidden="true" />

      {/* Our Simple Menu Section */}
      <section className="w-full max-w-[1200px] flex flex-col items-center">
        <div className="flex items-center gap-4 mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ fontFamily: 'Dancing Script', fontSize: '4rem', color: '#1a503a', marginBottom: '0.5rem', fontWeight: 700 }}
          >
            <span className="why-leaf" aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
            Our Simple Menu
            <span className="why-leaf why-leaf--flip" aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
          </motion.h2>
        </div>
        <p className="text-[#2D5A27]/70 text-center max-w-lg mb-24 leading-relaxed font-medium" style={{ fontSize: '18px', marginBottom: '35px' }}>
          Fresh ingredients, honest cooking, and flavors that<br />celebrate the bounty of nature
        </p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-[1100px] h-[600px] rounded-[80px] overflow-hidden shadow-2xl"
        >
          <img
            src="/photo-1563498169267-03f1d7a95271.avif"
            alt="Organic and Local Ingredients"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-white text-center">
            <span className="text-lg font-bold mb-3 opacity-90 tracking-widest" style={{ marginBottom: '25px' }}>FARM TO TABLE</span>
            <h3 className="text-5xl md:text-6xl font-bold mb-8 drop-shadow-md" style={{ fontSize: '80px' }}>Organic & Local</h3>
            <p className="max-w-md text-lg md:text-xl text-white/90 leading-relaxed font-medium" style={{ marginTop: '25px' }}>
              Every ingredient is carefully sourced from local farms and foraged from nearby forests.
            </p>
          </div>
        </motion.div>
      </section>

      <div className="w-full h-12 md:h-16" aria-hidden="true" />

      {/* The Organic Menu Listing - من DATABASE */}
      <section id="menu-section" className="w-full max-w-[1000px] mb-30">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ padding: '30px' }}
          className="bg-white/90 backdrop-blur-xl rounded-[60px] p-12 md:p-20 border border-[#c4dbc4] shadow-[0_30px_70px_rgba(27,67,50,0.15)]"
        >
          <div className="flex flex-col items-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6 font-cursive"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ fontFamily: 'Dancing Script', fontSize: '4rem', color: '#1a503a', fontWeight: 700 }}
              >
                <span className="why-leaf" aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
                The Organic Menu
                <span className="why-leaf why-leaf--flip" aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
              </motion.h2>
            </motion.div>
            <div className="w-24 h-[3px] bg-gradient-to-r from-transparent via-[#8ccb8c] to-transparent rounded-full" />
          </div>

          <div className="w-full h-12 md:h-16" aria-hidden="true" />

          {/* Menu من DATABASE */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#c4dbc4] to-transparent -translate-x-1/2" />

            {loading ? (
              <div className="col-span-2 text-center text-[#2D5A27] text-lg py-10">
                Loading menu...
              </div>
            ) : (
              Object.entries(categories).map(([category, items], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{ padding: '15px' }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <h3 className="text-xl font-bold text-[#1a503a] uppercase tracking-[0.2em]" style={{ marginBottom: '20px', fontSize: '24px', color: '#269b6cff' }}>
                      {category}
                    </h3>
                  </div>
                  <div className="space-y-12">
                    {items.map(item => (
                      <div key={item.id} className="group cursor-pointer">
                        <div className="flex items-baseline justify-between mb-2">
                          <h4 className="text-lg font-bold text-[#1b4332] group-hover:text-[#2D7A4F] transition-colors whitespace-nowrap">
                            {item.name}
                          </h4>
                          <div className="flex-1 border-b border-dotted border-[#c4dbc4] mx-4 mb-1" />
                          <span className="text-lg font-bold text-[#1b4332] group-hover:scale-110 transition-transform">
                            ${item.price}
                          </span>
                        </div>
                        <p className="text-sm text-[#2D5A27]/70 leading-relaxed max-w-[90%]">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="w-full h-16 md:h-20" aria-hidden="true" />

          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="w-full max-w-[700px] bg-[#f0f7f0] p-8 rounded-[30px] text-center border border-[#d8e8d8] mb-12"
            >
              <p className="text-sm text-[#2D5A27]/80 font-medium leading-relaxed italic">
                "All ingredients are sourced within 50 miles of the sanctuary or grown in our own permaculture garden."
              </p>
            </motion.div>
            <motion.button
              onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05, backgroundColor: '#1b4332' }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-20 py-6 bg-[#2D5A27] text-white rounded-full font-bold text-xl shadow-2xl overflow-hidden transition-all flex items-center gap-4"
              style={{ padding: '15px', margin: '15px' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
              <Leaf size={24} className="text-[#8ccb8c] group-hover:rotate-12 transition-transform" />
              <span>BOOK YOUR TABLE</span>
            </motion.button>
          </div>
        </motion.div>
      </section>

      <div className="w-full h-24 md:h-32" aria-hidden="true" />

      {/* Table Reservation Section */}
      <section id="booking-section" className="w-full max-w-[800px] mb-30 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ padding: '40px', width: '100%' }}
          className="bg-white/90 backdrop-blur-xl rounded-[60px] p-8 md:p-14 border border-[#c4dbc4] shadow-[0_30px_70px_rgba(27,67,50,0.15)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#1b4332] via-[#8ccb8c] to-[#1b4332]" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a503a] mb-8 text-center" style={{ fontFamily: "'Dancing Script', cursive", fontSize: '3.5rem' }}>
            Reserve Your Experience
          </h2>
          {bookingStatus === 'success' ? (
            <div className="text-center p-8 bg-[#eef5eb] rounded-3xl border border-[#8ccb8c]">
              <Leaf className="mx-auto text-[#2D7A4F] mb-4" size={48} />
              <h3 className="text-2xl font-bold text-[#1b4332] mb-2">Table Confirmed!</h3>
              <p className="text-[#2D5A27]">We look forward to hosting you in nature.</p>
              <button 
                onClick={() => setBookingStatus(null)}
                className="mt-6 px-6 py-3 bg-[#2D5A27] text-white rounded-full text-sm font-bold shadow-md hover:bg-[#1b4332] transition-colors"
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Full Name" className="w-full px-6 py-4 rounded-full bg-[#f0f7f0] border border-[#d8e8d8] text-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#8ccb8c] font-medium" />
                <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Email Address" className="w-full px-6 py-4 rounded-full bg-[#f0f7f0] border border-[#d8e8d8] text-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#8ccb8c] font-medium" />
                <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Phone Number" className="w-full px-6 py-4 rounded-full bg-[#f0f7f0] border border-[#d8e8d8] text-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#8ccb8c] font-medium" />
                <input required name="guests" value={formData.guests} onChange={handleInputChange} type="number" min="1" placeholder="Number of Guests" className="w-full px-6 py-4 rounded-full bg-[#f0f7f0] border border-[#d8e8d8] text-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#8ccb8c] font-medium" />
                <input required name="date" value={formData.date} onChange={handleInputChange} type="date" className="w-full px-6 py-4 rounded-full bg-[#f0f7f0] border border-[#d8e8d8] text-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#8ccb8c] font-medium" />
                <input required name="time" value={formData.time} onChange={handleInputChange} type="time" className="w-full px-6 py-4 rounded-full bg-[#f0f7f0] border border-[#d8e8d8] text-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#8ccb8c] font-medium" />
              </div>
              <textarea name="special_requests" value={formData.special_requests} onChange={handleInputChange} placeholder="Special Requests (Optional)" rows="3" className="w-full px-6 py-4 rounded-3xl bg-[#f0f7f0] border border-[#d8e8d8] text-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#8ccb8c] font-medium"></textarea>
              <button disabled={bookingStatus === 'submitting'} type="submit" className="w-full py-4 bg-[#1b4332] text-white rounded-full font-bold text-lg hover:bg-[#2D7A4F] transition-colors shadow-lg">
                {bookingStatus === 'submitting' ? 'Confirming...' : 'Confirm Reservation'}
              </button>
              {bookingStatus === 'error' && <p className="text-red-500 text-center mt-2 font-medium">Failed to confirm reservation. Please try again.</p>}
            </form>
          )}
        </motion.div>
      </section>

      <div className="w-full h-24 md:h-32" aria-hidden="true" />

      {/* Gallery Section */}
      <section className="relative w-full max-w-[1100px] flex flex-col items-center mb-40">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#8ccb8c]/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#2D5A27]/05 rounded-full blur-[120px] -z-10" />
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -left-10 text-[#8ccb8c]/40 -z-10"
        >
          <Sun size={120} strokeWidth={1} />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-10 text-[#8ccb8c]/30 -z-10 hidden md:block"
        >
          <Leaf size={48} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -left-16 text-[#8ccb8c]/30 -z-10 hidden md:block"
        >
          <Leaf size={64} />
        </motion.div>
        <div className="flex items-center gap-4 mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ fontFamily: 'Dancing Script', fontSize: '4rem', color: '#1a503a', marginBottom: '30px', fontWeight: 700 }}
          >
            <span className="why-leaf" aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
            Moments in Nature
            <span className="why-leaf why-leaf--flip" aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
          </motion.h2>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -10, rotateZ: -1, boxShadow: "0 30px 60px -12px rgba(45, 122, 79, 0.5)" }}
            viewport={{ once: true }}
            className="relative h-[500px] md:h-full rounded-l-[80px] md:rounded-l-[120px] overflow-hidden shadow-[0_20px_40px_-10px_rgba(45,122,79,0.3)] z-10 border border-[#2D7A4F]/20"
          >
            <img src="/istockphoto-2002324213-612x612.jpg" alt="Forest Dining Moment" className="w-full h-full object-cover transition-all duration-700" />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
          <div className="flex flex-col gap-4 h-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative flex-1 overflow-hidden shadow-[0_20px_40px_-10px_rgba(45,122,79,0.3)] z-10 border border-[#2D7A4F]/20"
            >
              <img src="/istockphoto-139391007-612x612.jpg" alt="Nature Detail" className="w-full h-full object-cover transition-all duration-700" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative flex-1 overflow-hidden shadow-[0_20px_40px_-10px_rgba(45,122,79,0.3)] z-10 border border-[#2D7A4F]/20"
            >
              <img src="/premium_photo-1669261883156-dbf93d00f42a.avif" alt="Delicious Food" className="w-full h-full object-cover transition-all duration-700" />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -10, rotateZ: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative h-[500px] md:h-full rounded-r-[80px] md:rounded-r-[120px] overflow-hidden shadow-[0_20px_40px_-10px_rgba(45,122,79,0.3)] z-10 border border-[#2D7A4F]/20"
          >
            <img src="/photo-1668854826665-88bbcf362f25.avif" alt="Outdoor Table" className="w-full h-full object-cover transition-all duration-700" />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </div>
      </section>

      <div className="w-full h-30 md:h-64" aria-hidden="true" />

      <section className="w-full max-w-[800px] mb-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          viewport={{ once: true }}
          style={{ padding: '40px', marginTop: 0 }}
          className="bg-white/70 backdrop-blur-md rounded-[50px] p-10 md:p-14 text-center shadow-[0_15px_35px_rgba(45,122,79,0.15)] border border-[#2D7A4F]/30"
        >
          <h3 className="text-2xl md:text-3xl font-medium text-[#1b4332] mb-3" style={{ margin: '35px' }}>
            Questions about your visit?
          </h3>
          <p className="text-sm md:text-base text-[#2D5A27]/70 font-medium">
            Call us at <span className="text-[#1b4332] font-bold">(212) 123-4567</span> or email <span className="text-[#1b4332] font-bold">funzonepark@gmail.com</span>
          </p>
        </motion.div>
      </section>

      <div className="w-full h-24 md:h-32" />
    </div>
  );
}