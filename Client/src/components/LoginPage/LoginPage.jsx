import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Helmet } from "react-helmet-async";
import { Stethoscope, Mail, Lock, ArrowRight, AlertCircle, Sparkles } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const success = await login(email, password);

    if (success) {
      // Agar login success hai aur email admin ki hai
      if (email === 'delhidentalclinicindia@gmail.com') {
        navigate('/ManagementDashboard');
      } else {
        // Agar login success hai par email admin ki nahi hai
        navigate('/');
      }
    }
  } catch (err) {
    // AGAR LOGIN FAIL HOTA HAI (401 Error)
    if (err.response && err.response.status === 401) {
      setError('Invalid Admin Credentials. Redirecting to home...');
      
      // 2 second baad home page par redirect kar dega
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setError('Login failed. Please check your connection.');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Helmet>
        <title>Admin Login | Delhi Dental Clinic</title>
      </Helmet>

      {/* Main Container - Navy Blue Theme */}
      <div className="min-h-screen bg-[#050B14] text-white flex items-center justify-center relative overflow-hidden font-sans selection:bg-[#D4AF37] selection:text-[#050B14]">
        
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px]" />
        </div>

        {/* Login Card */}
        <div className="relative pt-25 z-10 w-full max-w-lg px-4">
          <div className="bg-[#0A1628]/80 backdrop-blur-2xl border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative">
            
            {/* Top Premium Gold Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            {/* Header / Brand */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] shadow-lg mb-6">
                <Stethoscope className="w-10 h-10 text-[#0A1628]" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles size={12} /> Management Portal
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400 text-sm">Sign in to manage appointments & clinical data</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email */}
              <div className="space-y-2 text-left">
                <label className="text-xs uppercase font-bold tracking-widest text-gray-400 ml-2">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@delhidental.org"
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2 text-left">
                <label className="text-xs uppercase font-bold tracking-widest text-gray-400 ml-2">Secure Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 mt-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A1628] font-extrabold text-lg shadow-xl hover:shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  <>
                    Authorize Access <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Help Link */}
            <div className="mt-10 text-center pt-6 border-t border-white/5">
              <p className="text-gray-500 text-sm">
                Technical issues?{' '}
                <a href="mailto:delhidentalclinicindia@gmail.com" className="text-[#D4AF37] hover:underline font-bold transition-colors">
                  Contact IT Dept
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;