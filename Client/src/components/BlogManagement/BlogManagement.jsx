// 12-12-25
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Edit2, Trash2, Plus, ArrowLeft, AlertCircle, Calendar, X, ImageOff, Loader2 } from 'lucide-react';
import BlogEditor from '../../Blog/BlogEditor';

const API_BASE_URL = 'http://localhost:5000/api'; 

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editBlogData, setEditBlogData] = useState(null);

  const navigate = useNavigate();

  // --- Fetch Blogs ---
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/blogs`);
      setBlogs(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // --- Handlers ---
  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;
    try {
      await axios.delete(`${API_BASE_URL}/blogs/${blogToDelete._id}`);
      setBlogs(blogs.filter(b => b._id !== blogToDelete._id));
      setShowDeleteModal(false);
      setBlogToDelete(null);
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete blog.');
    }
  };

  const handleEditClick = (blog) => {
    setEditBlogData(blog);
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    setEditBlogData(null); // Null means create new
    setIsEditing(true);
  };

  const handleEditorSuccess = () => {
    setIsEditing(false);
    setEditBlogData(null);
    fetchBlogs(); // Refresh list
  };

  const handleEditorCancel = () => {
    setIsEditing(false);
    setEditBlogData(null);
  };

  // --- Render Loading ---
  if (loading && !isEditing) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-[#F68D22] animate-spin" />
      </div>
    );
  }

  // --- Render Editor (Create/Edit Mode) ---
  if (isEditing) {
    return (
      <BlogEditor 
        blog={editBlogData} 
        onSuccess={handleEditorSuccess} 
        onCancel={handleEditorCancel} // Pass cancel handler if your editor supports it
      />
    );
  }

  // --- Render Dashboard (List) ---
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 font-sans selection:bg-[#F68D22] selection:text-white">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">Blog Management</h1>
          <p className="text-slate-400 text-sm mt-1">Manage, edit, and delete your blog posts.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <button 
            onClick={handleCreateNew}
            className="px-6 py-2 bg-gradient-to-r from-[#F68D22] to-[#244C68] text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add New Post
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="max-w-7xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto">
        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-[#1e293b]/30 rounded-3xl border border-white/5">
            <p className="text-slate-400 text-lg">No blogs found. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog._id} className="group bg-[#1e293b]/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#F68D22]/30 transition-all duration-300 hover:-translate-y-1">
                
                {/* Image */}
                <div className="relative h-48 bg-[#0f172a] overflow-hidden">
                  {blog.bannerImage ? (
                    <img
                      src={`${API_BASE_URL}/blogs/image/${blog.bannerImage}`}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
                      <ImageOff className="w-8 h-8 mb-2" />
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-semibold text-[#F68D22] border border-[#F68D22]/30">
                    {blog.category || 'Blog'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <Calendar className="w-3 h-3" />
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-4 line-clamp-1 group-hover:text-[#F68D22] transition-colors">
                    {blog.title}
                  </h3>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-white/5">
                    <button 
                      onClick={() => handleEditClick(blog)}
                      className="flex-1 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(blog)}
                      className="flex-1 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#1e293b] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl transform transition-all scale-100">
            <h3 className="text-xl font-bold text-white mb-2">Confirm Delete</h3>
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete <span className="text-[#F68D22] font-semibold">"{blogToDelete?.title}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-white/5 text-slate-300 rounded-lg hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BlogManagement;







