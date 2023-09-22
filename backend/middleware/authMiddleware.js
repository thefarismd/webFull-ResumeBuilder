import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
// import { generateAccessToken } from '../config/generateJWT.js';
// import User from '../models/userModel.js';

/**
 * `express-async-handler` is a middleware utility:
 * - It wraps route handlers ensuring rejected promises are passed to the next middleware.
 * - Removes the need for manual try-catch blocks in every route, providing a cleaner error-handling approach.
 * Ensure you have a custom error-handling middleware placed last in your Express application.
 * This middleware will handle errors passed by `express-async-handler` and send appropriate responses.
 */

// This  middleware is designed to verify JWT if a request is authorized
const verifyAccessToken = expressAsyncHandler(async (req, res, next) => {
  let token;

  // Check if the `authorization` header is present and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Split the authorization header to extract the token part
      token = req.headers.authorization.split(' ')[1];

      // Use JWT library to verify the extracted token against a secret
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      // Attach the decoded payload to req.user object
      req.user = decoded;
      next();
      return; //Exit from the current middleware
    } catch (error) {
      // Here, check if the error is because of token expiry
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401);
        throw new Error('Token expired.');
      } else {
        // Handle other JWT errors
        res.status(401);
        throw new Error('Not authorized, Invalid Token');
      }
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, No Token');
  }
});

export { verifyAccessToken };
