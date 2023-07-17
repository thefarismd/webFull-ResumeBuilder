import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './features/registerSlice';
import loginReducer from './features/loginSlice';

const store = configureStore({
  reducer: {
    userRegister: registerReducer,
    userLogin: loginReducer,
  },
});

export default store;
