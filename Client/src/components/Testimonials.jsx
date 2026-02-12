// import React, { useState } from 'react';
// import { 
//   Star, Quote, Heart, ShieldCheck, X, ZoomIn, Sparkles 
// } from 'lucide-react';
// import { Link } from 'react-router-dom';

// import SEO from '../components/SEO';
// import seoData from '../seoData';



// const Testimonials = () => {
//   const [selectedImg, setSelectedImg] = useState(null);

//   const reviews = [
//     {
//       name: "Anjali Mehta",
//       location: "South Delhi",
//       service: "Invisalign & Aesthetics",
//       date: "January 2026",
//       text: "Dr. Nitu Gautam is a true artist. Her focus on facial harmony and functional balance during my aligner treatment was impressive. With 16+ years of experience, her precision in Orthodontics is unmatched.",
//       // Yahan 4-5 images add karein
//       gallery: [
//         "/Images/mout.jpg",
//         "/Images/mouth.jpg",
//        "/Images/SHREYASI_CEPH.jpg",
//         "/Images/SHREYASI_SAHOO.jpg",
//         "/Images/Netu/Ne1.jpg",

//       ],
//       initial: "A",
//       rating: 5
//     },
//     {
//       name: "Rahul Kapoor",
//       location: "Greater Kailash",
//       service: "Micro-Endodontics",
//       date: "December 2025",
//       text: "I was worried about my root canal, but Dr. Sonali's use of micro-endodontics magnification made it painless. Her interest in biomimetic dentistry saved my natural tooth structure perfectly.",
//       gallery: [
//         "/Images/Sonili/so1.png",
//         "/Images/Sonili/so2.png",
//         "/Images/Sonili/so3.png",
//          "/Images/Sonili/so4.png",
//         "/Images/Sonili/so5.png"
//       ],
//       initial: "R",
//       rating: 5
//     },
//     {
//       name: "Sonia Gupta",
//       location: "Vasant Vihar",
//       service: "Pediatric Care",
//       date: "November 2025",
//       text: "Dr. Ferah is a magician with kids! Her advanced behavior management techniques helped my anxious child stay calm. DDC is definitely the best place for pediatric dental care in Delhi.",
//         gallery: [
//         "/Images/Fraha/Fr1.png",
//         "/Images/Fraha/Fr2.png",
//         "/Images/Fraha/Fr3.png",
//         "/Images/Fraha/Fr4.png",
//         "/Images/Fraha/Fr5.png"
//       ],
//       initial: "S",
//       rating: 5
//     },
//     {
//       name: "Vikram Singh",
//       location: "South Extension",
//       service: "Full Mouth Rehab",
//       date: "October 2025",
//       text: "Dr. Vinod Khanna's meticulous treatment planning for my full mouth rehabilitation was outstanding. He is ethical and transparent, explaining every option for my implants and crowns clearly.",
//          gallery: [
//         "/Images/Vinod/Vo1.jpg",
//         "/Images/Vinod/Vo2.jpg",
//         "/Images/Vinod/Vo3.jpg",
        
//       ],
//       initial: "V",
//       rating: 5
//     },
//     {
//       name: "Priya Sharma",
//       location: "Saket",
//       service: "Visible Braces",
//       date: "September 2025",
//       text: "Coming from Nair Hospital Dental College background, Dr. Nitu's clinical integration of advanced orthodontic science is evident. My braces treatment has been smooth and very professional.",
//         gallery: [
//         "/Images/Netu/Ne2.jpg",
// "/Images/Netu/Ne3.jpg",
// "/Images/Netu/Ne4.jpg",
// "/Images/Netu/Ne5.jpg",
// "/Images/Netu/Ne6.jpg",

//       ],
//       initial: "P",
//       rating: 5
//     },
//     {
//       name: "Amit Verma",
//       location: "Noida",
//       service: "Cosmetic Restoration",
//       date: "August 2025",
//       text: "The aesthetic excellence at Delhi Dental Clinic is world-class. From painless procedures to durable restorative solutions, the team ensures functional excellence and a perfect smile.",
//       gallery: [],
//       initial: "A",
//       rating: 5
//     }
//   ];

