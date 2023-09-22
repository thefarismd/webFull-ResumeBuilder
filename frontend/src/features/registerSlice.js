import { createSlice } from '@reduxjs/toolkit';
import registerUser from './actions/registerAction';
import { logout } from './loginSlice';

// const localStorageUserInfo = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null;

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
        // Store the entire payload (with accessToken) to localStorage
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
        // Extract everything except accessToken from payload for the Redux state
        const { accessToken, ...userInfoWithoutToken } = action.payload;
        state.isLoading = false;
        state.userInfo = userInfoWithoutToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout, (state) => {
        return initialState;
      });
  },
});

const registerReducer = registerSlice.reducer;

export default registerReducer;
