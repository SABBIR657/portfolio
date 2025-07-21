const express = require('express');
const router = express.Router();
const currentProjectController = require('../controllers/currentProjectController');
const { protect } = require('../middleware/auth');
const upload = require('../utils/multer');

// Public routes
router.get('/', currentProjectController.getCurrentProjects);
router.get('/featured', currentProjectController.getFeaturedCurrentProjects);
router.get('/:id', currentProjectController.getCurrentProject);
router.put('/:id/views', currentProjectController.incrementViews);

// Protected routes
router.post('/', protect, currentProjectController.createCurrentProject);
router.put('/:id', protect, currentProjectController.updateCurrentProject);
router.delete('/:id', protect, currentProjectController.deleteCurrentProject);
router.put('/:id/media', protect, upload.array('files'), currentProjectController.uploadProjectMedia);
router.post('/:id/testimonials', protect, currentProjectController.addTestimonial);
router.post('/:id/challenges', protect, currentProjectController.addChallenge);
router.put('/:id/progress', protect, currentProjectController.updateProgress);
router.post('/:id/roadmap', protect, currentProjectController.addRoadmapItem);

module.exports = router;