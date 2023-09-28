import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userLogin = createAsyncThunk(
  'login/userLogin', //'sliceName/actionName' - naming convention
  async ({ email, password }, thunkAPI) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      // Use the environment variable for the base API URL
      const apiBaseUrl = process.env.API_URL || ''; // Fallback to an empty string if not defined

      const response = await axios.post(
        `${apiBaseUrl}/api/user/login`,
        { email, password },
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export default userLogin;