//   return (
// <>
// <SEO 
//         title={seoData.home.title} 
//         description={seoData.home.description} 
//         keywords={seoData.home.keywords} 
//       />
//     <main className="w-full bg-[#050B14] pt-32 pb-20 text-white overflow-hidden">
      
//       {/* 1. HEADER SECTION */}
//       <section className="relative mb-20 px-4 text-center">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
//         <div className="max-w-4xl mx-auto relative z-10">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6">
//             <Heart size={14} className="fill-[#D4AF37]" /> Patient Trust • Delhi Dental Clinic
//           </div>
//           <h1 className="text-4xl md:text-6xl font-bold mb-6 italic text-left md:text-center">What Our Patients Say</h1>
//           <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto text-left md:text-center">
//             Experience based on 16+ years of clinical mastery and specialized expertise.
//           </p>
//         </div>
//       </section>

//       {/* 2. STATS BANNER */}
//       <section className="max-w-7xl mx-auto px-4 mb-20">
//         <div className="bg-gradient-to-r from-[#0A1628] to-[#1A2B47] rounded-[40px] p-10 border border-gray-800 flex flex-wrap justify-center gap-12 md:gap-24">
//           <StatItem label="Verified Reviews" val="2,500+" />
//           <StatItem label="Average Rating" val="4.9 / 5.0" />
//           <StatItem label="Specialist Team" val="Expert Doctors" />
//         </div>
//       </section>

//       {/* 3. REVIEWS GRID */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {reviews.map((rev, index) => (
//             <div 
//               key={index} 
//               className="group relative bg-[#0A1628]/40 backdrop-blur-xl border border-gray-800 p-8 rounded-[35px] hover:border-[#D4AF37]/40 transition-all duration-500 flex flex-col h-full"
//             >
//               <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl flex items-center justify-center shadow-lg z-10">
//                 <Quote size={24} className="text-[#0A1628]" />
//               </div>

//               <div className="flex gap-1 mb-6 text-left">
//                 {[...Array(rev.rating)].map((_, i) => (
//                   <Star key={i} size={16} className="fill-[#D4AF37] text-[#D4AF37]" />
//                 ))}
//               </div>

//               <p className="text-gray-300 leading-relaxed mb-6 flex-grow text-left italic">
//                 "{rev.text}"
//               </p>

//               {/* IMAGE GALLERY GRID - PLACED ABOVE SERVICE & DATE */}
//               {rev.gallery && rev.gallery.length > 0 && (
//                 <div className="grid grid-cols-5 gap-2 mb-6">
//                   {rev.gallery.map((url, i) => (
//                     <div 
//                       key={i} 
//                       className="relative aspect-square rounded-lg overflow-hidden cursor-pointer border border-gray-800 hover:border-[#D4AF37]/50 transition-colors group/img"
//                       onClick={() => setSelectedImg(url)}
//                     >
//                       <img src={url} alt="Clinic Result" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform" />
//                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
//                         <ZoomIn size={14} className="text-white" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="mb-6 pt-6 border-t border-gray-800/50 flex items-center justify-between text-left">
//                 <div>
//                   <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">{rev.service}</p>
//                   <p className="text-gray-500 text-[10px] mt-1 uppercase font-bold">{rev.date}</p>
//                 </div>
//                 <div className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full">
//                   <ShieldCheck size={12} className="text-green-500" />
//                   <span className="text-[10px] text-green-500 font-bold uppercase">Verified</span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4 text-left">
//                 <div className="w-12 h-12 bg-gradient-to-br from-[#1A2B47] to-[#0A1628] rounded-full flex items-center justify-center font-bold text-[#D4AF37] border border-[#D4AF37]/20">
//                   {rev.initial}
//                 </div>
//                 <div>
//                   <h4 className="text-white font-bold">{rev.name}</h4>
//                   <p className="text-gray-500 text-xs">{rev.location}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 4. CTA BANNER */}
//       <section className="mt-24 max-w-5xl mx-auto px-4">
//         <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-[40px] p-12 text-center relative overflow-hidden group">
//           <div className="relative z-10 text-[#0A1628]">
//              <h2 className="text-3xl md:text-4xl font-bold mb-4 italic">Crafting Smiles Daily</h2>
//              <p className="font-bold opacity-80 mb-8 max-w-xl mx-auto uppercase tracking-widest text-sm text-center">
//                Join 50K+ happy patients and experience precise, ethical, and painless dental excellence.
//              </p>
//              <Link to="/contact" className="inline-block bg-[#0A1628] text-white px-10 py-5 rounded-2xl font-extrabold text-lg shadow-2xl hover:scale-105 transition-all">
//                Schedule Your Visit
//              </Link>
//           </div>
//         </div>
//       </section>

