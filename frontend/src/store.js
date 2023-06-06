import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './features/registerSlice';

const store = configureStore({
  reducer: {
    registerReducer: registerReducer,
  },
});

export default store;
