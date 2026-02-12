import React from 'react';
import { 
  Award, GraduationCap, Star, Calendar, 
  Linkedin, Mail, Heart, ShieldCheck, Microscope, Baby, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

import SEO from '../components/SEO';
import seoData from '../seoData';


const OurTeam = () => {
  // Founder Data
  const founder = {
    name: "Dr. Nitu Gautam",
    role: "Founder & Chief Dental Surgeon",
    exp: "16+ Years Experience",
    edu: "BDS (Nair, Mumbai), \nMDS (Orthodontics, IDS)",
    college: "Professor (IDS, S’O’A University)",
    spec: "Senior Consultant Orthodontist & Implantologist",
    highlight: "Fellow of World Federation of Orthodontists (WFO) • Editor IOS Times • Reg no-3224/A",
    img: "/Images/Dr_Netu.jpg"
  };

  // Specialists Data (Including Dr. Ayesha Jain)
  const specialists = [
    {
      name: "Dr. Ayesha Jain",
      role: "Senior Oral Surgeon",
      // exp: "16+ Years Experience",
      edu: "BDS (Oral Surgery)",
      college: "Nair Hospital Dental College, Mumbai",
      spec: "Root Canal, Aesthetic Dentistry & Smile Makeovers",
      highlight: "Combines clinical precision with an artistic eye for natural-looking smiles.",
      img: "/Images/DrAyeshaJain.jpg" 
    },
    {
      name: "Dr. Ferah Khanna",
      role: "Senior Consultant Pedodontist",
      exp: "Research Specialist",
      edu: "BDS, \n MDS (Pedodontics)",
      college: "PGIMER, Chandigarh",
      spec: "Advanced Behavior Management & Kids Care",
      highlight: "Ex-faculty at MAIDS & Assistant Editor of the Journal of SAAPD.",
      img: "/Images/Dr_Ferah.jpg"
    },
    {
      name: "Dr. Vinod Khanna",
      role: "Senior Consultant Prosthodontist",
      exp: "Expert Implantologist",
      edu: "BDS (GDC), \n MDS (Prosthodontics)",
      college: "PGIMER, Chandigarh",
      spec: "Full Mouth Rehabilitation & Aesthetic Dentistry",
      highlight: "Expert in predictable, ethical and durable dental solutions.",
      img: "/Images/Dr_Vinod.jpg"
    },
    {
      name: "Dr. Sonali Bansal",
      role: "RCT Specialist (Endodontist)",
      exp: "Clinical Excellence",
      edu: "BDS, \n MDS (Endodontics)",
      college: "Kalinga Institute of Dental Sciences",
      spec: "Painless Root Canal & Restorative Dentistry",
      highlight: "Specialist in Microendodontics & Biomimetic Technology.",
      img: "/Images/Sonali.jpg"
    }
  ];

  return (
    <>

<SEO 
        title={seoData.home.title} 
        description={seoData.home.description} 
        keywords={seoData.home.keywords} 
      />

    <main className="w-full bg-[#050B14] pt-32 pb-20 text-white overflow-hidden">
      
      {/* 1. HEADER SECTION */}
      <section className="relative mb-16 px-4 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6">
            <Award size={14} /> The Elite Team • Delhi Dental Clinic
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 italic">Meet Our Expert Doctors</h1>
          <p className="text-gray-400 text-lg leading-relaxed italic max-w-2xl mx-auto">
            "Combining academic excellence from India's premier institutions with 16+ years of clinical mastery."
          </p>
        </div>
      </section>

      {/* 2. FOUNDER SPOTLIGHT CARD (Centered) */}
      <section className="max-w-4xl mx-auto px-4 mb-20 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-[45px] blur opacity-20"></div>
        <div className="relative group bg-[#0A1628] border border-[#D4AF37]/30 rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl">
          {/* Founder Image */}
          <div className="md:w-2/5 relative overflow-hidden h-[400px] md:h-auto">
            <img src={founder.img} alt={founder.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 bg-[#D4AF37] text-[#0A1628] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
               Chief Surgeon
            </div>
          </div>

          {/* Founder Info */}
          <div className="p-8 md:p-12 flex-1 text-left flex flex-col justify-center">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-[#D4AF37] mb-2">
                <Sparkles size={18} />
                <span className="text-[10px] uppercase font-black tracking-[0.3em]">Foundation Leader</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{founder.name}</h2>
              <p className="text-[#D4AF37] font-bold uppercase tracking-wider text-sm">{founder.role}</p>
            </div>

            <div className="space-y-5 mb-8">
              <div className="flex gap-4">
                <GraduationCap className="text-[#D4AF37] shrink-0" size={22} />
                <div className="text-sm">
                  <p className="text-white font-bold whitespace-pre-line">{founder.edu}</p>
                  <p className="text-gray-400">{founder.college}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <ShieldCheck className="text-[#D4AF37] shrink-0" size={22} />
                <div className="text-sm">
                  <p className="text-white font-bold">Expertise</p>
                  <p className="text-gray-400">{founder.spec}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 border-l-4 border-[#D4AF37] rounded-r-2xl mb-8">
              <p className="text-xs text-gray-300 italic leading-relaxed">"{founder.highlight}"</p>
            </div>

            <Link to="/contact" className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A1628] px-8 py-4 rounded-2xl font-black text-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all transform active:scale-95">
               <Calendar size={18} /> Consult with Chief Surgeon
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SPECIALISTS GRID (4 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-12 text-gray-400 uppercase tracking-[0.2em]">Our Specialized Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {specialists.map((doc, index) => (
            <div 
              key={index} 
              className="group bg-[#0A1628]/40 backdrop-blur-xl border border-gray-800 rounded-[40px] overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-500 flex flex-col sm:flex-row h-full shadow-lg"
            >
              {/* Image Side */}
              <div className="sm:w-2/5 relative overflow-hidden">
                <img 
                  src={doc.img} 
                  alt={doc.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 min-h-[300px]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-[#D4AF37] text-[#0A1628] px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                   {doc.exp}
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 flex-1 flex flex-col text-left">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{doc.name}</h3>
                  <p className="text-[#D4AF37] text-sm font-bold uppercase tracking-wider">{doc.role}</p>
                </div>

                <div className="space-y-4 flex-grow mb-8">
                  <div className="flex gap-3">
                    <GraduationCap className="text-gray-500 shrink-0" size={18} />
                    <div className="text-xs text-gray-300">
                       <p className="font-bold whitespace-pre-line">{doc.edu}</p>
                       <p className="text-gray-500">{doc.college}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <ShieldCheck className="text-gray-500 shrink-0" size={18} />
                    <div className="text-xs text-gray-300">
                       <p className="font-bold">Focus Area</p>
                       <p className="text-gray-500">{doc.spec}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 border-l-2 border-[#D4AF37] rounded-r-xl">
                    <p className="text-[11px] text-gray-400 italic font-medium leading-relaxed">
                      "{doc.highlight}"
                    </p>
                  </div>
                </div>

                <Link to="/contact" className="w-full bg-[#1A2B47] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#0A1628] transition-all active:scale-95 border border-white/10">
                  <Calendar size={16} /> Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TRUST BANNER */}
      <section className="mt-32 max-w-5xl mx-auto px-4">
         <div className="bg-gradient-to-br from-[#0A1628] to-[#1A2B47] border border-[#D4AF37]/20 rounded-[40px] p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
               <div className="flex justify-center gap-1 mb-6">
                 {[...Array(5)].map((_, i) => <Star key={i} className="fill-[#D4AF37] text-[#D4AF37]" size={24} />)}
               </div>
               <h2 className="text-3xl md:text-4xl font-bold mb-6 italic">Unmatched Clinical Excellence</h2>
               <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
                 Our team consists of specialists from **Nair Hospital Mumbai** and **PGIMER Chandigarh**, 
                 ensuring that you receive international-grade care with a gentle, patient-first approach.
               </p>
            </div>
         </div>
      </section>

    </main>
    </>
  );
};

export default OurTeam;










// import React from 'react';
// import { 
//   Award, GraduationCap, Star, Calendar, 
//   Linkedin, Mail, Heart, ShieldCheck, Microscope, Baby 
// } from 'lucide-react';

// import { Link } from 'react-router-dom';

// const OurTeam = () => {
//   const doctors = [
//     {
//       name: "Dr. Nitu Gautam",
//       role: "Founder & Chief Dental Surgeon",
//       exp: "16+ Years Experience",
//       edu: "MDS (Orthodontics & Dentofacial Orthopaedics)",
//       college: "Nair Hospital Dental College, Mumbai",
//       spec: "Visible/Invisible Braces & Aligners",
//       highlight: "Fellow of World Federation of Orthodontists (WFO)",
//       img: "/Images/Dr_Netu.jpg"
//     },
//     {
//       name: "Dr. Ferah Khanna",
//       role: "Pediatric Dentist & Child Specialist",
//       exp: "16+ Years Experience",
//       edu: "MDS (Pediatric Dentistry)",
//       college: "PGIMER, Chandigarh",
//       spec: "Behavior Management & Kids Care",
//       highlight: "Founder of Kids Dentistry & SAAPD Council Member",
//       img: "/Images/Dr_Ferah.jpg"
//     },
//     {
//       name: "Dr. Vinod Khanna",
//       role: "Prosthodontist & Restorative Dentist",
//       exp: "Expert Implantologist",
//       edu: "MDS (Prosthodontics)",
//       college: "Post Graduate Institute of Medical Sciences",
//       spec: "Implants & Full Mouth Rehabilitation",
//       highlight: "Expert in Precise, Ethical & Durable Solutions",
//       img: "/Images/Dr_Vinod.jpg"
//     },
//     {
//       name: "Dr. Sonali Bansal",
//       role: "Esthetic Dentist & Endodontist",
//       exp: "Clinical Excellence",
//       edu: "MDS (Endodontics)",
//       college: "Kalinga Institute of Dental Sciences",
//       spec: "Painless Root Canal & Restorations",
//       highlight: "Specialist in Microendodontics & Biomimetic Tech",
//       img: "/Images/Dr_sonali.jpg"
//     }
//   ];

//   return (
//     <main className="w-full bg-[#050B14] pt-32 pb-20 text-white overflow-hidden">
      
//       {/* 1. HEADER SECTION */}
//       <section className="relative mb-20 px-4">
//         {/* Figma Glow Background */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
        
//         <div className="max-w-4xl mx-auto text-center relative z-10">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6">
//             <Award size={14} /> The Elite Team • Delhi Dental Clinic
//           </div>
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">Meet Our Expert Doctors</h1>
//           <p className="text-gray-400 text-lg leading-relaxed italic">
//             "Combining academic excellence from India's premier institutions with 16+ years of clinical mastery."
//           </p>
//         </div>
//       </section>

//       {/* 2. DOCTORS GRID */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           {doctors.map((doc, index) => (
//             <div 
//               key={index} 
//               className="group bg-[#0A1628]/40 backdrop-blur-xl border border-gray-800 rounded-[40px] overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-500 flex flex-col sm:flex-row h-full"
//             >
//               {/* Image Side */}
//               <div className="sm:w-2/5 relative overflow-hidden">
//                 <img 
//                   src={doc.img} 
//                   alt={doc.name} 
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 min-h-[300px]" 
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent sm:bg-gradient-to-r"></div>
//                 <div className="absolute bottom-4 left-4 bg-[#D4AF37] text-[#0A1628] px-3 py-1 rounded-full text-[10px] font-bold uppercase">
//                    {doc.exp}
//                 </div>
//               </div>

//               {/* Content Side */}
//               <div className="p-8 flex-1 flex flex-col text-left">
//                 <div className="mb-6">
//                   <h3 className="text-2xl font-bold text-white mb-1">{doc.name}</h3>
//                   <p className="text-[#D4AF37] text-sm font-bold uppercase tracking-wider">{doc.role}</p>
//                 </div>

//                 <div className="space-y-4 flex-grow mb-8">
//                   <div className="flex gap-3">
//                     <GraduationCap className="text-gray-500 shrink-0" size={18} />
//                     <div className="text-xs text-gray-300">
//                        <p className="font-bold">{doc.edu}</p>
//                        <p className="text-gray-500">{doc.college}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex gap-3">
//                     <ShieldCheck className="text-gray-500 shrink-0" size={18} />
//                     <div className="text-xs text-gray-300">
//                        <p className="font-bold">Expertise</p>
//                        <p className="text-gray-500">{doc.spec}</p>
//                     </div>
//                   </div>

//                   <div className="p-3 bg-white/5 border-l-2 border-[#D4AF37] rounded-r-lg">
//                     <p className="text-[11px] text-gray-400 italic font-medium leading-relaxed">
//                       "{doc.highlight}"
//                     </p>
//                   </div>
//                 </div>

//                 {/* <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A1628] py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all active:scale-95">
//                   <Calendar size={16} /> Book Appointment
//                 </button> */}
//                   <Link to="/contact" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A1628] py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all active:scale-95">
//                  <Calendar size={16} /> Book Appointment
//                </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 3. TRUST BANNER */}
//       <section className="mt-32 max-w-5xl mx-auto px-4">
//          <div className="bg-[#1A2B47]/30 border border-[#D4AF37]/20 rounded-[40px] p-10 text-center relative overflow-hidden">
//             <div className="relative z-10">
//                <div className="flex justify-center gap-1 mb-6">
//                  {[...Array(5)].map((_, i) => <Star key={i} className="fill-[#D4AF37] text-[#D4AF37]" size={20} />)}
//                </div>
//                <h2 className="text-2xl md:text-3xl font-bold mb-4 italic">Unmatched Clinical Standards</h2>
//                <p className="text-gray-400 text-sm max-w-2xl mx-auto">
//                  Our team follows international sterilization protocols and uses evidence-based dentistry 
//                  to ensure 100% safety and predictable clinical outcomes for every patient.
//                </p>
//             </div>
//          </div>
//       </section>

//     </main>
//   );
// };

// export default OurTeam;