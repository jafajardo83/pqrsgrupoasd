import ListPqrs from "../components/pqrs/ListPqrs";
import {Container} from 'react-bootstrap';
import { Link } from "react-router-dom";
function Pqrs (){
    return(
    <>
    <Container className="mt-3">
            <Link to="register/pqrs" className="btn btn-success">Crear PQRS</Link>
            <h1 className="text-center">Tus PQRS</h1>

            <ListPqrs/>
    </Container>
    </>
    );
}

export default Pqrs;