import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate, HashRouter } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inicio from './pages/Inicio';
import Pqrs from './pages/Pqrs';
import Users from './pages/Users';
import FormUsers from './components/users/FormUsers';
import FormPqrs from './components/pqrs/FormPqrs';
import Login from './components/users/Login';
import Dashboard from './pages/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<HashRouter>
  <Routes>
    <Route path="/" element={<Inicio/>}></Route>
    <Route path="/home" element={<Inicio/>}></Route>
    
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
    
    <Route path="/users" element={<Users />}></Route>
    <Route path="/register-user" element={<FormUsers/>}></Route>
      
    <Route path="/pqrs" element={<Pqrs/>}></Route>
    <Route path="/register-pqrs" element={<FormPqrs/>}></Route>
  </Routes>
</HashRouter>
);


