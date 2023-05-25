import mongoose from 'mongoose';
import colors from 'colors';

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline);
  } catch (error) {
    console.log(`Error: ${error}`.red.underline);
    process.exit(1);
  }
}

export default connectDB;
