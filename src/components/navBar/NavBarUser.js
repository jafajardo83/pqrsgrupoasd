import './NavBar.css'
import Logo from '../../util/logo.svg'
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function NavBarUser(){
    const [show, setShow] = useState(true);
    return(
        <>
        <Container fluid/>
        <header className="cel">
            <div className="logo">
            <Link to="/home" className='menu-item'>
                <img src={Logo} alt='Logo Sistema PQRS'/>
            </Link> 
            
                <i className="fa-solid fa-bars" onClick={() => {
                    //console.log(show)
                    setShow(!show);
                    }}></i>
              
            </div>
            {show ?
            <h1></h1>
            : 
            <nav>
                <Link to="/dashboard" className='menu-item'> Home </Link> 
                <Link to="/pqrs" className="menu-item" >Ver mis PQRS</Link>
                <Link to="/register-pqrs" className="menu-item" >Registrar PQRS</Link>
                <hr className="menu-hr" noshade=""/>
                <Link to="/login" className="menu-item">
                    <button className="btn-azul">
                        <i className="fa-solid fa-user"></i> Cerrar Sesión
                    </button>
                </Link>   
            </nav>}
        </header>
        
        <header className="desk">
            <div className="logo">
            <Link to="/home" className='menu-item'>
                <img src={Logo} alt='Logo Sistema PQRS'/>
            </Link> 
            
                <i className="fa-solid fa-bars"></i>
              
            </div>
             
            <nav>
            <Link to="/home" className='menu-item'> Home </Link> 
                <Link to="/pqrs" className="menu-item" >Ver mis PQRS</Link>
                <Link to="/register-pqrs" className="menu-item" >Registrar PQRS</Link>
                <hr className="menu-hr" noshade=""/>
                <Link to="/login" className="menu-item">
                    <button className="btn-azul">
                        <i className="fa-solid fa-user"></i> Cerrar Sesión
                    </button>
                </Link>   
            </nav>
        </header>
        
        <Container />
        </>
    )
}

export default NavBarUser;