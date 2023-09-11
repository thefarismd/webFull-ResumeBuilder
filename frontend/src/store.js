import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './features/registerSlice';
import loginReducer from './features/loginSlice';

const store = configureStore({
  reducer: {
    userRegister: registerReducer,
    userLogin: loginReducer,
  },
  devTools: process.env.NODE_ENV.toUpperCase() !== 'PRODUCTION',
});

/*
 * NODE_ENV values in CRA (Create React App):
 * 1. 'development' when using `npm start`
 * 2. 'test' when using `npm test`
 * 3. 'production' after using `npm run build`
 * 
 * Note: NODE_ENV can't be overridden in `.env` for CRA projects. 
 * When using `npm start`, NODE_ENV is always 'development'.
 */

export default store;
