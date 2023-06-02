import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import generateJWT from '../config/generateJWT.js';

// @desc     Auth user & login
// @route    Post /api/user/login
// @access   Public
const authUser = expressAsyncHandler(async (res, req) => {
  const { email, password } = req.body;

  // Find the user by email in the database
  const user = await User.findOne({ email });

  // If user is found and the password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id, //everytime user document is created, an _id is generate by mongodb
      email: user.email,
      token: generateJWT(user._id), //Generate JWT token for authentication
    });
  } else {
    res.statusCode(401); // Set the HTTP status code to 401 Unauthorized
    throw new Error('Invalid Email or Passord');
  }
});

export { authUser };
