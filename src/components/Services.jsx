import React from 'react';
import { 
  Sparkles, Shield, Stethoscope, Heart, Baby, 
  ArrowRight, Activity, Microscope, Zap, Award, CheckCircle2
} from 'lucide-react';

const Services = () => {
  const allServices = [
    {
      title: "Orthodontics & Braces",
      image: "/Images/Dental1.jfif", // Braces Image
      desc: "Specialized treatment using visible and invisible braces, and advanced clear aligner therapy to enhance facial aesthetics.",
      icon: <Shield />,
      tags: ["Invisalign", "Metal Braces", "Clear Aligners"],
      features: ["Visible & Invisible Braces", "Dentofacial Orthopaedics", "Facial Harmony Design"]
    },
    {
      title: "Micro-Endodontics",
      image: "/Images/modernclinec.jfif", // RCT/Microscope Image
      desc: "Painless root canal treatments using advanced magnification and precision techniques for long-term clinical success.",
      icon: <Microscope />,
      tags: ["Painless RCT", "Magnification", "Biomimetic"],
      features: ["Microscopic RCT", "Tooth Preservation", "Complex Endodontics"]
    },
    {
      title: "Prosthodontics",
      image: "/Images/Dental2.jfif", // Crowns/Bridges Image
      desc: "Precise and ethical restorative solutions specializing in crowns, bridges, and full mouth rehabilitation.",
      icon: <Activity />,
      tags: ["Crowns", "Bridges", "Rehabilitation"],
      features: ["Full Mouth Reconstruction", "Custom Bridges", "Functional Excellence"]
    },
    {
      title: "Dental Implants",
      image: "/Images/JenrailDensity.avif", // Implant Image
      desc: "Durable and predictable tooth replacements aligned with current evidence-based standards.",
      icon: <Heart />,
      tags: ["Implants", "Surgery", "Oral Health"],
      features: ["Single/Multi Implants", "Bone Grafting", "Predictable Outcomes"]
    },
    {
      title: "Pediatric Dentistry",
      image: "/Images/DentailSerzer.jfif", // Kids Dentistry Image
      desc: "Exclusive child dental care with advanced behavior management to ensure a stress-free experience for infants and toddlers.",
      icon: <Baby />,
      tags: ["Child Specialist", "Sedation", "Kids Care"],
      features: ["Fear-Free Dentistry", "Infant Oral Health", "Special Care Children"]
    },
    {
      title: "Cosmetic Dentistry",
      image: "/Images/comasticDensti.avif", // Whitening/Veneers Image
      desc: "Transform your smile with aesthetic excellence, including premium veneers and professional teeth whitening.",
      icon: <Sparkles />,
      tags: ["Veneers", "Whitening", "Smile Makeover"],
      features: ["Digital Smile Design", "Porcelain Veneers", "Aesthetic Precision"]
    }
  ];

  return (
    <main className="w-full bg-[#050B14] pt-32 pb-20 text-white overflow-hidden">
      
      {/* 1. HEADER SECTION */}
      <section className="relative mb-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6">
            <Award size={14} /> Premium Care • Delhi Dental Clinic
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Dental Services</h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Combining 16+ years of clinical expertise with world-class technology to deliver 
            painless and precise dental solutions in New Delhi.
          </p>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service, index) => (
            <ServiceDetailCard key={index} {...service} />
          ))}
        </div>
      </section>

      {/* 3. TECHNOLOGY & STANDARDS BANNER */}
      <section className="mt-32 max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1A2B47] rounded-[40px] p-10 md:p-16 border border-gray-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-3xl rounded-full group-hover:bg-[#D4AF37]/10 transition-all"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 italic text-[#D4AF37]">
                Why Our Clinical Standards?
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <StandardItem text="Evidence-Based Standards" />
                <StandardItem text="Microscopic Precision" />
                <StandardItem text="Painless Root Canal Tech" />
                <StandardItem text="Child Behavior Specialists" />
              </div>
            </div>
            <div className="shrink-0">
               <a href="/contact" className="px-10 py-5 bg-[#D4AF37] text-[#0A1628] rounded-2xl font-extrabold text-lg shadow-xl shadow-[#D4AF37]/10 hover:scale-105 transition-all inline-block">
                 Book Consultation
               </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// --- Sub Components ---

const ServiceDetailCard = ({ title, image, desc, icon, tags, features }) => (
  <div className="group bg-[#0A1628]/40 backdrop-blur-md border border-gray-800 rounded-[35px] overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-500 flex flex-col h-full">
    
    {/* Image Section */}
    <div className="relative h-52 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] to-transparent"></div>
      
      {/* Floating Icon */}
      <div className="absolute bottom-4 left-6 w-12 h-12 bg-[#1A2B47] rounded-xl flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30 shadow-xl group-hover:bg-[#D4AF37] group-hover:text-[#0A1628] transition-all duration-500">
        {React.cloneElement(icon, { size: 24 })}
      </div>
    </div>

    {/* Content Section */}
    <div className="p-8 flex flex-col flex-grow">
      <h3 className="text-2xl font-bold text-white mb-4 italic">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{desc}</p>

      <div className="space-y-3 mb-8">
        {features.map((feat, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-gray-300 font-medium">
            <CheckCircle2 size={14} className="text-[#D4AF37]" /> {feat}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-800">
        {tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-400 font-bold border border-white/5 uppercase">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const StandardItem = ({ text }) => (
  <div className="flex items-center gap-3 text-white/80 font-medium">
    <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
    {text}
  </div>
);

export default Services;