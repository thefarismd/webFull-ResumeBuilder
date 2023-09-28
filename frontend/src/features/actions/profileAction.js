import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInterceptorsInstance } from '../../config/axiosInterceptors';

// Use the environment variable for the base API URL
const apiBaseUrl = process.env.REACT_APP_API_URL || ''; // Fallback to an empty string if not defined

const getUserProfile = createAsyncThunk(
  'profile/getUserProfile',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptorsInstance.get(
        `${apiBaseUrl}/api/user/profile`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (userInfo, thunkAPI) => {
    try {
      const response = await axiosInterceptorsInstance.put(
        `${apiBaseUrl}/api/user/profile`,
        userInfo
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export { getUserProfile, updateUserProfile };
