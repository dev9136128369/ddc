import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import {
  FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton,
  FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon
} from 'react-share';
import { Share2, Calendar, ArrowRight, Loader2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const BlogList = ({ category, pageTitle }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Fetch URL with category filter
        const url = category
            ? `${API_BASE_URL}/blogs?category=${category}`
            : `${API_BASE_URL}/blogs`;

        const response = await axios.get(url);

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid data format: Expected array');
        }

        const processedBlogs = response.data.map(blog => {
            const imageUrl = blog.bannerImage
              ? `${API_BASE_URL}/blogs/image/${blog.bannerImage}`
              : null;
            return {
                ...blog,
                bannerImage: imageUrl,
                createdAt: blog?.createdAt || new Date().toISOString()
            }
        });

        setBlogs(processedBlogs);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.message || 'Failed to load blogs');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch { return ''; }
  };

  const stripHtmlTags = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '');
  };

  const truncateContent = (content, length = 100) => {
    const plainText = stripHtmlTags(content);
    return plainText.length > length ? plainText.substring(0, length) + '...' : plainText;
  };

  const getBlogUrl = (blogId) => `${window.location.origin}/blog/${blogId}`;

  const handleShareClick = async (blogId) => {
    try {
      const url = getBlogUrl(blogId);
      if (navigator.share) {
        await navigator.share({ title: 'Check out this post', url: url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) { console.error('Sharing failed:', err); }
    setActiveDropdown(activeDropdown === blogId ? null : blogId);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#0f172a]">
        <Loader2 className="w-10 h-10 text-[#F68D22] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#0f172a] text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] font-sans selection:bg-[#F68D22] selection:text-white pb-20">
      <Helmet>
        <title>{pageTitle} - CipherShield</title>
        <meta name="description" content={`Latest updates from ${pageTitle}`} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
         {/* Background Pattern */}
         <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.5) 1px, transparent 0px)", backgroundSize: "40px 40px" }}>
         </div>
         <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#244C68]/20 rounded-full blur-[120px] animate-pulse" />

         <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-[#F68D22]/10 border border-[#F68D22]/20 text-[#F68D22] font-semibold text-sm mb-6">
              Latest Updates
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-display">
              {pageTitle}
            </h1>
         </div>
      </section>

      {/* Blog Grid */}
      <div className="container mx-auto px-4">
        {blogs.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
                <h3 className="text-2xl font-bold">No posts found</h3>
                <p>Check back later for updates in {pageTitle}.</p>
            </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
                <div key={blog._id} className="group bg-[#1e293b]/50 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-[#F68D22]/30 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
                
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-[#0f172a]">
                    {blog.bannerImage ? (
                    <img
                        src={blog.bannerImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { e.target.style.display='none'; }}
                    />
                    ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900">
                        <span>No Image</span>
                    </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-sm text-[#F68D22] mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(blog.createdAt)}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#F68D22] transition-colors">
                        {blog.title}
                    </h3>

                    <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow">
                        {truncateContent(blog.content)}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                        <Link
                            to={`/blog/${blog._id}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#F68D22] transition-colors"
                        >
                            Read More <ArrowRight className="w-4 h-4" />
                        </Link>

                        <div className="relative">
                            <button
                                onClick={() => handleShareClick(blog._id)}
                                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>

                            {/* Share Dropdown */}
                            {activeDropdown === blog._id && (
                                <div className="absolute bottom-full right-0 mb-2 p-2 bg-[#1e293b] border border-white/10 rounded-xl shadow-xl flex gap-2 z-20 min-w-[180px]">
                                    <FacebookShareButton url={getBlogUrl(blog._id)}><FacebookIcon size={32} round /></FacebookShareButton>
                                    <TwitterShareButton url={getBlogUrl(blog._id)}><TwitterIcon size={32} round /></TwitterShareButton>
                                    <WhatsappShareButton url={getBlogUrl(blog._id)}><WhatsappIcon size={32} round /></WhatsappShareButton>
                                    <LinkedinShareButton url={getBlogUrl(blog._id)}><LinkedinIcon size={32} round /></LinkedinShareButton>
                                </div>
                            )}
                            {copied && activeDropdown === blog._id && (
                                <span className="absolute -top-8 right-0 text-xs bg-[#F68D22] text-white px-2 py-1 rounded">Copied!</span>
                            )}
                        </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;