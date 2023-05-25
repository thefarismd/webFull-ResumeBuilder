import express from 'express';
import colors from 'colors';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';

//Load environment variables
dotenv.config();

//MongoDB Connection
connectDB();

const app = express();

// Set the default port number to 4000
let port = 4000;
// Check if the port variable is null or an empty string
if (port == null || port == '') {
  port = 4000;
}
// Start the server and listen on the specified port
app.listen(port, console.log(`Server running on ${port}`.cyan.underline));
