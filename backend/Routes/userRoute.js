import express from 'express';
import {
  verifyAccessToken,
} from '../middleware/authMiddleware.js';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  refreshUserAccessToken
} from '../controllers/userController.js';

// Create a new router instance
const router = express.Router();

// User Login
// Endpoint: api/user/login
// Method: POST
router.route('/login').post(authUser);

// User Register
// Route: api/user/register
// Method: POST
router.route('/register').post(registerUser);

// Update User Profile
// Endpoint: api/user/profile
// Method: GET, PUT
router
  .route('/profile')
  .get(verifyAccessToken, getUserProfile)
  .put(verifyAccessToken, updateUserProfile);

// Refresh User Access Token
// Endpoint: api/user/refresh-token
// Method: POST
router.route('/refresh-token').post(refreshUserAccessToken);

export default router;
