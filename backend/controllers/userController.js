import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import generateJWT from '../config/generateJWT.js';

// @desc     Auth user & login
// @route    Post /api/user/login
// @access   Public
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email in the database
  const user = await User.findOne({ email });

  // If user is found and the password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id, //everytime user document is created, an _id is generate by mongodb
      name: user.name,
      email: user.email,
      token: generateJWT(user._id), //Generate JWT token for authentication
    });
  } else {
    res.status(401); // Set the HTTP status code to 401 Unauthorized
    throw new Error('Invalid Email or Passord');
  }
});

// @desc    Register a new user
// @route   Post /api/user/register
// @access  Public

const registerUser = expressAsyncHandler(async (req, res) => {
  // Extract name, email, and password from the request body
  const { name, email, password } = req.body;

  // Check if a user with the same email already exists in the database
  const userExist = await User.findOne({ email });

  // If user already exists, return an error response
  if (userExist) {
    res.status(400); //Status 400 (Bad Request)
    throw new Error('User Already Exists');
  }

  // Create a new user in the database
  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (newUser) {
    // Note: We don't include the password in the response for security reasons
    // Status 201 (Created)
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateJWT(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

export { authUser, registerUser };
