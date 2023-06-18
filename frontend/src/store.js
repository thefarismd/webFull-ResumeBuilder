import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './features/registerSlice';

const store = configureStore({
  reducer: {
    userRegister: registerReducer,
  },
});

export default store;
