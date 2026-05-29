import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sun } from 'lucide-react';

export default function Restaurant() {
  return (
    <div className="w-full min-h-screen bg-transparent pt-20 pb-20 px-6 flex flex-col items-center">
      
      {/* Hero Section Container */}
      <section className="relative w-full max-w-[1100px] mt-10">
        
        {/* Offset Background Layer (The Green "Shadow") - Made Bigger */}
        <div className="absolute -bottom-12 -right-12 w-full h-full bg-[#1b4332] rounded-[60px] z-0" />

        {/* Main Image Card */}
        <div className="relative w-full h-[450px] rounded-[60px] overflow-hidden shadow-2xl z-10">
          
          {/* Background Image */}
          <img 
            src="/premium_photo-1663090914375-740c1ed3c0bd.avif" 
            alt="Forest Dining Restaurant" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
            
            {/* Top Label with Leaves */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-4"
            >
              <Leaf size={20} className="text-[#8ccb8c] -scale-x-100" strokeWidth={2.5} />
              <span className="text-lg md:text-xl font-medium tracking-wide">Forest Dining</span>
              <Leaf size={20} className="text-[#8ccb8c]" strokeWidth={2.5} />
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-cursive mb-6 drop-shadow-lg"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Dine in Nature
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base md:text-lg max-w-xl mb-10 text-white/90 font-medium leading-relaxed"
            >
              Where the whisper of pines meets the warmth of fire-grilled meals
            </motion.p>

            {/* Button */}
            <motion.button
              onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05, backgroundColor: '#1b4332' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-[#2D5A27] text-white rounded-full font-bold text-lg shadow-xl transition-all"
            >
              Explore our menu
            </motion.button>
          </div>
        </div>
      </section>

      {/* Spacer between Hero and Outdoor Dining */}
      <div className="w-full h-16 md:h-20" aria-hidden="true" />

      {/* Outdoor Dining Details Section */}
      <section className="w-full max-w-[1100px] flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Left Column: Image with Overlapping Badge */}
        <div className="relative w-full md:w-[450px]">
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

          {/* Floating Green Badge - LOWERED AND ADJUSTED */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute -bottom-16 -right-10 md:-right-20 w-full max-w-[500px] bg-[#1b4332] text-white p-12 md:p-14 rounded-[60px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-20 min-h-[250px] flex flex-col justify-center"
          >
            <h4 className="text-3xl font-bold mb-5">The Forest Table</h4>
            <p className="text-lg text-white/90 leading-relaxed">
              Hand-crafted cedar tables placed specifically where the light hits the moss just right.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Text Content */}
        <div className="flex-1 text-left">
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

      {/* Spacer between sections */}
      <div className="w-full h-16 md:h-20" aria-hidden="true" />

      {/* Our Simple Menu Section */}
      <section className="w-full max-w-[1100px] flex flex-col items-center">
        
        {/* Centered Title with Leaves */}
        <div className="flex items-center gap-4 mb-6">
          <Leaf size={24} className="text-[#8ccb8c] -scale-x-100" />
          <h2 
            className="text-4xl md:text-6xl font-cursive text-[#1b4332]"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Our Simple Menu
          </h2>
          <Leaf size={24} className="text-[#8ccb8c]" />
        </div>

        {/* Subtitle */}
        <p className="text-[#2D5A27]/70 text-center max-w-lg mb-24 leading-relaxed font-medium">
          Fresh ingredients, honest cooking, and flavors that<br />celebrate the bounty of nature
        </p>

        {/* Big Centered Image Card */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-[1000px] h-[600px] rounded-[80px] overflow-hidden shadow-2xl"
        >
          <img 
            src="/photo-1563498169267-03f1d7a95271.avif" 
            alt="Organic and Local Ingredients" 
            className="w-full h-full object-cover"
          />
          
          {/* Dark Overlay for Text */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Text Overlay (CENTERED) */}
          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-white text-center">
            <span className="text-lg font-bold mb-3 opacity-90 tracking-widest">FARM TO TABLE</span>
            <h3 className="text-5xl md:text-6xl font-bold mb-8 drop-shadow-md">Organic & Local</h3>
            <p className="max-w-md text-lg md:text-xl text-white/90 leading-relaxed font-medium">
              Every ingredient is carefully sourced from local farms and foraged from nearby forests.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Spacer between sections */}
      <div className="w-full h-12 md:h-16" aria-hidden="true" />

      {/* The Organic Menu Listing Section */}
      <section id="menu-section" className="w-full max-w-[1000px] mb-40">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-xl rounded-[60px] p-12 md:p-20 border border-[#c4dbc4] shadow-[0_30px_70px_rgba(27,67,50,0.15)]"
        >
          {/* Menu Header */}
          <div className="flex flex-col items-center mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <Leaf size={28} className="text-[#8ccb8c] -scale-x-100" />
              <h2 className="text-4xl md:text-6xl font-cursive text-[#1b4332]" style={{ fontFamily: "'Dancing Script', cursive" }}>
                The Organic Menu
              </h2>
              <Leaf size={28} className="text-[#8ccb8c]" />
            </motion.div>
            <div className="w-24 h-[3px] bg-gradient-to-r from-transparent via-[#8ccb8c] to-transparent rounded-full" />
          </div>

          {/* Dedicated Spacer for Maximum Separation */}
          <div className="w-full h-24 md:h-32" aria-hidden="true" />

          {/* Organized Menu Categories */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24">
            
            {/* Vertical Divider (Desktop Only) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#c4dbc4] to-transparent -translate-x-1/2" />

            {/* Category: Fresh Harvest */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-xl font-bold text-[#1b4332] uppercase tracking-[0.2em]">Fresh Harvest</h3>
              </div>
              
              <div className="space-y-12">
                {[
                  { name: "Wild Greens Salad", desc: "Foraged arugula, pine nuts, goat cheese, cider vinaigrette.", price: "$18" },
                  { name: "Roasted Root Medley", desc: "Charred forest carrots, parsnips, beets, wild thyme butter.", price: "$22" }
                ].map((item, i) => (
                  <div key={item.name} className="group cursor-pointer">
                    <div className="flex items-baseline justify-between mb-2">
                      <h4 className="text-lg font-bold text-[#1b4332] group-hover:text-[#2D7A4F] transition-colors whitespace-nowrap">{item.name}</h4>
                      <div className="flex-1 border-b border-dotted border-[#c4dbc4] mx-4 mb-1" />
                      <span className="text-lg font-bold text-[#1b4332] group-hover:scale-110 transition-transform">{item.price}</span>
                    </div>
                    <p className="text-sm text-[#2D5A27]/70 leading-relaxed max-w-[90%]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Category: Fire & Grill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-xl font-bold text-[#1b4332] uppercase tracking-[0.2em]">Fire & Grill</h3>
              </div>
              
              <div className="space-y-12">
                {[
                  { name: "Oak-Smoked Venison", desc: "Locally sourced venison, juniper berry reduction, gold potatoes.", price: "$38" },
                  { name: "Cedar Plank Salmon", desc: "Wild caught, grilled on cedar, lemon-herb emulsion.", price: "$34" }
                ].map((item, i) => (
                  <div key={item.name} className="group cursor-pointer">
                    <div className="flex items-baseline justify-between mb-2">
                      <h4 className="text-lg font-bold text-[#1b4332] group-hover:text-[#2D7A4F] transition-colors whitespace-nowrap">{item.name}</h4>
                      <div className="flex-1 border-b border-dotted border-[#c4dbc4] mx-4 mb-1" />
                      <span className="text-lg font-bold text-[#1b4332] group-hover:scale-110 transition-transform">{item.price}</span>
                    </div>
                    <p className="text-sm text-[#2D5A27]/70 leading-relaxed max-w-[90%]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Explicit Spacer for Balanced Separation */}
          <div className="w-full h-16 md:h-20" aria-hidden="true" />

          <div className="flex flex-col items-center">
            {/* Sourcing Note */}
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

            {/* Redesigned "Book Now" Button */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#1b4332' }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-20 py-6 bg-[#2D5A27] text-white rounded-full font-bold text-xl shadow-2xl overflow-hidden transition-all flex items-center gap-4"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
              <Leaf size={24} className="text-[#8ccb8c] group-hover:rotate-12 transition-transform" />
              <span>BOOK YOUR TABLE</span>
            </motion.button>
          </div>

        </motion.div>
      </section>

      {/* Spacer between Menu and Gallery */}
      <div className="w-full h-24 md:h-32" aria-hidden="true" />

      {/* Moments in Nature Gallery Section */}
      <section className="relative w-full max-w-[1100px] flex flex-col items-center mb-40">
        
        {/* Organic Background Decorations & Icons */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#8ccb8c]/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#2D5A27]/05 rounded-full blur-[120px] -z-10" />
        
        {/* Decorative Floating Icons */}
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

        {/* Gallery Title */}
        <div className="flex items-center gap-4 mb-24">
          <Leaf size={24} className="text-[#8ccb8c] -scale-x-100" />
          <h2 
            className="text-4xl md:text-6xl font-cursive text-[#1b4332]"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Moments in Nature
          </h2>
          <Leaf size={24} className="text-[#8ccb8c]" />
        </div>

        {/* Gallery Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
          
          {/* Left Column: Tall Image (Rounded Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -10, rotateZ: -1, boxShadow: "0 30px 60px -12px rgba(45, 122, 79, 0.5)" }}
            viewport={{ once: true }}
            className="relative h-[500px] md:h-full rounded-l-[80px] md:rounded-l-[120px] overflow-hidden shadow-[0_20px_40px_-10px_rgba(45,122,79,0.3)] z-10 border border-[#2D7A4F]/20"
          >
            <img 
              src="/istockphoto-2002324213-612x612.jpg" 
              alt="Forest Dining Moment" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
          </motion.div>

          {/* Middle Column: Two Stacked Images (Sharp Corners) */}
          <div className="flex flex-col gap-4 h-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 30px 60px -12px rgba(45, 122, 79, 0.5)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative flex-1 overflow-hidden shadow-[0_20px_40px_-10px_rgba(45,122,79,0.3)] z-10 border border-[#2D7A4F]/20"
            >
              <img 
                src="/istockphoto-139391007-612x612.jpg" 
                alt="Nature Detail" 
                className="w-full h-full object-cover transition-all duration-700"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 30px 60px -12px rgba(45, 122, 79, 0.5)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative flex-1 overflow-hidden shadow-[0_20px_40px_-10px_rgba(45,122,79,0.3)] z-10 border border-[#2D7A4F]/20"
            >
              <img 
                src="/premium_photo-1669261883156-dbf93d00f42a.avif" 
                alt="Delicious Food" 
                className="w-full h-full object-cover transition-all duration-700"
              />
            </motion.div>
          </div>

          {/* Right Column: Tall Image (Rounded Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -10, rotateZ: 1, boxShadow: "0 30px 60px -12px rgba(45, 122, 79, 0.5)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative h-[500px] md:h-full rounded-r-[80px] md:rounded-r-[120px] overflow-hidden shadow-[0_20px_40px_-10px_rgba(45,122,79,0.3)] z-10 border border-[#2D7A4F]/20"
          >
            <img 
              src="/photo-1668854826665-88bbcf362f25.avif" 
              alt="Outdoor Table" 
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
          </motion.div>

        </div>
      </section>
      {/* Extra Large Spacer for Maximum Breathing Room */}
      <div className="w-full h-40 md:h-64" aria-hidden="true" />

      <section className="w-full max-w-[900px] mb-32 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(45, 122, 79, 0.3)" }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-md rounded-[50px] p-10 md:p-14 text-center shadow-[0_15px_35px_rgba(45,122,79,0.15)] border border-[#2D7A4F]/30"
        >
          <h3 className="text-2xl md:text-3xl font-medium text-[#1b4332] mb-3">
            Questions about your visit?
          </h3>
          <p className="text-sm md:text-base text-[#2D5A27]/70 font-medium">
            Call us at <span className="text-[#1b4332] font-bold">(212) 123-4567</span> or email <span className="text-[#1b4332] font-bold">funzonepark@gmail.com</span>
          </p>
        </motion.div>
      </section>

      {/* Final Spacing for Footer */}
      <div className="w-full h-24 md:h-32" />

    </div>
  );
}

