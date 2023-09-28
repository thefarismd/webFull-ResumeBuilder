import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use the environment variable for the base API URL
const apiBaseUrl = process.env.API_URL || ''; // Fallback to an empty string if not defined

const registerUser = createAsyncThunk(
  'register/registerUser',
  async ({ name, email, password }, thunkAPI) => {
    const config = { headers: { 'Content-Type': 'application/json' } };

    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/user/register`,
        { name, email, password },
        config
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export default registerUser;
