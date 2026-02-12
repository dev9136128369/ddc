
// 27-10-25
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');

// Memory storage for GridFS
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => { 
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

const BUCKET_NAME = 'blogImages'; 

// Helper function to delete from GridFS
const deleteGridFSFile = (filename, bucketName = BUCKET_NAME) => {
  if (!filename || !mongoose.connection?.db || mongoose.connection.readyState !== 1) {
    console.warn(`Skipping GridFS delete for ${filename}: DB not ready or no filename.`);
    return;
  }
  try {
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName });
    bucket.find({ filename }).limit(1).toArray((err, files) => {
      if (err) { console.error(`Error finding GridFS file ${filename} for deletion:`, err); return; }
      if (files?.length > 0) {
        bucket.delete(files[0]._id, (deleteErr) => {
          if (deleteErr) console.error(`Error deleting GridFS file ${filename} (ID: ${files[0]._id}):`, deleteErr);
          else console.log(`Successfully deleted GridFS file: ${filename}`);
        });
      } else {
        // console.warn(`GridFS file not found for deletion: ${filename}`);
      }
    });
  } catch (error) { console.error(`Error initiating GridFS file deletion for ${filename}:`, error); }
};

// --- Blog Routes ---
// 12-11-25
router.post('/',
  upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'contentImages', maxCount: 10 }
  ]),
  async (req, res) => {
    let uploadedBannerFilename = null;
    const uploadedContentFilenames = [];
    
    try {
      // 1. EXTRACT ALL FIELDS, INCLUDING CATEGORY
      const { title, content, published, category } = req.body; 
      
      //  DEBUG LOG: Check this in your VS Code / Backend Terminal
      console.log(" CREATE Request Received:");
      console.log("   - Title:", title);
      console.log("   - Category:", category);

      if (!title || !content) return res.status(400).json({ error: 'Title and content required.' });
      if (!mongoose.connection?.db || mongoose.connection.readyState !== 1) throw new Error('MongoDB not connected');

      const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: BUCKET_NAME });

      // --- Upload Banner Image ---
      if (req.files?.bannerImage?.[0]) {
        const file = req.files.bannerImage[0];
        const filename = `banner-${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
        const uploadStream = bucket.openUploadStream(filename, { contentType: file.mimetype });
        uploadStream.end(file.buffer);
        await new Promise((resolve, reject) => {
          uploadStream.on('finish', () => { uploadedBannerFilename = filename; resolve(); });
          uploadStream.on('error', (err) => reject(new Error('Banner upload failed')));
        });
      }

      // --- Upload Content Images (from form) ---
      if (req.files?.contentImages?.length > 0) {
        for (const file of req.files.contentImages) {
          const filename = `content-${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
          const uploadStream = bucket.openUploadStream(filename, { contentType: file.mimetype });
          uploadStream.end(file.buffer);
          let savedFilename = null;
          await new Promise((resolve, reject) => {
            uploadStream.on('finish', () => { savedFilename = filename; resolve(); });
            uploadStream.on('error', (err) => reject(new Error(`Upload failed`)));
          });
          uploadedContentFilenames.push(savedFilename);
        }
      }

      // --- Save Blog to DB with CATEGORY ---
      const newBlog = new Blog({
        title,
        content,
        published: String(published).toLowerCase() === 'true',
        
        //  CRITICAL FIX: Ensure category is saved. Default to 'BlogCard' if missing.
        category: category || 'BlogCard', 
        
        bannerImage: uploadedBannerFilename,
        contentImageFilenames: uploadedContentFilenames
      });
      
      const savedBlog = await newBlog.save();
      console.log(" Blog Saved Successfully with Category:", savedBlog.category); 
      res.status(201).json(savedBlog);

    } catch (error) {
      console.error('Error creating blog:', error);
      // Cleanup logic...
      if (uploadedBannerFilename) deleteGridFSFile(uploadedBannerFilename);
      uploadedContentFilenames.forEach(filename => deleteGridFSFile(filename));
      res.status(500).json({ error: error.message || 'Failed to create blog post' });
    }
  });
  
// UPDATE Blog Post
router.put('/:id',
  upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'contentImages', maxCount: 10 }
  ]),
  async (req, res) => {
    // ... (Init variables same as before) ...
    let newlyUploadedBanner = null; 
    let shouldDeleteOldContentImages = false;
    const newlyUploadedContent = []; 

    try {
      // 1. EXTRACT category
      const { title, content, published, clearContentImages, category } = req.body; 
      const blogId = req.params.id;

      const blog = await Blog.findById(blogId);
      if (!blog) return res.status(404).json({ error: 'Blog not found' });

      // ... (Image Upload Logic SAME AS BEFORE) ...
    
      
      const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: BUCKET_NAME });
      
      // Handle Banner Upload (Same as original)
      if (req.files?.bannerImage?.[0]) {
         // ... existing logic ...
         const file = req.files.bannerImage[0];
         const filename = `banner-${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
         const uploadStream = bucket.openUploadStream(filename, { contentType: file.mimetype });
         uploadStream.end(file.buffer);
         await new Promise((resolve, reject) => {
             uploadStream.on('finish', () => { newlyUploadedBanner = filename; resolve(); });
             uploadStream.on('error', reject);
         });
      }

      // Handle Content Images (Same as original)
      if (req.files?.contentImages?.length > 0) {
         // ... existing logic ...
         for (const file of req.files.contentImages) {
             const filename = `content-${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
             const uploadStream = bucket.openUploadStream(filename, { contentType: file.mimetype });
             uploadStream.end(file.buffer);
             await new Promise((resolve, reject) => {
                 uploadStream.on('finish', () => { newlyUploadedContent.push(filename); resolve(); });
                 uploadStream.on('error', reject);
             });
         }
         shouldDeleteOldContentImages = true;
      } else if (String(clearContentImages).toLowerCase() === 'true') {
         shouldDeleteOldContentImages = true;
      }


      // --- Update Blog Fields ---
      blog.title = title;
      blog.content = content;
      blog.published = String(published).toLowerCase() === 'true';
      blog.category = category || 'BlogCard'; 

      if (newlyUploadedBanner) {
        // Delete old banner logic
        if(blog.bannerImage) deleteGridFSFile(blog.bannerImage);
        blog.bannerImage = newlyUploadedBanner;
      }
      
      if (req.files?.contentImages?.length > 0) {
           if(blog.contentImageFilenames) blog.contentImageFilenames.forEach(f => deleteGridFSFile(f));
           blog.contentImageFilenames = newlyUploadedContent;
      } else if (shouldDeleteOldContentImages) {
           if(blog.contentImageFilenames) blog.contentImageFilenames.forEach(f => deleteGridFSFile(f));
           blog.contentImageFilenames = [];
      }

      blog.updatedAt = Date.now();
      const updatedBlog = await blog.save();
      res.json(updatedBlog);

    } catch (error) {
      console.error('Error updating blog:', error);
      res.status(500).json({ error: error.message });
    }
  });