//       {/* ================= IMAGE FULL VIEW MODAL ================= */}
//       {selectedImg && (
//         <div 
//           className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
//           onClick={() => setSelectedImg(null)}
//         >
//           <button 
//             className="absolute top-10 right-10 text-white hover:text-[#D4AF37] transition-colors p-2 bg-white/10 rounded-full"
//             onClick={() => setSelectedImg(null)}
//           >
//             <X size={40} />
//           </button>
          
//           <img 
//             src={selectedImg} 
//             alt="Full Preview" 
//             className="max-w-[95vw] max-h-[85vh] rounded-2xl shadow-2xl border border-white/10 object-contain animate-in zoom-in duration-300"
//             onClick={(e) => e.stopPropagation()} 
//           />
          
//           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#D4AF37] font-bold tracking-widest uppercase text-xs flex items-center gap-2">
//             <Sparkles size={16}/> Delhi Dental Clinic
//           </div>
//         </div>
//       )}

//     </main>
//     </>
//   );
// };

// const StatItem = ({ label, val }) => (
//   <div className="text-center">
//     <div className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-1">{val}</div>
//     <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">{label}</div>
//   </div>
// );

// export default Testimonials;









import React from 'react';
import { 
  Star, Quote, Heart, ShieldCheck, Award, MessageSquare 
} from 'lucide-react';

import { Link } from 'react-router-dom';

