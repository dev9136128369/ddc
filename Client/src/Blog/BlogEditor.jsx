// 12-12-25
import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Save, Upload, X, Loader2, Image as ImageIcon, Trash2 } from 'lucide-react';

const BlogEditor = ({ blog: existingBlog, onSuccess, onCancel }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const activeId = id || existingBlog?._id;
  const isEditMode = !!activeId;

  // const API_BASE_URL = 'http://localhost:5000/api';
  const API_BASE_URL = 'https://ddc-backend-ufaf.onrender.com/api';


  // --- State ---
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('BlogCard'); 
  const [isPublished, setIsPublished] = useState(false);
  
  const [bannerImageFile, setBannerImageFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');

  const bannerFileInputRef = useRef(null);
  const contentQuillRef = useRef(null);

  // --- Image Handler ---
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
      
      const formData = new FormData();
      formData.append('image', file);

      try {
        setUploadingImage(true);
        const res = await axios.post(`${API_BASE_URL}/blogs/upload`, formData);
        const url = `${API_BASE_URL}/blogs/image/${res.data.filename}`;
        
        const quill = contentQuillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', url);
        // Insert hone ke baad cursor ko next line par bhejo
        quill.setSelection(range.index + 1);
      } catch (err) {
        console.error(err);
        setError('Failed to upload image.');
      } finally {
        setUploadingImage(false);
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }], // Alignment Controls
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'], 
        ['clean']
      ],
      handlers: { image: imageHandler }
    }
  };

  // --- Load Data ---
  useEffect(() => {
    const loadData = async () => {
      if (activeId) {
        try {
          setLoading(true);
          const res = await axios.get(`${API_BASE_URL}/blogs/${activeId}`);
          const data = res.data;

          setTitle(data.title || '');
          setCategory(data.category || 'BlogCard');
          setIsPublished(data.published || false);
          
          let updatedContent = data.content || '';
          updatedContent = updatedContent.replace(
              /src="(?:http:\/\/localhost:\d+)?(?:\/uploads|\/api\/blogs\/image)\/([a-zA-Z0-9.\-_]+)"/g,
              (match, filename) => `src="${API_BASE_URL}/blogs/image/${filename}"`
          );
          setContent(updatedContent);

          if (data.bannerImage) {
            setBannerPreview(`${API_BASE_URL}/blogs/image/${data.bannerImage}`);
          }
        } catch (err) {
          console.error(err);
          setError('Failed to load blog data.');
        } finally {
          setLoading(false);
        }
      }
    };
    loadData();
  }, [activeId]);

  // --- Handlers ---
  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImageFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const removeBannerPreview = () => {
    setBannerImageFile(null);
    setBannerPreview('');
    if (bannerFileInputRef.current) bannerFileInputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category); 
      formData.append('published', isPublished);

      if (bannerImageFile) {
        formData.append('bannerImage', bannerImageFile);
      }

      const url = isEditMode 
        ? `${API_BASE_URL}/blogs/${activeId}`
        : `${API_BASE_URL}/blogs`;
      
      const method = isEditMode ? 'put' : 'post';

      const res = await axios({
        method,
        url,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (onSuccess) onSuccess(res.data);
      else navigate(`/blog/${res.data._id}`);

    } catch (err) {
      console.error(err);
      setError('Failed to save blog.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    if (onCancel) onCancel();
    else navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 font-sans selection:bg-[#F68D22] selection:text-white">
      
      {/* ✅ CSS FIXED FOR ALIGNMENT */}
      <style>{`
        /* Toolbar Style */
        .ql-toolbar.ql-snow {
          border-color: rgba(255, 255, 255, 0.1) !important;
          background-color: #1e293b;
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          text-align: left; /* Ensure Toolbar is Left Aligned */
        }
        
        /* Editor Container */
        .ql-container.ql-snow {
          border-color: rgba(255, 255, 255, 0.1) !important;
          background-color: white;
          color: black;
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          font-size: 16px;
          min-height: 300px;
        }

        /* ✅ Force Content to Start from Left */
        .ql-editor {
          text-align: left; 
        }
        .ql-editor p {
          text-align: left;
        }

        /* ✅ Image Alignment Logic */
        .ql-editor img {
          display: inline-block; /* Fix for Tailwind block override */
          max-width: 100%;
        }
        
        /* Quill Alignment Classes */
        .ql-editor .ql-align-center {
          text-align: center !important;
        }
        .ql-editor .ql-align-right {
          text-align: right !important;
        }
        .ql-editor .ql-align-justify {
          text-align: justify !important;
        }

        /* Icon Colors */
        .ql-stroke { stroke: #94a3b8 !important; }
        .ql-fill { fill: #94a3b8 !important; }
        .ql-picker { color: #94a3b8 !important; }
        .ql-picker-options { background-color: #1e293b !important; border: 1px solid #334155 !important; }
      `}</style>

      <div className="max-w-5xl mx-auto bg-[#1e293b]/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-left">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F68D22] to-[#244C68]" />

        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <h1 className="text-3xl font-bold font-display text-white text-left">
            {isEditMode ? 'Edit Blog Post' : 'Create New Post'}
          </h1>
          <button onClick={handleCancelClick} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl flex items-center gap-2">
            <X className="w-5 h-5" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-300 block text-left">Blog Title <span className="text-red-400">*</span></label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                className="w-full h-12 px-4 rounded-xl bg-[#0f172a] border border-white/10 text-white focus:border-[#F68D22] focus:outline-none transition-colors text-left"
                required 
                maxLength={150}
                disabled={loading}
              />
            </div>
            
            {/* <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block text-left">Category <span className="text-red-400">*</span></label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-[#0f172a] border border-white/10 text-white focus:border-[#F68D22] focus:outline-none appearance-none cursor-pointer text-left"
                disabled={loading}
              >
                <option value="BlogCard">Insights (BlogCard)</option>
                <option value="ProductList">Case Studies (ProductList)</option>
                <option value="Reviews">Reviews (Reviews)</option>
              </select>
            </div> */}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 block text-left">Banner Image</label>
            <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 text-center hover:border-[#F68D22]/50 transition-colors bg-[#0f172a]/30 group relative">
              {bannerPreview ? (
                <div className="relative inline-block">
                  <img src={bannerPreview} alt="Banner" className="max-h-64 rounded-lg shadow-lg object-cover" />
                  <button type="button" onClick={removeBannerPreview} className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition shadow-md">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div onClick={() => bannerFileInputRef.current.click()} className="cursor-pointer flex flex-col items-center justify-center h-32">
                  <Upload className="w-8 h-8 text-slate-500 mb-2 group-hover:text-[#F68D22] transition-colors" />
                  <p className="text-slate-400 text-sm font-medium">Click to upload banner</p>
                  <p className="text-xs text-slate-600 mt-1">Recommended: 1200x630px (Max 5MB)</p>
                </div>
              )}
              <input type="file" ref={bannerFileInputRef} onChange={handleBannerUpload} className="hidden" accept="image/*" />
            </div>
          </div>

          {/* Editor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 block text-left">Content <span className="text-red-400">*</span></label>
            {/* ✅ Added 'text-left' here specifically for the editor wrapper */}
            <div className="rounded-xl overflow-hidden shadow-inner relative text-left">
              {uploadingImage && (
                <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              )}
              <ReactQuill 
                ref={contentQuillRef} 
                theme="snow" 
                value={content} 
                onChange={setContent} 
                modules={modules} 
                placeholder="Start writing..." 
                className="h-80"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <label className="flex items-center gap-3 p-3 bg-[#F68D22]/10 border border-[#F68D22]/20 rounded-xl cursor-pointer hover:bg-[#F68D22]/20 transition-colors w-full sm:w-auto">
              <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="w-5 h-5 accent-[#F68D22] rounded focus:ring-0" />
              <span className="text-sm font-medium text-[#F68D22]">Publish Immediately</span>
            </label>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button type="button" onClick={handleCancelClick} disabled={loading} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-medium hover:bg-white/10 hover:text-white transition-all w-1/2 sm:w-auto text-center">Cancel</button>
              <button type="submit" disabled={loading} className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#F68D22] to-[#244C68] text-white font-bold shadow-lg hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2 w-1/2 sm:w-auto">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {isEditMode ? 'Update Post' : 'Save Post'}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BlogEditor;






// 28-10-25
// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { Alert, Button, Spinner } from 'react-bootstrap';
// import { FiXCircle } from 'react-icons/fi'; 

// const BlogEditor = ({ blog: existingBlog, onSuccess }) => { 
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [bannerImageFile, setBannerImageFile] = useState(null);
//     const [bannerPreview, setBannerPreview] = useState('');
//     const [contentImageFiles, setContentImageFiles] = useState([]); 
//     const [contentImagePreviews, setContentImagePreviews] = useState([]); 
//     const [currentDbContentImages, setCurrentDbContentImages] = useState([]); 
//     const [isPublished, setIsPublished] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [uploadingImage, setUploadingImage] = useState(false);
//     const [error, setError] = useState('');

//     const bannerFileInputRef = useRef(null);
//     const contentFileInputRef = useRef(null); 
//     const titleInputRef = useRef(null);
//     const contentQuillRef = useRef(null);
//     const navigate = useNavigate();
//     const { id } = useParams(); 

//     const isEditMode = !!id; 

//     const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'https://ciphershieldwebserver.onrender.com/api';

//     const contentFormats = [
//         'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
//         'list', 'bullet', 'indent', 'link', 'image', 'video',
//         'color', 'background', 'font', 'align'
//     ];

//     const imageHandler = useCallback(() => {
//         // ... (This function remains largely the same as before for Quill uploads) ...
//         const quill = contentQuillRef.current?.getEditor();
//         if (!quill) {
//             console.error("Quill editor instance not found WHEN BUTTON CLICKED.");
//             setError("Editor not available. Please try again shortly.");
//             return;
//         }

//         const currentRange = quill.getSelection();
//         const insertionIndex = currentRange ? currentRange.index : quill.getLength();

//         const input = document.createElement('input');
//         input.setAttribute('type', 'file');
//         input.setAttribute('accept', 'image/*');
//         input.click();

//         input.onchange = async () => {
//             const file = input.files[0];
//             if (!file) return;

//             if (!file.type.startsWith('image/')) { setError('Only images allowed'); return; }
//             if (file.size > 5 * 1024 * 1024) { setError('Image too large (Max 5MB)'); return; }

//             const formData = new FormData();
//             formData.append('image', file);

//             const editorInstance = contentQuillRef.current?.getEditor();
//             if (!editorInstance) {
//                 console.error("Editor instance lost before upload processing.");
//                 setError("Editor became unavailable during upload setup.");
//                 return;
//             }

//             try {
//                 setUploadingImage(true);
//                 setError('');

//                 const response = await axios.post(`${API_BASE_URL}/blogs/upload`, formData, {
//                     headers: { 'Content-Type': 'multipart/form-data' },
//                 });

//                 if (!response.data?.filename) {
//                     throw new Error('Invalid response from server (filename missing).');
//                 }

//                 const imageUrl = `${API_BASE_URL}/blogs/image/${response.data.filename}`;
//                 console.log("Constructed Image URL for Quill:", imageUrl);

//                 editorInstance.insertEmbed(insertionIndex, 'image', imageUrl);
//                 console.log("Quill HTML after insertEmbed:", editorInstance.root.innerHTML);

//                 setTimeout(() => {
//                     const currentEditor = contentQuillRef.current?.getEditor();
//                     if(currentEditor){
//                         currentEditor.updateContents();
//                         try {
//                             currentEditor.setSelection(insertionIndex + 1);
//                         } catch(e) { console.warn("Could not set selection in timeout:", e.message); }
//                     } else {
//                         console.warn("Editor not found in update timeout");
//                     }
//                 }, 100);

//             } catch (error) {
//                 console.error('Quill Image upload failed:', error);
//                 setError(error.response?.data?.message || error.message || 'Failed to upload image.');
//             } finally {
//                 setUploadingImage(false);
//             }
//         };
//     }, [API_BASE_URL]);

//     const contentModules = {
//         toolbar: {
//             container: [
//                 [{ 'header': [1, 2, 3, false] }],
//                 ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//                 [{ 'color': [] }, { 'background': [] }], [{ 'font': [] }], [{ 'align': [] }],
//                 [{ 'list': 'ordered'}, { 'list': 'bullet' }], [{ 'indent': '-1'}, { 'indent': '+1' }],
//                 ['link', 'image', 'video'], ['clean']
//             ],
//             handlers: { 'image': imageHandler }
//         },
//         clipboard: { matchVisual: false }
//     };

//     // --- Load existing blog data if 'id' is present ---
//     useEffect(() => {
//         const currentBlogId = id || (existingBlog && existingBlog._id); 
//         if (currentBlogId) {
//             console.log("Editing mode - Fetching blog with ID:", currentBlogId);
//             const fetchBlog = async () => {
//                 try {
//                     setLoading(true); setError('');
//                     const response = await axios.get(`${API_BASE_URL}/blogs/${currentBlogId}`);
//                     const blog = response.data;
//                     if (!blog) throw new Error('Blog data not found.');

//                     console.log("Fetched blog data:", blog);

//                     setTitle(blog.title || '');
//                     let updatedContent = blog.content || '';
//                     updatedContent = updatedContent.replace(
//                         /src="(?:http:\/\/localhost:\d+)?(?:\/uploads|\/api\/blogs\/image)\/([a-zA-Z0-9.\-_]+)"/g,
//                         (match, filename) => `src="${API_BASE_URL}/blogs/image/${filename}"`
//                     );
//                     setContent(updatedContent);
//                     setIsPublished(blog.published || false);

//                     // Set Banner Preview
//                     if (blog.bannerImage) {
//                         setBannerPreview(`${API_BASE_URL}/blogs/image/${blog.bannerImage}`);
//                     } else {
//                         setBannerPreview('');
//                     }
//                     //  NAYA: Content Images previews from DB
//                     if (blog.contentImageFilenames && blog.contentImageFilenames.length > 0) {
//                         const dbPreviews = blog.contentImageFilenames.map(filename => ({
//                             id: filename, 
//                             url: `${API_BASE_URL}/blogs/image/${filename}`,
//                             isNew: false 
//                         }));
//                         setContentImagePreviews(dbPreviews);
//                         setCurrentDbContentImages(blog.contentImageFilenames); 
//                     } else {
//                         setContentImagePreviews([]);
//                         setCurrentDbContentImages([]);
//                     }

//                 } catch (err) {
//                     console.error('Failed to load blog:', err);
//                     setError('Failed to load blog. Please verify the URL or try again.');
//                 } finally { setLoading(false); }
//             };
//             fetchBlog();
//         } else {
//             // Reset fields for "Create New" mode
//             setTitle(''); setContent(''); setBannerImageFile(null); setBannerPreview('');
//             setContentImageFiles([]); setContentImagePreviews([]); setCurrentDbContentImages([]);
//             setIsPublished(false); setError('');
//             console.log("Create New mode - Form reset.");
//         }
//         return () => { console.log("BlogEditor unmounting or ID changed."); };
//     }, [id, API_BASE_URL, existingBlog]); 


//     // --- Handle Banner Image Selection ---
//     const handleBannerUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             if (!file.type.startsWith('image/')) { setError('Banner must be an image file'); return; }
//             if (file.size > 5 * 1024 * 1024) { setError('Banner image must be smaller than 5MB'); return; }
//             setBannerImageFile(file);
//             const reader = new FileReader();
//             reader.onloadend = () => setBannerPreview(reader.result);
//             reader.onerror = () => { setError('Failed to read banner image.'); setBannerPreview(''); }
//             reader.readAsDataURL(file);
//         } else {
//             setBannerImageFile(null);
//         }
//     };

//     const removeBannerPreview = () => {
//         setBannerImageFile(null);
//          setBannerPreview('');
//         if (bannerFileInputRef.current) bannerFileInputRef.current.value = null;
//     };

//     //  NAYA: Handle Multiple Content Image Selection
//     const handleContentImagesUpload = (e) => {
//         const files = Array.from(e.target.files);
//         const newFiles = [];
//         const newPreviews = [...contentImagePreviews]; 

//         files.forEach(file => {
//             if (!file.type.startsWith('image/')) { setError(`File ${file.name}: Only images allowed.`); return; }
//             if (file.size > 5 * 1024 * 1024) { setError(`File ${file.name}: Max 5MB allowed.`); return; }

//             newFiles.push(file);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 newPreviews.push({ id: URL.createObjectURL(file), url: reader.result, isNew: true });
//                 setContentImagePreviews([...newPreviews]); // Update state to trigger re-render
//             };
//             reader.onerror = () => setError(`Failed to read file ${file.name}.`);
//             reader.readAsDataURL(file);
//         });

//         setContentImageFiles(prevFiles => [...prevFiles, ...newFiles]); // Add to existing selected files
//         // Clear file input value to allow selecting same file again
//         if (contentFileInputRef.current) contentFileInputRef.current.value = null;
//     };

//     //  NAYA: Remove a content image preview/file
//     const removeContentImage = (idToRemove, isNew) => {
//         if (isNew) { // If it's a newly selected file (not from DB)
//             setContentImageFiles(prevFiles => prevFiles.filter(file => URL.createObjectURL(file) !== idToRemove));
//         } else { // If it's an existing DB image (we'll handle deletion on submit by not including its filename)
//             setCurrentDbContentImages(prevDbFiles => prevDbFiles.filter(filename => filename !== idToRemove));
//         }
//         setContentImagePreviews(prevPreviews => prevPreviews.filter(preview => preview.id !== idToRemove));
//     };


//     // --- Handle Form Submission ---
//     const handleSubmit = async (publish = false) => {
//         setLoading(true);
//         setError('');

//         try {
//             const plainTitle = title.trim();
//             if (!plainTitle) throw new Error('Title is required.');
//             const editor = contentQuillRef.current?.getEditor();
//             const textContent = editor ? editor.getText().trim() : content.trim();
//             if (!textContent && content.trim() === '<p><br></p>') throw new Error('Content cannot be empty.');


//             const formData = new FormData();
//             formData.append('title', plainTitle);
//             formData.append('content', content);
//             formData.append('published', publish || isPublished);

//             // Add banner image if a new one is selected
//             if (bannerImageFile instanceof File) {
//                 formData.append('bannerImage', bannerImageFile);
//             }
            

//             //  NAYA: Append newly selected content image files
//             contentImageFiles.forEach((file) => {
//                 formData.append('contentImages', file);
//             });

//             //  NAYA: Handle existing DB content images
           
//             if (contentImageFiles.length === 0 && currentDbContentImages.length === 0 && contentImagePreviews.length === 0 && isEditMode) {
               
//                 const originalBlogImages = existingBlog?.contentImageFilenames || [];
//                 if (originalBlogImages.length > 0) {
//                    formData.append('clearContentImages', 'true');
//                    console.log("Sending 'clearContentImages' flag as no new content images and all old ones removed.");
//                 }
//             }


//             const method = isEditMode ? 'put' : 'post';
//             const url = isEditMode ? `${API_BASE_URL}/blogs/${id || existingBlog._id}` : `${API_BASE_URL}/blogs`;

//             console.log(`Submitting ${method.toUpperCase()} to ${url}`);
//             for (let [key, value] of formData.entries()) {
//                 console.log(` - ${key}:`, (value instanceof File ? value.name : value));
//             }

//             const response = await axios({ method, url, data: formData, headers: { 'Content-Type': 'multipart/form-data' } });

//             if (!response.data?._id) throw new Error('Invalid server response after save/update.');
//             console.log("Blog operation successful:", response.data._id);

//             // onSuccess callback if component is used within another (like BlogManagement)
//             if (onSuccess) {
//                 onSuccess(response.data);
//             } else {
//                 navigate(`/blog/${response.data._id}`);
//             }

//         } catch (err) {
//             console.error('Save/Update error:', err);
//             let detailedError = 'Failed to save blog. Please try again.';
//             if (err.response?.data?.error) { detailedError = err.response.data.error; }
//             else if (err.response?.data?.message) { detailedError = err.response.data.message; }
//             else if (err.message) { detailedError = err.message; }
//             setError(detailedError);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCancel = () => {
//         if (onSuccess) { // If used in a modal/component, call onCancel from props
//             onSuccess(null); // Or provide a specific cancel handler
//         } else {
//             navigate(isEditMode ? `/blog/${id}` : '/BlogManagement');
//         }
//     };

//     const generalLoading = loading && !uploadingImage;

//     return (
//         <div className="blog-editor">
//             <h1>{isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
//             {error && <div className="error-message"><Alert variant="danger">{error}</Alert></div>}

//             <form onSubmit={(e) => { e.preventDefault(); handleSubmit(isPublished); }}>
//                 {/* Banner Section */}
//                 <div className="form-section banner-section">
//                     <h2>Banner Image (Optional)</h2>
//                     <input type="file" ref={bannerFileInputRef} onChange={handleBannerUpload} accept="image/*" style={{ display: 'none' }} id="banner-upload-input"/>
//                     <Button type="button" onClick={() => bannerFileInputRef.current?.click()} className="upload-btn me-2" disabled={loading}>
//                         {bannerPreview ? 'Change Banner' : 'Upload Banner'}
//                     </Button>
//                     {bannerPreview && (
//                         <div className="banner-preview d-inline-block position-relative">
//                             <img src={bannerPreview} alt="Banner Preview" style={{ maxWidth: '200px', maxHeight: '100px', border: '1px solid #ccc' }} />
//                             <Button variant="danger" size="sm" onClick={removeBannerPreview} className="remove-banner-btn position-absolute top-0 end-0" title="Remove/Revert Banner">&times;</Button>
//                         </div>
//                     )}
//                     <div><small className="text-muted">Recommended: 1200x630. Max 5MB.</small></div>
//                 </div>

//                 {/*  NAYA: Content Images Section (from form) */}
//                 {/* <div className="form-section content-images-form-section">
//                     <h2>Additional Content Images (Optional, from form)</h2>
//                     <input type="file" ref={contentFileInputRef} onChange={handleContentImagesUpload} accept="image/*" multiple style={{ display: 'none' }} id="content-images-upload-input"/>
//                     <Button type="button" onClick={() => contentFileInputRef.current?.click()} className="upload-btn me-2" disabled={loading}>
//                         Add Content Images
//                     </Button>
//                     <div className="content-images-preview-grid mt-2">
//                         {contentImagePreviews.map(preview => (
//                             <div key={preview.id} className="image-preview-item position-relative d-inline-block m-1">
//                                 <img src={preview.url} alt="Content Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid #ddd' }} />
//                                 <Button
//                                     variant="danger" size="sm"
//                                     onClick={() => removeContentImage(preview.id, preview.isNew)}
//                                     className="remove-image-btn position-absolute top-0 end-0"
//                                     title="Remove Image"
//                                 >
//                                     <FiXCircle />
//                                 </Button>
//                             </div>
//                         ))}
//                     </div>
//                     <div><small className="text-muted">You can select multiple images. Max 10 images, 5MB each.</small></div>
//                 </div> */}

//                 {/* Title Section */}
//                 <div className="form-section title-section">
//                     <label htmlFor="blog-title" className="form-label">Title <span style={{color: 'red'}}>*</span></label>
//                     <input
//                         ref={titleInputRef}
//                         type="text"
//                         id="blog-title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         placeholder="Enter blog title..."
//                         required
//                         className="title-input form-control"
//                         maxLength={150}
//                         disabled={loading}
//                     />
//                 </div>

//                 {/* Content Section (Quill Editor) */}
//                 <div className="form-section content-section">
//                     <label className="form-label">Content <span style={{color: 'red'}}>*</span></label>
//                     {uploadingImage && <Spinner animation="border" size="sm" />}
//                     <ReactQuill
//                         ref={contentQuillRef}
//                         value={content}
//                         onChange={setContent}
//                         modules={contentModules}
//                         formats={contentFormats}
//                         placeholder="Write your blog content here... Add images using the toolbar icon."
//                         className="content-editor"
//                         readOnly={loading}
//                         theme="snow"
//                     />
//                 </div>

//                 {/* Publish Section */}
//                 <div className="form-section publish-section form-check">
//                     <input
//                         type="checkbox"
//                         className="form-check-input"
//                         id="publishCheck"
//                         checked={isPublished}
//                         onChange={(e) => setIsPublished(e.target.checked)}
//                         disabled={loading}
//                     />
//                     <label className="form-check-label" htmlFor="publishCheck">
//                         Publish this blog post immediately
//                     </label>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="action-buttons mt-3">
//                     <Button type="submit" className="save-btn me-2" variant="primary" disabled={loading}>
//                         {generalLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : ''}
//                         {generalLoading ? (isEditMode ? ' Updating...' : ' Saving...') : (isEditMode ? 'Update Blog' : 'Save Blog')}
//                     </Button>

//                     {!isPublished && (
//                         <Button
//                             type="button"
//                             onClick={() => handleSubmit(true)}
//                             className="publish-btn me-2"
//                             variant="success"
//                             disabled={loading}
//                         >
//                             {generalLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : ''}
//                             {generalLoading ? ' Publishing...' : (isEditMode ? 'Update & Publish' : 'Save & Publish')}
//                         </Button>
//                     )}

//                     <Button type="button" variant="secondary" onClick={handleCancel} className="cancel-btn" disabled={loading}>
//                         Cancel
//                     </Button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default BlogEditor;





// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const BlogEditor = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [bannerImage, setBannerImage] = useState(null);
//   const [bannerPreview, setBannerPreview] = useState('');
//   const [isPublished, setIsPublished] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const fileInputRef = useRef(null);
//   const titleQuillRef = useRef(null);
//   const contentQuillRef = useRef(null);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   // const API_BASE_URL = 'http://localhost:5000/api/blogs';
// // const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api/blogs';
// //  Correct: Ends with /api
// const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

//   // Formats for content editor
//   const contentFormats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image', 'video',
//     'color', 'background', 'font', 'align'
//   ];

//   // Simplified formats for title editor
//   const titleFormats = [
//     'bold', 'italic', 'underline', 'strike',
//     'color', 'font'
//   ];

//   // Image handler for content editor
// // BlogEditor.jsx (Replace imageHandler - Final Attempt)
// // BlogEditor.jsx (Replace imageHandler - Removed setSelection)

// const imageHandler = useCallback(() => {
//     const quill = contentQuillRef.current?.getEditor();
//     if (!quill) {
//         console.error("Quill instance not found on button click.");
//         setError("Editor not ready.");
//         return;
//     }
//     const currentRange = quill.getSelection();
//     const insertionIndex = currentRange ? currentRange.index : quill.getLength();

//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click(); // Focus lost here

//     input.onchange = async () => {
//         const file = input.files[0];
//         if (!file) return;
//         // Validation...
//         if (!file.type.startsWith('image/')) { setError('Only images allowed'); return; }
//         if (file.size > 5 * 1024 * 1024) { setError('Image too large (Max 5MB)'); return; }

//         const formData = new FormData();
//         formData.append('image', file);

//         const editorInstance = contentQuillRef.current?.getEditor();
//         if (!editorInstance) {
//             console.error("Editor instance lost before upload.");
//             setError("Editor became unavailable.");
//             return;
//         }

//         try {
//             setLoading(true); setError('');

//             // Upload
//             const response = await axios.post(`${API_BASE_URL}/blogs/upload`, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             if (!response.data?.filename) {
//                 throw new Error('Invalid response from server (filename missing).');
//             }

//             // Build URL
//             const imageUrl = `${API_BASE_URL}/blogs/image/${response.data.filename}`;
//             console.log("Constructed Image URL:", imageUrl);

//             // Attempt to restore focus (might help paste)
//             editorInstance.focus();
//             await new Promise(resolve => setTimeout(resolve, 0)); // Tiny delay

//             // Insert HTML with class
//             const imageHtml = `<img src="${imageUrl}" class="blog-content-image" alt="Uploaded content">`;
//             // Use 'user' source for pasteHTML if focus is reliable, else 'silent'
//             editorInstance.clipboard.dangerouslyPasteHTML(insertionIndex, imageHtml, 'user');

//             console.log("Quill HTML after pasteHTML:", editorInstance.root.innerHTML);

//             // ❌ REMOVED problematic setSelection call
//             /*
//             editorInstance.setSelection(insertionIndex + imageHtml.length); // Removed
//             */

//             // Keep force update
//              setTimeout(() => {
//                 editorInstance.updateContents(); // Force redraw
//                 console.log("Forced update after paste.");
//             }, 50);


//         } catch (error) {
//             console.error('Image upload failed:', error);
//             setError(error.response?.data?.message || error.message || 'Failed to upload.');
//         } finally {
//             setLoading(false);
//         }
//     };
// }, [API_BASE_URL]);

//   // Modules for content editor
//   const contentModules = {
//     toolbar: {
//       container: [
//         [{ 'header': [1, 2, 3, false] }],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [{ 'color': [] }, { 'background': [] }],
//         [{ 'font': [] }],
//         [{ 'align': [] }],
//         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//         [{ 'indent': '-1'}, { 'indent': '+1' }],
//         ['link', 'image', 'video'],
//         ['clean']
//       ],
//       handlers: {
//         image: imageHandler
//       }
//     },
//     clipboard: {
//       matchVisual: false
//     }
//   };

//   // Minimal modules for title editor
//   const titleModules = {
//     toolbar: [
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ 'color': [] }, { 'font': [] }],
//       ['clean']
//     ],
//     clipboard: {
//       matchVisual: false
//     }
//   };

//   // Load blog if editing
//   useEffect(() => {
//     if (id) {
//       const fetchBlog = async () => {
//         try {
//           setLoading(true);
//           //  Correct: Add /blogs/:id
// const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
//           const blog = response.data;
          
//           setTitle(blog.title);
//           setContent(blog.content.replace(/src="\//g, `src="${API_BASE_URL.replace('/api/blogs', '')}/`));
//           setIsPublished(blog.published);
          
//           if (blog.bannerImage) {
//             //  Correct: Use base URL for banner
// setBannerPreview(`${API_BASE_URL}/blogs/image/${blog.bannerImage}`);
//           }
          
//           setLoading(false);
//         } catch (err) {
//           setError('Failed to load blog');
//           setLoading(false);
//         }
//       };
//       fetchBlog();
//     }
//   }, [id, API_BASE_URL]);

//   const handleBannerUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setBannerImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setBannerPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // Get plain text from title Quill editor
//       const titlePlainText = titleQuillRef.current 
//         ? titleQuillRef.current.getEditor().getText().trim() 
//         : title.trim();

//       if (!titlePlainText) {
//         throw new Error('Title is required');
//       }

//       const formData = new FormData();
//       formData.append('title', titlePlainText);
//       formData.append('content', content);
//       formData.append('published', isPublished);
      
//       if (bannerImage) {
//         formData.append('bannerImage', bannerImage);
//       }

//       //  Correct: Add /blogs or /blogs/:id
// const url = id ? `${API_BASE_URL}/blogs/${id}` : `${API_BASE_URL}/blogs`;
      
//       const response = await axios.post(url, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         withCredentials: true
//       });

//       if (!response.data._id) {
//         throw new Error('Blog saved but no ID returned');
//       }

//       navigate(`/blog/${response.data._id}`);
//     } catch (err) {
//       console.error('Save error:', err);
//       setError(err.response?.data?.error || 
//               err.response?.data?.message || 
//               err.message || 
//               'Failed to save blog');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="loading">Loading...</div>;

//   return (
//     <div className="blog-editor">
//       <h1>{id ? 'Edit Blog' : 'Create New Blog'}</h1>
      
//       {error && <div className="error">{error}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="banner-section">
//           <h2>Banner Image</h2>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleBannerUpload}
//             accept="image/*"
//             style={{ display: 'none' }}
//           />
//           <button
//             type="button"
//             onClick={() => fileInputRef.current.click()}
//             className="upload-btn"
//           >
//             Upload Banner
//           </button>
//           {bannerPreview && (
//             <div className="banner-preview">
//               <img src={bannerPreview} alt="Banner Preview" />
//             </div>
//           )}
//         </div>

//         <div className="title-section">
//           <h2>Title</h2>
//           <ReactQuill
//             ref={titleQuillRef}
//             value={title}
//             onChange={setTitle}
//             modules={titleModules}
//             formats={titleFormats}
//             placeholder="Enter blog title"
//             className="title-editor"
//             style={{ height: 'auto' }}
//           />
//         </div>

//         <div className="content-section">
//           <h2>Content</h2>
//           <ReactQuill
//             ref={contentQuillRef}
//             value={content}
//             onChange={setContent}
//             modules={contentModules}
//             formats={contentFormats}
//             placeholder="Write your blog content here..."
//             className="content-editor"
//           />
//         </div>

//         <div className="publish-section">
//           <label>
//             <input
//               type="checkbox"
//               checked={isPublished}
//               onChange={(e) => setIsPublished(e.target.checked)}
//             />
//             Publish this blog
//           </label>
//         </div>

//         <div className="action-buttons">
//           <button type="submit" className="save-btn">
//             {id ? 'Update Blog' : 'Save Draft'}
//           </button>
//           <button
//             type="button"
//             onClick={(e) => {
//               setIsPublished(true);
//               handleSubmit(e);
//             }}
//             className="publish-btn"
//           >
//             Publish Blog
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BlogEditor;
