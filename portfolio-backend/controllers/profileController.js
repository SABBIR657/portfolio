const Profile = require('../models/Profile');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const cloudinary = require('../config/cloudinary');


// @desc    Get profile
// @route   GET /api/profile
// @access  Public

exports.getProfile = asyncHandler(async(req, res, next)=>{
    const profile = await Profile.findOne();

    if(!profile){
        return next (new ErrorResponse('Profile not found'),404);
    }

    res.status(200).json({
        success: true,
        data: profile
    });
});

// @desc    Create or update profile
// @route   POST /api/profile
// @route   PUT /api/profile
// @access  Private/Admin

exports.createOrUpdateProfile = asyncHandler(async(req, res, next)=>{
    let profile = await Profile.findOne();

    if(!profile){
        profile = new Profile(req.body);
    }else{
        profile = await Profile.findOneAndUpdate({}, req.body,{
            new: true,
            runValidators: true
        });
    }
      await profile.save();

  res.status(200).json({
    success: true,
    data: profile
  });
})


// @desc    Update profile picture
// @route   PUT /api/profile/picture
// @access  Private/Admin
exports.updateProfilePicture = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse('Please upload a file', 400));
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'portfolio/profile',
    width: 500,
    height: 500,
    crop: 'fill'
  });

  const profile = await Profile.findOne();
  
  // Delete old image from cloudinary if exists
  if (profile.profilePicture.public_id) {
    await cloudinary.uploader.destroy(profile.profilePicture.public_id);
  }

  profile.profilePicture = {
    public_id: result.public_id,
    url: result.secure_url
  };

  await profile.save();

  res.status(200).json({
    success: true,
    data: profile
  });
});