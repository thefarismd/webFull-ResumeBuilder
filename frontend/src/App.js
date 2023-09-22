import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import DefaultLayout from './components/DefaultLayout';
import PrivateRoute from './components/PrivateRoute';
import Resume from './screens/Resume';
import Profile from './screens/Profile';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
            <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>}/>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/resume' element={<PrivateRoute><Resume /></PrivateRoute>}/>  
            <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>          
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
