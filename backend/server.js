import express from 'express';
import colors from 'colors';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';

//Load environment variables
dotenv.config();

// Establish MongoDB connection
connectDB();

// Create an Express application
const app = express();

// Register user routes under the '/api/user' path
app.use('/api/user', userRoute);

// Set the default port number to 4000
let port = 4000;

// Check if the port variable is null or an empty string
// If it is, set it to the default port number
if (port == null || port == '') {
  port = 4000;
}
// Start the server and listen on the specified port
app.listen(port, console.log(`Server running on ${port}`.cyan.underline));
