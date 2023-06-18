import { createSlice } from '@reduxjs/toolkit';
import registerUser from './api/registerAction';

const localStorageUserInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: localStorageUserInfo,
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
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const registerReducer = registerSlice.reducer;

export default registerReducer;
