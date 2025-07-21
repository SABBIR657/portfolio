const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    default: "mdsabbirrahman2025@gmail.com"
  },
  password: {
    type: String,
    required: true,
    default: "$2a$10$N9qo8uLOickgx2ZMRZoMy.MqrqUVs0Z4fqX3WU628iC5YVYvQ9qG6" // 112233 encrypted
  }
}, { timestamps: true });

// Generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create the admin user if it doesn't exist
userSchema.statics.initializeAdmin = async function() {
  const admin = await this.findOne({ email: "mdsabbirrahman2025@gmail.com" });
  if (!admin) {
    await this.create({});
    console.log("Admin user created with default credentials");
  }
};

module.exports = mongoose.model('User', userSchema);