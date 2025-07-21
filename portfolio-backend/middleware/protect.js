const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect } = require('../middlewares/auth');
const upload = require('../utils/multer');

router.route('/')
  .get(profileController.getProfile)
  .post(protect, profileController.createOrUpdateProfile)
  .put(protect, profileController.createOrUpdateProfile);

router.route('/picture')
  .put(protect, upload.single('image'), profileController.updateProfilePicture);

module.exports = router;