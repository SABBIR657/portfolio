const CurrentProject = require('../models/CurrentProject');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const cloudinary = require('../config/cloudinary');


// @desc    Get featured current projects
// @route   GET /api/current-projects/featured
// @access  Public
exports.getFeaturedCurrentProjects = asyncHandler(async (req, res, next) => {
  const projects = await CurrentProject.find({ isFeatured: true })
    .sort('-lastUpdated')
    .limit(3);

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});

// @desc    Add testimonial to project
// @route   POST /api/current-projects/:id/testimonials
// @access  Private
exports.addTestimonial = asyncHandler(async (req, res, next) => {
  const project = await CurrentProject.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
    );
  }

  project.testimonials.push(req.body);
  await project.save();

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Add challenge to project
// @route   POST /api/current-projects/:id/challenges
// @access  Private
exports.addChallenge = asyncHandler(async (req, res, next) => {
  const project = await CurrentProject.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
    );
  }

  project.challenges.push(req.body);
  await project.save();

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Update project progress
// @route   PUT /api/current-projects/:id/progress
// @access  Private
exports.updateProgress = asyncHandler(async (req, res, next) => {
  const { progress } = req.body;
  const project = await CurrentProject.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
    );
  }

  project.progress = progress;
  await project.save();

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Add roadmap item
// @route   POST /api/current-projects/:id/roadmap
// @access  Private
exports.addRoadmapItem = asyncHandler(async (req, res, next) => {
  const project = await CurrentProject.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
    );
  }

  project.roadmap.push(req.body);
  await project.save();

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Increment project views
// @route   PUT /api/current-projects/:id/views
// @access  Public
exports.incrementViews = asyncHandler(async (req, res, next) => {
  const project = await CurrentProject.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  );

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: project.views
  });
});

// @desc    Get all current projects
// @route   GET /api/current-projects
// @access  Public
exports.getCurrentProjects = asyncHandler(async (req, res, next) => {
  const projects = await CurrentProject.find().sort('-lastUpdated');
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});

// @desc    Get single current project
// @route   GET /api/current-projects/:id
// @access  Public
exports.getCurrentProject = asyncHandler(async (req, res, next) => {
  const project = await CurrentProject.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Create new current project
// @route   POST /api/current-projects
// @access  Private
exports.createCurrentProject = asyncHandler(async (req, res, next) => {
  const project = await CurrentProject.create(req.body);
  res.status(201).json({
    success: true,
    data: project
  });
});

// @desc    Update current project
// @route   PUT /api/current-projects/:id
// @access  Private
exports.updateCurrentProject = asyncHandler(async (req, res, next) => {
  let project = await CurrentProject.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
    );
  }

  project = await CurrentProject.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Delete current project
// @route   DELETE /api/current-projects/:id
// @access  Private
exports.deleteCurrentProject = asyncHandler(async (req, res, next) => {
  const project = await CurrentProject.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
    );
  }

  await project.remove();
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Upload media for current project
// @route   PUT /api/current-projects/:id/media
// @access  Private
exports.uploadProjectMedia = asyncHandler(async (req, res, next) => {
  const project = await CurrentProject.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload files`, 400));
  }

  const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];
  const uploadedMedia = [];

  for (let file of files) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `portfolio/current-projects/${project._id}`
    });

    uploadedMedia.push({
      public_id: result.public_id,
      url: result.secure_url,
      resource_type: result.resource_type
    });
  }

  project.media = project.media || {};
  project.media.screenshots = [...(project.media.screenshots || []), ...uploadedMedia];
  await project.save();

  res.status(200).json({
    success: true,
    data: project
  });
});