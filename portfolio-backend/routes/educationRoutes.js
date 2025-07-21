const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(educationController.getAllEducations)
  .post(protect, educationController.createEducation);

router.route('/:id')
  .get(educationController.getEducation)
  .put(protect, educationController.updateEducation)
  .delete(protect, educationController.deleteEducation);

module.exports = router;