import { createSlice } from '@reduxjs/toolkit';
import registerUser from './api/registerAction';

const initialState = {
  userInfo: null,
  isLoading: null,
  error: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

const registerReducer = registerSlice.reducer;

export default registerReducer;
