// Run this in a temporary route or test file
import bcrypt from 'bcryptjs'
const hash = "$2a$10$N9qo8uLOickgx2ZMRZoMy.MqrqUVs0Z4fqX3WU628iC5YVYvQ9qG6";
const isMatch = await bcrypt.compare("112233", hash);
console.log("Password match:", isMatch); // Should be true