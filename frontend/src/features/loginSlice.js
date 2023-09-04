import { createSlice } from '@reduxjs/toolkit';
import userLogin from './api/loginAction';

const localStorageUserInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: localStorageUserInfo,
  isLoading: null,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    loginReset: (state) => {
      localStorage.removeItem('userInfo');
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.error = null;
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const loginReducer = loginSlice.reducer;

export const { loginReset } = loginSlice.actions;
export default loginReducer;
