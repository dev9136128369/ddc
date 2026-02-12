// 12-12-25
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const API_BASE_URL = 'http://localhost:5000/api';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id || id.length !== 24) throw new Error('Invalid blog ID format');

        const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
        if (!response.data) throw new Error('Blog not found');
        
        setBlog(response.data);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err.response?.data?.error || err.message || 'Failed to load blog.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-[#F68D22] animate-spin" />
      </div>
    );
  }

  // --- Error State ---
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 text-white">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-center max-w-md w-full">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-300 mb-2">Oops! Something went wrong</h2>
          <p className="text-slate-300 mb-6">{error || 'The requested blog was not found.'}</p>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  // --- Construct Image URL ---
  const bannerUrl = blog.bannerImage 
    ? `${API_BASE_URL}/blogs/image/${blog.bannerImage}` 
    : null;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-[#F68D22] selection:text-white">
      <Helmet>
        <title>{blog.title} - CipherShield</title>
        <meta name="description" content={blog.title} />
      </Helmet>

      {/* --- Header / Navigation --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 py-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#F68D22] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Blogs
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-20 container mx-auto px-4 max-w-7xl"> {/* Full Width Container */}
        
        {/* --- Blog Header --- */}
        <header className="mb-10 pt-8 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#244C68]/20 text-[#ffffff] text-sm font-medium mb-4 border border-[#244C68]/30">
            {blog.category || 'Blog'}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </header>

        {/* --- Banner Image (Full Width) --- */}
        {bannerUrl && (
          <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video md:aspect-[21/9]">
            <img
              src={bannerUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        )}

        {/* --- Blog Content Area --- */}
        <article className="max-w-5xl mx-auto">
          <div 
            className="prose prose-lg prose-invert max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:text-white
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-[#F68D22] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-ul:text-slate-300 prose-ol:text-slate-300
              prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-white/10
              prose-blockquote:border-l-[#F68D22] prose-blockquote:bg-[#1e293b]/50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl"
            dangerouslySetInnerHTML={{ 
              __html: blog.content.replace(
                /src="(?:http:\/\/localhost:\d+)?(?:\/uploads|\/api\/blogs\/image)\/([a-zA-Z0-9.\-_]+)"/g,
                `src="${API_BASE_URL}/blogs/image/$1?t=${new Date(blog.updatedAt).getTime()}"`
              )
            }}
          />
        </article>

      </main>
    </div>
  );
};

export default BlogDetail;











