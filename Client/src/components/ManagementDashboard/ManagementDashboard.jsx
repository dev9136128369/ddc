// 12-12-25
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutDashboard, PlusSquare, ArrowLeft, Package, Edit, Settings, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


import BlogManagement from "../BlogManagement/BlogManagement";
import BlogEditor from '../../Blog/BlogEditor';
import AppointmentList from './AppointmentList';


const ManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('manageBlogs');
  const navigate = useNavigate();

  // Tab rendering logic
  const renderContent = () => {
  switch (activeTab) {
    case 'manageBlogs':
      return <BlogManagement />;
    case 'addBlog':
      return <BlogEditor onSuccess={() => setActiveTab('manageBlogs')} />;
    case 'appointments': 
      return <AppointmentList />; 
    default:
      return <BlogManagement />;
  }
};

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-[#F68D22] selection:text-white pb-20">
      <Helmet>
        <title>CipherShield | Admin Dashboard</title>
        <meta name="description" content="Manage blogs and products for CipherShield." />
      </Helmet>

      {/* --- Top Navbar Area --- */}
      <div className="bg-[#1e293b]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F68D22] to-[#244C68] flex items-center justify-center shadow-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold font-display tracking-wide">Admin Dashboard</h1>
          </div>
          
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Exit Dashboard
          </button>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* --- Custom Tabs Navigation --- */}
        <div className="flex flex-wrap gap-4 pt-10 mb-8 border-b border-white/10 pb-1">
          
          {/* Tab 1: Manage Blogs */}
          <button
            onClick={() => setActiveTab('manageBlogs')}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-xl text-sm font-semibold transition-all relative top-[1px] 
              ${activeTab === 'manageBlogs' 
                ? 'bg-[#1e293b] text-[#F68D22] border-t border-x border-white/10 border-b-transparent' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Manage Blogs
          </button>

          {/* Tab 2: Add Blog */}
          <button
            onClick={() => setActiveTab('addBlog')}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-xl text-sm font-semibold transition-all relative top-[1px] 
              ${activeTab === 'addBlog' 
                ? 'bg-[#1e293b] text-[#F68D22] border-t border-x border-white/10 border-b-transparent' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
          >
            <PlusSquare className="w-4 h-4" />
            Add Blog
          </button>

          {/* Tab 3: Appointments */}
<button
  onClick={() => setActiveTab('appointments')}
  className={`flex items-center gap-2 px-6 py-3 rounded-t-xl text-sm font-semibold transition-all relative top-[1px] 
    ${activeTab === 'appointments' 
      ? 'bg-[#1e293b] text-[#F68D22] border-t border-x border-white/10 border-b-transparent' 
      : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
>
  <Calendar className="w-4 h-4" />
  Appointments
</button>

          {/* Product Tabs (Commented Out - Visual Example) */}
          {/* <button onClick={() => setActiveTab('addProduct')} className="...">
             <Package className="w-4 h-4" /> Add Product
          </button> 
          */}

        </div>

        {/* --- Tab Content Wrapper --- */}
        <div className="bg-[#1e293b] border border-white/10 rounded-b-xl rounded-tr-xl p-6 min-h-[500px] shadow-2xl relative overflow-hidden">
          {/* Background Glow inside content area */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#244C68]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            {renderContent()}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManagementDashboard;









