const Contact = require('../models/Contact');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private/Admin
exports.getAllContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find().sort('-createdAt');
  res.status(200).json({ success: true, count: contacts.length, data: contacts });
});

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private/Admin
exports.getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorResponse(`Contact not found with id ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: contact });
});

// @desc    Create new contact
// @route   POST /api/contact
// @access  Public
exports.createContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.create(req.body);

  // Send notification email
  await sendEmail({
    email: process.env.ADMIN_EMAIL,
    subject: 'New Contact Form Submission',
    message: `You have a new contact form submission from ${contact.name} (${contact.email}). Message: ${contact.message}`
  });

  res.status(201).json({ success: true, data: contact });
});

// @desc    Update contact
// @route   PUT /api/contact/:id
// @access  Private/Admin
exports.updateContact = asyncHandler(async (req, res, next) => {
  let contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorResponse(`Contact not found with id ${req.params.id}`, 404));
  }

  contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: contact });
});

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private/Admin
exports.deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorResponse(`Contact not found with id ${req.params.id}`, 404));
  }

  await contact.remove();
  res.status(200).json({ success: true, data: {} });
});

// @desc    Mark contact as read
// @route   PUT /api/contact/:id/mark-read
// @access  Private/Admin
exports.markAsRead = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorResponse(`Contact not found with id ${req.params.id}`, 404));
  }

  contact.read = true;
  await contact.save();

  res.status(200).json({ success: true, data: contact });
});

// @desc    Mark contact as responded
// @route   PUT /api/contact/:id/mark-responded
// @access  Private/Admin
exports.markAsResponded = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorResponse(`Contact not found with id ${req.params.id}`, 404));
  }

  contact.responded = true;
  await contact.save();

  res.status(200).json({ success: true, data: contact });
});