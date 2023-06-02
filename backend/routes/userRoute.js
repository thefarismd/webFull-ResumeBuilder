import express from 'express';
import { authUser } from '../controllers/userController';

// Create a new router instance
const router = express.Router();

// Define the route for user login
// Route: /login
// Method: POST
router.route('/login').post(authUser);
