import React, { useState } from 'react';
import { 
  Award, Sparkles, MapPin, Clock, Phone, ArrowRight, 
  Smile, Shield, Stethoscope, Heart, Baby, Star, 
  Quote, ThumbsUp, Send, Calendar, Microscope, Wifi, GraduationCap ,Users, Mail,CircleCheckBig
} from 'lucide-react';

import SEO from '../components/SEO';
import seoData from '../seoData';

import { Link } from 'react-router-dom';




const Home = () => {
  // 1. State add karein
const [formData, setFormData] = useState({
  name: '', email: '', phone: '', service: 'general', date: '', message: ''
});
const [isSubmitting, setIsSubmitting] = useState(false);

// 2. Submit function (Same as Contact.jsx)
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("Appointment Request Sent!");
      setFormData({ name: '', email: '', phone: '', service: 'general', date: '', message: '' });
    }
  } catch (err) {
    console.error(err);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <><SEO 
        title={seoData.home.title} 
        description={seoData.home.description} 
        keywords={seoData.home.keywords} 
      />
    <main className="w-full bg-[#050B14]">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/Images/DentailBanner.jfif" 
            alt="Delhi Dental Clinic Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/85 to-[#1A2B47]/70"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white text-left">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-sm font-medium italic">CREATING SMILE, CHANGING LIFE</span>
              </div>
              
              <h1 className="mb-6 bg-gradient-to-r from-white via-[#E8E8E8] to-[#C0C0C0] bg-clip-text text-transparent text-5xl md:text-7xl font-bold leading-tight">
                Delhi's Premier <br /> Dental Excellence
              </h1>
              
              <p className="mb-8 text-xl text-[#C0C0C0] leading-relaxed max-w-lg text-left">
                Experience world-class dental care led by Dr. Nitu Gautam BDS(Nair ,Mumbai),MDS (orthodontics ,IDS)
Professor(IDS, S’O’A University)
Fellow (World Federation of Orthodontist)
Member of peer review board, JCO-IOS
Editor IOS times
Reg no-3224/A
 with 16+ years of clinical mastery and state-of-the-art technology.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link 
                  to="/Contact" 
                  className="relative group overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A1628] px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 shadow-lg hover:shadow-[#D4AF37]/40 flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} /> Book Appointment
                </Link>

                <Link 
                  to="/Services" 
                  className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-lg font-bold hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center"
                >
                  View Services
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {[["10K+", "Happy Patients"], ["15+", "Expert Doctors"], ["98%", "Success Rate"]].map(([num, label]) => (
                  <div key={label} className="border-l-2 border-[#D4AF37] pl-4 text-left">
                    <div className="text-3xl text-[#D4AF37] font-bold mb-1">{num}</div>
                    <div className="text-sm text-[#C0C0C0] uppercase tracking-wider text-[10px]">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <QuickInfoCard icon={<MapPin />} title="Prime Location" desc="R-241, Ground Floor, G.K-1, New Delhi" sub="Opp. GK-1 Police Station • Free Parking" />
              <QuickInfoCard icon={<Clock />} title="Flexible Hours" desc="Tue-Sat: 9:00 AM - 7:00 PM and Mon - Close"  />
              <QuickInfoCard icon={<Phone />} title="Quick Contact" desc="+91 80-79-79-79-78 ,   011-410-16-309" sub="WhatsApp: +91 80-79-79-79-78" />
            </div>
          </div>
        </div>
      </section>

      {/* --- FOUNDER PROFILE SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all"></div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                 <img src="/Images/Dr_Netu.jpg" alt="Dr. Nitu Gautam" className="w-full h-full object-cover" />
                 <div className="absolute bottom-0 left-0 right-0 bg-[#0A1628]/80 backdrop-blur-md p-6 text-left">
                    <div className="text-[#D4AF37] font-bold">Founder & Chief Dental Surgeon</div>
                    <div className="text-white text-xs uppercase tracking-widest mt-1">Fellow of World Federation of Orthodontists (WFO)</div>
                 </div>
              </div>
            </div>

            <div className="space-y-6 text-left">
              {/* <h2 className="text-4xl font-bold text-[#0A1628]">
  Dr. Nitu Gautam <span className="text-lg font-medium text-gray-700 font-serif">BDS (Nair, Mumbai), MDS (Orthodontics)</span>
</h2>
<p className="text-gray-700 leading-relaxed italic text-left">
  "Senior Consultant Orthodontist & Professor at IDS, S'O'A University. A Fellow of the World Federation of Orthodontists (WFO) and Editor of IOS Times."
</p>
<div className="grid grid-cols-2 gap-4">
  <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#D4AF37] text-left">
    <div className="text-[#0A1628] font-bold text-xs uppercase">Research & Editorial</div>
    <div className="text-[11px] text-gray-700">Member of Peer Review Board (JCO-IOS) & Reg No: 3224/A.</div>
  </div>
  <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#D4AF37] text-left">
    <div className="text-[#0A1628] font-bold text-xs uppercase">Expertise</div>
    <div className="text-[11px] text-gray-700">Professor-level mastery in Orthodontics and Implantology.</div>
  </div>
</div> */}
              
              <h2 className="text-4xl font-bold text-[#0A1628]">Dr. Nitu Gautam <span className="text-sm font-medium text-gray-700 font-serif">BDS(Nair ,Mumbai), MDS (orthodontics ,IDS)</span></h2>
              <p className="text-gray-700 leading-relaxed italic text-left">
                "Dr. Nitu is a highly accomplished professional with over 16 years of clinical experience. She is a graduate of the prestigious Nair Hospital Dental College, Mumbai."
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#D4AF37] text-left">
                  <div className="text-[#0A1628] font-bold">Clinical Expertise</div>
                  <div className="text-sm text-gray-700">Visible/Invisible Braces, Clear Aligners & Implants.</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#D4AF37] text-left">
                  <div className="text-[#0A1628] font-bold">Academician</div>
                  <div className="text-sm text-gray-700">Former  Professor at (IDS, S’O’A University).</div>

                  {/* <div className="text-sm text-gray-700">Former Faculty at Nair Hospital & Professor at IDS Bhubaneswar.</div> */}
                </div>
              </div>
              {/* <button className="flex items-center gap-2 text-[#D4AF37] font-bold hover:gap-4 transition-all">
                Read Full Biography <ArrowRight size={18} />
              </button> */}
               <Link 
                  to="/About" 
                  className="flex items-center gap-2 text-[#0A1628] font-bold hover:gap-4 transition-all"
                >
                     Read Full Biography <ArrowRight size={18} />
                </Link>
                 <div className="w-24 h-1 bg-[#d4af37] ml-8 "></div>
            </div>
          </div>
        </div>
      </section>


{/* <div className="mt-12 p-6 bg-[#D4AF37]/5 border-l-4 border-[#D4AF37] rounded-r-2xl">
  <h4 className="text-[#ffffff] font-bold text-lg mb-2">Senior Surgeon Spotlight</h4>
  <p className="text-white text-sm leading-relaxed italic">
    Dr. Ayesha Jain, a distinguished graduate of Nair Hospital Mumbai, combines 16+ years of surgical excellence with an artistic approach to deliver natural-looking, confident smiles.
  </p>
</div> */}

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="py-24 bg-gradient-to-b from-white via-[#E8E8E8]/30 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 text-center">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-[#0A1628] to-[#0A1628] bg-clip-text text-transparent text-sm tracking-widest uppercase font-bold text-center">Our Services</span>
            <div className="w-24 h-1 bg-[#d4af37] mt-2 mx-auto"></div>
            </div>
            <h2 className="mb-6 text-4xl font-bold text-[#0A1628] text-center">Comprehensive Dental Solutions</h2>
            <p className="text-lg text-[#2e2e2eff] max-w-3xl mx-auto leading-relaxed text-center">
              Specialized care ranging from Dr. Sonali's Micro-Endodontics to Dr. Vinod's implants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard img="/Images/orthdodontics.jpeg" title="Orthodontics" icon={<Shield />} desc="Braces and Invisalign for perfectly aligned smiles by Dr. Nitu Gautam." />
            <ServiceCard img="/Images/microend.jpeg" title="Micro-Endodontics" icon={<Microscope />} desc="Specialized painless Root Canal treatments with clinical precision by Dr. Sonali Bansal." />
            <ServiceCard img="/Images/Pediatriccare.jpeg" title="Pediatric Care" icon={<Baby />} desc="Gentle behavior management for children by specialist Dr. Ferah Khanna." />
            <ServiceCard img="/Images/Dental2.jfif" title="Prosthodontics" icon={<Heart />} desc="Implants and full mouth rehabilitation by specialist Dr. Vinod Khanna." />
            <ServiceCard img="/Images/SmileDesign.jpeg" title="Cosmetic Dentistry" icon={<Sparkles />} desc="Smile makeovers and aesthetic dentistry designed with an artistic eye by Dr. Ayesha Jain." />
            <ServiceCard img="/Images/JenrailDensity.avif" title="General Dentistry" icon={<Smile />} desc="Premium diagnostic checkups and digital dentistry for the whole family." />
          </div>

          <div className="mt-16 text-center max-w-5xl mx-auto px-4">
            <div className="inline-flex flex-col sm:flex-row gap-6 bg-gradient-to-r from-[#0A1628] to-[#1A2B47] rounded-3xl p-8 md:p-12 border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-3xl rounded-full"></div>
              <div className="text-left flex-1 relative z-10">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 tracking-tight text-left">Need a Custom Treatment Plan?</h3>
                <p className="text-[#C0C0C0] text-lg leading-relaxed opacity-90 text-left">Our specialists will create a personalized solution for your unique dental needs.</p>
              </div>
              <div className="flex items-center relative z-10">
                {/* <button className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A1628] px-10 py-4 rounded-xl font-extrabold text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-500 hover:scale-105 whitespace-nowrap">
                  Get Consultation
                </button> */}

                <Link 
                  to="/Contact" 
                  className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A1628] px-10 py-4 rounded-xl font-extrabold text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-500 hover:scale-105 whitespace-nowrap">
          
                  Get Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INFRASTRUCTURE SECTION ================= */}
      <section id="About" className="py-24 bg-gradient-to-b from-[#0A1628] to-[#1A2B47] relative overflow-hidden w-full">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 text-center">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text text-transparent text-sm tracking-widest uppercase font-bold text-center">Infrastructure</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 text-center">World-Class Facilities</h2>
            <p className="text-xl text-[#C0C0C0] max-w-3xl mx-auto leading-relaxed text-center">
              Experience dental excellence in our premium facility, designed with cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 items-stretch">
            <InfrastructureFeature icon={<Award size={32} />} title="Advanced Equipment" stats="100%" unit="Digital" desc="Latest dental technology including 3D imaging and laser dentistry." />
            <InfrastructureFeature icon={<Users size={32} />} title="Expert Team" stats="45+" unit="Professionals" desc="15+ qualified dentists and support staff with international training." />
            <InfrastructureFeature icon={<Shield size={32} />} title="Sterilization" stats="100%" unit="Safe" desc="International-grade protocols ensuring complete patient safety." />
            <InfrastructureFeature icon={<Clock size={32} />} title="Flexible Hours" stats="24/7" unit="Available" desc="Extended working hours and emergency services available 24/7." />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <SuiteCard img="/Images/PrimemDensity.jfif" title="Premium Suites" desc="Luxury treatment rooms with ergonomic chairs and ambient lighting." tags={["Privacy", "Comfort"]} />
            <SuiteCard img="/Images/Sizer.jfif" title="Advanced Surgery" desc="Equipped with the latest technology for complex surgical procedures." tags={["Laser Tech", "Monitoring"]} />
            <SuiteCard img="/Images/Chare.jfif" title="Diagnostics Lab" desc="In-house digital imaging for instant and accurate diagnosis." tags={["3D Imaging", "AI Analysis"]} />
          </div>

          <div className="bg-gradient-to-r from-[#1A2B47]/50 to-[#1A2B47]/30 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl p-8 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Perk icon={<Wifi />} label="High-Speed WiFi" />
              <Perk icon={<Sparkles />} label="Premium Lounge" />
              <Perk icon={<Microscope />} label="Digital Lab" />
              <Perk icon={<Shield />} label="Sanitized Environment" />
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl p-12 relative overflow-hidden">
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-[#0A1628]">
              <div><div className="text-5xl font-bold mb-2">15+</div><div className="font-bold opacity-80">Expert Dentists</div></div>
              <div><div className="text-5xl font-bold mb-2">50K+</div><div className="font-bold opacity-80">Happy Patients</div></div>
              <div><div className="text-5xl font-bold mb-2">20+</div><div className="font-bold opacity-80">Years Excellence</div></div>
              <div><div className="text-5xl font-bold mb-2">98%</div><div className="font-bold opacity-80">Success Rate</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR TEAM SECTION ================= */}
      <section id="team" className="py-24 bg-gradient-to-b from-white via-[#E8E8E8]/20 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 text-center">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-[#0A1628] to-[#0A1628] bg-clip-text text-transparent text-sm tracking-widest uppercase font-bold text-center">Our Team</span>
            <div className="w-24 h-1 bg-[#d4af37] mt-2 mx-auto"></div>
            
            </div>
            <h2 className="text-4xl font-bold text-[#0A1628] text-center">Meet Our Expert Specialists</h2>
           <p className="text-xl text-[#2e2e2eff] max-w-3xl mx-auto leading-relaxed">
               Our highly qualified professionals are dedicated to providing exceptional dental care with expertise and compassion.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      
            <TeamCard img="/Images/Dr_Ferah.jpg" name="Dr. Ferah Khanna" role="Pediatric Dentist" exp="16+ Years" spec="Advanced Behavior Management" edu={`BDS,\nMDS, \n(pedodontics, PGIMER,Chandigarh)`} highlight="Specialist in Child Dental Care" />
            <TeamCard img="/Images/Sonali.jpg" name="Dr. Sonali Bansal" role="Endodontist" exp="Expert" spec="Micro-Endodontics" edu={`BDS,\nMDS, \n(Endodontics, Kalinga Institute of Dental Sciences)`} highlight="Specialization in aesthetic dentistry and painless root canal treatments" />
            <TeamCard img="/Images/Dr_Vinod.jpg" name="Dr. Vinod Khanna" role="Prosthodontist" exp="Dedicated" spec="Full Mouth Rehabilitation" edu={`BDS, \n(Government Dental College ), \nMDS, \n(Prosthodontics, PGIMER,Chandigarh)`} highlight="Specialization in full mouth rehabilitation, and aesthetic dentistry" />
                <TeamCard 
  img="/Images/DrAyeshaJain.jpg" 
  name="Dr. Ayesha Jain" 
  role="Senior Oral Surgeon" 
  // exp="16+ Years Exp" 
  spec="Surgical Excellence & Smile Makeovers" 
  edu={`BDS, \n (Nair Hospital Dental College, Mumbai)`} 

  // edu="MDS (Nair Hospital Dental College, Mumbai)" 
  highlight="Expert in Root Canal, Aesthetic Dentistry & Surgical Precision" 
/>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-[#0A1628] to-[#1A2B47] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 text-left text-white">
            <h2 className="text-4xl font-bold text-center">What Our Patients Say</h2>
          </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* 1. Dr. Nitu Gautam - Orthodontics */}
  <TestimonialCard 
    text="Dr. Nitu Gautam is a true artist of smiles. Her precision with Invisalign and focus on facial harmony is unmatched. With her 16+ years of clinical mastery, my aligner treatment was completely flawless and smooth!" 
    service="Orthodontics & Aligner" 
    date="Jan 2026" 
    name="Anjali Mehta" 
    location="South Delhi" 
    initial="A" 
  />

  {/* 2. Dr. Ayesha Jain - Smile Makeover */}
  <TestimonialCard 
    text="I am amazed by Dr. Ayesha Jain's surgical excellence. Coming from Nair Hospital Mumbai, her approach to my smile makeover combined clinical precision with an artistic eye. Highly recommended for premium care!" 
    service="Smile Makeover & Surgery" 
    date="Dec 2025" 
    name="Priya Sharma" 
    location="Greater Kailash" 
    initial="P" 
  />

  {/* 3. Dr. Sonali Bansal - Root Canal */}
  <TestimonialCard 
    text="Microscopic RCT by Dr. Sonali was totally painless. Her mastery in magnification technology and biomimetic dentistry saved my natural tooth perfectly. The most comfortable dental experience I have ever had in Delhi." 
    service="Root Canal Specialist" 
    date="Nov 2024" 
    name="Rahul Kapoor" 
    location="Connaught Place" 
    initial="R" 
  />

  {/* 4. Dr. Ferah Khanna - Pediatric */}
  <TestimonialCard 
    text="Dr. Ferah is a magician with kids! Her advanced behavior management techniques and gentle care at MAIDS background helped my anxious child stay calm. DDC is definitely the best place for pediatric dental care." 
    service="Pediatric Dental Care" 
    date="Oct 2024" 
    name="Sonia Gupta" 
    location="Vasant Vihar" 
    initial="S" 
  />
</div>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TestimonialCard 
  text="I am amazed by Dr. Ayesha Jain's surgical excellence. Coming from Nair Hospital Mumbai, her approach to my smile makeover combined clinical precision with an artistic eye. Highly recommended!" 
  service="Smile Makeover & Surgery" 
  date="Dec 2025" 
  name="Priya Sharma" 
  location="Greater Kailash" 
  initial="P" 
/>
            <TestimonialCard text="Dr. Nitu's aligner treatment was flawless. My smile looks amazing now!" service="Orthodontics" date="Dec 2024" name="Anjali Mehta" location="South Delhi" initial="A" />
            <TestimonialCard text="Microscopic RCT by Dr. Sonali was totally painless. Amazing technology used here." service="Root Canal" date="Nov 2024" name="Rahul Kapoor" location="Connaught Place" initial="R" />
            <TestimonialCard text="Dr. Ferah is a magician with kids. My son is no longer afraid of dentists." service="Pediatric" date="Oct 2024" name="Sonia Gupta" location="Vasant Vihar" initial="S" />
          </div> */}
        </div>
      </section>

           {/* ================= CONTACT SECTION ================= */}
      {/* ================= CONTACT & APPOINTMENT SECTION ================= */}
       <section id="contact" className="py-24 bg-gradient-to-b from-white via-[#E8E8E8]/20 to-white relative overflow-hidden w-full">
         {/* Figma Glow Background */}
         <div className="absolute top-20 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
         <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center mb-16">
             <div className="inline-block mb-4">
               <span className="bg-gradient-to-r from-[#0A1628] to-[#0A1628] bg-clip-text text-transparent text-sm tracking-widest uppercase font-bold">
                 Get In Touch
               </span>
            <div className="w-24 h-1 bg-[#d4af37] mt-2 mx-auto"></div>

             </div>
             <h2 className="text-4xl font-bold text-[#0A1628] mb-6">Book Your Appointment</h2>
             <p className="text-xl text-[#2e2e2eff] max-w-3xl mx-auto leading-relaxed">
               Take the first step towards a healthier, brighter smile. Our team is ready to serve you.
             </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             {/* Left Side: Clinic Info */}
             <div>
               <h3 className="text-[#0A1628] text-2xl font-bold mb-8">Visit Our Premium Clinic</h3>
              
               {/* Usecontent */}
               <div className="space-y-6 mb-10">
   {/* Address Card */}
   <ContactInfoCard 
    icon={<MapPin size={28} />}
    title="Clinic Address"
    details={
      <>
        <span className="text-[#4d4d4dff] font-bold">R-241, Ground Floor, G.K-1,</span><br />
        <span className="text-[#4d4d4dff] font-bold">Opp. GK-1 Police Station, New Delhi - 110048</span><br />
        <a href="https://share.google/6A7CQMKjflxTbhmo4" target="_blank" className="text-blue-400 font-semibold hover:underline cursor-pointer">
          View on Google Maps
        </a>
      </>
    }
  />

  {/* Phone Card */}
  <ContactInfoCard 
    icon={<Phone size={28} />}
    title="Phone Numbers"
    details={
      <>
        <span className="text-[#4d4d4dff] font-bold">+91 80-79-79-79-78,</span><br />
        <span className="text-[#4d4d4dff] font-bold">011-410-16-309</span><br />
        <span className="text-blue-400 font-semibold">(Emergency Support)</span>
      </>
    }
  />

  {/* Email/Web Card */}
  <ContactInfoCard 
    icon={<Mail size={28} />}
    title="Online Presence"
    details={
      <>
        <span className="text-[#4d4d4dff] font-bold">www.delhidental.org</span><br />
        <span className="text-[#4d4d4dff] font-bold ">delhidentalclinicindia@gmail.com</span>
      </>
    }
  />

   <ContactInfoCard 
                  icon={<Clock size={28} />}
                  title="Working Hours"
                                 details={
    <>
      <span className="text-[#4d4d4dff] font-bold">Tuesday - Saturday: 9:00 AM - 7:00 PM and Monday - Close</span><br />
      
      {/* <span className="text-[#4d4d4dff] font-bold">Sunday: 10:00 AM - 2:00 PM</span><br /> */}
      
      {/* <span className="text-blue-400 font-semibold">Emergency: 24/7 Available</span> */}
    </>
  }
                />
</div>
              


              {/* Why Choose Us Badges */}
              <div className="bg-gradient-to-br from-[#0A1628] to-[#1A2B47] rounded-2xl p-6 border border-[#D4AF37]/30 shadow-xl">
                <h4 className="text-white font-bold mb-4">Why Choose Us?</h4>
                <div className="space-y-3">
                  {["Experienced Dentists", "Advanced Technology", "Complete Dental Solutions", "Hygiene & Safety First", "Affordable & Transparent Pricing", "Patient-Friendly Environment"].map((text) => (
                    <div key={text} className="flex items-center gap-3 text-[#E8E8E8]">
                      <CircleCheckBig size={20} className="text-[#D4AF37] shrink-0" />
                      <span className="text-sm">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Appointment Form */}
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
                <h3 className="text-[#0A1628] text-2xl font-bold mb-6">Schedule Your Visit</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[#0A1628] text-sm font-bold mb-2">Full Name *</label>
                    <input type="text" value={formData.name}
  onChange={(e) => setFormData({...formData, name: e.target.value})}  required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all bg-[#E8E8E8]/30" placeholder="Enter your full name" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#0A1628] text-sm font-bold mb-2">Email Address *</label>
                      <input type="email" value={formData.email}
  onChange={(e) => setFormData({...formData, email: e.target.value})} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none bg-[#E8E8E8]/30" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-[#0A1628] text-sm font-bold mb-2">Phone Number *</label>
                      <input type="tel" value={formData.phone}
  onChange={(e) => setFormData({...formData, phone: e.target.value})} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none bg-[#E8E8E8]/30" placeholder="+91 98765-43210" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#0A1628] text-sm font-bold mb-2">Service Required *</label>
                      <select required value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none bg-[#E8E8E8]/30 text-gray-600">
                        <option value="">Select a service</option>
                        <option value="General Checkup">General Checkup</option>
                        <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                        <option value="Orthodontics">Orthodontics</option>
                        <option value="Dental Implants">Dental Implants</option>
                        <option value="Root Canal Treatment">Root Canal Treatment</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#0A1628] text-sm font-bold mb-2">Preferred Date *</label>
                      <input type="date" value={formData.date}
  onChange={(e) => setFormData({...formData, date: e.target.value})} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none bg-[#E8E8E8]/30" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#0A1628] text-sm font-bold mb-2">Additional Message</label>
                    <textarea rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none resize-none bg-[#E8E8E8]/30" placeholder="Any specific concerns..."></textarea>
                  </div>

                  {/* <button type="submit" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A1628] py-4 rounded-lg font-bold hover:shadow-xl hover:shadow-[#D4AF37]/50 transition-all flex items-center justify-center gap-2 group hover:scale-[1.02]">
                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                    <span>Submit Appointment Request</span>
                  </button> */}
                      <button 
                              type="submit" 
                              disabled={isSubmitting} 
                              className={`w-full py-5 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-3 transition-all ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A1628] hover:scale-[1.01]'}`}
                            >
                              {isSubmitting ? (
                                <>Processing... <Clock className="animate-spin" size={20} /></>
                              ) : (
                                <>Submit Appointment Request <Send size={20} /></>
                              )}
                            </button>
                  <p className="text-center text-xs text-[#808080]">We'll confirm your appointment within 2 hours</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

// Reusable Components
const QuickInfoCard = ({ icon, title, desc, sub }) => (
  <div className="bg-[#1A2B47]/50 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl p-6 group text-left">
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, { size: 28, className: "text-[#0A1628]" })}
      </div>
      <div className="flex-1">
        <h3 className="text-[#D4AF37] font-bold mb-1 text-left">{title}</h3>
        <p className="text-white text-sm text-left">{desc}</p>
        <p className="text-gray-300 text-xs mt-1 uppercase text-left">{sub}</p>
      </div>
    </div>
  </div>
);

const ServiceCard = ({ img, title, icon, desc }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full text-left">
    <div className="relative h-64 overflow-hidden shrink-0 text-left">
      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-transparent to-transparent"></div>
      <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center text-white">{icon}</div>
      <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white italic text-left">{title}</h3>
    </div>
    <div className="p-6 flex-grow text-left"><p className="text-gray-800 text-sm mb-4 leading-relaxed text-left">{desc}</p></div>
  </div>
);

const InfrastructureFeature = ({ icon, title, stats, unit, desc }) => (
  <div className="relative bg-[#1A2B47]/50 border border-[#D4AF37]/20 rounded-2xl p-6 flex flex-col h-full text-left">
    <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl mb-6 flex items-center justify-center text-[#0A1628] shrink-0">{icon}</div>
    <div className="text-3xl text-[#D4AF37] font-bold mb-1 text-left">{stats}</div>
    <div className="text-[10px] text-gray-300 uppercase mb-4 text-left">{unit}</div>
    <h3 className="text-white font-bold text-lg mb-3 text-left">{title}</h3>
    <p className="text-gray-400 text-sm text-left">{desc}</p>
  </div>
);

const SuiteCard = ({ img, title, desc, tags }) => (
  <div className="group relative overflow-hidden rounded-2xl h-96 text-left">
    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent"></div>
    <div className="absolute bottom-0 p-6 text-left">
      <h3 className="text-white font-bold text-xl mb-2 text-left">{title}</h3>
      <p className="text-gray-300 text-xs mb-4 text-left">{desc}</p>
      <div className="flex gap-2">{tags.map(t => <span key={t} className="px-2 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] rounded-full">{t}</span>)}</div>
    </div>
  </div>
);

const Perk = ({ icon, label }) => (
  <div className="flex items-center gap-3 text-left">
    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-lg flex items-center justify-center text-[#0A1628]">{icon}</div>
    <span className="text-[#E8E8E8] text-sm text-left">{label}</span>
  </div>
);

const TeamCard = ({ img, name, role, exp, spec, edu, highlight }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full text-left">
    <div className="relative h-80 overflow-hidden shrink-0">
      <img src={img} alt={name} className="w-full h-full object-cover" />
      <div className="absolute top-4 left-4 bg-[#D4AF37] text-[#0A1628] px-3 py-1 rounded-full text-[10px] font-bold uppercase">{exp}</div>
    </div>
    <div className="p-6 flex flex-col flex-grow text-left">
      <h3 className="text-[#0A1628] text-xl font-bold mb-1 text-left">{name}</h3>
      <div className="text-[#D4AF37] font-bold mb-4 text-xs uppercase text-left">{role}</div>
      <div className="space-y-3 mb-6 flex-grow text-xs text-left">
        <div className="flex items-start gap-3"><Award size={16} className="text-[#D4AF37] shrink-0" /><p className="text-left">{spec}</p></div>
        <div className="flex items-start gap-3"><GraduationCap size={16} className="text-[#D4AF37] shrink-0" /><div className="text-left whitespace-pre-line"> {/* <--- whitespace-pre-line add karein */}
            {edu}
          </div></div>
        <div className="mt-4 p-2 bg-gray-50 border-l-2 border-[#D4AF37] italic text-left">{highlight}</div>
      </div>
    </div>
  </div>
);

const TestimonialCard = ({ text, service, name, location, initial, date }) => (
  <div className="bg-[#1A2B47]/50 border border-[#D4AF37]/20 rounded-2xl p-6 h-full flex flex-col text-left">
    <div className="flex gap-1 mb-4 text-[#D4AF37]">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
    <p className="text-white mb-6 flex-grow italic text-sm text-left">"{text}"</p>
    <div className="flex items-center gap-3 text-left">
      <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center font-bold text-[#0A1628]">{initial}</div>
      <div className="text-left"><div className="text-white font-bold">{name}</div><div className="text-xs text-gray-400">{location} | {service}</div></div>
    </div>
  </div>
);

const ContactInfoCard = ({ icon, title, details }) => (
  <div className="group flex gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#D4AF37]/50 hover:shadow-lg transition-all duration-300 text-left">
    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-[#0A1628]">
      {icon}
    </div>
    <div>
      <div className="text-[#0A1628] font-bold mb-1">{title}</div>
      <div className="text-[#808080] text-sm leading-relaxed">{details}</div>
    </div>
  </div>
);

export default Home;












// import React from 'react';
// import { 
//   Award, Sparkles, MapPin, Clock, Phone, ArrowRight, 
//   Smile, Shield, Stethoscope, Heart, Baby, Star, 
//   Quote, ThumbsUp, Send, Calendar, Microscope, Wifi, GraduationCap ,Users, Mail,CircleCheckBig
// } from 'lucide-react';

// const Home = () => {
//   return (
//     <main className="w-full bg-[#050B14]">
      
//       {/* ================= HERO SECTION ================= */}
//       <section className="relative min-h-screen flex items-center overflow-hidden">
//         {/* Background Image & Overlays */}
//         <div className="absolute inset-0">
//           <img 
//             src="https://images.unsplash.com/photo-1704455306925-1401c3012117?q=80&w=1080" 
//             alt="Delhi Dental Clinic Interior" 
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/85 to-[#1A2B47]/70"></div>
//           {/* Glowing Blur Effects */}
//           <div className="absolute top-20 right-20 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
//         </div>

//         <div className="relative max-w-9xl mx-auto px-2 sm:px-6 lg:px-8 py-32 z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <div className="text-white">
//              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
//     <Award className="w-4 h-4 text-[#D4AF37]" />
//     <span className="text-[#D4AF37] text-sm font-medium italic">Crafting Smile • Delhi Dental Clinic</span>
//   </div>
             
//               {/* <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
//                 <Award className="w-4 h-4 text-[#D4AF37]" />
//                 <span className="text-[#D4AF37] text-sm font-medium">20+ Years of Excellence</span>
//               </div> */}
              
//               <h1 className="mb-6 bg-gradient-to-r from-white via-[#E8E8E8] to-[#C0C0C0] bg-clip-text text-transparent text-5xl md:text-7xl font-bold leading-tight">
//                 Delhi's Premier <br /> Dental Excellence
//               </h1>
              
//               <p className="mb-8 text-xl text-[#C0C0C0] leading-relaxed max-w-lg">
//                 Experience world-class dental care with state-of-the-art technology, highly skilled professionals, and a commitment to your perfect smile.
//               </p>

//               <div className="flex flex-wrap gap-4 mb-12">
//                 {/* <button className="relative group overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A1628] px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 shadow-lg hover:shadow-[#D4AF37]/40 flex items-center gap-2">
//                   <Sparkles size={20} /> Book Appointment
//                 </button>
//                 <button className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-lg font-bold hover:bg-[#D4AF37]/10 transition-all">
//                   View Services
//                 </button> */}

//                 {/* 1. Book Appointment - Design same, added href to #contact section */}
// <a 
//   href="/Contact" 
//   className="relative group overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A1628] px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 shadow-lg hover:shadow-[#D4AF37]/40 flex items-center justify-center gap-2"
// >
//   <Sparkles size={20} /> Book Appointment
// </a>

// {/* 2. View Services - Design same, added href to #services section */}
// <a 
//   href="#services" 
//   className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-lg font-bold hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center"
// >
//   View Services
// </a>

//               </div>

//               {/* Stats Grid */}
//               <div className="grid grid-cols-3 gap-6">
//                 {[["10K+", "Happy Patients"], ["15+", "Expert Dentists"], ["98%", "Success Rate"]].map(([num, label]) => (
//                   <div key={label} className="border-l-2 border-[#D4AF37] pl-4">
//                     <div className="text-3xl text-[#D4AF37] font-bold mb-1">{num}</div>
//                     <div className="text-sm text-[#C0C0C0] uppercase tracking-wider text-[10px]">{label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right Info Cards */}
//             <div className="grid grid-cols-1 gap-6">
//               <QuickInfoCard icon={<MapPin />} title="Prime Location" desc="Connaught Place, New Delhi" sub="Easy Metro Access • Free Parking" />
//               <QuickInfoCard icon={<Clock />} title="Flexible Hours" desc="Mon-Sat: 9:00 AM - 8:00 PM" sub="Emergency Services: 24/7 Available" />
//               <QuickInfoCard icon={<Phone />} title="Quick Contact" desc="+91 8079797978" sub="WhatsApp: +91 8079797978" />
//             </div>
//           </div>
//         </div>
//       </section>


// {/* --- Founder Profile Section --- */}
// <section className="py-24 bg-white">
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="grid lg:grid-cols-2 gap-16 items-center">
//       {/* Dr. Nitu Image Placeholder */}
//       <div className="relative group">
//         <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all"></div>
//         <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
//            <img src="/Images/Dr_Netu.jpg" alt="Dr. Nitu Gautam" className="w-full h-full object-cover" />
//            <div className="absolute bottom-0 left-0 right-0 bg-[#0A1628]/80 backdrop-blur-md p-6">
//               <div className="text-[#D4AF37] font-bold">Founder & Chief Dental Surgeon</div>
//               <div className="text-white text-xs uppercase tracking-widest mt-1">Fellow of World Federation of Orthodontists (WFO)</div>
//            </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="space-y-6">
//         <h2 className="text-4xl font-bold text-[#0A1628]">Dr. Nitu Gautam <span className="text-lg font-medium text-gray-700 font-serif">MDS (Orthodontics)</span></h2>
//         <p className="text-gray-700 leading-relaxed italic">
//           "Dr. Nitu is a highly accomplished professional with over 16 years of clinical experience. She is a graduate of the prestigious Nair Hospital Dental College, Mumbai."
//         </p>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#D4AF37]">
//             <div className="text-[#0A1628] font-bold">Clinical Expertise</div>
//             <div className="text-sm text-gray-700">Visible/Invisible Braces, Clear Aligners & Implants.</div>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#D4AF37]">
//             <div className="text-[#0A1628] font-bold">Academician</div>
//             <div className="text-sm text-gray-700">Former Faculty at Nair Hospital & Professor at IDS Bhubaneswar.</div>
//           </div>
//         </div>
//         <button className="flex items-center gap-2 text-[#D4AF37] font-bold hover:gap-4 transition-all">
//           Read Full Biography <ArrowRight size={18} />
//         </button>
//       </div>
//     </div>
//   </div>
// </section>


//       {/* ================= SERVICES SECTION ================= */}
//       <section id="services" className="py-24 bg-gradient-to-b from-white via-[#E8E8E8]/30 to-white relative overflow-hidden">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center mb-16">
//             <div className="inline-block mb-4">
//               <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent text-sm tracking-widest uppercase font-bold">Our Services</span>
//             </div>
//             <h2 className="mb-6 text-4xl font-bold text-[#0A1628]">Comprehensive Dental Solutions</h2>
//             <p className="text-lg text-[#2e2e2eff] max-w-3xl mx-auto leading-relaxed">
//               From routine check-ups to advanced procedures, we offer complete dental care tailored to your needs.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <ServiceCard img="https://images.unsplash.com/photo-1758653500342-5476c8ec3da6?q=80" title="General Dentistry" icon={<Smile />} desc="Comprehensive dental check-ups, cleanings, and preventive care." />
//             <ServiceCard img="https://images.unsplash.com/photo-1654373535457-383a0a4d00f9?q=80" title="Cosmetic Dentistry" icon={<Sparkles />} desc="Transform your smile with advanced teeth whitening and veneers." />
//             <ServiceCard img="https://images.unsplash.com/photo-1720685193975-3b449a7cb905?q=80" title="Orthodontics" icon={<Shield />} desc="Braces and clear aligners for perfectly aligned confident smiles." />
//             <ServiceCard img="https://images.unsplash.com/photo-1643660527078-743fc7c9f857?q=80" title="Root Canal" icon={<Stethoscope />} desc="Pain-free endodontic procedures with advanced techniques." />
//             <ServiceCard img="https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?q=80" title="Dental Implants" icon={<Heart />} desc="Premium implant solutions for permanent tooth replacements." />
//             <ServiceCard img="https://images.unsplash.com/photo-1593022356269-609ed284b3c3?q=80" title="Pediatric Care" icon={<Baby />} desc="Gentle, specialized care for children in a fun environment." />
//           </div>
//           {/* --- Call to Action Banner --- */}
// <div className="mt-16 text-center max-w-5xl mx-auto px-4">
//   <div className="inline-flex flex-col sm:flex-row gap-6 bg-gradient-to-r from-[#0A1628] to-[#1A2B47] rounded-3xl p-8 md:p-12 border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden group">
    
//     {/* Background Decorative Glow */}
//     <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-3xl rounded-full"></div>

//     <div className="text-left flex-1 relative z-10">
//       <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 tracking-tight">
//         Need a Custom Treatment Plan?
//       </h3>
//       <p className="text-[#C0C0C0] text-lg leading-relaxed opacity-90">
//         Our experts will create a personalized dental care solution just for you.
//       </p>
//     </div>

//     <div className="flex items-center relative z-10">
//       <button className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A1628] px-10 py-4 rounded-xl font-extrabold text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-500 hover:scale-105 whitespace-nowrap">
//         Get Consultation
//       </button>
//     </div>
//   </div>
// </div>
//         </div>
//       </section>

//       {/* ================= INFRASTRUCTURE SECTION ================= */}
//     {/* ================= INFRASTRUCTURE SECTION (Updated) ================= */}
//       <section id="About" className="py-24 bg-gradient-to-b from-[#0A1628] to-[#1A2B47] relative overflow-hidden w-full">
//         {/* Figma Glow Effects */}
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center mb-16">
//             <div className="inline-block mb-4">
//               <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text text-transparent text-sm tracking-widest uppercase font-bold">
//                 Infrastructure
//               </span>
//             </div>
//             <h2 className="text-4xl font-bold text-white mb-6">World-Class Facilities</h2>
//             <p className="text-xl text-[#C0C0C0] max-w-3xl mx-auto leading-relaxed">
//               Experience dental excellence in our premium facility, designed with cutting-edge technology and your comfort in mind.
//             </p>
//           </div>

//           {/* 1. Feature Icon Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
//             <InfrastructureFeature 
//               icon={<Award size={32} />} 
//               title="Advanced Equipment" 
//               stats="100%" 
//               unit="Digital" 
//               desc="Latest dental technology including digital X-rays, 3D imaging, and laser dentistry." 
//             />
//             <InfrastructureFeature 
//               icon={<Users size={32} />} 
//               title="Expert Team" 
//               stats="45+" 
//               unit="Professionals" 
//               desc="15+ qualified dentists and 30+ support staff with international training." 
//             />
//             <InfrastructureFeature 
//               icon={<Shield size={32} />} 
//               title="Sterilization Excellence" 
//               stats="100%" 
//               unit="Safe" 
//               desc="International-grade sterilization protocols ensuring complete safety." 
//             />
//             <InfrastructureFeature 
//               icon={<Clock size={32} />} 
//               title="Flexible Hours" 
//               stats="24/7" 
//               unit="Available" 
//               desc="Extended working hours and emergency services available 24/7." 
//             />
//           </div>

//           {/* 2. Suite Images Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
//             <SuiteCard 
//               img="https://images.unsplash.com/photo-1704455306925-1401c3012117?q=80&w=1080"
//               title="Premium Treatment Suites"
//               desc="8 luxury treatment rooms with ergonomic chairs, ambient lighting, and entertainment systems."
//               tags={["Climate Control", "Entertainment", "Privacy Screens"]}
//             />
//             <SuiteCard 
//               img="https://images.unsplash.com/photo-1643660527078-743fc7c9f857?q=80&w=1080"
//               title="Advanced Surgical Suite"
//               desc="State-of-the-art surgical suite equipped with latest technology for complex procedures."
//               tags={["HD Imaging", "Laser Tech", "Monitoring"]}
//             />
//             <SuiteCard 
//               img="https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?q=80&w=1080"
//               title="Digital Diagnostics Lab"
//               desc="In-house digital imaging systems for instant, accurate diagnosis and treatment planning."
//               tags={["3D Imaging", "AI Analysis", "Instant Results"]}
//             />
//           </div>

//           {/* 3. Small Perks Grid */}
//           <div className="bg-gradient-to-r from-[#1A2B47]/50 to-[#1A2B47]/30 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl p-8 mb-16">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               <Perk icon={<Wifi />} label="High-Speed WiFi" />
//               <Perk icon={<Sparkles />} label="Premium Lounge" />
//               <Perk icon={<Microscope />} label="Digital Lab" />
//               <Perk icon={<Shield />} label="Sanitized Environment" />
//             </div>
//           </div>

//           {/* 4. Golden Global Stats */}
//           <div className="mt-16 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl p-12 relative overflow-hidden">
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
//               <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
//             </div>
//             <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-[#0A1628]">
//               <div><div className="text-5xl font-bold mb-2">15+</div><div className="font-bold opacity-80">Expert Dentists</div></div>
//               <div><div className="text-5xl font-bold mb-2">50K+</div><div className="font-bold opacity-80">Happy Patients</div></div>
//               <div><div className="text-5xl font-bold mb-2">20+</div><div className="font-bold opacity-80">Years Excellence</div></div>
//               <div><div className="text-5xl font-bold mb-2">98%</div><div className="font-bold opacity-80">Success Rate</div></div>
//             </div>
//           </div>
//         </div>
//       </section>


      

//       {/* ================= DOCTORS SECTION ================= */}
//       {/* ================= OUR TEAM SECTION ================= */}
//       <section id="team" className="py-24 bg-gradient-to-b from-white via-[#E8E8E8]/20 to-white relative overflow-hidden">
//         <div className="absolute top-20 left-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 right-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center mb-16">
//             <div className="inline-block mb-4">
//               <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent text-sm tracking-widest uppercase font-bold">
//                 Our Team
//               </span>
//             </div>
//             <h2 className="text-4xl font-bold text-[#0A1628] mb-6">Meet Our Expert Dentists</h2>
//             <p className="text-xl text-[#2e2e2eff] max-w-3xl mx-auto leading-relaxed">
//               Our highly qualified professionals are dedicated to providing exceptional dental care with expertise and compassion.
//             </p>
//           </div>

// {/* Usecontent */}
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//   {/* Doctor 1: Dr. Nitu Gautam */}
//   {/* <TeamCard 
//     img="/Images/Dr_Netu.jpg" 
//     name="Dr. Nitu Gautam"
//     role="Founder & Chief Dental Surgeon"
//     exp="16+ Years Exp"
//     spec="Orthodontics & Dentofacial Orthopaedics"
//     edu="MDS (Nair Hospital Dental College, Mumbai)"
//     highlight="Fellowship of the World Federation of Orthodontists (WFO)"
//   /> */}

//   {/* Doctor 2: Dr. Ferah Khanna */}
//   <TeamCard 
//     img="/Images/Dr_Ferah.jpg"
//     name="Dr. Ferah Khanna"
//     role="Pediatric Dentist & Child Specialist"
//     exp="16+ Years Exp"
//     spec="Exclusive Pediatric Dentistry"
//     edu="MDS (PGIMER, Chandigarh)"
//     highlight="Assistant Editor - Journal of SAAPD"
//   />

//   {/* Doctor 3: Dr. Sonali Bansal */}
//   <TeamCard 
//     img="/Images/Dr_sonali.jpg"
//     name="Dr. Sonali Bansal"
//     role="Esthetic Dentist & Endodontist"
//     exp="Endodontics Expert"
//     spec="Restorative & Painless Root Canal"
//     edu="MDS (Kalinga Institute of Dental Sciences)"
//     highlight="Trained in Microendodontics & Biomimetic Dentistry"
//   />

//   {/* Doctor 4: Dr. Vinod Khanna */}
//   <TeamCard 
//     img="/Images/Dr_Vinod.jpg"
//     name="Dr. Vinod Khanna"
//     role="Prosthodontist & Restorative Dentist"
//     exp="Dedicated Patient-Centric Care"
//     spec="Implants & Full Mouth Rehabilitation"
//     edu="MDS (Post Graduate Institute of Medical Sciences)"
//     highlight="Expert in Crowns, Bridges & Aesthetic Dentistry"
//   />
// </div>


//           {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <TeamCard 
//               img="https://images.unsplash.com/photo-1758691463626-0ab959babe00?q=80"
//               name="Dr. Rajesh Kumar"
//               role="Chief Dental Surgeon"
//               exp="25 Years Exp"
//               spec="Cosmetic & Implant Dentistry"
//               edu="BDS, MDS (Prosthodontics)"
//               highlight="Award-Winning Cosmetic Dentist"
//             />
//             <TeamCard 
//               img="https://images.unsplash.com/photo-1758691463626-0ab959babe00?q=80"
//               name="Dr. Priya Sharma"
//               role="Senior Orthodontist"
//               exp="18 Years Exp"
//               spec="Orthodontics & Dentofacial"
//               edu="BDS, MDS (Orthodontics)"
//               highlight="Invisalign Certified Expert"
//             />
//             <TeamCard 
//               img="https://images.unsplash.com/photo-1758691463626-0ab959babe00?q=80"
//               name="Dr. Amit Verma"
//               role="Endodontist"
//               exp="15 Years Exp"
//               spec="Root Canal Specialist"
//               edu="BDS, MDS (Endodontics)"
//               highlight="Laser Dentistry Pioneer"
//             />
//             <TeamCard 
//               img="https://images.unsplash.com/photo-1758691463626-0ab959babe00?q=80"
//               name="Dr. Neha Singh"
//               role="Pediatric Dentist"
//               exp="12 Years Exp"
//               spec="Children's Dental Care"
//               edu="BDS, MDS (Pediatric Dentistry)"
//               highlight="Child-Friendly Care Specialist"
//             />
//           </div> */}

//           {/* Bottom Professional Banner */}
//           <div className="mt-16 bg-gradient-to-r from-[#0A1628] to-[#1A2B47] rounded-2xl p-8 border border-[#D4AF37]/30 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
//             <div className="relative grid md:grid-cols-2 gap-8 items-center">
//               <div>
//                 <h3 className="text-white text-2xl font-bold mb-4">Certified & Experienced Professionals</h3>
//                 <p className="text-[#C0C0C0] leading-relaxed">
//                   All our dentists are registered with the Dental Council of India and have extensive experience in their respective fields. We maintain the highest standards of professional excellence.
//                 </p>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-[#1A2B47]/50 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl p-4 text-center">
//                   <div className="text-3xl text-[#D4AF37] font-bold mb-1">15+</div>
//                   <div className="text-sm text-[#C0C0C0]">Expert Dentists</div>
//                 </div>
//                 <div className="bg-[#1A2B47]/50 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl p-4 text-center">
//                   <div className="text-3xl text-[#D4AF37] font-bold mb-1">30+</div>
//                   <div className="text-sm text-[#C0C0C0]">Support Staff</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>


// {/* ================= TESTIMONIALS SECTION ================= */}
//       <section id="testimonials" className="py-24 bg-gradient-to-b from-[#0A1628] to-[#1A2B47] relative overflow-hidden">
//         {/* Glow Background Effects */}
//         <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center mb-16">
//             <div className="inline-block mb-4">
//               <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text text-transparent text-sm tracking-widest uppercase font-bold">
//                 Testimonials
//               </span>
//             </div>
//             <h2 className="text-4xl font-bold text-white mb-6">What Our Patients Say</h2>
//             <p className="text-xl text-[#C0C0C0] max-w-3xl mx-auto leading-relaxed">
//               Real experiences from real patients who have trusted us with their dental care
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <TestimonialCard 
//               text="Exceptional service and results! The cosmetic dentistry work transformed my smile completely. The team is professional, caring, and the clinic environment is luxurious and comfortable."
//               service="Teeth Whitening & Veneers"
//               date="December 2024"
//               name="Anjali Mehta"
//               location="South Delhi"
//               initial="A"
//             />
//             <TestimonialCard 
//               text="I was nervous about my root canal, but Dr. Rajesh made the entire process painless and stress-free. The advanced technology and gentle approach made all the difference!"
//               service="Root Canal Treatment"
//               date="November 2024"
//               name="Rahul Kapoor"
//               location="Connaught Place"
//               initial="R"
//             />
//             <TestimonialCard 
//               text="Best pediatric care in Delhi! Dr. Neha is wonderful with children. My daughter actually enjoys her dental visits now. Highly recommend for families seeking quality care."
//               service="Pediatric Care"
//               date="October 2024"
//               name="Sonia Gupta"
//               location="Vasant Vihar"
//               initial="S"
//             />
//           </div>

//           {/* Overall Rating Banner */}
//           <div className="mt-16 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl p-12 relative overflow-hidden">
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
//               <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
//             </div>
//             <div className="relative grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
//               <div className="md:col-span-1">
//                 <div className="flex items-center justify-center md:justify-start gap-1 mb-4 text-[#0A1628]">
//                   {[...Array(5)].map((_, i) => <Star key={i} size={24} className="fill-[#0A1628]" />)}
//                 </div>
//                 <div className="text-6xl font-bold mb-2 text-[#0A1628]">4.9</div>
//                 <div className="text-xl font-bold text-[#1A2B47]">out of 5.0</div>
//               </div>
//               <div className="md:col-span-2">
//                 <h3 className="text-[#0A1628] text-2xl font-bold mb-3">Exceptional Patient Satisfaction</h3>
//                 <p className="text-[#1A2B47] font-medium leading-relaxed mb-4">
//                   Based on 2,500+ verified patient reviews. Our commitment to excellence is reflected in every smile we create.
//                 </p>
//                 <div className="flex flex-wrap gap-4 justify-center md:justify-start">
//                   {["2,500+ Reviews", "100% Verified", "Top Rated in Delhi"].map((badge) => (
//                     <div key={badge} className="bg-[#0A1628]/10 backdrop-blur-sm px-4 py-2 rounded-lg text-[#0A1628] font-bold text-sm">
//                       {badge}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>


//       {/* ================= CONTACT SECTION ================= */}
//      {/* ================= CONTACT & APPOINTMENT SECTION ================= */}
//       <section id="contact" className="py-24 bg-gradient-to-b from-white via-[#E8E8E8]/20 to-white relative overflow-hidden w-full">
//         {/* Figma Glow Background */}
//         <div className="absolute top-20 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center mb-16">
//             <div className="inline-block mb-4">
//               <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent text-sm tracking-widest uppercase font-bold">
//                 Get In Touch
//               </span>
//             </div>
//             <h2 className="text-4xl font-bold text-[#0A1628] mb-6">Book Your Appointment</h2>
//             <p className="text-xl text-[#2e2e2eff] max-w-3xl mx-auto leading-relaxed">
//               Take the first step towards a healthier, brighter smile. Our team is ready to serve you.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {/* Left Side: Clinic Info */}
//             <div>
//               <h3 className="text-[#0A1628] text-2xl font-bold mb-8">Visit Our Premium Clinic</h3>
              
//               {/* Usecontent */}
//               <div className="space-y-6 mb-10">
//   {/* Address Card */}
//   <ContactInfoCard 
//     icon={<MapPin size={28} />}
//     title="Clinic Address"
//     details={
//       <>
//         <span className="text-[#4d4d4dff] font-bold">R-241, Ground Floor, G.K-1,</span><br />
//         <span className="text-[#4d4d4dff] font-bold">Opp. GK-1 Police Station, New Delhi - 110048</span><br />
//         <a href="https://share.google/6A7CQMKjflxTbhmo4" target="_blank" className="text-blue-400 font-semibold hover:underline cursor-pointer">
//           View on Google Maps
//         </a>
//       </>
//     }
//   />

//   {/* Phone Card */}
//   <ContactInfoCard 
//     icon={<Phone size={28} />}
//     title="Phone Numbers"
//     details={
//       <>
//         <span className="text-[#4d4d4dff] font-bold">+91 8079797978,</span><br />
//         <span className="text-[#4d4d4dff] font-bold">011-XXXXXXXX</span><br />
//         <span className="text-blue-400 font-semibold">(Emergency Support)</span>
//       </>
//     }
//   />

//   {/* Email/Web Card */}
//   <ContactInfoCard 
//     icon={<Mail size={28} />}
//     title="Online Presence"
//     details={
//       <>
//         <span className="text-[#4d4d4dff] font-bold">www.delhidental.org</span><br />
//         <span className="text-[#4d4d4dff] font-bold ">info@delhidental.org</span>
//       </>
//     }
//   />

//    <ContactInfoCard 
//                   icon={<Clock size={28} />}
//                   title="Working Hours"
//                                  details={
//     <>
//       <span className="text-[#4d4d4dff] font-bold">Monday - Saturday: 9:00 AM - 8:00 PM</span><br />
      
//       <span className="text-[#4d4d4dff] font-bold">Sunday: 10:00 AM - 2:00 PM</span><br />
      
//       <span className="text-blue-400 font-semibold">Emergency: 24/7 Available</span>
//     </>
//   }
//                 />
// </div>
              
              
              
//               {/* <div className="space-y-6 mb-10">
//                 <ContactInfoCard 
//   icon={<MapPin size={28} />}
//   title="Clinic Address"
//   details={
//     <>
//       <span className="text-[#2e2e2eff]">Shop No. 23, 2nd Floor,</span><br />
      
//       <span className="text-[#2e2e2eff] ">Connaught Place, New Delhi - 110001</span><br />
      
//       <span className="text-blue-400 font-semibold">Near Rajiv Chowk Metro Station</span>
//     </>
//   }
// />
//                 <ContactInfoCard 
//                   icon={<Phone size={28} />}
//                   title="Phone Numbers"
//                     details={
//     <>
//       <span className="text-[#2e2e2eff]">+91 11-2345-6789,</span><br />
      
//       <span className="text-[#2e2e2eff] ">+91 98765-43210</span><br />
      
//       <span className="text-blue-400 font-semibold">(WhatsApp)</span>
//     </>
//   }
//                 />
//                 <ContactInfoCard 
//                   icon={<Mail size={28} />}
//                   title="Email Address"
//                            details={
//     <>
//       <span className="text-[#2e2e2eff]">info@delhidentalclinic.com</span><br />
      
//       <span className="text-[#2e2e2eff] ">appointments@delhidentalclinic.com</span><br />
      
//     </>
//   }
//                 />
//                 <ContactInfoCard 
//                   icon={<Clock size={28} />}
//                   title="Working Hours"
//                                  details={
//     <>
//       <span className="text-[#2e2e2eff]">Monday - Saturday: 9:00 AM - 8:00 PM</span><br />
      
//       <span className="text-[#2e2e2eff] ">Sunday: 10:00 AM - 2:00 PM</span><br />
      
//       <span className="text-blue-400 font-semibold">Emergency: 24/7 Available</span>
//     </>
//   }
//                 />
//               </div> */}

//               {/* Why Choose Us Badges */}
//               <div className="bg-gradient-to-br from-[#0A1628] to-[#1A2B47] rounded-2xl p-6 border border-[#D4AF37]/30 shadow-xl">
//                 <h4 className="text-white font-bold mb-4">Why Choose Us?</h4>
//                 <div className="space-y-3">
//                   {["Free Parking Available", "Metro Connected Location", "Same Day Appointments", "Evening & Weekend Slots"].map((text) => (
//                     <div key={text} className="flex items-center gap-3 text-[#E8E8E8]">
//                       <CircleCheckBig size={20} className="text-[#D4AF37] shrink-0" />
//                       <span className="text-sm">{text}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Right Side: Appointment Form */}
//             <div>
//               <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
//                 <h3 className="text-[#0A1628] text-2xl font-bold mb-6">Schedule Your Visit</h3>
//                 <form className="space-y-5">
//                   <div>
//                     <label className="block text-[#0A1628] text-sm font-bold mb-2">Full Name *</label>
//                     <input type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all bg-[#E8E8E8]/30" placeholder="Enter your full name" />
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     <div>
//                       <label className="block text-[#0A1628] text-sm font-bold mb-2">Email Address *</label>
//                       <input type="email" required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none bg-[#E8E8E8]/30" placeholder="your@email.com" />
//                     </div>
//                     <div>
//                       <label className="block text-[#0A1628] text-sm font-bold mb-2">Phone Number *</label>
//                       <input type="tel" required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none bg-[#E8E8E8]/30" placeholder="+91 98765-43210" />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     <div>
//                       <label className="block text-[#0A1628] text-sm font-bold mb-2">Service Required *</label>
//                       <select required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none bg-[#E8E8E8]/30 text-gray-600">
//                         <option value="">Select a service</option>
//                         <option value="general">General Checkup</option>
//                         <option value="cosmetic">Cosmetic Dentistry</option>
//                         <option value="orthodontics">Orthodontics</option>
//                         <option value="implants">Dental Implants</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-[#0A1628] text-sm font-bold mb-2">Preferred Date *</label>
//                       <input type="date" required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none bg-[#E8E8E8]/30" />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-[#0A1628] text-sm font-bold mb-2">Additional Message</label>
//                     <textarea rows="4" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none resize-none bg-[#E8E8E8]/30" placeholder="Any specific concerns..."></textarea>
//                   </div>

//                   <button type="submit" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A1628] py-4 rounded-lg font-bold hover:shadow-xl hover:shadow-[#D4AF37]/50 transition-all flex items-center justify-center gap-2 group hover:scale-[1.02]">
//                     <Send size={20} className="group-hover:translate-x-1 transition-transform" />
//                     <span>Submit Appointment Request</span>
//                   </button>
//                   <p className="text-center text-xs text-[#808080]">We'll confirm your appointment within 2 hours</p>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// // --- Reusable Small Components ---

// const QuickInfoCard = ({ icon, title, desc, sub }) => (
//   <div className="bg-[#1A2B47]/50 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl p-6 hover:border-[#D4AF37] transition-all group cursor-pointer">
//     <div className="flex items-start gap-4">
//       <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
//         {React.cloneElement(icon, { size: 28, className: "text-[#0A1628]" })}
//       </div>
//       <div className="flex-1">
//         <h3 className="text-[#D4AF37] font-bold mb-1">{title}</h3>
//         <p className="text-white text-sm leading-relaxed">{desc}</p>
//         <p className="text-gray-300 text-xs mt-1 uppercase tracking-wider opacity-100 ">{sub}</p>
//       </div>
//     </div>
//   </div>
// );

// const ServiceCard = ({ img, title, icon, desc }) => (
//   <div className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:border-[#D4AF37]/50 transition-all cursor-pointer">
//     <div className="relative h-64 overflow-hidden">
//       <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//       <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-transparent to-transparent"></div>
//       <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center text-white">
//         {React.cloneElement(icon, { size: 24 })}
//       </div>
//       <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white italic">{title}</h3>
//     </div>
//     <div className="p-6">
//       <p className="text-gray-800 text-sm mb-4 leading-relaxed">{desc}</p>
//       <button className="text-[#D4AF37] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
//         Learn More <ArrowRight size={16} />
//       </button>
//     </div>
//   </div>
// );

// const FeatureCard = ({ icon, title, stats }) => (
//   <div className="bg-[#1A2B47]/50 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl p-6 text-center hover:border-[#D4AF37] transition-all group">
//     <div className="inline-flex w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl mb-4 items-center justify-center group-hover:scale-110 transition-transform">
//       {React.cloneElement(icon, { size: 30, className: "text-[#0A1628]" })}
//     </div>
//     <div className="text-2xl font-bold text-[#D4AF37] mb-1 italic">{stats}</div>
//     <h4 className="text-white font-medium">{title}</h4>
//   </div>
// );

// const DoctorCard = ({ name, role, exp, edu }) => (
//   <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:border-[#D4AF37]/50 transition-all group">
//     <div className="h-80 bg-gray-100 relative overflow-hidden">
//       <img src="https://images.unsplash.com/photo-1758691463626-0ab959babe00?q=80" alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
//       <div className="absolute top-4 left-4 bg-[#D4AF37] text-[#0A1628] px-3 py-1 rounded-full text-xs font-bold shadow-lg">{exp} Exp</div>
//     </div>
//     <div className="p-6">
//       <h3 className="text-xl font-bold">{name}</h3>
//       <p className="text-[#D4AF37] text-sm font-bold mb-4 italic">{role}</p>
//       <div className="flex items-center gap-2 text-xs text-gray-400">
//          <GraduationCap size={14} /> {edu}
//       </div>
//     </div>
//   </div>
// );



// const InfrastructureFeature = ({ icon, title, stats, unit, desc }) => (
//   <div className="relative group h-full"> {/* h-full added to parent */}
//     {/* Blur Background Effect */}
//     <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
    
//     {/* Main Card Content */}
//     <div className="relative bg-[#1A2B47]/50 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 h-full flex flex-col"> {/* h-full and flex-col added */}
      
//       {/* Icon Container */}
//       <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 text-[#0A1628] shrink-0">
//         {icon}
//       </div>
      
//       {/* Stats Section */}
//       <div className="mb-4 shrink-0">
//         <div className="text-3xl text-[#D4AF37] font-bold mb-1 tracking-tight">{stats}</div>
//         <div className="text-[10px] text-[#C0C0C0] uppercase tracking-[0.2em] font-bold opacity-80">{unit}</div>
//       </div>
      
//       {/* Text Section */}
//       <div className="flex-grow"> {/* flex-grow added to push content equally */}
//         <h3 className="text-white font-bold text-lg mb-3 tracking-wide">{title}</h3>
//         <p className="text-[#C0C0C0] text-sm leading-relaxed opacity-90">{desc}</p>
//       </div>

//     </div>
//   </div>
// );

// const SuiteCard = ({ img, title, desc, tags }) => (
//   <div className="group relative overflow-hidden rounded-2xl h-96">
//     <div className="relative h-full overflow-hidden">
//       <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//       <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/60 to-transparent"></div>
//       <div className="absolute inset-0 border-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
//     </div>
//     <div className="absolute bottom-0 left-0 right-0 p-6">
//       <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
//       <p className="text-[#C0C0C0] text-sm mb-4 leading-relaxed">{desc}</p>
//       <div className="flex flex-wrap gap-2">
//         {tags.map(tag => (
//           <span key={tag} className="px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#D4AF37] text-[10px] backdrop-blur-sm font-bold">
//             {tag}
//           </span>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const Perk = ({ icon, label }) => (
//   <div className="flex items-center gap-3 group cursor-pointer">
//     <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-[#0A1628]">
//       {icon}
//     </div>
//     <span className="text-[#E8E8E8] group-hover:text-[#D4AF37] transition-colors duration-300 text-sm font-medium">{label}</span>
//   </div>
// );




// const TeamCard = ({ img, name, role, exp, spec, edu, highlight }) => (
//   <div className="group relative h-full"> {/* h-full added here */}
//     <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#D4AF37]/50 h-full flex flex-col"> {/* h-full and flex-col added */}
      
//       {/* Image Section */}
//       <div className="relative h-80 overflow-hidden bg-gradient-to-br from-[#E8E8E8] to-[#C0C0C0] shrink-0">
//         <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent"></div>
//         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
//           <Star size={14} className="fill-[#D4AF37] text-[#D4AF37]" />
//           <span className="text-sm text-[#0A1628] font-bold">4.9</span>
//         </div>
//         <div className="absolute top-4 left-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] px-3 py-1.5 rounded-full shadow-lg">
//           <span className="text-xs text-[#0A1628] font-bold">{exp}</span>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="p-6 flex flex-col flex-grow text-left"> {/* flex-grow added to fill space */}
//         <h3 className="text-[#0A1628] text-xl font-bold mb-1">{name}</h3>
//         <div className="text-[#D4AF37] font-semibold mb-4 text-sm uppercase tracking-wide">{role}</div>
        
//         <div className="space-y-3 mb-6 flex-grow"> {/* flex-grow ensures this area pushes the button down */}
//           <div className="flex items-start gap-3">
//             <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center text-[#D4AF37]">
//               <Award size={16} />
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="text-[10px] text-gray-500 uppercase font-bold">Specialization</div>
//               <div className="text-xs text-[#0A1628] font-medium leading-tight">{spec}</div>
//             </div>
//           </div>
//           <div className="flex items-start gap-3">
//             <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center text-[#D4AF37]">
//               <GraduationCap size={16} />
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="text-[10px] text-gray-500 uppercase font-bold">Education</div>
//               <div className="text-xs text-[#0A1628] font-medium leading-tight">{edu}</div>
//             </div>
//           </div>
//           <div className="mt-4 p-2 bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-l-2 border-[#D4AF37] rounded">
//             <p className="text-[11px] text-gray-700 font-medium italic leading-relaxed">{highlight}</p>
//           </div>
//         </div>

//         {/* Button - Always at the bottom */}
//         <button className="w-full mt-auto bg-gradient-to-r from-[#0A1628] to-[#1A2B47] text-white py-3 rounded-lg hover:from-[#D4AF37] hover:to-[#B8941F] hover:text-[#0A1628] transition-all duration-300 flex items-center justify-center gap-2 group/btn">
//           <Calendar size={16} />
//           <span className="text-sm font-bold">Book Appointment</span>
//         </button>
//       </div>
      
//       {/* Golden Hover Border */}
//       <div className="absolute inset-0 border-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none"></div>
//     </div>
//   </div>
// );



// const TestimonialCard = ({ text, service, date, name, location, initial }) => (
//   <div className="group relative">
//     <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
//     <div className="relative bg-[#1A2B47]/50 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 h-full flex flex-col">
//       <div className="absolute -top-3 -right-3 w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//         <Quote size={28} className="text-[#0A1628]" />
//       </div>
//       <div className="flex gap-1 mb-4">
//         {[...Array(5)].map((_, i) => (
//           <Star key={i} size={16} className="fill-[#D4AF37] text-[#D4AF37]" />
//         ))}
//       </div>
//       <p className="text-[#E8E8E8] mb-6 leading-relaxed flex-grow italic text-sm">"{text}"</p>
//       <div className="mb-4 pb-4 border-b border-[#D4AF37]/20 text-left">
//         <div className="flex items-center gap-2 mb-1">
//           <div className="text-sm text-[#D4AF37] font-bold">{service}</div>
//           <div className="flex items-center gap-1 bg-[#D4AF37]/20 px-2 py-0.5 rounded-full">
//             <ThumbsUp size={10} className="text-[#D4AF37]" />
//             <span className="text-[10px] text-[#D4AF37] font-bold uppercase">Verified</span>
//           </div>
//         </div>
//         <div className="text-[10px] text-[#C0C0C0] uppercase tracking-wider">{date}</div>
//       </div>
//       <div className="flex items-center gap-3 text-left">
//         <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center font-bold text-[#0A1628]">
//           {initial}
//         </div>
//         <div>
//           <div className="text-white font-bold">{name}</div>
//           <div className="text-xs text-[#C0C0C0]">{location}</div>
//         </div>
//       </div>
//     </div>
//   </div>
// );




// const ContactInfoCard = ({ icon, title, details }) => (
//   <div className="group flex gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#D4AF37]/50 hover:shadow-lg transition-all duration-300 text-left">
//     <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-[#0A1628]">
//       {icon}
//     </div>
//     <div>
//       <div className="text-[#0A1628] font-bold mb-1">{title}</div>
//       <div className="text-[#808080] text-sm leading-relaxed">{details}</div>
//     </div>
//   </div>
// );

// export default Home;






