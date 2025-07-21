const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const upload = require('../utils/multer');

router.route('/')
  .get(projectController.getAllProjects)
  .post(protect, upload.array('images'), projectController.createProject);

router.route('/:id')
  .get(projectController.getProject)
  .put(protect, projectController.updateProject)
  .delete(protect, projectController.deleteProject);

router.route('/:id/images')
  .put(protect, upload.array('images'), projectController.addProjectImages);

module.exports = router;