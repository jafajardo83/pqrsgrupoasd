import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';

import Inicio from './pages/Inicio';
import Pqrs from './pages/Pqrs';
import Users from './pages/Users';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Inicio/>}></Route>
    <Route path="/users" element={<Users />}></Route>
    {/*<Route path="/login" element={<Login />}></Route>
    <Route path="/list-users" element={<ListUsers />}></Route>
    <Route path="/register-users" element={<RegisterUsers />}></Route> */}
  
    <Route path='/pqrs' element={<Pqrs/>}></Route>
  </Routes>
</BrowserRouter>
);


