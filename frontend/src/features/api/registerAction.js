import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const registerUser = createAsyncThunk(
  'register/registerUser',
  async ({ name, email, password }, thunkAPI) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        '/api/user/register',
        { name, email, password },
        config
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export default registerUser;
