import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//-- Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    refreshToken: { type: String, required: false },
  },
  { timestamps: true }
);

//-- Add a custom method to the user schema
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Use bcrypt to compare the entered password with the stored password
  return await bcrypt.compare(enteredPassword, this.password);
};

/*
This middleware function is executed before a document is saved to MongoDB. 
It checks whether the password field of the user document has been modified. 
If it has, the function hashes the new password before the document is saved. 
This way, only hashed passwords are stored in the database, increasing security.
*/
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
