import express from 'express';
import { authUser, registerUser } from '../controllers/userController.js';

// Create a new router instance
const router = express.Router();

// Define the route for user login
// Route: /login
// Method: POST
router.route('/login').post(authUser);

// Define the route for user login
// Route: /register
// Method: POST
router.route('/register').post(registerUser);

export default router;
