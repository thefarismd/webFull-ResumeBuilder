import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//-- Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

//-- Add a custom method to the user schema
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Use bcrypt to compare the entered password with the stored password
  return await bcrypt.compare(enteredPassword, this.password);
};

//-- Add a pre-save middleware to the user schema before saving the document
userSchema.pre('save', async function (next) {
  // Check if the password field has been modified
  if (!this.isModified('password')) {
    next();
  }

  // Generate a salt for password hashing
  const salt = await bcrypt.genSalt(10);

  // Hash the password using the generated salt
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Create the User model from the user schema
const User = mongoose.model('User', userSchema);

export default User;
