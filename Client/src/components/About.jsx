import React, { useState, useEffect } from 'react';
import { 
  Award, Heart, Shield, Star, Users, MapPin, 
  Phone, Globe, CheckCircle2, ChevronRight, GraduationCap, Microscope, Baby 
} from 'lucide-react';

import SEO from '../components/SEO';
import seoData from '../seoData';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const galleryImages = [
    "/Images/Dr_Netu.jpg",
    "/Images/Group.jpg",
    "/Images/Avoad.jpg",
    "/Images/Puruskar.jpg",
    "/Images/Semainar.jpg",

    // "/Images/Group_2.jpg",
    "/Images/Pragantation.jpg"
  ];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, galleryImages.length]);

  return (

<>
<SEO 
        title={seoData.home.title} 
        description={seoData.home.description} 
        keywords={seoData.home.keywords} 
      />


    <main className="w-full bg-[#050B14] pt-24 pb-20 text-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6">
              <Award size={14} /> CREATING SMILE, CHANGING LIFE
            </div>
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6">
              <Award size={14} /> CREATING SMILES, CHANGING LIVES
            </div> */}
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-[#D4AF37] bg-clip-text text-transparent mb-8">
              Pioneering Premium <br /> Dental Excellence in New Delhi
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div 
              className="relative group h-[500px] rounded-3xl overflow-hidden border border-[#D4AF37]/20 shadow-2xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent"></div>
                </div>
              ))}
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {galleryImages.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/30'}`}
                  />
                ))}
              </div>
              <div className="absolute bottom-10 left-10 z-10 text-left">
                <p className="text-[#D4AF37] font-bold text-sm uppercase tracking-widest">Global Recognition</p>
                <p className="text-white text-xl font-bold italic text-left">Driven by Research & Excellence</p>
              </div>
            </div>

            <div className="space-y-8 text-left">
              <h2 className="text-3xl font-bold border-l-4 border-[#D4AF37] pl-6 text-white italic">
                Welcome to Delhi Dental Clinic
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Located in the heart of Greater Kailash-I, our clinical practice is distinguished by a strong integration of advanced orthodontic science, precision dentistry, and aesthetic excellence.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <ContactInfo icon={<MapPin />} title="Location" val="R-241, GK-1 New Delhi" />
                <ContactInfo icon={<Phone />} title="Contact" val="+91 80-79-79-79-78 , 011-410-16-309"  />
                <ContactInfo icon={<Globe />} title="Website" val="www.delhidental.org" />
                {/* <ContactInfo icon={<Heart />} title="Mission" val="Creating Smiles, Changing Lives" /> */}
                <ContactInfo icon={<Heart />} title="Mission" val="Creating Smile, Changing Life" />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUNDER SECTION - DR. NITU GAUTAM */}
      <section className="py-24 bg-[#0A1628]/50 backdrop-blur-md relative border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all"></div>
                  <img src="/Images/Dr_Netu.jpg" alt="Dr. Nitu Gautam" className="relative rounded-2xl w-full h-[450px] object-cover shadow-2xl" />
                </div>
                <div className="mt-8 text-left">
                  <h3 className="text-2xl font-bold text-[#D4AF37]">Dr. Nitu Gautam</h3>
                  <p className="text-gray-400 font-medium">BDS(Nair ,Mumbai),<br/> MDS(orthodontics ,IDS)</p>
                  <p className="text-white font-bold mt-2 italic text-sm">Fellowship of the World Federation of Orthodontists (WFO)</p>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 space-y-10 text-left">
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Award className="text-[#D4AF37]" /> The Visionary Leader and Pioneer in the field of Orthodontics.
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Dr. Nitu Gautam is a highly accomplished dental professional, academician, and clinician with over 16 years of clinical experience. A graduate of the prestigious Nair Hospital Dental College, Mumbai. she has served as Professor and research guide, contributing extensively to evidence-based orthodontic practice.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#1A2B47]/40 p-8 rounded-3xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/50 transition-all">
                  <h4 className="text-[#D4AF37] font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 size={18} /> Specialized Expertise
                  </h4>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li>● Visible and Invisible Braces</li>
                    <li>● Clear Aligner Therapy</li>
                    <li>● Aesthetic Dentistry & Implants</li>
                    <li>● Full-mouth Rehabilitation</li>
                  </ul>
                </div>
                <div className="bg-[#1A2B47]/40 p-8 rounded-3xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/50 transition-all">
                  <h4 className="text-[#D4AF37] font-bold mb-4 flex items-center gap-2">
                    <Star size={18} /> Academic Career
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Former Professor in Orthodontics. Deeply involved in curriculum development, postgraduate training, and research guidance with numerous National and international publications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ADDITIONAL DOCTORS SECTION */}
      <section className="py-24 bg-[#050B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Distinguished Specialists</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
            
            {/* Dr. Ferah Khanna */}
            <div className="bg-[#1A2B47]/20 border border-gray-800 rounded-[40px] p-8 md:p-12 flex flex-col lg:flex-row gap-10 hover:border-[#D4AF37]/30 transition-all">
              <div className="lg:w-1/4 shrink-0">
                 <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#D4AF37]/20 mx-auto">
                    <img src="/Images/Dr_Ferah.jpg" alt="Dr. Ferah Khanna" className="w-full h-full object-cover" />
                 </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-white">Dr. Ferah Khanna</h3>
                  <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold uppercase">Pediatric Dentist</span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  With over 16 years of exclusive clinical experience, Dr. Ferah is a trusted Child Dental Specialist. She serves as Assistant Editor of the Journal of the South Asian Association of Pediatric Dentistry. Founder of **Kids Dentistry**, she specializes in advanced behavior management for anxious and special-care children.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <GraduationCap className="text-[#D4AF37]" size={18} /> BDS, <br/>MDS (pedodontics, PGIMER,Chandigarh)
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Baby className="text-[#D4AF37]" size={18} /> Child-Friendly Behavior Expert
                  </div>
                </div>
              </div>
            </div>

            {/* Dr. Vinod Khanna */}
            <div className="bg-[#1A2B47]/20 border border-gray-800 rounded-[40px] p-8 md:p-12 flex flex-col lg:flex-row-reverse gap-10 hover:border-[#D4AF37]/30 transition-all">
              <div className="lg:w-1/4 shrink-0">
                 <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#D4AF37]/20 mx-auto">
                    <img src="/Images/Dr_Vinod.jpg" alt="Dr. Vinod Khanna" className="w-full h-full object-cover" />
                 </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-white">Dr. Vinod Khanna</h3>
                  <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold uppercase">Prosthodontist</span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  A dedicated specialist in crowns, bridges, dental implants, and full mouth rehabilitation. Dr. Khanna is known for delivering precise, ethical, and long-lasting solutions with a focus on comprehensive diagnosis and meticulous treatment planning.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <GraduationCap className="text-[#D4AF37]" size={18} /> BDS(Government Dental College ), <br/> MDS(Prosthodontics, PGIMER,Chandigarh)
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Shield className="text-[#D4AF37]" size={18} /> Ethical & Precise Care
                  </div>
                </div>
              </div>
            </div>

            {/* Dr. Sonali Bansal */}
            <div className="bg-[#1A2B47]/20 border border-gray-800 rounded-[40px] p-8 md:p-12 flex flex-col lg:flex-row gap-10 hover:border-[#D4AF37]/30 transition-all">
              <div className="lg:w-1/4 shrink-0">
                 <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#D4AF37]/20 mx-auto">
                    <img src="/Images/Sonali.jpg" alt="Dr. Sonali Bansal" className="w-full h-full object-cover" />
                 </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-white">Dr. Sonali Bansal</h3>
                  <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold uppercase">Endodontist</span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Expert in restorative and painless root canal treatments. Trained in **Microendodontics**, she utilizes magnification and precision techniques for tooth-preserving restorations that replicate natural tooth structure and function.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <GraduationCap className="text-[#D4AF37]" size={18} /> BDS, <br/> MDS(Endodontics, Kalinga Institute of Dental Sciences)
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Microscope className="text-[#D4AF37]" size={18} /> Microendodontics Specialist
                  </div>
                </div>
              </div>
            </div>


<div className="bg-[#1A2B47]/20 border border-gray-800 rounded-[40px] p-8 md:p-12 flex flex-col lg:flex-row-reverse gap-10 hover:border-[#D4AF37]/30 transition-all">
  <div className="lg:w-1/4 shrink-0">
    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#D4AF37]/20 mx-auto">
      <img src="/Images/DrAyeshaJain.jpg" alt="Dr. Ayesha Jain" className="w-full h-full object-cover" />
    </div>
  </div>
  <div className="flex-1 text-left">
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <h3 className="text-2xl font-bold text-white">Dr. Ayesha Jain</h3>
      <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold uppercase">Senior Oral Surgeon</span>
    </div>
    <p className="text-gray-300 leading-relaxed mb-6">
      A distinguished graduate of the prestigious Nair Hospital Dental College, Mumbai. With over 16 years of rich clinical experience, Dr. Jain specializes in surgical excellence, root canal treatments, and aesthetic smile makeovers. Her approach combines clinical precision with an artistic eye to deliver natural-looking, confident smiles.
    </p>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="flex items-center gap-3 text-sm text-gray-400">
        <GraduationCap className="text-[#D4AF37]" size={18} /> BDS (Nair Hospital Dental College, Mumbai)
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-400">
        {/* <Shield className="text-[#D4AF37]" size={18} /> 16+ Years Clinical Excellence */}
      </div>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-16 italic underline decoration-[#D4AF37] underline-offset-8 text-white">Our Standards of Care</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <ValueCard icon={<Shield size={40} />} title="Precision Dentistry" desc="Strong integration of advanced orthodontic science and meticulous diagnostic tools." />
          <ValueCard icon={<Users size={40} />} title="Patient-Centric" desc="Treatment plans customized for functional balance and facial harmony." />
          <ValueCard icon={<Award size={40} />} title="Ethical Practice" desc="Sustained contribution to evidence-based practice and sustained clinical success." />
        </div>
      </section>
    </main>
    </>
  );
};

const ContactInfo = ({ icon, title, val }) => (
  <div className="flex items-center gap-4 group text-left">
    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0A1628] transition-all shrink-0">
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <div>
      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{title}</p>
      <p className="text-white text-sm font-medium">{val}</p>
    </div>
  </div>
);

const ValueCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-3xl bg-[#1A2B47]/30 border border-gray-800 hover:border-[#D4AF37]/30 transition-all group text-center">
    <div className="text-[#D4AF37] mb-6 inline-block group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default About;
















// import React, { useState, useEffect } from 'react';
// import { 
//   Award, Heart, Shield, Star, Users, MapPin, 
//   Phone, Globe, CheckCircle2, ChevronRight 
// } from 'lucide-react';

// const About = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   // Images provided in the context
//   const galleryImages = [
//     "/Images/Dr_Netu.jpg",
//     "/Images/Group.jpg",
//     "/Images/Avoad.jpg",
//     "/Images/Puruskar.jpg",
//     "/Images/Group_2.jpg",
//     "/Images/Pragantation.jpg"

//   ];

//   // Automatic Slider Logic
//   useEffect(() => {
//     if (!isPaused) {
//       const interval = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
//       }, 3000);
//       return () => clearInterval(interval);
//     }
//   }, [isPaused, galleryImages.length]);

//   return (
//     <main className="w-full bg-[#050B14] pt-24 pb-20 text-white overflow-hidden">
      
//       {/* 1. HERO SECTION - BRAND STORY */}
//       <section className="relative py-20 px-4 sm:px-6 lg:px-8">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6">
//               <Award size={14} /> Crafting Smile • Delhi Dental Clinic
//             </div>
//             <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-[#D4AF37] bg-clip-text text-transparent mb-8">
//               Pioneering Premium <br /> Dental Excellence in New Delhi
//             </h1>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             {/* Left: Auto Slider (Dr. Nitu Gautam's Journey) */}
//             <div 
//               className="relative group h-[500px] rounded-3xl overflow-hidden border border-[#D4AF37]/20 shadow-2xl"
//               onMouseEnter={() => setIsPaused(true)}
//               onMouseLeave={() => setIsPaused(false)}
//             >
//               {galleryImages.map((img, index) => (
//                 <div
//                   key={index}
//                   className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//                     index === currentSlide ? 'opacity-100' : 'opacity-0'
//                   }`}
//                 >
//                   <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent"></div>
//                 </div>
//               ))}
              
//               {/* Slider Dots */}
//               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
//                 {galleryImages.map((_, i) => (
//                   <button 
//                     key={i} 
//                     onClick={() => setCurrentSlide(i)}
//                     className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/30'}`}
//                   />
//                 ))}
//               </div>
//               <div className="absolute bottom-10 left-10 z-10">
//                 <p className="text-[#D4AF37] font-bold text-sm uppercase tracking-widest">Global Recognition</p>
//                 <p className="text-white text-xl font-bold italic">Driven by Research & Excellence</p>
//               </div>
//             </div>

//             {/* Right: Clinic Intro */}
//             <div className="space-y-8">
//               <h2 className="text-3xl font-bold border-l-4 border-[#D4AF37] pl-6 text-white italic">
//                 Welcome to Delhi Dental Clinic
//               </h2>
//               <p className="text-gray-400 text-lg leading-relaxed">
//                 Located in the heart of Greater Kailash-I, our clinical practice is distinguished by a strong integration of advanced orthodontic science, precision dentistry, and aesthetic excellence.
//               </p>
//               <div className="grid grid-cols-2 gap-6">
//                 <ContactInfo mini icon={<MapPin />} title="Location" val="G.K-I, New Delhi" />
//                 <ContactInfo mini icon={<Phone />} title="Contact" val="+91 8079797978" />
//                 <ContactInfo mini icon={<Globe />} title="Website" val="www.delhidental.org" />
//                 <ContactInfo mini icon={<Heart />} title="Mission" val="Crafting Smiles" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 2. FOUNDER SECTION - DR. NITU GAUTAM (Detailed Content) */}
//       <section className="py-24 bg-[#0A1628]/50 backdrop-blur-md relative border-y border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row gap-16">
//             <div className="lg:w-1/3">
//               <div className="sticky top-32">
//                 <div className="relative group">
//                   <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all"></div>
//                   <img src="/Images/Dr_Netu.jpg" alt="Dr. Nitu Gautam" className="relative rounded-2xl w-full h-[450px] object-cover shadow-2xl" />
//                 </div>
//                 <div className="mt-8">
//                   <h3 className="text-2xl font-bold text-[#D4AF37]">Dr. Nitu Gautam</h3>
//                   <p className="text-gray-400 font-medium">MDS (Orthodontics & Dentofacial Orthopaedics)</p>
//                   <p className="text-white font-bold mt-2 italic text-sm">Fellowship of the World Federation of Orthodontists (WFO)</p>
//                 </div>
//               </div>
//             </div>

//             <div className="lg:w-2/3 space-y-10">
//               <div>
//                 <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
//                   <Award className="text-[#D4AF37]" /> The Visionary Behind DDC
//                 </h2>
//                 <p className="text-gray-300 leading-relaxed text-lg">
//                   Dr. Nitu Gautam is a highly accomplished dental professional, academician, and clinician with over 16 years of clinical experience. She is a graduate of the prestigious **Nair Hospital Dental College, Mumbai**, one of India’s most renowned institutions for dental education.
//                 </p>
//               </div>

//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="bg-[#1A2B47]/40 p-8 rounded-3xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/50 transition-all">
//                   <h4 className="text-[#D4AF37] font-bold mb-4 flex items-center gap-2">
//                     <CheckCircle2 size={18} /> Specialized Expertise
//                   </h4>
//                   <ul className="space-y-3 text-gray-400 text-sm">
//                     <li>● Visible and Invisible Braces</li>
//                     <li>● Clear Aligner Therapy & Implants</li>
//                     <li>● Aesthetic Dentistry (Veneers)</li>
//                     <li>● Full-mouth Rehabilitation</li>
//                   </ul>
//                 </div>
//                 <div className="bg-[#1A2B47]/40 p-8 rounded-3xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/50 transition-all">
//                   <h4 className="text-[#D4AF37] font-bold mb-4 flex items-center gap-2">
//                     <Star size={18} /> Academic Excellence
//                   </h4>
//                   <p className="text-gray-400 text-sm leading-relaxed">
//                     Former faculty at Nair Hospital Dental College, Mumbai and Professor at Institute of Dental Sciences, Bhubaneswar. Awarded Fellowship of WFO.
//                   </p>
//                 </div>
//               </div>

//               <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
//                 <p>
//                   Dr. Gautam specialization lies in designing customized treatment plans that enhance both oral health and overall facial aesthetics. Her career is marked by numerous research presentations at national and international conferences, reflecting her sustained contribution to evidence-based practice.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 3. CORE VALUES SECTION */}
//       <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <h2 className="text-3xl font-bold mb-16 italic underline decoration-[#D4AF37] underline-offset-8">Our Standards of Care</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//           <ValueCard 
//             icon={<Shield size={40} />}
//             title="Precision Dentistry"
//             desc="Strong integration of advanced orthodontic science and meticulous diagnostic tools."
//           />
//           <ValueCard 
//             icon={<Users size={40} />}
//             title="Patient-Centric"
//             desc="Treatment plans customized for functional balance and facial harmony."
//           />
//           <ValueCard 
//             icon={<Award size={40} />}
//             title="Ethical Practice"
//             desc="Sustained contribution to evidence-based practice and sustained clinical success."
//           />
//         </div>
//       </section>
//     </main>
//   );
// };

// // --- Reusable Sub-Components ---

// const ContactInfo = ({ icon, title, val }) => (
//   <div className="flex items-center gap-4 group">
//     <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0A1628] transition-all">
//       {React.cloneElement(icon, { size: 18 })}
//     </div>
//     <div>
//       <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{title}</p>
//       <p className="text-white text-sm font-medium">{val}</p>
//     </div>
//   </div>
// );

// const ValueCard = ({ icon, title, desc }) => (
//   <div className="p-8 rounded-3xl bg-[#1A2B47]/30 border border-gray-800 hover:border-[#D4AF37]/30 transition-all group text-center">
//     <div className="text-[#D4AF37] mb-6 inline-block group-hover:scale-110 transition-transform">{icon}</div>
//     <h3 className="text-xl font-bold mb-4">{title}</h3>
//     <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
//   </div>
// );

// export default About;