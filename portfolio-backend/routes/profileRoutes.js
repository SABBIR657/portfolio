const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../utils/multer');

router.route('/')
  .get(profileController.getProfile)
  .post(protect, authorize('admin'), profileController.createOrUpdateProfile)
  .put(protect, authorize('admin'), profileController.createOrUpdateProfile);

router.route('/picture')
  .put(protect, authorize('admin'), upload.single('image'), profileController.updateProfilePicture);

module.exports = router;