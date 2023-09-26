import express from 'express';
import colors from 'colors';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import { notFound, otherError } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config(); //Load environment variables

connectDB(); // Establish MongoDB connection

const app = express(); // Create an Express application

app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookie to object

// For checking whether your api is working
app.get('/', (req, res) => {
  res.send('API is working.'); // Return a response for the root path
});

app.use('/api/user', userRoute); // Register user routes under the '/api/user' path

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Any get request that doesn't match a previous route will be directed to the React frontend
app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
});

app.use(notFound); //error handler for undefined routes
app.use(otherError); //error handler for all other errors

// Set the default port number to 4000
// let port = 4000;

// Check if the port variable is null or an empty string
// If it is, set it to the default port number
// if (port == null || port == '') {
//   port = 4000;
// }

const port = process.env.PORT || 4000;

// Start the server and listen on the specified port
app.listen(port, console.log(`Server running on ${port}`.cyan.underline));