// DELETE Blog Post (Deletes banner AND form-uploaded content images)
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID' });
    if (!mongoose.connection?.db || mongoose.connection.readyState !== 1) throw new Error('MongoDB not connected');

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const bannerToDelete = blog.bannerImage;
    const contentImagesToDelete = blog.contentImageFilenames || []; 

    await Blog.deleteOne({ _id: req.params.id }); 

    // Delete files from GridFS
    if (bannerToDelete) {
        console.log(`Deleting banner image: ${bannerToDelete}`);
        deleteGridFSFile(bannerToDelete);
    }
    if (contentImagesToDelete.length > 0) {
        console.log(`Deleting ${contentImagesToDelete.length} content images.`);
        contentImagesToDelete.forEach(filename => deleteGridFSFile(filename));
    }

    res.json({ message: 'Blog deleted successfully' });

  } catch (error) {
     console.error('Error deleting blog:', error);
     res.status(500).json({ error: 'Failed to delete blog' });
   }
});


// UPLOAD Image for Content Editor (Quill) - Stays Separate, uses upload.single('image')
router.post('/upload', upload.single('image'), async (req, res) => {
     let contentFilename = null;
     try {
         if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
         if (!mongoose.connection?.db || mongoose.connection.readyState !== 1) throw new Error('MongoDB not connected');

          const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: BUCKET_NAME });
          const filename = `content-${Date.now()}-${req.file.originalname.replace(/\s+/g, '-')}`;
          const uploadStream = bucket.openUploadStream(filename, { contentType: req.file.mimetype });
          uploadStream.end(req.file.buffer);
          
          await new Promise((resolve, reject) => {
            uploadStream.on('finish', () => { contentFilename = filename; console.log(`Uploaded Quill content image: ${filename}`); resolve(); });
            uploadStream.on('error', (err) => { console.error("Quill Content Image Upload Error:", err); reject(new Error('Failed to upload Quill image')); });
          });
          
          if (!contentFilename) throw new Error('Quill image upload finished but filename not set.');
         res.status(200).json({ filename: contentFilename }); 
     } catch (error) { 
        console.error('Error uploading Quill content image:', error);
        if (contentFilename) deleteGridFSFile(contentFilename); 
        res.status(500).json({ message: error.message || 'Failed to upload image' });
     }
});

// --- GET Routes (No changes needed) ---
// 12-12-25

router.get('/', async (req, res) => {
    try {
        const { category } = req.query; 
        
        console.log(" GET Request Aaya. Category Requested:", category);

        let filter = {};
        
        // Agar category aayi hai, to filter object mein set karo
        if (category && category !== 'undefined' && category !== 'null') {
            filter.category = category;
        }

        console.log(" Database Filter Applied:", filter); 

        const blogs = await Blog.find(filter).sort({ createdAt: -1 });
        
        console.log(` Found ${blogs.length} blogs for filter.`);
        res.json(blogs);

    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

// router.get('/', async (req, res) => {
//     try {
//         const blogs = await Blog.find({}).sort({ createdAt: -1 });
//         res.json(blogs);
//     } catch (error) {
//         console.error('Error fetching blogs:', error);
//         res.status(500).json({ error: 'Failed to fetch blogs' });
//     }
// });

router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID' });
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
});

// --- Image Serving Route ---
router.get('/image/:filename', async (req, res) => {
    try {
        if (!mongoose.connection?.db || mongoose.connection.readyState !== 1) throw new Error('MongoDB not connected');

        const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: BUCKET_NAME });
        const downloadStream = bucket.openDownloadStreamByName(req.params.filename);

        downloadStream.on('error', (err) => {
            console.error(`Error streaming file ${req.params.filename}:`, err);
            if (err.message.includes('file not found')) {
                return res.status(404).send('Image not found.');
            }
            res.status(500).send('Error retrieving image.');
        });

        res.set('Content-Type', 'image/*'); 
        downloadStream.pipe(res);

    } catch (error) {
        console.error(`Error serving image ${req.params.filename}:`, error);
        res.status(500).json({ error: 'Failed to retrieve image' });
    }
});


module.exports = router;