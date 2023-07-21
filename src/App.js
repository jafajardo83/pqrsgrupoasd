import { Route, Routes, HashRouter } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pqrs from './pages/Pqrs';
import Users from './pages/Users';
import FormUsers from './components/users/FormUsers';
import FormPqrs from './components/pqrs/FormPqrs';
import Login from './components/users/Login';
import Dashboard from './pages/Dashboard';
import Inicio from './pages/Inicio';
function App() {
    return (
        <>
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
            
        </>
    )
}

export default App;