const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, contactController.getAllContacts)
  .post(contactController.createContact);

router.route('/:id')
  .get(protect, contactController.getContact)
  .put(protect, contactController.updateContact)
  .delete(protect, contactController.deleteContact);

router.put('/:id/mark-read', protect, contactController.markAsRead);
router.put('/:id/mark-responded', protect, contactController.markAsResponded);

module.exports = router;