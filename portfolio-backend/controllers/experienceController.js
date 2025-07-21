const Experience = require('../models/Experience');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
exports.getAllExperiences = asyncHandler(async (req, res, next) => {
  const experiences = await Experience.find().sort('-startDate');
  res.status(200).json({ success: true, count: experiences.length, data: experiences });
});

// @desc    Get single experience
// @route   GET /api/experience/:id
// @access  Public
exports.getExperience = asyncHandler(async (req, res, next) => {
  const experience = await Experience.findById(req.params.id);

  if (!experience) {
    return next(new ErrorResponse(`Experience not found with id ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: experience });
});

// @desc    Create new experience
// @route   POST /api/experience
// @access  Private/Admin
exports.createExperience = asyncHandler(async (req, res, next) => {
  const experience = await Experience.create(req.body);
  res.status(201).json({ success: true, data: experience });
});

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private/Admin
exports.updateExperience = asyncHandler(async (req, res, next) => {
  let experience = await Experience.findById(req.params.id);

  if (!experience) {
    return next(new ErrorResponse(`Experience not found with id ${req.params.id}`, 404));
  }

  experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: experience });
});

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private/Admin
exports.deleteExperience = asyncHandler(async (req, res, next) => {
  const experience = await Experience.findById(req.params.id);

  if (!experience) {
    return next(new ErrorResponse(`Experience not found with id ${req.params.id}`, 404));
  }

  await experience.remove();
  res.status(200).json({ success: true, data: {} });
});