const Testimonials = () => {
  const reviews = [
    {
      name: "Anjali Mehta",
      location: "South Delhi",
      service: "Invisalign & Aesthetics",
      date: "January 2026",
      // Dr. Nitu's expertise in facial harmony
      text: "Dr. Nitu Gautam is a true artist. Her focus on facial harmony and functional balance during my aligner treatment was impressive. With 16+ years of experience, her precision in Orthodontics is unmatched.",
      initial: "A",
      rating: 5
    },
    {
      name: "Rahul Kapoor",
      location: "Greater Kailash",
      service: "Micro-Endodontics",
      date: "December 2025",
      // Dr. Sonali's expertise in painless RCT & Biomimetic dentistry
      text: "I was worried about my root canal, but Dr. Sonali's use of micro-endodontics magnification made it painless. Her interest in biomimetic dentistry saved my natural tooth structure perfectly.",
      initial: "R",
      rating: 5
    },
    {
      name: "Sonia Gupta",
      location: "Vasant Vihar",
      service: "Pediatric Care",
      date: "November 2025",
      // Dr. Ferah's expertise in behavior management
      text: "Dr. Ferah is a magician with kids! Her advanced behavior management techniques helped my anxious child stay calm. DDC is definitely the best place for pediatric dental care in Delhi.",
      initial: "S",
      rating: 5
    },
    {
      name: "Vikram Singh",
      location: "South Extension",
      service: "Full Mouth Rehab",
      date: "October 2025",
      // Dr. Vinod's expertise in Prosthodontics
      text: "Dr. Vinod Khanna's meticulous treatment planning for my full mouth rehabilitation was outstanding. He is ethical and transparent, explaining every option for my implants and crowns clearly.",
      initial: "V",
      rating: 5
    },
    {
      name: "Priya Sharma",
      location: "Saket",
      service: "Visible Braces",
      date: "September 2025",
      // Dr. Nitu's academic & clinical background
      text: "Coming from Nair Hospital Dental College background, Dr. Nitu's clinical integration of advanced orthodontic science is evident. My braces treatment has been smooth and very professional.",
      initial: "P",
      rating: 5
    },
    {
      name: "Amit Verma",
      location: "Noida",
      service: "Cosmetic Restoration",
      date: "August 2025",
      // Dr. Vinod/Dr. Sonali integration
      text: "The aesthetic excellence at Delhi Dental Clinic is world-class. From painless procedures to durable restorative solutions, the team ensures functional excellence and a perfect smile.",
      initial: "A",
      rating: 5
    }
  ];

  return (
    <main className="w-full bg-[#050B14] pt-32 pb-20 text-white overflow-hidden">
      
      {/* 1. HEADER SECTION */}
      <section className="relative mb-20 px-4 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6">
            <Heart size={14} className="fill-[#D4AF37]" /> Patient Trust • Delhi Dental Clinic
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 italic">What Our Patients Say</h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Experience based on 16+ years of clinical mastery and specialized expertise from Delhi's leading dental professionals.
          </p>
        </div>
      </section>

      {/* 2. STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1A2B47] rounded-[40px] p-10 border border-gray-800 flex flex-wrap justify-center gap-12 md:gap-24">
          <StatItem label="Verified Reviews" val="2,500+" />
          <StatItem label="Average Rating" val="4.9 / 5.0" />
          <StatItem label="Specialist Team" val="Expert Doctors" />
        </div>
      </section>

      {/* 3. REVIEWS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <div 
              key={index} 
              className="group relative bg-[#0A1628]/40 backdrop-blur-xl border border-gray-800 p-8 rounded-[35px] hover:border-[#D4AF37]/40 transition-all duration-500 flex flex-col h-full"
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Quote size={24} className="text-[#0A1628]" />
              </div>

              <div className="flex gap-1 mb-6 text-left">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed mb-8 flex-grow text-left italic">
                "{rev.text}"
              </p>

              <div className="mb-6 pt-6 border-t border-gray-800/50 flex items-center justify-between text-left">
                <div>
                  <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">{rev.service}</p>
                  <p className="text-gray-500 text-[10px] mt-1 uppercase font-bold">{rev.date}</p>
                </div>
                <div className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full">
                  <ShieldCheck size={12} className="text-green-500" />
                  <span className="text-[10px] text-green-500 font-bold uppercase">Verified Review</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1A2B47] to-[#0A1628] rounded-full flex items-center justify-center font-bold text-[#D4AF37] border border-[#D4AF37]/20">
                  {rev.initial}
                </div>
                <div>
                  <h4 className="text-white font-bold">{rev.name}</h4>
                  <p className="text-gray-500 text-xs">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CTA BANNER */}
      <section className="mt-24 max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-[40px] p-12 text-center relative overflow-hidden group">
          <div className="relative z-10 text-[#0A1628]">
             <h2 className="text-3xl md:text-4xl font-bold mb-4 italic">Crafting Smiles Daily</h2>
             <p className="font-bold opacity-80 mb-8 max-w-xl mx-auto uppercase tracking-widest text-sm">
               Join 50K+ happy patients and experience precise, ethical, and painless dental excellence.
             </p>
             <Link to="/contact" className="inline-block bg-[#0A1628] text-white px-10 py-5 rounded-2xl font-extrabold text-lg shadow-2xl hover:scale-105 transition-all">
               Schedule Your Visit
             </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

const StatItem = ({ label, val }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-1">{val}</div>
    <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">{label}</div>
  </div>
);

export default Testimonials;