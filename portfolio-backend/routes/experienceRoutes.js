const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(experienceController.getAllExperiences)
  .post(protect, experienceController.createExperience);

router.route('/:id')
  .get(experienceController.getExperience)
  .put(protect, experienceController.updateExperience)
  .delete(protect, experienceController.deleteExperience);

module.exports = router;