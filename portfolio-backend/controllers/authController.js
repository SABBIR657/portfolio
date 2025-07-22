const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user (case-insensitive search)
  const user = await User.findOne({ 
    email: { $regex: new RegExp(`^${email}$`, 'i') } 
  });

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches (plain text comparison)
  if (user.password !== password) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create token
  const token = user.generateAuthToken();

  res.status(200).json({
    success: true,
    token
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user
  });
});