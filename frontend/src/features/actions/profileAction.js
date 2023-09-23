import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInterceptorsInstance } from "../../config/axiosInterceptors";

const getUserProfile = createAsyncThunk('profile/getUserProfile', async(_, thunkAPI)=>{
    try {
        const response = await axiosInterceptorsInstance.get('/api/user/profile');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

const updateUserProfile = createAsyncThunk('profile/updateUserProfile', async(userInfo, thunkAPI)=>{

    try {
        const response = await axiosInterceptorsInstance.put('/api/user/profile', userInfo);
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export { getUserProfile, updateUserProfile };
