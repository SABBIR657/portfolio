const Education = require('../models/Education');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all educations
// @route   GET /api/education
// @access  Public
exports.getAllEducations = asyncHandler(async (req, res, next) => {
  const educations = await Education.find().sort('-startDate');
  res.status(200).json({ success: true, count: educations.length, data: educations });
});

// @desc    Get single education
// @route   GET /api/education/:id
// @access  Public
exports.getEducation = asyncHandler(async (req, res, next) => {
  const education = await Education.findById(req.params.id);

  if (!education) {
    return next(new ErrorResponse(`Education not found with id ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: education });
});

// @desc    Create new education
// @route   POST /api/education
// @access  Private/Admin
exports.createEducation = asyncHandler(async (req, res, next) => {
  const education = await Education.create(req.body);
  res.status(201).json({ success: true, data: education });
});

// @desc    Update education
// @route   PUT /api/education/:id
// @access  Private/Admin
exports.updateEducation = asyncHandler(async (req, res, next) => {
  let education = await Education.findById(req.params.id);

  if (!education) {
    return next(new ErrorResponse(`Education not found with id ${req.params.id}`, 404));
  }

  education = await Education.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: education });
});

// @desc    Delete education
// @route   DELETE /api/education/:id
// @access  Private/Admin
exports.deleteEducation = asyncHandler(async (req, res, next) => {
  const education = await Education.findById(req.params.id);

  if (!education) {
    return next(new ErrorResponse(`Education not found with id ${req.params.id}`, 404));
  }

  await education.remove();
  res.status(200).json({ success: true, data: {} });
});