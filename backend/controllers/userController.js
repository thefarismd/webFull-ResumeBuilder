import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../config/generateJWT.js';
import {
  userRegisterValidationSchema,
  userLoginValidationSchema,
} from '../config/validationSchema.js';

// @desc     Auth user & login
// @route    POST /api/user/login
// @access   Public
const authUser = expressAsyncHandler(async (req, res) => {
  // Input validation request body against the joi schema
  const validationResult = userLoginValidationSchema.validate(req.body);

  // If there's a input validation error, return a 401 Unauthorized
  if (validationResult.error) {
    // res.status(401).json({ error: validationResult.error.details[0].message });
    res.status(401);
    throw new Error('Invalid Email or Password');
  }

  const { email, password } = req.body;

  // Find the user by email in the database
  const user = await User.findOne({ email });

  // If user is found and the password matches
  if (user && (await user.matchPassword(password))) {
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refreshToken in user model for tracking purposes (can be a separate collection in large apps)
    user.refreshToken = refreshToken;
    await user.save();

    // Set refreshToken as an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'PRODUCTION', // set to true if in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds, adjust as needed
    });

    res.json({
      id: user._id, //everytime user document is created, an _id is generate by mongodb
      name: user.name,
      email: user.email,
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

// @desc    Register a new user
// @route   POST /api/user/register
// @access  Public
const registerUser = expressAsyncHandler(async (req, res) => {
  // Input validation request body against the joi schema
  const validationResult = userRegisterValidationSchema.validate(req.body);

  // If there's an input validation error, return a 400 Bad Request
  if (validationResult.error) {
    // res.status(400).json({ error: validationResult.error.details[0].message });
    res.status(400);
    throw new Error('Invalid User Data');
  }

  // Extract name, email, and password from the request body
  const { name, email, password } = req.body;

  // Check if a user with the same email already exists in the database
  const userExist = await User.findOne({ email });

  // If user already exists, return an error response
  if (userExist) {
    res.status(400);
    throw new Error('User Already Exists');
  }

  // Create a new user in the database with refreshToken already set
  const newUser = await User.create({
    name,
    email,
    password,
  });

  // Save refresh token in db
  const refreshToken = generateRefreshToken(newUser._id);
  newUser.refreshToken = refreshToken;
  await newUser.save();

  // Set refreshToken as an HTTP-only cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'PRODUCTION',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
  });

  // Return response
  res.json({
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    accessToken: generateAccessToken(newUser._id),
  });
});

// @desc     Get User Profile
// @route    GET /api/user/profile
// @access   Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404); //404 : browser was able to communicate with a given server, but the server could not find what was requested.
    throw new Error('User not found');
  }
});

// @desc     Update User Profile
// @route    PUT /api/user/profile
// @access   Private
const updateUserProfile = expressAsyncHandler(async (req, res) => {

  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      accessToken: generateAccessToken(updatedUser._id),
    });
  } else {
    res.status(404); //404 : browser was able to communicate with a given server, but the server could not find what was requested.
    throw new Error('User not found.');
  }
});

// @desc     Refresh JWT access token using refresh token
// @route    POST /api/user/refresh-token
// @access   Public (Anyone with a valid refresh token can access)
const refreshUserAccessToken = expressAsyncHandler(async (req, res) => {

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(403); // 403 Forbidden Error
    throw new Error('Refresh token is required.');
  }

  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.status(403); // 403 Forbidden Error
    throw new Error('Invalid refresh token.');
  }

  jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
  const newAccessToken = generateAccessToken(user._id);

  res.json({ accessToken: newAccessToken });
});


export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  refreshUserAccessToken,
};
