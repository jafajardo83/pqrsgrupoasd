import { Card, Button } from 'react-bootstrap';

import {Link} from 'react-router-dom';
import './Pqrs.css';

function CardPqrs({ pqrs,setUpList,upList,handleClose,handleOpen,setDataModal }) {

     
    function formatDate(date) {
        const options = { day: 'numeric', year: 'numeric', month: 'short' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);

        // Split the formatted date into day, month, and year parts
        const [day, month, year] = formattedDate.split(' ');

        // Return the formatted date with uppercase month abbreviation and desired format
        return `${day} ${month} ${year}`;
    }

    const handleEdit=()=>{
        handleOpen();
        setDataModal(pqrs);
    }
    return (
        
        
            <Card  style={{ width: '100%' }} key={pqrs.id} className="card-pqrs">
                
                <Card.Title className="card-pars-title">PQRS No. <br/>{pqrs.id}</Card.Title>
                
                <Card.Body>    
                    <Card.Text>
                        <p><strong>Fecha:</strong> {formatDate(pqrs.date)}</p>
                        <p><strong>Tipo:</strong> {pqrs.type}</p>
                        <p><strong>Descripción:</strong> {pqrs.description}</p>
                        <p><strong>Area(s):</strong> {pqrs.areas.map(a => a.area).join(' | ')}</p>
                        <p><strong>Funcionario(s):</strong> {pqrs.officers.map(o => o.officer).join(' | ')}</p>
                        <p><strong>Estado:</strong> {pqrs.state}</p>
                        
                        
                    </Card.Text>
                    <div className="text-center">
                        <button className="button-blue" onClick={handleEdit}>Editar</button>
                        <Link to="/ver-pqrs" >
                            <button className="button-gray">Ver PQRS</button>
                        </Link>
                    </div>
                </Card.Body> 
            </Card> 

    );
}

export default CardPqrs;