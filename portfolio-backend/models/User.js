const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    default: process.env.ADMIN_EMAIL || "mdsabbirrahman2025@gmail.com"
  },
  password: {
    type: String,
    required: true,
    default: process.env.ADMIN_PASSWORD || "112233" // Plain text
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin'
  }
}, { timestamps: true });

// Generate JWT token (with role included)
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      role: this.role // Include role in token
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Plain text password comparison
userSchema.methods.comparePassword = function(candidatePassword) {
  return this.password === candidatePassword;
};

// Admin initialization
userSchema.statics.initializeAdmin = async function() {
  const adminEmail = process.env.ADMIN_EMAIL || "mdsabbirrahman2025@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "112233";
  
  const admin = await this.findOne({ email: adminEmail });
  if (!admin) {
    await this.create({
      email: adminEmail,
      password: adminPassword, // Storing plain text
      role: 'admin'
    });
    console.log("Admin user created with plain text password");
  }
};

module.exports = mongoose.model('User', userSchema);