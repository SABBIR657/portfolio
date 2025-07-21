const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { protect } = require('../middleware/auth');
const upload = require('../utils/multer');

router.route('/')
  .get(blogController.getAllBlogs)
  .post(protect, upload.single('coverImage'), blogController.createBlog);

router.route('/:id')
  .get(blogController.getBlog)
  .put(protect, blogController.updateBlog)
  .delete(protect, blogController.deleteBlog);

router.put('/:id/cover', protect, upload.single('coverImage'), blogController.updateBlogCover);

module.exports = router;