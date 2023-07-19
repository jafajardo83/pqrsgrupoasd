import ListPqrs from "../components/pqrs/ListPqrs";
import {Container} from 'react-bootstrap';
import { Link } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
function Pqrs (){
    return(
    <>
    <NavBar/>   
    <Container>
        <div className="list-pqrs">
            <Link to="/register/pqrs" className="btn btn-success">Crear PQRS</Link>
            <h1 className="text-center">Tus PQRS</h1>

            <ListPqrs/>
        </div>
    </Container>
    </>
    );
}

export default Pqrs;