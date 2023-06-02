import mongoose from 'mongoose';
import colors from 'colors';

async function connectDB() {
  try {
    // Use Mongoose to connect to the MongoDB database using the provided URI
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // Log a success message with the connected host upon successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline);
  } catch (error) {
    // If there is an error, log the error message and exit the process with a non-zero status code
    console.log(`Error: ${error}`.red.underline);
    process.exit(1);
  }
}

export default connectDB;
