//Function is responsible for handling requests to undefined routes
function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`); // Create a new error with a message indicating that the requested resource was not found

  res.status(404); // Set the status code of the response to 404 (Not Found)

  next(error); // Pass the error to the next middleware function
}

//function is responsible for handling any errors that occur during request processing
function otherError(err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Determine the status code to use for the response

  res.status(statusCode); // Set the status code of the response

  // Create a JSON response with an error message
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}

export { notFound, otherError };
