import React from 'react';
import { 
  Award, Facebook, Instagram, Twitter, 
  Linkedin, MapPin, Phone, Mail, Heart 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#0A1628] to-[#050B14] text-white relative overflow-hidden">
      {/* Background Glow Effects (Figma Style) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px]"></div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#D4AF37] blur-md opacity-50"></div>
                
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-hidden">
  <img 
    src="/Images/DelhiDential.png"  
    alt="Delhi Dental Logo" 
    className="w-full h-full object-contain"
  />
</div>
                {/* <div className="relative bg-gradient-to-br from-[#D4AF37] to-[#B8941F] px-3 py-2 rounded-lg">
                  <span className="text-[#0A1628] font-bold tracking-wider">DDC</span>
                </div> */}
              </div>
              <div className="ml-3">
                <div className="text-xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text text-transparent">
                  Delhi Dental Clinic
                </div>
              </div>
            </div>
            
            <p className="text-[#C0C0C0] leading-relaxed text-sm">
              Providing excellence in dental care for over 20 years. Your smile is our priority, your satisfaction is our success.
            </p>

            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Award size={20} />
              <span className="text-sm font-medium">Award-Winning Clinic</span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                <a key={index} href="#" className="w-10 h-10 bg-[#1A2B47] border border-[#D4AF37]/30 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-[#D4AF37] hover:to-[#B8941F] transition-all duration-300 group">
                  <Icon size={18} className="text-[#D4AF37] group-hover:text-[#0A1628]" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-white mb-6 flex items-center gap-2 font-bold">
              <div className="w-1 h-6 bg-gradient-to-b from-[#D4AF37] to-[#B8941F] rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3 text-[#C0C0C0]">
              {['Home', 'Our Services', 'Infrastructure', 'Our Team', 'Testimonials', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="hover:text-[#D4AF37] transition-colors duration-300 inline-flex items-center gap-2 group text-sm">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#D4AF37] transition-all duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Services */}
          <div>
            <h3 className="text-white mb-6 flex items-center gap-2 font-bold">
              <div className="w-1 h-6 bg-gradient-to-b from-[#D4AF37] to-[#B8941F] rounded-full"></div>
              Our Services
            </h3>
            <ul className="space-y-3 text-[#C0C0C0]">
              {['General Dentistry', 'Cosmetic Dentistry', 'Orthodontics', 'Root Canal', 'Dental Implants', 'Pediatric Care'].map((service) => (
                <li key={service}>
                  <a href="#" className="hover:text-[#D4AF37] transition-colors duration-300 inline-flex items-center gap-2 group text-sm">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#D4AF37] transition-all duration-300"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="text-white mb-6 flex items-center gap-2 font-bold">
              <div className="w-1 h-6 bg-gradient-to-b from-[#D4AF37] to-[#B8941F] rounded-full"></div>
              Contact Info
            </h3>
            <div className="space-y-4 text-[#C0C0C0]">
              <div className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-10 h-10 bg-[#1A2B47] border border-[#D4AF37]/30 rounded-lg flex items-center justify-center group-hover:border-[#D4AF37] transition-all duration-300">
                  <MapPin size={18} className="text-[#D4AF37]" />
                </div>
                <div className="text-sm leading-relaxed">Ground floor R-241 Greater kailash-I Opp. GK-1 police station. New delhi-110048 </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-10 h-10 bg-[#1A2B47] border border-[#D4AF37]/30 rounded-lg flex items-center justify-center group-hover:border-[#D4AF37] transition-all duration-300">
                  <Phone size={18} className="text-[#D4AF37]" />
                </div>
                <div className="text-sm">+91 8079797978 <br /> +91 011-xxxxxxx </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-10 h-10 bg-[#1A2B47] border border-[#D4AF37]/30 rounded-lg flex items-center justify-center group-hover:border-[#D4AF37] transition-all duration-300">
                  <Mail size={18} className="text-[#D4AF37]" />
                </div>
                <div className="text-sm">info@delhidental.org</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#D4AF37]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#C0C0C0]">
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-[#D4AF37] fill-[#D4AF37]" />
              © 2024 Delhi Dental Clinic. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;







// import React from 'react';
// import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, ChevronRight } from 'lucide-react';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-[#0a1122] text-gray-300 border-t mt-8 border-gray-800">
//       <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 pt-16 pb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
//           {/* 1. Clinic Brand Section */}
//           <div className="space-y-6">
//             <div className="flex items-center gap-3">
//               <div className="bg-[#d4af37] text-[#0a1122] font-bold p-2 rounded-md text-lg">
//                 DDC
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-white tracking-tight">DELHI DENTAL</h2>
//                 <p className="text-[10px] text-[#d4af37] uppercase tracking-widest">Clinic & Care</p>
//               </div>
//             </div>
//             <p className="text-sm leading-relaxed text-gray-400">
//               Providing world-class dental treatments with the latest technology and 20+ years of excellence in New Delhi.
//             </p>
//             <div className="flex gap-4">
//               <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#d4af37] hover:text-[#0a1122] transition-all">
//                 <Facebook size={18} />
//               </a>
//               <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#d4af37] hover:text-[#0a1122] transition-all">
//                 <Instagram size={18} />
//               </a>
//               <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#d4af37] hover:text-[#0a1122] transition-all">
//                 <Twitter size={18} />
//               </a>
//             </div>
//           </div>

//           {/* 2. Quick Links */}
//           <div>
//             <h3 className="text-white font-bold text-lg mb-6 border-b-2 border-[#d4af37] w-fit">Quick Links</h3>
//             <ul className="space-y-4">
//               {['Home', 'Services', 'Infrastructure', 'Our Team', 'Testimonials'].map((item) => (
//                 <li key={item} className="flex items-center gap-2 group cursor-pointer">
//                   <ChevronRight size={14} className="text-[#d4af37] group-hover:translate-x-1 transition-transform" />
//                   <span className="hover:text-[#d4af37] text-sm transition-colors">{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* 3. Dental Services */}
//           <div>
//             <h3 className="text-white font-bold text-lg mb-6 border-b-2 border-[#d4af37] w-fit">Our Services</h3>
//             <ul className="space-y-4 text-sm">
//               <li className="hover:text-[#d4af37] cursor-pointer">Teeth Whitening</li>
//               <li className="hover:text-[#d4af37] cursor-pointer">Dental Implants</li>
//               <li className="hover:text-[#d4af37] cursor-pointer">Root Canal Treatment</li>
//               <li className="hover:text-[#d4af37] cursor-pointer">Orthodontic Braces</li>
//               <li className="hover:text-[#d4af37] cursor-pointer">Pediatric Dentistry</li>
//             </ul>
//           </div>

//           {/* 4. Contact Info */}
//           <div>
//             <h3 className="text-white font-bold text-lg mb-6 border-b-2 border-[#d4af37] w-fit">Contact Us</h3>
//             <div className="space-y-4">
//               <div className="flex items-start gap-3">
//                 <MapPin size={20} className="text-[#d4af37] shrink-0" />
//                 <p className="text-sm text-gray-400">
//                   123 Connaught Place, <br /> Near Metro Gate No. 2, New Delhi, 110001
//                 </p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Phone size={18} className="text-[#d4af37]" />
//                 <p className="text-sm">+91 11-2345-6789</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Mail size={18} className="text-[#d4af37]" />
//                 <p className="text-sm">info@delhidentalclinic.com</p>
//               </div>
//             </div>
//           </div>

//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
//           <p>© {currentYear} Delhi Dental Clinic. All Rights Reserved. Designed for Premium Excellence.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;