import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Send, MessageCircle, 
  Clock, Globe, CircleCheckBig, Sparkles, ShieldCheck, QrCode 
} from 'lucide-react';

import SEO from '../components/SEO';
import seoData from '../seoData';

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    service: '',
    date: '', 
    message: '' 
  });

  // Loading state add ki hai
  const [isSubmitting, setIsSubmitting] = useState(false);

 const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Button disable ho jayega aur loading dikhayega

    try {
      const response = await fetch('https://ddc-backend-ufaf.onrender.com/api/contact', {
      // const response = await fetch('http://localhost:5000/api/contact', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message Sent Successfully!");
        // Form Reset logic
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'General Checkup',
          date: '',
          message: ''
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Server error. Please check if your backend is running.");
    } finally {
      setIsSubmitting(false); // Response aane ke baad button wapas enable ho jayega
    }
  };

  return (
    <>
    <SEO 
        title={seoData.home.title} 
        description={seoData.home.description} 
        keywords={seoData.home.keywords} 
      />
    <main className="w-full bg-[#050B14] overflow-hidden">
      
      {/* ================= HERO / HEADER SECTION ================= */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#0A1628] to-[#050B14] border-b border-gray-800/50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} /> Get In Touch
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Book Your Appointment</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Take the first step towards a healthier, brighter smile. Our expert team is ready to serve you with 
            painless technology and premium care.
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT (Cards & Form) ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Info Cards (40% width on Desktop) */}
            <div className="lg:col-span-5 space-y-8">
              <h3 className="text-3xl font-bold text-white mb-8 italic">Visit Our Premium Clinic</h3>
              
              <div className="grid grid-cols-1 gap-6 text-left">
                <NewContactCard 
                  icon={<MapPin />}
                  title="Clinic Location"
                  line1="R-241, Ground Floor, G.K-1,"
                  line2="Opp. GK-1 Police Station, New Delhi - 110048"
                  linkText="View on Google Maps"
                  link="https://www.google.com/maps/place/R-241,+Ground+Floor,+G.K-1,+Opp.+GK-1+Police+Station,+New+Delhi+-+110048"
                />

                {/* --- QR CODE SECTION START --- */}
                <div className="bg-[#0A1628]/40 backdrop-blur-sm border border-[#D4AF37]/20 p-6 rounded-3xl flex items-center gap-6 group hover:border-[#D4AF37]/50 transition-all duration-300">
                  <div className="bg-white p-2 rounded-xl shrink-0 group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src="/Images/QR_CODE.jpeg" 
                      alt="Clinic QR Code" 
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-1 flex items-center gap-2">
                      <QrCode size={14} /> Scan for Location
                    </h4>
                    <p className="text-white font-bold text-sm leading-tight">Digital Wayfinder</p>
                    <p className="text-gray-400 text-xs mt-2">Scan with your phone camera to get instant directions on Google Maps.</p>
                  </div>
                </div>
                {/* --- QR CODE SECTION END --- */}

                <NewContactCard 
                  icon={<Phone />}
                  title="Phone Numbers"
                  line1="+91 80-79-79-79-78"
                  line2="011-410-16-309"
                  highlight="(Emergency Support)"
                />

                <NewContactCard 
                  icon={<Globe />}
                  title="Online Presence"
                  line1="www.delhidental.org"
                  line2="delhidentalclinicindia@gmail.com"
                />

                <NewContactCard 
                  icon={<Clock />}
                  title="Working Hours"
                  line1="Tue - Sat: 9:00 AM - 7:00 PM and Mon - Close"
                  // line2="Sunday: 10:00 AM - 2:00 PM"
                  // highlight="Emergency: 24/7 Available"
                />
              </div>

              {/* Professional WhatsApp Integration */}
              <a 
                href="https://wa.me/918079797978?text=Hi, I want to book an appointment at Delhi Dental Clinic."
                target="_blank"
                className="flex items-center justify-between p-6 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-3xl text-white font-bold text-lg hover:shadow-2xl hover:shadow-green-500/20 transition-all transform hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-4">
                  <MessageCircle size={32} fill="white" className="text-green-600" />
                  <span>Immediate Chat on WhatsApp</span>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform">
                   <Send size={18} />
                </div>
              </a>
            </div>

            {/* Right Column: Appointment Form (60% width on Desktop) */}
            <div className="lg:col-span-7 mt-16">
              <div className="bg-[#0A1628] rounded-[40px] p-8 md:p-12 border border-gray-800 shadow-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-3xl rounded-full"></div>
                
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <ShieldCheck className="text-[#D4AF37]" /> Secure Appointment Request
                </h3>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 text-left">
  
  {/* Full Name - Full Width (md:col-span-2) */}
  <div className="md:col-span-2 space-y-2">
    <label className="text-gray-400 text-xs uppercase font-bold tracking-widest ml-2">Full Name *</label>
    <input 
      type="text" 
      value={formData.name} 
      onChange={(e) => setFormData({...formData, name: e.target.value})} 
      placeholder="John Doe" 
      className="w-full p-4 bg-[#e7f0f8] border border-gray-800 rounded-2xl text-black outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" 
      required 
    />
  </div>

  {/* Email Address */}
  <div className="space-y-2">
    <label className="text-gray-400 text-xs uppercase font-bold tracking-widest ml-2">Email Address *</label>
    <input 
      type="email" 
      value={formData.email} 
      onChange={(e) => setFormData({...formData, email: e.target.value})} 
      placeholder="john@example.com" 
      className="w-full p-4 bg-[#e7f0f8] border border-gray-800 rounded-2xl text-black outline-none focus:border-[#D4AF37] transition-all" 
      required 
    />
  </div>

  {/* Phone Number */}
  <div className="space-y-2">
    <label className="text-gray-400 text-xs uppercase font-bold tracking-widest ml-2">Phone Number *</label>
    <input 
      type="tel" 
      value={formData.phone} 
      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
      placeholder="+91 XXXXX XXXXX" 
      className="w-full p-4 bg-[#e7f0f8] border border-gray-800 rounded-2xl text-black outline-none focus:border-[#D4AF37] transition-all" 
      required 
    />
  </div>

  {/* Preferred Service */}
  <div className="space-y-2">
    <label className="text-gray-400 text-xs uppercase font-bold tracking-widest ml-2">Preferred Service *</label>
    <select 
      value={formData.service} 
      onChange={(e) => setFormData({...formData, service: e.target.value})}  
      className="w-full p-4 bg-[#e7f0f8] border border-gray-800 rounded-2xl text-[#0A1628] outline-none focus:border-[#D4AF37] transition-all appearance-none cursor-pointer" 
      required
    >
      <option value="" disabled>Select a service</option>
      <option value="General Checkup">General Checkup</option>
      <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
      <option value="Orthodontics">Orthodontics</option>
      <option value="Dental Implants">Dental Implants</option>
      <option value="Root Canal Treatment">Root Canal Treatment</option>
    </select>
  </div>

  {/* Preferred Date */}
  <div className="space-y-2">
    <label className="text-gray-400 text-xs uppercase font-bold tracking-widest ml-2">Preferred Date *</label>
    <input 
      type="date" 
      value={formData.date}
      min={new Date().toISOString().split("T")[0]} 
      onChange={(e) => setFormData({...formData, date: e.target.value})} 
      className="w-full p-4 bg-[#e7f0f8] border border-gray-800 rounded-2xl text-black outline-none focus:border-[#D4AF37] transition-all cursor-pointer" 
      required 
    />
  </div>

  {/* Your Message - Full Width */}
  <div className="md:col-span-2 space-y-2">
    <label className="text-gray-400 text-xs uppercase font-bold tracking-widest ml-2">Your Message</label>
    <textarea 
      rows="4" 
      value={formData.message} 
      onChange={(e) => setFormData({...formData, message: e.target.value})} 
      placeholder="How can we help you?" 
      className="w-full p-4 bg-[#e7f0f8] border border-gray-800 rounded-2xl text-black outline-none focus:border-[#D4AF37] transition-all resize-none"
    ></textarea>
  </div>

  {/* Submit Button Section - Full Width */}
  <div className="md:col-span-2 mt-4">
    <button 
      type="submit" 
      disabled={isSubmitting} 
      className={`w-full py-5 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-3 transition-all ${
        isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A1628] hover:scale-[1.01]'
      }`}
    >
      {isSubmitting ? (
        <>Processing... <Clock className="animate-spin" size={20} /></>
      ) : (
        <>Confirm & Send Request <Send size={20} /></>
      )}
    </button>
    <p className="text-center text-gray-500 text-xs mt-6 font-medium italic">
      * We typically respond within 2 business hours.
    </p>
  </div>
</form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PREMIUM CTA BANNER SECTION ================= */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#0A1628] via-[#1A2B47] to-[#0A1628] rounded-[50px] p-10 md:p-16 border border-[#D4AF37]/20 shadow-4xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-96 h-96 border-[40px] border-[#D4AF37]/5 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 border-[40px] border-blue-500/5 rounded-full"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="text-center lg:text-left space-y-6 lg:max-w-2xl text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Experience <span className="text-[#D4AF37] italic font-serif">Painless</span> Dental Excellence
                </h2>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Badge icon={<CircleCheckBig />} text="Certified Specialists" />
                  <Badge icon={<CircleCheckBig />} text="Painless Treatment" />
                  <Badge icon={<CircleCheckBig />} text="Luxury Facility" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
                <a href="tel:+011-410-16-309" className="px-10 py-5 bg-white text-[#0A1628] rounded-2xl font-extrabold text-center hover:bg-[#D4AF37] hover:text-white transition-all shadow-xl">
                  Call Now
                </a>
                <a href="https://wa.me/918079797978" className="px-10 py-5 border-2 border-white/20 text-white rounded-2xl font-extrabold text-center hover:bg-white/10 transition-all">
                  Chat Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

// --- Reusable Sub-Components ---

const NewContactCard = ({ icon, title, line1, line2, linkText, link, highlight }) => (
  <div className="group bg-[#0A1628]/40 backdrop-blur-sm border border-gray-800 p-6 rounded-3xl hover:border-[#D4AF37]/40 transition-all duration-300 flex gap-5">
    <div className="flex-shrink-0 w-14 h-14 bg-[#1A2B47] rounded-2xl flex items-center justify-center group-hover:bg-[#D4AF37] transition-all duration-500 shadow-inner">
      {React.cloneElement(icon, { size: 28, className: "text-[#D4AF37] group-hover:text-white transition-colors duration-500" })}
    </div>
    <div className="space-y-1 text-left">
      <h4 className="text-[#D4AF37] font-bold text-xs uppercase tracking-[0.2em] mb-2">{title}</h4>
      <p className="text-white font-bold text-base leading-tight">{line1}</p>
      <p className="text-gray-100 text-sm">{line2}</p>
      {highlight && <p className="text-blue-400 text-xs font-bold italic mt-2">{highlight}</p>}
      {linkText && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block text-[#D4AF37] text-xs font-bold underline underline-offset-4 mt-3 hover:text-white transition-colors">
          {linkText}
        </a>
      )}
    </div>
  </div>
);

const Badge = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm font-medium">
    {React.cloneElement(icon, { size: 16, className: "text-[#D4AF37]" })}
    {text}
  </div>
);

export default Contact;