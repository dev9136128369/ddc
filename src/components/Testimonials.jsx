import React from 'react';
import { 
  Star, Quote, ThumbsUp, MessageSquare, 
  Award, Heart, ShieldCheck, CheckCircle2 
} from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Anjali Mehta",
      location: "South Delhi",
      service: "Teeth Whitening & Veneers",
      date: "December 2025",
      text: "Exceptional service and results! The cosmetic dentistry work transformed my smile completely. The team is professional, caring, and the clinic environment is luxurious and comfortable.",
      initial: "A",
      rating: 5
    },
    {
      name: "Rahul Kapoor",
      location: "Connaught Place",
      service: "Root Canal Treatment",
      date: "November 2025",
      text: "I was nervous about my root canal, but Dr. Sonali made the entire process painless and stress-free. The advanced micro-endodontics technology and gentle approach made all the difference!",
      initial: "R",
      rating: 5
    },
    {
      name: "Sonia Gupta",
      location: "Vasant Vihar",
      service: "Pediatric Care",
      date: "October 2025",
      text: "Best pediatric care in Delhi! Dr. Ferah is wonderful with children. My daughter actually enjoys her dental visits now. Highly recommend for families seeking quality care.",
      initial: "S",
      rating: 5
    },
    {
      name: "Vikram Singh",
      location: "Greater Kailash",
      service: "Dental Implants",
      date: "January 2026",
      text: "Dr. Vinod's expertise in implants is unmatched. The procedure was precise, ethical, and the recovery was very smooth. The transparent communication helped me make the right decision.",
      initial: "V",
      rating: 5
    },
    {
      name: "Pooja Sharma",
      location: "New Delhi",
      service: "Invisalign / Braces",
      date: "September 2025",
      text: "Dr. Nitu Gautam is a true artist. My aligner treatment has been life-changing. Her focus on facial harmony and functional balance is what sets this clinic apart from others.",
      initial: "P",
      rating: 5
    },
    {
      name: "Amit Verma",
      location: "Noida",
      service: "Full Mouth Rehabilitation",
      date: "August 2025",
      text: "A truly world-class experience. From sterilization protocols to advanced surgical suites, everything is top-notch. DDC is definitely the premier dental excellence center in Delhi.",
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
            Real experiences from over 50,000+ happy patients who have trusted us with their smiles and oral health.
          </p>
        </div>
      </section>

      {/* 2. STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1A2B47] rounded-[40px] p-10 border border-gray-800 flex flex-wrap justify-center gap-12 md:gap-24">
          <StatItem label="Verified Reviews" val="2,500+" />
          <StatItem label="Average Rating" val="4.9 / 5.0" />
          <StatItem label="Patient Satisfaction" val="98%" />
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
              {/* Quote Icon */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Quote size={24} className="text-[#0A1628]" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 text-left">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-300 leading-relaxed mb-8 flex-grow text-left italic">
                "{rev.text}"
              </p>

              {/* Service Info */}
              <div className="mb-6 pt-6 border-t border-gray-800/50 flex items-center justify-between text-left">
                <div>
                  <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">{rev.service}</p>
                  <p className="text-gray-500 text-[10px] mt-1 uppercase font-bold">{rev.date}</p>
                </div>
                <div className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full">
                  <ShieldCheck size={12} className="text-green-500" />
                  <span className="text-[10px] text-green-500 font-bold uppercase">Verified</span>
                </div>
              </div>

              {/* Patient Info */}
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
             <h2 className="text-3xl md:text-4xl font-bold mb-4">Be Our Next Success Story</h2>
             <p className="font-bold opacity-80 mb-8 max-w-xl mx-auto uppercase tracking-widest text-sm">
               Join 50K+ happy patients and start your journey to a perfect smile today.
             </p>
             <a href="/contact" className="inline-block bg-[#0A1628] text-white px-10 py-5 rounded-2xl font-extrabold text-lg shadow-2xl hover:scale-105 transition-all">
               Book Your Visit Now
             </a>
          </div>
        </div>
      </section>
    </main>
  );
};

// --- Sub Components ---

const StatItem = ({ label, val }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-1">{val}</div>
    <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">{label}</div>
  </div>
);

export default Testimonials;