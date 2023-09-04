import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

// The `protect` middleware is designed to verify if a request is authorized
const protect = expressAsyncHandler(async (req, res, next) => {
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
      jwt.verify(token, process.env.SECRET_KEY);

      // If all goes well, proceed to the next middleware or route handler
      next();
      return; //Exit from the current middleware
    } catch (error) {
      //If there is an error in token verification such as token is expired, invalid), redirect to login page
      return res.redirect('/login');
    }
  }

  if (!token) {
    return res.redirect('/login');
  }
});

export { protect };
