import './App.css';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import React from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import DefaultLayout from './components/DefaultLayout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
