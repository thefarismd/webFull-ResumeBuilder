import express from 'express';
import colors from 'colors';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';
import userRoute from './Routes/userRoute.js';
import { notFound, otherError } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
// import path from 'path';
// import { fileURLToPath } from 'url';
import cors from 'cors';


dotenv.config(); //Load environment variables

connectDB(); // Establish MongoDB connection

const app = express(); // Create an Express application
// app.use(cors()); //Eanble CORS for all routes
app.use(
  cors({
    origin: process.env.API_URL,
  })
);


app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookie to object

// For checking whether your api is working
app.get('/', (req, res) => {
  res.send('API is working.'); // Return a response for the root path
});

app.use('/api/user', userRoute); // Register user routes under the '/api/user' path

// // Serve static files from the React frontend app in production
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
//   });
// }

app.use(notFound); //error handler for undefined routes
app.use(otherError); //error handler for all other errors

const port = process.env.PORT || 4000;

// Start the server and listen on the specified port
app.listen(port, console.log(`Server running on ${port}`.cyan.underline));
