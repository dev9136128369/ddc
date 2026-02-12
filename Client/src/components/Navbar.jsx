import React, { useState } from 'react';
import { Menu, X, Phone, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
const { user, logout } = useUser();


 const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/About' },
    { name: 'Services', href: '/Services' },
    { name: 'Our Team', href: '/OurTeam' },
    { name: 'Testimonials', href: '/Testimonials' },
    { name: 'Blogs', href: '/BlogCard' },
    { name: 'Contact', href: '/Contact' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-[#0A1628] shadow-2xl border-b border-gray-800">
      
      {/* 1. TOP BAR - Info Layer (Desktop Only) */}
      <div className="hidden lg:flex bg-[#0A1628] text-gray-300 py-2.5 px-10 justify-between items-center text-xs border-b border-gray-800">
        <div className="flex gap-8">
          <span className="flex items-center gap-2 hover:text-[#d4af37] transition-colors cursor-default">
            <MapPin size={14} className="text-[#d4af37]" /> New Delhi, India
          </span>
          <span className="flex items-center gap-2 hover:text-[#d4af37] transition-colors cursor-default">
            <Phone size={14} className="text-[#d4af37]" /> +91 80-79-79-79-78 , 011-410-16-309 
          </span>
        </div>
        <div className="flex gap-4 uppercase tracking-widest font-bold text-[10px]">
          <span className="text-[#d4af37] animate-pulse">●</span>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-20">
          
       
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4">
       <div className="flex items-center gap-4">
  {/* Logo Image Container */}
  <div className="relative w-26 h-26 md:w-30 md:h-25 flex items-center justify-center overflow-hidden">
    <img 
      src="/Images/Transparent.png" 
      alt="Delhi Dental Logo" 
      className="w-full h-full object-contain"
    />
  </div>

  {/* Text Section */}
  <div className="flex flex-col border-l border-gray-700 pl-4">
    <h1 className="text-xl md:text-2xl font-extrabold text-[#d4af37] tracking-tight leading-none uppercase">
      Delhi Dental
    </h1>
    <p className="text-[10px] md:text-[12px] text-gray-400 font-semibold tracking-[0.2em] uppercase mt-1">
      Premium Dental Excellence
    </p>
  </div>
</div>
</Link>
          {/* <div className="flex items-center gap-3">
            <div className="bg-[#d4af37] text-[#0a1122] font-bold p-2.5 rounded-md text-xl shadow-lg">
              DDC
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-extrabold text-[#d4af37] tracking-tight leading-none">
                Delhi Dental Clinic
              </h1>
              <p className="text-[10px] text-gray-400 font-semibold tracking-[0.2em] uppercase">
                Premium Dental Excellence
              </p>
            </div>
          </div> */}

          {/* Desktop Menu Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href} // 3. href ko 'to' mein badla
                className="text-white hover:text-[#d4af37] text-[18px] transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

 {/* Desktop Right Actions Combined */}
<div className="hidden lg:flex items-center gap-4">
  {user ? (
    <div className="flex items-center gap-3">
      {user.email === "delhidentalclinicindia@gmail.com" && (
        <Link to="/ManagementDashboard" className="text-sm font-medium text-white hover:text-[#d4af37]">
          Dashboard
        </Link>
      )}
      <button onClick={handleLogout} className="text-sm font-semibold bg-white/10 text-white hover:bg-white/20 h-9 rounded-lg px-4 transition-all">
        Logout
      </button>
    </div>
  ) : (
    <Link to="/LoginPage" className="text-sm font-semibold bg-gradient-to-r from-[#F68D22] to-[#244C68] text-white h-9 rounded-lg px-5 flex items-center hover:scale-105 transition-all">
      Login
    </Link>
  )}
  
  <Link to="/Contact" className="bg-[#d4af37] hover:bg-[#b8962e] text-[#0a1122] px-6 py-2.5 rounded-md font-bold text-sm transition-all flex items-center gap-2">
    <Calendar size={16} /> Book Now
  </Link>
</div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#d4af37] focus:outline-none"
            >
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE MENU OVERLAY */}
      <div className={`lg:hidden fixed inset-0 bg-[#0a1122] z-[60] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-3">
             <div className="text-[#d4af37] font-bold text-2xl">DDC</div>
             <button onClick={() => setIsOpen(false)} className="text-[#d4af37]"><X size={35} /></button>
          </div>
         <div className="flex flex-col gap-2 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href} // 4. Mobile mein bhi 'to' use kiya
                className="text-lg font-semibold text-gray-200 hover:text-[#d4af37]"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

{/* Mobile Menu Actions Section */}
<div className="mt-4 pt-4 border-t border-gray-800">
  {user ? (
    <div className="flex flex-col gap-4">
      {user.email === "delhidentalclinicindia@gmail.com" && (
        <Link to="/ManagementDashboard" className="text-xl text-white" onClick={handleLinkClick}>
          Dashboard
        </Link>
      )}
      <button onClick={handleLogout} className="bg-red-500/20 text-red-500 px-6 py-4 rounded-lg font-bold text-lg">
        Logout
      </button>
    </div>
  ) : (
    <Link to="/LoginPage" onClick={handleLinkClick} className="bg-blue-600 text-white px-6 py-4 rounded-lg font-bold text-lg text-center">
      Login to Portal
    </Link>
  )}
</div>

            <Link to="/Contact" onClick={() => setIsOpen(false)} className="mt-6 bg-[#d4af37] text-[#0a1122] px-6 py-4 rounded-lg font-bold text-lg text-center">
               Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;