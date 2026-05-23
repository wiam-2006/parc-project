import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, UsersRound, ThumbsUp, Footprints, CheckCircle2, Sprout, TreePine, Wind } from 'lucide-react';

const stats = [
  { icon: Leaf, value: '50K+', label: 'Protected Acres' },
  { icon: UsersRound, value: '15K+', label: 'Happy members' },
  { icon: ThumbsUp, value: '98%', label: 'Satisfaction Rate' },
  { icon: Footprints, value: '250k+', label: 'Adventure Seekers' }
];

const plans = [
  {
    name: 'Basic',
    price: '$29/month or\n$290/year',
    features: ['Access to 3 Adventure seekers', 'Weekday entry (Mon-Thu)', 'Basic hiking trails', 'Parking included', 'Newsletter & updates'],
    isPopular: false,
    btnText: 'Join to park',
    btnClass: 'bg-[#dcecd8] text-[#1b4332] border border-[#1b4332] hover:bg-[#c5dec0]'
  },
  {
    name: 'Premium',
    price: '$79/month or\n$790/year',
    features: ['Unlimited 7-day access', 'Premium trails & activities', 'Priority parking & entry', 'Guided nature tours (2/month)', 'Eco-wellness programs'],
    isPopular: true,
    btnText: 'Subscribe now',
    btnClass: 'bg-[#1b4332] text-white hover:bg-[#0f291e]'
  },
  {
    name: 'VIP',
    price: '$149/month or\n$1,490/year',
    features: ['All Premium benefits', 'Personal nature guide', 'Photography workshops', 'Concierge service', 'Annual retreat invitation'],
    isPopular: false,
    btnText: 'Go VIP',
    btnClass: 'bg-[#dcecd8] text-[#1b4332] border border-[#1b4332] hover:bg-[#c5dec0]'
  }
];

export default function Memberships({ setCurrentPage }) {
  return (
    <div className="w-full min-h-screen font-sans bg-[#eef5eb] pb-32">
      
      {/* Hero Section */}
      <section className="px-6 pt-32 pb-16 w-full flex justify-center relative">
        <div className="relative w-full max-w-[1050px] h-[580px] rounded-[60px] shadow-2xl z-10">
          
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
              className="px-10 py-4 bg-[#2D5A27] text-white rounded-full font-bold text-lg hover:bg-[#1f3f1b] transition-colors shadow-lg"
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
      <section id="pricing" className="px-6 pb-20 w-full max-w-[1400px] mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-20 md:mb-28 relative w-full px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center justify-center gap-3 md:gap-4 text-4xl md:text-5xl font-cursive text-[#1b4332] mb-8 drop-shadow-sm"
          >
            <Leaf className="w-6 h-6 md:w-8 md:h-8 -scale-x-100 text-[#8ccb8c]" strokeWidth={1.5} />
            Choose your Experience
            <Leaf className="w-6 h-6 md:w-8 md:h-8 rotate-[45deg] text-[#8ccb8c]" strokeWidth={1.5} />
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
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.2, duration: 0.5, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05, 
                y: -10, 
                boxShadow: plan.isPopular ? "0 25px 50px rgba(140,203,140,0.6)" : "0 25px 50px rgba(45,90,39,0.15)" 
              }}
              className={`rounded-[40px] flex flex-col items-center transition-all duration-300 border-[1.5px] flex-1 w-full max-w-[380px] min-h-[600px] ${
                plan.isPopular 
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
                  boxShadow: plan.isPopular
                    ? '0 16px 40px rgba(27,67,50,0.6), 0 0 0 3px rgba(140,203,140,0.4)'
                    : '0 12px 30px rgba(45,90,39,0.25), 0 0 0 2px rgba(140,203,140,0.3)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`
                  group relative overflow-hidden
                  w-[95%] max-w-[340px] py-[22px] rounded-full
                  font-bold text-[19px] tracking-wider
                  flex items-center justify-center gap-[12px]
                  ${plan.isPopular
                    ? 'text-white'
                    : 'text-[#1b4332]'
                  }
                `}
                style={plan.isPopular ? {
                  background: 'linear-gradient(145deg, #2D7A4F 0%, #1b4332 55%, #0f2920 100%)',
                  boxShadow: '0 6px 24px rgba(27,67,50,0.45), inset 0 1px 0 rgba(255,255,255,0.12)'
                } : {
                  background: 'linear-gradient(145deg, #f0f7ee 0%, #dcecd8 100%)',
                  boxShadow: '0 4px 16px rgba(45,90,39,0.18), inset 0 1px 0 rgba(255,255,255,0.8)',
                  border: '1.5px solid rgba(45,122,79,0.45)'
                }}
              >
                {/* forest-light shimmer */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.15) 50%, transparent 80%)',
                  }}
                />
                {/* leaf icon */}
                <motion.span
                  className="relative z-10 flex items-center"
                  whileHover={{ rotate: -15, scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {plan.isPopular
                    ? <TreePine size={18} strokeWidth={1.8} className="text-[#8ccb8c]" />
                    : <Sprout size={18} strokeWidth={1.8} className="text-[#2D7A4F]" />
                  }
                </motion.span>
                <span className="relative z-10">{plan.btnText}</span>
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
          className="relative w-full max-w-[1050px] h-[480px] rounded-[60px] shadow-2xl overflow-hidden"
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
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative overflow-hidden flex items-center gap-3 px-10 py-[18px] rounded-full text-white font-semibold text-[17px] tracking-wide"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1.5px solid rgba(255,255,255,0.55)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.25)'
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
                  boxShadow: '0 6px 24px rgba(27,67,50,0.5), inset 0 1px 0 rgba(255,255,255,0.12)'
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

      {/* Balanced Spacer between CTA and Newsletter */}
      <div className="w-full h-32 md:h-48" aria-hidden="true" />

      {/* Newsletter Banner Section - Centered between CTA and Footer */}
      <section className="px-6 pb-32 md:pb-48 w-full flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[700px] bg-[#dcedd9] rounded-[30px] p-10 md:p-16 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(27,67,50,0.12)] border border-[#c4dbc4]"
        >
          {/* 🌿 Nature Icon */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 bg-white/60 rounded-full flex items-center justify-center mb-8 shadow-sm"
          >
            <Sprout size={40} className="text-[#2D7A4F]" />
          </motion.div>

          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1b4332] mb-12 max-w-lg leading-tight tracking-tight">
            Subscribe To Our Newsletter & Grab 30% OFF
          </h2>
          
          <form className="flex flex-col sm:flex-row gap-0 w-full max-w-lg bg-white/50 backdrop-blur-md rounded-full overflow-hidden border border-[#b5d1b5] p-1.5 shadow-inner">
            <input 
              type="email" 
              placeholder="Enter Your Email" 
              className="flex-1 px-8 py-6 bg-transparent focus:outline-none text-[#1b4332] placeholder-[#1b4332]/50 font-medium text-sm"
              required
            />
            <motion.button 
              whileHover={{ scale: 1.03, backgroundColor: '#2d4d3f' }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="px-10 py-6 bg-[#3a6351] text-white rounded-full font-bold text-sm hover:bg-[#2d4d3f] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Leaf size={16} className="text-[#8ccb8c]" />
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </section>
      
      {/* Footer Spacer */}
      <div className="w-full h-24 md:h-24" aria-hidden="true" />
    </div>
  );
}
