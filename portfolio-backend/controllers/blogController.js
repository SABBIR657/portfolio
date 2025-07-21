const Blog = require('../models/Blog');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const cloudinary = require('../config/cloudinary');

// @desc    Get all blogs
// @route   GET /api/blog
// @access  Public
exports.getAllBlogs = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find({ published: true }).sort('-publishedDate');
  res.status(200).json({ success: true, count: blogs.length, data: blogs });
});

// @desc    Get single blog
// @route   GET /api/blog/:id
// @access  Public
exports.getBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorResponse(`Blog not found with id ${req.params.id}`, 404));
  }

  // Increment view count
  blog.views += 1;
  await blog.save();

  res.status(200).json({ success: true, data: blog });
});

// @desc    Create new blog
// @route   POST /api/blog
// @access  Private/Admin
exports.createBlog = asyncHandler(async (req, res, next) => {
  const blogData = req.body;
  
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio/blogs',
      width: 1200,
      crop: 'scale'
    });
    blogData.coverImage = {
      public_id: result.public_id,
      url: result.secure_url
    };
  }

  const blog = await Blog.create(blogData);
  res.status(201).json({ success: true, data: blog });
});

// @desc    Update blog
// @route   PUT /api/blog/:id
// @access  Private/Admin
exports.updateBlog = asyncHandler(async (req, res, next) => {
  let blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorResponse(`Blog not found with id ${req.params.id}`, 404));
  }

  blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: blog });
});

// @desc    Update blog cover image
// @route   PUT /api/blog/:id/cover
// @access  Private/Admin
exports.updateBlogCover = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorResponse(`Blog not found with id ${req.params.id}`, 404));
  }

  if (!req.file) {
    return next(new ErrorResponse('Please upload an image', 400));
  }

  // Delete old image if exists
  if (blog.coverImage && blog.coverImage.public_id) {
    await cloudinary.uploader.destroy(blog.coverImage.public_id);
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'portfolio/blogs',
    width: 1200,
    crop: 'scale'
  });

  blog.coverImage = {
    public_id: result.public_id,
    url: result.secure_url
  };

  await blog.save();
  res.status(200).json({ success: true, data: blog });
});

// @desc    Delete blog
// @route   DELETE /api/blog/:id
// @access  Private/Admin
exports.deleteBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorResponse(`Blog not found with id ${req.params.id}`, 404));
  }

  // Delete cover image from cloudinary
  if (blog.coverImage && blog.coverImage.public_id) {
    await cloudinary.uploader.destroy(blog.coverImage.public_id);
  }

  await blog.remove();
  res.status(200).json({ success: true, data: {} });
});