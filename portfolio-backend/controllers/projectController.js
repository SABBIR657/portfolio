const Project = require('../models/Project');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const cloudinary = require('../config/cloudinary');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getAllProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find().sort('-createdAt');
  res.status(200).json({ success: true, count: projects.length, data: projects });
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorResponse(`Project not found with id ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: project });
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private/Admin
exports.createProject = asyncHandler(async (req, res, next) => {
  const projectData = req.body;
  
  if (req.files) {
    projectData.images = await uploadImages(req.files);
  }

  const project = await Project.create(projectData);
  res.status(201).json({ success: true, data: project });
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
exports.updateProject = asyncHandler(async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorResponse(`Project not found with id ${req.params.id}`, 404));
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: project });
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
exports.deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorResponse(`Project not found with id ${req.params.id}`, 404));
  }

  // Delete images from cloudinary
  if (project.images && project.images.length > 0) {
    for (const image of project.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }
  }

  await project.remove();
  res.status(200).json({ success: true, data: {} });
});

// @desc    Add images to project
// @route   PUT /api/projects/:id/images
// @access  Private/Admin
exports.addProjectImages = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorResponse(`Project not found with id ${req.params.id}`, 404));
  }

  if (!req.files || req.files.length === 0) {
    return next(new ErrorResponse('Please upload at least one image', 400));
  }

  const images = await uploadImages(req.files);
  project.images = [...project.images, ...images];
  await project.save();

  res.status(200).json({ success: true, data: project });
});

// Helper function to upload images to Cloudinary
const uploadImages = async (files) => {
  const images = [];
  for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'portfolio/projects',
      width: 1200,
      crop: 'scale'
    });
    images.push({
      public_id: result.public_id,
      url: result.secure_url
    });
  }
  return images;
};