import './NavBar.css'
import Logo from '../../util/logo.svg'

import { Link } from 'react-router-dom';

function NavBar(){
    return(
        <>
        <header>
            <div className="logo">
            <Link to="/home" className='menu-item'>
                <img src={Logo} alt='Logo Sistema PQRS'/>
            </Link> 
                <i className="fa-solid fa-bars"></i>
            </div>
            
            <nav>
                <Link to="/home" className='menu-item'> Home </Link> 
                <Link to="/register-user" className="menu-item" >Regístrate</Link>
                <hr className="menu-hr" noshade=""/>
                <Link to="/login" className="menu-item">
                    <button className="btn-azul">
                        <i className="fa-solid fa-user"></i> Iniciar Sesión
                    </button>
                </Link>  
            </nav>
        </header>
            
        </>
    )
}

export default NavBar;