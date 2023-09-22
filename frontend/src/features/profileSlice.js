import { createSlice } from '@reduxjs/toolkit';
import { getUserProfile, updateUserProfile } from './actions/profileAction';
import { logout } from './loginSlice';

const initialState = {
  userInfo: null,
  isLoading: null,
  error: null,
  updateSuccess: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state) => {
      state.isLoading = true;
      state.updateSuccess = null; // reset the state every time you fetch the user profile (to ensure a clean state)
    }).addCase(getUserProfile.fulfilled, (state, action)=> {
        state.isLoading = false;
        state.userInfo = action.payload;
    }).addCase(getUserProfile.rejected, (state, action )=>{
        state.isLoading = false;
        state.error = action.payload;
    }).addCase(updateUserProfile.pending, (state)=>{
        state.isLoading = true;
    }).addCase(updateUserProfile.fulfilled, (state, action ) => {
      // Store the entire payload (with accessToken) to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      // Extract everything except accessToken from payload for the Redux state
      const { accessToken, ...userInfoWithoutToken } = action.payload;
      state.isLoading = false;
      state.userInfo = userInfoWithoutToken;
      state.updateSuccess = true;
    }).addCase(updateUserProfile.rejected, (state, action)=>{
        state.isLoading = false;
        state.error = action.payload;
        state.updateSuccess = false;
    }).addCase(logout, (state)=>{
      return initialState;
    });
  },
});

const profileReducer = profileSlice.reducer;

export default profileReducer;

